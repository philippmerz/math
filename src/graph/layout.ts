import { Position, type Edge, type Node } from '@xyflow/react'
import type { MathNode, NodeKind } from '../data/types'
import { MATH_NODES } from '../data/nodes'
import { canonicalOfVariant } from '../data/variants'

export const NODE_WIDTH = 220
export const NODE_HEIGHT = 56

export type ConceptNodeData = {
  label: string
  kind: NodeKind
  /** Present on a canonical with collapsible constructions; drives the expand badge. */
  expand?: { count: number; expanded: boolean; onToggle: () => void }
}

export type ConceptNode = Node<ConceptNodeData, 'concept'>

/** A laid-out area cluster — its bounding box and label, for drawing a hull. */
export type ClusterBox = {
  id: string
  area: string
  x: number
  y: number
  width: number
  height: number
}

export type LayoutResult = {
  nodes: ConceptNode[]
  edges: Edge[]
  clusters: ClusterBox[]
}

/** The selectable layout engines. */
export type LayoutMode = 'flow' | 'grouped'

const primaryArea = (n: MathNode) => n.tags[0] ?? 'Other'
const clusterId = (area: string) => `cluster:${area}`

const visibleNodes = (hidden: ReadonlySet<string>): MathNode[] =>
  hidden.size === 0 ? MATH_NODES : MATH_NODES.filter((n) => !hidden.has(n.id))

function buildEdges(nodes: MathNode[]): Edge[] {
  const visible = new Set(nodes.map((n) => n.id))
  const edges: Edge[] = []
  for (const node of nodes) {
    for (const dep of node.dependencies) {
      if (!visible.has(dep)) continue
      // A construction → canonical edge is an isomorphism, not a prerequisite.
      const iso = canonicalOfVariant.get(dep) === node.id
      edges.push({ id: `${dep}->${node.id}`, source: dep, target: node.id, data: { iso } })
    }
  }
  return edges
}

function rfNode(node: MathNode, x: number, y: number): ConceptNode {
  return {
    id: node.id,
    type: 'concept',
    position: { x, y },
    data: { label: node.label, kind: node.kind },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  }
}

// ── Graphviz (WASM, in a worker) ───────────────────────────────────────────
// `flow`: pure dependency layering (no clustering — areas may interleave).
// `grouped`: each area is a `cluster` subgraph, so Graphviz keeps areas
// together and separates them. dagre did this too, but in JS it cost ~7s for
// ~900 nodes; Graphviz's compiled `dot` does the same in well under a second.

// Spacing (in inches; the node box is set to our real px size ÷ 72dpi, so the
// output points map 1:1 to pixels). Tuned to echo the old dagre proportions:
// taller-and-narrower when clustered.
const DOT_SPACING = {
  grouped: { ranksep: 1.4, nodesep: 0.3 },
  flow: { ranksep: 1.1, nodesep: 0.55 },
}

function buildDot(nodes: MathNode[], clustered: boolean): string {
  const visible = new Set(nodes.map((n) => n.id))
  const w = (NODE_WIDTH / 72).toFixed(3)
  const h = (NODE_HEIGHT / 72).toFixed(3)
  const { ranksep, nodesep } = clustered ? DOT_SPACING.grouped : DOT_SPACING.flow
  let s = `digraph G {\n  graph [rankdir=TB, ranksep=${ranksep}, nodesep=${nodesep}];\n`
  s += `  node [shape=box, fixedsize=true, width=${w}, height=${h}];\n`
  if (clustered) {
    const byArea = new Map<string, MathNode[]>()
    for (const n of nodes) {
      const list = byArea.get(primaryArea(n))
      if (list) list.push(n)
      else byArea.set(primaryArea(n), [n])
    }
    let ci = 0
    for (const list of byArea.values()) {
      s += `  subgraph "cluster_${ci++}" {\n`
      for (const n of list) s += `    "${n.id}";\n`
      s += `  }\n`
    }
  } else {
    for (const n of nodes) s += `  "${n.id}";\n`
  }
  for (const n of nodes) {
    for (const dep of n.dependencies) {
      if (visible.has(dep)) s += `  "${dep}" -> "${n.id}";\n`
    }
  }
  return s + '}\n'
}

// Hull boxes from the actual node bounds (not any reported cluster box) — the
// latter can be far wider than the nodes it holds, giving mostly-empty hulls.
function clusterBoxes(nodes: MathNode[], rfNodes: ConceptNode[]): ClusterBox[] {
  const areas: string[] = []
  for (const n of nodes) {
    const a = primaryArea(n)
    if (!areas.includes(a)) areas.push(a)
  }
  return areas.map((area) => {
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    nodes.forEach((node, i) => {
      if (primaryArea(node) !== area) return
      const p = rfNodes[i].position
      minX = Math.min(minX, p.x)
      minY = Math.min(minY, p.y)
      maxX = Math.max(maxX, p.x + NODE_WIDTH)
      maxY = Math.max(maxY, p.y + NODE_HEIGHT)
    })
    return { id: clusterId(area), area, x: minX, y: minY, width: maxX - minX, height: maxY - minY }
  })
}

// ── layout worker client ───────────────────────────────────────────────────
type PosMap = Record<string, [number, number]>
type WorkerReply = { reqId: number; pos?: PosMap; error?: string }

let worker: Worker | null = null
let seq = 0
const pending = new Map<number, { resolve: (p: PosMap) => void; reject: (e: Error) => void }>()

function layoutWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL('./layout.worker.ts', import.meta.url), { type: 'module' })
    worker.onmessage = (e: MessageEvent<WorkerReply>) => {
      const h = pending.get(e.data.reqId)
      if (!h) return
      pending.delete(e.data.reqId)
      if (e.data.pos) h.resolve(e.data.pos)
      else h.reject(new Error(e.data.error ?? 'layout failed'))
    }
  }
  return worker
}

function runLayout(dot: string): Promise<PosMap> {
  return new Promise((resolve, reject) => {
    const reqId = ++seq
    pending.set(reqId, { resolve, reject })
    layoutWorker().postMessage({ reqId, dot })
  })
}

/** Compute a layout in the worker (Graphviz). The positions come back as node
 *  centres; we shift to top-left for React Flow. Result is cached on success. */
export async function graphvizLayout(
  mode: LayoutMode,
  hidden: ReadonlySet<string>,
): Promise<LayoutResult> {
  const nodes = visibleNodes(hidden)
  const clustered = mode !== 'flow'
  const pos = await runLayout(buildDot(nodes, clustered))
  const rfNodes = nodes.map((n) => {
    const [cx, cy] = pos[n.id] ?? [0, 0]
    return rfNode(n, cx - NODE_WIDTH / 2, cy - NODE_HEIGHT / 2)
  })
  const result: LayoutResult = {
    nodes: rfNodes,
    edges: buildEdges(nodes),
    clusters: clustered ? clusterBoxes(nodes, rfNodes) : [],
  }
  writeCache(mode, layoutSignature(mode, nodes), result)
  return result
}

// The layout is deterministic in the node *structure*, so we cache the computed
// positions in localStorage keyed by a structural signature — a repeat load with
// unchanged content reuses them instantly while the worker isn't even needed.
// (Graphviz is fast enough that a miss is sub-second, so this is now a nicety,
// not a crutch.) The `gv` key prefix means old dagre-positioned caches are
// ignored after the engine swap.
type LayoutCache = { sig: string; pos: Record<string, [number, number]>; clusters: ClusterBox[] }
const cacheKey = (mode: LayoutMode) => `mathgraph-gvlayout-${mode}`

function layoutSignature(mode: LayoutMode, nodes: MathNode[]): string {
  let h = 0x811c9dc5
  const s = `${mode}|${nodes
    .map((n) => `${n.id}>${n.dependencies.join(',')}#${n.tags[0] ?? ''}`)
    .join('|')}`
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return `${(h >>> 0).toString(36)}.${nodes.length}`
}

function readCache(mode: LayoutMode, sig: string): LayoutCache | null {
  if (typeof localStorage === 'undefined') return null
  try {
    const raw = localStorage.getItem(cacheKey(mode))
    if (!raw) return null
    const c = JSON.parse(raw) as LayoutCache
    return c.sig === sig ? c : null
  } catch {
    return null
  }
}

function writeCache(mode: LayoutMode, sig: string, result: LayoutResult) {
  if (typeof localStorage === 'undefined') return
  try {
    const pos: Record<string, [number, number]> = {}
    for (const n of result.nodes) pos[n.id] = [n.position.x, n.position.y]
    localStorage.setItem(cacheKey(mode), JSON.stringify({ sig, pos, clusters: result.clusters }))
  } catch {
    // quota / serialization failure — just skip the cache
  }
}

/** The cached layout for a mode, rebuilt instantly (no worker) when the node
 *  structure is unchanged. Returns null on a miss — the caller then computes. */
export function cachedLayout(mode: LayoutMode, hidden: ReadonlySet<string>): LayoutResult | null {
  const nodes = visibleNodes(hidden)
  // The signature is over the *visible* nodes, so it already distinguishes the
  // default-collapsed load from an expanded one — one cached entry per mode.
  const cached = readCache(mode, layoutSignature(mode, nodes))
  if (!cached) return null
  const rfNodes = nodes.map((n) => {
    const p = cached.pos[n.id] ?? [0, 0]
    return rfNode(n, p[0], p[1])
  })
  return { nodes: rfNodes, edges: buildEdges(nodes), clusters: cached.clusters }
}

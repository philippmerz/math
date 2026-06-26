import dagre from '@dagrejs/dagre'
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
export type LayoutMode = 'flow' | 'grouped' | 'compact'

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

// ── dagre ────────────────────────────────────────────────────────────────
// `flow`: pure dependency layering (no clustering — areas may interleave).
// `grouped`: a compound graph that parents each node to its area cluster, so
// dagre keeps areas together and separates them.

type DagreBox = { x: number; y: number; width: number; height: number }

function dagreLayout(clustered: boolean, nodes: MathNode[]): LayoutResult {
  const visible = new Set(nodes.map((n) => n.id))
  const g = new dagre.graphlib.Graph({ compound: clustered })
  g.setDefaultEdgeLabel(() => ({}))
  g.setGraph({
    rankdir: 'TB',
    // Grouped: bias taller-and-narrower (big ranksep, tight nodesep) so the
    // top-to-bottom foundations → results cascade stays legible despite the
    // horizontal spread that clustering introduces.
    nodesep: clustered ? 22 : 40,
    ranksep: clustered ? 100 : 80,
    marginx: 48,
    marginy: 48,
  })

  const areas: string[] = []
  for (const node of nodes) {
    if (clustered) {
      const area = primaryArea(node)
      if (!areas.includes(area)) {
        areas.push(area)
        g.setNode(clusterId(area), {})
      }
    }
    g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT })
    if (clustered) g.setParent(node.id, clusterId(primaryArea(node)))
  }
  for (const node of nodes) {
    for (const dep of node.dependencies) {
      if (visible.has(dep)) g.setEdge(dep, node.id)
    }
  }

  dagre.layout(g)

  const rfNodes = nodes.map((node) => {
    const { x, y } = g.node(node.id) as DagreBox // dagre reports the centre
    return rfNode(node, x - NODE_WIDTH / 2, y - NODE_HEIGHT / 2)
  })

  // Hull boxes from the actual node bounds, not dagre's compound-node size —
  // the latter can be far wider than the nodes it holds (e.g. a sparse field
  // reserving empty space to its right), giving wide, mostly-empty hulls.
  const clusters: ClusterBox[] = clustered
    ? areas.map((area) => {
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
    : []

  return { nodes: rfNodes, edges: buildEdges(nodes), clusters }
}

// The dagre layout is expensive (seconds, for ~900 nodes in the compound
// `grouped` engine). It's deterministic in the node *structure*, so we cache the
// computed positions in localStorage keyed by a structural signature — a repeat
// load with unchanged content reuses them and skips the recompute entirely.
type LayoutCache = { sig: string; pos: Record<string, [number, number]>; clusters: ClusterBox[] }

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
    const raw = localStorage.getItem(`mathgraph-layout-${mode}`)
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
    localStorage.setItem(`mathgraph-layout-${mode}`, JSON.stringify({ sig, pos, clusters: result.clusters }))
  } catch {
    // quota / serialization failure — just skip the cache
  }
}

/** Synchronous dagre layout for a mode; used directly and as the ELK fallback.
 *  Cached by structural signature (only for the full graph — the common load). */
export function dagreLayoutFor(mode: LayoutMode, hidden: ReadonlySet<string>): LayoutResult {
  const nodes = visibleNodes(hidden)
  // The signature is over the *visible* nodes, so it already distinguishes the
  // default-collapsed load from an expanded one — one cached entry per mode.
  const sig = layoutSignature(mode, nodes)
  const cached = readCache(mode, sig)
  if (cached) {
    const rfNodes = nodes
      .filter((n) => cached.pos[n.id])
      .map((n) => rfNode(n, cached.pos[n.id][0], cached.pos[n.id][1]))
    return { nodes: rfNodes, edges: buildEdges(nodes), clusters: cached.clusters }
  }

  const result = dagreLayout(mode !== 'flow', nodes)
  writeCache(mode, sig, result)
  return result
}

// ── ELK ──────────────────────────────────────────────────────────────────
// `compact`: a hierarchical (nested) layered layout — each area is a group
// node, so ELK groups them tightly. Loaded and computed lazily (async), cached
// per visible-node set.

type ElkBox = { id: string; x: number; y: number; width: number; height: number; children?: ElkBox[] }

const elkCache = new Map<string, LayoutResult>()

export async function elkLayout(hidden: ReadonlySet<string>): Promise<LayoutResult> {
  const nodes = visibleNodes(hidden)
  const key = nodes.map((n) => n.id).join(',') // MATH_NODES order is stable
  const cached = elkCache.get(key)
  if (cached) return cached

  const ELK = (await import('elkjs/lib/elk.bundled.js')).default
  const elk = new ELK()
  const visible = new Set(nodes.map((n) => n.id))

  const areas: string[] = []
  const byArea = new Map<string, MathNode[]>()
  for (const n of nodes) {
    const a = primaryArea(n)
    if (!byArea.has(a)) {
      byArea.set(a, [])
      areas.push(a)
    }
    byArea.get(a)!.push(n)
  }

  const graph = {
    id: 'root',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': 'DOWN',
      'elk.hierarchyHandling': 'INCLUDE_CHILDREN',
      'elk.layered.spacing.nodeNodeBetweenLayers': '52',
      'elk.spacing.nodeNode': '28',
      'elk.spacing.componentComponent': '64',
      'elk.padding': '[top=28,left=28,bottom=28,right=28]',
    },
    children: areas.map((area) => ({
      id: clusterId(area),
      layoutOptions: { 'elk.padding': '[top=32,left=20,bottom=20,right=20]' },
      children: byArea.get(area)!.map((n) => ({ id: n.id, width: NODE_WIDTH, height: NODE_HEIGHT })),
    })),
    edges: nodes.flatMap((n) =>
      n.dependencies
        .filter((d) => visible.has(d))
        .map((d) => ({ id: `${d}->${n.id}`, sources: [d], targets: [n.id] })),
    ),
  }

  const res = (await elk.layout(graph)) as { children?: ElkBox[] }
  const byId = new Map(nodes.map((n) => [n.id, n]))
  const rfNodes: ConceptNode[] = []
  const clusters: ClusterBox[] = []

  for (const group of res.children ?? []) {
    clusters.push({
      id: group.id,
      area: group.id.replace('cluster:', ''),
      x: group.x,
      y: group.y,
      width: group.width,
      height: group.height,
    })
    for (const child of group.children ?? []) {
      const mn = byId.get(child.id)
      // ELK child coords are relative to the parent group.
      if (mn) rfNodes.push(rfNode(mn, group.x + child.x, group.y + child.y))
    }
  }

  const result: LayoutResult = { nodes: rfNodes, edges: buildEdges(nodes), clusters }
  elkCache.set(key, result)
  return result
}

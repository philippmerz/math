import dagre from '@dagrejs/dagre'
import { Position, type Edge, type Node } from '@xyflow/react'
import type { MathNode, NodeKind } from '../data/types'
import { MATH_NODES } from '../data/nodes'

export const NODE_WIDTH = 220
export const NODE_HEIGHT = 56

export type ConceptNodeData = {
  label: string
  kind: NodeKind
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

function buildEdges(): Edge[] {
  return MATH_NODES.flatMap((node) =>
    node.dependencies.map((dep) => ({ id: `${dep}->${node.id}`, source: dep, target: node.id })),
  )
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

function dagreLayout(clustered: boolean): LayoutResult {
  const g = new dagre.graphlib.Graph({ compound: clustered })
  g.setDefaultEdgeLabel(() => ({}))
  g.setGraph({
    rankdir: 'TB',
    nodesep: clustered ? 26 : 40,
    ranksep: clustered ? 64 : 80,
    marginx: 48,
    marginy: 48,
  })

  const areas: string[] = []
  for (const node of MATH_NODES) {
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
  for (const node of MATH_NODES) {
    for (const dep of node.dependencies) g.setEdge(dep, node.id)
  }

  dagre.layout(g)

  const nodes = MATH_NODES.map((node) => {
    const { x, y } = g.node(node.id) as DagreBox // dagre reports the centre
    return rfNode(node, x - NODE_WIDTH / 2, y - NODE_HEIGHT / 2)
  })

  const clusters: ClusterBox[] = clustered
    ? areas.map((area) => {
        const c = g.node(clusterId(area)) as DagreBox
        return {
          id: clusterId(area),
          area,
          x: c.x - c.width / 2,
          y: c.y - c.height / 2,
          width: c.width,
          height: c.height,
        }
      })
    : []

  return { nodes, edges: buildEdges(), clusters }
}

export const FLOW_LAYOUT = dagreLayout(false)
export const GROUPED_LAYOUT = dagreLayout(true)

// ── ELK ──────────────────────────────────────────────────────────────────
// `compact`: a hierarchical (nested) layered layout — each area is a group
// node, so ELK groups them tightly. Loaded and computed lazily (async), cached.

type ElkBox = { id: string; x: number; y: number; width: number; height: number; children?: ElkBox[] }

let elkCache: LayoutResult | null = null

export async function elkLayout(): Promise<LayoutResult> {
  if (elkCache) return elkCache

  const ELK = (await import('elkjs/lib/elk.bundled.js')).default
  const elk = new ELK()

  const areas: string[] = []
  const byArea = new Map<string, MathNode[]>()
  for (const n of MATH_NODES) {
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
    edges: MATH_NODES.flatMap((n) =>
      n.dependencies.map((d) => ({ id: `${d}->${n.id}`, sources: [d], targets: [n.id] })),
    ),
  }

  const res = (await elk.layout(graph)) as { children?: ElkBox[] }
  const nodeById = new Map(MATH_NODES.map((n) => [n.id, n]))
  const nodes: ConceptNode[] = []
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
      const mn = nodeById.get(child.id)
      // ELK child coords are relative to the parent group.
      if (mn) nodes.push(rfNode(mn, group.x + child.x, group.y + child.y))
    }
  }

  elkCache = { nodes, edges: buildEdges(), clusters }
  return elkCache
}

/** Resolve a layout for the given mode (dagre modes are synchronous & cached). */
export async function getLayout(mode: LayoutMode): Promise<LayoutResult> {
  if (mode === 'flow') return FLOW_LAYOUT
  if (mode === 'grouped') return GROUPED_LAYOUT
  return elkLayout()
}

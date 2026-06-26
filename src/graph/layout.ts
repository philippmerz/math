import dagre from '@dagrejs/dagre'
import { Position, type Edge, type Node } from '@xyflow/react'
import type { NodeKind } from '../data/types'
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

const clusterId = (area: string) => `cluster:${area}`

/**
 * Run dagre once to assign every node a position. We use a *compound* graph:
 * each node is parented to a cluster keyed by its primary area (`tags[0]`), so
 * dagre keeps same-area nodes together and separates the areas — instead of
 * interleaving them by dependency rank alone. Within-group spacing is kept tight
 * (`nodesep`); the clustering itself supplies the larger between-group gaps.
 */
function buildGraph(): { nodes: ConceptNode[]; edges: Edge[]; clusters: ClusterBox[] } {
  const g = new dagre.graphlib.Graph({ compound: true })
  g.setDefaultEdgeLabel(() => ({}))
  g.setGraph({ rankdir: 'TB', nodesep: 26, ranksep: 64, marginx: 48, marginy: 48 })

  const areas: string[] = []
  for (const node of MATH_NODES) {
    const area = node.tags[0] ?? 'Other'
    if (!areas.includes(area)) {
      areas.push(area)
      g.setNode(clusterId(area), {})
    }
    g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT })
    g.setParent(node.id, clusterId(area))
  }

  const edges: Edge[] = []
  for (const node of MATH_NODES) {
    for (const dep of node.dependencies) {
      g.setEdge(dep, node.id)
      edges.push({ id: `${dep}->${node.id}`, source: dep, target: node.id })
    }
  }

  dagre.layout(g)

  const nodes: ConceptNode[] = MATH_NODES.map((node) => {
    const { x, y } = g.node(node.id) // dagre reports the node's centre
    return {
      id: node.id,
      type: 'concept',
      position: { x: x - NODE_WIDTH / 2, y: y - NODE_HEIGHT / 2 },
      data: { label: node.label, kind: node.kind },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    }
  })

  const clusters: ClusterBox[] = areas.map((area) => {
    const c = g.node(clusterId(area)) as { x: number; y: number; width: number; height: number }
    return {
      id: clusterId(area),
      area,
      x: c.x - c.width / 2,
      y: c.y - c.height / 2,
      width: c.width,
      height: c.height,
    }
  })

  return { nodes, edges, clusters }
}

export const { nodes: layoutNodes, edges: layoutEdges, clusters: layoutClusters } = buildGraph()

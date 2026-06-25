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

/**
 * Run dagre once to assign every node a position in a top-down layered layout,
 * with an edge from each prerequisite to the concept it enables. The result is
 * static — the graph never re-lays-out — so we compute it at module load.
 */
function buildGraph(): { nodes: ConceptNode[]; edges: Edge[] } {
  const g = new dagre.graphlib.Graph()
  g.setDefaultEdgeLabel(() => ({}))
  g.setGraph({ rankdir: 'TB', nodesep: 40, ranksep: 80, marginx: 48, marginy: 48 })

  for (const node of MATH_NODES) {
    g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT })
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

  return { nodes, edges }
}

export const { nodes: layoutNodes, edges: layoutEdges } = buildGraph()

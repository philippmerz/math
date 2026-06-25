import { useEffect, useMemo } from 'react'
import {
  Background,
  Controls,
  MarkerType,
  ReactFlow,
  useNodesState,
  useReactFlow,
  type Edge,
} from '@xyflow/react'
import { ConceptNode } from './ConceptNode'
import {
  layoutEdges,
  layoutNodes,
  NODE_HEIGHT,
  NODE_WIDTH,
  type ConceptNode as ConceptNodeType,
} from './layout'
import type { Theme } from '../hooks/useTheme'

const nodeTypes = { concept: ConceptNode }

type Props = {
  theme: Theme
  selectedId: string | null
  /** ids matching the current search, or null when the search is empty. */
  matchIds: ReadonlySet<string> | null
  onSelect: (id: string | null) => void
}

export function GraphView({ theme, selectedId, matchIds, onSelect }: Props) {
  // `nodes` carries React Flow's measured dimensions; we layer flags on top.
  const [nodes, , onNodesChange] = useNodesState<ConceptNodeType>(layoutNodes)
  const rf = useReactFlow()

  const displayNodes = useMemo(
    () =>
      nodes.map((n) => ({
        ...n,
        selected: n.id === selectedId,
        className: matchIds && !matchIds.has(n.id) ? 'is-dimmed' : undefined,
      })),
    [nodes, selectedId, matchIds],
  )

  const stroke = theme === 'dark' ? '#ffffff' : '#000000'
  const edges = useMemo<Edge[]>(
    () =>
      layoutEdges.map((e) => ({
        ...e,
        style: { stroke, strokeWidth: 1.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: stroke, width: 16, height: 16 },
      })),
    [stroke],
  )

  // Glide the camera to the selected node whenever the selection changes.
  useEffect(() => {
    if (!selectedId) return
    const node = rf.getNode(selectedId)
    if (!node) return
    const w = node.measured?.width ?? NODE_WIDTH
    const h = node.measured?.height ?? NODE_HEIGHT
    rf.setCenter(node.position.x + w / 2, node.position.y + h / 2, { zoom: 1.25, duration: 500 })
  }, [selectedId, rf])

  return (
    <ReactFlow
      nodes={displayNodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onNodeClick={(_, node) => onSelect(node.id)}
      onPaneClick={() => onSelect(null)}
      nodeTypes={nodeTypes}
      colorMode={theme}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      minZoom={0.2}
      maxZoom={2.5}
      nodesDraggable={false}
      nodesConnectable={false}
      proOptions={{ hideAttribution: true }}
    >
      <Background gap={28} size={1} color={theme === 'dark' ? '#141414' : '#ececec'} />
      <Controls showInteractive={false} position="bottom-right" />
    </ReactFlow>
  )
}

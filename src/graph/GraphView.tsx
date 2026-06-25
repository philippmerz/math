import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Background,
  Controls,
  MarkerType,
  ReactFlow,
  useNodesState,
  useReactFlow,
  type Edge,
  type Viewport,
} from '@xyflow/react'
import { ConceptNode } from './ConceptNode'
import {
  layoutEdges,
  layoutNodes,
  NODE_HEIGHT,
  NODE_WIDTH,
  type ConceptNode as ConceptNodeType,
} from './layout'
import { nodeById } from '../data/graph'
import type { Theme } from '../hooks/useTheme'

// Below this fraction of all nodes in view, the camera is "focused" on a region
// and we name its dominant area; at or above it (zoomed out) we show nothing.
const FOCUSED_FRACTION = 0.6

/** The dominant mathematical area(s) among the nodes inside the viewport. */
function areaInView(vp: Viewport): string | null {
  const { x, y, zoom } = vp
  const w = window.innerWidth
  const h = window.innerHeight
  const [minX, maxX] = [-x / zoom, (-x + w) / zoom]
  const [minY, maxY] = [-y / zoom, (-y + h) / zoom]

  const counts = new Map<string, number>()
  let inView = 0
  for (const n of layoutNodes) {
    const cx = n.position.x + NODE_WIDTH / 2
    const cy = n.position.y + NODE_HEIGHT / 2
    if (cx < minX || cx > maxX || cy < minY || cy > maxY) continue
    inView++
    for (const tag of nodeById.get(n.id)?.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  if (inView === 0 || inView >= layoutNodes.length * FOCUSED_FRACTION) return null
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1])
  const top = sorted[0][1]
  // Name every area at least half as common as the leader (max two).
  return sorted
    .filter(([, c]) => c >= top * 0.5)
    .slice(0, 2)
    .map(([tag]) => tag)
    .join(' · ')
}

const nodeTypes = { concept: ConceptNode }

type Props = {
  theme: Theme
  selectedId: string | null
  /** ids matching the current search, or null when the search is empty. */
  matchIds: ReadonlySet<string> | null
  onSelect: (id: string | null) => void
  /** Reports the dominant area currently in view (null when zoomed out). */
  onAreaChange: (area: string | null) => void
}

export function GraphView({ theme, selectedId, matchIds, onSelect, onAreaChange }: Props) {
  // `nodes` carries React Flow's measured dimensions; we layer flags on top.
  const [nodes, , onNodesChange] = useNodesState<ConceptNodeType>(layoutNodes)
  const rf = useReactFlow()

  const reportArea = useCallback(() => onAreaChange(areaInView(rf.getViewport())), [onAreaChange, rf])

  // Report once after the initial fitView settles, then on every camera move.
  useEffect(() => {
    const id = window.setTimeout(reportArea, 250)
    return () => window.clearTimeout(id)
  }, [reportArea])

  // Hover tooltip, rendered in screen space so it stays legible at any zoom.
  const [tip, setTip] = useState<{ id: string; x: number; y: number } | null>(null)
  const tipNode = tip ? nodeById.get(tip.id) ?? null : null

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
  const dimStroke = theme === 'dark' ? '#555555' : '#c4c4c4'
  // Edges touching the hovered node light up; the rest stay muted.
  const hoveredId = tip?.id ?? null
  const edges = useMemo<Edge[]>(
    () =>
      layoutEdges.map((e) => {
        const active = hoveredId != null && (e.source === hoveredId || e.target === hoveredId)
        const color = active ? stroke : dimStroke
        return {
          ...e,
          style: { stroke: color, strokeWidth: active ? 2 : 1.2 },
          markerEnd: { type: MarkerType.ArrowClosed, color, width: 16, height: 16 },
          zIndex: active ? 1 : 0,
        }
      }),
    [stroke, dimStroke, hoveredId],
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
    <>
    <ReactFlow
      nodes={displayNodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onNodeClick={(_, node) => onSelect(node.id)}
      onPaneClick={() => onSelect(null)}
      onNodeMouseEnter={(e, node) => setTip({ id: node.id, x: e.clientX, y: e.clientY })}
      onNodeMouseMove={(e, node) => setTip({ id: node.id, x: e.clientX, y: e.clientY })}
      onNodeMouseLeave={() => setTip(null)}
      onMoveEnd={reportArea}
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
    {tip && tipNode && (
      <div
        className="node-tip"
        style={{
          left: tip.x + 16 + 260 > window.innerWidth ? tip.x - 16 - 260 : tip.x + 16,
          top: Math.min(tip.y + 16, window.innerHeight - 96),
        }}
      >
        <span className="node-tip__kind">{tipNode.kind}</span>
        <span className="node-tip__title">{tipNode.title}</span>
        {tipNode.tags.length > 0 && (
          <span className="node-tip__tags">{tipNode.tags.join(' · ')}</span>
        )}
      </div>
    )}
    </>
  )
}

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Background,
  Controls,
  MarkerType,
  ReactFlow,
  ViewportPortal,
  useNodesState,
  useReactFlow,
  type Edge,
  type Viewport,
} from '@xyflow/react'
import { ConceptNode } from './ConceptNode'
import { NodeTip } from './NodeTip'
import {
  NODE_HEIGHT,
  NODE_WIDTH,
  type ConceptNode as ConceptNodeType,
  type LayoutMode,
  type LayoutResult,
} from './layout'
import { nodeById } from '../data/graph'
import { isoGroupByCanonical } from '../data/variants'
import { useIntroTour } from '../hooks/useIntroTour'
import { useDoubleTapZoom } from '../hooks/useDoubleTapZoom'
import type { Theme } from '../hooks/useTheme'

const CLUSTER_PAD = 26

// Below this fraction of all nodes in view, the camera is "focused" on a region
// and we name its dominant area; at or above it (zoomed out) we show nothing.
const FOCUSED_FRACTION = 0.6

/** The dominant mathematical area(s) among the nodes inside the viewport. */
function areaInView(vp: Viewport, nodes: ConceptNodeType[]): string | null {
  const { x, y, zoom } = vp
  const w = window.innerWidth
  const h = window.innerHeight
  const [minX, maxX] = [-x / zoom, (-x + w) / zoom]
  const [minY, maxY] = [-y / zoom, (-y + h) / zoom]

  const counts = new Map<string, number>()
  let inView = 0
  for (const n of nodes) {
    const cx = n.position.x + NODE_WIDTH / 2
    const cy = n.position.y + NODE_HEIGHT / 2
    if (cx < minX || cx > maxX || cy < minY || cy > maxY) continue
    inView++
    for (const tag of nodeById.get(n.id)?.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  if (inView === 0 || inView >= nodes.length * FOCUSED_FRACTION) return null
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
  layout: LayoutResult
  layoutMode: LayoutMode
  selectedId: string | null
  /** ids matching the current search, or null when the search is empty. */
  matchIds: ReadonlySet<string> | null
  /** When set, nodes outside this area are greyed out. */
  focusTag: string | null
  /** Kinds to show; when non-empty, nodes of other kinds are greyed out. */
  kindFilter: ReadonlySet<string>
  /** When the search narrows to one node, glide the camera onto it. */
  focusNodeId: string | null
  /** Canonicals whose constructions are individually expanded. */
  expanded: ReadonlySet<string>
  /** When set, all constructions are revealed and per-node badges are hidden. */
  showAllConstructions: boolean
  onToggleExpand: (canonicalId: string) => void
  /** The canonical just expanded/collapsed; framed after the relayout. */
  revealTarget: string | null
  revealNonce: number
  onSelect: (id: string | null) => void
  /** Reports the dominant area currently in view (null when zoomed out). */
  onAreaChange: (area: string | null) => void
}

export function GraphView({
  theme,
  layout,
  layoutMode,
  selectedId,
  matchIds,
  focusTag,
  kindFilter,
  focusNodeId,
  expanded,
  showAllConstructions,
  onToggleExpand,
  revealTarget,
  revealNonce,
  onSelect,
  onAreaChange,
}: Props) {
  // `nodes` carries React Flow's measured dimensions; we layer flags on top.
  const [nodes, setNodes, onNodesChange] = useNodesState<ConceptNodeType>(layout.nodes)
  const rf = useReactFlow()

  // A one-time cinematic pan across the graph on first load (desktop only).
  useIntroTour(layout.nodes)
  // Touch: double-tap and drag to zoom about the tap point.
  useDoubleTapZoom()

  const reportArea = useCallback(
    () => onAreaChange(areaInView(rf.getViewport(), layout.nodes)),
    [onAreaChange, rf, layout],
  )

  // Swap in the new positions whenever the layout changes (engine or visibility).
  useEffect(() => {
    setNodes(layout.nodes)
  }, [layout, setNodes])

  // Re-fit the whole graph on a "global" view change — engine swap or the
  // show-all-constructions toggle. (The initial fit is handled by `fitView`.)
  const didMount = useRef(false)
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }
    const id = window.setTimeout(() => rf.fitView({ padding: 0.2, duration: 400 }), 60)
    return () => window.clearTimeout(id)
  }, [layoutMode, showAllConstructions, rf])

  // After expanding/collapsing one canonical, frame it and any revealed
  // constructions, so focus stays put rather than re-fitting the whole graph.
  useEffect(() => {
    if (!revealTarget) return
    const ids = [
      revealTarget,
      ...(isoGroupByCanonical.get(revealTarget)?.variants ?? []),
    ].map((id) => ({ id }))
    const t = window.setTimeout(() => rf.fitView({ nodes: ids, padding: 0.4, duration: 500 }), 90)
    return () => window.clearTimeout(t)
  }, [revealNonce, revealTarget, rf])

  // Report once after the initial fitView settles, then on every camera move.
  useEffect(() => {
    const id = window.setTimeout(reportArea, 250)
    return () => window.clearTimeout(id)
  }, [reportArea])

  // Hover tooltip, rendered in screen space so it stays legible at any zoom.
  const [tip, setTip] = useState<{ id: string; x: number; y: number } | null>(null)
  const tipNode = tip ? nodeById.get(tip.id) ?? null : null

  const displayNodes = useMemo(() => {
    const isDimmed = (id: string) => {
      const n = nodeById.get(id)
      return (
        (matchIds != null && !matchIds.has(id)) ||
        (focusTag != null && !(n?.tags.includes(focusTag) ?? false)) ||
        (kindFilter.size > 0 && !(n != null && kindFilter.has(n.kind)))
      )
    }
    return nodes.map((n) => {
      // A canonical with collapsible constructions carries an expand badge,
      // unless the global "show all constructions" override is on.
      const group = showAllConstructions ? undefined : isoGroupByCanonical.get(n.id)
      const data = group
        ? {
            ...n.data,
            expand: {
              count: group.variants.length,
              expanded: expanded.has(n.id),
              onToggle: () => onToggleExpand(n.id),
            },
          }
        : n.data
      return {
        ...n,
        data,
        selected: n.id === selectedId,
        className: isDimmed(n.id) ? 'is-dimmed' : undefined,
      }
    })
  }, [
    nodes,
    selectedId,
    matchIds,
    focusTag,
    kindFilter,
    showAllConstructions,
    expanded,
    onToggleExpand,
  ])

  const stroke = theme === 'dark' ? '#ffffff' : '#000000'
  const dimStroke = theme === 'dark' ? '#555555' : '#c4c4c4'
  // Edges touching the hovered or selected node light up; the rest stay muted.
  const hoveredId = tip?.id ?? null
  const edges = useMemo<Edge[]>(
    () =>
      layout.edges.map((e) => {
        const touches = (id: string | null) => id != null && (e.source === id || e.target === id)
        const active = touches(hoveredId) || touches(selectedId)
        const color = active ? stroke : dimStroke
        // A construction → canonical edge is an isomorphism, drawn dashed.
        const iso = (e.data as { iso?: boolean } | undefined)?.iso
        return {
          ...e,
          style: {
            stroke: color,
            strokeWidth: active ? 2 : 1.2,
            ...(iso ? { strokeDasharray: '6 4' } : {}),
          },
          markerEnd: { type: MarkerType.ArrowClosed, color, width: 16, height: 16 },
          zIndex: active ? 1 : 0,
          // no click action on edges → drop the hit-area so pans can start on them
          interactionWidth: 0,
        }
      }),
    [layout, stroke, dimStroke, hoveredId, selectedId],
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

  // When the search narrows to a single node, glide the camera onto it.
  useEffect(() => {
    if (!focusNodeId) return
    const node = rf.getNode(focusNodeId)
    if (!node) return
    const w = node.measured?.width ?? NODE_WIDTH
    const h = node.measured?.height ?? NODE_HEIGHT
    rf.setCenter(node.position.x + w / 2, node.position.y + h / 2, { zoom: 1.2, duration: 500 })
  }, [focusNodeId, rf])

  // Selecting a tag frames that area's group (runs slightly late so it wins over
  // any concurrent layout-change fit).
  useEffect(() => {
    if (!focusTag) return
    const ids = layout.nodes
      .filter((n) => nodeById.get(n.id)?.tags.includes(focusTag))
      .map((n) => ({ id: n.id }))
    if (ids.length === 0) return
    const t = window.setTimeout(() => rf.fitView({ nodes: ids, padding: 0.25, duration: 600 }), 80)
    return () => window.clearTimeout(t)
  }, [focusTag, layout, rf])

  const clusters = layout.clusters

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
        minZoom={0.05}
        maxZoom={5}
        nodesDraggable={false}
        nodesConnectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <ViewportPortal>
          {clusters.map((c, i) => {
            // Evenly spaced hue per area; very low opacity so it stays a hint.
            const hue = Math.round((i * 360) / clusters.length)
            return (
              <div
                key={c.id}
                className="cluster-hull"
                style={{
                  position: 'absolute',
                  left: c.x - CLUSTER_PAD,
                  top: c.y - CLUSTER_PAD,
                  width: c.width + CLUSTER_PAD * 2,
                  height: c.height + CLUSTER_PAD * 2,
                  background: `hsl(${hue} 65% 55% / 0.1)`,
                }}
              >
                <span className="cluster-hull__label">{c.area}</span>
              </div>
            )
          })}
        </ViewportPortal>
        <Background gap={28} size={1} color={theme === 'dark' ? '#141414' : '#ececec'} />
        <Controls showInteractive={false} position="bottom-right" />
      </ReactFlow>
      {tip && tipNode && <NodeTip x={tip.x} y={tip.y} node={tipNode} />}
    </>
  )
}

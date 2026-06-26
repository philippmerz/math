import { useEffect, useRef, useState } from 'react'
import { useReactFlow } from '@xyflow/react'
import { NODE_HEIGHT, NODE_WIDTH, type ConceptNode } from '../graph/layout'

const PAN_STEP = 90 // px per arrow press
const ZOOM_STEP = 1.25

const isTyping = (t: EventTarget | null): boolean => {
  const el = t as HTMLElement | null
  return !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)
}

/** Nodes whose centre currently sits inside the viewport, in reading order. */
function nodesInView(
  nodes: ConceptNode[],
  vp: { x: number; y: number; zoom: number },
): ConceptNode[] {
  const { x, y, zoom } = vp
  const minX = -x / zoom
  const maxX = (-x + window.innerWidth) / zoom
  const minY = -y / zoom
  const maxY = (-y + window.innerHeight) / zoom
  return nodes
    .filter((n) => {
      const cx = n.position.x + NODE_WIDTH / 2
      const cy = n.position.y + NODE_HEIGHT / 2
      return cx >= minX && cx <= maxX && cy >= minY && cy <= maxY
    })
    .sort((a, b) => a.position.y - b.position.y || a.position.x - b.position.x)
}

/**
 * Keyboard navigation for the graph:
 * - arrow keys pan the camera,
 * - ⌘/Ctrl +/-/0 zoom (or fit), overriding the browser's native page zoom,
 * - Tab / Shift-Tab cycle a highlight through the nodes currently in view,
 * - Enter opens the highlighted node's details.
 * (Escape closing the panel is handled in App.) Returns the highlighted node id
 * so the view can draw a focus ring. Inert while typing in a field.
 */
export function useKeyboardNav(nodes: ConceptNode[], onSelect: (id: string) => void) {
  const rf = useReactFlow()
  const [focusedId, setFocusedId] = useState<string | null>(null)
  // Refs so the listener (bound once) always sees the latest values.
  const focusedRef = useRef<string | null>(null)
  focusedRef.current = focusedId
  const nodesRef = useRef(nodes)
  nodesRef.current = nodes
  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey

      // Zoom — override the browser's page zoom.
      if (mod && (e.key === '=' || e.key === '+')) {
        e.preventDefault()
        rf.zoomTo(rf.getZoom() * ZOOM_STEP, { duration: 150 })
        return
      }
      if (mod && (e.key === '-' || e.key === '_')) {
        e.preventDefault()
        rf.zoomTo(rf.getZoom() / ZOOM_STEP, { duration: 150 })
        return
      }
      if (mod && e.key === '0') {
        e.preventDefault()
        rf.fitView({ padding: 0.2, duration: 300 })
        return
      }

      if (mod || isTyping(e.target)) return

      if (e.key.startsWith('Arrow')) {
        e.preventDefault()
        const vp = rf.getViewport()
        const dx = e.key === 'ArrowLeft' ? PAN_STEP : e.key === 'ArrowRight' ? -PAN_STEP : 0
        const dy = e.key === 'ArrowUp' ? PAN_STEP : e.key === 'ArrowDown' ? -PAN_STEP : 0
        rf.setViewport({ x: vp.x + dx, y: vp.y + dy, zoom: vp.zoom }, { duration: 120 })
        return
      }

      if (e.key === 'Tab') {
        const list = nodesInView(nodesRef.current, rf.getViewport())
        if (list.length === 0) return
        e.preventDefault()
        const i = list.findIndex((n) => n.id === focusedRef.current)
        const next = e.shiftKey
          ? i <= 0
            ? list.length - 1
            : i - 1
          : i >= list.length - 1
            ? 0
            : i + 1
        setFocusedId(list[next].id)
        return
      }

      if (e.key === 'Enter' && focusedRef.current) {
        e.preventDefault()
        onSelectRef.current(focusedRef.current)
        return
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [rf])

  return focusedId
}

import { useEffect } from 'react'
import { useReactFlow } from '@xyflow/react'

const DOUBLE_TAP_MS = 300 // max gap between the two taps
const TAP_SLOP = 32 // px; the second tap must land near the first
const DRAG_START = 6 // px of vertical travel before we treat it as a zoom
const ZOOM_PER_PX = 0.005 // sensitivity; drag down zooms in, up zooms out
const MIN_ZOOM = 0.05
const MAX_ZOOM = 5

/**
 * Touch-only "double-tap and drag to zoom" (à la Google Maps): double-tap, then
 * keep the finger down and drag — down to zoom in, up to zoom out — about the
 * tap point. A plain double-tap is left untouched (React Flow's own step-zoom
 * still fires); we only take over once the finger starts dragging, so normal
 * one-finger panning and two-finger pinch keep working.
 */
export function useDoubleTapZoom() {
  const rf = useReactFlow()

  useEffect(() => {
    if (!window.matchMedia('(pointer: coarse)').matches) return
    const root = document.querySelector('.react-flow')
    if (!root) return

    let lastTapTime = 0
    let lastTapX = 0
    let lastTapY = 0
    let active = false // armed by a double-tap, finger still down
    let startY = 0
    let anchorX = 0
    let anchorY = 0
    let startZoom = 1
    let flowAnchor = { x: 0, y: 0 }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) {
        active = false
        return
      }
      const t = e.touches[0]
      const now = performance.now()
      const near =
        Math.abs(t.clientX - lastTapX) < TAP_SLOP && Math.abs(t.clientY - lastTapY) < TAP_SLOP
      if (now - lastTapTime < DOUBLE_TAP_MS && near) {
        active = true
        startY = t.clientY
        anchorX = t.clientX
        anchorY = t.clientY
        startZoom = rf.getZoom()
        flowAnchor = rf.screenToFlowPosition({ x: anchorX, y: anchorY })
      }
      lastTapTime = now
      lastTapX = t.clientX
      lastTapY = t.clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!active || e.touches.length !== 1) return
      // We own this gesture now — keep React Flow from panning underneath.
      e.preventDefault()
      e.stopPropagation()
      const dy = e.touches[0].clientY - startY
      if (Math.abs(dy) < DRAG_START) return
      const zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, startZoom * Math.exp(dy * ZOOM_PER_PX)))
      // Hold the flow point under the tap fixed while the zoom changes.
      rf.setViewport({ x: anchorX - flowAnchor.x * zoom, y: anchorY - flowAnchor.y * zoom, zoom })
    }

    const onTouchEnd = () => {
      active = false
    }

    root.addEventListener('touchstart', onTouchStart, { capture: true, passive: true })
    root.addEventListener('touchmove', onTouchMove, { capture: true, passive: false })
    root.addEventListener('touchend', onTouchEnd, { capture: true })
    root.addEventListener('touchcancel', onTouchEnd, { capture: true })
    return () => {
      root.removeEventListener('touchstart', onTouchStart, true)
      root.removeEventListener('touchmove', onTouchMove, true)
      root.removeEventListener('touchend', onTouchEnd, true)
      root.removeEventListener('touchcancel', onTouchEnd, true)
    }
  }, [rf])
}

import { useEffect } from 'react'
import { useReactFlow, type Viewport } from '@xyflow/react'
import { NODE_HEIGHT, NODE_WIDTH, type ConceptNode } from '../graph/layout'

// A very slow drift, for unhurried "landscape gazing". Speed is a near-constant
// on-screen velocity; the duration cap just bounds an unattended run on a huge
// graph (the user interrupts long before, and can always restart by reloading).
const SPEED_PX_PER_SEC = 45
const MIN_MS = 20000
const MAX_MS = 180000
const START_HOLD_MS = 700 // settle on the start view before drifting
const RAMP_MS = 1200 // brief velocity ramp-in so the drift doesn't start with a jolt
const ZOOM_MIN = 0.32
const ZOOM_MAX = 0.85

export type IntroPlan = { start: Viewport; end: Viewport; durationMs: number }

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

function contentBounds(nodes: ConceptNode[]) {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const n of nodes) {
    minX = Math.min(minX, n.position.x)
    minY = Math.min(minY, n.position.y)
    maxX = Math.max(maxX, n.position.x + NODE_WIDTH)
    maxY = Math.max(maxY, n.position.y + NODE_HEIGHT)
  }
  return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY }
}

/**
 * Plan a one-time intro: a readable zoom that fits the graph's short axis, then
 * a slow drift from one end of the long axis to the other so every field passes
 * by. Returns viewports (not centres) so the caller can drop the camera straight
 * onto `start` via `defaultViewport` — no zoomed-out fit, no jumpy transition.
 * Returns null when there's nothing to show.
 */
export function planIntro(nodes: ConceptNode[], vw: number, vh: number): IntroPlan | null {
  if (nodes.length === 0) return null
  const b = contentBounds(nodes)
  const vertical = b.height >= b.width
  const crossFit = vertical ? (vw * 0.92) / b.width : (vh * 0.92) / b.height
  const zoom = clamp(crossFit, ZOOM_MIN, ZOOM_MAX)

  const midX = (b.minX + b.maxX) / 2
  const midY = (b.minY + b.maxY) / 2
  const halfW = vw / 2 / zoom
  const halfH = vh / 2 / zoom
  // Centres at each end of the long axis (clamped so a small graph just centres).
  const startC = vertical
    ? { cx: midX, cy: Math.min(b.minY + halfH, midY) }
    : { cx: Math.min(b.minX + halfW, midX), cy: midY }
  const endC = vertical
    ? { cx: midX, cy: Math.max(b.maxY - halfH, midY) }
    : { cx: Math.max(b.maxX - halfW, midX), cy: midY }

  const toViewport = (c: { cx: number; cy: number }): Viewport => ({
    x: vw / 2 - c.cx * zoom,
    y: vh / 2 - c.cy * zoom,
    zoom,
  })
  const start = toViewport(startC)
  const end = toViewport(endC)
  const travelPx = Math.hypot(end.x - start.x, end.y - start.y)
  const durationMs = clamp((travelPx / SPEED_PX_PER_SEC) * 1000, MIN_MS, MAX_MS)
  return { start, end, durationMs }
}

/**
 * Runs the planned intro drift (see {@link planIntro}). The camera already sits
 * at `plan.start` (placed by the caller's `defaultViewport`), so this holds a
 * beat, then drifts to `plan.end` with an own requestAnimationFrame loop at a
 * fixed zoom — React Flow's own timed `setViewport` can't be used here because
 * its d3 "fly-to" interpolation zooms out to cross a long distance, which would
 * ruin the steady, zoomed-in gaze. It bows out the moment the user does
 * something deliberate — scroll, click/drag, or a key — but plain mouse movement
 * (idly hovering nodes) leaves it running. Pass `null` to do nothing.
 */
export function useIntroTour(plan: IntroPlan | null) {
  const rf = useReactFlow()

  useEffect(() => {
    if (!plan) return
    let cancelled = false
    let timer = 0
    let raf = 0

    const remove = () => {
      window.removeEventListener('wheel', stop, true)
      window.removeEventListener('pointerdown', stop, true)
      window.removeEventListener('keydown', stop, true)
    }
    function stop() {
      if (cancelled) return
      cancelled = true
      clearTimeout(timer)
      cancelAnimationFrame(raf)
      remove()
    }

    // Capture phase: React Flow stops propagation of its own pane events.
    window.addEventListener('wheel', stop, { capture: true, passive: true })
    window.addEventListener('pointerdown', stop, true)
    window.addEventListener('keydown', stop, true)

    timer = window.setTimeout(() => {
      if (cancelled) return
      const t0 = performance.now()
      const { start, end, durationMs } = plan
      const r = RAMP_MS / durationMs
      const frame = (now: number) => {
        if (cancelled) return
        // Constant velocity (steady gazing), with a short ease-in so it doesn't
        // start with a jolt. `e` is the eased fraction of the total travel.
        const t = Math.min(1, (now - t0) / durationMs)
        const e = t < r ? (t * t) / (2 * r) : t - r / 2
        rf.setViewport({
          x: start.x + (end.x - start.x) * e,
          y: start.y + (end.y - start.y) * e,
          zoom: start.zoom, // held constant — a steady pan, never a zoom-out
        })
        if (now - t0 < durationMs) raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
    }, START_HOLD_MS)

    return () => {
      cancelled = true
      clearTimeout(timer)
      cancelAnimationFrame(raf)
      remove()
    }
  }, [rf, plan])
}

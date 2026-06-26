import { useEffect, useRef } from 'react'
import { useReactFlow } from '@xyflow/react'
import { NODE_HEIGHT, NODE_WIDTH, type ConceptNode } from '../graph/layout'

type Pose = { cx: number; cy: number; zoom: number }

const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2

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
 * A one-time cinematic intro, desktop only: after the graph settles, the camera
 * eases into a readable zoom and slowly drifts along the graph's long axis, so
 * every field scrolls past once. It bows out the instant the user does anything
 * deliberate — scroll, click/drag, or a key — but plain mouse movement leaves it
 * running. Skipped on touch devices and when the user prefers reduced motion.
 */
export function useIntroTour(nodes: ConceptNode[]) {
  const rf = useReactFlow()
  // The latest layout, read once when the tour fires — so a later layout swap
  // (e.g. the async ELK engine) never restarts or cancels an in-flight tour.
  const nodesRef = useRef(nodes)
  nodesRef.current = nodes

  useEffect(() => {
    const laid = nodesRef.current
    if (laid.length === 0) return
    const desktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!desktop || reduced) return

    const W = window.innerWidth
    const H = window.innerHeight
    const b = contentBounds(laid)

    // Fit the cross-axis; scroll along the longer one. Clamp the zoom so it lands
    // at a pleasant, readable level whatever the graph's size.
    const vertical = b.height >= b.width
    const crossFit = vertical ? (W * 0.92) / b.width : (H * 0.92) / b.height
    const zoom = Math.min(0.85, Math.max(0.32, crossFit))

    const halfW = W / 2 / zoom
    const halfH = H / 2 / zoom
    const midX = (b.minX + b.maxX) / 2
    const midY = (b.minY + b.maxY) / 2
    let start: Pose
    let end: Pose
    if (vertical) {
      start = { cx: midX, cy: Math.min(b.minY + halfH, midY), zoom }
      end = { cx: midX, cy: Math.max(b.maxY - halfH, midY), zoom }
    } else {
      start = { cx: Math.min(b.minX + halfW, midX), cy: midY, zoom }
      end = { cx: Math.max(b.maxX - halfW, midX), cy: midY, zoom }
    }

    // Constant on-screen velocity, so the drift feels equally slow on any graph.
    const travelPx = Math.hypot((end.cx - start.cx) * zoom, (end.cy - start.cy) * zoom)
    const scrollMs = Math.min(30000, Math.max(9000, (travelPx / 55) * 1000))
    const INTRO_MS = 1100
    const HOLD_MS = 500

    let raf = 0
    let timer = 0
    let cancelled = false

    const setPose = (p: Pose) => rf.setCenter(p.cx, p.cy, { zoom: p.zoom, duration: 0 })

    const tween = (from: Pose, to: Pose, ms: number, done: () => void) => {
      const t0 = performance.now()
      const frame = (now: number) => {
        if (cancelled) return
        const e = easeInOutSine(Math.min(1, (now - t0) / ms))
        setPose({
          cx: from.cx + (to.cx - from.cx) * e,
          cy: from.cy + (to.cy - from.cy) * e,
          zoom: from.zoom + (to.zoom - from.zoom) * e,
        })
        if ((now - t0) / ms < 1) raf = requestAnimationFrame(frame)
        else done()
      }
      raf = requestAnimationFrame(frame)
    }

    const onWheel = () => stop()
    const onPointerDown = () => stop()
    const onKeyDown = () => stop()
    const remove = () => {
      window.removeEventListener('wheel', onWheel, true)
      window.removeEventListener('pointerdown', onPointerDown, true)
      window.removeEventListener('keydown', onKeyDown, true)
    }
    function stop() {
      if (cancelled) return
      cancelled = true
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      remove()
    }

    // Capture phase: React Flow stops propagation of its own pane events.
    window.addEventListener('wheel', onWheel, { capture: true, passive: true })
    window.addEventListener('pointerdown', onPointerDown, true)
    window.addEventListener('keydown', onKeyDown, true)

    // Hold on the initial fit-all for a beat, then glide into the start pose and
    // begin the slow scroll.
    timer = window.setTimeout(() => {
      if (cancelled) return
      const fit = rf.getViewport()
      const fitPose: Pose = {
        cx: (W / 2 - fit.x) / fit.zoom,
        cy: (H / 2 - fit.y) / fit.zoom,
        zoom: fit.zoom,
      }
      tween(fitPose, start, INTRO_MS, () => {
        tween(start, end, scrollMs, stop)
      })
    }, HOLD_MS)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      remove()
    }
  }, [rf])
}

import { useEffect } from 'react'
import { useReactFlow, type Viewport } from '@xyflow/react'
import type { ClusterBox } from '../graph/layout'

// Legibly zoomed-in: a 220px node reads at ~0.5–0.9 scale.
const ZOOM_MIN = 0.5
const ZOOM_MAX = 0.9
const SCAN_PX_PER_SEC = 46 // slow drift across a field
const SCAN_MIN_MS = 1600 // even a field that fits gets a beat
const SCAN_MAX_MS = 14000
const TRAVEL_PX_PER_SEC = 320 // quicker hop to the next field
const TRAVEL_MIN_MS = 700
const TRAVEL_MAX_MS = 2400
const HOLD_MS = 600

type Leg = { frame: Viewport; end: Viewport; area: string }
export type IntroPlan = { legs: Leg[]; start: Viewport }

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2
const center = (c: ClusterBox) => ({ x: c.x + c.width / 2, y: c.y + c.height / 2 })

/** Greedy nearest-neighbour order from the leftmost field, so the tour hops
 *  between spatially adjacent fields rather than darting across the graph. */
function orderByAdjacency(clusters: ClusterBox[]): ClusterBox[] {
  const left = [...clusters].sort((a, b) => center(a).x - center(b).x)
  const order = [left.shift()!]
  while (left.length) {
    const from = center(order[order.length - 1])
    let best = 0
    let bestD = Infinity
    left.forEach((c, i) => {
      const d = Math.hypot(center(c).x - from.x, center(c).y - from.y)
      if (d < bestD) {
        bestD = d
        best = i
      }
    })
    order.push(left.splice(best, 1)[0])
  }
  return order
}

/** A single field's leg: a legible zoom, framed at one end of its long axis,
 *  drifting to the other end. */
function clusterLeg(c: ClusterBox, vw: number, vh: number): Leg {
  const vertical = c.height >= c.width
  const crossFit = vertical ? (vw * 0.84) / c.width : (vh * 0.84) / c.height
  const zoom = clamp(crossFit, ZOOM_MIN, ZOOM_MAX)
  const midX = c.x + c.width / 2
  const midY = c.y + c.height / 2
  const halfW = vw / 2 / zoom
  const halfH = vh / 2 / zoom
  const startC = vertical
    ? { cx: midX, cy: Math.min(c.y + halfH, midY) }
    : { cx: Math.min(c.x + halfW, midX), cy: midY }
  const endC = vertical
    ? { cx: midX, cy: Math.max(c.y + c.height - halfH, midY) }
    : { cx: Math.max(c.x + c.width - halfW, midX), cy: midY }
  const toVp = (p: { cx: number; cy: number }): Viewport => ({
    x: vw / 2 - p.cx * zoom,
    y: vh / 2 - p.cy * zoom,
    zoom,
  })
  return { frame: toVp(startC), end: toVp(endC), area: c.area }
}

/**
 * Plan a guided field-by-field intro: frame the first field zoomed in, drift
 * across it, then hop to the nearest adjacent field and repeat. Returns the legs
 * plus the opening viewport (so the caller can drop the camera straight onto the
 * first field via `defaultViewport`). Null when there aren't distinct fields to
 * tour (e.g. the ungrouped layout).
 */
export function planFieldTour(clusters: ClusterBox[], vw: number, vh: number): IntroPlan | null {
  if (clusters.length < 2) return null
  const legs = orderByAdjacency(clusters).map((c) => clusterLeg(c, vw, vh))
  return { legs, start: legs[0].frame }
}

type Segment = { from: Viewport; to: Viewport; ms: number; ease: (t: number) => number }

function buildSegments(legs: Leg[]): Segment[] {
  const dist = (a: Viewport, b: Viewport) => Math.hypot(a.x - b.x, a.y - b.y)
  const segs: Segment[] = []
  legs.forEach((leg, i) => {
    if (i > 0) {
      const from = legs[i - 1].end
      segs.push({
        from,
        to: leg.frame,
        ms: clamp((dist(from, leg.frame) / TRAVEL_PX_PER_SEC) * 1000, TRAVEL_MIN_MS, TRAVEL_MAX_MS),
        ease: easeInOutSine,
      })
    }
    segs.push({
      from: leg.frame,
      to: leg.end,
      ms: clamp((dist(leg.frame, leg.end) / SCAN_PX_PER_SEC) * 1000, SCAN_MIN_MS, SCAN_MAX_MS),
      ease: (t) => t, // steady gaze across the field
    })
  })
  return segs
}

/**
 * Runs the planned field tour (see {@link planFieldTour}). The camera already
 * sits on the first field; this holds a beat, then plays the legs — drift across
 * a field, hop to the next, repeat — with an own rAF loop at constant zoom per
 * field. Bows out on any deliberate input (wheel, click/drag, key); plain mouse
 * movement leaves it running. Pass null to do nothing.
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

    window.addEventListener('wheel', stop, { capture: true, passive: true })
    window.addEventListener('pointerdown', stop, true)
    window.addEventListener('keydown', stop, true)

    const segs = buildSegments(plan.legs)
    timer = window.setTimeout(() => {
      if (cancelled) return
      let i = 0
      let t0 = performance.now()
      const frame = (now: number) => {
        if (cancelled) return
        const seg = segs[i]
        const t = Math.min(1, (now - t0) / seg.ms)
        const e = seg.ease(t)
        rf.setViewport({
          x: seg.from.x + (seg.to.x - seg.from.x) * e,
          y: seg.from.y + (seg.to.y - seg.from.y) * e,
          zoom: seg.from.zoom + (seg.to.zoom - seg.from.zoom) * e,
        })
        if (t < 1) {
          raf = requestAnimationFrame(frame)
        } else if (++i < segs.length) {
          t0 = performance.now()
          raf = requestAnimationFrame(frame)
        }
      }
      raf = requestAnimationFrame(frame)
    }, HOLD_MS)

    return () => {
      cancelled = true
      clearTimeout(timer)
      cancelAnimationFrame(raf)
      remove()
    }
  }, [rf, plan])
}

import { useCallback, useEffect, useRef } from 'react'
import { useReactFlow, type Viewport } from '@xyflow/react'

// Velocity is tracked in screen px/ms (the viewport translate moves 1:1 with the
// pointer during a pan, regardless of zoom).
const SAMPLE_WINDOW_MS = 90 // look-back used to estimate the release velocity
const FRESH_MS = 60 // release must follow movement this recent to count as a fling
const MIN_FLING = 0.06 // px/ms; below this a drag just stops, no glide
const MAX_FLING = 3.5 // px/ms; clamp absurd flicks
const TAU_MS = 240 // momentum time constant — larger = longer glide
const STOP_SPEED = 0.02 // px/ms; end the glide once it's this slow

type Sample = { x: number; y: number; t: number }

/**
 * Adds Google-Maps-style momentum to panning: React Flow (via d3-zoom) stops the
 * instant you release, so we sample the drag's velocity from React Flow's own
 * `onMove` and, on release, keep gliding with exponential decay. Returns handlers
 * to spread onto <ReactFlow>. `onMove`'s event arg is null for programmatic moves
 * (the intro drift, double-tap zoom, this very glide), so those never feed the
 * tracker. Any deliberate grab — pointer down or wheel — cancels an active glide.
 */
export function usePanMomentum() {
  const rf = useReactFlow()
  const samples = useRef<Sample[]>([])
  const raf = useRef(0)

  const cancel = useCallback(() => {
    cancelAnimationFrame(raf.current)
    raf.current = 0
  }, [])

  const onMove = useCallback(
    (event: MouseEvent | TouchEvent | null, vp: Viewport) => {
      if (!event) return // programmatic camera move — don't track it
      cancel()
      const s = samples.current
      s.push({ x: vp.x, y: vp.y, t: performance.now() })
      if (s.length > 6) s.shift()
    },
    [cancel],
  )

  const onMoveEnd = useCallback(
    (event: MouseEvent | TouchEvent | null, vp: Viewport) => {
      const s = samples.current
      samples.current = []
      if (!event || s.length < 2) return
      const last = s[s.length - 1]
      if (performance.now() - last.t > FRESH_MS) return // paused before releasing
      // Earliest sample within the look-back window.
      let ref = s[0]
      for (let i = s.length - 1; i >= 0; i--) {
        ref = s[i]
        if (last.t - s[i].t >= SAMPLE_WINDOW_MS) break
      }
      const dt = last.t - ref.t
      if (dt <= 0) return
      let vx = (last.x - ref.x) / dt
      let vy = (last.y - ref.y) / dt
      const speed = Math.hypot(vx, vy)
      if (speed < MIN_FLING) return
      if (speed > MAX_FLING) {
        const k = MAX_FLING / speed
        vx *= k
        vy *= k
      }

      const zoom = vp.zoom
      let prev = performance.now()
      const step = (now: number) => {
        const dms = now - prev
        prev = now
        const decay = Math.exp(-dms / TAU_MS)
        vx *= decay
        vy *= decay
        const cur = rf.getViewport()
        rf.setViewport({ x: cur.x + vx * dms, y: cur.y + vy * dms, zoom })
        raf.current = Math.hypot(vx, vy) > STOP_SPEED ? requestAnimationFrame(step) : 0
      }
      raf.current = requestAnimationFrame(step)
    },
    [rf],
  )

  useEffect(() => {
    const onGrab = () => cancel()
    window.addEventListener('pointerdown', onGrab, true)
    window.addEventListener('wheel', onGrab, { capture: true, passive: true })
    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('pointerdown', onGrab, true)
      window.removeEventListener('wheel', onGrab, true)
    }
  }, [cancel])

  return { onMove, onMoveEnd }
}

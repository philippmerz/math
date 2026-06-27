import { useRef, useState, type ReactNode, type TouchEvent } from 'react'

// A bottom sheet you can fling or drag down to dismiss. The drag surface is the
// grab-handle strip at the top — the body below scrolls normally, so the gesture
// never fights the panel's own scrolling.
const DISMISS_FRACTION = 0.28 // dragged past ~a quarter of its height → dismiss
const FLICK_VELOCITY = 0.55 // …or a downward flick faster than this (px/ms)
const FLICK_MIN_TRAVEL = 60 // …but a flick must actually travel, so jitter can't dismiss
const OUT_MS = 240

export function BottomSheet({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ startY: number; lastY: number; lastT: number; vy: number } | null>(null)
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)

  const onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0]
    drag.current = { startY: t.clientY, lastY: t.clientY, lastT: e.timeStamp, vy: 0 }
    setDragging(true)
  }

  const onTouchMove = (e: TouchEvent) => {
    const d = drag.current
    if (!d) return
    const y = e.touches[0].clientY
    const dt = e.timeStamp - d.lastT
    if (dt > 0) d.vy = (y - d.lastY) / dt
    d.lastY = y
    d.lastT = e.timeStamp
    setOffset(Math.max(0, y - d.startY)) // downward only
  }

  const onTouchEnd = () => {
    const d = drag.current
    drag.current = null
    setDragging(false)
    if (!d) return
    const height = sheetRef.current?.offsetHeight ?? 600
    const dy = Math.max(0, d.lastY - d.startY)
    if (dy > height * DISMISS_FRACTION || (dy > FLICK_MIN_TRAVEL && d.vy > FLICK_VELOCITY)) {
      setOffset(height) // slide the rest of the way out, then unmount
      window.setTimeout(onClose, OUT_MS)
    } else {
      setOffset(0) // snap back
    }
  }

  return (
    <>
      <div
        className="sheet-scrim"
        onClick={onClose}
        style={{ opacity: Math.max(0, 1 - offset / 360) }}
      />
      <div
        ref={sheetRef}
        className="sheet"
        style={{
          transform: offset ? `translateY(${offset}px)` : undefined,
          transition: dragging ? 'none' : undefined,
        }}
      >
        <div
          className="sheet__grip"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <span className="sheet__handle" />
        </div>
        <div className="sheet__body">{children}</div>
      </div>
    </>
  )
}

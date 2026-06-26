import { useLayoutEffect, useRef, useState } from 'react'
import type { MathNode } from '../data/types'

type Props = { x: number; y: number; node: MathNode }

/**
 * The hover / long-press tooltip, drawn in screen space and clamped to stay
 * fully on-screen. It measures its own rendered size, then flips to the other
 * side of the pointer or nudges inward when it would overflow — without this a
 * long-press near an edge (common on mobile) spills off the viewport.
 */
export function NodeTip({ x, y, node }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: x + 16, top: y + 16 })

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    const M = 8
    const vw = window.innerWidth
    const vh = window.innerHeight
    // Prefer the lower-right of the pointer; flip left / up to avoid overflow,
    // then clamp so neither edge can leave the viewport.
    let left = x + 16
    if (left + width + M > vw) left = x - 16 - width
    left = Math.min(Math.max(M, left), Math.max(M, vw - width - M))
    let top = y + 16
    if (top + height + M > vh) top = y - 16 - height
    top = Math.min(Math.max(M, top), Math.max(M, vh - height - M))
    setPos({ left, top })
  }, [x, y, node])

  return (
    <div ref={ref} className="node-tip" style={{ left: pos.left, top: pos.top }}>
      <span className="node-tip__kind">{node.kind}</span>
      <span className="node-tip__title">{node.title}</span>
      {node.tags.length > 0 && <span className="node-tip__tags">{node.tags.join(' · ')}</span>}
    </div>
  )
}

import { useEffect, useState } from 'react'
import {
  elkLayout,
  FLOW_LAYOUT,
  GROUPED_LAYOUT,
  type LayoutMode,
  type LayoutResult,
} from '../graph/layout'

/**
 * Resolve the active layout. The dagre layouts are synchronous; ELK is computed
 * lazily and cached, with the grouped dagre layout shown as a fallback while it
 * loads so the canvas never goes blank.
 */
export function useLayout(mode: LayoutMode): { layout: LayoutResult; loading: boolean } {
  const [elk, setElk] = useState<LayoutResult | null>(null)

  useEffect(() => {
    if (mode !== 'compact' || elk) return
    let cancelled = false
    elkLayout().then((r) => {
      if (!cancelled) setElk(r)
    })
    return () => {
      cancelled = true
    }
  }, [mode, elk])

  const layout =
    mode === 'flow' ? FLOW_LAYOUT : mode === 'grouped' ? GROUPED_LAYOUT : (elk ?? GROUPED_LAYOUT)

  return { layout, loading: mode === 'compact' && !elk }
}

import { useEffect, useMemo, useState } from 'react'
import { dagreLayoutFor, elkLayout, type LayoutMode, type LayoutResult } from '../graph/layout'

/**
 * Resolve the active layout for the current engine and the set of hidden nodes
 * (collapsed constructions). The dagre layouts are synchronous; ELK is computed
 * lazily and cached per visible-node set, with the grouped dagre layout shown as
 * a fallback while it loads so the canvas never goes blank.
 *
 * `hidden` must be a stable reference (memoize it in the caller) — its identity
 * is what drives recomputation.
 */
export function useLayout(
  mode: LayoutMode,
  hidden: ReadonlySet<string>,
): { layout: LayoutResult; loading: boolean } {
  const dagre = useMemo(() => dagreLayoutFor(mode, hidden), [mode, hidden])
  const [elk, setElk] = useState<{ hidden: ReadonlySet<string>; layout: LayoutResult } | null>(null)

  useEffect(() => {
    if (mode !== 'compact' || elk?.hidden === hidden) return
    let cancelled = false
    elkLayout(hidden).then((layout) => {
      if (!cancelled) setElk({ hidden, layout })
    })
    return () => {
      cancelled = true
    }
  }, [mode, hidden, elk])

  if (mode === 'compact' && elk && elk.hidden === hidden) {
    return { layout: elk.layout, loading: false }
  }
  return { layout: dagre, loading: mode === 'compact' }
}

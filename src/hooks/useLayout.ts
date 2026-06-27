import { useEffect, useState } from 'react'
import { cachedLayout, graphvizLayout, type LayoutMode, type LayoutResult } from '../graph/layout'

const EMPTY_LAYOUT: LayoutResult = { nodes: [], edges: [], clusters: [] }

type State = { layout: LayoutResult; loading: boolean }

function initial(mode: LayoutMode, hidden: ReadonlySet<string>, enabled: boolean): State {
  if (!enabled) return { layout: EMPTY_LAYOUT, loading: false }
  const cached = cachedLayout(mode, hidden)
  return cached ? { layout: cached, loading: false } : { layout: EMPTY_LAYOUT, loading: true }
}

/**
 * Resolve the active layout for the current engine and visible-node set. The
 * heavy work runs off the main thread in the Graphviz worker. A localStorage
 * cache (keyed by node structure) fills in instantly on a repeat load;
 * otherwise the last good layout stays on screen, `loading` flips true, and the
 * fresh one swaps in when it's ready.
 *
 * `hidden` must be a stable reference (memoize it in the caller).
 * `enabled` is false on the mobile list shell, where the graph isn't shown.
 */
export function useLayout(mode: LayoutMode, hidden: ReadonlySet<string>, enabled = true): State {
  const [state, setState] = useState<State>(() => initial(mode, hidden, enabled))

  useEffect(() => {
    if (!enabled) {
      setState({ layout: EMPTY_LAYOUT, loading: false })
      return
    }
    const cached = cachedLayout(mode, hidden)
    if (cached) {
      setState({ layout: cached, loading: false })
      return
    }
    let cancelled = false
    setState((s) => ({ layout: s.layout, loading: true })) // keep last good on screen
    graphvizLayout(mode, hidden)
      .then((layout) => {
        if (!cancelled) setState({ layout, loading: false })
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, loading: false }))
      })
    return () => {
      cancelled = true
    }
  }, [mode, hidden, enabled])

  return state
}

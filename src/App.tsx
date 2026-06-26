import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { GraphView } from './graph/GraphView'
import { SearchBox } from './ui/SearchBox'
import { FilterMenu } from './ui/FilterMenu'
import { SettingsMenu } from './ui/SettingsMenu'
import { useTheme } from './hooks/useTheme'
import { useLayout } from './hooks/useLayout'
import type { LayoutMode } from './graph/layout'
import type { NodeKind } from './data/types'
import { nodeById, searchNodes } from './data/graph'
import { collapsedConstructionIds } from './data/variants'

// The panel pulls in react-markdown + MathJax; load it only when first opened.
const DefinitionPanel = lazy(() =>
  import('./ui/DefinitionPanel').then((m) => ({ default: m.DefinitionPanel })),
)

const REPO_URL = 'https://github.com/philippmerz/math'
const LAYOUT_KEY = 'mathgraph-layout'

function initialLayout(): LayoutMode {
  const saved = localStorage.getItem(LAYOUT_KEY)
  return saved === 'flow' || saved === 'grouped' || saved === 'compact' ? saved : 'grouped'
}

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [viewArea, setViewArea] = useState<string | null>(null)
  const onAreaChange = useCallback((area: string | null) => setViewArea(area), [])
  const [focusTag, setFocusTag] = useState<string | null>(null)
  const [kindFilter, setKindFilter] = useState<ReadonlySet<NodeKind>>(() => new Set())
  const toggleKind = useCallback((k: NodeKind) => {
    setKindFilter((prev) => {
      const next = new Set(prev)
      if (next.has(k)) next.delete(k)
      else next.add(k)
      return next
    })
  }, [])
  const clearFilters = useCallback(() => {
    setFocusTag(null)
    setKindFilter(new Set())
  }, [])

  const [layoutMode, setLayoutMode] = useState<LayoutMode>(initialLayout)
  useEffect(() => {
    localStorage.setItem(LAYOUT_KEY, layoutMode)
  }, [layoutMode])

  // Isomorphic constructions collapse under their canonical node by default;
  // `expanded` tracks individually-opened canonicals, `showAllConstructions` is
  // the global override. `revealTarget`/`revealNonce` tell the camera what to
  // frame after the relayout.
  const [showAllConstructions, setShowAllConstructions] = useState(false)
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(() => new Set())
  const [revealTarget, setRevealTarget] = useState<string | null>(null)
  const [revealNonce, setRevealNonce] = useState(0)
  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    setRevealTarget(id)
    setRevealNonce((n) => n + 1)
  }, [])
  const hidden = useMemo(
    () => collapsedConstructionIds(expanded, showAllConstructions),
    [expanded, showAllConstructions],
  )
  const { layout, loading } = useLayout(layoutMode, hidden)

  const results = useMemo(() => searchNodes(query), [query])
  const matchIds = useMemo(
    () => (query.trim() ? new Set(results.map((n) => n.id)) : null),
    [query, results],
  )
  // When the search narrows to a single hit, glide the camera onto it.
  const focusNodeId = results.length === 1 ? results[0].id : null
  const selected = selectedId ? nodeById.get(selectedId) ?? null : null

  // Escape closes the open definition panel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <ReactFlowProvider>
      <main className="app">
        <GraphView
          theme={theme}
          layout={layout}
          layoutMode={layoutMode}
          selectedId={selectedId}
          matchIds={matchIds}
          focusTag={focusTag}
          kindFilter={kindFilter}
          focusNodeId={focusNodeId}
          expanded={expanded}
          showAllConstructions={showAllConstructions}
          onToggleExpand={toggleExpand}
          revealTarget={revealTarget}
          revealNonce={revealNonce}
          onSelect={setSelectedId}
          onAreaChange={onAreaChange}
        />

        {loading && <div className="layout-loading">Arranging…</div>}

        <header className="toolbar">
          <div className="toolbar__brand">
            <span className="toolbar__title">Mathematics Graph</span>
            {viewArea && <span className="toolbar__subtitle">{viewArea}</span>}
          </div>
          <SearchBox
            query={query}
            onQueryChange={setQuery}
            results={results}
            onPick={(id) => {
              setSelectedId(id)
              setQuery('')
            }}
          />
          <div className="toolbar__right">
            <a
              className="icon-btn"
              href={REPO_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="View source on GitHub"
              title="View source on GitHub"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
            <FilterMenu
              area={focusTag}
              onAreaChange={setFocusTag}
              kinds={kindFilter}
              onKindToggle={toggleKind}
              onClear={clearFilters}
            />
            <SettingsMenu
              theme={theme}
              onToggleTheme={toggleTheme}
              layoutMode={layoutMode}
              onLayoutChange={setLayoutMode}
              showConstructions={showAllConstructions}
              onSetShowConstructions={setShowAllConstructions}
            />
          </div>
        </header>

        {selected && (
          <Suspense fallback={null}>
            <DefinitionPanel
              node={selected}
              onClose={() => setSelectedId(null)}
              onNavigate={setSelectedId}
            />
          </Suspense>
        )}
      </main>
    </ReactFlowProvider>
  )
}

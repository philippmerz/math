import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { GraphView } from './graph/GraphView'
import { SearchBox } from './ui/SearchBox'
import { FilterMenu } from './ui/FilterMenu'
import { FrequentTags } from './ui/FrequentTags'
import { AreaTag } from './ui/AreaTag'
import { SettingsMenu } from './ui/SettingsMenu'
import { MobileApp } from './mobile/MobileApp'
import { useTheme } from './hooks/useTheme'
import { useLayout } from './hooks/useLayout'
import { useIsMobile } from './hooks/useIsMobile'
import { useChromeAutoHide } from './hooks/useChromeAutoHide'
import type { LayoutMode } from './graph/layout'
import type { NodeKind } from './data/types'
import { allTags, nodeById, searchNodes } from './data/graph'
import { collapsedConstructionIds } from './data/variants'

// The panel pulls in react-markdown + MathJax; load it only when first opened.
const DefinitionPanel = lazy(() =>
  import('./ui/DefinitionPanel').then((m) => ({ default: m.DefinitionPanel })),
)

const REPO_URL = 'https://github.com/philippmerz/math'
const LAYOUT_KEY = 'mathgraph-layout'

function initialLayout(): LayoutMode {
  const saved = localStorage.getItem(LAYOUT_KEY)
  return saved === 'flow' || saved === 'grouped' ? saved : 'grouped'
}

// Shareable deep-link state lives in the URL query string (independent of the
// hash route): `?field=<area>` opens focused on a field, `?node=<id>` opens its
// details. Written with replaceState so it never adds history entries.
const getParam = (key: string): string | null =>
  new URLSearchParams(window.location.search).get(key)

function setParam(key: string, value: string | null) {
  const sp = new URLSearchParams(window.location.search)
  if (value) sp.set(key, value)
  else sp.delete(key)
  const qs = sp.toString()
  window.history.replaceState(
    null,
    '',
    window.location.pathname + (qs ? `?${qs}` : '') + window.location.hash,
  )
}

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    const id = getParam('node')
    return id && nodeById.has(id) ? id : null
  })
  // Keep ?node in sync with the open details panel; closing it drops the param.
  useEffect(() => {
    setParam('node', selectedId)
  }, [selectedId])
  const [query, setQuery] = useState('')
  const [viewArea, setViewArea] = useState<string | null>(null)
  const onAreaChange = useCallback((area: string | null) => setViewArea(area), [])
  // Retain the last field name while the indicator fades out, so its text never
  // blinks away abruptly (the container's opacity does the fading).
  const [shownField, setShownField] = useState<string | null>(null)
  useEffect(() => {
    if (viewArea) setShownField(viewArea)
  }, [viewArea])
  const [focusTag, setFocusTag] = useState<string | null>(() => {
    const f = getParam('field')
    return f && allTags.includes(f) ? f : null
  })
  // Keep ?field in sync with the focused field tag.
  useEffect(() => {
    setParam('field', focusTag)
  }, [focusTag])
  // Once the focused field has actually come into view, drop the focus (and its
  // param) as soon as the user scrolls it back out — so the URL stays honest.
  const fieldEngaged = useRef(false)
  useEffect(() => {
    fieldEngaged.current = false
  }, [focusTag])
  useEffect(() => {
    if (!focusTag) return
    const inView = viewArea?.split(' · ').includes(focusTag) ?? false
    if (inView) fieldEngaged.current = true
    else if (fieldEngaged.current) setFocusTag(null)
  }, [viewArea, focusTag])
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

  // Float the chrome away when the mouse rests; it returns on the next move.
  const chromeHidden = useChromeAutoHide()

  // Phones get a separate list-based shell; the graph is opt-in from there.
  const isMobile = useIsMobile()
  const [mobileGraph, setMobileGraph] = useState(() => localStorage.getItem('mobile-graph') === '1')
  useEffect(() => {
    localStorage.setItem('mobile-graph', mobileGraph ? '1' : '0')
  }, [mobileGraph])

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
  const { layout, loading } = useLayout(layoutMode, hidden, !isMobile || mobileGraph)

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

  if (isMobile && !mobileGraph) {
    return (
      <MobileApp
        theme={theme}
        onToggleTheme={toggleTheme}
        selectedId={selectedId}
        onSelect={setSelectedId}
        focusTag={focusTag}
        onFocusTag={setFocusTag}
        kindFilter={kindFilter}
        onToggleKind={toggleKind}
        onClearFilters={clearFilters}
        onShowGraph={() => setMobileGraph(true)}
      />
    )
  }

  return (
    <ReactFlowProvider>
      <main className={`app${chromeHidden ? ' chrome-hidden' : ''}`}>
        {/* Mount the graph only once a layout exists, so its camera/intro-tour
            logic still sees a ready layout. The worker computes asynchronously;
            until the first result (or a cache hit) the canvas shows "Arranging…". */}
        {layout.nodes.length > 0 && (
          <GraphView
            key={layoutMode}
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
        )}

        {loading && <div className="layout-loading">Arranging…</div>}

        {isMobile && (
          <button type="button" className="to-list" onClick={() => setMobileGraph(false)}>
            ≡ List
          </button>
        )}

        <header className="toolbar">
          <div className="toolbar__brand">
            <span className="toolbar__title">Mathematics Graph</span>
          </div>
          <div className={`toolbar__field${viewArea ? ' is-visible' : ''}`} aria-hidden={!viewArea}>
            {shownField && (
              <AreaTag key={shownField} tag={shownField} className="toolbar__field-name" />
            )}
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

        <FrequentTags active={focusTag} onSelect={setFocusTag} />

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

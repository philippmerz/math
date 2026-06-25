import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { GraphView } from './graph/GraphView'
import { SearchBox } from './ui/SearchBox'
import { ThemeToggle } from './ui/ThemeToggle'
import { useTheme } from './hooks/useTheme'
import { nodeById, searchNodes } from './data/graph'

// The panel pulls in react-markdown + MathJax; load it only when first opened.
const DefinitionPanel = lazy(() =>
  import('./ui/DefinitionPanel').then((m) => ({ default: m.DefinitionPanel })),
)

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const results = useMemo(() => searchNodes(query), [query])
  const matchIds = useMemo(
    () => (query.trim() ? new Set(results.map((n) => n.id)) : null),
    [query, results],
  )
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
          selectedId={selectedId}
          matchIds={matchIds}
          onSelect={setSelectedId}
        />

        <header className="toolbar">
          <div className="toolbar__brand">
            <span className="toolbar__title">Mathematics Graph</span>
            <span className="toolbar__subtitle">ZFC · foundations</span>
          </div>
          <div className="toolbar__tools">
            <SearchBox
              query={query}
              onQueryChange={setQuery}
              results={results}
              onPick={(id) => {
                setSelectedId(id)
                setQuery('')
              }}
            />
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
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

import { lazy, Suspense, useState } from 'react'
import { BottomNav, type MobileTab } from './BottomNav'
import { DependencyList } from './DependencyList'
import { PathSearch } from './PathSearch'
import { allKinds, allTags, nodeById } from '../data/graph'
import type { NodeKind } from '../data/types'
import type { Theme } from '../hooks/useTheme'

const DefinitionPanel = lazy(() =>
  import('../ui/DefinitionPanel').then((m) => ({ default: m.DefinitionPanel })),
)

const KIND_LABEL: Record<NodeKind, string> = {
  primitive: 'Primitives',
  axiom: 'Axioms',
  definition: 'Definitions',
  lemma: 'Lemmas',
  proposition: 'Propositions',
  theorem: 'Theorems',
  corollary: 'Corollaries',
}

const TITLES: Record<MobileTab, string> = {
  math: 'Mathematics',
  search: 'Search',
  filter: 'Filter',
  settings: 'Settings',
}

type Props = {
  theme: Theme
  onToggleTheme: () => void
  selectedId: string | null
  onSelect: (id: string | null) => void
  focusTag: string | null
  onFocusTag: (tag: string | null) => void
  kindFilter: ReadonlySet<NodeKind>
  onToggleKind: (k: NodeKind) => void
  onClearFilters: () => void
  onShowGraph: () => void
}

export function MobileApp(props: Props) {
  const [tab, setTab] = useState<MobileTab>('math')
  const filterCount = (props.focusTag ? 1 : 0) + props.kindFilter.size
  const selected = props.selectedId ? nodeById.get(props.selectedId) ?? null : null

  return (
    <div className="mobile">
      <header className="mobile__top">
        <span className="mobile__title">{TITLES[tab]}</span>
      </header>

      <main className="mobile__view">
        {tab === 'math' && <DependencyList onOpen={props.onSelect} />}
        {tab === 'search' && <PathSearch onOpen={props.onSelect} />}
        {tab === 'filter' && (
          <FilterView
            focusTag={props.focusTag}
            onFocusTag={props.onFocusTag}
            kindFilter={props.kindFilter}
            onToggleKind={props.onToggleKind}
            onClearFilters={props.onClearFilters}
            count={filterCount}
          />
        )}
        {tab === 'settings' && (
          <SettingsView theme={props.theme} onToggleTheme={props.onToggleTheme} onShowGraph={props.onShowGraph} />
        )}
      </main>

      <BottomNav active={tab} onChange={setTab} filterCount={filterCount} />

      {selected && (
        <Suspense fallback={null}>
          <DefinitionPanel node={selected} onClose={() => props.onSelect(null)} onNavigate={props.onSelect} />
        </Suspense>
      )}
    </div>
  )
}

function FilterView({
  focusTag,
  onFocusTag,
  kindFilter,
  onToggleKind,
  onClearFilters,
  count,
}: {
  focusTag: string | null
  onFocusTag: (tag: string | null) => void
  kindFilter: ReadonlySet<NodeKind>
  onToggleKind: (k: NodeKind) => void
  onClearFilters: () => void
  count: number
}) {
  return (
    <div className="mview">
      <h3 className="mview__heading">Type</h3>
      <div className="mview__chips">
        {allKinds.map((k) => (
          <button
            key={k}
            type="button"
            className={`filterbar__chip${kindFilter.has(k) ? ' is-active' : ''}`}
            onClick={() => onToggleKind(k)}
          >
            {KIND_LABEL[k] ?? k}
          </button>
        ))}
      </div>

      <h3 className="mview__heading">Area</h3>
      <div className="mview__chips">
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`filterbar__chip${focusTag === tag ? ' is-active' : ''}`}
            onClick={() => onFocusTag(focusTag === tag ? null : tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {count > 0 && (
        <button type="button" className="settings__clear mview__clear" onClick={onClearFilters}>
          Clear filters
        </button>
      )}
    </div>
  )
}

function SettingsView({
  theme,
  onToggleTheme,
  onShowGraph,
}: {
  theme: Theme
  onToggleTheme: () => void
  onShowGraph: () => void
}) {
  const pick = (t: Theme) => {
    if (theme !== t) onToggleTheme()
  }
  return (
    <div className="mview">
      <h3 className="mview__heading">Theme</h3>
      <div className="settings__seg">
        <button
          type="button"
          className={`settings__seg-btn${theme === 'light' ? ' is-active' : ''}`}
          onClick={() => pick('light')}
        >
          Light
        </button>
        <button
          type="button"
          className={`settings__seg-btn${theme === 'dark' ? ' is-active' : ''}`}
          onClick={() => pick('dark')}
        >
          Dark
        </button>
      </div>

      <h3 className="mview__heading">View</h3>
      <button type="button" className="mview__action" onClick={onShowGraph}>
        Switch to graph →
      </button>

      <h3 className="mview__heading">Browse</h3>
      <a className="mview__action" href="#/index">
        All concepts →
      </a>
      <a className="mview__action" href="#/links">
        Further reading →
      </a>
    </div>
  )
}

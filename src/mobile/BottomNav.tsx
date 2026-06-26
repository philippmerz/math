import type { ReactNode } from 'react'

export type MobileTab = 'math' | 'search' | 'filter' | 'settings'

const ICONS: Record<MobileTab, ReactNode> = {
  // a small dependency tree
  math: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="18" r="2.2" />
      <path d="M12 7.2 7 15.8M12 7.2l5 8.6" strokeLinecap="round" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4-4" strokeLinecap="round" />
    </svg>
  ),
  filter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M21 4H3l7 8.46V19l4 2v-8.54L21 4z" strokeLinejoin="round" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden="true">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z" />
    </svg>
  ),
}

const LABELS: Record<MobileTab, string> = {
  math: 'Math',
  search: 'Search',
  filter: 'Filter',
  settings: 'Settings',
}

type Props = {
  active: MobileTab
  onChange: (tab: MobileTab) => void
  filterCount: number
}

export function BottomNav({ active, onChange, filterCount }: Props) {
  return (
    <nav className="mnav" aria-label="Sections">
      {(Object.keys(LABELS) as MobileTab[]).map((tab) => (
        <button
          key={tab}
          type="button"
          className={`mnav__tab${active === tab ? ' is-active' : ''}`}
          aria-current={active === tab ? 'page' : undefined}
          onClick={() => onChange(tab)}
        >
          <span className="mnav__icon">
            {ICONS[tab]}
            {tab === 'filter' && filterCount > 0 && <span className="mnav__badge">{filterCount}</span>}
          </span>
          <span className="mnav__label">{LABELS[tab]}</span>
        </button>
      ))}
    </nav>
  )
}

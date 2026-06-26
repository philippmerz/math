import { useEffect, useRef, useState } from 'react'
import type { Theme } from '../hooks/useTheme'
import type { LayoutMode } from '../graph/layout'

const LAYOUTS: { mode: LayoutMode; title: string; desc: string }[] = [
  {
    mode: 'flow',
    title: 'By dependency',
    desc: 'Strict top-down prerequisite order. Most compact, but fields intermix.',
  },
  {
    mode: 'grouped',
    title: 'Grouped by field',
    desc: 'Each field boxed in its own region. Clear separation, roomier.',
  },
  {
    mode: 'compact',
    title: 'Grouped, compact',
    desc: 'Field grouping packed tightly together. Takes a moment to arrange.',
  },
]

type Props = {
  theme: Theme
  onToggleTheme: () => void
  layoutMode: LayoutMode
  onLayoutChange: (mode: LayoutMode) => void
}

export function SettingsMenu({ theme, onToggleTheme, layoutMode, onLayoutChange }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const pickTheme = (target: Theme) => {
    if (theme !== target) onToggleTheme()
  }

  return (
    <div className="settings" ref={ref}>
      <button
        type="button"
        className="icon-btn"
        aria-label="Settings"
        aria-expanded={open}
        title="Settings"
        onClick={() => setOpen((o) => !o)}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {open && (
        <div className="settings__menu" role="menu">
          <section className="settings__section">
            <span className="settings__heading">Theme</span>
            <div className="settings__seg">
              <button
                type="button"
                className={`settings__seg-btn${theme === 'light' ? ' is-active' : ''}`}
                onClick={() => pickTheme('light')}
              >
                Light
              </button>
              <button
                type="button"
                className={`settings__seg-btn${theme === 'dark' ? ' is-active' : ''}`}
                onClick={() => pickTheme('dark')}
              >
                Dark
              </button>
            </div>
          </section>

          <section className="settings__section">
            <span className="settings__heading">Graph layout</span>
            {LAYOUTS.map((l) => (
              <button
                key={l.mode}
                type="button"
                role="menuitemradio"
                aria-checked={layoutMode === l.mode}
                className={`settings__option${layoutMode === l.mode ? ' is-active' : ''}`}
                onClick={() => onLayoutChange(l.mode)}
              >
                <span className="settings__option-title">{l.title}</span>
                <span className="settings__option-desc">{l.desc}</span>
              </button>
            ))}
          </section>
        </div>
      )}
    </div>
  )
}

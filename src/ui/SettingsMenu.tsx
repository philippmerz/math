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
    // Capture phase: React Flow stops propagation of pane pointer events, so a
    // bubbling listener would miss clicks on the canvas.
    document.addEventListener('mousedown', onDoc, true)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc, true)
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
        <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden="true">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z" />
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

import { useEffect, useRef, useState } from 'react'
import { allKinds, allTags } from '../data/graph'
import type { NodeKind } from '../data/types'

const KIND_LABEL: Record<NodeKind, string> = {
  primitive: 'Primitives',
  axiom: 'Axioms',
  definition: 'Definitions',
  lemma: 'Lemmas',
  proposition: 'Propositions',
  theorem: 'Theorems',
  corollary: 'Corollaries',
}

type Props = {
  /** Focused area (single-select), or null. */
  area: string | null
  onAreaChange: (area: string | null) => void
  /** Kinds to show; empty = show all. */
  kinds: ReadonlySet<NodeKind>
  onKindToggle: (kind: NodeKind) => void
  onClear: () => void
}

export function FilterMenu({ area, onAreaChange, kinds, onKindToggle, onClear }: Props) {
  const [open, setOpen] = useState(false)
  const [tagQuery, setTagQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  // Clear the area search each time the popover closes.
  useEffect(() => {
    if (!open) setTagQuery('')
  }, [open])

  const q = tagQuery.trim().toLowerCase()
  const shownTags = q ? allTags.filter((t) => t.toLowerCase().includes(q)) : allTags

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    // Capture phase: React Flow stops propagation of pane pointer events.
    document.addEventListener('mousedown', onDoc, true)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc, true)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const activeCount = (area ? 1 : 0) + kinds.size

  return (
    <div className="settings" ref={ref}>
      <button
        type="button"
        className="icon-btn"
        aria-label="Filter"
        aria-expanded={open}
        title="Filter"
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
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        {activeCount > 0 && <span className="icon-btn__badge">{activeCount}</span>}
      </button>

      <div
        className={`settings__menu filtermenu${open ? ' is-open' : ''}`}
        role="menu"
        aria-hidden={!open}
      >
        <section className="settings__section filtermenu__fixed">
          <span className="settings__heading">Type</span>
          <div className="filter-chips">
            {allKinds.map((k) => (
              <button
                key={k}
                type="button"
                className={`filterbar__chip${kinds.has(k) ? ' is-active' : ''}`}
                aria-pressed={kinds.has(k)}
                onClick={() => onKindToggle(k)}
              >
                {KIND_LABEL[k] ?? k}
              </button>
            ))}
          </div>
        </section>

        <section className="settings__section filtermenu__area">
          <span className="settings__heading">Area</span>
          <input
            type="text"
            className="filter-search"
            placeholder="Search areas…"
            value={tagQuery}
            onChange={(e) => setTagQuery(e.target.value)}
            aria-label="Search areas"
          />
          <div className="filter-chips filtermenu__chips">
            {shownTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`filterbar__chip${area === tag ? ' is-active' : ''}`}
                aria-pressed={area === tag}
                onClick={() => onAreaChange(area === tag ? null : tag)}
              >
                {tag}
              </button>
            ))}
            {shownTags.length === 0 && <span className="settings__hint">No areas match.</span>}
          </div>
        </section>

        <section
          className={`settings__section filtermenu__footer${activeCount > 0 ? ' is-active' : ''}`}
          aria-hidden={activeCount === 0}
        >
          <button
            type="button"
            className="settings__clear"
            onClick={onClear}
            tabIndex={activeCount > 0 ? 0 : -1}
          >
            Clear filters
          </button>
        </section>
      </div>
    </div>
  )
}

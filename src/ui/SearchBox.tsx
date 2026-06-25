import { useState, type KeyboardEvent } from 'react'
import type { MathNode } from '../data/types'

type Props = {
  query: string
  onQueryChange: (q: string) => void
  results: MathNode[]
  onPick: (id: string) => void
}

export function SearchBox({ query, onQueryChange, results, onPick }: Props) {
  const [open, setOpen] = useState(false)

  const pick = (id: string) => {
    onPick(id)
    setOpen(false)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && results.length > 0) pick(results[0].id)
    else if (e.key === 'Escape') {
      onQueryChange('')
      setOpen(false)
      e.currentTarget.blur()
    }
  }

  const showList = open && query.trim() !== '' && results.length > 0

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Search concepts…"
        value={query}
        spellCheck={false}
        autoComplete="off"
        onChange={(e) => {
          onQueryChange(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        // Delay close so a result's onMouseDown still registers.
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
      />
      {showList && (
        <ul className="search__results">
          {results.slice(0, 8).map((n) => (
            <li key={n.id}>
              <button
                type="button"
                className="search__result"
                onMouseDown={() => pick(n.id)}
              >
                <span className="search__result-title">{n.title}</span>
                <span className="search__result-kind">{n.kind}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

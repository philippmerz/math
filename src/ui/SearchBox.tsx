import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { MathNode } from '../data/types'

type Props = {
  query: string
  onQueryChange: (q: string) => void
  results: MathNode[]
  onPick: (id: string) => void
}

export function SearchBox({ query, onQueryChange, results, onPick }: Props) {
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // "/" focuses the search from anywhere (unless already typing in a field).
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      e.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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
        ref={inputRef}
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
        onFocus={() => {
          setFocused(true)
          setOpen(true)
        }}
        onKeyDown={onKeyDown}
        // Delay close so a result's onMouseDown still registers.
        onBlur={() => {
          setFocused(false)
          window.setTimeout(() => setOpen(false), 120)
        }}
      />
      {!focused && query === '' && (
        <kbd className="search__kbd" aria-hidden="true">
          /
        </kbd>
      )}
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

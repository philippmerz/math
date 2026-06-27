import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { MathNode } from '../data/types'

type Props = {
  query: string
  onQueryChange: (q: string) => void
  results: MathNode[]
  onPick: (id: string) => void
}

const MAX_RESULTS = 8

export function SearchBox({ query, onQueryChange, results, onPick }: Props) {
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  // Which result the arrow keys have highlighted; Enter picks it.
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const shown = results.slice(0, MAX_RESULTS)

  // A fresh query starts the highlight back at the top.
  useEffect(() => {
    setActive(0)
  }, [query])

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

  const showList = open && query.trim() !== '' && shown.length > 0

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onQueryChange('')
      setOpen(false)
      e.currentTarget.blur()
    } else if (!showList) {
      return
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, shown.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      pick((shown[active] ?? shown[0]).id)
    }
  }

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
          {shown.map((n, i) => (
            <li key={n.id}>
              <button
                type="button"
                className={`search__result${i === active ? ' is-active' : ''}`}
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
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

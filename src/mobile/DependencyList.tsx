import { useState } from 'react'
import { dependentsById, nodeById, rootNodes as ROOTS } from '../data/graph'

type Props = {
  onOpen: (id: string) => void
}

export function DependencyList({ onOpen }: Props) {
  // Roots open by default, so the first level shows immediately.
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(
    () => new Set(ROOTS.map((r) => r.id)),
  )
  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <ul className="mlist">
      {ROOTS.map((n) => (
        <Row
          key={n.id}
          id={n.id}
          depth={0}
          trail={EMPTY}
          expanded={expanded}
          onToggle={toggle}
          onOpen={onOpen}
        />
      ))}
    </ul>
  )
}

const EMPTY: ReadonlySet<string> = new Set()

function Row({
  id,
  depth,
  trail,
  expanded,
  onToggle,
  onOpen,
}: {
  id: string
  depth: number
  trail: ReadonlySet<string>
  expanded: ReadonlySet<string>
  onToggle: (id: string) => void
  onOpen: (id: string) => void
}) {
  const node = nodeById.get(id)
  if (!node) return null
  // Break any accidental cycle: a node already on the path renders as a leaf.
  const children = trail.has(id) ? [] : dependentsById.get(id) ?? []
  const open = expanded.has(id)

  return (
    <li className="mlist__item">
      <div className="mrow" style={{ paddingLeft: 12 + depth * 18 }}>
        {children.length > 0 ? (
          <button
            type="button"
            className="mrow__toggle"
            aria-expanded={open}
            aria-label={open ? 'Collapse' : 'Expand'}
            onClick={() => onToggle(id)}
          >
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M3 4.5 6 8l3-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        ) : (
          <span className="mrow__spacer" />
        )}
        <button type="button" className="mrow__label" onClick={() => onOpen(id)}>
          <span className="mrow__title">{node.label}</span>
          <span className="mrow__kind">{node.kind}</span>
        </button>
      </div>
      {open && children.length > 0 && (
        <ul>
          {children.map((c) => (
            <Row
              key={c.id}
              id={c.id}
              depth={depth + 1}
              trail={withId(trail, id)}
              expanded={expanded}
              onToggle={onToggle}
              onOpen={onOpen}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

function withId(set: ReadonlySet<string>, id: string): ReadonlySet<string> {
  const next = new Set(set)
  next.add(id)
  return next
}

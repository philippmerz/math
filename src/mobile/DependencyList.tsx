import { useEffect, useRef, useState } from 'react'
import { ancestorsOf, dependentsById, nodeById, rootNodes as ROOTS } from '../data/graph'
import { MATH_NODES } from '../data/nodes'
import type { NodeKind } from '../data/types'

type Props = {
  onOpen: (id: string) => void
  kindFilter: ReadonlySet<NodeKind>
  focusTag: string | null
  /** A node to surface (from search): its dependency chain is opened and it
   *  scrolls into view. `nonce` lets the same id re-trigger. */
  revealId: string | null
  revealNonce: number
}

const EMPTY: ReadonlySet<string> = new Set()

export function DependencyList({ onOpen, kindFilter, focusTag, revealId, revealNonce }: Props) {
  const filtering = kindFilter.size > 0 || focusTag != null
  // Roots open by default, so the first level shows immediately.
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(() => new Set(ROOTS.map((r) => r.id)))
  const listRef = useRef<HTMLUListElement>(null)

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  // Reveal a searched node: open its whole ancestor chain, then scroll to it.
  useEffect(() => {
    if (!revealId) return
    setExpanded((prev) => {
      const next = new Set(prev)
      next.add(revealId)
      for (const a of ancestorsOf([revealId])) next.add(a)
      return next
    })
    const t = window.setTimeout(() => {
      listRef.current
        ?.querySelector(`[data-id="${CSS.escape(revealId)}"]`)
        ?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, 90)
    return () => window.clearTimeout(t)
  }, [revealId, revealNonce])

  // Filtered: a flat list of just the matching concepts (not the tree).
  if (filtering) {
    const matches = MATH_NODES.filter(
      (n) =>
        (kindFilter.size === 0 || kindFilter.has(n.kind)) &&
        (focusTag == null || n.tags.includes(focusTag)),
    ).sort((a, b) => a.title.localeCompare(b.title))
    return (
      <ul className="mlist mlist--padded">
        {matches.length === 0 ? (
          <li className="mlist__empty">Nothing matches this filter.</li>
        ) : (
          matches.map((n) => (
            <li key={n.id} className="mlist__item">
              <button type="button" className="mrow__label mrow__label--flush" onClick={() => onOpen(n.id)}>
                <span className="mrow__title">{n.title}</span>
                <span className="mrow__kind">{n.kind}</span>
              </button>
            </li>
          ))
        )}
      </ul>
    )
  }

  return (
    <ul className="mlist mlist--padded" ref={listRef}>
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
      <div className="mrow" data-id={id} style={{ paddingLeft: 12 + depth * 18 }}>
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
        <ul className="mrow__children">
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

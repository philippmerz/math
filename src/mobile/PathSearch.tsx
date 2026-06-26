import { useEffect, useMemo, useRef, useState } from 'react'
import { ancestorsOf, dependentsById, nodeById, rootNodes, searchNodes } from '../data/graph'

// Searching never returns a flat list — instead it reveals the *path*: the chain
// of dependencies from the foundations down to each match, with everything off
// that path pruned away. So you see not just the concept but what it rests on.
//
// The relevant nodes form a DAG, not a tree, so we lay out a spanning tree
// (BFS from the roots) — each node appears exactly once, under its shortest path
// to a foundation. Unfolding every path instead would blow up combinatorially.
type Tree = {
  roots: string[]
  childrenById: ReadonlyMap<string, string[]>
  matches: ReadonlySet<string>
  // The top-ranked match — the path scrolls here so the result is in view rather
  // than buried at the bottom of a deep foundation chain.
  primary: string | null
}

const EMPTY_TREE: Tree = { roots: [], childrenById: new Map(), matches: new Set(), primary: null }

// Too many matches (e.g. a one-letter query) would expand most of the graph;
// cap so the path tree stays legible.
const MAX_MATCHES = 24

function buildTree(query: string): Tree {
  const q = query.trim()
  if (!q) return EMPTY_TREE

  const ranked = searchNodes(q).slice(0, MAX_MATCHES)
  const matches = new Set(ranked.map((n) => n.id))
  if (matches.size === 0) return EMPTY_TREE
  const relevant = new Set(matches)
  for (const id of ancestorsOf(matches)) relevant.add(id)

  // Spanning tree: BFS from the relevant roots down the relevant dependents,
  // placing each node under the first (shortest) parent that reaches it.
  const roots = rootNodes.filter((r) => relevant.has(r.id)).map((r) => r.id)
  const childrenById = new Map<string, string[]>()
  const placed = new Set<string>(roots)
  const queue = [...roots]
  while (queue.length > 0) {
    const cur = queue.shift() as string
    for (const kid of dependentsById.get(cur) ?? []) {
      if (!relevant.has(kid.id) || placed.has(kid.id)) continue
      placed.add(kid.id)
      const list = childrenById.get(cur)
      if (list) list.push(kid.id)
      else childrenById.set(cur, [kid.id])
      queue.push(kid.id)
    }
  }
  return { roots, childrenById, matches, primary: ranked[0]?.id ?? null }
}

export function PathSearch({ onOpen }: { onOpen: (id: string) => void }) {
  const [query, setQuery] = useState('')
  const q = query.trim()
  const tree = useMemo(() => buildTree(query), [query])
  const viewRef = useRef<HTMLDivElement>(null)

  // Once typing settles, bring the top match into view (it usually sits deep at
  // the bottom of its dependency chain). Debounced so it fires once, not per key.
  useEffect(() => {
    if (!tree.primary) return
    const t = setTimeout(() => {
      viewRef.current?.querySelector('[data-primary]')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, 220)
    return () => clearTimeout(t)
  }, [tree])

  return (
    <div className="mview" ref={viewRef}>
      <input
        className="mview__search"
        type="text"
        placeholder="Search concepts…"
        value={query}
        autoFocus
        spellCheck={false}
        onChange={(e) => setQuery(e.target.value)}
      />
      {!q && (
        <p className="mview__hint">Search to trace the path from the foundations down to a concept.</p>
      )}
      {q && tree.roots.length === 0 && <p className="mview__empty">No matches.</p>}
      {q && tree.roots.length > 0 && (
        <ul className="mlist mlist--path">
          {tree.roots.map((id) => (
            <PathRow key={id} id={id} depth={0} tree={tree} onOpen={onOpen} />
          ))}
        </ul>
      )}
    </div>
  )
}

function PathRow({
  id,
  depth,
  tree,
  onOpen,
}: {
  id: string
  depth: number
  tree: Tree
  onOpen: (id: string) => void
}) {
  const node = nodeById.get(id)
  if (!node) return null
  const isMatch = tree.matches.has(id)
  const children = tree.childrenById.get(id) ?? []

  return (
    <li className="mlist__item">
      <div
        className="mrow"
        style={{ paddingLeft: 12 + depth * 18 }}
        data-primary={id === tree.primary ? '' : undefined}
      >
        <span className="mrow__spacer" />
        <button
          type="button"
          className={`mrow__label${isMatch ? ' is-match' : ''}`}
          onClick={() => onOpen(id)}
        >
          <span className="mrow__title">{node.label}</span>
          <span className="mrow__kind">{node.kind}</span>
        </button>
      </div>
      {children.length > 0 && (
        <ul>
          {children.map((c) => (
            <PathRow key={c} id={c} depth={depth + 1} tree={tree} onOpen={onOpen} />
          ))}
        </ul>
      )}
    </li>
  )
}

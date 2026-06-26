import type { MathNode, NodeKind } from './types'
import { MATH_NODES } from './nodes'

/** id → node, for O(1) lookup from the panel and search. */
export const nodeById: ReadonlyMap<string, MathNode> = new Map(
  MATH_NODES.map((n) => [n.id, n]),
)

/** Every distinct tag across the node set, sorted — the area-filter vocabulary. */
export const allTags: string[] = [
  ...new Set(MATH_NODES.flatMap((n) => n.tags)),
].sort()

/** The busiest areas, most-nodes first — a short inline shortcut bar. */
export const frequentTags: string[] = (() => {
  const counts = new Map<string, number>()
  for (const n of MATH_NODES) for (const t of n.tags) counts.set(t, (counts.get(t) ?? 0) + 1)
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([t]) => t)
})()

/** Distinct node kinds present, foundational order first — the type-filter vocabulary. */
const KIND_ORDER: NodeKind[] = [
  'primitive',
  'axiom',
  'definition',
  'lemma',
  'proposition',
  'theorem',
  'corollary',
]
export const allKinds: NodeKind[] = [...new Set(MATH_NODES.map((n) => n.kind))].sort(
  (a, b) => KIND_ORDER.indexOf(a) - KIND_ORDER.indexOf(b),
)

/** Foundations: nodes with no dependencies, sorted by title — the roots from
 *  which the dependency list and the path search grow downward. */
export const rootNodes: MathNode[] = MATH_NODES.filter(
  (n) => n.dependencies.length === 0,
).sort((a, b) => a.title.localeCompare(b.title))

/** id → nodes that depend on it (the reverse of `dependencies`). */
export const dependentsById: ReadonlyMap<string, MathNode[]> = MATH_NODES.reduce(
  (map, node) => {
    for (const dep of node.dependencies) {
      const list = map.get(dep)
      if (list) list.push(node)
      else map.set(dep, [node])
    }
    return map
  },
  new Map<string, MathNode[]>(),
)

/**
 * Every transitive dependency of the given ids — i.e. every node lying on some
 * path from a foundation down to them (the inputs themselves are excluded).
 * Used by the path search to expand exactly the chain leading to a match.
 */
export function ancestorsOf(ids: Iterable<string>): Set<string> {
  const seen = new Set<string>()
  const stack: string[] = []
  for (const id of ids) {
    const node = nodeById.get(id)
    if (node) stack.push(...node.dependencies)
  }
  while (stack.length > 0) {
    const cur = stack.pop() as string
    if (seen.has(cur)) continue
    seen.add(cur)
    const node = nodeById.get(cur)
    if (node) stack.push(...node.dependencies)
  }
  return seen
}

/**
 * Greedy subsequence match: every char of `q` appears in `haystack` in order.
 * Returns the span of the match (lower = tighter, better) or null if no match.
 */
function subsequenceScore(haystack: string, q: string): number | null {
  let qi = 0
  let first = -1
  let last = -1
  for (let h = 0; h < haystack.length && qi < q.length; h++) {
    if (haystack[h] === q[qi]) {
      if (first === -1) first = h
      last = h
      qi++
    }
  }
  return qi === q.length ? last - first : null
}

/**
 * Rank a query against the node set. First, case-insensitive substring matches
 * on label + title, preferring prefix-of-label. Only if that finds nothing do we
 * fall back to a fuzzy (subsequence) match on the label — so typos / partials
 * like "drv" → "Derivative" still resolve, at no cost to the common case. An
 * empty query matches nothing.
 */
export function searchNodes(query: string): MathNode[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const direct: { node: MathNode; score: number }[] = []
  for (const node of MATH_NODES) {
    const haystack = `${node.label} ${node.title}`.toLowerCase()
    const at = haystack.indexOf(q)
    if (at === -1) continue
    // Prefix of the label is the strongest signal; earlier matches rank higher.
    direct.push({ node, score: node.label.toLowerCase().startsWith(q) ? -1 : at })
  }
  if (direct.length > 0) return direct.sort((a, b) => a.score - b.score).map((s) => s.node)

  // Fuzzy fallback: tightest subsequence match on the label first.
  const fuzzy: { node: MathNode; score: number }[] = []
  for (const node of MATH_NODES) {
    const s = subsequenceScore(node.label.toLowerCase(), q)
    if (s != null) fuzzy.push({ node, score: s })
  }
  return fuzzy.sort((a, b) => a.score - b.score).map((s) => s.node)
}

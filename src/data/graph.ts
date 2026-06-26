import type { MathNode } from './types'
import { MATH_NODES } from './nodes'

/** id → node, for O(1) lookup from the panel and search. */
export const nodeById: ReadonlyMap<string, MathNode> = new Map(
  MATH_NODES.map((n) => [n.id, n]),
)

/** Every distinct tag across the node set, sorted — the filter vocabulary. */
export const allTags: string[] = [
  ...new Set(MATH_NODES.flatMap((n) => n.tags)),
].sort()

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

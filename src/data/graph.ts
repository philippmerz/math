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
 * Rank a query against the node set: case-insensitive substring match on
 * label and title, preferring prefix matches. An empty query matches nothing.
 */
export function searchNodes(query: string): MathNode[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const scored: { node: MathNode; score: number }[] = []
  for (const node of MATH_NODES) {
    const haystack = `${node.label} ${node.title}`.toLowerCase()
    const at = haystack.indexOf(q)
    if (at === -1) continue
    // Prefix of the label is the strongest signal; earlier matches rank higher.
    const score = node.label.toLowerCase().startsWith(q) ? -1 : at
    scored.push({ node, score })
  }
  return scored.sort((a, b) => a.score - b.score).map((s) => s.node)
}

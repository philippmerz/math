/**
 * Isomorphic-construction groups.
 *
 * A canonical object (e.g. ℝ) often has several equivalent *constructions* — for
 * the reals, Dedekind cuts and Cauchy sequences — each proven isomorphic to the
 * others. Drawn in full they clutter the graph with parallel chains, so by
 * default each construction (a *variant*) and its *private* scaffolding collapse
 * under the canonical node; expanding the canonical reveals them on demand.
 *
 * `scaffold` must list only nodes used EXCLUSIVELY by these variants. Shared
 * inputs — ℚ, Cauchy sequences (also used by the Banach fixed-point theorem),
 * quotient sets — stand on their own and stay visible. This map is feature-owned,
 * so adding it needs no edits to the node data.
 */
export type IsoGroup = {
  canonical: string
  variants: string[]
  scaffold?: string[]
}

export const ISO_GROUPS: IsoGroup[] = [
  {
    canonical: 'real-numbers',
    variants: ['dedekind-reals', 'cauchy-reals'],
    scaffold: ['dedekind-cut'],
  },
]

/** canonical id → its group, for the expand badge. */
export const isoGroupByCanonical: ReadonlyMap<string, IsoGroup> = new Map(
  ISO_GROUPS.map((g) => [g.canonical, g]),
)

/** variant id → canonical id, for drawing the dashed ≅ construction edges. */
export const canonicalOfVariant: ReadonlyMap<string, string> = new Map(
  ISO_GROUPS.flatMap((g) => g.variants.map((v) => [v, g.canonical] as const)),
)

/**
 * The node ids hidden in the current view: for every canonical NOT in `expanded`,
 * its variants and their private scaffolding. Empty when `showAll` is set (the
 * global override that reveals every construction at once).
 */
export function collapsedConstructionIds(
  expanded: ReadonlySet<string>,
  showAll: boolean,
): Set<string> {
  const hidden = new Set<string>()
  if (showAll) return hidden
  for (const group of ISO_GROUPS) {
    if (expanded.has(group.canonical)) continue
    for (const v of group.variants) hidden.add(v)
    for (const s of group.scaffold ?? []) hidden.add(s)
  }
  return hidden
}

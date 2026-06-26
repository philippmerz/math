import type { MathNode } from '../types'

export const MEASURE_THEORY_NODES: MathNode[] = [
  {
    id: 'sigma-algebra',
    label: 'σ-Algebra',
    title: 'σ-Algebra',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['power-set', 'natural-numbers'],
    definition: String.raw`A **σ-algebra** on a set $X$ is a collection $\Sigma \subseteq \mathcal{P}(X)$ that contains $X$ and is closed under complement and countable unions:
$$X \in \Sigma,\qquad A \in \Sigma \Rightarrow X \setminus A \in \Sigma,\qquad A_1, A_2, \dots \in \Sigma \Rightarrow \bigcup_{n} A_n \in \Sigma.$$
It is the family of sets that can consistently be assigned a size, closed under complement and the countable unions and intersections analysis needs (but not, in general, uncountable ones).`,
  },
  {
    id: 'measurable-space',
    label: 'Measurable Space',
    title: 'Measurable Space',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['sigma-algebra'],
    definition: String.raw`A **measurable space** is a pair $(X, \Sigma)$ of a set together with a σ-algebra $\Sigma$ on it. The members of $\Sigma$ are the **measurable sets** — those eligible to be measured. It is the domain on which measures and measurable functions live, the measure-theoretic counterpart of a topological space.`,
  },
  {
    id: 'measure',
    label: 'Measure',
    title: 'Measure',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['measurable-space', 'real-numbers'],
    definition: String.raw`A **measure** on $(X, \Sigma)$ is a function $\mu : \Sigma \to [0, \infty]$ with $\mu(\varnothing) = 0$ that is **countably additive**: for pairwise disjoint $A_1, A_2, \dots \in \Sigma$,
$$\mu\Bigl(\bigcup_{n} A_n\Bigr) = \sum_{n} \mu(A_n).$$
It assigns a consistent size — for instance length, area, volume, or probability — to every measurable set.`,
  },
  {
    id: 'null-set',
    label: 'Null Set',
    title: 'Null Set (Measure Zero)',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['measure'],
    definition: String.raw`A **null set** (set of **measure zero**) is a measurable set $N$ with $\mu(N) = 0$. Null sets are negligible: a countable union of null sets is null, and — for Lebesgue measure on $\mathbb{R}$ — even some uncountable sets, such as the Cantor set, are null. They are precisely what "almost every" is allowed to ignore.`,
  },
  {
    id: 'almost-everywhere',
    label: 'Almost Everywhere',
    title: 'Almost Everywhere',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['null-set'],
    definition: String.raw`A property holds **almost everywhere** (a.e.) when the set of points where it fails is contained in a null set. Functions equal a.e. are interchangeable for integration, so the theory works with equivalence classes modulo null sets. This tolerance of negligible exceptions is the source of Lebesgue theory's clean convergence theorems.`,
  },
  {
    id: 'borel-sigma-algebra',
    label: 'Borel σ-Algebra',
    title: 'Borel σ-Algebra',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['sigma-algebra', 'real-numbers'],
    definition: String.raw`The **Borel σ-algebra** on $\mathbb{R}$ is the smallest σ-algebra containing every open interval — the intersection of all σ-algebras that do. Its members, the **Borel sets**, form the smallest collection containing the open and closed sets that is closed under countable unions and complements: the natural measurable sets of the real line.`,
  },
  {
    id: 'lebesgue-measure',
    label: 'Lebesgue Measure',
    title: 'Lebesgue Measure',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['measure', 'borel-sigma-algebra'],
    definition: String.raw`**Lebesgue measure** $\lambda$ on $\mathbb{R}$ is the measure assigning each interval its length, $\lambda([a, b]) = b - a$, and invariant under translation. Extending "length" beyond the Borel sets to their completion — the **Lebesgue-measurable sets** — it is the standard measure of the real line (and, via products, of $\mathbb{R}^n$) and the basis of the Lebesgue integral; it cannot be extended consistently to *all* subsets (Vitali sets).`,
  },
  {
    id: 'measurable-function',
    label: 'Measurable Function',
    title: 'Measurable Function',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['measurable-space', 'function'],
    definition: String.raw`A **measurable function** $f : (X, \Sigma) \to (Y, \Sigma_Y)$ is one whose preimages of measurable sets are measurable: $f^{-1}(B) \in \Sigma$ for every $B \in \Sigma_Y$. For real-valued $f$ (with $\mathbb{R}$ carrying its Borel σ-algebra) it suffices that $\{x : f(x) > a\} \in \Sigma$ for all $a \in \mathbb{R}$. Measurability is the regularity needed to integrate, and it survives sums, products, and pointwise limits.`,
  },
  {
    id: 'simple-function',
    label: 'Simple Function',
    title: 'Simple Function',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['measurable-function'],
    definition: String.raw`A **simple function** is a measurable function taking only finitely many values — a finite combination $\sum_{i} c_i \,\mathbf{1}_{A_i}$ of indicator functions of measurable sets $A_i$. Every non-negative measurable function is a pointwise increasing limit of simple functions, which is what makes the Lebesgue integral of such functions well-defined.`,
  },
  {
    id: 'lebesgue-integral',
    label: 'Lebesgue Integral',
    title: 'Lebesgue Integral',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['simple-function', 'measure', 'supremum'],
    definition: String.raw`The **Lebesgue integral** of a non-negative measurable $f$ against $\mu$ is the supremum of the integrals of the simple functions beneath it:
$$\int_X f \, d\mu := \sup\Bigl\{\, \int_X s \, d\mu \;:\; s \text{ simple},\ 0 \le s \le f \,\Bigr\},$$
where a simple function $s = \sum_i c_i\,\mathbf{1}_{A_i}$ (disjoint measurable $A_i$, $c_i \ge 0$) has integral $\sum_i c_i\,\mu(A_i)$. A general $f$ is split into positive and negative parts (integrable when at least one part is finite). By partitioning the *range* instead of the domain it integrates far more functions than Riemann's method and obeys powerful limit theorems (monotone and dominated convergence).`,
  },
  {
    id: 'monotone-convergence-theorem',
    label: 'Monotone Convergence (Lebesgue)',
    title: 'Monotone Convergence Theorem',
    kind: 'theorem',
    tags: ['Measure Theory'],
    dependencies: ['lebesgue-integral', 'measurable-function'],
    definition: String.raw`The **monotone convergence theorem** (Lebesgue): if $0 \le f_1 \le f_2 \le \cdots$ are measurable with pointwise limit $f$, then
$$\int \lim_{n} f_n \, d\mu = \lim_{n} \int f_n \, d\mu.$$
Increasing limits pass through the integral — the basic licence to interchange limit and Lebesgue integral, and the very way the integral extends from simple functions.`,
  },
  {
    id: 'dominated-convergence-theorem',
    label: 'Dominated Convergence',
    title: 'Dominated Convergence Theorem',
    kind: 'theorem',
    tags: ['Measure Theory'],
    dependencies: ['lebesgue-integral', 'almost-everywhere'],
    definition: String.raw`The **dominated convergence theorem**: if measurable functions $f_n \to f$ almost everywhere and $|f_n| \le g$ for some integrable $g$, then $f$ is integrable and
$$\lim_{n} \int f_n \, d\mu = \int f \, d\mu.$$
A single integrable dominating function licenses swapping limit and integral — one of the most-used such theorems in analysis and probability.`,
  },
  {
    id: 'fatous-lemma',
    label: "Fatou's Lemma",
    title: "Fatou's Lemma",
    kind: 'theorem',
    tags: ['Measure Theory'],
    dependencies: ['lebesgue-integral'],
    definition: String.raw`**Fatou's lemma**: for non-negative measurable $f_n$,
$$\int \liminf_{n} f_n \, d\mu \;\le\; \liminf_{n} \int f_n \, d\mu.$$
Mass can leak away in the limit but never appear from nowhere. This one-directional inequality follows from the monotone convergence theorem and in turn yields the dominated convergence theorem.`,
  },
  {
    id: 'fubinis-theorem',
    label: "Fubini's Theorem",
    title: "Fubini's Theorem",
    kind: 'theorem',
    tags: ['Measure Theory'],
    dependencies: ['lebesgue-integral', 'measure'],
    definition: String.raw`**Fubini's theorem**: for $\sigma$-finite measure spaces and a function $f$ integrable on the product space, the double integral equals either iterated integral,
$$\int_{X \times Y} f \, d(\mu \times \nu) = \int_X\!\Bigl(\int_Y f \, d\nu\Bigr) d\mu = \int_Y\!\Bigl(\int_X f \, d\mu\Bigr) d\nu.$$
The order may be swapped once $f$ is integrable; for non-negative measurable $f$, Tonelli's theorem gives the same.`,
  },
]

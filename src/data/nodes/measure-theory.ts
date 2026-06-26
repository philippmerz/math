import type { MathNode } from '../types'

export const MEASURE_THEORY_NODES: MathNode[] = [
  // ── Measurable structure ────────────────────────────────────────────────────
  {
    id: 'sigma-algebra',
    label: 'σ-Algebra',
    title: 'σ-Algebra',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['power-set', 'natural-numbers'],
    description: String.raw`To assign sizes consistently one cannot work with every subset of a space — that founders on paradoxical sets — but only with a family closed under the operations measurement needs. A **σ-algebra** is exactly such a family: it contains the whole space, and is closed under complement and under *countable* unions (hence, via De Morgan, countable intersections). The qualifier "σ" signals countability; allowing only countable, not arbitrary, combinations is what keeps measurement coherent.`,
    definition: String.raw`A **σ-algebra** on a set $X$ is a collection $\Sigma \subseteq \mathcal{P}(X)$ such that
$$X \in \Sigma,\qquad A \in \Sigma \Rightarrow X \setminus A \in \Sigma,\qquad (A_n)_{n \in \mathbb{N}} \subseteq \Sigma \Rightarrow \bigcup_{n} A_n \in \Sigma.$$
These force $\varnothing = X \setminus X \in \Sigma$ and closure under countable intersections, since $\bigcap_n A_n = X \setminus \bigcup_n (X \setminus A_n)$.`,
  },
  {
    id: 'measurable-space',
    label: 'Measurable Space',
    title: 'Measurable Space',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['sigma-algebra'],
    description: String.raw`Bundling a set with a fixed σ-algebra gives the arena on which measures and measurable functions live — the measure-theoretic analogue of a topological space, where instead of designating which sets are *open* one designates which are *measurable*. Only the sets singled out by the σ-algebra are eligible to be assigned a size.`,
    definition: String.raw`A **measurable space** is a pair $(X, \Sigma)$ consisting of a set $X$ and a σ-algebra $\Sigma$ on $X$. The members of $\Sigma$ are the **measurable sets** of the space.`,
  },
  {
    id: 'measure',
    label: 'Measure',
    title: 'Measure',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['measurable-space', 'real-numbers'],
    description: String.raw`A **measure** is the rule that actually assigns sizes. It sends each measurable set to a number in $[0, \infty]$, gives the empty set size zero, and — crucially — is *countably additive*: the size of a countable disjoint union is the sum of the sizes. Countable additivity (rather than mere finite additivity) is the axiom that powers the limit theorems of integration. Length, area, volume, and probability are all measures.`,
    definition: String.raw`A **measure** on a measurable space $(X, \Sigma)$ is a function $\mu : \Sigma \to [0, \infty]$ with $\mu(\varnothing) = 0$ that is **countably additive**: for every sequence $(A_n)_{n \in \mathbb{N}}$ of pairwise disjoint members of $\Sigma$,
$$\mu\Bigl(\bigcup_{n} A_n\Bigr) = \sum_{n} \mu(A_n),$$
the sum taken in $[0, \infty]$. The triple $(X, \Sigma, \mu)$ is a **measure space**, and it is a **probability space** when $\mu(X) = 1$.`,
  },
  {
    id: 'measure-monotonicity',
    label: 'Monotonicity & Subadditivity',
    title: 'Monotonicity and Countable Subadditivity of Measures',
    kind: 'proposition',
    tags: ['Measure Theory'],
    dependencies: ['measure'],
    description: String.raw`Two elementary but constantly used consequences of the measure axioms: a measure is **monotone** (a subset is no larger than the set containing it) and **countably subadditive** (the size of a countable union is at most the sum of the sizes, with equality only guaranteed under disjointness). Both follow by *disjointifying* — rewriting unions as disjoint unions — so that countable additivity applies.`,
    statement: String.raw`Let $\mu$ be a measure on $(X, \Sigma)$ and $A, B, A_1, A_2, \dots \in \Sigma$.
**(Monotonicity)** If $A \subseteq B$ then $\mu(A) \le \mu(B)$.
**(Countable subadditivity)** $\mu\bigl(\bigcup_n A_n\bigr) \le \sum_n \mu(A_n)$.`,
    proof: String.raw`**Monotonicity.** Write $B = A \sqcup (B \setminus A)$, a disjoint union of members of $\Sigma$ (using closure under complement and intersection). By countable additivity applied to the disjoint sequence $A, B \setminus A, \varnothing, \varnothing, \dots$,
$$\mu(B) = \mu(A) + \mu(B \setminus A) \ge \mu(A),$$
since $\mu(B \setminus A) \ge 0$.

**Countable subadditivity.** Disjointify: set $B_1 = A_1$ and $B_n = A_n \setminus \bigcup_{k < n} A_k$ for $n \ge 2$. Each $B_n \in \Sigma$, the $B_n$ are pairwise disjoint, $B_n \subseteq A_n$, and $\bigcup_n B_n = \bigcup_n A_n$. By countable additivity and then monotonicity term by term,
$$\mu\Bigl(\bigcup_n A_n\Bigr) = \mu\Bigl(\bigcup_n B_n\Bigr) = \sum_n \mu(B_n) \le \sum_n \mu(A_n). \qquad \square$$`,
  },
  {
    id: 'measure-continuity-from-below',
    label: 'Continuity from Below',
    title: 'Continuity of Measures from Below',
    kind: 'proposition',
    tags: ['Measure Theory'],
    dependencies: ['measure', 'measure-monotonicity'],
    description: String.raw`A measure respects increasing limits of sets: if measurable sets grow up to a union, their measures grow up to the measure of that union. This "continuity from below" is the set-level shadow of the Monotone Convergence Theorem, and it is the bridge by which countable additivity is converted into limit statements about integrals.`,
    statement: String.raw`Let $\mu$ be a measure on $(X, \Sigma)$ and let $A_1 \subseteq A_2 \subseteq \cdots$ be an increasing sequence in $\Sigma$ with union $A = \bigcup_n A_n$. Then
$$\mu(A) = \lim_{n \to \infty} \mu(A_n) = \sup_n \mu(A_n).$$`,
    proof: String.raw`Disjointify the increasing chain: put $B_1 = A_1$ and $B_n = A_n \setminus A_{n-1}$ for $n \ge 2$. The $B_n \in \Sigma$ are pairwise disjoint with $\bigcup_{k \le n} B_k = A_n$ and $\bigcup_k B_k = A$. By countable additivity,
$$\mu(A) = \sum_{k=1}^{\infty} \mu(B_k) = \lim_{n \to \infty} \sum_{k=1}^{n} \mu(B_k) = \lim_{n \to \infty} \mu(A_n),$$
where the middle equality is the definition of the infinite sum as the limit of its partial sums (in $[0, \infty]$), and the last uses finite additivity $\sum_{k \le n} \mu(B_k) = \mu(A_n)$. Since $A_n \subseteq A_{n+1}$, **monotonicity of measures** gives $\mu(A_n) \le \mu(A_{n+1})$, so $(\mu(A_n))_n$ is a nondecreasing sequence in $[0, \infty]$. For any nondecreasing sequence in the extended reals, $\lim_{n \to \infty} \mu(A_n) = \sup_n \mu(A_n)$ by the definition of the limit of a monotone extended-real sequence: if the supremum is finite it is approached from below in the usual way, and if it is $+\infty$ the partial values exceed every real bound, so the limit is $+\infty$ as well. Hence $\mu(A) = \lim_{n \to \infty} \mu(A_n) = \sup_n \mu(A_n)$. $\square$`,
  },
  {
    id: 'null-set',
    label: 'Null Set',
    title: 'Null Set (Measure Zero)',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['measure', 'measure-monotonicity'],
    description: String.raw`A set of size zero is **negligible**. Null sets can be discarded without changing any measure or integral, and there can be many of them: a countable union of null sets is again null, and even some uncountable sets (the Cantor set, for Lebesgue measure) are null. They are precisely the sets that "almost everywhere" is permitted to ignore.`,
    definition: String.raw`A **null set** (set of **measure zero**) in a measure space $(X, \Sigma, \mu)$ is a set $N \in \Sigma$ with $\mu(N) = 0$. Two basic closure properties follow at once: a countable union of null sets is null, and every measurable subset of a null set is null.`,
    proof: String.raw`We verify the two closure properties stated in the definition.

**A countable union of null sets is null.** Let $N_1, N_2, \dots \in \Sigma$ with $\mu(N_n) = 0$ for all $n$. Then $\bigcup_n N_n \in \Sigma$, and by **countable subadditivity** of $\mu$,
$$0 \le \mu\Bigl(\bigcup_n N_n\Bigr) \le \sum_n \mu(N_n) = \sum_n 0 = 0,$$
so $\mu\bigl(\bigcup_n N_n\bigr) = 0$. Likewise every measurable subset $M \subseteq N$ of a null set is null, since $0 \le \mu(M) \le \mu(N) = 0$ by **monotonicity**. $\square$`,
  },
  {
    id: 'almost-everywhere',
    label: 'Almost Everywhere',
    title: 'Almost Everywhere',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['null-set', 'measure-monotonicity'],
    description: String.raw`Lebesgue theory tolerates exceptions on negligible sets. A property holds **almost everywhere** when the set where it fails is contained in a null set; two functions equal almost everywhere are interchangeable for every purpose of integration. This deliberate blindness to null sets is exactly what gives the theory its clean convergence theorems, where hypotheses need hold only a.e.`,
    definition: String.raw`In a measure space $(X, \Sigma, \mu)$, a property $P(x)$ holds **almost everywhere** ($\mu$-a.e.) if there is a null set $N$ with $\{x \in X : P(x) \text{ fails}\} \subseteq N$. When the failure set $F = \{x : P(x) \text{ fails}\}$ is itself measurable this is equivalent to $\mu(F) = 0$: if $\mu(F) = 0$ take $N = F$; conversely if $F \subseteq N$ with $\mu(N) = 0$ then **monotonicity of measures** gives $\mu(F) \le \mu(N) = 0$. (For a possibly non-measurable failure set the containment form is the operative one, so the notion behaves correctly even on incomplete measure spaces.) Two functions $f, g$ are **equal a.e.** if $f(x) = g(x)$ for all $x$ outside a null set.`,
  },
  {
    id: 'borel-sigma-algebra',
    label: 'Borel σ-Algebra',
    title: 'Borel σ-Algebra',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['sigma-algebra', 'real-numbers', 'rationals', 'open-closed-sets'],
    description: String.raw`The natural measurable sets of the real line are the **Borel sets**: the smallest σ-algebra containing the open sets. Generating it from the open intervals and closing under complement and countable union sweeps in the closed sets, the countable intersections of open sets, and far beyond — every set one meets in ordinary analysis. Being the *smallest* such σ-algebra makes it canonical and makes proofs by "it holds on a generating family, hence on all Borel sets" possible.`,
    definition: String.raw`The **Borel σ-algebra** $\mathcal{B}(\mathbb{R})$ is the smallest σ-algebra on $\mathbb{R}$ containing every open interval — equivalently, the intersection of all σ-algebras on $\mathbb{R}$ that contain the open sets:
$$\mathcal{B}(\mathbb{R}) := \bigcap \{\, \Sigma : \Sigma \text{ is a σ-algebra on } \mathbb{R} \text{ with every open interval in } \Sigma \,\}.$$
Its members are the **Borel sets**.`,
    proof: String.raw`**Well-definedness.** The collection $\mathcal{P}(\mathbb{R})$ is itself a σ-algebra containing all open intervals, so the family of σ-algebras over which the intersection is taken is non-empty. An arbitrary intersection of σ-algebras on $\mathbb{R}$ is again a σ-algebra: if every $\Sigma$ in the family contains $\mathbb{R}$, is closed under complement, and is closed under countable unions, then so is their intersection (a set in the intersection lies in each $\Sigma$, hence so does its complement and any countable union of such sets). Thus $\mathcal{B}(\mathbb{R})$ is a σ-algebra; it contains the open intervals by construction; and it is contained in every σ-algebra containing the open intervals, so it is the smallest.

**Agreement of the two generating families.** The σ-algebra generated by the open intervals coincides with the one generated by all open sets. Every open interval is open, so the latter contains the former. For the reverse inclusion, every open $U \subseteq \mathbb{R}$ is a countable union of open intervals: for each $x \in U$ choose rationals $p < x < q$ with $(p, q) \subseteq U$ (possible since some $(x - \varepsilon, x + \varepsilon) \subseteq U$ and $\mathbb{Q}$ is dense); the resulting intervals have rational endpoints, so there are only countably many distinct ones among them, and their union is exactly $U$. Hence each open set lies in the σ-algebra generated by the open intervals, so the two generating families produce the same σ-algebra, and $\mathcal{B}(\mathbb{R})$ is equally the smallest σ-algebra containing the open sets. $\square$`,
  },
  {
    id: 'lebesgue-measure',
    label: 'Lebesgue Measure',
    title: 'Lebesgue Measure',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['measure', 'borel-sigma-algebra'],
    description: String.raw`**Lebesgue measure** is the rigorous notion of "length" on the real line: it assigns to each interval its length and is invariant under translation, then extends this consistently to a vast σ-algebra of sets via outer measure (covering a set by countably many intervals and taking the infimum of total length). It is the standard measure underlying the Lebesgue integral; it cannot be extended to *all* subsets of $\mathbb{R}$, as Vitali sets show.`,
    definition: String.raw`The **Lebesgue outer measure** of $A \subseteq \mathbb{R}$ is
$$\lambda^{*}(A) = \inf\Bigl\{\, \sum_{n} (b_n - a_n) \;:\; A \subseteq \bigcup_n (a_n, b_n) \,\Bigr\},$$
the infimum over all countable covers of $A$ by open intervals. A set $E \subseteq \mathbb{R}$ is **Lebesgue measurable** if it satisfies the **Carathéodory criterion**
$$\lambda^{*}(T) = \lambda^{*}(T \cap E) + \lambda^{*}(T \setminus E) \quad\text{for every } T \subseteq \mathbb{R}.$$
The Lebesgue-measurable sets form a σ-algebra $\mathcal{L} \supseteq \mathcal{B}(\mathbb{R})$, and **Lebesgue measure** is $\lambda := \lambda^{*}\!\restriction_{\mathcal{L}}$, a measure with $\lambda([a, b]) = b - a$ and $\lambda(E + t) = \lambda(E)$ for all $t \in \mathbb{R}$.`,
  },
  {
    id: 'measurable-function',
    label: 'Measurable Function',
    title: 'Measurable Function',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['measurable-space', 'function', 'borel-sigma-algebra'],
    description: String.raw`A function is **measurable** when it pulls measurable sets back to measurable sets — the regularity required to integrate it, exactly parallel to a continuous function pulling open sets back to open sets. For real-valued functions it suffices to check preimages of the rays $(a, \infty)$. Measurability is robust: it survives sums, products, and — unlike continuity — pointwise limits, which is what lets the integral interact with limits.`,
    definition: String.raw`Given measurable spaces $(X, \Sigma)$ and $(Y, \Sigma_Y)$, a function $f : X \to Y$ is **measurable** if $f^{-1}(B) \in \Sigma$ for every $B \in \Sigma_Y$. For a real-valued $f : X \to \mathbb{R}$ with $\mathbb{R}$ carrying its **Borel σ-algebra**, this is equivalent to
$$\{x \in X : f(x) > a\} \in \Sigma \quad\text{for every } a \in \mathbb{R},$$
since the rays $(a, \infty)$ generate $\mathcal{B}(\mathbb{R})$. An extended-real-valued $f : X \to [-\infty, \infty]$ is measurable if additionally $f^{-1}(\{+\infty\}), f^{-1}(\{-\infty\}) \in \Sigma$.`,
    proof: String.raw`**The ray criterion suffices.** Suppose $\{f > a\} \in \Sigma$ for every $a \in \mathbb{R}$. Let $\mathcal{G} = \{\, B \subseteq \mathbb{R} : f^{-1}(B) \in \Sigma \,\}$. Because preimage commutes with complement and countable union — $f^{-1}(\mathbb{R} \setminus B) = X \setminus f^{-1}(B)$ and $f^{-1}(\bigcup_n B_n) = \bigcup_n f^{-1}(B_n)$ — and $f^{-1}(\mathbb{R}) = X \in \Sigma$, the family $\mathcal{G}$ is a σ-algebra. It contains every ray $(a, \infty)$ by hypothesis, hence (closing under the σ-algebra operations) every open interval $(a, b) = (a, \infty) \setminus [b, \infty)$ with $[b, \infty) = \bigcap_n (b - \tfrac1n, \infty)$. Since $\mathcal{B}(\mathbb{R})$ is the *smallest* σ-algebra containing the open intervals, $\mathcal{B}(\mathbb{R}) \subseteq \mathcal{G}$; that is, $f^{-1}(B) \in \Sigma$ for every Borel set $B$. $\square$`,
  },
  {
    id: 'measurable-limit-stability',
    label: 'Limits of Measurable Functions',
    title: 'Pointwise Suprema and Limits Preserve Measurability',
    kind: 'proposition',
    tags: ['Measure Theory'],
    dependencies: ['measurable-function'],
    description: String.raw`The decisive advantage of measurability over continuity: it is closed under countable limiting operations. The pointwise supremum, infimum, limsup, liminf, and pointwise limit of a sequence of measurable functions are all measurable. This is what makes the convergence theorems even statable — the candidate limit function is automatically a legitimate object to integrate.`,
    statement: String.raw`Let $(f_n)$ be a sequence of measurable functions $X \to [-\infty, \infty]$ on $(X, \Sigma)$. Then $\sup_n f_n$, $\inf_n f_n$, $\limsup_n f_n$, and $\liminf_n f_n$ are measurable; and if $f_n \to f$ pointwise then $f$ is measurable.`,
    proof: String.raw`**Extended-real ray criterion.** For $g : X \to [-\infty, \infty]$ the condition $\{g > a\} \in \Sigma$ for every real $a$ already implies $g$ is measurable. Indeed it forces the two value-at-infinity preimages to be measurable,
$$g^{-1}(\{+\infty\}) = \bigcap_{k \in \mathbb{N}} \{g > k\} \in \Sigma, \qquad g^{-1}(\{-\infty\}) = X \setminus \bigcup_{k \in \mathbb{N}} \{g > -k\} \in \Sigma,$$
both being countable Boolean combinations of the measurable rays. The restriction $g$ to the real-valued part is then measurable by the **ray criterion for measurability**, and together with the two preimages above $g$ meets the full definition of measurability for an extended-real-valued function. So it suffices, in each case below, to verify $\{g > a\} \in \Sigma$ for every $a \in \mathbb{R}$.

For $g = \sup_n f_n$ and each $a \in \mathbb{R}$,
$$\{\sup_n f_n > a\} = \bigcup_n \{f_n > a\} \in \Sigma,$$
a countable union of measurable sets (each $\{f_n > a\} \in \Sigma$ since $f_n$ is measurable); hence by the extended-real ray criterion $\sup_n f_n$ is measurable. Applying this to $(-f_n)$ and using $\inf_n f_n = -\sup_n(-f_n)$ gives measurability of $\inf_n f_n$. Then
$$\limsup_n f_n = \inf_{m} \sup_{n \ge m} f_n, \qquad \liminf_n f_n = \sup_{m} \inf_{n \ge m} f_n$$
are measurable as iterated countable sup/inf of measurable functions, each step preserving measurability by the cases just established. Finally, if $f_n \to f$ pointwise then $f = \limsup_n f_n$, so $f$ is measurable. $\square$`,
  },
  {
    id: 'simple-function',
    label: 'Simple Function',
    title: 'Simple Function',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['measurable-function'],
    description: String.raw`The building blocks of the Lebesgue integral are **simple functions** — measurable functions taking only finitely many values, i.e. finite linear combinations of indicators of measurable sets. Their integral is unambiguous: just sum (value)×(measure of the set) over the values. Every non-negative measurable function is an increasing pointwise limit of simple functions, which is precisely how the integral is extended to all of them.`,
    definition: String.raw`A **simple function** on $(X, \Sigma)$ is a measurable $s : X \to \mathbb{R}$ taking finitely many values. Equivalently, it has a **standard representation** $s = \sum_{i=1}^{n} c_i \,\mathbf{1}_{A_i}$ with distinct values $c_i \in \mathbb{R}$ and pairwise disjoint measurable sets $A_i = s^{-1}(\{c_i\})$ that partition $X$, where $\mathbf{1}_{A}(x) = 1$ if $x \in A$ and $0$ otherwise. For a *non-negative* simple function ($c_i \ge 0$) its **integral** against a measure $\mu$ is
$$\int_X s \, d\mu := \sum_{i=1}^{n} c_i\, \mu(A_i) \in [0, \infty],$$
with the measure-theoretic convention $0 \cdot \infty = 0$, so that a band on which $s$ vanishes contributes nothing even when its set has infinite measure (e.g. the zero function integrates to $0$ on any space).`,
  },
  {
    id: 'simple-function-approximation',
    label: 'Simple Approximation',
    title: 'Approximation by Simple Functions',
    kind: 'lemma',
    tags: ['Measure Theory'],
    dependencies: ['simple-function', 'measurable-function'],
    description: String.raw`Every non-negative measurable function is the pointwise limit of an increasing sequence of non-negative simple functions. The construction is the **dyadic staircase**: at level $n$, chop the range $[0, n]$ into bands of height $2^{-n}$ and round each value down to the nearest band, capping at $n$. Refining $n$ doubles the resolution and raises the floor, so the staircases increase to the function. This lemma is what makes the definition of the Lebesgue integral effective and drives the proof of the Monotone Convergence Theorem.`,
    statement: String.raw`For every measurable $f : X \to [0, \infty]$ there is a sequence of simple functions $0 \le s_1 \le s_2 \le \cdots$ with $s_n(x) \to f(x)$ for every $x \in X$, the convergence being uniform on any set where $f$ is bounded.`,
    proof: String.raw`For $n \in \mathbb{N}$ define the **dyadic truncation**
$$s_n(x) = \begin{cases} \dfrac{k}{2^n}, & \dfrac{k}{2^n} \le f(x) < \dfrac{k+1}{2^n},\ \ 0 \le k < n\,2^n,\\[2mm] n, & f(x) \ge n. \end{cases}$$
Each level set $\{k\,2^{-n} \le f < (k+1)2^{-n}\} = \{f \ge k\,2^{-n}\} \cap \{f < (k+1)2^{-n}\}$ and $\{f \ge n\}$ are measurable by the **ray criterion**, and $s_n$ takes finitely many values, so each $s_n$ is a non-negative simple function with $0 \le s_n \le f$.

*Increasing.* Going from $n$ to $n+1$ halves the band width and raises the cap from $n$ to $n+1$. On $\{f \ge n+1\}$, $s_n = n < n+1 = s_{n+1}$. Where $f < n+1$, a band $[k\,2^{-n}, (k+1)2^{-n})$ of level $n$ splits into the two bands $[2k\,2^{-(n+1)}, (2k+1)2^{-(n+1)})$ and $[(2k+1)2^{-(n+1)}, (2k+2)2^{-(n+1)})$ of level $n+1$, on which $s_{n+1}$ equals $k\,2^{-n}$ or $k\,2^{-n} + 2^{-(n+1)}$ respectively — in both cases $\ge s_n = k\,2^{-n}$. Hence $s_n \le s_{n+1}$ everywhere.

*Convergence.* Fix $x$. If $f(x) < \infty$, then for all $n > f(x)$ we have $0 \le f(x) - s_n(x) < 2^{-n} \to 0$, so $s_n(x) \to f(x)$; the bound $2^{-n}$ is uniform over any set where $f \le M$ once $n > M$. If $f(x) = \infty$, then $s_n(x) = n \to \infty = f(x)$. $\square$`,
  },
  {
    id: 'lebesgue-integral',
    label: 'Lebesgue Integral',
    title: 'Lebesgue Integral',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['simple-function', 'simple-function-approximation', 'measure', 'supremum'],
    description: String.raw`The Lebesgue integral builds area by partitioning the *range* of a function rather than its domain. For a non-negative measurable function it is the supremum of the integrals of all simple functions sitting beneath it; for a general function one integrates its positive and negative parts separately and subtracts. By organizing the integral around level sets it integrates far more functions than the Riemann construction and, decisively, commutes with limits under mild hypotheses (the monotone and dominated convergence theorems).`,
    definition: String.raw`Let $(X, \Sigma, \mu)$ be a measure space. For measurable $f : X \to [0, \infty]$ the **Lebesgue integral** is
$$\int_X f \, d\mu := \sup\Bigl\{\, \int_X s \, d\mu \;:\; s \text{ simple},\ 0 \le s \le f \,\Bigr\} \in [0, \infty],$$
the integral of a simple function being $\int_X (\sum_i c_i \mathbf{1}_{A_i})\, d\mu = \sum_i c_i\,\mu(A_i)$, with the convention $0 \cdot \infty = 0$ (so the cell where the function vanishes never contributes, even if it has infinite measure). For general measurable $f : X \to [-\infty, \infty]$, split $f = f^{+} - f^{-}$ with $f^{+} = \max(f, 0)$, $f^{-} = \max(-f, 0)$; $f$ is **integrable** when $\int f^{+}\, d\mu < \infty$ and $\int f^{-}\, d\mu < \infty$, and then $\int_X f\, d\mu := \int_X f^{+}\, d\mu - \int_X f^{-}\, d\mu$. One writes $\int_E f\, d\mu := \int_X f\,\mathbf{1}_E\, d\mu$ for $E \in \Sigma$.`,
    proof: String.raw`**Consistency on simple functions.** The definition must agree with $\int_X s\, d\mu = \sum_i c_i\mu(A_i)$ when $f = s$ is itself simple and non-negative. Since $s$ is one of the competitors $0 \le s \le f = s$, the supremum is $\ge \sum_i c_i\mu(A_i)$. Conversely any simple $t$ with $0 \le t \le s$ has $\int t\, d\mu \le \int s\, d\mu$: refining to the common partition generated by the level sets of $s$ and $t$, on each cell $t \le s$ pointwise forces the corresponding coefficients to satisfy the same inequality, and $\mu \ge 0$ then gives $\int t\,d\mu \le \int s\,d\mu$ (additivity of the simple integral over a common refinement is immediate from finite additivity of $\mu$). Hence the supremum equals $\int_X s\, d\mu$, so the two definitions coincide. By the **simple approximation lemma** every non-negative measurable $f$ does admit simple functions beneath it (e.g. the dyadic truncations), so the supremum is over a non-empty set and is well-defined in $[0, \infty]$. $\square$`,
  },

  // ── The convergence theorems ────────────────────────────────────────────────
  {
    id: 'monotone-convergence-theorem',
    label: 'Monotone Convergence (Lebesgue)',
    title: 'Monotone Convergence Theorem',
    kind: 'theorem',
    tags: ['Measure Theory'],
    dependencies: ['lebesgue-integral', 'simple-function-approximation', 'measurable-limit-stability', 'measure-continuity-from-below'],
    description: String.raw`The foundational interchange theorem of Lebesgue theory: for an *increasing* sequence of non-negative measurable functions, the integral of the pointwise limit equals the limit of the integrals. Increasing limits pass freely through the integral. This is the result that actually extends the integral from simple functions to all non-negative measurable ones, and from it Fatou's lemma and dominated convergence follow.`,
    statement: String.raw`Let $(X, \Sigma, \mu)$ be a measure space and let $f_1 \le f_2 \le \cdots$ be measurable functions $X \to [0, \infty]$ with pointwise limit $f = \sup_n f_n$. Then $f$ is measurable and
$$\int_X f \, d\mu = \lim_{n \to \infty} \int_X f_n \, d\mu = \sup_n \int_X f_n\, d\mu.$$`,
    proof: String.raw`The limit $f = \sup_n f_n$ is measurable by **stability of measurability under suprema**.

*The inequality $\le$ holds in one direction trivially.* Since $f_n \le f_{n+1} \le f$, monotonicity of the integral (a smaller non-negative function admits fewer simple minorants) gives $\int f_n\, d\mu \le \int f_{n+1}\, d\mu \le \int f\, d\mu$. Thus $L := \lim_n \int f_n\, d\mu = \sup_n \int f_n\, d\mu$ exists in $[0, \infty]$ and $L \le \int f\, d\mu$.

*The reverse inequality $\int f\, d\mu \le L$.* By definition of $\int f\, d\mu$ as a supremum, it suffices to show $\int s\, d\mu \le L$ for every simple $s$ with $0 \le s \le f$. Fix such an $s = \sum_{i=1}^{m} c_i \mathbf{1}_{A_i}$ (standard representation) and a constant $0 < \alpha < 1$. Define the measurable sets
$$E_n = \{x \in X : f_n(x) \ge \alpha\, s(x)\}.$$
Because $f_n$ is increasing, $E_n \subseteq E_{n+1}$; and $\bigcup_n E_n = X$, since for any $x$, either $s(x) = 0$ (then $x \in E_1$) or $s(x) > 0$ and $f(x) \ge s(x) > \alpha s(x)$, so $f_n(x) \ge \alpha s(x)$ for some $n$. Now
$$\int_X f_n\, d\mu \ge \int_{E_n} f_n\, d\mu \ge \alpha \int_{E_n} s\, d\mu = \alpha \sum_{i=1}^{m} c_i\, \mu(A_i \cap E_n).$$
As $n \to \infty$, the increasing sets $A_i \cap E_n$ rise to $A_i$, so by **continuity from below** $\mu(A_i \cap E_n) \to \mu(A_i)$. Passing to the limit,
$$L = \lim_n \int_X f_n\, d\mu \ge \alpha \sum_{i=1}^{m} c_i\, \mu(A_i) = \alpha \int_X s\, d\mu.$$
Letting $\alpha \uparrow 1$ gives $L \ge \int_X s\, d\mu$, and taking the supremum over all such $s$ yields $L \ge \int_X f\, d\mu$. Combined with $L \le \int_X f\, d\mu$, the two are equal. $\square$`,
  },
  {
    id: 'fatous-lemma',
    label: "Fatou's Lemma",
    title: "Fatou's Lemma",
    kind: 'lemma',
    tags: ['Measure Theory'],
    dependencies: ['monotone-convergence-theorem', 'measurable-limit-stability'],
    description: String.raw`For any sequence of non-negative measurable functions — no monotonicity or convergence assumed — the integral of the liminf is at most the liminf of the integrals. Intuitively, mass can leak away to infinity in the limit but can never be created from nothing. This one-sided inequality is the workhorse from which the Dominated Convergence Theorem is derived, and it follows from Monotone Convergence applied to the increasing infima $\inf_{k \ge n} f_k$.`,
    statement: String.raw`Let $(f_n)$ be measurable functions $X \to [0, \infty]$ on a measure space $(X, \Sigma, \mu)$. Then
$$\int_X \liminf_{n \to \infty} f_n \, d\mu \;\le\; \liminf_{n \to \infty} \int_X f_n \, d\mu.$$`,
    proof: String.raw`Set $g_n = \inf_{k \ge n} f_k$. Each $g_n$ is measurable (a countable infimum, by **stability of measurability**) with $0 \le g_n$, and the sequence $(g_n)$ is increasing in $n$ with $\sup_n g_n = \liminf_n f_n$ by definition of liminf. By the **Monotone Convergence Theorem**,
$$\int_X \liminf_{n} f_n\, d\mu = \int_X \lim_n g_n\, d\mu = \lim_n \int_X g_n\, d\mu.$$
Now for every $k \ge n$ we have $g_n \le f_k$ pointwise, so monotonicity of the integral gives $\int g_n\, d\mu \le \int f_k\, d\mu$ for all $k \ge n$, whence $\int g_n\, d\mu \le \inf_{k \ge n} \int f_k\, d\mu$. Taking $n \to \infty$,
$$\lim_n \int_X g_n\, d\mu \le \lim_n \inf_{k \ge n} \int_X f_k\, d\mu = \liminf_n \int_X f_n\, d\mu.$$
Chaining the two displays gives the claim. $\square$`,
  },
  {
    id: 'dominated-convergence-theorem',
    label: 'Dominated Convergence',
    title: 'Dominated Convergence Theorem',
    kind: 'theorem',
    tags: ['Measure Theory'],
    dependencies: ['lebesgue-integral', 'fatous-lemma', 'almost-everywhere', 'measurable-limit-stability'],
    description: String.raw`If a sequence of measurable functions converges almost everywhere and is uniformly bounded by a single integrable function, then the limit is integrable and the integral commutes with the limit. The integrable dominating function $g$ confines all the mass, preventing the leakage that Fatou's lemma warns of, so the inequality becomes an equality. It is one of the most heavily used theorems in analysis and probability.`,
    statement: String.raw`Let $(f_n)$ be measurable functions $X \to \mathbb{R}$ on $(X, \Sigma, \mu)$ with $f_n \to f$ almost everywhere, and suppose there is an integrable $g \ge 0$ with $|f_n| \le g$ a.e. for all $n$. Then $f$ is integrable and
$$\lim_{n \to \infty} \int_X |f_n - f|\, d\mu = 0, \qquad\text{hence}\qquad \lim_{n \to \infty} \int_X f_n \, d\mu = \int_X f \, d\mu.$$`,
    proof: String.raw`Modifying on a null set changes no integral (by definition of integration "**almost everywhere**"), so we may assume $f_n \to f$ everywhere and $|f_n| \le g$ everywhere. As the everywhere-pointwise limit of the measurable functions $f_n$, the function $f$ is measurable by **stability of measurability under limits**. Then $|f| = \lim_n |f_n| \le g$, so $\int |f|\, d\mu \le \int g\, d\mu < \infty$; being measurable with finite integral of its absolute value, $f$ is integrable, and likewise each $f_n$ is integrable.

Consider the non-negative measurable functions $h_n := 2g - |f_n - f| \ge 0$ (non-negative since $|f_n - f| \le |f_n| + |f| \le 2g$). Apply **Fatou's lemma** to $(h_n)$. Since $f_n \to f$ pointwise, $|f_n - f| \to 0$, so $\liminf_n h_n = 2g$. Thus
$$\int_X 2g\, d\mu = \int_X \liminf_n h_n\, d\mu \le \liminf_n \int_X h_n\, d\mu = \liminf_n \Bigl( \int_X 2g\, d\mu - \int_X |f_n - f|\, d\mu \Bigr).$$
The middle and right use linearity of the integral on non-negative integrable functions. Since $\int 2g\, d\mu < \infty$ it may be cancelled, and $\liminf_n(-a_n) = -\limsup_n a_n$, giving
$$0 \le -\limsup_n \int_X |f_n - f|\, d\mu, \quad\text{i.e.}\quad \limsup_n \int_X |f_n - f|\, d\mu \le 0.$$
As the integrals $\int |f_n - f|\, d\mu \ge 0$, this forces $\int_X |f_n - f|\, d\mu \to 0$. Finally $\bigl| \int f_n\, d\mu - \int f\, d\mu \bigr| = \bigl| \int (f_n - f)\, d\mu \bigr| \le \int |f_n - f|\, d\mu \to 0$. $\square$`,
  },

  // ── Product measures and Fubini–Tonelli ─────────────────────────────────────
  {
    id: 'dynkin-pi-lambda',
    label: 'π–λ Theorem (Dynkin)',
    title: "Dynkin's π–λ Theorem",
    kind: 'theorem',
    tags: ['Measure Theory'],
    dependencies: ['sigma-algebra'],
    description: String.raw`Dynkin's **π–λ theorem** is the standard device for upgrading a property known on a small, intersection-stable generating family to the whole σ-algebra it generates. A **π-system** is closed under finite intersection; a **λ-system** is closed under the weaker operations of complementation-relative-to-the-whole-space and countable *disjoint* (or increasing) unions. The theorem says that if a λ-system contains a π-system, it contains the entire σ-algebra generated by that π-system. It is the workhorse behind uniqueness of measures and the measurability arguments in the construction of product measures.`,
    statement: String.raw`Let $X$ be a set. A **π-system** on $X$ is a non-empty collection $\mathcal{P} \subseteq \mathcal{P}(X)$ closed under finite intersection ($A, B \in \mathcal{P} \Rightarrow A \cap B \in \mathcal{P}$). A **λ-system** (or Dynkin system) on $X$ is a collection $\mathcal{L} \subseteq \mathcal{P}(X)$ such that $X \in \mathcal{L}$; $A, B \in \mathcal{L}$ with $A \subseteq B$ implies $B \setminus A \in \mathcal{L}$; and whenever $A_1 \subseteq A_2 \subseteq \cdots$ all lie in $\mathcal{L}$, their union $\bigcup_n A_n \in \mathcal{L}$.

**Theorem (Dynkin).** If a λ-system $\mathcal{L}$ contains a π-system $\mathcal{P}$, then $\mathcal{L}$ contains the σ-algebra $\sigma(\mathcal{P})$ generated by $\mathcal{P}$.`,
    proof: String.raw`First note an equivalent characterization: a collection that is simultaneously a λ-system and a π-system is a σ-algebra. Indeed, if $\mathcal{M}$ is a λ-system closed under finite intersection, then $X \in \mathcal{M}$; it is closed under complement since $A^c = X \setminus A$ with $A \subseteq X$; and given any $A_n \in \mathcal{M}$ the sets $B_n = A_1 \cup \cdots \cup A_n$ lie in $\mathcal{M}$ — because finite unions are built from finite intersections and complements via $A \cup B = (A^c \cap B^c)^c$, all available in a complement-and-intersection-closed family — and $B_n \uparrow \bigcup_n A_n$, an increasing union, so $\bigcup_n A_n \in \mathcal{M}$. Thus $\mathcal{M}$ is closed under complement and countable union, i.e. a σ-algebra.

Now let $\ell(\mathcal{P})$ be the smallest λ-system containing $\mathcal{P}$ — the intersection of all λ-systems containing $\mathcal{P}$, which is itself a λ-system (the three closure conditions pass to arbitrary intersections), and is contained in $\mathcal{L}$. By the observation above it suffices to show $\ell(\mathcal{P})$ is a π-system; then $\ell(\mathcal{P})$ is a σ-algebra containing $\mathcal{P}$, so $\sigma(\mathcal{P}) \subseteq \ell(\mathcal{P}) \subseteq \mathcal{L}$.

To prove $\ell(\mathcal{P})$ is closed under intersection, for a fixed $A$ define
$$\mathcal{D}_A = \{\, B \in \ell(\mathcal{P}) : A \cap B \in \ell(\mathcal{P}) \,\}.$$
We claim $\mathcal{D}_A$ is a λ-system whenever $A \in \ell(\mathcal{P})$. It contains $X$ since $A \cap X = A \in \ell(\mathcal{P})$. If $B, C \in \mathcal{D}_A$ with $B \subseteq C$, then $A \cap (C \setminus B) = (A \cap C) \setminus (A \cap B)$ is a proper difference of the members $A \cap B \subseteq A \cap C$ of $\ell(\mathcal{P})$, hence in $\ell(\mathcal{P})$, so $C \setminus B \in \mathcal{D}_A$. If $B_1 \subseteq B_2 \subseteq \cdots$ lie in $\mathcal{D}_A$, then $A \cap B_n \uparrow A \cap \bigcup_n B_n$ is an increasing union of members of $\ell(\mathcal{P})$, so $\bigcup_n B_n \in \mathcal{D}_A$. Thus $\mathcal{D}_A$ is a λ-system.

If $A \in \mathcal{P}$, then for every $B \in \mathcal{P}$ we have $A \cap B \in \mathcal{P} \subseteq \ell(\mathcal{P})$ (π-system), so $\mathcal{P} \subseteq \mathcal{D}_A$; minimality gives $\ell(\mathcal{P}) \subseteq \mathcal{D}_A$, i.e. $A \cap B \in \ell(\mathcal{P})$ for all $A \in \mathcal{P}$, $B \in \ell(\mathcal{P})$. But this says: for every $B \in \ell(\mathcal{P})$, every $A \in \mathcal{P}$ lies in $\mathcal{D}_B$, so $\mathcal{P} \subseteq \mathcal{D}_B$, and again by minimality $\ell(\mathcal{P}) \subseteq \mathcal{D}_B$. Hence $A \cap B \in \ell(\mathcal{P})$ for all $A, B \in \ell(\mathcal{P})$: $\ell(\mathcal{P})$ is a π-system, completing the proof. $\square$`,
  },
  {
    id: 'product-measure',
    label: 'Product Measure',
    title: 'Product σ-Algebra and Product Measure',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['measure', 'sigma-algebra', 'measure-continuity-from-below', 'dynkin-pi-lambda', 'monotone-convergence-theorem'],
    description: String.raw`To integrate over two variables at once one needs a measure on the product space. The **product σ-algebra** is generated by the measurable rectangles $A \times B$, and the **product measure** is the unique σ-finite measure giving each rectangle the product of the side measures, $\mu(A)\nu(B)$. It is the abstract counterpart of "area = base × height" and the setting in which Fubini–Tonelli swaps the order of a double integral.`,
    definition: String.raw`Let $(X, \Sigma, \mu)$ and $(Y, \mathcal{T}, \nu)$ be **σ-finite** measure spaces (each space a countable union of sets of finite measure). The **product σ-algebra** $\Sigma \otimes \mathcal{T}$ is the σ-algebra on $X \times Y$ generated by the **measurable rectangles** $A \times B$ ($A \in \Sigma$, $B \in \mathcal{T}$). For $E \in \Sigma \otimes \mathcal{T}$ and $x \in X$, the **$x$-section** is $E_x = \{y \in Y : (x, y) \in E\} \in \mathcal{T}$. The **product measure** $\mu \times \nu$ on $\Sigma \otimes \mathcal{T}$ is defined by
$$(\mu \times \nu)(E) = \int_X \nu(E_x)\, d\mu(x),$$
and is the unique measure with $(\mu \times \nu)(A \times B) = \mu(A)\,\nu(B)$ for all measurable rectangles.`,
    proof: String.raw`**Sections are measurable.** For $E \in \Sigma \otimes \mathcal{T}$ each section $E_x$ is measurable: the family $\{E : E_x \in \mathcal{T} \text{ for all } x\}$ contains the rectangles (a rectangle's $x$-section is $B$ or $\varnothing$) and is a σ-algebra (sectioning commutes with complement and countable union), so it contains $\Sigma \otimes \mathcal{T}$. Thus $\nu(E_x)$ is defined for every $x$.

**The map $x \mapsto \nu(E_x)$ is measurable.** Assume first that $\nu$ is *finite*, $\nu(Y) < \infty$. Let
$$\mathcal{D} = \{\, E \in \Sigma \otimes \mathcal{T} : x \mapsto \nu(E_x) \text{ is } \Sigma\text{-measurable} \,\}.$$
The measurable rectangles form a π-system $\mathcal{P}$ (closed under finite intersection, since $(A \times B) \cap (A' \times B') = (A \cap A') \times (B \cap B')$), and $\mathcal{P} \subseteq \mathcal{D}$ because $\nu((A \times B)_x) = \nu(B)\,\mathbf{1}_A(x)$ is a measurable function of $x$. Moreover $\mathcal{D}$ is a λ-system: it contains $X \times Y$ (whose section measure is the constant $\nu(Y)$); it is closed under proper differences, for if $E \subseteq F$ lie in $\mathcal{D}$ then $(F \setminus E)_x = F_x \setminus E_x$ and $\nu((F \setminus E)_x) = \nu(F_x) - \nu(E_x)$ is measurable (the subtraction is legitimate and finite because $\nu$ is finite); and it is closed under increasing unions, for if $E^{(1)} \subseteq E^{(2)} \subseteq \cdots$ lie in $\mathcal{D}$ with union $E$ then $E^{(n)}_x \uparrow E_x$, so by **continuity from below** $\nu(E_x) = \lim_n \nu(E^{(n)}_x)$ is a pointwise limit of measurable functions, hence measurable. By **Dynkin's π–λ theorem**, $\mathcal{D}$ contains the σ-algebra generated by $\mathcal{P}$, which is $\Sigma \otimes \mathcal{T}$; so $x \mapsto \nu(E_x)$ is measurable for every $E$.

For general *σ-finite* $\nu$, write $Y = \bigcup_k Y_k$ with $Y_k \in \mathcal{T}$, $Y_1 \subseteq Y_2 \subseteq \cdots$, and $\nu(Y_k) < \infty$. Each finite measure $\nu_k(\cdot) := \nu(\cdot \cap Y_k)$ makes $x \mapsto \nu_k(E_x) = \nu(E_x \cap Y_k)$ measurable by the finite case, and $\nu(E_x) = \lim_k \nu(E_x \cap Y_k)$ as an increasing limit (continuity from below); hence $x \mapsto \nu(E_x)$ is measurable as a pointwise limit of measurable functions.

**The defining integral gives a measure.** With $x \mapsto \nu(E_x)$ measurable, $E \mapsto \int_X \nu(E_x)\, d\mu(x)$ is well-defined, and $(\mu \times \nu)(\varnothing) = 0$. It is countably additive: for pairwise disjoint $E^{(n)}$ the sections $E^{(n)}_x$ are pairwise disjoint, so $\nu\bigl(\bigcup_n E^{(n)}_x\bigr) = \sum_n \nu(E^{(n)}_x)$ by countable additivity of $\nu$. Writing $G_N(x) = \sum_{n \le N} \nu(E^{(n)}_x)$, the non-negative measurable integrands increase, $G_N \uparrow \sum_n \nu(E^{(n)}_x)$ pointwise, so by the **Monotone Convergence Theorem** the integral commutes with the increasing limit, $\int_X \sum_n \nu(E^{(n)}_x)\, d\mu = \lim_N \int_X G_N\, d\mu = \sum_n \int_X \nu(E^{(n)}_x)\, d\mu$ (the finite sums coming out by linearity of the integral). This term-by-term integration gives countable additivity of $\mu \times \nu$. On a rectangle, $\nu((A \times B)_x) = \nu(B)\mathbf{1}_A(x)$, so $(\mu \times \nu)(A \times B) = \int_X \nu(B)\mathbf{1}_A\, d\mu = \mu(A)\nu(B)$.

**Uniqueness.** Uniqueness among measures agreeing on rectangles holds because, by σ-finiteness, two such measures agree on the generating π-system of finite-measure rectangles and hence, by **Dynkin's π–λ theorem** (localized to each set $X_j \times Y_k$ of finite product measure in a σ-finite exhaustion), on all of $\Sigma \otimes \mathcal{T}$. $\square$`,
  },
  {
    id: 'tonellis-theorem',
    label: "Tonelli's Theorem",
    title: "Tonelli's Theorem",
    kind: 'theorem',
    tags: ['Measure Theory'],
    dependencies: ['product-measure', 'monotone-convergence-theorem', 'simple-function-approximation'],
    description: String.raw`For non-negative measurable functions on a product of σ-finite spaces, the double integral always equals either iterated integral — *no integrability hypothesis is needed*, since everything is non-negative and values in $[0, \infty]$ are permitted. Tonelli is proved by checking the identity on indicators of measurable sets, lifting to simple functions by linearity, and to all non-negative measurable functions by the Monotone Convergence Theorem. It is the engine behind Fubini's theorem.`,
    statement: String.raw`Let $(X, \Sigma, \mu)$ and $(Y, \mathcal{T}, \nu)$ be σ-finite measure spaces and $f : X \times Y \to [0, \infty]$ be $\Sigma \otimes \mathcal{T}$-measurable. Then $x \mapsto \int_Y f(x, y)\, d\nu(y)$ and $y \mapsto \int_X f(x, y)\, d\mu(x)$ are measurable, and
$$\int_{X \times Y} f \, d(\mu \times \nu) = \int_X \Bigl( \int_Y f(x, y)\, d\nu(y) \Bigr) d\mu(x) = \int_Y \Bigl( \int_X f(x, y)\, d\mu(x) \Bigr) d\nu(y).$$`,
    proof: String.raw`Write $\iint$ for the iterated integral $\int_X(\int_Y \cdot\, d\nu)\, d\mu$; by symmetry it suffices to prove $\int_{X \times Y} f\, d(\mu \times \nu) = \iint f$.

*Indicators.* For $f = \mathbf{1}_E$ with $E \in \Sigma \otimes \mathcal{T}$, the inner integral is $\int_Y \mathbf{1}_E(x, y)\, d\nu(y) = \nu(E_x)$, which is measurable in $x$ (shown in the construction of the **product measure**), and $\iint \mathbf{1}_E = \int_X \nu(E_x)\, d\mu(x) = (\mu \times \nu)(E) = \int_{X \times Y} \mathbf{1}_E\, d(\mu \times \nu)$ — exactly the definition of $\mu \times \nu$. So the identity holds for indicators.

*Simple functions.* For a non-negative simple $s = \sum_{i=1}^{m} c_i \mathbf{1}_{E_i}$, both the iterated integral and the product integral are linear in the non-negative pieces (linearity over finite sums holds for the integral of non-negative functions), so summing the indicator case with coefficients $c_i$ gives the identity for $s$, and the inner integral $\int_Y s(x, y)\, d\nu(y) = \sum_i c_i \nu((E_i)_x)$ is measurable in $x$.

*General non-negative $f$.* By the **simple approximation lemma** choose simple $0 \le s_1 \le s_2 \le \cdots$ with $s_n \uparrow f$ pointwise on $X \times Y$. For each fixed $x$, $s_n(x, \cdot) \uparrow f(x, \cdot)$, so by the **Monotone Convergence Theorem** (in $y$), $\int_Y s_n(x, y)\, d\nu(y) \uparrow \int_Y f(x, y)\, d\nu(y)$; in particular $x \mapsto \int_Y f(x, y)\, d\nu(y)$ is an increasing limit of measurable functions, hence measurable. Applying the Monotone Convergence Theorem again, now in $x$, and once more on the product space,
$$\iint f = \int_X \lim_n \!\int_Y s_n\, d\nu\, d\mu = \lim_n \iint s_n = \lim_n \int_{X \times Y} s_n\, d(\mu \times \nu) = \int_{X \times Y} f\, d(\mu \times \nu),$$
the middle equality by the simple-function case. This is the claim. $\square$`,
  },
  {
    id: 'fubinis-theorem',
    label: "Fubini's Theorem",
    title: "Fubini's Theorem",
    kind: 'theorem',
    tags: ['Measure Theory'],
    dependencies: ['tonellis-theorem', 'lebesgue-integral'],
    description: String.raw`For a function *integrable* on a product of σ-finite spaces, the double integral equals both iterated integrals — so the order of integration may be swapped. Fubini is the signed companion to Tonelli: one first applies Tonelli to $|f|$ to confirm finiteness and the a.e. finiteness of the inner integrals, then splits $f$ into its positive and negative parts, to each of which Tonelli applies. Integrability is essential; without it the iterated integrals can disagree.`,
    statement: String.raw`Let $(X, \Sigma, \mu)$ and $(Y, \mathcal{T}, \nu)$ be σ-finite and let $f : X \times Y \to [-\infty, \infty]$ be $\mu \times \nu$-integrable, i.e. $\int_{X \times Y} |f|\, d(\mu \times \nu) < \infty$. Then for $\mu$-a.e. $x$ the section $f(x, \cdot)$ is $\nu$-integrable, the a.e.-defined function $x \mapsto \int_Y f(x, y)\, d\nu(y)$ is $\mu$-integrable, and
$$\int_{X \times Y} f \, d(\mu \times \nu) = \int_X \Bigl( \int_Y f(x, y)\, d\nu(y) \Bigr) d\mu(x) = \int_Y \Bigl( \int_X f(x, y)\, d\mu(x) \Bigr) d\nu(y).$$`,
    proof: String.raw`Apply **Tonelli's theorem** to the non-negative measurable function $|f|$:
$$\int_X \Bigl( \int_Y |f(x, y)|\, d\nu(y) \Bigr) d\mu(x) = \int_{X \times Y} |f|\, d(\mu \times \nu) < \infty.$$
A non-negative measurable function with finite integral is finite **almost everywhere**, so the inner integral $\varphi(x) := \int_Y |f(x, y)|\, d\nu(y)$ is finite for $\mu$-a.e. $x$; for each such $x$ the section $f(x, \cdot)$ is $\nu$-integrable.

Decompose $f = f^{+} - f^{-}$ into its non-negative and non-positive parts, each $\le |f|$, hence each $\mu \times \nu$-integrable. By **Tonelli** applied separately to $f^{+}$ and $f^{-}$, the functions $\varphi^{\pm}(x) = \int_Y f^{\pm}(x, y)\, d\nu(y)$ are measurable with $\int_X \varphi^{\pm}\, d\mu = \int_{X \times Y} f^{\pm}\, d(\mu \times \nu) < \infty$, so $\varphi^{\pm}$ are $\mu$-integrable and finite a.e. Where both are finite (a.e. $x$),
$$\int_Y f(x, y)\, d\nu(y) = \varphi^{+}(x) - \varphi^{-}(x)$$
by linearity of the integral on the integrable section $f(x, \cdot)$, and the right-hand side is $\mu$-integrable. Integrating in $x$ and using linearity,
$$\int_X \!\Bigl( \int_Y f\, d\nu \Bigr) d\mu = \int_X \varphi^{+}\, d\mu - \int_X \varphi^{-}\, d\mu = \int_{X \times Y} f^{+}\, d(\mu \times \nu) - \int_{X \times Y} f^{-}\, d(\mu \times \nu) = \int_{X \times Y} f\, d(\mu \times \nu).$$
The identity with the order of integration reversed follows by the same argument with the roles of $X$ and $Y$ exchanged. $\square$`,
  },
]

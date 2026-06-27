import type { MathNode } from '../types'

export const DESCRIPTIVE_SET_THEORY_NODES: MathNode[] = [
  // ── The standard spaces ────────────────────────────────────────────────────
  {
    id: 'polish-space',
    label: 'Polish Space',
    title: 'Polish Space',
    kind: 'definition',
    tags: ['Descriptive Set Theory'],
    dependencies: ['complete-metric-space', 'topological-space', 'homeomorphism', 'countable-uncountable'],
    description: String.raw`Descriptive set theory studies the "definable" subsets of well-behaved spaces, and the right ambient spaces are the **Polish** ones: those that are separable and completely metrizable. This class is broad enough to contain everything analysis cares about — $\mathbb{R}^n$, separable Banach and Hilbert spaces, the Cantor and Baire spaces, $[0,1]^{\mathbb{N}}$, and any locally compact second-countable group — yet rigid enough that a powerful structure theory applies uniformly. The key tension is that a Polish space is defined by a *topology*: completeness is required only of *some* compatible metric, since completeness is not a topological invariant ($(0,1)$ is homeomorphic to $\mathbb{R}$, yet incomplete in its usual metric).`,
    definition: String.raw`A topological space $(X, \tau)$ is **Polish** if it is **separable** (it has a countable dense subset) and **completely metrizable**: there exists a metric $d$ inducing $\tau$ under which $(X, d)$ is a **complete metric space**. The defining data is the topology; a single space is Polish as soon as *one* compatible complete metric exists, even if other compatible metrics are incomplete. Being Polish is a topological property, preserved by **homeomorphism**.`,
  },
  {
    id: 'baire-space-dst',
    label: 'Baire Space 𝒩',
    title: 'Baire Space and Cantor Space',
    kind: 'definition',
    tags: ['Descriptive Set Theory'],
    dependencies: ['polish-space', 'metric-space', 'sequence', 'natural-numbers', 'complete-metric-space'],
    description: String.raw`Two combinatorial Polish spaces serve as the universal coordinate systems of the subject. **Baire space** $\mathcal{N} = \mathbb{N}^{\mathbb{N}}$ is the set of all infinite sequences of natural numbers, topologized so that two sequences are close when they agree on a long initial segment; it is homeomorphic to the irrationals, and every Polish space is a continuous image of it. **Cantor space** $\mathcal{C} = 2^{\mathbb{N}}$ is the analogous space of infinite binary sequences, homeomorphic to the classical middle-thirds Cantor set and compact. Their points are sequences and their basic open sets are determined by finite strings, which is exactly what lets one run inductive, tree-based arguments — the reason the whole theory is most cleanly developed on $\mathcal{N}$ first and transported elsewhere.`,
    definition: String.raw`**Baire space** is $\mathcal{N} = \mathbb{N}^{\mathbb{N}}$, the set of all functions $x : \mathbb{N} \to \mathbb{N}$, with the product topology — equivalently the topology of the complete metric $d(x, y) = 2^{-n}$ where $n$ is least with $x(n) \neq y(n)$ (and $d(x,x) = 0$). For a finite string $s \in \mathbb{N}^{<\mathbb{N}}$ of length $|s|$, the **basic clopen set** $N_s = \{\, x \in \mathcal{N} : x{\restriction}|s| = s \,\}$ of all extensions of $s$ forms a base. **Cantor space** is the subspace $\mathcal{C} = 2^{\mathbb{N}} = \{0,1\}^{\mathbb{N}}$ with the same metric. Both are **Polish**; $\mathcal{C}$ is moreover compact (it is closed and totally bounded), while $\mathcal{N}$ is not locally compact.`,
    proof: String.raw`*Completeness and separability.* The metric $d$ is an ultrametric: if $x{\restriction}n = y{\restriction}n$ and $y{\restriction}n = z{\restriction}n$ then $x{\restriction}n = z{\restriction}n$, giving $d(x,z) \le \max(d(x,y), d(y,z))$. A Cauchy sequence $(x_k)$ therefore stabilizes on each coordinate — for fixed $n$, eventually $d(x_k, x_\ell) < 2^{-n}$ forces $x_k{\restriction}(n{+}1)$ constant — so the coordinatewise limit $x$ exists and $x_k \to x$, making $\mathcal{N}$ a **complete metric space**. The eventually-zero sequences are countable and dense (every $N_s$ contains the sequence $s$ followed by zeros), so $\mathcal{N}$ is **separable**, hence **Polish**; the same argument applies to $\mathcal{C}$. *Compactness of $\mathcal{C}$.* Each coordinate ranges over the finite set $\{0,1\}$, and $\mathcal{C} = \{0,1\}^{\mathbb{N}}$ is a product of compact spaces, hence compact (a diagonal/König argument: any sequence in $\mathcal{C}$ has a subsequence constant on coordinate $0$, a further one constant on coordinate $1$, and so on; the diagonal subsequence converges). $\square$`,
  },

  // ── The Borel hierarchy ─────────────────────────────────────────────────────
  {
    id: 'borel-hierarchy',
    label: 'Borel Hierarchy',
    title: 'Borel Hierarchy ($\\mathbf{\\Sigma}^0_\\xi$, $\\mathbf{\\Pi}^0_\\xi$)',
    kind: 'definition',
    tags: ['Descriptive Set Theory'],
    dependencies: ['polish-space', 'open-closed-sets', 'ordinal', 'limit-ordinal', 'transfinite-recursion', 'countable-uncountable'],
    description: String.raw`The Borel sets of a Polish space are not built in one step but stratified into a transfinite tower according to how many alternations of *countable union* and *complementation* are needed to produce them. At the bottom sit the open sets and their complements the closed sets. Taking countable unions of closed sets gives the $F_\sigma$ sets, countable intersections of open sets the $G_\delta$ sets, and so on, alternating up through the countable ordinals. Each rung $\mathbf{\Sigma}^0_\xi$ collects the "$\xi$-th level unions" and its dual $\mathbf{\Pi}^0_\xi$ their complements. The classical Lebesgue–Hausdorff hierarchy makes precise the intuition that some Borel sets are genuinely more complicated than others, and the levels are all distinct in an uncountable Polish space.`,
    definition: String.raw`Let $X$ be a **Polish space**. Define classes of subsets by **transfinite recursion** on countable ordinals $1 \le \xi < \omega_1$. The base level is $\mathbf{\Sigma}^0_1(X) = \{\, U \subseteq X : U \text{ open} \,\}$. For $\xi > 1$,
$$\mathbf{\Sigma}^0_\xi(X) = \Bigl\{\, \textstyle\bigcup_{n \in \mathbb{N}} A_n \;:\; \text{each } A_n \in \mathbf{\Pi}^0_{\xi_n}(X) \text{ for some } \xi_n < \xi \,\Bigr\},$$
and $\mathbf{\Pi}^0_\xi(X) = \{\, X \setminus A : A \in \mathbf{\Sigma}^0_\xi(X) \,\}$ is the class of complements; the **ambiguous class** is $\mathbf{\Delta}^0_\xi = \mathbf{\Sigma}^0_\xi \cap \mathbf{\Pi}^0_\xi$. Thus $\mathbf{\Pi}^0_1$ is the closed sets, $\mathbf{\Sigma}^0_2 = F_\sigma$, $\mathbf{\Pi}^0_2 = G_\delta$. The classes are increasing: $\mathbf{\Sigma}^0_\xi \cup \mathbf{\Pi}^0_\xi \subseteq \mathbf{\Delta}^0_{\xi+1}$, and each $\mathbf{\Sigma}^0_\xi$ is closed under countable unions, each $\mathbf{\Pi}^0_\xi$ under countable intersections. (The boldface marks the use of arbitrary subsets as "parameters", distinguishing these from the lightface effective classes.)`,
  },
  {
    id: 'borel-sets-dst',
    label: 'Borel Sets',
    title: 'Borel Sets and the Length of the Hierarchy',
    kind: 'proposition',
    tags: ['Descriptive Set Theory'],
    dependencies: ['borel-hierarchy', 'borel-sigma-algebra', 'sigma-algebra', 'ordinal', 'limit-ordinal', 'countable-uncountable', 'cardinality', 'transfinite-induction', 'cofinality'],
    description: String.raw`The Borel hierarchy exhausts the Borel $\sigma$-algebra and no sooner: a set is Borel exactly when it appears at some countable level, and one cannot stop before $\omega_1$. The lower bound — that new sets keep appearing through all countable ordinals in an uncountable Polish space — is the content of the hierarchy theorem; the upper bound is the clean fact below, that the union over all countable levels is already a $\sigma$-algebra and hence equals $\mathcal{B}(X)$. The proof of closure under countable unions hinges on the regularity of $\omega_1$: countably many countable ordinals stay bounded below $\omega_1$.`,
    statement: String.raw`Let $X$ be a **Polish space** and $\mathcal{B}(X)$ its Borel $\sigma$-algebra (the smallest $\sigma$-algebra containing the open sets). Then
$$\mathcal{B}(X) = \bigcup_{1 \le \xi < \omega_1} \mathbf{\Sigma}^0_\xi(X) = \bigcup_{1 \le \xi < \omega_1} \mathbf{\Pi}^0_\xi(X).$$`,
    proof: String.raw`Write $\mathcal{H} = \bigcup_{\xi < \omega_1} \mathbf{\Sigma}^0_\xi(X)$. Since each $\mathbf{\Pi}^0_\xi \subseteq \mathbf{\Sigma}^0_{\xi+1}$ (a $\mathbf{\Pi}^0_\xi$ set is a one-term countable union of $\mathbf{\Pi}^0_\xi$ sets, so lies in $\mathbf{\Sigma}^0_{\xi+1}$), the union of the $\mathbf{\Pi}^0_\xi$ equals $\mathcal{H}$ as well.

**$\mathcal{H} \subseteq \mathcal{B}(X)$.** By **transfinite induction** on $\xi$: open sets are Borel; if every set of level $< \xi$ is Borel, then any $A \in \mathbf{\Sigma}^0_\xi$ is a countable union of complements of such sets, hence Borel, because $\mathcal{B}(X)$ is a **$\sigma$-algebra** closed under complement and countable union.

**$\mathcal{H}$ is a $\sigma$-algebra containing the open sets, so $\mathcal{B}(X) \subseteq \mathcal{H}$.** It contains $X$ and the open sets ($\mathbf{\Sigma}^0_1$) and is closed under complements (the union of the $\mathbf{\Sigma}^0_\xi$ and of the $\mathbf{\Pi}^0_\xi$ coincide). For countable unions: given $A_n \in \mathcal{H}$, pick $\xi_n < \omega_1$ with $A_n \in \mathbf{\Pi}^0_{\xi_n}$ (raising the level if necessary). The supremum $\xi = \sup_n (\xi_n + 1)$ is a countable supremum of countable ordinals; since $\omega_1$ is regular — a countable union of countable sets is countable, so such a supremum cannot reach $\omega_1$ — we have $\xi < \omega_1$. Then each $A_n \in \mathbf{\Pi}^0_{\eta_n}$ with $\eta_n < \xi$, so by definition $\bigcup_n A_n \in \mathbf{\Sigma}^0_\xi \subseteq \mathcal{H}$. Being the smallest such $\sigma$-algebra, $\mathcal{B}(X) \subseteq \mathcal{H}$, and the two inclusions give equality. $\square$`,
  },

  // ── Perfect sets and Cantor–Bendixson ───────────────────────────────────────
  {
    id: 'perfect-set-dst',
    label: 'Perfect Set',
    title: 'Perfect Sets and the Perfect Set Property',
    kind: 'definition',
    tags: ['Descriptive Set Theory'],
    dependencies: ['polish-space', 'open-closed-sets', 'closure-characterization', 'countable-uncountable', 'cardinality'],
    description: String.raw`A set is **perfect** when it is closed and has no isolated points — every one of its points is a limit of others within it. The Cantor set is the prototype. Perfect non-empty subsets of a Polish space are always large: they contain a homeomorphic copy of Cantor space and so have the cardinality of the continuum. The **perfect set property** packages this into a sharp dichotomy for a class of sets: each set in the class is either countable or contains a perfect set (hence is of size continuum), with nothing in between. A class enjoying this property therefore contains no counterexample to the Continuum Hypothesis — a recurring theme of the subject.`,
    definition: String.raw`Let $X$ be a **Polish space**. A set $P \subseteq X$ is **perfect** if it is closed and has no **isolated points**: for every $x \in P$ and every open $U \ni x$ there is $y \in P \cap U$ with $y \neq x$ (equivalently, $P$ equals its own set of limit points). A set $A \subseteq X$ has the **perfect set property** (PSP) if $A$ is either **countable** or contains a non-empty perfect subset. Since a non-empty perfect subset of a Polish space contains a copy of Cantor space and so has cardinality $2^{\aleph_0}$, PSP makes every such set either countable or of size continuum.`,
  },
  {
    id: 'perfect-set-continuum',
    label: 'Perfect ⇒ Continuum',
    title: 'Non-empty Perfect Sets Have Size Continuum',
    kind: 'theorem',
    tags: ['Descriptive Set Theory'],
    dependencies: ['perfect-set-dst', 'baire-space-dst', 'complete-metric-space', 'homeomorphism', 'cantors-theorem', 'cardinality', 'compact-hausdorff-bijection-homeo'],
    description: String.raw`The reason perfect sets count as "large" is that they embed Cantor space. Inside any non-empty perfect set one can grow a binary branching tree of shrinking closed balls: at each node the no-isolated-points condition supplies two distinct points to split toward, and disjointness of the two children is arranged by taking small enough radii. Reading off the branches via the completeness of the metric yields a continuous injection of $2^{\mathbb{N}}$, so the perfect set has at least — and, being a subset of a separable space, exactly — the cardinality of the continuum.`,
    statement: String.raw`Let $X$ be a **Polish space** with a complete compatible metric $d$, and let $P \subseteq X$ be a non-empty **perfect** set. Then there is a topological embedding of Cantor space $2^{\mathbb{N}}$ into $P$; consequently $|P| = 2^{\aleph_0}$.`,
    proof: String.raw`We build a **Cantor scheme**: to each finite binary string $s \in 2^{<\mathbb{N}}$ assign a non-empty open set $U_s$ with $\overline{U_s} \cap P \neq \varnothing$, such that $\overline{U_{s0}}, \overline{U_{s1}} \subseteq U_s$ are disjoint and $\operatorname{diam}(U_s) \le 2^{-|s|}$.

*Construction.* Start with any point $p \in P$ and a ball $U_{\varnothing} = B(p, 1)$. Given $U_s$ with a point $x \in U_s \cap P$, perfectness gives a second point $y \in U_s \cap P$ with $y \neq x$ (every neighbourhood of $x$ meets $P$ in another point). Choose disjoint open balls around $x$ and $y$, of radius small enough to have closures inside $U_s$ and diameters $\le 2^{-(|s|+1)}$; call them $U_{s0}$ and $U_{s1}$. Each still meets $P$, so the recursion continues.

*Embedding.* For $\alpha \in 2^{\mathbb{N}}$ the closed sets $\overline{U_{\alpha{\restriction}n}}$ are nested with diameters $\to 0$ and each meets the closed set $P$; by **completeness** of $d$ (a nested sequence of non-empty closed sets with vanishing diameter has a single common point) their intersection is a single point $f(\alpha) \in P$. Distinct $\alpha \neq \beta$ split at some $n$, landing in the disjoint sets $U_{\alpha{\restriction}(n+1)}, U_{\beta{\restriction}(n+1)}$, so $f$ is injective; and $f$ is continuous since $\alpha{\restriction}n = \beta{\restriction}n$ forces $f(\alpha), f(\beta) \in U_{\alpha{\restriction}n}$ of diameter $\le 2^{-n}$. A continuous injection from compact $2^{\mathbb{N}}$ to a metric space is a **homeomorphism** onto its image. Hence $2^{\mathbb{N}}$ embeds in $P$, so $|P| \ge |2^{\mathbb{N}}| = 2^{\aleph_0}$ by **Cantor's theorem** ($|2^{\mathbb{N}}| = |\mathcal{P}(\mathbb{N})|$); and $|P| \le |X| \le 2^{\aleph_0}$ since a separable metric space injects into $2^{\mathbb{N}}$ via its open base. Thus $|P| = 2^{\aleph_0}$. $\square$`,
  },
  {
    id: 'cantor-bendixson-theorem',
    label: 'Cantor–Bendixson',
    title: 'Cantor–Bendixson Theorem',
    kind: 'theorem',
    tags: ['Descriptive Set Theory'],
    dependencies: ['polish-space', 'perfect-set-dst', 'perfect-set-continuum', 'open-closed-sets', 'closure-characterization', 'countable-uncountable', 'ordinal', 'transfinite-recursion'],
    description: String.raw`Every closed subset of a Polish space splits canonically into a perfect "core" and a countable "scattered" remainder. Iterating the removal of isolated points — once, then again on what remains, transfinitely — strips away a countable scatter and leaves a perfect (possibly empty) kernel. The process must halt at some countable ordinal, the **Cantor–Bendixson rank**, because a separable space has only countably many "stages" available. The immediate payoff is that closed (indeed Polish) subspaces enjoy the perfect set property, so an uncountable closed set is never a counterexample to the Continuum Hypothesis.`,
    statement: String.raw`Let $X$ be a **Polish space** and $C \subseteq X$ closed. Then $C = P \sqcup S$ uniquely, where $P$ is **perfect** (possibly empty) and $S$ is **countable** and open in $C$. Consequently every closed subset of a Polish space has the **perfect set property**: it is countable, or it contains a non-empty perfect set and so has cardinality $2^{\aleph_0}$.`,
    proof: String.raw`Call $x$ a **condensation point** of $C$ if every open neighbourhood of $x$ meets $C$ in *uncountably* many points. Let $P$ be the set of condensation points lying in $C$, and $S = C \setminus P$.

*$S$ is countable.* $X$ is second countable; fix a countable base $\{V_n\}$. If $x \in S$, some neighbourhood of $x$ meets $C$ countably, so some basic $V_{n(x)} \ni x$ has $V_{n(x)} \cap C$ countable. Then $S \subseteq \bigcup \{\, V_n \cap C : V_n \cap C \text{ countable} \,\}$, a countable union of **countable** sets, hence countable. (This also shows $S$ is open in $C$.)

*$P$ is perfect.* $P$ is closed: if $x \notin P$ then by definition some neighbourhood $U$ meets $C$ countably, and every point of $U$ inherits this, so $U \cap P = \varnothing$ and the complement of $P$ is open. $P$ has no isolated points: let $x \in P$ and let $U$ be open with $x \in U$. Then $U \cap C$ is uncountable, while by the previous paragraph $U \cap S$ is countable, so $U \cap P$ is uncountable, in particular contains a point of $P$ other than $x$. By the **closure characterization** these conditions say $P$ is perfect.

*A lemma.* In a second-countable space, every non-empty relatively open subset $W$ of a non-empty perfect set $Q$ is uncountable. Indeed pick $x \in W$ and an open $U$ of $X$ with $x \in U$ and $U \cap Q \subseteq W$; shrinking, take an open $V \ni x$ with $\overline{V} \subseteq U$, so $\overline{V} \cap Q$ is closed, non-empty, and has no isolated points (the no-isolated-points condition of $Q$ is inherited by the closed neighbourhood, since any point of $\overline{V}\cap Q$ has, in every smaller neighbourhood, another point of $Q$, which lies in $\overline{V}$ for neighbourhoods inside $V$). Thus $\overline{V} \cap Q$ is a non-empty perfect set, uncountable by **perfect-set-continuum**, and it is contained in $U \cap Q \subseteq W$, so $W$ is uncountable.

*Uniqueness.* Suppose $C = P' \sqcup S'$ with $P'$ perfect and $S'$ countable, open in $C$. First, every point of $P'$ is a condensation point of $C$: for $x \in P'$ and open $U \ni x$, the set $U \cap P'$ is a non-empty (it contains $x$) relatively open subset of the perfect set $P'$, hence uncountable by the lemma, so $U \cap C \supseteq U \cap P'$ is uncountable. Thus $P' \subseteq P$. Conversely $P \setminus P' = P \cap (C \setminus P') = P \cap S'$ is a *relatively open* subset of the perfect set $P$ (the trace on $P$ of the set $S'$, which is open in $C$); were it non-empty it would be uncountable by the lemma, but $P \setminus P' \subseteq S'$ is countable — a contradiction. Hence $P \setminus P' = \varnothing$, giving $P = P'$ and therefore $S = S'$.

*PSP.* If $C$ is uncountable then $S$, being countable, cannot exhaust it, so $P \neq \varnothing$; by the **perfect-set theorem** $|P| = 2^{\aleph_0}$. Otherwise $C$ is countable. Either way $C$ has the **perfect set property**. (Equivalently, the iterated **Cantor–Bendixson derivative** $C^{(\alpha)}$, removing isolated points and intersecting at limits, stabilizes at a countable ordinal $\alpha_0$ — the rank — with $C^{(\alpha_0)} = P$, by **transfinite recursion** and second countability.) $\square$`,
  },

  // ── Analytic and coanalytic sets ────────────────────────────────────────────
  {
    id: 'analytic-set',
    label: 'Analytic Set',
    title: 'Analytic Sets ($\\mathbf{\\Sigma}^1_1$)',
    kind: 'definition',
    tags: ['Descriptive Set Theory'],
    dependencies: ['polish-space', 'baire-space-dst', 'borel-hierarchy', 'borel-sets-dst', 'continuous-map', 'open-closed-sets', 'cartesian-product'],
    description: String.raw`Projecting a two-dimensional Borel set onto one axis can destroy Borelness — Suslin's discovery, correcting an error of Lebesgue — and the sets so obtained are the **analytic** sets. Equivalently they are the continuous images of Polish spaces, or of Baire space, or the projections of closed subsets of $X \times \mathcal{N}$. They form the first level $\mathbf{\Sigma}^1_1$ of the projective hierarchy and strictly extend the Borel sets, while retaining excellent regularity (measurability, the Baire property, the perfect set property). The existential quantifier "there exists a witnessing branch" is the logical signature of analyticity.`,
    definition: String.raw`Let $X$ be a **Polish space**. A set $A \subseteq X$ is **analytic** ($\mathbf{\Sigma}^1_1$) if it is the continuous image of a Polish space: $A = f(Z)$ for some Polish $Z$ and **continuous** $f : Z \to X$ — with the convention $\varnothing$ is analytic. The following are equivalent for non-empty $A$ and capture the same class: (i) $A = f(\mathcal{N})$ for a continuous $f$ on **Baire space** $\mathcal{N}$; (ii) $A$ is the **projection** $\{\, x : \exists y\,(x,y) \in F \,\}$ of a closed set $F \subseteq X \times \mathcal{N}$; (iii) $A$ is the projection of a **Borel** set $B \subseteq X \times \mathcal{N}$. Every Borel set is analytic.`,
    proof: String.raw`*Borel $\Rightarrow$ analytic, and equivalence of the descriptions.* Each Borel set $B$ in a Polish space is the continuous injective image of a *closed* subset $F \subseteq \mathcal{N}$ (the standard Lusin–Souslin representation, unfolded from the **Borel hierarchy** by a Lusin scheme; the closed set $F$ may be countable or finite, which is what accommodates countable Borel sets and $\varnothing$). A closed subset of $\mathcal{N}$ is itself Polish, so $B$ is a continuous image of a Polish space, hence analytic — giving the last sentence. For the equivalences, (ii)$\Rightarrow$(i): a closed $F \subseteq X \times \mathcal{N}$ is itself Polish, and projection to $X$ is continuous, so its image is a continuous image of a Polish space; composing with a continuous surjection $\mathcal{N} \twoheadrightarrow F$ (every non-empty Polish space is such an image of $\mathcal{N}$) yields (i). (i)$\Rightarrow$(ii): given continuous $f : \mathcal{N} \to X$ with image $A$, the graph $\{\,(f(y), y) : y \in \mathcal{N}\,\}$ is closed in $X \times \mathcal{N}$ (it is the preimage of the closed diagonal under the continuous $(x,y)\mapsto (x, f(y))$) and projects onto $A$. (iii) sits between (ii) and (i) since closed $\subseteq$ Borel and Borel sets are projections of closed sets one dimension up. $\square$`,
  },
  {
    id: 'coanalytic-set',
    label: 'Coanalytic Set',
    title: 'Coanalytic Sets ($\\mathbf{\\Pi}^1_1$) and Suslin’s Theorem',
    kind: 'theorem',
    tags: ['Descriptive Set Theory'],
    dependencies: ['analytic-set', 'luzin-separation-theorem', 'borel-sets-dst', 'polish-space', 'open-closed-sets'],
    description: String.raw`The complements of analytic sets are the **coanalytic** sets $\mathbf{\Pi}^1_1$, the dual first level of the projective hierarchy; their logical signature is the universal "for all branches." Analytic and coanalytic genuinely differ — there are analytic sets that are not Borel, hence not coanalytic — but the two classes meet exactly in the Borel sets. This is **Suslin's theorem**: a set is Borel iff it is both analytic and coanalytic, the definability analogue of "$\Delta^1_1$ = recursive on the boldface level." It is an immediate consequence of the Luzin separation theorem.`,
    statement: String.raw`Let $X$ be a **Polish space**. A set $A \subseteq X$ is **coanalytic** ($\mathbf{\Pi}^1_1$) if its complement $X \setminus A$ is **analytic**. Then (**Suslin's theorem**)
$$A \in \mathcal{B}(X) \quad\Longleftrightarrow\quad A \text{ is both analytic and coanalytic}, \qquad\text{i.e.}\qquad \mathbf{\Delta}^1_1 = \mathcal{B}(X).$$`,
    proof: String.raw`($\Rightarrow$) Every **Borel** set is analytic (by **analytic-set**), and the Borel sets are closed under complement, so $A$ and $X \setminus A$ are both analytic; hence $A$ is both analytic and coanalytic.

($\Leftarrow$) Suppose $A$ and $X \setminus A$ are both analytic. They are disjoint analytic sets (indeed complementary). By the **Luzin separation theorem**, two disjoint analytic sets can be separated by a Borel set: there is a Borel $B$ with $A \subseteq B$ and $B \cap (X \setminus A) = \varnothing$. The latter means $B \subseteq A$, so $B = A$. Therefore $A$ is **Borel**. Combining the two directions gives $\mathbf{\Delta}^1_1 = \mathbf{\Sigma}^1_1 \cap \mathbf{\Pi}^1_1 = \mathcal{B}(X)$. $\square$`,
  },
  {
    id: 'luzin-separation-theorem',
    label: 'Luzin Separation',
    title: 'Luzin Separation Theorem',
    kind: 'theorem',
    tags: ['Descriptive Set Theory'],
    dependencies: ['analytic-set', 'baire-space-dst', 'borel-sets-dst', 'borel-hierarchy', 'polish-space', 'open-closed-sets'],
    description: String.raw`Two disjoint analytic sets can always be slipped apart by a Borel set: there is a Borel set containing one and missing the other. This is the central regularity theorem about analytic sets and the engine behind Suslin's theorem. The proof rests on a "separation propagates up trees" principle: if no Borel set separates $A$ from $B$, then writing $A$ and $B$ as countable unions of their pieces along the defining trees, some pair of pieces is again inseparable, and following such a chain through the well-founded tree produces two points, one in $A$ and one in $B$, that cannot be told apart — contradicting disjointness.`,
    statement: String.raw`Let $X$ be a **Polish space** and $A, B \subseteq X$ disjoint **analytic** sets. Then there is a **Borel** set $C$ with $A \subseteq C$ and $C \cap B = \varnothing$ (one says $A$ and $B$ are **Borel-separable**).`,
    proof: String.raw`Call disjoint sets $P, Q$ **Borel-separable** if some Borel set contains $P$ and misses $Q$. The key reduction lemma is purely set-theoretic: if $P = \bigcup_m P_m$ and $Q = \bigcup_n Q_n$ and $P_m, Q_n$ are Borel-separable for *every* pair $(m,n)$, then $P, Q$ are Borel-separable — for if $C_{m,n}$ separates $P_m$ from $Q_n$, then $C = \bigcup_m \bigcap_n C_{m,n}$ is Borel, contains every $P_m$ hence $P$, and is disjoint from every $Q_n$ hence from $Q$ (each $x \in Q_n$ lies outside $C_{m,n}$ for all $m$, so outside $C$).

Now write the non-empty analytic sets as $A = f(\mathcal{N})$, $B = g(\mathcal{N})$ for continuous $f, g$ on **Baire space** (description (i) of **analytic-set**). For finite strings $s, t \in \mathbb{N}^{<\mathbb{N}}$ put $A_s = f(N_s)$ and $B_t = g(N_t)$, the images of the basic clopen sets $N_s, N_t$; then $A_s = \bigcup_k A_{s^\frown k}$ and $B_t = \bigcup_k B_{t^\frown k}$. Suppose for contradiction $A = A_\varnothing$ and $B = B_\varnothing$ were **not** Borel-separable. By the contrapositive of the lemma, some pair $(A_{s_1}, B_{t_1})$ with $|s_1| = |t_1| = 1$ is inseparable; iterating, we build $\alpha, \beta \in \mathcal{N}$ with $(A_{\alpha{\restriction}n}, B_{\beta{\restriction}n})$ inseparable for all $n$. Let $x = f(\alpha)$, $y = g(\beta)$. Since $A, B$ are disjoint, $x \neq y$; choose disjoint open $U \ni x$, $V \ni y$. By continuity of $f, g$, for large $n$ we have $A_{\alpha{\restriction}n} = f(N_{\alpha{\restriction}n}) \subseteq U$ and $B_{\beta{\restriction}n} \subseteq V$ — but then the **open** (hence **Borel**) set $U$ separates $A_{\alpha{\restriction}n}$ from $B_{\beta{\restriction}n}$, contradicting inseparability. Hence $A$ and $B$ are Borel-separable. $\square$`,
  },

  // ── The projective hierarchy ─────────────────────────────────────────────────
  {
    id: 'projective-hierarchy',
    label: 'Projective Hierarchy',
    title: 'Projective Hierarchy ($\\mathbf{\\Sigma}^1_n$, $\\mathbf{\\Pi}^1_n$)',
    kind: 'definition',
    tags: ['Descriptive Set Theory'],
    dependencies: ['analytic-set', 'coanalytic-set', 'baire-space-dst', 'continuous-map', 'open-closed-sets', 'cartesian-product'],
    description: String.raw`Above the Borel sets lies a second tower, built not by countable operations but by alternating **projection** (an existential real quantifier) with **complementation** (negation). Analytic sets $\mathbf{\Sigma}^1_1$ are the projections of Borel sets; their complements are coanalytic $\mathbf{\Pi}^1_1$; projecting a coanalytic set gives $\mathbf{\Sigma}^1_2$, and so on. The union of all these classes is the **projective** sets, the sets definable from Borel sets by finitely many real quantifiers. Unlike the Borel hierarchy, whose regularity is provable in $\mathsf{ZFC}$, the structure of the projective hierarchy from $\mathbf{\Sigma}^1_2$ upward is deeply entangled with large cardinals and the axiom of determinacy: whether all projective sets are Lebesgue measurable, say, is independent of $\mathsf{ZFC}$.`,
    definition: String.raw`Let $X$ be a **Polish space**. Define classes by recursion on $n \ge 1$. The base is $\mathbf{\Sigma}^1_1(X)$, the **analytic** sets. For $n \ge 1$,
$$\mathbf{\Pi}^1_n(X) = \{\, X \setminus A : A \in \mathbf{\Sigma}^1_n(X) \,\}, \qquad \mathbf{\Sigma}^1_{n+1}(X) = \bigl\{\, \{\, x : \exists y\in\mathcal{N}\,(x,y) \in P \,\} \;:\; P \in \mathbf{\Pi}^1_n(X \times \mathcal{N}) \,\bigr\},$$
so $\mathbf{\Sigma}^1_{n+1}$ is the projections (along **Baire space**) of $\mathbf{\Pi}^1_n$ sets, and $\mathbf{\Delta}^1_n = \mathbf{\Sigma}^1_n \cap \mathbf{\Pi}^1_n$. The **projective sets** are $\bigcup_n (\mathbf{\Sigma}^1_n \cup \mathbf{\Pi}^1_n)$. Each $\mathbf{\Sigma}^1_n \cup \mathbf{\Pi}^1_n \subseteq \mathbf{\Delta}^1_{n+1}$, and by **Suslin's theorem** $\mathbf{\Delta}^1_1 = \mathcal{B}(X)$, placing the Borel sets at the bottom.`,
  },

  // ── Determinacy ─────────────────────────────────────────────────────────────
  {
    id: 'determinacy-game',
    label: 'Determinacy',
    title: 'Infinite Games and Determinacy',
    kind: 'definition',
    tags: ['Descriptive Set Theory'],
    dependencies: ['baire-space-dst', 'open-closed-sets', 'function'],
    description: String.raw`To each set of infinite sequences one attaches a two-player game: the players alternately choose natural numbers, building a run $x \in \mathcal{N}$ forever; player I wins if the run lands in the target set $A$, player II if not. A **strategy** is a rule prescribing a player's moves from the position so far, and it is **winning** if it forces a win no matter what the opponent does. The set $A$ is **determined** when one of the two players has a winning strategy. Determinacy is a remarkably strong regularity hypothesis: from the determinacy of a class of sets one extracts the perfect set property, Lebesgue measurability, and the Baire property for that class. Which sets are determined is the central question, linking definability to large cardinals.`,
    definition: String.raw`For $A \subseteq \mathcal{N}$ the **Gale–Stewart game** $G(A)$ is played by two players alternating natural-number moves $a_0, a_1, a_2, \dots$ (player I the even-indexed, II the odd-indexed), producing a **run** $x = (a_0, a_1, \dots) \in$ **Baire space**; player I **wins** iff $x \in A$. A **strategy** for I is a **function** $\sigma : \bigcup_n \mathbb{N}^{2n} \to \mathbb{N}$ giving I's next move from the current position (similarly for II on odd-length positions); it is **winning** if every run consistent with it lies in I's winning set. The game $G(A)$, and the set $A$, are **determined** if one of the two players has a winning strategy. A class $\Gamma$ of sets satisfies **determinacy** ($\mathsf{Det}(\Gamma)$) if every $A \in \Gamma$ is determined.`,
  },
  {
    id: 'borel-determinacy',
    label: 'Borel Determinacy',
    title: "Borel Determinacy (Martin's Theorem)",
    kind: 'theorem',
    tags: ['Descriptive Set Theory'],
    dependencies: ['determinacy-game', 'borel-sets-dst', 'borel-hierarchy', 'baire-space-dst', 'ordinal', 'transfinite-induction'],
    description: String.raw`Martin's theorem is the high-water mark of what $\mathsf{ZFC}$ alone can prove about determinacy: **every Borel game is determined**. The result is sharp on two fronts. First, open and closed games are determined by an elementary argument (the Gale–Stewart theorem), but extending this through the Borel hierarchy is genuinely hard. Second — and strikingly — Borel determinacy is *not* provable from the axioms of $\mathsf{ZFC}$ without the full power set axiom: Friedman showed it requires the existence of all the iterated power sets $\beth_{\omega_1}$, so it is the rare classical theorem whose proof provably consumes uncountably many cardinals. Martin's proof unravels a Borel game into an auxiliary open game on a tree of "coverings," whose determinacy lifts back down.`,
    statement: String.raw`Every **Borel** subset $A \subseteq \mathcal{N}$ of **Baire space** is **determined**: in the game $G(A)$, one of the two players has a winning strategy. More generally Borel games on any tree are determined.`,
    proof: String.raw`*Clearly-marked sketch.* The base case is the **Gale–Stewart theorem**, proved here in full for *closed* (and dually open) $A$. Suppose II has no winning strategy in $G(A)$ with $A$ closed. Call a position $p$ (a finite run) **non-losing for I** if II has no winning strategy in the game continued from $p$. The empty position is non-losing for I by assumption. At a non-losing position where I is to move, player I can move to keep it non-losing for I — else II would have a winning response to every move, and these responses assemble into a winning strategy for II from the current position, contradicting non-losing. Dually, at a non-losing position where II is to move, *every* move by II again yields a position non-losing for I: if some II-move led to a position from which II had a winning strategy, that move together with that strategy would be a winning strategy for II from the current position, again contradicting non-losing. Hence, with I always moving to a non-losing position, the entire resulting run $x$ has every initial segment a non-losing position. Now if $x \notin A$, then since $A$ is **closed** its complement is open, so some finite $x{\restriction}n$ has basic neighbourhood $N_{x{\restriction}n}$ disjoint from $A$; but then II has already won from $x{\restriction}n$ (any extension lands outside $A$), contradicting that $x{\restriction}n$ is non-losing for I. Therefore $x \in A$, so this is a winning strategy for I. Symmetric reasoning handles open $A$. This settles $\mathbf{\Sigma}^0_1$ and $\mathbf{\Pi}^0_1$.

*The transfinite ascent (external).* For higher Borel levels the argument proceeds by **transfinite induction** on the **Borel hierarchy** rank, but not by a direct strategy construction. Martin's device is **unraveling**: to a set $A$ at level $\xi$ one associates an auxiliary game on an enlarged tree, played with extra "covering" moves, whose payoff set is *closed* (hence determined by the base case) and which is equivalent to $G(A)$ via a continuous projection that transfers winning strategies back to the original game. The construction of these unravelings is iterated through the countable ordinals, and the proof that it can be carried out at every Borel level is exactly where iterated power sets up to $\beth_{\omega_1}$ are consumed (Friedman's theorem shows this consumption is unavoidable). The full development of the unraveling machinery is beyond this graph; we cite **Martin's Borel determinacy theorem** for the inductive step above the open/closed base case proved here. $\square$`,
  },
  {
    id: 'analytic-determinacy',
    label: 'Analytic Determinacy',
    title: 'Analytic Determinacy and Large Cardinals',
    kind: 'theorem',
    tags: ['Descriptive Set Theory'],
    dependencies: ['determinacy-game', 'analytic-set', 'coanalytic-set', 'borel-determinacy', 'baire-space-dst', 'measurable-cardinal'],
    description: String.raw`One level above Borel, determinacy escapes $\mathsf{ZFC}$ and becomes a large-cardinal statement. **Analytic determinacy** — every $\mathbf{\Sigma}^1_1$ game is determined — is equivalent, by theorems of Martin and Harrington, to a large-cardinal hypothesis just past $\mathsf{ZFC}$: the existence of $x^{\sharp}$ (sharps) for every real $x$, which follows from a measurable cardinal. Thus the bare assertion that all analytic games can be won by one side is not decided by the standard axioms; it requires, and is essentially equivalent to, transcending them. This is the threshold at which descriptive set theory and the large-cardinal hierarchy fuse: higher projective determinacy demands correspondingly larger cardinals (Woodin cardinals), per the Martin–Steel–Woodin theorems.`,
    statement: String.raw`**Analytic determinacy** — every **analytic** ($\mathbf{\Sigma}^1_1$) subset of **Baire space** is **determined** — is *not* a theorem of $\mathsf{ZFC}$. It holds if there is a measurable cardinal (Martin), and is in fact equivalent over $\mathsf{ZFC}$ to the existence of $x^{\sharp}$ for every real $x$ (Harrington–Martin). Determinacy of a class is moreover closed under complementation, so analytic and coanalytic determinacy coincide.`,
    proof: String.raw`*Clearly-marked sketch.* Determinacy depends only on the payoff set up to complementation: in $G(A)$ versus $G(\mathcal{N}\setminus A)$ the roles of the two players are interchanged, so $A$ is determined iff $\mathcal{N}\setminus A$ is; hence **analytic** determinacy and **coanalytic** determinacy are the same statement, justifying the last clause. That analytic determinacy exceeds **Borel determinacy** (which is a $\mathsf{ZFC}$ theorem) and exceeds $\mathsf{ZFC}$ itself is the content we cite externally.

The forward implication is **Martin's theorem**: from a measurable cardinal $\kappa$ one obtains a $\kappa$-complete ultrafilter, builds from it homogeneous trees representing $\mathbf{\Pi}^1_1$ sets, and uses the resulting well-founded "indiscernible" structure to define a winning strategy in any analytic game — the use of the measurable is essential and irreducible. The sharp calibration $\mathbf{\Sigma}^1_1\text{-}\mathsf{Det} \leftrightarrow$ "$x^{\sharp}$ exists for every real $x$" is the **Harrington–Martin theorem** (its lightface companion is $\Sigma^1_1\text{-}\mathsf{Det} \leftrightarrow$ "$0^{\sharp}$ exists"). Both inputs — the theory of the sharp $0^{\sharp}$, of measurable cardinals and their ultrafilters, and the construction of homogeneous trees — lie well beyond the present graph and are cited by name; no part of this argument is carried out from the graph's axioms, and the central claim (independence from $\mathsf{ZFC}$) is a metamathematical fact about $\mathsf{ZFC}$, not a derivation within it. $\square$`,
  },
]

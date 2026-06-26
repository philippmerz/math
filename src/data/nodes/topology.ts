import type { MathNode } from '../types'

export const TOPOLOGY_NODES: MathNode[] = [
  // ── Spaces ─────────────────────────────────────────────────────────────────
  {
    id: 'metric-space',
    label: 'Metric Space',
    title: 'Metric Space',
    kind: 'definition',
    tags: ['Topology'],
    dependencies: ['real-numbers', 'set'],
    description: String.raw`A **metric space** abstracts the distance $|x - y|$ on $\mathbb{R}$: a set together with a numerical distance between any two of its points that behaves the way physical distance should — it is never negative, vanishes exactly between a point and itself, does not depend on the order of the two points, and never takes a detour shorter than the direct route. This minimal data is already enough to define limits, continuity, Cauchy sequences, and completeness, making the metric space the basic arena of analysis.`,
    definition: String.raw`A **metric space** is a pair $(X, d)$ consisting of a set $X$ and a function $d : X \times X \to [0, \infty)$, the **metric** or **distance**, satisfying for all $x, y, z \in X$:

1. **positive-definiteness:** $d(x, y) = 0$ if and only if $x = y$;
2. **symmetry:** $d(x, y) = d(y, x)$;
3. **triangle inequality:** $d(x, z) \le d(x, y) + d(y, z)$.

For $x \in X$ and $r > 0$ the **open ball** is $B(x, r) = \{\, y \in X : d(x, y) < r \,\}$.`,
  },
  {
    id: 'complete-metric-space',
    label: 'Complete Metric Space',
    title: 'Complete Metric Space',
    kind: 'definition',
    tags: ['Topology'],
    dependencies: ['metric-space'],
    description: String.raw`A metric space is **complete** when every sequence whose terms eventually crowd arbitrarily close together — a **Cauchy** sequence — actually converges to a point of the space. Completeness is what closes the "gaps": $\mathbb{Q}$ is incomplete (Cauchy sequences of rationals can tend to an irrational limit absent from $\mathbb{Q}$), whereas $\mathbb{R}$ and $\mathbb{R}^n$ are complete. It is the hypothesis that makes limiting constructions — most famously the Banach fixed-point theorem — produce genuine points rather than mere approximate ones.`,
    definition: String.raw`Let $(X, d)$ be a **metric space**. A sequence $(x_n)$ in $X$ is a **Cauchy sequence** if
$$\forall \varepsilon > 0\;\exists N \in \mathbb{N}\;\forall m, n \ge N\;\; d(x_m, x_n) < \varepsilon,$$
i.e. its terms become arbitrarily close to one another. The space $(X, d)$ is **complete** if every Cauchy sequence in $X$ converges to a limit in $X$: there is $x \in X$ with $d(x_n, x) \to 0$, equivalently $\forall \varepsilon > 0\;\exists N\;\forall n \ge N\;\; d(x_n, x) < \varepsilon$.`,
  },
  {
    id: 'topological-space',
    label: 'Topological Space',
    title: 'Topological Space',
    kind: 'definition',
    tags: ['Topology'],
    dependencies: ['set'],
    description: String.raw`A **topological space** keeps only what is needed to speak of "openness," discarding distance entirely. One singles out a family of subsets — the **open sets** — declared to be the neighbourhoods-in-the-large, subject to three closure conditions modelled on the open sets of $\mathbb{R}$. This spare structure is already enough to define continuity, convergence, connectedness, and compactness, and it is the right level of generality for all of topology: every metric space is a topological space, but many important spaces (the Zariski topology, function spaces, quotients) are not metric.`,
    definition: String.raw`A **topological space** is a pair $(X, \tau)$ where $X$ is a set and $\tau \subseteq \mathcal{P}(X)$ is a family of subsets, the **open sets**, such that:

1. $\varnothing \in \tau$ and $X \in \tau$;
2. $\tau$ is closed under arbitrary unions: if $\{\, U_i \,\}_{i \in I} \subseteq \tau$ then $\bigcup_{i \in I} U_i \in \tau$;
3. $\tau$ is closed under finite intersections: if $U, V \in \tau$ then $U \cap V \in \tau$.

The family $\tau$ is called the **topology** on $X$. A **neighbourhood** of a point $x$ is any open set containing $x$.`,
  },
  {
    id: 'sequence-convergence',
    label: 'Convergence (Topological)',
    title: 'Convergence of a Sequence in a Topological Space',
    kind: 'definition',
    tags: ['Topology'],
    dependencies: ['topological-space'],
    description: String.raw`Convergence makes sense in any topological space, with no distance required: a sequence approaches a point $p$ when it eventually enters and stays inside every neighbourhood of $p$. This recovers the metric and real $\varepsilon$–$N$ notions when the topology comes from a metric, but it is far more general. Without a separation axiom such as Hausdorff, a sequence may converge to several points at once, so limits are unique only in suitably separated spaces.`,
    definition: String.raw`Let $(X, \tau)$ be a topological space, $(x_n)_{n \in \mathbb{N}}$ a sequence in $X$, and $p \in X$. The sequence **converges** to $p$, written $x_n \to p$, if for every open **neighbourhood** $U$ of $p$ there is $N \in \mathbb{N}$ such that
$$x_n \in U \quad \text{for all } n \ge N,$$
that is, every neighbourhood of $p$ contains all but finitely many terms of the sequence. Such a $p$ is called a **limit** of $(x_n)$.`,
  },
  {
    id: 'metric-topology',
    label: 'Metric Topology',
    title: 'The Topology Induced by a Metric',
    kind: 'proposition',
    tags: ['Topology'],
    dependencies: ['metric-space', 'topological-space'],
    description: String.raw`Every metric space is a topological space in a canonical way: call a set **open** when each of its points sits inside some ball entirely contained in the set. This recovers the familiar open sets of $\mathbb{R}$ and shows that topological spaces genuinely generalize metric ones. Distinct metrics can induce the same topology, which is precisely why topology, working with the open sets alone, is coarser than metric geometry.`,
    statement: String.raw`Let $(X, d)$ be a metric space. Define
$$\tau_d = \{\, U \subseteq X : \text{for every } x \in U \text{ there is } r > 0 \text{ with } B(x, r) \subseteq U \,\}.$$
Then $(X, \tau_d)$ is a topological space, and every open ball $B(x, r)$ belongs to $\tau_d$.`,
    proof: String.raw`We verify the three axioms of a **topological space**.

**(1)** $\varnothing \in \tau_d$ vacuously (it has no points), and $X \in \tau_d$ since for any $x$ and any $r > 0$ we have $B(x, r) \subseteq X$.

**(2)** Let $\{\, U_i \,\}_{i \in I} \subseteq \tau_d$ and $x \in \bigcup_i U_i$. Then $x \in U_{i_0}$ for some $i_0$, so there is $r > 0$ with $B(x, r) \subseteq U_{i_0} \subseteq \bigcup_i U_i$. Hence the union lies in $\tau_d$.

**(3)** Let $U, V \in \tau_d$ and $x \in U \cap V$. Choose $r_1, r_2 > 0$ with $B(x, r_1) \subseteq U$ and $B(x, r_2) \subseteq V$, and set $r = \min(r_1, r_2) > 0$. Then $B(x, r) \subseteq B(x, r_1) \cap B(x, r_2) \subseteq U \cap V$, so $U \cap V \in \tau_d$.

Finally, each ball $B(x, r) \in \tau_d$: if $y \in B(x, r)$ then $\delta := r - d(x, y) > 0$, and for any $z \in B(y, \delta)$ the **triangle inequality** gives $d(x, z) \le d(x, y) + d(y, z) < d(x, y) + \delta = r$, so $B(y, \delta) \subseteq B(x, r)$. $\square$`,
  },
  {
    id: 'open-closed-sets',
    label: 'Open & Closed Sets',
    title: 'Open and Closed Sets',
    kind: 'definition',
    tags: ['Topology'],
    dependencies: ['topological-space'],
    description: String.raw`The **open sets** are the members of the topology; a set is **closed** exactly when its complement is open. Open and closed are not opposites — a set can be both (like $X$ and $\varnothing$) or neither. From these one builds the three basic regional operators: the **closure** $\overline{A}$ (the smallest closed set containing $A$), the **interior** $A^\circ$ (the largest open set inside $A$), and the **boundary** $\partial A = \overline{A} \setminus A^\circ$. These are the topological replacements for the metric idea of "nearby."`,
    definition: String.raw`Let $(X, \tau)$ be a topological space and $A \subseteq X$.

- $A$ is **open** if $A \in \tau$; it is **closed** if its complement $X \setminus A$ is open.
- The **interior** is $A^\circ = \bigcup \{\, U \in \tau : U \subseteq A \,\}$, the largest open subset of $A$.
- The **closure** is $\overline{A} = \bigcap \{\, C : C \text{ closed},\ A \subseteq C \,\}$, the smallest closed superset of $A$.
- The **boundary** is $\partial A = \overline{A} \setminus A^\circ$.

By the topology axioms (closure under arbitrary unions and finite intersections), the complements — the closed sets — contain $\varnothing$ and $X$ and are closed under arbitrary intersections and finite unions, so $A^\circ$ is open and $\overline{A}$ is closed.`,
  },
  {
    id: 'closure-characterization',
    label: 'Closure & Limit Points',
    title: 'Characterization of the Closure',
    kind: 'proposition',
    tags: ['Topology'],
    dependencies: ['open-closed-sets', 'topological-space'],
    description: String.raw`The abstract closure — the smallest closed superset — coincides with the concrete, point-by-point notion: $x$ lies in $\overline{A}$ exactly when every neighbourhood of $x$ meets $A$. This is the bridge between the lattice-theoretic definition of closure and the intuition of "points arbitrarily close to $A$," and it is the form of the closure used in almost every argument.`,
    statement: String.raw`Let $(X, \tau)$ be a topological space and $A \subseteq X$. For $x \in X$,
$$x \in \overline{A} \quad\Longleftrightarrow\quad \text{every neighbourhood } U \text{ of } x \text{ satisfies } U \cap A \neq \varnothing.$$
Consequently $A$ is closed if and only if $A = \overline{A}$.`,
    proof: String.raw`We prove the contrapositive of each direction.

**($\Leftarrow$, contrapositive.)** Suppose $x \notin \overline{A}$. Since $\overline{A}$ is closed, its complement $U = X \setminus \overline{A}$ is open and contains $x$, so it is a neighbourhood of $x$. As $A \subseteq \overline{A}$, we have $U \cap A = \varnothing$. Thus some neighbourhood of $x$ misses $A$.

**($\Rightarrow$, contrapositive.)** Suppose some neighbourhood $U$ of $x$ has $U \cap A = \varnothing$, i.e. $A \subseteq X \setminus U$. The set $C = X \setminus U$ is closed (complement of an open set) and contains $A$, so by definition of the **closure** as the intersection of all closed supersets, $\overline{A} \subseteq C$. Since $x \in U = X \setminus C$, we get $x \notin \overline{A}$.

For the last claim: $\overline{A}$ is always closed and contains $A$. If $A$ is closed, it is one of the closed supersets intersected to form $\overline{A}$, so $\overline{A} \subseteq A$, giving $A = \overline{A}$. Conversely if $A = \overline{A}$ then $A$ is closed because $\overline{A}$ is. $\square$`,
  },
  {
    id: 'subspace-topology',
    label: 'Subspace Topology',
    title: 'Subspace Topology',
    kind: 'definition',
    tags: ['Topology'],
    dependencies: ['topological-space', 'open-closed-sets'],
    description: String.raw`Any subset of a topological space becomes a space in its own right by declaring its open sets to be the **traces** of the ambient open sets — their intersections with the subset. This is the canonical way a part inherits topology from the whole, so that properties like connectedness and compactness can be discussed for subsets. It is exactly what one means by "the connected subsets of $\mathbb{R}$" or "a compact subset of a space."`,
    definition: String.raw`Let $(X, \tau)$ be a topological space and $A \subseteq X$. The **subspace topology** on $A$ is
$$\tau_A = \{\, U \cap A : U \in \tau \,\}.$$
With this topology $(A, \tau_A)$ is a topological space, and a subset of $A$ is **closed in $A$** iff it is the trace $C \cap A$ of a set $C$ closed in $X$. A property of $A$ "as a space" always refers to $(A, \tau_A)$.`,
    proof: String.raw`That $\tau_A$ is a topology: $\varnothing = \varnothing \cap A$ and $A = X \cap A$ lie in $\tau_A$; and intersecting with $A$ commutes with unions and finite intersections, so $\bigcup_i (U_i \cap A) = \bigl(\bigcup_i U_i\bigr) \cap A \in \tau_A$ and $(U \cap A) \cap (V \cap A) = (U \cap V) \cap A \in \tau_A$. The closed-set claim follows by taking complements within $A$: $A \setminus (U \cap A) = (X \setminus U) \cap A$. $\square$`,
  },
  {
    id: 'continuous-map',
    label: 'Continuous Map',
    title: 'Continuous Map',
    kind: 'definition',
    tags: ['Topology'],
    dependencies: ['topological-space', 'open-closed-sets'],
    description: String.raw`Continuity, the central notion of topology, is captured purely by open sets: a map is **continuous** when the preimage of every open set is open — equivalently, when it pulls neighbourhoods of the image back to neighbourhoods of the source. On metric spaces this is exactly the $\varepsilon$–$\delta$ definition, but the topological version needs no distance and so applies everywhere. The maps of topology are the continuous ones, and the invariants of topology are precisely the features they preserve.`,
    definition: String.raw`A map $f : (X, \tau_X) \to (Y, \tau_Y)$ between topological spaces is **continuous** if
$$f^{-1}(V) \in \tau_X \quad \text{for every } V \in \tau_Y,$$
that is, the preimage of every open set is open. It is **continuous at a point** $x \in X$ if for every neighbourhood $V$ of $f(x)$ there is a neighbourhood $U$ of $x$ with $f(U) \subseteq V$; a map is continuous iff it is continuous at every point.`,
  },
  {
    id: 'continuity-closed-characterization',
    label: 'Continuity via Closed Sets',
    title: 'Continuity via Closed Sets and Closure',
    kind: 'proposition',
    tags: ['Topology'],
    dependencies: ['continuous-map', 'closure-characterization', 'open-closed-sets'],
    description: String.raw`Continuity has three equivalent faces: preimages of open sets are open, preimages of closed sets are closed, and the map respects closures, $f(\overline{A}) \subseteq \overline{f(A)}$. The last says continuity is exactly the statement that "$f$ does not separate a point from a set it touches," and it is the form most useful when reasoning about limits and closures.`,
    statement: String.raw`For a map $f : X \to Y$ between topological spaces the following are equivalent:

1. $f$ is **continuous** (preimages of open sets are open);
2. for every closed $C \subseteq Y$, the preimage $f^{-1}(C)$ is closed in $X$;
3. for every $A \subseteq X$, $\ f(\overline{A}) \subseteq \overline{f(A)}$.`,
    proof: String.raw`**(1)$\Leftrightarrow$(2).** For any $V \subseteq Y$, $f^{-1}(Y \setminus V) = X \setminus f^{-1}(V)$. So $f^{-1}(V)$ is open for all open $V$ iff $f^{-1}(C)$ is closed for all closed $C$, since closed sets are the complements of open sets.

**(2)$\Rightarrow$(3).** Let $A \subseteq X$. The set $\overline{f(A)}$ is closed in $Y$, so by (2) its preimage $f^{-1}\bigl(\overline{f(A)}\bigr)$ is closed in $X$. It contains $A$, because $f(A) \subseteq \overline{f(A)}$. As $\overline{A}$ is the smallest closed set containing $A$, we get $\overline{A} \subseteq f^{-1}\bigl(\overline{f(A)}\bigr)$, i.e. $f(\overline{A}) \subseteq \overline{f(A)}$.

**(3)$\Rightarrow$(2).** Let $C \subseteq Y$ be closed and put $A = f^{-1}(C)$. By (3), $f(\overline{A}) \subseteq \overline{f(A)} \subseteq \overline{C} = C$ (using $f(A) \subseteq C$ and $C$ closed, so $\overline{C} = C$ by the closure characterization). Hence $\overline{A} \subseteq f^{-1}(C) = A$, so $\overline{A} = A$ and $A$ is closed. $\square$`,
  },
  {
    id: 'homeomorphism',
    label: 'Homeomorphism',
    title: 'Homeomorphism',
    kind: 'definition',
    tags: ['Topology'],
    dependencies: ['continuous-map', 'bijection'],
    description: String.raw`A **homeomorphism** is the isomorphism of topology: a continuous bijection whose inverse is also continuous. It sets up a perfect correspondence between the open sets of two spaces, so they are indistinguishable by any purely topological property — the precise sense in which a coffee mug "is" a doughnut. Topology is the study of exactly those features invariant under homeomorphism.`,
    definition: String.raw`A map $f : X \to Y$ between topological spaces is a **homeomorphism** if it is a **bijection**, $f$ is continuous, and the inverse $f^{-1} : Y \to X$ is continuous. Equivalently, $f$ is a continuous bijection that is **open** (maps open sets to open sets). Two spaces are **homeomorphic**, $X \cong Y$, if such an $f$ exists; a property preserved by all homeomorphisms is a **topological property**.`,
  },

  // ── Connectedness ──────────────────────────────────────────────────────────
  {
    id: 'connectedness',
    label: 'Connectedness',
    title: 'Connectedness',
    kind: 'definition',
    tags: ['Topology'],
    dependencies: ['topological-space', 'open-closed-sets'],
    description: String.raw`A space is **connected** when it is "all one piece" — it cannot be broken into two non-empty open parts with nothing in between. Equivalently, the only subsets that are simultaneously open and closed are the trivial ones, $\varnothing$ and the whole space. Connectedness is the abstract reason behind the intermediate value theorem and is preserved by continuous maps, making it one of the most robust topological invariants.`,
    definition: String.raw`A topological space $X$ is **connected** if it admits no **separation**: there do not exist open sets $U, V$ with
$$X = U \cup V, \qquad U \cap V = \varnothing, \qquad U \neq \varnothing \neq V.$$
Equivalently, $X$ is connected iff the only subsets that are both open and closed (**clopen**) are $\varnothing$ and $X$. A subset $A \subseteq X$ is **connected** if it is connected in the **subspace topology**.`,
    proof: String.raw`The two formulations are equivalent. If $U, V$ form a separation then $U$ is clopen: it is open by hypothesis and closed because $U = X \setminus V$ with $V$ open; and $U \neq \varnothing, X$ since $V \neq \varnothing$. Conversely, if $A$ is a nontrivial clopen set then $A$ and $X \setminus A$ are both open, nonempty, disjoint, and cover $X$, a separation. $\square$`,
  },
  {
    id: 'continuous-image-of-connected',
    label: 'Image of Connected',
    title: 'Continuous Image of a Connected Space',
    kind: 'theorem',
    tags: ['Topology'],
    dependencies: ['connectedness', 'continuous-map', 'subspace-topology'],
    description: String.raw`Continuity cannot tear a space apart: the image of a connected space under a continuous map is connected. This single fact is the engine behind the intermediate value theorem and shows that connectedness is a genuine topological invariant — homeomorphic spaces are connected or disconnected together.`,
    statement: String.raw`If $f : X \to Y$ is continuous and $X$ is connected, then the image $f(X)$, with the subspace topology from $Y$, is connected.`,
    proof: String.raw`Replacing $Y$ by the subspace $f(X)$, we may assume $f$ is surjective and prove $Y$ connected; the restriction $f : X \to f(X)$ is still continuous because preimages of trace-open sets $V \cap f(X)$ are $f^{-1}(V)$, open in $X$.

Suppose, for contradiction, that $Y$ has a **separation** $Y = U \cup V$ with $U, V$ open, nonempty, disjoint. By **continuity**, $f^{-1}(U)$ and $f^{-1}(V)$ are open in $X$. They are disjoint and cover $X$ since $U, V$ are disjoint and cover $Y$. They are nonempty because $f$ is surjective, so $U, V$ each have a preimage point. Thus $X = f^{-1}(U) \cup f^{-1}(V)$ is a separation of $X$, contradicting that $X$ is **connected**. Hence no separation of $Y$ exists, and $f(X) = Y$ is connected. $\square$`,
  },
  {
    id: 'connected-subsets-of-reals',
    label: 'Connected Subsets of ℝ',
    title: 'Connected Subsets of the Real Line',
    kind: 'proposition',
    tags: ['Topology'],
    dependencies: ['connectedness', 'subspace-topology', 'real-numbers', 'supremum'],
    description: String.raw`The connected subsets of the real line are exactly the **intervals** — sets with no internal gaps. This concrete description, together with completeness of $\mathbb{R}$, is what turns the abstract preservation of connectedness into the intermediate value theorem: a continuous real function on an interval has an interval as image, hence omits no intermediate value.`,
    statement: String.raw`A subset $A \subseteq \mathbb{R}$ (with the subspace topology) is connected if and only if it is an **interval**: whenever $a, b \in A$ and $a < c < b$, then $c \in A$.`,
    proof: String.raw`**(Connected $\Rightarrow$ interval.)** Suppose $A$ is not an interval: there are $a, b \in A$ with $a < c < b$ but $c \notin A$. Then $U = A \cap (-\infty, c)$ and $V = A \cap (c, \infty)$ are open in the **subspace topology**, disjoint, and cover $A$ (since $c \notin A$), with $a \in U$ and $b \in V$ both nonempty. This is a separation, so $A$ is disconnected.

**(Interval $\Rightarrow$ connected.)** Let $A$ be an interval and suppose $A = U \cup V$ is a separation with $U, V$ open in $A$, nonempty, disjoint. Pick $a \in U$, $b \in V$; WLOG $a < b$. Since $A$ is an interval, $[a, b] \subseteq A$. Let
$$s = \sup\{\, x \in [a, b] : x \in U \,\},$$
which exists by the **completeness** of $\mathbb{R}$ (the **supremum** of a nonempty bounded set), and $s \in [a, b] \subseteq A$, so $s \in U$ or $s \in V$.

If $s \in U$: then $s \neq b$, and since $U$ is open in $A$ there is $\varepsilon > 0$ with $[s, s + \varepsilon) \cap A \subseteq U$; this contains points of $[a, b]$ above $s$, contradicting that $s$ is an upper bound.

If $s \in V$: then $s \neq a$, and since $V$ is open in $A$ there is $\varepsilon > 0$ with $(s - \varepsilon, s] \cap A \subseteq V$; but then no point of $(s - \varepsilon, s]$ lies in $U$, so $s - \varepsilon$ is already an upper bound of the set, contradicting $s$ being the *least* upper bound.

Both cases are impossible, so no separation exists and $A$ is connected. $\square$`,
  },
  {
    id: 'topological-ivt',
    label: 'IVT (Topological)',
    title: 'Intermediate Value Theorem, Topologically',
    kind: 'corollary',
    tags: ['Topology'],
    dependencies: ['continuous-image-of-connected', 'connected-subsets-of-reals'],
    description: String.raw`The intermediate value theorem is a corollary of two topological facts: a continuous map sends connected sets to connected sets, and the connected subsets of $\mathbb{R}$ are the intervals. Together they say a continuous real function on an interval cannot skip a value, recovering the classical theorem from pure topology rather than from $\varepsilon$–$\delta$ estimates.`,
    statement: String.raw`Let $f : [a, b] \to \mathbb{R}$ be continuous and let $y$ lie strictly between $f(a)$ and $f(b)$. Then $f(c) = y$ for some $c \in [a, b]$.`,
    proof: String.raw`The interval $[a, b]$ is connected by the characterization of **connected subsets of $\mathbb{R}$**. By the theorem on the **continuous image of a connected space**, $f([a, b])$ is a connected subset of $\mathbb{R}$, hence again an interval. It contains $f(a)$ and $f(b)$; being an interval, it contains every point between them, in particular $y$. Therefore $y \in f([a, b])$, i.e. $y = f(c)$ for some $c \in [a, b]$. $\square$`,
  },

  // ── Separation and compactness ─────────────────────────────────────────────
  {
    id: 'hausdorff-space',
    label: 'Hausdorff Space',
    title: 'Hausdorff Space',
    kind: 'definition',
    tags: ['Topology'],
    dependencies: ['topological-space', 'open-closed-sets'],
    description: String.raw`A space is **Hausdorff** ($T_2$) when distinct points can always be housed in disjoint open neighbourhoods — points can be "told apart" by open sets. This mild separation axiom rules out pathologies: it makes limits unique and singletons closed, and it holds in every metric space. The spaces of analysis and geometry are nearly always assumed Hausdorff.`,
    definition: String.raw`A topological space $X$ is **Hausdorff** (satisfies the separation axiom $T_2$) if for every pair of distinct points $x \neq y$ there exist open sets $U \ni x$ and $V \ni y$ with $U \cap V = \varnothing$.`,
  },
  {
    id: 'hausdorff-points-closed',
    label: 'Points Closed in Hausdorff',
    title: 'Hausdorff Spaces Have Closed Points and Unique Limits',
    kind: 'proposition',
    tags: ['Topology'],
    dependencies: ['hausdorff-space', 'closure-characterization', 'sequence-convergence'],
    description: String.raw`Two immediate dividends of the Hausdorff axiom: every singleton is a closed set, and a convergent sequence has at most one limit. Both fail in non-Hausdorff spaces (e.g. an indiscrete space, where every sequence converges to every point), which is why uniqueness of limits — taken for granted in analysis — is really the Hausdorff property in disguise.`,
    statement: String.raw`Let $X$ be a Hausdorff space. Then:

1. every singleton $\{\, x \,\}$ is closed;
2. every sequence in $X$ that **converges** (in the sense of topological convergence: every open neighbourhood of the limit contains all but finitely many terms) has a unique limit.`,
    proof: String.raw`**(1)** Fix $x$ and let $y \neq x$. By the **Hausdorff** property there are disjoint open $U \ni x$, $V \ni y$; in particular $V$ is a neighbourhood of $y$ with $V \cap \{\, x \,\} = \varnothing$ (as $x \in U$ disjoint from $V$). By the **closure characterization**, $y \notin \overline{\{\, x \,\}}$. Since this holds for every $y \neq x$, we get $\overline{\{\, x \,\}} = \{\, x \,\}$, so $\{\, x \,\}$ is closed.

**(2)** Suppose a sequence $(x_n)$ converges to both $p$ and $q$ with $p \neq q$. Choose disjoint open $U \ni p$, $V \ni q$ by the **Hausdorff** property. By **convergence of a sequence** in a topological space, the neighbourhood $U$ of $p$ contains all but finitely many $x_n$: there is $N_1$ with $x_n \in U$ for all $n \ge N_1$. Likewise there is $N_2$ with $x_n \in V$ for all $n \ge N_2$. Then for $n \ge \max(N_1, N_2)$ we have $x_n \in U \cap V = \varnothing$, impossible. Therefore $p = q$. $\square$`,
  },
  {
    id: 'continuous-image-of-compact',
    label: 'Image of Compact',
    title: 'Continuous Image of a Compact Space',
    kind: 'theorem',
    tags: ['Topology'],
    dependencies: ['continuous-map', 'compactness', 'subspace-topology'],
    description: String.raw`Compactness, like connectedness, is preserved by continuous maps: the continuous image of a compact space is compact. This is the topological skeleton of the extreme value theorem — a continuous real function on a compact set has compact, hence bounded and closed, image, so it attains a maximum and a minimum.`,
    statement: String.raw`If $f : X \to Y$ is continuous and $X$ is **compact** (every open cover has a finite subcover), then $f(X)$ is compact.`,
    proof: String.raw`As before, restrict the codomain so that $f : X \to f(X)$ is surjective and continuous; we show $f(X)$ is compact. Let $\{\, V_i \,\}_{i \in I}$ be an open cover of $f(X)$ by sets open in $f(X)$, so each $V_i = W_i \cap f(X)$ with $W_i$ open in $Y$.

By **continuity**, each $f^{-1}(V_i) = f^{-1}(W_i)$ is open in $X$, and $\{\, f^{-1}(V_i) \,\}_{i \in I}$ covers $X$: every $x \in X$ has $f(x) \in f(X)$ covered by some $V_i$, so $x \in f^{-1}(V_i)$. Since $X$ is **compact**, finitely many suffice: $X = f^{-1}(V_{i_1}) \cup \cdots \cup f^{-1}(V_{i_n})$.

Applying $f$ and using surjectivity, $f(X) = f\bigl(\bigcup_k f^{-1}(V_{i_k})\bigr) \subseteq \bigcup_k V_{i_k}$, while each $V_{i_k} \subseteq f(X)$; hence $\{\, V_{i_1}, \dots, V_{i_n} \,\}$ is a finite subcover. Therefore $f(X)$ is compact. $\square$`,
  },
  {
    id: 'compact-subset-of-hausdorff-closed',
    label: 'Compact ⊆ Hausdorff is Closed',
    title: 'Compact Subsets of a Hausdorff Space Are Closed',
    kind: 'lemma',
    tags: ['Topology'],
    dependencies: ['hausdorff-space', 'compactness', 'subspace-topology', 'open-closed-sets'],
    description: String.raw`In a Hausdorff space, compactness forces closedness: every compact subset is closed. The proof separates a fixed outside point from the whole compact set at once, using the finite-subcover property to merge infinitely many local separations into one. This lemma is the crucial half of the result that continuous bijections off a compact space are homeomorphisms.`,
    statement: String.raw`Let $X$ be a Hausdorff space and $K \subseteq X$ compact (in the subspace topology). Then $K$ is closed in $X$.`,
    proof: String.raw`We show the complement $X \setminus K$ is open. Fix $x \in X \setminus K$. For each $y \in K$, since $X$ is **Hausdorff** and $x \neq y$, choose disjoint open sets $U_y \ni x$ and $V_y \ni y$. The family $\{\, V_y \cap K \,\}_{y \in K}$ is an open cover of $K$ in its **subspace topology**, so by **compactness** of $K$ there are finitely many $y_1, \dots, y_n$ with $K \subseteq V_{y_1} \cup \cdots \cup V_{y_n}$.

Set $U = U_{y_1} \cap \cdots \cap U_{y_n}$, a finite intersection of open sets, hence open, and $x \in U$. For each $k$, $U \subseteq U_{y_k}$ is disjoint from $V_{y_k}$, so $U$ is disjoint from $V_{y_1} \cup \cdots \cup V_{y_n} \supseteq K$. Thus $U \subseteq X \setminus K$ is a neighbourhood of $x$ inside the complement. As $x$ was arbitrary, $X \setminus K$ is open and $K$ is closed. $\square$`,
  },
  {
    id: 'compact-hausdorff-bijection-homeo',
    label: 'Compact→Hausdorff Bijection',
    title: 'Continuous Bijection from Compact to Hausdorff is a Homeomorphism',
    kind: 'theorem',
    tags: ['Topology'],
    dependencies: [
      'homeomorphism',
      'continuous-image-of-compact',
      'compact-subset-of-hausdorff-closed',
      'subspace-topology',
      'continuity-closed-characterization',
    ],
    description: String.raw`A continuous bijection need not be a homeomorphism in general — the inverse can fail to be continuous. But when the source is compact and the target is Hausdorff, the inverse is automatically continuous, so the map is a homeomorphism. This widely used theorem lets one upgrade a mere continuous bijection to a topological identification with no extra work, provided the compact-to-Hausdorff hypothesis holds.`,
    statement: String.raw`Let $f : X \to Y$ be a continuous bijection with $X$ compact and $Y$ Hausdorff. Then $f$ is a **homeomorphism**.`,
    proof: String.raw`A continuous bijection is a homeomorphism iff it is a **closed map** (sends closed sets to closed sets): for then $(f^{-1})^{-1}(C) = f(C)$ is closed for every closed $C$, so $f^{-1}$ pulls closed sets back to closed sets and is continuous by the closed-set criterion. We verify $f$ is closed.

Let $C \subseteq X$ be closed. A closed subset of a compact space is compact: any open cover of $C$, together with the open set $X \setminus C$, covers $X$; by **compactness** of $X$ extract a finite subcover, and discard $X \setminus C$ to obtain a finite cover of $C$. Hence $C$ is compact. By the **continuous image of a compact space**, $f(C)$ is compact in $Y$. Since $Y$ is **Hausdorff**, the lemma on **compact subsets of a Hausdorff space** shows $f(C)$ is closed in $Y$.

Thus $f$ maps closed sets to closed sets, so $f^{-1}$ is continuous and $f$ is a homeomorphism. $\square$`,
  },
]

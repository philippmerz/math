import type { MathNode } from '../types'

export const FUNCTIONAL_ANALYSIS_NODES: MathNode[] = [
  // ── Spaces ─────────────────────────────────────────────────────────────────
  {
    id: 'normed-space',
    label: 'Normed Space',
    title: 'Normed Space',
    kind: 'definition',
    tags: ['Functional Analysis'],
    dependencies: ['vector-space', 'metric-space'],
    description: String.raw`Geometry on a vector space begins with a notion of *length*. A **norm** assigns to each vector a nonnegative size that vanishes only at $0$, scales with scalars, and respects the triangle inequality. Setting the distance between two vectors to be the length of their difference turns the vector space into a metric space, so limits, continuity, and convergence become available — and they interact well with the linear structure, since addition and scalar multiplication are continuous. A normed space is thus the minimal arena in which linear algebra and analysis meet.`,
    definition: String.raw`A **normed space** is a vector space $V$ over $\mathbb{R}$ (or $\mathbb{C}$) together with a **norm** $\lVert \cdot \rVert : V \to [0, \infty)$ satisfying, for all $u, v \in V$ and scalars $\lambda$:
$$\lVert v \rVert = 0 \iff v = 0, \qquad \lVert \lambda v \rVert = |\lambda|\,\lVert v \rVert, \qquad \lVert u + v \rVert \le \lVert u \rVert + \lVert v \rVert.$$
The norm induces a **metric** $d(u, v) = \lVert u - v \rVert$; that this is a metric (in particular that the triangle inequality $d(u,w) \le d(u,v) + d(v,w)$ holds) is immediate from the norm axioms applied to $u - w = (u - v) + (v - w)$. All topological notions on $V$ refer to this metric.`,
  },
  {
    id: 'banach-space',
    label: 'Banach Space',
    title: 'Banach Space',
    kind: 'definition',
    tags: ['Functional Analysis'],
    dependencies: ['normed-space', 'complete-metric-space', 'cauchy-sequence'],
    description: String.raw`Completeness is the hypothesis that makes limiting arguments valid: a sequence whose terms eventually crowd together must converge to an actual point of the space. A Banach space is a normed space that is complete in its induced metric, so series that are absolutely summable converge, contraction maps have fixed points, and approximations have genuine limits. Finite-dimensional spaces, $C[a,b]$ with the supremum norm, and the $L^p$ spaces are all Banach; the incomplete normed spaces (such as the continuous functions under the $L^1$ norm) are precisely the ones one must *complete* to do analysis.`,
    definition: String.raw`A **Banach space** is a normed space $(V, \lVert\cdot\rVert)$ that is **complete** as a metric space under the induced metric $d(u,v) = \lVert u - v\rVert$: every **Cauchy sequence** in $V$ converges to a limit in $V$. Equivalently, a normed space is Banach iff every absolutely convergent series converges — if $\sum_n \lVert v_n\rVert < \infty$ then $\sum_n v_n$ converges in $V$.`,
  },
  {
    id: 'parallelogram-law',
    label: 'Parallelogram Law',
    title: 'Parallelogram Law',
    kind: 'proposition',
    tags: ['Functional Analysis'],
    dependencies: ['inner-product-space'],
    description: String.raw`The norm coming from an inner product is not arbitrary: it remembers the bilinear form that produced it. The **parallelogram law** is the clean algebraic fingerprint — the sum of the squares of the two diagonals of a parallelogram equals the sum of the squares of its four sides. Conversely, a norm obeying this identity must come from an inner product (the Jordan–von Neumann theorem), so the law characterizes exactly which normed spaces are inner-product spaces — the dividing line that separates Hilbert spaces from general Banach spaces.`,
    statement: String.raw`In any inner product space, the induced norm $\lVert v\rVert = \sqrt{\langle v, v\rangle}$ satisfies, for all $u, v$,
$$\lVert u + v\rVert^2 + \lVert u - v\rVert^2 = 2\lVert u\rVert^2 + 2\lVert v\rVert^2.$$`,
    proof: String.raw`Using the definition $\lVert w\rVert^2 = \langle w, w\rangle$ from **inner-product-space** and expanding by bilinearity and symmetry of the inner product,
$$\lVert u + v\rVert^2 = \langle u, u\rangle + 2\langle u, v\rangle + \langle v, v\rangle, \qquad \lVert u - v\rVert^2 = \langle u, u\rangle - 2\langle u, v\rangle + \langle v, v\rangle.$$
Adding the two, the cross terms $\pm 2\langle u, v\rangle$ cancel, leaving $2\langle u, u\rangle + 2\langle v, v\rangle = 2\lVert u\rVert^2 + 2\lVert v\rVert^2$. $\square$`,
  },
  {
    id: 'hilbert-space',
    label: 'Hilbert Space',
    title: 'Hilbert Space',
    kind: 'definition',
    tags: ['Functional Analysis'],
    dependencies: ['inner-product-space', 'banach-space', 'parallelogram-law'],
    description: String.raw`A Hilbert space is the infinite-dimensional setting that most faithfully extends Euclidean geometry: a complete inner product space. Because its norm comes from an inner product, angles, orthogonality, and orthogonal projection are all available, and completeness makes infinite orthonormal expansions converge. Among all Banach spaces, the Hilbert spaces are exactly those whose norm satisfies the parallelogram law. The sequence space $\ell^2$ and the function space $L^2$ are the canonical examples, and every separable infinite-dimensional Hilbert space is isometric to $\ell^2$.`,
    definition: String.raw`A **Hilbert space** is an **inner product space** $(H, \langle\cdot,\cdot\rangle)$ that is complete in the norm $\lVert v\rVert = \sqrt{\langle v, v\rangle}$ — that is, a **Banach space** whose norm arises from an inner product. By the **parallelogram law** (and its converse, Jordan–von Neumann), a Banach space is a Hilbert space precisely when its norm satisfies $\lVert u+v\rVert^2 + \lVert u-v\rVert^2 = 2\lVert u\rVert^2 + 2\lVert v\rVert^2$ for all $u, v$.`,
  },
  {
    id: 'lp-space',
    label: 'Lᵖ Spaces',
    title: 'Lᵖ and ℓᵖ Spaces',
    kind: 'definition',
    tags: ['Functional Analysis'],
    dependencies: ['banach-space', 'lebesgue-integral', 'measurable-function'],
    description: String.raw`The $L^p$ spaces are the most important concrete Banach spaces of analysis: spaces of functions measured by the size of their $p$-th power integral. The triangle inequality for the $L^p$ norm is Minkowski's inequality, and that the spaces are complete is the Riesz–Fischer theorem. The exponent $p = 2$ is special: as soon as the underlying measure space carries two disjoint sets of positive finite measure, only the $L^2$ norm satisfies the parallelogram law, making $L^2$ the lone Hilbert space in the family (the sole exception is the degenerate case where the space is essentially one atom, where $L^p \cong \mathbb{F}$ for every $p$). Identifying functions that agree almost everywhere is what makes $\lVert\cdot\rVert_p$ a genuine norm rather than a seminorm.`,
    definition: String.raw`Fix a measure space $(X, \mathcal{M}, \mu)$ and $1 \le p < \infty$. The space $L^p(\mu)$ consists of equivalence classes (modulo equality $\mu$-almost everywhere) of **measurable functions** $f : X \to \mathbb{R}$ (or $\mathbb{C}$) with $\int_X |f|^p\,d\mu < \infty$, normed by
$$\lVert f\rVert_p = \Bigl(\int_X |f|^p\,d\mu\Bigr)^{1/p}.$$
For $p = \infty$, $L^\infty(\mu)$ consists of the essentially bounded measurable functions, with $\lVert f\rVert_\infty = \operatorname{ess\,sup}|f| = \inf\{\,M : |f| \le M \text{ a.e.}\,\}$. Each $L^p$ is a **Banach space** (Riesz–Fischer); the **sequence spaces** $\ell^p$ are the special case where $\mu$ is counting measure on $\mathbb{N}$. The space $L^2$ is a Hilbert space, with $\langle f, g\rangle = \int f\overline{g}\,d\mu$; and whenever $(X, \mathcal{M}, \mu)$ has two disjoint sets of positive finite measure, $L^2$ is the *only* member of the family whose norm comes from an inner product (testing the parallelogram law on indicators of two such sets forces $p = 2$).`,
  },
  {
    id: 'hilbert-basis',
    label: 'Hilbert Basis',
    title: 'Orthonormal Basis & Parseval',
    kind: 'theorem',
    tags: ['Functional Analysis'],
    dependencies: ['hilbert-space', 'orthonormal-basis', 'orthogonal-projection', 'zorns-lemma'],
    description: String.raw`In a Hilbert space, a maximal orthonormal system plays the role that an orthonormal basis plays in finite dimensions — except the expansions are now infinite series, convergent in norm. Every vector is the sum of its components along the basis directions, and its squared length is the sum of the squares of those components (Parseval's identity), the exact infinite-dimensional analogue of the Pythagorean theorem. This is the abstract theory of Fourier series: choosing the trigonometric basis recovers classical Fourier expansion, and any separable Hilbert space is thereby isometric to $\ell^2$.`,
    statement: String.raw`Let $(e_i)_{i \in I}$ be an orthonormal system in a Hilbert space $H$ — i.e. $\langle e_i, e_j\rangle = \delta_{ij}$. The following are equivalent, and when they hold $(e_i)$ is called an **orthonormal basis**: (i) the closed linear span of $\{e_i\}$ is all of $H$; (ii) for every $v \in H$, $v = \sum_{i} \langle v, e_i\rangle\, e_i$ (norm-convergent); (iii) **Parseval's identity** $\lVert v\rVert^2 = \sum_i |\langle v, e_i\rangle|^2$ holds for all $v$. Every Hilbert space has an orthonormal basis.`,
    proof: String.raw`For any finite $F \subseteq I$, the **Bessel inequality** holds: putting $p = \sum_{i \in F}\langle v, e_i\rangle e_i$, a direct expansion gives $\langle v - p, e_j\rangle = 0$ for $j \in F$, so $v - p \perp p$, and by the Pythagorean identity $\lVert v\rVert^2 = \lVert v - p\rVert^2 + \lVert p\rVert^2 \ge \lVert p\rVert^2 = \sum_{i \in F}|\langle v, e_i\rangle|^2$. Hence $\sum_i |\langle v, e_i\rangle|^2 \le \lVert v\rVert^2 < \infty$, so at most countably many coefficients are nonzero and, by completeness of $H$ (the partial sums are Cauchy, since $\bigl\lVert \sum_{i \in F'}\langle v,e_i\rangle e_i\bigr\rVert^2 = \sum_{i \in F'}|\langle v,e_i\rangle|^2$ for finite $F'$), the series $Pv := \sum_i \langle v, e_i\rangle e_i$ converges in $H$.

(i) $\Rightarrow$ (ii): Let $M = \overline{\operatorname{span}}\{e_i\}$. By **orthogonal-projection**, $H = M \oplus M^\perp$. The vector $v - Pv$ is orthogonal to every $e_j$ (as $\langle v - Pv, e_j\rangle = \langle v, e_j\rangle - \langle v, e_j\rangle = 0$), hence to all of $M$, so $v - Pv \in M^\perp$; and $Pv \in M$. Thus $Pv$ is the orthogonal projection of $v$ onto $M$. If $M = H$ then $M^\perp = \{0\}$, forcing $v = Pv$, which is (ii).

(ii) $\Rightarrow$ (iii): With $v = \sum_i\langle v,e_i\rangle e_i$, continuity of the norm and orthonormality give $\lVert v\rVert^2 = \lim_F \bigl\lVert\sum_{i\in F}\langle v,e_i\rangle e_i\bigr\rVert^2 = \sum_i |\langle v, e_i\rangle|^2$.

(iii) $\Rightarrow$ (i): If $v \perp M$ then $\langle v, e_i\rangle = 0$ for all $i$, so by Parseval $\lVert v\rVert^2 = 0$, i.e. $v = 0$. Thus $M^\perp = \{0\}$, and by **orthogonal-projection** $H = M \oplus M^\perp = M$.

*Existence.* The orthonormal systems of $H$, ordered by inclusion, form a poset in which every chain has the union as an upper bound (an upper bound that is again orthonormal); by Zorn's lemma there is a maximal one $(e_i)$. Maximality gives $M^\perp = \{0\}$: any unit vector in $M^\perp$ could be adjoined, enlarging the system. Hence $M = H$ by the equivalence, so $(e_i)$ is an orthonormal basis. This generalizes the finite-dimensional **orthonormal-basis** to complete spaces. $\square$`,
  },

  // ── Operators & duality ────────────────────────────────────────────────────
  {
    id: 'bounded-linear-operator',
    label: 'Bounded Operator',
    title: 'Bounded Linear Operator',
    kind: 'definition',
    tags: ['Functional Analysis'],
    dependencies: ['normed-space', 'linear-map', 'continuous-map'],
    description: String.raw`The right notion of morphism between normed spaces is a linear map that is also continuous — and for linear maps continuity is a purely quantitative condition: the map must not stretch any vector by more than a fixed factor. The least such factor is the operator norm, which itself turns the space of operators into a normed space, complete whenever the target is. In infinite dimensions boundedness is a genuine restriction (unlike finite dimensions, where every linear map is continuous), and unbounded operators such as differentiation are the source of much of the subject's subtlety.`,
    definition: String.raw`A **linear map** $T : X \to Y$ between normed spaces is **bounded** if there is a constant $C \ge 0$ with
$$\lVert T x\rVert_Y \le C\,\lVert x\rVert_X \quad\text{for all } x \in X.$$
The **operator norm** is the least such constant, $\lVert T\rVert = \sup_{x \neq 0} \lVert Tx\rVert / \lVert x\rVert = \sup_{\lVert x\rVert \le 1}\lVert Tx\rVert$. The bounded operators $X \to Y$ form a normed space $\mathcal{B}(X, Y)$ under this norm.`,
    proof: String.raw`**Boundedness $\iff$ continuity.** If $T$ is bounded with constant $C$, then $\lVert Tx - Tx_0\rVert = \lVert T(x - x_0)\rVert \le C\lVert x - x_0\rVert$, so $T$ is (Lipschitz, hence) a **continuous-map**. Conversely, if $T$ is continuous it is continuous at $0$, so for $\varepsilon = 1$ there is $\delta > 0$ with $\lVert x\rVert \le \delta \Rightarrow \lVert Tx\rVert \le 1$. For any $x \neq 0$ the vector $\delta x/\lVert x\rVert$ has norm $\delta$, so $\lVert T(\delta x/\lVert x\rVert)\rVert \le 1$; by linearity $\lVert Tx\rVert \le \lVert x\rVert/\delta$, i.e. $T$ is bounded with $C = 1/\delta$. That $\mathcal{B}(X,Y)$ is a normed space: $\lVert\cdot\rVert$ is a supremum of nonnegative numbers, is $0$ only for $T = 0$, is absolutely homogeneous, and the triangle inequality follows from $\lVert (S+T)x\rVert \le \lVert Sx\rVert + \lVert Tx\rVert \le (\lVert S\rVert + \lVert T\rVert)\lVert x\rVert$. $\square$`,
  },
  {
    id: 'operator-space-complete',
    label: 'ℬ(X,Y) Complete',
    title: 'Completeness of the Operator Space',
    kind: 'proposition',
    tags: ['Functional Analysis'],
    dependencies: ['bounded-linear-operator', 'banach-space'],
    description: String.raw`The collection of bounded operators between two normed spaces is itself a normed space; the natural question is when it is complete. The answer depends only on the target: if the codomain is a Banach space, then so is the operator space, no matter what the domain is. The proof is the standard "complete the limit pointwise, then verify uniformity" argument, and it is the reason the dual space of any normed space is automatically Banach.`,
    statement: String.raw`If $X$ is a normed space and $Y$ is a **Banach space**, then $\mathcal{B}(X, Y)$ is a Banach space under the operator norm.`,
    proof: String.raw`Let $(T_n)$ be Cauchy in $\mathcal{B}(X, Y)$. For each $x \in X$, $\lVert T_n x - T_m x\rVert \le \lVert T_n - T_m\rVert\,\lVert x\rVert$, so $(T_n x)$ is Cauchy in $Y$; since $Y$ is complete it converges, and we define $Tx := \lim_n T_n x$. The map $T$ is linear (limits respect addition and scalar multiplication). Boundedness and convergence: given $\varepsilon > 0$ pick $N$ with $\lVert T_n - T_m\rVert \le \varepsilon$ for $m, n \ge N$. Then for every $x$ and $m, n \ge N$, $\lVert T_n x - T_m x\rVert \le \varepsilon\lVert x\rVert$; letting $m \to \infty$ (the norm is continuous) gives $\lVert T_n x - Tx\rVert \le \varepsilon\lVert x\rVert$ for $n \ge N$. Hence $T - T_N$ is bounded, so $T = (T - T_N) + T_N \in \mathcal{B}(X,Y)$, and $\lVert T_n - T\rVert \le \varepsilon$ for $n \ge N$, i.e. $T_n \to T$ in operator norm. $\square$`,
  },
  {
    id: 'dual-space',
    label: 'Dual Space',
    title: 'Dual Space',
    kind: 'definition',
    tags: ['Functional Analysis'],
    dependencies: ['bounded-linear-operator', 'operator-space-complete', 'banach-space'],
    description: String.raw`Probing a space by all the linear measurements one can make on it yields its dual: the space of bounded linear functionals. Because the scalar field is complete, the dual is always a Banach space, even when the original space is not. The dual records the space "from the outside," and the double dual carries a natural isometric copy of the original — when that copy fills the whole double dual, the space is reflexive, a property that makes weak compactness and many variational arguments work cleanly.`,
    definition: String.raw`The **dual space** $X^*$ of a normed space $X$ is $\mathcal{B}(X, \mathbb{F})$, the space of **bounded linear functionals** $f : X \to \mathbb{F}$ ($\mathbb{F} = \mathbb{R}$ or $\mathbb{C}$), with the operator norm $\lVert f\rVert = \sup_{\lVert x\rVert \le 1}|f(x)|$. Since $\mathbb{F}$ is complete, $X^*$ is a **Banach space** (by **operator-space-complete**). The **canonical map** $J : X \to X^{**}$ sends $x$ to evaluation $\hat x(f) = f(x)$; $X$ is **reflexive** when $J$ is onto.`,
  },
  {
    id: 'hahn-banach-theorem',
    label: 'Hahn–Banach',
    title: 'Hahn–Banach Theorem',
    kind: 'theorem',
    tags: ['Functional Analysis'],
    dependencies: ['dual-space', 'zorns-lemma'],
    description: String.raw`The Hahn–Banach theorem is the source of the abundance of linear functionals in functional analysis. It guarantees that a bounded functional defined on a subspace extends to the whole space without increasing its norm. Two consequences make the dual rich: the dual separates points, and for every vector there is a norm-one functional attaining the vector's norm. Its geometric form separates disjoint convex sets by a hyperplane — the analytic backbone of convex duality, optimization, and the theory of weak topologies.`,
    statement: String.raw`**(Analytic form, real case.)** Let $X$ be a real vector space and $p : X \to \mathbb{R}$ sublinear ($p(x+y) \le p(x)+p(y)$, $p(\lambda x) = \lambda p(x)$ for $\lambda \ge 0$). If $f$ is a linear functional on a subspace $M \subseteq X$ with $f \le p$ on $M$, then $f$ extends to a linear $F$ on $X$ with $F \le p$ everywhere. **(Normed corollary.)** A bounded functional on a subspace of a normed space extends to all of $X$ with the same norm; consequently for each $x_0 \neq 0$ there is $f \in X^*$ with $\lVert f\rVert = 1$ and $f(x_0) = \lVert x_0\rVert$.`,
    proof: String.raw`*One-step extension.* Suppose $f \le p$ on $M$ and $x_0 \notin M$. We extend $f$ to $M' = M \oplus \mathbb{R}x_0$ by choosing $f(x_0) =: c$ subject to $f(m) + tc \le p(m + tx_0)$ for all $m \in M$, $t \in \mathbb{R}$. For $t > 0$ this rearranges to $c \le p(m/t + x_0) - f(m/t)$; for $t < 0$, writing $s = |t|$ and $m' = m/s$, it rearranges to $f(m') - c \le p(m' - x_0)$, i.e. $c \ge f(m') - p(m' - x_0)$. So a valid $c$ exists iff $\sup_{u \in M}\bigl(f(u) - p(u - x_0)\bigr) \le \inf_{w \in M}\bigl(p(w + x_0) - f(w)\bigr)$. For any $u, w \in M$, sublinearity gives $f(u) + f(w) = f(u + w) \le p(u + w) \le p(u - x_0) + p(w + x_0)$, which rearranges to exactly $f(u) - p(u - x_0) \le p(w + x_0) - f(w)$; taking sup over $u$ and inf over $w$ yields the needed inequality, so a suitable $c$ exists and $f \le p$ on $M'$.

*Maximal extension.* Order the pairs $(N, g)$ with $M \subseteq N \subseteq X$, $g|_M = f$, $g \le p$ on $N$, by extension. Any chain has the union as an upper bound (a linear functional dominated by $p$ on the union of the domains). By **Zorn's lemma** there is a maximal pair $(N^*, F)$. If $N^* \neq X$, the one-step extension above would enlarge it, contradicting maximality; hence $N^* = X$ and $F \le p$ on $X$.

*Normed corollary.* Take $p(x) = \lVert f\rVert_M\,\lVert x\rVert$, which is sublinear; on $M$, $f(x) \le |f(x)| \le \lVert f\rVert_M\lVert x\rVert = p(x)$. The extension $F$ satisfies $F(x) \le \lVert f\rVert_M\lVert x\rVert$ and, applying this to $-x$, $|F(x)| \le \lVert f\rVert_M\lVert x\rVert$, so $\lVert F\rVert \le \lVert f\rVert_M$; the reverse holds as $F$ extends $f$. For the norming functional, apply this with $M = \mathbb{R}x_0$ and $f(tx_0) = t\lVert x_0\rVert$, of norm $1$. (The complex case follows by extending the real part and recombining; sublinearity is replaced by a seminorm.)

*Geometric form (downstream consequence).* The analytic form yields a separation theorem: two disjoint nonempty convex sets, one open, can be separated by a closed hyperplane. Sketch of the standard derivation (the dedicated separating-hyperplane node, which therefore depends on this theorem, carries the details): given disjoint convex $A$ (open) and $B$, the difference $C = A - B$ is open, convex, and avoids $0$; let $p$ be its Minkowski gauge $p(x) = \inf\{\,t > 0 : x/t \in C - c_0\,\}$ relative to an interior basepoint, a sublinear functional with $p < 1$ exactly on the translate of $C$. Defining a linear functional on the line through the point separating $A$ from $B$ and dominating it by $p$, the analytic form extends it to all of $X$ with $f \le p$; the level set $\{f = c\}$ is then the separating hyperplane. The direction of dependence is essential: this geometric form is derived *from* the analytic Hahn–Banach extension, not assumed. $\square$`,
  },
  {
    id: 'banach-alaoglu',
    label: 'Banach–Alaoglu',
    title: 'Banach–Alaoglu Theorem',
    kind: 'theorem',
    tags: ['Functional Analysis'],
    dependencies: ['dual-space', 'weak-topology', 'compactness'],
    description: String.raw`In infinite dimensions the closed unit ball is never norm-compact, which costs the existence arguments that compactness usually supplies. The Banach–Alaoglu theorem recovers compactness in a weaker topology: the closed unit ball of the dual space is compact in the weak-$*$ topology. This is what lets bounded sequences of functionals (or measures) have convergent subnets, and it underpins existence theorems throughout the calculus of variations and PDE theory.`,
    statement: String.raw`Let $X$ be a normed space. The closed unit ball $B^* = \{\,f \in X^* : \lVert f\rVert \le 1\,\}$ of the dual is **compact** in the weak-$*$ topology.`,
    proof: String.raw`Each $f \in B^*$ satisfies $|f(x)| \le \lVert x\rVert$, so $f(x)$ lies in the compact disc $D_x = \{\,z : |z| \le \lVert x\rVert\,\}$. Consider the product space $P = \prod_{x \in X} D_x$ with the product topology; by **Tychonoff's theorem** $P$ is **compact**. The map $\Phi : B^* \to P$, $\Phi(f) = (f(x))_{x \in X}$, is injective and is exactly a homeomorphism onto its image when $B^*$ carries the weak-$*$ topology, since both topologies are the topology of pointwise convergence on $X$ (the **weak-$*$ topology**). It remains to see $\Phi(B^*)$ is closed in $P$, hence compact. A point $(t_x)_{x} \in P$ lies in $\Phi(B^*)$ iff the assignment $x \mapsto t_x$ is linear, i.e. $t_{x+y} = t_x + t_y$ and $t_{\lambda x} = \lambda t_x$ for all $x, y, \lambda$. Each of these is a closed condition: the maps $(t_x) \mapsto t_{x+y} - t_x - t_y$ and $(t_x)\mapsto t_{\lambda x} - \lambda t_x$ are continuous on $P$ (they depend on finitely many coordinates) and we require them to vanish, so $\Phi(B^*)$ is an intersection of closed sets, hence closed. A closed subset of a compact space is compact, so $B^*$ is weak-$*$ compact. $\square$`,
  },
  {
    id: 'weak-topology',
    label: 'Weak Topology',
    title: 'Weak & Weak-* Topologies',
    kind: 'definition',
    tags: ['Functional Analysis'],
    dependencies: ['dual-space'],
    description: String.raw`Norm convergence is often too strong to obtain in infinite dimensions. The weak topology asks only that all the linear measurements converge: a sequence converges weakly when every bounded functional sees it converge. On the dual one uses the original space to test convergence, giving the weak-$*$ topology. These coarser topologies sacrifice some continuity but buy back compactness — the closed unit ball, never norm-compact in infinite dimensions, becomes weak-$*$ compact — which is precisely what existence proofs need.`,
    definition: String.raw`The **weak topology** on a normed space $X$ is the coarsest topology making every $f \in X^*$ continuous; equivalently it has subbasic open sets $\{\,x : |f(x) - f(x_0)| < \varepsilon\,\}$. Net (or sequential) convergence $x_n \rightharpoonup x$ means $f(x_n) \to f(x)$ for all $f \in X^*$. The **weak-$*$ topology** on the dual $X^*$ is the coarsest topology making every evaluation $\hat x : f \mapsto f(x)$ (for $x \in X$) continuous; $f_n \xrightarrow{w*} f$ means $f_n(x) \to f(x)$ for all $x \in X$. Both are the topology of pointwise convergence on the relevant testing set.`,
  },

  // ── Baire-category theorems ────────────────────────────────────────────────
  {
    id: 'baire-category-theorem',
    label: 'Baire Category',
    title: 'Baire Category Theorem',
    kind: 'theorem',
    tags: ['Functional Analysis'],
    dependencies: ['complete-metric-space', 'cauchy-sequence'],
    description: String.raw`Completeness has a topological consequence with enormous leverage: a complete metric space cannot be assembled from countably many "thin" pieces. Precisely, a countable union of nowhere-dense sets has empty interior, or dually, a countable intersection of dense open sets is again dense. This single statement is the engine behind the three cornerstone theorems of functional analysis — uniform boundedness, the open mapping theorem, and the closed graph theorem — and behind a host of existence proofs that produce a point avoiding all of countably many obstructions.`,
    statement: String.raw`Let $(X, d)$ be a non-empty **complete metric space**. If $(U_n)_{n \ge 1}$ are dense open subsets of $X$, then $\bigcap_n U_n$ is dense in $X$. Equivalently, $X$ is not a countable union of nowhere-dense sets (it is not *meager* in itself).`,
    proof: String.raw`Let $W$ be any non-empty open set; we find a point of $W \cap \bigcap_n U_n$. Since $U_1$ is dense and open, $W \cap U_1$ is non-empty and open, so it contains a closed ball $\overline{B}(x_1, r_1)$ with $0 < r_1 < 1$. Inductively, since $U_{n+1}$ is dense and open, $B(x_n, r_n) \cap U_{n+1}$ is non-empty and open and contains a closed ball $\overline{B}(x_{n+1}, r_{n+1})$ with $0 < r_{n+1} < r_n/2$. The centers form a **Cauchy sequence**: for $m > n$, $x_m \in B(x_n, r_n)$, so $d(x_n, x_m) < r_n \le 2^{-(n-1)} \to 0$. By **completeness** $x_n \to x$ for some $x \in X$. For each $n$, all $x_m$ with $m \ge n$ lie in the closed ball $\overline{B}(x_n, r_n)$, hence so does the limit: $x \in \overline{B}(x_n, r_n) \subseteq U_n$ and $x \in \overline{B}(x_1, r_1) \subseteq W$. Thus $x \in W \cap \bigcap_n U_n$, proving density. The dual statement follows by complementation: if $X = \bigcup_n A_n$ with each $A_n$ nowhere dense, then the $U_n = X \setminus \overline{A_n}$ are dense open with empty intersection, contradicting the above. $\square$`,
  },
  {
    id: 'uniform-boundedness-principle',
    label: 'Uniform Boundedness',
    title: 'Uniform Boundedness Principle',
    kind: 'theorem',
    tags: ['Functional Analysis'],
    dependencies: ['bounded-linear-operator', 'banach-space', 'baire-category-theorem'],
    description: String.raw`The uniform boundedness principle (Banach–Steinhaus) upgrades pointwise control to uniform control. If a family of operators out of a Banach space is bounded at each individual point, then it is bounded uniformly in operator norm. The leverage comes from Baire category: the set of points where the family is "large" cannot be everywhere thin, so completeness forces a single ball on which all operators are simultaneously controlled. It is the reason, for example, that a pointwise limit of bounded operators is again bounded.`,
    statement: String.raw`Let $X$ be a **Banach space**, $Y$ a normed space, and $\{T_\alpha\}_{\alpha \in A} \subseteq \mathcal{B}(X, Y)$ a family of bounded operators. If $\sup_\alpha \lVert T_\alpha x\rVert < \infty$ for every $x \in X$ (pointwise boundedness), then $\sup_\alpha \lVert T_\alpha\rVert < \infty$ (uniform boundedness).`,
    proof: String.raw`For $n \ge 1$ set $E_n = \{\,x \in X : \sup_\alpha \lVert T_\alpha x\rVert \le n\,\} = \bigcap_\alpha \{\,x : \lVert T_\alpha x\rVert \le n\,\}$. Each set $\{x : \lVert T_\alpha x\rVert \le n\}$ is closed (preimage of $[0,n]$ under the continuous map $x \mapsto \lVert T_\alpha x\rVert$), so $E_n$ is closed. By pointwise boundedness every $x$ lies in some $E_n$, so $X = \bigcup_n E_n$. By the **Baire category theorem** (using that $X$ is a complete metric space, as a **Banach space**), the complete space $X$ is not meager, so some $E_N$ is not nowhere dense; being closed, $E_N$ then has non-empty interior, containing a ball $\overline{B}(x_0, r)$ with $r > 0$.

For every $\alpha$ and every $\lVert u\rVert \le r$, both $x_0$ and $x_0 + u$ lie in $E_N$, so $\lVert T_\alpha u\rVert = \lVert T_\alpha(x_0 + u) - T_\alpha x_0\rVert \le \lVert T_\alpha(x_0+u)\rVert + \lVert T_\alpha x_0\rVert \le 2N$. Scaling: for any $\lVert x\rVert \le 1$, $rx$ has norm $\le r$, so $\lVert T_\alpha x\rVert = \tfrac{1}{r}\lVert T_\alpha(rx)\rVert \le 2N/r$. Hence $\lVert T_\alpha\rVert \le 2N/r$ for all $\alpha$, giving $\sup_\alpha\lVert T_\alpha\rVert \le 2N/r < \infty$. $\square$`,
  },
  {
    id: 'open-mapping-theorem',
    label: 'Open Mapping',
    title: 'Open Mapping Theorem',
    kind: 'theorem',
    tags: ['Functional Analysis'],
    dependencies: ['banach-space', 'bounded-linear-operator', 'baire-category-theorem'],
    description: String.raw`A surjective bounded operator between Banach spaces cannot collapse open sets to non-open ones: it is an open map. The immediate corollary is the bounded inverse theorem — a continuous linear bijection between Banach spaces has a continuous inverse, so it is automatically a topological isomorphism. The proof again runs through Baire category: surjectivity makes the image of the unit ball "thick," and completeness of the target converts this into a genuine neighbourhood of the origin.`,
    statement: String.raw`Let $X, Y$ be **Banach spaces** and $T \in \mathcal{B}(X, Y)$ surjective. Then $T$ is an **open map**: $T$ carries open sets to open sets. In particular, if $T$ is also injective, then $T^{-1}$ is bounded (the **bounded inverse theorem**).`,
    proof: String.raw`Write $B_X(r)$ for the open ball of radius $r$ in $X$, similarly in $Y$. It suffices to show $T(B_X(1))$ contains a ball $B_Y(\delta)$; openness in general follows by translation and scaling.

*Step 1 (Baire).* Since $T$ is onto, $Y = \bigcup_{n} \overline{T(B_X(n))}$. By the **Baire category theorem** (Y being complete as a **Banach space**) some $\overline{T(B_X(n))}$ has non-empty interior; scaling, $\overline{T(B_X(1))}$ has non-empty interior, containing some ball $B_Y(y_0, \eta)$. By symmetry $\overline{T(B_X(1))}$ also contains $B_Y(-y_0, \eta)$, and since it is convex and symmetric it contains $B_Y(0, \eta)$: indeed $\tfrac12\bigl(B_Y(y_0,\eta) + B_Y(-y_0,\eta)\bigr) = B_Y(0,\eta)$. So $B_Y(2\delta) \subseteq \overline{T(B_X(1))}$ with $\delta = \eta/2$.

*Step 2 (remove the closure).* We show $B_Y(\delta) \subseteq T(B_X(1))$. Fix $y$ with $\lVert y\rVert < \delta$. Step 1 gives $B_Y(2\delta) \subseteq \overline{T(B_X(1))}$, whose rescaling by $2^{-(k+1)}$ is $B_Y(\delta 2^{-k}) \subseteq \overline{T(B_X(2^{-(k+1)}))}$ for every $k \ge 0$. Pick $x_0 \in B_X(1/2)$ with $\lVert y - Tx_0\rVert < \delta/2$ (possible as $y \in B_Y(\delta) \subseteq \overline{T(B_X(1/2))}$, the $k = 0$ case). Inductively, given $\lVert y - T(x_0 + \cdots + x_{k-1})\rVert < \delta 2^{-k}$, choose $x_k \in B_X(2^{-(k+1)})$ with $\lVert y - T(x_0 + \cdots + x_k)\rVert < \delta 2^{-(k+1)}$. Then $\sum_k \lVert x_k\rVert < \sum_k 2^{-(k+1)} = 1$, so by completeness of $X$ (Banach: absolutely convergent series converge) $x = \sum_k x_k$ exists with $\lVert x\rVert < 1$, and by continuity $Tx = \lim_K T(\sum_{k \le K} x_k) = y$. Hence $y \in T(B_X(1))$, proving $B_Y(\delta) \subseteq T(B_X(1))$ and so $T$ is open.

*Bounded inverse.* If $T$ is a bijection, openness of $T$ means $T^{-1}$ is continuous (preimages under $T^{-1}$ of open sets are images under $T$ of open sets, hence open); a continuous linear map is bounded by **bounded-linear-operator**. $\square$`,
  },
  {
    id: 'closed-graph-theorem',
    label: 'Closed Graph',
    title: 'Closed Graph Theorem',
    kind: 'theorem',
    tags: ['Functional Analysis'],
    dependencies: ['banach-space', 'bounded-linear-operator', 'open-mapping-theorem'],
    description: String.raw`Verifying continuity of a linear map directly can be awkward; the closed graph theorem replaces it with a frequently easier check on the map's graph. For a linear map between Banach spaces, boundedness is equivalent to the graph being closed — meaning that whenever inputs converge and their images also converge, the limit of the images is the image of the limit. One no longer has to assume the images converge to the right thing in advance; mere closedness of the graph delivers continuity, courtesy of the open mapping theorem.`,
    statement: String.raw`Let $X, Y$ be **Banach spaces** and $T : X \to Y$ linear. Then $T$ is bounded if and only if its graph $\Gamma(T) = \{\,(x, Tx) : x \in X\,\}$ is closed in $X \times Y$ — i.e. whenever $x_n \to x$ and $Tx_n \to y$, one has $y = Tx$.`,
    proof: String.raw`($\Rightarrow$) If $T$ is bounded (hence continuous) and $x_n \to x$, $Tx_n \to y$, then $Tx_n \to Tx$ by continuity, so $y = Tx$ by uniqueness of limits; the graph is closed.

($\Leftarrow$) Equip $X \times Y$ with the norm $\lVert (x, y)\rVert = \lVert x\rVert + \lVert y\rVert$, under which it is a **Banach space** (a Cauchy sequence is coordinatewise Cauchy, and each coordinate converges by completeness of $X$, $Y$). If $\Gamma(T)$ is closed, it is a closed subspace of the Banach space $X \times Y$, hence itself a Banach space. Consider the two coordinate projections restricted to $\Gamma(T)$:
$$\pi_1 : \Gamma(T) \to X,\ (x, Tx) \mapsto x, \qquad \pi_2 : \Gamma(T) \to Y,\ (x, Tx) \mapsto Tx.$$
Both are bounded ($\lVert \pi_i(x,Tx)\rVert \le \lVert(x,Tx)\rVert$). The map $\pi_1$ is a linear bijection $\Gamma(T) \to X$ (its inverse is $x \mapsto (x, Tx)$). By the **open mapping theorem** (bounded inverse form), $\pi_1^{-1} : X \to \Gamma(T)$, $x \mapsto (x, Tx)$, is bounded. Therefore $T = \pi_2 \circ \pi_1^{-1}$ is a composition of bounded operators, hence bounded. $\square$`,
  },

  // ── Hilbert space structure ────────────────────────────────────────────────
  {
    id: 'orthogonal-projection',
    label: 'Orthogonal Projection',
    title: 'Orthogonal Complement & Projection',
    kind: 'theorem',
    tags: ['Functional Analysis'],
    dependencies: ['hilbert-space', 'parallelogram-law', 'convex-set'],
    description: String.raw`Completeness plus the inner product geometry yields the central structural fact of Hilbert space theory: a closed subspace and its orthogonal complement split the whole space. Every vector decomposes uniquely into a part inside the subspace and a part perpendicular to it. The component inside is the nearest point of the subspace — the best approximation — and the map sending a vector to that nearest point is the orthogonal projection. This is the abstract source of least-squares approximation and of conditional expectation in probability.`,
    statement: String.raw`Let $H$ be a **Hilbert space** and $M \subseteq H$ a closed subspace. Then $H = M \oplus M^\perp$, where $M^\perp = \{\,y : \langle y, m\rangle = 0\ \forall m \in M\,\}$: every $x \in H$ has a unique decomposition $x = Px + (x - Px)$ with $Px \in M$ and $x - Px \in M^\perp$. Moreover $Px$ is the unique nearest point of $M$ to $x$, and $P$ is a bounded linear operator with $\lVert P\rVert \le 1$ (and $\lVert P\rVert = 1$ when $M \neq \{0\}$).`,
    proof: String.raw`*Nearest point exists.* Let $d = \inf_{m \in M}\lVert x - m\rVert$ and take $m_n \in M$ with $\lVert x - m_n\rVert \to d$. By the **parallelogram law** applied to $u = x - m_n$, $v = x - m_k$,
$$\lVert m_n - m_k\rVert^2 = 2\lVert x - m_n\rVert^2 + 2\lVert x - m_k\rVert^2 - 4\bigl\lVert x - \tfrac{m_n + m_k}{2}\bigr\rVert^2 \le 2\lVert x - m_n\rVert^2 + 2\lVert x - m_k\rVert^2 - 4d^2,$$
since $\tfrac{m_n+m_k}{2} \in M$ (here $M$ is **convex**, being a subspace) gives $\lVert x - \tfrac{m_n+m_k}{2}\rVert \ge d$. The right side $\to 2d^2 + 2d^2 - 4d^2 = 0$, so $(m_n)$ is Cauchy; by completeness of $H$ and closedness of $M$, $m_n \to p \in M$ with $\lVert x - p\rVert = d$.

*Orthogonality of the residual.* Let $z = x - p$. For any $m \in M$ and $t \in \mathbb{R}$, $p + tm \in M$, so $d^2 \le \lVert x - p - tm\rVert^2 = d^2 - 2t\,\operatorname{Re}\langle z, m\rangle + t^2\lVert m\rVert^2$. Thus $-2t\operatorname{Re}\langle z,m\rangle + t^2\lVert m\rVert^2 \ge 0$ for all $t$, which forces $\operatorname{Re}\langle z, m\rangle = 0$; replacing $m$ by $im$ (complex case) kills the imaginary part too, so $z \perp M$, i.e. $z \in M^\perp$. Set $Px = p$.

*Uniqueness and directness.* If $x = p + z = p' + z'$ with $p, p' \in M$ and $z, z' \in M^\perp$, then $p - p' = z' - z \in M \cap M^\perp$; but $w \in M \cap M^\perp$ satisfies $\langle w, w\rangle = 0$, so $w = 0$. Hence $p = p'$, $z = z'$, and $M \cap M^\perp = \{0\}$, so the sum is direct.

*Linearity, boundedness.* Uniqueness makes $P$ well defined; $P(ax + by) = aPx + bPy$ follows since $aPx + bPy \in M$ and $a(x - Px) + b(y - Py) \in M^\perp$ decompose $ax + by$. By the Pythagorean identity $\lVert x\rVert^2 = \lVert Px\rVert^2 + \lVert x - Px\rVert^2 \ge \lVert Px\rVert^2$, so $\lVert Px\rVert \le \lVert x\rVert$, giving $\lVert P\rVert \le 1$; for $0 \neq m \in M$, $Pm = m$ gives $\lVert P\rVert = 1$. $\square$`,
  },
  {
    id: 'riesz-representation-hilbert',
    label: 'Riesz Representation',
    title: 'Riesz Representation Theorem',
    kind: 'theorem',
    tags: ['Functional Analysis'],
    dependencies: ['hilbert-space', 'dual-space', 'orthogonal-projection', 'cauchy-schwarz'],
    description: String.raw`A Hilbert space is, up to a conjugation, its own dual. Every bounded linear functional is "take the inner product against a fixed vector," and that representing vector is unique and has the same norm as the functional. The proof is geometric: the kernel of a nonzero functional is a closed hyperplane, and its one-dimensional orthogonal complement supplies the representing direction. This self-duality is what makes Hilbert space methods so powerful and is the basis of the weak (variational) formulation of differential equations via the Lax–Milgram theorem.`,
    statement: String.raw`Let $H$ be a **Hilbert space** and $f \in H^*$ a bounded linear functional. Then there is a unique $y \in H$ with
$$f(x) = \langle x, y\rangle \quad \text{for all } x \in H, \qquad \text{and} \qquad \lVert f\rVert = \lVert y\rVert.$$
The map $f \mapsto y$ is a (conjugate-linear in the complex case) isometric isomorphism $H^* \cong H$.`,
    proof: String.raw`If $f = 0$, take $y = 0$. Otherwise let $M = \ker f = \{\,x : f(x) = 0\,\}$, a proper closed subspace (closed since $f$ is continuous by **dual-space**, proper since $f \neq 0$). By **orthogonal-projection**, $H = M \oplus M^\perp$ with $M^\perp \neq \{0\}$; choose a unit vector $z \in M^\perp$. For any $x \in H$, the vector $f(x)\,z - f(z)\,x$ lies in $\ker f$ (apply $f$: $f(x)f(z) - f(z)f(x) = 0$), hence is orthogonal to $z$:
$$0 = \langle f(x)z - f(z)x,\ z\rangle = f(x)\langle z, z\rangle - f(z)\langle x, z\rangle = f(x) - f(z)\langle x, z\rangle.$$
Thus $f(x) = f(z)\langle x, z\rangle = \langle x,\ \overline{f(z)}\,z\rangle$, so $y = \overline{f(z)}\,z$ represents $f$.

*Norm.* By **Cauchy–Schwarz**, $|f(x)| = |\langle x, y\rangle| \le \lVert x\rVert\lVert y\rVert$, so $\lVert f\rVert \le \lVert y\rVert$; and $f(y/\lVert y\rVert) = \langle y, y\rangle/\lVert y\rVert = \lVert y\rVert$ shows $\lVert f\rVert \ge \lVert y\rVert$. Hence $\lVert f\rVert = \lVert y\rVert$.

*Uniqueness (injectivity).* If $\langle x, y\rangle = \langle x, y'\rangle$ for all $x$, then $\langle x, y - y'\rangle = 0$ for all $x$; taking $x = y - y'$ gives $\lVert y - y'\rVert^2 = 0$, so $y = y'$. Hence $f \mapsto y$ is injective.

*Surjectivity.* Conversely every $y \in H$ is the representative of some functional: the map $x \mapsto \langle x, y\rangle$ is linear and, by **Cauchy–Schwarz**, bounded (with norm $\lVert y\rVert$), so it is an element $f_y \in H^*$ whose representative is exactly $y$. Thus the assignment $f \mapsto y$ is a bijection $H^* \to H$, isometric by the norm identity, and conjugate-linear: the representative of $af + bg$ is $\bar a y_f + \bar b y_g$, since $\langle x, \bar a y_f + \bar b y_g\rangle = a\langle x, y_f\rangle + b\langle x, y_g\rangle = (af + bg)(x)$. $\square$`,
  },

  // ── Spectral theory ────────────────────────────────────────────────────────
  {
    id: 'adjoint-operator',
    label: 'Adjoint Operator',
    title: 'Adjoint Operator',
    kind: 'definition',
    tags: ['Functional Analysis'],
    dependencies: ['bounded-linear-operator', 'hilbert-space', 'riesz-representation-hilbert', 'cauchy-schwarz'],
    description: String.raw`The adjoint is the Hilbert-space avatar of the conjugate transpose of a matrix: it is the operator that lets you move $T$ across the inner product. Its existence is guaranteed by the Riesz representation theorem, which converts the functional "pair against $Ty$" into pairing against a single vector. The adjoint singles out the most important operator classes — self-adjoint, unitary, and normal — which are exactly the ones for which the spectral theorem gives a clean diagonalization, and it is indispensable in quantum mechanics, where observables are self-adjoint operators.`,
    definition: String.raw`Let $T \in \mathcal{B}(H, K)$ be a bounded operator between **Hilbert spaces**. Its **adjoint** is the unique $T^* \in \mathcal{B}(K, H)$ with
$$\langle T x, y\rangle_K = \langle x, T^* y\rangle_H \quad \text{for all } x \in H,\ y \in K.$$
An operator $T \in \mathcal{B}(H)$ is **self-adjoint** if $T = T^*$, **unitary** if $T^*T = TT^* = I$, and **normal** if $TT^* = T^*T$.`,
    proof: String.raw`**Existence, uniqueness, boundedness.** Fix $y \in K$. The map $x \mapsto \langle Tx, y\rangle$ is a bounded linear functional on $H$ (bounded by $\lVert T\rVert\lVert y\rVert$ via Cauchy–Schwarz). By the **Riesz representation theorem** there is a unique vector, call it $T^*y$, with $\langle Tx, y\rangle = \langle x, T^*y\rangle$ for all $x$; uniqueness of the representative makes $T^*$ well defined. Linearity of $T^*$: for all $x$, $\langle x, T^*(ay_1 + by_2)\rangle = \langle Tx, ay_1+by_2\rangle = \bar a\langle Tx,y_1\rangle + \bar b\langle Tx,y_2\rangle = \langle x, aT^*y_1 + bT^*y_2\rangle$, and since $x$ is arbitrary, $T^*(ay_1+by_2) = aT^*y_1 + bT^*y_2$. Boundedness: $\lVert T^*y\rVert^2 = \langle T^*y, T^*y\rangle = \langle TT^*y, y\rangle \le \lVert T\rVert\lVert T^*y\rVert\lVert y\rVert$, so $\lVert T^*y\rVert \le \lVert T\rVert\lVert y\rVert$, giving $\lVert T^*\rVert \le \lVert T\rVert$ (and equality follows by applying the same to $T^{**} = T$). $\square$`,
  },
  {
    id: 'compact-operator',
    label: 'Compact Operator',
    title: 'Compact Operator',
    kind: 'definition',
    tags: ['Functional Analysis'],
    dependencies: ['bounded-linear-operator', 'banach-space', 'compactness', 'hilbert-basis', 'orthogonal-projection', 'heine-borel'],
    description: String.raw`Compact operators are the infinite-dimensional objects that behave most like matrices. They send bounded sets to sets with compact closure, so they "almost" reduce infinite dimensions to finite ones — on a Hilbert space they are exactly the norm-limits of finite-rank operators. Their spectral behaviour is correspondingly tame: the nonzero spectrum consists of eigenvalues that can pile up only at $0$. This is the setting of integral equations and the Fredholm alternative, which determines exactly when an equation $(I - K)x = y$ is solvable.`,
    definition: String.raw`A bounded operator $T \in \mathcal{B}(X, Y)$ between **Banach spaces** is **compact** if the image $T(B)$ of the closed unit ball $B \subseteq X$ has **compact** closure in $Y$ — equivalently, every bounded sequence $(x_n)$ in $X$ has a subsequence with $(Tx_{n_k})$ convergent in $Y$. The compact operators form a closed subspace of $\mathcal{B}(X, Y)$; on a Hilbert space they coincide with the norm-closure of the finite-rank operators.`,
    proof: String.raw`**The compact operators form a closed subspace of $\mathcal{B}(X, Y)$, and a closed two-sided ideal of $\mathcal{B}(H)$.** The two characterizations agree by the metric-space equivalence of compactness and sequential compactness from **compactness**. Sums and scalar multiples of compact operators are compact (a diagonal-subsequence argument extracts a single subsequence making both $Tx_{n_k}$ and $Sx_{n_k}$ converge), so they form a subspace. Closedness: suppose $T_n \to T$ in operator norm with each $T_n$ compact, and let $(x_m)$ be bounded by $C$. By a diagonal argument choose a subsequence on which every $T_n x_{m_k}$ converges; then for that subsequence $\lVert Tx_{m_k} - Tx_{m_l}\rVert \le \lVert (T - T_n)x_{m_k}\rVert + \lVert T_n x_{m_k} - T_n x_{m_l}\rVert + \lVert(T_n - T)x_{m_l}\rVert \le 2C\lVert T - T_n\rVert + \lVert T_n x_{m_k} - T_n x_{m_l}\rVert$, which can be made $< \varepsilon$ by first fixing $n$ large then $k, l$ large. So $(Tx_{m_k})$ is Cauchy, hence convergent by completeness, and $T$ is compact.

*Ideal property.* Let $T$ be compact and $S$ bounded. Then $S$ maps the unit ball $B$ into the bounded set $\lVert S\rVert B$, so $TS(B) \subseteq T(\lVert S\rVert B)$, whose closure is compact (image of a bounded set under the compact $T$); hence $TS$ is compact. And $S$, being continuous, sends the relatively compact set $\overline{T(B)}$ to a relatively compact set, so $ST(B) \subseteq S(\overline{T(B)})$ has compact closure; hence $ST$ is compact. Thus the compact operators absorb composition on both sides — a two-sided ideal.

*Finite-rank and the Hilbert reverse inclusion.* Finite-rank operators are compact (a bounded set maps into a bounded subset of a finite-dimensional space, where closed bounded sets are compact), so their norm-closure consists of compact operators. For the reverse inclusion on an arbitrary Hilbert space $H$ (no separability assumed): a compact $T$ has separable range. Indeed $\overline{T(B)}$ is compact, hence totally bounded, hence separable, so $T(B)$ — and with it $T(X) = \bigcup_{n} T(nB)$ — is separable; let $H_0 = \overline{\operatorname{span}}\,T(X)$, a *separable* closed subspace of $H$ containing the whole range of $T$. Inside $H_0$ choose a *countable* **orthonormal basis** (by **hilbert-basis**, which a separable space admits as a sequence) and the finite-rank **orthogonal-projection**s $P_n$ onto the span of its first $n$ vectors, so $P_n \to I_{H_0}$ strongly. Put $T_n = P_n T$, which is finite-rank (range inside the span of $n$ vectors) and well defined since $T$ maps into $H_0$. Then $\lVert T_n - T\rVert = \sup_{\lVert x\rVert \le 1}\lVert (I_{H_0} - P_n)Tx\rVert = \sup_{y \in T(B)}\lVert (I_{H_0} - P_n)y\rVert \to 0$, because $\overline{T(B)} \subseteq H_0$ is compact (hence totally bounded) and the equicontinuous family $(I_{H_0} - P_n)$ — each of norm $\le 1$ — converges to $0$ uniformly on a totally bounded set on which it converges pointwise. So every compact $T$ on $H$ is a norm-limit of finite-rank operators. $\square$`,
  },
  {
    id: 'spectrum-of-an-operator',
    label: 'Spectrum',
    title: 'Spectrum of an Operator',
    kind: 'definition',
    tags: ['Functional Analysis'],
    dependencies: ['bounded-linear-operator', 'banach-space', 'eigenvalue-eigenvector', 'liouville-theorem'],
    description: String.raw`The spectrum generalizes the set of eigenvalues to infinite dimensions, where invertibility — not just injectivity — is the right test. A scalar belongs to the spectrum when $T - \lambda I$ fails to have a bounded inverse, which can happen in subtler ways than the existence of an eigenvector: the operator may be injective with dense but non-closed range. The spectrum is always a non-empty compact subset of the disc of radius $\lVert T\rVert$, and its geometry controls the long-term behaviour of the operator under iteration and exponentiation.`,
    definition: String.raw`Let $T \in \mathcal{B}(X)$ on a complex **Banach space** $X$. The **resolvent set** is $\rho(T) = \{\,\lambda \in \mathbb{C} : T - \lambda I \text{ has a bounded inverse}\,\}$, and the **spectrum** is its complement $\sigma(T) = \mathbb{C} \setminus \rho(T)$. It decomposes as: the **point spectrum** (eigenvalues, where $T - \lambda I$ is not injective — generalizing **eigenvalue-eigenvector**), the **continuous spectrum** (injective with dense, non-closed range), and the **residual spectrum** (injective with non-dense range). One has $\sigma(T) \subseteq \{\,\lambda : |\lambda| \le \lVert T\rVert\,\}$, and $\sigma(T)$ is non-empty and compact.`,
    proof: String.raw`**$\sigma(T)$ is closed, bounded by $\lVert T\rVert$, and non-empty.** *Boundedness:* if $|\lambda| > \lVert T\rVert$ then $\lVert T/\lambda\rVert < 1$, so the **Neumann series** $\sum_{k\ge 0}(T/\lambda)^k$ converges in the Banach space $\mathcal{B}(X)$ (it is absolutely convergent, $\sum_k \lVert T\rVert^k/|\lambda|^k < \infty$) and its sum $S$ satisfies $(I - T/\lambda)S = I$, whence $(\lambda I - T)^{-1} = \lambda^{-1}S$ is bounded; thus $\lambda \in \rho(T)$. So $\sigma(T) \subseteq \{|\lambda| \le \lVert T\rVert\}$. *Openness of $\rho(T)$* (hence closedness of $\sigma(T)$): if $T - \lambda_0 I$ is invertible and $|\lambda - \lambda_0|$ is small, then $T - \lambda I = (T - \lambda_0 I)\bigl(I - (\lambda - \lambda_0)(T - \lambda_0 I)^{-1}\bigr)$ is a product of invertibles by the same Neumann-series argument. Thus $\sigma(T)$ is closed and bounded, i.e. compact. *Non-emptiness:* the resolvent $\lambda \mapsto (T - \lambda I)^{-1}$ is an analytic $\mathcal{B}(X)$-valued function on $\rho(T)$ tending to $0$ as $|\lambda|\to\infty$; were $\sigma(T)$ empty it would be entire and bounded, hence constant $= 0$ by the vector-valued **Liouville theorem**, which is absurd. $\square$`,
  },
  {
    id: 'spectral-theorem-operators',
    label: 'Spectral Theorem (Operators)',
    title: 'Spectral Theorem for Operators',
    kind: 'theorem',
    tags: ['Functional Analysis'],
    dependencies: ['adjoint-operator', 'compact-operator', 'spectrum-of-an-operator', 'hilbert-basis', 'spectral-theorem'],
    description: String.raw`The spectral theorem is the infinite-dimensional analogue of diagonalizing a symmetric matrix. In its cleanest form — for a compact self-adjoint operator — it produces an orthonormal basis of eigenvectors with real eigenvalues that can only accumulate at $0$, so the operator acts as an explicit weighted sum of rank-one projections. For general bounded normal operators it takes the multiplier form: the operator is unitarily equivalent to multiplication by a bounded function on an $L^2$ space, real-valued exactly when the operator is self-adjoint. The unbounded self-adjoint version is the mathematical foundation of quantum mechanics.`,
    statement: String.raw`**(Compact self-adjoint form.)** Let $T$ be a compact self-adjoint operator on a Hilbert space $H \neq \{0\}$. Then $H$ has an **orthonormal basis** of eigenvectors of $T$ with real eigenvalues; the nonzero eigenvalues form a (finite or null) sequence $\lambda_n \to 0$, each of finite multiplicity, and
$$T x = \sum_n \lambda_n \langle x, e_n\rangle\, e_n.$$
**(General normal form.)** A bounded normal operator $N$ on $H$ is unitarily equivalent to multiplication by a bounded measurable function $\varphi$ on some $L^2(\Omega, \mu)$; $\varphi$ is real-valued iff $N$ is self-adjoint, $|\varphi| = 1$ iff $N$ is unitary. Then $\sigma(N) = \operatorname{ess\,range}(\varphi)$.`,
    proof: String.raw`*Compact self-adjoint case.* First, eigenvalues are real and eigenvectors for distinct eigenvalues are orthogonal: if $Tv = \lambda v$ with $v \neq 0$ then $\lambda\lVert v\rVert^2 = \langle Tv, v\rangle = \langle v, T^*v\rangle = \langle v, Tv\rangle = \overline{\lambda}\lVert v\rVert^2$ (using **adjoint-operator** and $T = T^*$), so $\lambda \in \mathbb{R}$; and $\lambda\langle u, v\rangle = \langle Tu, v\rangle = \langle u, Tv\rangle = \mu\langle u, v\rangle$ for $Tu = \lambda u$, $Tv = \mu v$ forces $\langle u, v\rangle = 0$ when $\lambda \neq \mu$.

The key existence step: a compact self-adjoint $T \neq 0$ has an eigenvalue $\lambda$ with $|\lambda| = \lVert T\rVert$. Indeed $\lVert T\rVert = \sup_{\lVert x\rVert = 1}|\langle Tx, x\rangle|$ for self-adjoint $T$; choose unit $x_n$ with $\langle Tx_n, x_n\rangle \to \lambda$, $|\lambda| = \lVert T\rVert$. Then $\lVert Tx_n - \lambda x_n\rVert^2 = \lVert Tx_n\rVert^2 - 2\lambda\langle Tx_n, x_n\rangle + \lambda^2 \le 2\lambda^2 - 2\lambda\langle Tx_n,x_n\rangle \to 0$. By **compact-operator**, pass to a subsequence with $Tx_n \to y$; then $\lambda x_n \to y$, so (as $\lambda \neq 0$) $x_n \to y/\lambda =: e$, a unit vector with $Te = \lambda e$.

Now iterate. Let $e_1$ be such an eigenvector, $H_1 = \{e_1\}^\perp$. Since $T$ is self-adjoint and $e_1$ is an eigenvector, $H_1$ is $T$-invariant ($x \perp e_1 \Rightarrow \langle Tx, e_1\rangle = \langle x, Te_1\rangle = \lambda_1\langle x, e_1\rangle = 0$), and $T|_{H_1}$ is again compact self-adjoint. Repeating produces orthonormal eigenvectors $e_1, e_2, \dots$ with $|\lambda_1| \ge |\lambda_2| \ge \cdots$. The $\lambda_n \to 0$: if $|\lambda_n| \ge \delta > 0$ for infinitely many $n$, the orthonormal $e_n$ satisfy $\lVert Te_n - Te_m\rVert^2 = \lambda_n^2 + \lambda_m^2 \ge 2\delta^2$, so $(Te_n)$ has no convergent subsequence, contradicting compactness. Let $M = \overline{\operatorname{span}}\{e_n\}$; on $M^\perp$ the restriction is compact self-adjoint with no nonzero eigenvalue, so by the existence step its norm is $0$, i.e. $T|_{M^\perp} = 0$. Adjoining an **orthonormal basis** of $\ker T = M^\perp$ (eigenvectors for $\lambda = 0$) to $\{e_n\}$ gives, by **hilbert-basis**, an orthonormal basis of $H$ of eigenvectors, and expanding $x$ in it yields $Tx = \sum_n \lambda_n\langle x, e_n\rangle e_n$. This is the exact infinite-dimensional, compact analogue of the finite-dimensional **spectral-theorem** for symmetric matrices.

*General normal case (statement with genuine sketch).* The multiplier model is a theorem requiring machinery beyond this graph — the continuous functional calculus and a spectral measure. Honestly: from the commutative $C^*$-algebra $\mathcal{A}$ generated by $N, N^*, I$ one builds, via the **Gelfand–Naimark theorem**, an isometric $*$-isomorphism $\mathcal{A} \cong C(\sigma(N))$; applied to a cyclic vector and combined with the **Riesz–Markov representation theorem** this yields a measure $\mu$ on $\sigma(N)$ and a unitary $U : H \to L^2(\mu)$ with $UNU^{-1} = $ multiplication by the coordinate function $\varphi(\lambda) = \lambda$. Self-adjointness $N = N^*$ corresponds to $\varphi = \overline{\varphi}$ (real-valued) and unitarity to $|\varphi| = 1$; the spectrum is the essential range of $\varphi$. The two named inputs (Gelfand–Naimark, Riesz–Markov) are the precise gap relative to the present graph. $\square$`,
  },
]

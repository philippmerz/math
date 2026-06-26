import type { MathNode } from '../types'

export const ANALYSIS_NODES: MathNode[] = [
  {
    id: 'absolute-value',
    label: 'Absolute Value',
    title: 'Absolute Value',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['ordered-field'],
    definition: String.raw`The **absolute value** on an ordered field is
$$|x| := \begin{cases} x & \text{if } x \ge 0, \\ -x & \text{if } x < 0. \end{cases}$$
It measures magnitude: $|x| \ge 0$, $|xy| = |x|\,|y|$, and the triangle inequality $|x + y| \le |x| + |y|$ holds. The quantity $|x - y|$ is the distance on which all of analysis rests.`,
  },
  {
    id: 'completeness',
    label: 'Completeness',
    title: 'Completeness (Least Upper Bound Property)',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['ordered-field', 'supremum'],
    definition: String.raw`An ordered field is **complete** when every non-empty subset that is bounded above has a least upper bound *in the field*:
$$\varnothing \neq S \subseteq F \text{ bounded above} \;\Longrightarrow\; \sup S \text{ exists in } F.$$
This *least upper bound property* is exactly what $\mathbb{Q}$ lacks — $\{q \in \mathbb{Q} : q^2 < 2\}$ has no rational supremum — and what singles out $\mathbb{R}$ among ordered fields.`,
  },
  {
    id: 'dedekind-cut',
    label: 'Dedekind Cut',
    title: 'Dedekind Cut',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['rationals', 'subset'],
    definition: String.raw`A **Dedekind cut** is a subset $\alpha \subsetneq \mathbb{Q}$ that is non-empty, downward closed, and has no greatest element:
$$\alpha \neq \varnothing,\quad (q \in \alpha \wedge p < q) \Rightarrow p \in \alpha,\quad \forall q \in \alpha\;\exists r \in \alpha\;(q < r).$$
Each cut pins down one point of the continuum by the rationals lying below it, filling the gaps in $\mathbb{Q}$.`,
  },
  {
    id: 'sequence',
    label: 'Sequence',
    title: 'Sequence',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['function', 'natural-number-arithmetic'],
    definition: String.raw`A **sequence** in a set $X$ is a function $a : \mathbb{N} \to X$, written $(a_n)_{n \in \mathbb{N}}$ with $a_n := a(n)$. It is an $X$-valued list indexed by the naturals — the basic object whose limiting behaviour analysis studies.`,
  },
  {
    id: 'cauchy-sequence',
    label: 'Cauchy Sequence',
    title: 'Cauchy Sequence',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['sequence', 'absolute-value'],
    definition: String.raw`A sequence $(a_n)$ in an ordered field is **Cauchy** when its terms grow arbitrarily close to *one another*:
$$\forall \varepsilon > 0\;\exists N\;\forall m, n \ge N\;\;\; |a_m - a_n| < \varepsilon.$$
Every convergent sequence is Cauchy; a field in which the converse also holds — every Cauchy sequence converges — is *Cauchy-complete*. The least upper bound property implies Cauchy-completeness, and Cauchy sequences of $\mathbb{Q}$ are the raw material for one construction of $\mathbb{R}$.`,
  },
  {
    id: 'dedekind-reals',
    label: 'ℝ via Dedekind Cuts',
    title: 'ℝ via Dedekind Cuts',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['dedekind-cut', 'completeness'],
    definition: String.raw`One construction of the reals takes $\mathbb{R}$ to be the set of all **Dedekind cuts** of $\mathbb{Q}$, ordered by inclusion $\subseteq$. Suitable definitions of $+$ and $\cdot$ on cuts make this an ordered field, and the least upper bound of any non-empty set of cuts that is bounded above is simply their **union** — so completeness is immediate from the construction.`,
  },
  {
    id: 'cauchy-reals',
    label: 'ℝ via Cauchy Sequences',
    title: 'ℝ via Cauchy Sequences',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['cauchy-sequence', 'quotient-set', 'rationals'],
    definition: String.raw`A second construction takes $\mathbb{R}$ to be the Cauchy sequences of $\mathbb{Q}$ modulo *null difference*:
$$(a_n) \sim (b_n) \;:\Longleftrightarrow\; (a_n - b_n) \to 0.$$
Arithmetic is defined termwise on representatives, and the resulting ordered field is complete — every Cauchy sequence of reals converges, since it is the limit of a Cauchy sequence of rationals approximating it term by term.`,
  },
  {
    id: 'real-numbers',
    label: 'Real Numbers ℝ',
    title: 'Real Numbers (ℝ)',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['dedekind-reals', 'cauchy-reals', 'completeness'],
    definition: String.raw`The **real numbers** $\mathbb{R}$ are *the* complete ordered field. The Dedekind-cut and Cauchy-sequence constructions each produce one, and any two complete ordered fields are uniquely isomorphic — so $\mathbb{R}$ is well-defined independently of the route taken. It is the continuum on which analysis lives.`,
  },
  {
    id: 'limit-of-a-sequence',
    label: 'Limit of a Sequence',
    title: 'Limit of a Sequence (Convergence)',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['sequence', 'real-numbers', 'absolute-value'],
    definition: String.raw`A sequence $(a_n)$ of reals **converges** to $L \in \mathbb{R}$ when its terms are eventually within every tolerance of $L$:
$$a_n \to L \;\Longleftrightarrow\; \forall \varepsilon > 0\;\exists N \in \mathbb{N}\;\forall n \ge N\;\; |a_n - L| < \varepsilon.$$
Such an $L$, when it exists, is unique, and is written $\lim_{n \to \infty} a_n$. This $\varepsilon$–$N$ formulation makes the intuitive "approaches" precise.`,
  },
  {
    id: 'limit-of-a-function',
    label: 'Limit of a Function',
    title: 'Limit of a Function',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['real-numbers', 'absolute-value', 'function'],
    definition: String.raw`The **limit** of $f$ at $a$ is $L$ when $f(x)$ can be forced arbitrarily close to $L$ by taking $x$ in the domain close enough to — but distinct from — $a$:
$$\lim_{x \to a} f(x) = L \;\Longleftrightarrow\; \forall \varepsilon > 0\;\exists \delta > 0\;\forall x\,\bigl(0 < |x - a| < \delta \rightarrow |f(x) - L| < \varepsilon\bigr).$$
Such an $L$, when it exists, is unique. This $\varepsilon$–$\delta$ definition underlies continuity, derivatives, and integrals.`,
  },
  {
    id: 'continuity',
    label: 'Continuity',
    title: 'Continuity',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['limit-of-a-function'],
    definition: String.raw`A function $f$ is **continuous at $a$** when its limit there equals its value:
$$\lim_{x \to a} f(x) = f(a),$$
equivalently $\forall \varepsilon > 0\;\exists \delta > 0\;\forall x\,(|x - a| < \delta \rightarrow |f(x) - f(a)| < \varepsilon)$. It is continuous on a set when continuous at each point — informally, drawable without lifting the pen.`,
  },
  {
    id: 'derivative',
    label: 'Derivative',
    title: 'Derivative',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['limit-of-a-function'],
    definition: String.raw`The **derivative** of $f$ at $a$ is the limit of its difference quotients, when that limit exists:
$$f'(a) := \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}.$$
It is the instantaneous rate of change — the slope of the tangent line to the graph of $f$ at $\bigl(a, f(a)\bigr)$. Differentiability at $a$ implies continuity at $a$, but not conversely.`,
  },
  {
    id: 'riemann-integral',
    label: 'Riemann Integral',
    title: 'Riemann Integral',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['function', 'real-numbers', 'supremum'],
    definition: String.raw`The **Riemann integral** of a bounded $f$ on $[a, b]$ is built from partitions $a = x_0 < \dots < x_n = b$. A partition's lower and upper Darboux sums $\underline{S} = \sum_i m_i\,\Delta x_i$ and $\overline{S} = \sum_i M_i\,\Delta x_i$ — with $m_i, M_i$ the infimum and supremum of $f$ on each subinterval — bracket the area. $f$ is **integrable** when the least upper bound of the lower sums meets the greatest lower bound of the upper sums:
$$\int_a^b f := \sup_{\text{partitions}} \underline{S} = \inf_{\text{partitions}} \overline{S}.$$
Every continuous function on $[a, b]$ is integrable.`,
  },
  {
    id: 'fundamental-theorem-of-calculus',
    label: 'Fundamental Theorem of Calculus',
    title: 'Fundamental Theorem of Calculus',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['derivative', 'riemann-integral', 'continuity'],
    definition: String.raw`The **Fundamental Theorem of Calculus** binds differentiation and integration as inverse processes. For $f$ continuous on $[a, b]$, the accumulation function $A(x) = \int_a^x f$ is differentiable with $A' = f$; and for *any* antiderivative $F$ of $f$,
$$\int_a^b f = F(b) - F(a).$$
It turns the local notion of slope into the global notion of accumulated area.`,
  },

  // ── Differentiation: rules and theorems ──────────────────────────────────
  {
    id: 'chain-rule',
    label: 'Chain Rule',
    title: 'Chain Rule',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['derivative'],
    definition: String.raw`The **chain rule** differentiates a composition: if $g$ is differentiable at $a$ and $f$ at $g(a)$, then $f \circ g$ is differentiable at $a$ with
$$(f \circ g)'(a) = f'\bigl(g(a)\bigr)\,g'(a).$$
It is the engine behind implicit differentiation and the change-of-variables rule, and it generalizes to maps of several variables, where total derivatives compose and Jacobian matrices multiply.`,
  },
  {
    id: 'higher-order-derivative',
    label: 'Higher-Order Derivative',
    title: 'Higher-Order Derivatives',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['derivative'],
    definition: String.raw`The **higher-order derivatives** of $f$ come from differentiating repeatedly: $f'' = (f')'$ and, in general, $f^{(n)} = \bigl(f^{(n-1)}\bigr)'$. A function is $C^n$ when $f^{(n)}$ exists and is continuous, and **smooth** ($C^\infty$) when derivatives of all orders exist. The second derivative measures concavity; higher-order derivatives underlie Taylor approximation.`,
  },
  {
    id: 'mean-value-theorem',
    label: 'Mean Value Theorem',
    title: 'Mean Value Theorem',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['derivative', 'continuity'],
    definition: String.raw`The **mean value theorem**: if $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, then for some $c \in (a, b)$
$$f'(c) = \frac{f(b) - f(a)}{b - a}.$$
The instantaneous rate equals the average rate somewhere. It is the bridge from the derivative to global behaviour — monotonicity, Taylor's remainder, and the fact that antiderivatives are unique up to a constant all flow from it.`,
  },
  {
    id: 'change-of-variables',
    label: 'Change of Variables',
    title: 'Change of Variables (Substitution)',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['chain-rule', 'fundamental-theorem-of-calculus'],
    definition: String.raw`**Change of variables** (substitution) inverts the chain rule under the integral: for $\varphi$ continuously differentiable and $f$ continuous,
$$\int_{a}^{b} f\bigl(\varphi(x)\bigr)\,\varphi'(x)\,dx = \int_{\varphi(a)}^{\varphi(b)} f(u)\,du.$$
No monotonicity of $\varphi$ is needed — the signed endpoints absorb any folding. The multivariable form requires $\varphi$ to be a diffeomorphism and replaces $\varphi'$ with the absolute value of the Jacobian determinant.`,
  },

  // ── Taylor approximation ─────────────────────────────────────────────────
  {
    id: 'taylor-polynomial',
    label: 'Taylor Polynomial',
    title: 'Taylor Polynomial',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['higher-order-derivative', 'polynomial'],
    definition: String.raw`The **Taylor polynomial** of degree $n$ for a $C^n$ function $f$ at $a$ is the polynomial matching $f$'s value and first $n$ derivatives there:
$$T_n(x) = \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!}\,(x - a)^k.$$
It is the unique degree-$n$ polynomial agreeing with $f$ to highest order at $a$ — error $o\bigl((x - a)^n\bigr)$ as $x \to a$ — the case $T_1$ being the tangent line.`,
  },
  {
    id: 'taylor-theorem',
    label: "Taylor's Theorem",
    title: "Taylor's Theorem",
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['taylor-polynomial', 'mean-value-theorem'],
    definition: String.raw`**Taylor's theorem** quantifies the error of the Taylor polynomial. If $f$ is $C^{n+1}$, then for some $c$ between $a$ and $x$ the Lagrange remainder is
$$f(x) - T_n(x) = \frac{f^{(n+1)}(c)}{(n+1)!}\,(x - a)^{n+1}.$$
Generalizing the mean value theorem (the case $n = 0$), it underlies polynomial approximation, error bounds, and the convergence of power series.`,
  },

  // ── Sequences of functions ───────────────────────────────────────────────
  {
    id: 'sequence-of-functions',
    label: 'Sequence of Functions',
    title: 'Sequence of Functions',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['sequence', 'function'],
    definition: String.raw`A **sequence of functions** $(f_n)$ has functions for its terms — each $f_n : X \to \mathbb{R}$ on a common domain. The central question is in what *sense* $f_n$ approaches a limit function $f$, since different modes of convergence preserve different properties (continuity, integrability, differentiability).`,
  },
  {
    id: 'pointwise-convergence',
    label: 'Pointwise Convergence',
    title: 'Pointwise Convergence',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['sequence-of-functions', 'limit-of-a-sequence'],
    definition: String.raw`$(f_n)$ **converges pointwise** to $f$ when, at each fixed $x$ in the common domain, the number sequence $f_n(x)$ converges to $f(x)$:
$$\forall x\;\forall \varepsilon > 0\;\exists N\;\forall n \ge N\;\; |f_n(x) - f(x)| < \varepsilon.$$
Here $N$ may depend on $x$. This weak mode need not preserve continuity: a pointwise limit of continuous functions can be discontinuous.`,
  },
  {
    id: 'uniform-convergence',
    label: 'Uniform Convergence',
    title: 'Uniform Convergence',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['sequence-of-functions', 'supremum', 'absolute-value'],
    definition: String.raw`$(f_n)$ **converges uniformly** to $f$ when a single $N$ works for all $x$ at once:
$$\forall \varepsilon > 0\;\exists N\;\forall n \ge N\;\; \sup_{x} |f_n(x) - f(x)| < \varepsilon.$$
Stronger than pointwise convergence, it preserves continuity and permits exchanging the limit with integration over a bounded interval (and, with extra care, with differentiation).`,
  },

  // ── Fixed points ─────────────────────────────────────────────────────────
  {
    id: 'contraction-mapping',
    label: 'Contraction Mapping',
    title: 'Contraction Mapping',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['metric-space'],
    definition: String.raw`A **contraction** on a metric space $(X, d)$ is a map $T$ with a fixed factor $k < 1$ bounding how far apart it leaves points:
$$d\bigl(T(x), T(y)\bigr) \le k\,d(x, y) \quad \text{for all } x, y \qquad (0 \le k < 1).$$
Because $k < 1$, iterating a contraction drives points together geometrically fast — the mechanism behind fixed-point existence-and-uniqueness proofs. On $\mathbb{R}$ the distance is $d(x, y) = |x - y|$.`,
  },
  {
    id: 'banach-fixed-point',
    label: 'Banach Fixed-Point',
    title: 'Banach Fixed-Point Theorem',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['contraction-mapping', 'metric-space', 'cauchy-sequence'],
    definition: String.raw`The **Banach fixed-point theorem**: a contraction $T$ on a non-empty *complete* metric space — one where every Cauchy sequence converges, such as $\mathbb{R}$ — has a unique fixed point $x^\ast = T(x^\ast)$, and the iterates converge to it from any start:
$$x_{n+1} = T(x_n), \qquad x_n \longrightarrow x^\ast.$$
Constructive and quantitative, it yields existence/uniqueness for differential and integral equations (Picard–Lindelöf) and powers the inverse and implicit function theorems.`,
  },

  // ── Compactness and the classical theorems ───────────────────────────────
  {
    id: 'compactness',
    label: 'Compactness',
    title: 'Compactness',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['real-numbers'],
    definition: String.raw`A set is **compact** when every open cover has a finite subcover — a finiteness property that tames the infinite. Compact sets behave like finite ones for analysis: every continuous **real-valued** function on a non-empty one attains its extrema, and (in a metric space) is uniformly continuous. In $\mathbb{R}^n$, compact means exactly *closed and bounded* (Heine–Borel).`,
  },
  {
    id: 'rolles-theorem',
    label: "Rolle's Theorem",
    title: "Rolle's Theorem",
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['derivative', 'continuity'],
    definition: String.raw`**Rolle's theorem**: if $f$ is continuous on $[a, b]$, differentiable on $(a, b)$, and $f(a) = f(b)$, then $f'(c) = 0$ for some $c \in (a, b)$. A level secant forces a horizontal tangent somewhere between. It is the special case from which the mean value theorem follows.`,
  },
  {
    id: 'intermediate-value-theorem',
    label: 'Intermediate Value Theorem',
    title: 'Intermediate Value Theorem',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['continuity', 'completeness'],
    definition: String.raw`The **intermediate value theorem**: a function continuous on $[a, b]$ takes every value between $f(a)$ and $f(b)$. In particular, if $f(a)$ and $f(b)$ have opposite signs it has a root in $(a, b)$. It is the precise form of "no gaps," and it rests on the completeness of $\mathbb{R}$.`,
  },
  {
    id: 'bolzano-weierstrass',
    label: 'Bolzano–Weierstrass',
    title: 'Bolzano–Weierstrass Theorem',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['sequence', 'completeness'],
    definition: String.raw`The **Bolzano–Weierstrass theorem**: every bounded sequence in $\mathbb{R}^n$ has a convergent subsequence. A direct consequence of completeness, it is the sequential heart of compactness and the standard device for extracting limits in existence proofs.`,
  },
  {
    id: 'heine-borel',
    label: 'Heine–Borel',
    title: 'Heine–Borel Theorem',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['compactness'],
    definition: String.raw`The **Heine–Borel theorem**: a subset of $\mathbb{R}^n$ is **compact** (every open cover has a finite subcover) if and only if it is **closed and bounded**. It ties the abstract notion of compactness to a concrete, checkable condition on Euclidean space.`,
  },
  {
    id: 'monotone-convergence-sequence',
    label: 'Monotone Convergence (Sequences)',
    title: 'Monotone Convergence Theorem (Sequences)',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['limit-of-a-sequence', 'completeness'],
    definition: String.raw`The **monotone convergence theorem** for sequences: a bounded monotone sequence of reals converges — increasing to its supremum, decreasing to its infimum. It converts the completeness of $\mathbb{R}$ into a practical convergence test that needs no advance knowledge of the limit.`,
  },
  {
    id: 'weierstrass-approximation',
    label: 'Weierstrass Approximation',
    title: 'Weierstrass Approximation Theorem',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['continuity', 'polynomial', 'uniform-convergence'],
    definition: String.raw`The **Weierstrass approximation theorem**: every continuous function on a closed interval $[a, b]$ is the uniform limit of polynomials — the polynomials are *dense* in $C[a, b]$. So any continuous function can be approximated arbitrarily well by the simplest ones, the foundation of approximation theory.`,
  },
]

import type { MathNode } from '../types'

/** Analysis — 14 nodes. */
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
]

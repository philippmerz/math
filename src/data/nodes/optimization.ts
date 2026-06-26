import type { MathNode } from '../types'

export const OPTIMIZATION_NODES: MathNode[] = [
  // ── Extrema and the first-order conditions ─────────────────────────────────
  {
    id: 'local-global-minimum',
    label: 'Local & Global Minima',
    title: 'Local and Global Minima',
    kind: 'definition',
    tags: ['Optimization'],
    dependencies: ['real-numbers', 'euclidean-space'],
    description: String.raw`Optimization distinguishes two kinds of best point. A **global** minimizer beats every other feasible point; a **local** minimizer only beats its immediate neighbours. The difficulty of optimization lies almost entirely in this gap — algorithms readily find local minima, but certifying that one is global is hard in general and automatic under convexity. Maxima are the same notion applied to $-f$.`,
    definition: String.raw`Let $f : S \to \mathbb{R}$ with $S \subseteq \mathbb{R}^n$. A point $x^{*} \in S$ is a **global minimizer** of $f$ on $S$ if
$$f(x^{*}) \le f(x)\quad\text{for all } x \in S,$$
and a **local minimizer** if there is a radius $r > 0$ with $f(x^{*}) \le f(x)$ for all $x \in S$ with $\|x - x^{*}\| < r$. The minimizer is **strict** when the inequality is strict for $x \neq x^{*}$. Maximizers are defined by reversing the inequalities, equivalently as minimizers of $-f$; the value $f(x^{*})$ is the (local or global) **minimum**. Every global minimizer is a local one.`,
  },
  {
    id: 'critical-point',
    label: 'Critical Point',
    title: 'Critical Point',
    kind: 'definition',
    tags: ['Optimization'],
    dependencies: ['derivative', 'gradient', 'local-global-minimum'],
    description: String.raw`A **critical point** (stationary point) of a differentiable function is where the derivative vanishes — $f'(x) = 0$ in one variable, $\nabla f(x) = 0$ in several. By Fermat's theorem every interior local extremum is critical, so critical points are the candidates for maxima and minima; classifying them (minimum, maximum, or saddle) needs higher-order information such as the Hessian.`,
    definition: String.raw`Let $f$ be defined on an open set $U \subseteq \mathbb{R}^n$ and differentiable at $x \in U$. Then $x$ is a **critical point** (stationary point) of $f$ if its gradient vanishes,
$$\nabla f(x) = 0,$$
equivalently $f'(x) = 0$ in the case $n = 1$. A critical point that is neither a local maximizer nor a local minimizer is a **saddle point**.`,
  },
  {
    id: 'fermat-interior-extremum',
    label: 'Fermat (∇f = 0)',
    title: "Fermat's Condition for Interior Extrema (Several Variables)",
    kind: 'theorem',
    tags: ['Optimization'],
    dependencies: ['critical-point', 'local-global-minimum', 'partial-derivative', 'gradient', 'fermat-stationary-point'],
    description: String.raw`At an interior local extremum of a differentiable function the gradient must vanish. This is the multivariable Fermat condition: it reduces the search for extrema to the critical points, the equation $\nabla f = 0$ being the first-order necessary condition for optimality. The converse fails — a saddle point is critical without being an extremum — so the condition is necessary, not sufficient.`,
    statement: String.raw`Let $f$ be defined on an open set $U \subseteq \mathbb{R}^n$, let $x^{*} \in U$ be a local minimizer or local maximizer of $f$, and suppose all partial derivatives of $f$ exist at $x^{*}$. Then $\nabla f(x^{*}) = 0$; that is, $x^{*}$ is a critical point.`,
    proof: String.raw`Fix an index $i$ and consider the one-variable slice $\varphi(t) := f(x^{*} + t\,e_i)$, defined for $t$ in some open interval about $0$ because $U$ is open. Since $x^{*}$ is a local extremum of $f$ over the open set $U$, $t = 0$ is an *interior* local extremum of $\varphi$, and $\varphi$ is differentiable at $0$ with $\varphi'(0) = \dfrac{\partial f}{\partial x_i}(x^{*})$ by the definition of the **partial derivative**. By **Fermat's theorem** for one variable, $\varphi'(0) = 0$, so $\dfrac{\partial f}{\partial x_i}(x^{*}) = 0$. As $i$ was arbitrary, every partial derivative vanishes, hence $\nabla f(x^{*}) = 0$ and $x^{*}$ is a **critical point**. $\square$`,
  },
  {
    id: 'extreme-value-theorem',
    label: 'Weierstrass Extreme Value',
    title: 'Weierstrass Extreme Value Theorem (Compact Sets)',
    kind: 'theorem',
    tags: ['Optimization'],
    dependencies: ['continuity', 'compactness', 'local-global-minimum'],
    description: String.raw`A continuous function on a non-empty compact set attains a global maximum and a global minimum. This is the foundational existence theorem of optimization: it guarantees an optimizer *before* any calculus is done, so that the first-order conditions have something to find. On a closed bounded subset of $\mathbb{R}^n$ — where compact means closed and bounded — continuity alone secures a solution.`,
    statement: String.raw`Let $K \subseteq \mathbb{R}^n$ be non-empty and compact and let $f : K \to \mathbb{R}$ be continuous. Then $f$ attains a global maximum and a global minimum on $K$: there exist $p, q \in K$ with $f(p) \le f(x) \le f(q)$ for all $x \in K$.`,
    proof: String.raw`We use the sequential form of **compactness**: every sequence in $K$ has a subsequence converging to a point of $K$.

*Boundedness.* If $f$ were unbounded above, there would be $x_n \in K$ with $f(x_n) > n$. By compactness some subsequence $x_{n_k} \to x^{*} \in K$, and by **continuity** (sequential criterion) $f(x_{n_k}) \to f(x^{*})$, a finite number — contradicting $f(x_{n_k}) > n_k \to \infty$. So $f$ is bounded above; applying this to $-f$, also below.

*Attainment.* Let $M := \sup_{x \in K} f(x)$, finite by boundedness, which exists since $K \neq \varnothing$. Pick $x_n \in K$ with $f(x_n) > M - \tfrac1n$, so $f(x_n) \to M$. By compactness pass to $x_{n_k} \to q \in K$; by continuity $f(q) = \lim_k f(x_{n_k}) = M$. Thus $q$ is a **global maximizer**. Applying the same to $-f$ yields a global minimizer $p$. $\square$`,
  },

  // ── Convexity ──────────────────────────────────────────────────────────────
  {
    id: 'convex-set',
    label: 'Convex Set',
    title: 'Convex Set',
    kind: 'definition',
    tags: ['Optimization'],
    dependencies: ['vector-space'],
    description: String.raw`A **convex set** contains the whole straight segment between any two of its points — no dents, no holes. Convexity is the geometric backbone of optimization: over a convex feasible region, local information determines global structure, which is what makes convex problems tractable. Balls, half-spaces, affine subspaces, and the solution sets of systems of linear inequalities are all convex.`,
    definition: String.raw`A subset $C$ of a real vector space is **convex** if it contains the segment joining any two of its points:
$$x, y \in C,\ t \in [0, 1] \;\Longrightarrow\; t x + (1 - t) y \in C.$$
The point $t x + (1-t)y$ is a **convex combination** of $x$ and $y$; by induction $C$ is convex iff it is closed under all finite convex combinations $\sum_{i=1}^m \lambda_i x_i$ with $\lambda_i \ge 0$ and $\sum_i \lambda_i = 1$.`,
  },
  {
    id: 'convex-function',
    label: 'Convex Function',
    title: 'Convex Function',
    kind: 'definition',
    tags: ['Optimization'],
    dependencies: ['convex-set'],
    description: String.raw`A function is **convex** when its graph lies on or below each of its chords: the value at an average of two points is at most the average of the values. Convexity is the single property that makes minimization well-behaved — it forces every local minimum to be global and makes the first-order condition sufficient. The chord inequality is the primitive definition; for smooth functions it has equivalent first- and second-order forms.`,
    definition: String.raw`Let $C$ be a convex set in a real vector space. A function $f : C \to \mathbb{R}$ is **convex** if for all $x, y \in C$ and $t \in [0, 1]$,
$$f\bigl(t x + (1 - t) y\bigr) \le t\,f(x) + (1 - t)\,f(y).$$
It is **strictly convex** if the inequality is strict whenever $x \neq y$ and $t \in (0, 1)$, and **concave** when $-f$ is convex. By induction the inequality extends to all finite convex combinations: $f\bigl(\sum_i \lambda_i x_i\bigr) \le \sum_i \lambda_i f(x_i)$ for $\lambda_i \ge 0$, $\sum_i \lambda_i = 1$ (the finite Jensen inequality).`,
  },
  {
    id: 'convexity-local-global',
    label: 'Local Min ⇒ Global Min',
    title: 'For Convex Functions, Local Minima are Global',
    kind: 'theorem',
    tags: ['Optimization'],
    dependencies: ['convex-function', 'local-global-minimum'],
    description: String.raw`The decisive consequence of convexity: a convex function on a convex set has no merely-local minima — every local minimizer is automatically a global one, and the set of minimizers is itself convex. This is why convex optimization is reliable: an algorithm that descends to any local minimum has, with no further work, found the global optimum.`,
    statement: String.raw`Let $f : C \to \mathbb{R}$ be convex on a convex set $C \subseteq \mathbb{R}^n$. Then every local minimizer of $f$ on $C$ is a global minimizer. Moreover the set $\operatorname{argmin}_C f$ of global minimizers is convex, and if $f$ is strictly convex it has at most one element.`,
    proof: String.raw`Let $x^{*}$ be a **local minimizer**: there is $r > 0$ with $f(x^{*}) \le f(z)$ for all $z \in C$ with $\|z - x^{*}\| < r$. Suppose, for contradiction, some $y \in C$ has $f(y) < f(x^{*})$. For $t \in (0,1)$ the point $z_t := (1 - t)x^{*} + t y$ lies in $C$ (as $C$ is **convex**), and by **convexity** of $f$,
$$f(z_t) \le (1 - t) f(x^{*}) + t f(y) < (1 - t) f(x^{*}) + t f(x^{*}) = f(x^{*}).$$
But $\|z_t - x^{*}\| = t\,\|y - x^{*}\| < r$ once $t$ is small enough, so $z_t$ lies in the neighbourhood where $x^{*}$ is best, giving $f(z_t) \ge f(x^{*})$ — a contradiction. Hence $f(y) \ge f(x^{*})$ for all $y \in C$, so $x^{*}$ is a **global minimizer**.

*Convexity of the minimizer set.* Let $m = \min_C f$ and suppose $x, y$ both attain it. For $t \in [0,1]$, convexity gives $f(tx + (1-t)y) \le t m + (1-t)m = m$, while $m$ is the minimum, so $f(tx + (1-t)y) = m$; thus $\operatorname{argmin}_C f$ is convex. If $f$ is **strictly convex** and $x \neq y$ both attained $m$, then for $t \in (0,1)$ we would get the strict inequality $f(tx+(1-t)y) < m$, impossible; so the minimizer is unique. $\square$`,
  },

  // ── Smooth characterizations: gradient, Hessian, second-order convexity ─────
  {
    id: 'hessian',
    label: 'Hessian',
    title: 'Hessian Matrix',
    kind: 'definition',
    tags: ['Optimization'],
    dependencies: ['partial-derivative', 'clairaut-theorem', 'matrix'],
    description: String.raw`The **Hessian** collects all second partial derivatives of a scalar function into a square matrix — the multivariable analogue of the second derivative. It governs local curvature: the second-order Taylor expansion of $f$ is built from it, and the sign of the curvature it encodes distinguishes minima, maxima, and saddle points among the critical points. For twice continuously differentiable functions it is symmetric.`,
    definition: String.raw`For $f : U \to \mathbb{R}$ twice differentiable at $a$ in an open set $U \subseteq \mathbb{R}^n$, the **Hessian** of $f$ at $a$ is the $n \times n$ matrix of second partial derivatives
$$\nabla^2 f(a) := \Bigl[\,\frac{\partial^2 f}{\partial x_i\,\partial x_j}(a)\,\Bigr]_{i,j=1}^{n}.$$
If $f$ is $C^2$ near $a$ (all second partials continuous), then $\nabla^2 f(a)$ is **symmetric**.`,
    proof: String.raw`**Symmetry for $C^2$ functions.** The $(i,j)$ entry is $\partial_{x_i}\partial_{x_j} f(a)$ and the $(j,i)$ entry is $\partial_{x_j}\partial_{x_i} f(a)$. When $f$ is $C^2$, these mixed second partials are continuous near $a$, so by the **Clairaut–Schwarz theorem** (applied to the pair of coordinates $x_i, x_j$, the other coordinates held fixed) they are equal: $\partial_{x_i}\partial_{x_j} f(a) = \partial_{x_j}\partial_{x_i} f(a)$. Hence $\nabla^2 f(a)$ equals its transpose. $\square$`,
  },
  {
    id: 'positive-semidefinite',
    label: 'Positive Semidefinite',
    title: 'Positive (Semi)definite Matrix',
    kind: 'definition',
    tags: ['Optimization'],
    dependencies: ['matrix', 'dot-product', 'spectral-theorem', 'eigenvalue-eigenvector'],
    description: String.raw`A symmetric matrix is **positive semidefinite** when the quadratic form it defines is never negative — geometrically, it bends every direction upward or flat. This is the matrix condition for a function's curvature to be that of a bowl: a symmetric Hessian that is positive semidefinite everywhere is exactly the second-order signature of convexity, and positive definiteness at a critical point certifies a strict local minimum.`,
    definition: String.raw`A symmetric matrix $A \in \mathbb{R}^{n \times n}$ is **positive semidefinite**, written $A \succeq 0$, if its quadratic form is nonnegative:
$$v^{\top} A\,v = \sum_{i,j} A_{ij}\,v_i v_j \ge 0 \qquad \text{for all } v \in \mathbb{R}^n,$$
and **positive definite**, $A \succ 0$, if $v^{\top} A\,v > 0$ for all $v \neq 0$. Equivalently (by the spectral theorem for real symmetric matrices) $A \succeq 0$ iff all eigenvalues of $A$ are $\ge 0$, and $A \succ 0$ iff all are $> 0$.`,
  },
  {
    id: 'first-order-convexity',
    label: 'First-Order Convexity',
    title: 'First-Order Characterization of Convexity',
    kind: 'theorem',
    tags: ['Optimization'],
    dependencies: ['convex-function', 'gradient', 'mean-value-theorem', 'fermat-interior-extremum', 'local-global-minimum'],
    description: String.raw`For a differentiable function, convexity is equivalent to its graph lying above every tangent plane: the linear approximation at any point underestimates the function everywhere. This first-order form is the workhorse of convex optimization — it turns the chord inequality into a usable gradient inequality, from which $\nabla f(x^{*}) = 0$ immediately certifies a global minimum.`,
    statement: String.raw`Let $f$ be differentiable on an open convex set $C \subseteq \mathbb{R}^n$. Then $f$ is convex on $C$ if and only if for all $x, y \in C$,
$$f(y) \ge f(x) + \nabla f(x) \cdot (y - x).$$
Consequently, for differentiable convex $f$, a point $x^{*}$ is a global minimizer iff $\nabla f(x^{*}) = 0$.`,
    proof: String.raw`Reduce to one variable by restricting to lines. For $x, y \in C$ set $g(t) := f\bigl(x + t(y - x)\bigr)$ for $t \in [0,1]$ (defined since $C$ is **convex**); $g$ is differentiable with $g'(t) = \nabla f\bigl(x + t(y-x)\bigr) \cdot (y - x)$ by the chain rule, and $f$ is convex on $C$ iff each such $g$ is convex on $[0,1]$.

($\Rightarrow$) Suppose $f$ is **convex**. For $t \in (0, 1]$, convexity along the segment gives, for the convex combination $x + t(y-x) = (1-t)x + t y$,
$$f\bigl(x + t(y-x)\bigr) \le (1-t) f(x) + t f(y),$$
so $\dfrac{f(x + t(y-x)) - f(x)}{t} \le f(y) - f(x)$. The left side is the difference quotient of $g$ at $0$; letting $t \downarrow 0$ it tends to $g'(0) = \nabla f(x)\cdot(y-x)$, yielding $\nabla f(x)\cdot(y-x) \le f(y) - f(x)$, which rearranges to the claimed inequality.

($\Leftarrow$) Suppose the gradient inequality holds for all pairs in $C$. Fix $x, y \in C$ and $t \in [0,1]$, and let $z = t x + (1-t) y \in C$. Applying the inequality at base point $z$ to the targets $x$ and $y$:
$$f(x) \ge f(z) + \nabla f(z)\cdot(x - z), \qquad f(y) \ge f(z) + \nabla f(z)\cdot(y - z).$$
Form $t\cdot(\text{first}) + (1-t)\cdot(\text{second})$. The gradient terms combine to $\nabla f(z)\cdot\bigl(t x + (1-t)y - z\bigr) = \nabla f(z)\cdot 0 = 0$, leaving $t f(x) + (1-t)f(y) \ge f(z) = f(tx+(1-t)y)$, the convexity inequality.

*Global minimizer.* If $\nabla f(x^{*}) = 0$, the inequality gives $f(y) \ge f(x^{*}) + 0 = f(x^{*})$ for every $y \in C$, so $x^{*}$ is a **global minimizer**. Conversely a differentiable interior minimizer has $\nabla f(x^{*}) = 0$ by Fermat's condition. (The reduction to lines uses the **Mean Value Theorem** implicitly through differentiability of $g$; the gradient inequality itself is what drives the equivalence.) $\square$`,
  },
  {
    id: 'second-order-convexity',
    label: 'Second-Order Convexity',
    title: 'Second-Order Characterization of Convexity',
    kind: 'theorem',
    tags: ['Optimization'],
    dependencies: ['convex-function', 'hessian', 'positive-semidefinite', 'taylor-theorem', 'first-order-convexity'],
    description: String.raw`For a twice-differentiable function, convexity is exactly the statement that its Hessian is positive semidefinite everywhere — curvature nonnegative in every direction. This is the most checkable test for convexity in practice: one differentiates twice and verifies the Hessian has no negative eigenvalues. Strict positive definiteness gives strict convexity (though not conversely, as $x^4$ shows).`,
    statement: String.raw`Let $f$ be $C^2$ on an open convex set $C \subseteq \mathbb{R}^n$. Then $f$ is convex on $C$ if and only if its Hessian is positive semidefinite at every point:
$$\nabla^2 f(x) \succeq 0 \quad\text{for all } x \in C.$$
If $\nabla^2 f(x) \succ 0$ for all $x \in C$, then $f$ is strictly convex.`,
    proof: String.raw`As in the first-order proof, $f$ is convex on $C$ iff every one-variable restriction $g(t) = f(z + t v)$ (with $z \in C$, $v \in \mathbb{R}^n$, $t$ ranging over an interval keeping $z + tv \in C$) is convex; and $g$ is $C^2$ with, by the chain rule, $g''(t) = v^{\top} \nabla^2 f(z + tv)\, v$. So it suffices to relate the **Hessian** condition to convexity of these slices.

($\Leftarrow$) Suppose $\nabla^2 f(x) \succeq 0$ throughout $C$. Then $g''(t) = v^{\top}\nabla^2 f(z+tv)\,v \ge 0$ for every slice, since the **positive semidefinite** Hessian makes the quadratic form nonnegative. By **Taylor's theorem** (order $1$, Lagrange remainder), for any $t_0, t_1$ in the interval there is $c$ between them with $g(t_1) = g(t_0) + g'(t_0)(t_1 - t_0) + \tfrac12 g''(c)(t_1 - t_0)^2 \ge g(t_0) + g'(t_0)(t_1 - t_0)$. Translating back to $f$, this is exactly the first-order inequality $f(y) \ge f(x) + \nabla f(x)\cdot(y - x)$ for all $x, y \in C$, so $f$ is convex by the **first-order characterization of convexity**.

($\Rightarrow$) Suppose $f$ is **convex**; fix $z \in C$ and $v \in \mathbb{R}^n$. The slice $g$ is convex on a neighbourhood of $0$, so its difference quotients of $g'$ are nonnegative, giving $g''(0) \ge 0$ (the second derivative of a convex $C^2$ function is nonnegative: $g''(0) = \lim_{h\to 0}\frac{g'(h) - g'(0)}{h}$ with $g'$ nondecreasing by convexity). Hence $v^{\top}\nabla^2 f(z)\,v = g''(0) \ge 0$. As $v$ was arbitrary, $\nabla^2 f(z) \succeq 0$.

*Strict case.* If $\nabla^2 f \succ 0$ on $C$ then $g''(c) > 0$ for $v \neq 0$, so the Taylor inequality above is strict for $t_1 \neq t_0$, giving the strict gradient inequality and hence strict convexity. $\square$`,
  },

  // ── Algorithms and constrained optimization ────────────────────────────────
  {
    id: 'gradient-descent',
    label: 'Gradient Descent',
    title: 'Gradient Descent',
    kind: 'definition',
    tags: ['Optimization'],
    dependencies: ['gradient', 'local-global-minimum'],
    description: String.raw`**Gradient descent** minimizes a differentiable function by repeatedly stepping in the direction of steepest descent — opposite the gradient. It is the workhorse of large-scale optimization and modern machine learning: cheap per step, needing only first derivatives. Each step decreases $f$ for a small enough step size, and on convex objectives it drives the value down to the global minimum.`,
    definition: String.raw`Given a differentiable $f : \mathbb{R}^n \to \mathbb{R}$, a starting point $x_0$, and step sizes (learning rates) $\eta_k > 0$, **gradient descent** generates the iterates
$$x_{k+1} = x_k - \eta_k\,\nabla f(x_k), \qquad k = 0, 1, 2, \dots$$
Since $-\nabla f(x_k)$ is the direction of steepest descent (the directional derivative $\nabla f(x_k)\cdot u$ is minimized over unit $u$ at $u = -\nabla f(x_k)/\|\nabla f(x_k)\|$), each step moves against the gradient; a fixed point of the iteration is exactly a critical point. The aim is convergence of $x_k$ to a minimizer of $f$.`,
  },
  {
    id: 'gradient-descent-convergence',
    label: 'GD Convergence (Convex)',
    title: 'Convergence of Gradient Descent on Smooth Convex Functions',
    kind: 'theorem',
    tags: ['Optimization'],
    dependencies: ['gradient-descent', 'convex-function', 'first-order-convexity', 'local-global-minimum', 'gradient-theorem', 'cauchy-schwarz'],
    description: String.raw`On a convex function with Lipschitz-continuous gradient, gradient descent with a fixed step size at most the reciprocal of the Lipschitz constant converges to the global minimum at rate $O(1/k)$ in objective value. This is the basic guarantee that justifies gradient descent: the smoothness controls how large a step is safe, convexity makes the limit global, and the bound is explicit.`,
    statement: String.raw`Let $f : \mathbb{R}^n \to \mathbb{R}$ be convex and differentiable with $L$-Lipschitz gradient ($\|\nabla f(x) - \nabla f(y)\| \le L\|x - y\|$ for all $x, y$), and let $x^{*}$ be a global minimizer. Gradient descent with constant step size $\eta = 1/L$ satisfies, for every $k \ge 1$,
$$f(x_k) - f(x^{*}) \le \frac{L\,\|x_0 - x^{*}\|^2}{2k}.$$`,
    proof: String.raw`*Descent lemma.* $L$-Lipschitzness of $\nabla f$ gives the quadratic upper bound $f(y) \le f(x) + \nabla f(x)\cdot(y - x) + \tfrac{L}{2}\|y - x\|^2$ for all $x, y$. (Write $f(y) - f(x) = \int_0^1 \nabla f(x + s(y-x))\cdot(y-x)\,ds$; subtract $\nabla f(x)\cdot(y-x) = \int_0^1 \nabla f(x)\cdot(y-x)\,ds$ and bound the integrand by Cauchy–Schwarz and the Lipschitz estimate $\|\nabla f(x+s(y-x)) - \nabla f(x)\| \le Ls\|y-x\|$.) Apply this with $x = x_k$, $y = x_{k+1} = x_k - \tfrac1L \nabla f(x_k)$:
$$f(x_{k+1}) \le f(x_k) - \tfrac1L\|\nabla f(x_k)\|^2 + \tfrac{L}{2}\cdot\tfrac1{L^2}\|\nabla f(x_k)\|^2 = f(x_k) - \tfrac{1}{2L}\|\nabla f(x_k)\|^2. \tag{$*$}$$

*One-step contraction toward $x^{*}$.* By **first-order convexity**, $f(x_k) - f(x^{*}) \le \nabla f(x_k)\cdot(x_k - x^{*})$. Combining with $(*)$ and writing $g_k := \nabla f(x_k)$,
$$f(x_{k+1}) - f(x^{*}) \le g_k\cdot(x_k - x^{*}) - \tfrac{1}{2L}\|g_k\|^2 = \tfrac{L}{2}\Bigl(\|x_k - x^{*}\|^2 - \|x_k - \tfrac1L g_k - x^{*}\|^2\Bigr) = \tfrac{L}{2}\bigl(\|x_k - x^{*}\|^2 - \|x_{k+1} - x^{*}\|^2\bigr),$$
the middle equality being the algebraic identity $a\cdot b - \tfrac12\|b\|^2 = \tfrac12(\|a\|^2 - \|a - b\|^2)$ with $a = x_k - x^{*}$, $b = \tfrac1L g_k$.

*Telescoping.* The distances $\|x_k - x^{*}\|$ are nonincreasing by the displayed bound (the left side is $\ge 0$). Summing the inequality for $j = 0, \dots, k-1$,
$$\sum_{j=0}^{k-1}\bigl(f(x_{j+1}) - f(x^{*})\bigr) \le \tfrac{L}{2}\bigl(\|x_0 - x^{*}\|^2 - \|x_k - x^{*}\|^2\bigr) \le \tfrac{L}{2}\|x_0 - x^{*}\|^2.$$
By $(*)$ the values $f(x_j)$ are nonincreasing, so $f(x_k) - f(x^{*}) \le \tfrac1k\sum_{j=0}^{k-1}\bigl(f(x_{j+1}) - f(x^{*})\bigr) \le \dfrac{L\,\|x_0 - x^{*}\|^2}{2k}$. $\square$`,
  },
  {
    id: 'lagrange-multipliers',
    label: 'Lagrange Multipliers',
    title: 'Lagrange Multipliers',
    kind: 'theorem',
    tags: ['Optimization'],
    dependencies: ['gradient', 'critical-point', 'implicit-function-theorem', 'fermat-interior-extremum'],
    description: String.raw`**Lagrange multipliers** handle optimization under equality constraints. At a constrained extremum where the constraint is regular, the objective's gradient is a linear combination of the constraint gradients: the objective cannot improve along the constraint surface, so its gradient has no component tangent to it and must be normal — spanned by the constraint normals. The multipliers measure the optimum's sensitivity to the constraints.`,
    statement: String.raw`Let $f, g_1, \dots, g_m : U \to \mathbb{R}$ be $C^1$ on an open set $U \subseteq \mathbb{R}^n$ ($m < n$), and let $x^{*}$ be a local extremum of $f$ subject to $g_1(x) = \cdots = g_m(x) = 0$. If the constraint gradients $\nabla g_1(x^{*}), \dots, \nabla g_m(x^{*})$ are linearly independent (the **constraint qualification**), then there exist multipliers $\lambda_1, \dots, \lambda_m \in \mathbb{R}$ with
$$\nabla f(x^{*}) = \sum_{i=1}^{m} \lambda_i\,\nabla g_i(x^{*}).$$`,
    proof: String.raw`Let $g = (g_1, \dots, g_m) : U \to \mathbb{R}^m$. Independence of the rows $\nabla g_i(x^{*})$ means the Jacobian $Dg(x^{*})$ has rank $m$, so after reordering coordinates write $x = (u, v) \in \mathbb{R}^{n-m}\times\mathbb{R}^m$ with the partial Jacobian $D_v g(x^{*})$ invertible. By the **implicit function theorem**, near $x^{*} = (u^{*}, v^{*})$ the constraint set is the graph of a $C^1$ map $v = h(u)$ with $g(u, h(u)) = 0$ and $h(u^{*}) = v^{*}$; differentiating this identity,
$$D_u g + D_v g\,\,Dh = 0 \quad\Longrightarrow\quad Dh(u^{*}) = -\bigl(D_v g(x^{*})\bigr)^{-1} D_u g(x^{*}).$$
Now $\varphi(u) := f(u, h(u))$ has an unconstrained local extremum at $u^{*}$, so by **Fermat's condition** $\nabla\varphi(u^{*}) = 0$, i.e. by the chain rule
$$\nabla_u f(x^{*}) + Dh(u^{*})^{\top}\,\nabla_v f(x^{*}) = 0. \tag{1}$$
Define the multiplier row $\lambda^{\top} := \nabla_v f(x^{*})^{\top}\bigl(D_v g(x^{*})\bigr)^{-1} \in \mathbb{R}^m$. By construction $\nabla_v f(x^{*}) = D_v g(x^{*})^{\top}\lambda = \sum_i \lambda_i \nabla_v g_i(x^{*})$, matching the $v$-components. For the $u$-components, substitute the formula for $Dh(u^{*})^{\top} = -D_u g(x^{*})^{\top}(D_v g(x^{*})^{-1})^{\top}$ into $(1)$:
$$\nabla_u f(x^{*}) = D_u g(x^{*})^{\top}\bigl(D_v g(x^{*})^{-1}\bigr)^{\top}\nabla_v f(x^{*}) = D_u g(x^{*})^{\top}\lambda = \sum_i \lambda_i \nabla_u g_i(x^{*}).$$
Both coordinate blocks agree, so $\nabla f(x^{*}) = \sum_{i=1}^m \lambda_i \nabla g_i(x^{*})$ — the gradient of $f$ is normal to the constraint surface, i.e. $x^{*}$ is a **critical point** of the Lagrangian $f - \sum_i \lambda_i g_i$. $\square$`,
  },
  {
    id: 'convex-optimization',
    label: 'Convex Optimization',
    title: 'Convex Optimization',
    kind: 'definition',
    tags: ['Optimization'],
    dependencies: ['convex-function', 'convex-set', 'convexity-local-global'],
    description: String.raw`**Convex optimization** minimizes a convex objective over a convex feasible set. Because every local minimum is then global and first-order conditions are sufficient, such problems can be solved reliably and efficiently — by gradient and interior-point methods, with duality supplying optimality certificates. The convex/non-convex divide, more than linear/non-linear, marks the practical boundary of tractable optimization.`,
    definition: String.raw`A **convex optimization problem** is one of minimizing a convex function over a convex set,
$$\min_{x \in C} f(x), \qquad f : C \to \mathbb{R} \text{ convex},\ C \subseteq \mathbb{R}^n \text{ convex},$$
typically written in standard form $\min f(x)$ subject to $g_i(x) \le 0$ ($g_i$ convex) and $A x = b$ (affine equalities), whose feasible set is convex. By the local-global theorem its local and global minima coincide, and its set of optimal points is convex.`,
    proof: String.raw`**The feasible set and the local–global property.** The standard-form feasible set $C = \{x : g_i(x) \le 0,\ A x = b\}$ is convex: each sublevel set $\{x : g_i(x) \le 0\}$ is convex (if $g_i(x), g_i(y) \le 0$ then $g_i(tx+(1-t)y) \le t g_i(x) + (1-t)g_i(y) \le 0$ by **convexity** of $g_i$), the affine set $\{Ax = b\}$ is convex, and an intersection of **convex sets** is convex. Minimizing the convex $f$ over this convex $C$, the theorem that **local minima are global** applies verbatim, so the problem's local and global optima coincide and the optimal set is convex. This is precisely the structural feature the definition isolates. $\square$`,
  },
  {
    id: 'kkt-conditions',
    label: 'KKT Conditions',
    title: 'Karush–Kuhn–Tucker Conditions',
    kind: 'theorem',
    tags: ['Optimization'],
    dependencies: ['lagrange-multipliers', 'convex-function', 'convex-optimization', 'first-order-convexity'],
    description: String.raw`The **Karush–Kuhn–Tucker conditions** extend Lagrange multipliers to inequality constraints. At an optimum (under a constraint qualification) they require stationarity of the Lagrangian, primal and dual feasibility, and complementary slackness — a constraint's multiplier is nonzero only when that constraint is active. For convex problems they are also *sufficient*: any KKT point is a global optimum, the cornerstone of constrained convex optimization.`,
    statement: String.raw`Consider $\min f(x)$ subject to $g_i(x) \le 0$ ($i = 1, \dots, m$) and $h_j(x) = 0$ ($j = 1, \dots, p$), with all functions $C^1$. The **KKT conditions** at $x^{*}$ assert existence of multipliers $\mu_i \ge 0$, $\nu_j \in \mathbb{R}$ with
$$\nabla f(x^{*}) + \sum_i \mu_i \nabla g_i(x^{*}) + \sum_j \nu_j \nabla h_j(x^{*}) = 0,\quad g_i(x^{*}) \le 0,\ h_j(x^{*}) = 0,\quad \mu_i\,g_i(x^{*}) = 0.$$
**Sufficiency (convex case):** if $f$ and the $g_i$ are convex, the $h_j$ affine, and $(x^{*}, \mu, \nu)$ satisfies these conditions, then $x^{*}$ is a global minimizer.`,
    proof: String.raw`We prove the convex sufficiency direction. Define the Lagrangian $L(x) := f(x) + \sum_i \mu_i g_i(x) + \sum_j \nu_j h_j(x)$. With $\mu_i \ge 0$ fixed, each $\mu_i g_i$ is convex, each $\nu_j h_j$ is affine (hence convex), and $f$ is convex, so $L$ is a **convex function** of $x$, and $\nabla L(x^{*}) = 0$ is exactly the stationarity condition. By the **first-order characterization of convexity**, a convex differentiable function with vanishing gradient at $x^{*}$ attains its global minimum there:
$$L(x) \ge L(x^{*}) \qquad \text{for all } x \in \mathbb{R}^n. \tag{2}$$
Now let $x$ be any feasible point: $g_i(x) \le 0$ and $h_j(x) = 0$. Then since $\mu_i \ge 0$,
$$f(x) \ge f(x) + \sum_i \mu_i g_i(x) + \sum_j \nu_j h_j(x) = L(x) \ge L(x^{*}),$$
using $\mu_i g_i(x) \le 0$ and $h_j(x) = 0$ for the first inequality and $(2)$ for the second. Finally, **complementary slackness** $\mu_i g_i(x^{*}) = 0$ and feasibility $h_j(x^{*}) = 0$ give $L(x^{*}) = f(x^{*})$. Hence $f(x) \ge f(x^{*})$ for every feasible $x$, so $x^{*}$ is a global minimizer of the **convex optimization** problem.

*Remark on necessity.* The converse — that every regular local optimum satisfies the KKT conditions — also holds under a constraint qualification, but it is not a mere corollary of **Lagrange multipliers**. Applying the Lagrange theorem to the active constraints ($g_i = 0$ for $i$ active, $h_j = 0$) yields stationarity with multipliers of *unrestricted sign*; the inactive constraints can be assigned $\mu_i = 0$, giving complementary slackness. The genuinely extra content of KKT is the sign condition $\mu_i \ge 0$ on the inequality multipliers, which expresses that $-\nabla f(x^{*})$ lies in the cone generated by the active constraint gradients; establishing it requires a separation argument (Farkas' lemma), not the constraint qualification alone. $\square$`,
  },
]

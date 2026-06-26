import type { MathNode } from '../types'

export const NUMERICAL_ANALYSIS_NODES: MathNode[] = [
  // ── Errors, conditioning, stability ─────────────────────────────────────────
  {
    id: 'floating-point',
    label: 'Floating Point',
    title: 'Floating-Point Arithmetic',
    kind: 'definition',
    tags: ['Numerical Analysis'],
    dependencies: ['real-numbers'],
    description: String.raw`A computer cannot store a generic real number exactly; it keeps a fixed number of significant digits and an exponent, so representable numbers are spaced not uniformly but with a roughly constant *relative* gap. The size of that gap — the machine epsilon — is the fundamental resolution of the arithmetic: every stored value and every operation can be off by at most that small relative amount. Numerical analysis begins from this granularity and tracks how those tiny relative errors propagate and accumulate through a computation.`,
    definition: String.raw`Fix a base $\beta \ge 2$ and a precision $t \ge 1$. A **floating-point** number is $0$ or a value $x = \pm\,\beta^{e}\,(d_0 . d_1 d_2 \cdots d_{t-1})_\beta$ with leading digit $d_0 \neq 0$ (normalized), digits $0 \le d_i < \beta$, and exponent $e$ in a bounded range. The **machine epsilon** is $\varepsilon_{\mathrm{mach}} = \tfrac12\,\beta^{1-t}$ (IEEE 754 double precision: $\beta = 2$, $t = 53$, $\varepsilon_{\mathrm{mach}} \approx 1.1 \times 10^{-16}$). Rounding $\mathrm{fl} : \mathbb{R} \to F$ to the nearest floating-point number satisfies, for $x$ in the normalized range,
$$\mathrm{fl}(x) = x\,(1 + \delta), \qquad |\delta| \le \varepsilon_{\mathrm{mach}},$$
and each elementary operation $\circ \in \{+,-,\times,\div\}$ is computed as $\mathrm{fl}(a \circ b) = (a \circ b)(1 + \delta)$ with $|\delta| \le \varepsilon_{\mathrm{mach}}$ (the **standard model** of floating-point arithmetic).`,
  },
  {
    id: 'conditioning',
    label: 'Conditioning',
    title: 'Condition Number',
    kind: 'definition',
    tags: ['Numerical Analysis'],
    dependencies: ['floating-point', 'derivative'],
    description: String.raw`Some problems amplify input errors and some do not, and this is a property of the *problem*, before any algorithm is chosen. The condition number quantifies the amplification: it is the worst-case ratio of the relative change in the output to a relative change in the input. A large condition number marks an ill-conditioned problem, where even the tiny rounding errors of the input data can ruin the answer no matter how cleverly it is computed; a small one means the problem is intrinsically forgiving.`,
    definition: String.raw`Let $f$ be the map taking a problem's data $x$ to its solution $f(x)$. The (relative) **condition number** measures the sensitivity of $f$ at $x$,
$$\kappa(x) = \lim_{\varepsilon \to 0}\ \sup_{\lVert \Delta x\rVert \le \varepsilon\lVert x\rVert}\ \frac{\lVert f(x + \Delta x) - f(x)\rVert / \lVert f(x)\rVert}{\lVert \Delta x\rVert / \lVert x\rVert},$$
so a relative input perturbation of size $\rho$ can produce a relative output change up to about $\kappa(x)\,\rho$. When $f$ is differentiable this is $\kappa(x) = \lVert f'(x)\rVert\,\lVert x\rVert / \lVert f(x)\rVert$ in terms of the **derivative** $f'$. For the linear system $Ax = b$ (data $b$, solution $A^{-1}b$) the relevant quantity is $\kappa(A) = \lVert A\rVert\,\lVert A^{-1}\rVert \ge 1$. A problem is **ill-conditioned** when $\kappa$ is large.`,
  },
  {
    id: 'numerical-stability',
    label: 'Numerical Stability',
    title: 'Numerical Stability',
    kind: 'definition',
    tags: ['Numerical Analysis'],
    dependencies: ['conditioning', 'floating-point'],
    description: String.raw`Conditioning describes the problem; stability describes the algorithm. A stable algorithm does not manufacture error beyond what the problem's conditioning already forces — the cleanest version, backward stability, says the computed answer is the *exact* answer to a slightly perturbed input. Pairing the two gives the master rule of numerical computing: a backward stable algorithm on a well-conditioned problem yields an accurate result, because the small input perturbation it is exact for is amplified only modestly. Either bad conditioning or instability alone can destroy accuracy.`,
    definition: String.raw`Let $\tilde f(x)$ denote the value an algorithm actually computes for the problem $f$ on data $x$ (in floating-point). The algorithm is **backward stable** if for every $x$ there is a nearby input $\tilde x$ with
$$\tilde f(x) = f(\tilde x), \qquad \frac{\lVert \tilde x - x\rVert}{\lVert x\rVert} = O(\varepsilon_{\mathrm{mach}}),$$
i.e. the computed output is the exact output for data within a few rounding units of the true data. The **forward error** $\lVert \tilde f(x) - f(x)\rVert / \lVert f(x)\rVert$ is then controlled by the rule of thumb
$$\text{forward error} \ \lesssim\ \kappa(x)\,\cdot\,\text{backward error},$$
combining stability with the **conditioning** $\kappa(x)$ of the problem. (More generally an algorithm is called *stable* if it gives nearly the right answer to a nearly right question.)`,
  },

  // ── Interpolation ───────────────────────────────────────────────────────────
  {
    id: 'interpolation',
    label: 'Interpolation',
    title: 'Interpolation',
    kind: 'definition',
    tags: ['Numerical Analysis'],
    dependencies: ['polynomial', 'function'],
    description: String.raw`Given the values of an unknown function at finitely many points, interpolation reconstructs a function that passes through those points exactly, so it can be evaluated, differentiated, or integrated everywhere in between. Polynomials are the simplest interpolants and a single one of degree below the number of points always fits, but forcing a high-degree polynomial through many equally spaced points makes it oscillate wildly near the ends (Runge's phenomenon), so in practice one stitches together low-degree pieces (splines) or chooses the nodes wisely (Chebyshev points). Interpolation is the substrate beneath quadrature, finite elements, and most ways of replacing a complicated function by a simple one.`,
    definition: String.raw`Given $n$ data points $(x_0, y_0), \dots, (x_{n-1}, y_{n-1})$ with distinct nodes $x_i$, an **interpolant** from a family of functions is one passing through them exactly: $p(x_i) = y_i$ for all $i$. **Polynomial interpolation** seeks $p$ a **polynomial** of degree $< n$; **piecewise-polynomial** interpolation (e.g. **splines**) instead uses a low-degree polynomial on each subinterval, joined with prescribed smoothness at the nodes. When the $y_i = f(x_i)$ sample a **function** $f$, the interpolant is an approximation to $f$ whose quality away from the nodes is the object of study.`,
  },
  {
    id: 'lagrange-interpolation-theorem',
    label: 'Interpolation Existence',
    title: 'Existence & Uniqueness of the Interpolating Polynomial',
    kind: 'theorem',
    tags: ['Numerical Analysis'],
    dependencies: ['interpolation', 'polynomial', 'fundamental-theorem-of-algebra'],
    description: String.raw`Polynomial interpolation is never under- or over-determined when the count is right: through any $n$ points with distinct $x$-coordinates there passes exactly one polynomial of degree below $n$. Existence is exhibited concretely by the Lagrange basis — a sum of "indicator" polynomials, each one at its own node and zero at the others — and uniqueness follows because two solutions would differ by a low-degree polynomial with too many roots. This is the theorem that licenses speaking of *the* interpolating polynomial.`,
    statement: String.raw`Let $x_0, \dots, x_{n-1}$ be distinct real numbers and $y_0, \dots, y_{n-1}$ arbitrary. There is a unique **polynomial** $p$ of degree $\le n-1$ with $p(x_i) = y_i$ for all $i$. It is given explicitly by the **Lagrange form**
$$p(x) = \sum_{i=0}^{n-1} y_i\,\ell_i(x), \qquad \ell_i(x) = \prod_{j \neq i} \frac{x - x_j}{x_i - x_j}.$$`,
    proof: String.raw`*Existence.* Each $\ell_i$ is a product of $n-1$ linear factors, hence a polynomial of degree $n-1$. The nodes being distinct, the denominators $\prod_{j\neq i}(x_i - x_j)$ are nonzero, so $\ell_i$ is well defined, and by construction $\ell_i(x_k) = \prod_{j \neq i}\frac{x_k - x_j}{x_i - x_j}$ equals $1$ when $k = i$ (every factor is $1$) and $0$ when $k \neq i$ (the factor with $j = k$ vanishes); that is, $\ell_i(x_k) = \delta_{ik}$. Hence $p = \sum_i y_i \ell_i$ has degree $\le n-1$ and $p(x_k) = \sum_i y_i \delta_{ik} = y_k$ for every $k$.

*Uniqueness.* If $p$ and $q$ both have degree $\le n-1$ and agree at all $n$ distinct nodes, then $r = p - q$ has degree $\le n-1$ yet vanishes at the $n$ distinct points $x_0, \dots, x_{n-1}$. A nonzero polynomial of degree $\le n-1$ has at most $n-1$ roots (a consequence of the **fundamental theorem of algebra**, equivalently of the factor theorem from polynomial division), so $r$ must be the zero polynomial; thus $p = q$. $\square$`,
  },
  {
    id: 'interpolation-error-formula',
    label: 'Interpolation Error',
    title: 'Polynomial Interpolation Error Formula',
    kind: 'theorem',
    tags: ['Numerical Analysis'],
    dependencies: ['lagrange-interpolation-theorem', 'rolles-theorem', 'higher-order-derivative'],
    description: String.raw`How far does the interpolating polynomial stray from the function it samples? The error at a point is governed by two competing factors: a derivative of the function — large where the function bends sharply — and the node polynomial $\prod (x - x_i)$, which is small near the nodes but can swell between them. This formula is the exact analogue of the Taylor remainder (which it becomes when all nodes coalesce), and it both explains Runge's phenomenon for equally spaced nodes and motivates Chebyshev nodes, which minimize the node polynomial's peak.`,
    statement: String.raw`Let $f$ be $n$ times continuously differentiable on an interval containing the distinct nodes $x_0, \dots, x_{n-1}$ and the point $x$, and let $p$ be the interpolating polynomial of degree $\le n-1$ with $p(x_i) = f(x_i)$. Then there is a point $\xi$ in the smallest interval containing $x$ and the nodes with
$$f(x) - p(x) = \frac{f^{(n)}(\xi)}{n!}\,\prod_{i=0}^{n-1}(x - x_i).$$`,
    proof: String.raw`If $x$ equals some node both sides are $0$, so assume $x$ is not a node. Write $w(t) = \prod_{i=0}^{n-1}(t - x_i)$, a monic polynomial of degree $n$, and define the constant $C = \dfrac{f(x) - p(x)}{w(x)}$ (legitimate since $w(x) \neq 0$). Consider the auxiliary function
$$g(t) = f(t) - p(t) - C\,w(t).$$
Then $g$ vanishes at the $n$ nodes $x_0, \dots, x_{n-1}$ (there $f = p$ and $w = 0$) and also at $t = x$ (by the choice of $C$), so $g$ has at least $n+1$ distinct zeros in the interval. Since $f \in C^n$ and $p, w$ are polynomials, $g$ is $n$ times continuously differentiable. Applying **Rolle's theorem** repeatedly: between consecutive zeros of $g$ there is a zero of $g'$, giving $g'$ at least $n$ zeros; iterating, $g^{(n)}$ has at least one zero $\xi$ in the interval. Now $p$ has degree $\le n-1$ so $p^{(n)} = 0$, and $w$ is monic of degree $n$ so $w^{(n)} = n!$ (a **higher-order derivative** computation). Hence
$$0 = g^{(n)}(\xi) = f^{(n)}(\xi) - 0 - C\,n!,$$
giving $C = f^{(n)}(\xi)/n!$. Substituting back into $f(x) - p(x) = C\,w(x)$ yields the formula. $\square$`,
  },

  // ── Numerical integration ───────────────────────────────────────────────────
  {
    id: 'numerical-integration',
    label: 'Numerical Integration',
    title: 'Numerical Integration (Quadrature)',
    kind: 'definition',
    tags: ['Numerical Analysis'],
    dependencies: ['riemann-integral', 'lagrange-interpolation-theorem'],
    description: String.raw`Most integrals have no closed form, so they are approximated by sampling the integrand at a few points and taking a weighted sum — a quadrature rule. The classical Newton–Cotes rules (midpoint, trapezoidal, Simpson) come from integrating the polynomial that interpolates the samples at equally spaced points, so a rule that is exact for polynomials up to some degree is accurate to a matching order. Gaussian quadrature is the optimization of this idea: by also choosing *where* to sample, $n$ points buy exactness for all polynomials of degree up to $2n-1$, twice what fixed nodes achieve.`,
    definition: String.raw`A **quadrature rule** approximates a definite integral by a finite weighted sum of sampled values,
$$\int_a^b f(x)\,dx \ \approx\ Q_n(f) = \sum_{i=0}^{n-1} w_i\,f(x_i),$$
with **nodes** $x_i \in [a,b]$ and **weights** $w_i$. The rule has **degree of exactness** $m$ if $Q_n(p) = \int_a^b p$ for every **polynomial** $p$ of degree $\le m$. **Interpolatory** rules take $w_i = \int_a^b \ell_i$ for the Lagrange basis $\ell_i$ of the nodes (so $Q_n$ integrates the **interpolating polynomial** of $f$); these include the trapezoidal rule ($n=2$) and Simpson's rule ($n=3$). **Gaussian quadrature** chooses both nodes and weights to maximize the degree of exactness.`,
  },
  {
    id: 'gaussian-quadrature-exactness',
    label: 'Gaussian Quadrature',
    title: 'Optimality of Gaussian Quadrature',
    kind: 'theorem',
    tags: ['Numerical Analysis'],
    dependencies: ['numerical-integration', 'gram-schmidt', 'lagrange-interpolation-theorem'],
    description: String.raw`Fixing the nodes, an $n$-point interpolatory rule is exact only up to degree $n-1$. Gaussian quadrature recovers a hidden factor of two: by placing the nodes at the roots of the degree-$n$ orthogonal polynomial for the weight, the same $n$ samples integrate every polynomial of degree up to $2n-1$ exactly — and no $n$-point rule can do better. The mechanism is a division algorithm followed by orthogonality: writing a high-degree polynomial as quotient times the node polynomial plus a remainder, the quotient term integrates to zero precisely because the node polynomial is orthogonal to everything of lower degree.`,
    statement: String.raw`On $[a,b]$ fix a positive weight $w(x) > 0$ and the inner product $\langle f, g\rangle = \int_a^b f g\,w\,dx$ (the choice $w \equiv 1$ recovers ordinary integration). Let $\pi_n$ be the degree-$n$ polynomial orthogonal in $\langle\cdot,\cdot\rangle$ to all polynomials of lower degree, and let $x_0, \dots, x_{n-1}$ be its $n$ roots, all real, simple, and inside $(a,b)$. The interpolatory rule on these **Gauss nodes**, with weights $w_i = \int_a^b \ell_i\,w\,dx$, has degree of exactness $2n-1$: $Q_n(p) = \int_a^b p\,w\,dx$ for every polynomial $p$ of degree $\le 2n-1$. No $n$-point rule for the weighted integral exceeds degree $2n-1$.`,
    proof: String.raw`The orthogonal polynomials $\pi_0, \pi_1, \dots$ are produced by **Gram–Schmidt** applied to $1, x, x^2, \dots$ under $\langle\cdot,\cdot\rangle$; thus $\pi_n$ has degree $n$ and $\langle \pi_n, q\rangle = 0$ for every $q$ of degree $< n$. (That its roots are real, simple, and in $(a,b)$: if $\pi_n$ changed sign at only $k < n$ interior points $t_1, \dots, t_k$, then $\pi_n(x)\prod_{j}(x - t_j)$ would not change sign on $[a,b]$, so $\int_a^b \pi_n(x)\prod_j(x-t_j)\,w\,dx \neq 0$ since $w > 0$ — yet $\prod_j(x-t_j)$ has degree $k < n$, making that integral $\langle \pi_n, \prod_j(\cdot - t_j)\rangle = 0$, a contradiction; hence $k = n$.)

*Exactness to degree $2n-1$.* Let $\deg p \le 2n-1$. Divide by $\pi_n$: $p = q\,\pi_n + r$ with $\deg q \le n-1$ and $\deg r \le n-1$. Then
$$\int_a^b p\,w\,dx = \int_a^b q\,\pi_n\,w\,dx + \int_a^b r\,w\,dx = \langle q, \pi_n\rangle + \int_a^b r\,w\,dx = 0 + \int_a^b r\,w\,dx,$$
the first integral vanishing by orthogonality since $\deg q < n$. On the other side, since each node is a root of $\pi_n$, $p(x_i) = q(x_i)\pi_n(x_i) + r(x_i) = r(x_i)$, so $Q_n(p) = \sum_i w_i p(x_i) = \sum_i w_i r(x_i) = Q_n(r)$. But $\deg r \le n-1$, and an $n$-node interpolatory rule is exact on degree $\le n-1$ (the **interpolating polynomial** of degree $\le n-1$ equals $r$ itself, and the weights were defined to integrate the Lagrange basis exactly against $w$), so $Q_n(r) = \int_a^b r\,w\,dx$. Combining, $Q_n(p) = \int_a^b p\,w\,dx$.

*No $n$-point rule beats $2n-1$.* For any nodes $x_0, \dots, x_{n-1}$ take $p(x) = \prod_i (x - x_i)^2$, of degree $2n$: then $\int_a^b p\,w\,dx > 0$ (a nonzero square times the positive weight) while $\sum_i w_i p(x_i) = 0$, so $Q_n(p) \neq \int_a^b p\,w\,dx$; no $n$-point rule is exact on all of degree $2n$. $\square$`,
  },

  // ── Root-finding ────────────────────────────────────────────────────────────
  {
    id: 'root-finding',
    label: 'Root-Finding',
    title: 'Root-Finding',
    kind: 'definition',
    tags: ['Numerical Analysis'],
    dependencies: ['derivative', 'continuity'],
    description: String.raw`Solving $f(x) = 0$ for a nonlinear $f$ almost never has a formula, so one iterates toward a root from a starting guess. The two archetypes trade robustness against speed: bisection brackets a sign change and halves the interval each step — guaranteed to converge but only linearly — while Newton's method follows the tangent line to its $x$-intercept, doubling the number of correct digits each step near a simple root but liable to diverge from a poor start. These iterations are the workhorses for the nonlinear equations that pervade scientific computing.`,
    definition: String.raw`A **root** of $f$ is a solution of $f(x) = 0$; a root $x^*$ is **simple** if $f(x^*) = 0$ but $f'(x^*) \neq 0$ (using the **derivative**). Two basic iterative schemes, both relying on **continuity** of $f$: **bisection** maintains an interval $[a_n, b_n]$ with $f(a_n)f(b_n) < 0$ and replaces it by the half whose endpoints still bracket a sign change; **Newton's method** iterates
$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)},$$
the $x$-intercept of the tangent line at $x_n$. An iteration converges with **order** $q$ to $x^*$ if $|x_{n+1} - x^*| \le C\,|x_n - x^*|^q$ for some $C$; $q = 1$ (with $C < 1$) is **linear**, $q = 2$ is **quadratic**.`,
  },
  {
    id: 'bisection-convergence',
    label: 'Bisection',
    title: 'Convergence of Bisection',
    kind: 'proposition',
    tags: ['Numerical Analysis'],
    dependencies: ['root-finding', 'intermediate-value-theorem', 'monotone-convergence-sequence'],
    description: String.raw`Bisection is the safest root-finder: as long as the function is continuous and the starting endpoints straddle a sign change, a root is trapped inside the bracket forever, and since the bracket is halved each step its width — and therefore the error — shrinks geometrically by a factor of two. The cost is speed: each step buys only a single bit of accuracy, so convergence is merely linear. Robustness is the payoff — no derivative, no good initial guess, and no possibility of running away are required.`,
    statement: String.raw`Let $f : [a, b] \to \mathbb{R}$ be continuous with $f(a)f(b) < 0$. The bisection iterates $[a_n, b_n]$ (with $[a_0,b_0] = [a,b]$) bracket a root $x^*$ of $f$ for every $n$, and the midpoints $c_n = \tfrac12(a_n + b_n)$ satisfy
$$|c_n - x^*| \le \frac{b - a}{2^{\,n+1}} \xrightarrow{\ n \to \infty\ } 0.$$`,
    proof: String.raw`Each interval keeps a sign change: by construction $f(a_n)f(b_n) < 0$ for every $n$, and by the **intermediate value theorem** this guarantees no bracket is ever empty of a root. Bisection forms the midpoint $m = \tfrac12(a_n + b_n)$ and keeps whichever half $[a_n, m]$ or $[m, b_n]$ has endpoints of opposite sign (if $f(m) = 0$ the root is found exactly), so $b_{n+1} - a_{n+1} = \tfrac12(b_n - a_n)$, whence by induction $b_n - a_n = (b - a)/2^n$.

*A single root in all brackets.* Each new bracket is a half of its predecessor, so the brackets are nested, $[a_{n+1}, b_{n+1}] \subseteq [a_n, b_n]$, with lengths $b_n - a_n = (b-a)/2^n \to 0$. Thus $(a_n)$ is nondecreasing and bounded above (by $b$) and $(b_n)$ nonincreasing and bounded below (by $a$); by the **monotone convergence theorem** each converges, and since $b_n - a_n \to 0$ they share a common limit, so $\bigcap_n [a_n, b_n] = \{x^*\}$ is a single point with $a_n \to x^*$ and $b_n \to x^*$. By continuity of $f$, $f(x^*)^2 = \lim_n f(a_n)f(b_n) \le 0$, forcing $f(x^*) = 0$; this one fixed root $x^*$ lies in every $[a_n, b_n]$.

*Error bound.* Since this $x^*$ and the midpoint $c_n$ both lie in $[a_n, b_n]$, they differ by at most half its length:
$$|c_n - x^*| \le \tfrac12(b_n - a_n) = \frac{b-a}{2^{\,n+1}} \to 0.$$
The error is at least halved each step, so convergence is linear with rate $\tfrac12$. $\square$`,
  },
  {
    id: 'newton-quadratic-convergence',
    label: "Newton's Method",
    title: "Quadratic Convergence of Newton's Method",
    kind: 'theorem',
    tags: ['Numerical Analysis'],
    dependencies: ['root-finding', 'taylor-theorem', 'higher-order-derivative'],
    description: String.raw`Newton's method is fast where it works: near a simple root it roughly squares the error each step, so the number of correct digits doubles per iteration — quadratic convergence. The reason is visible in a Taylor expansion: the tangent-line step cancels the function's value and its first derivative, leaving an error driven only by the second derivative times the *square* of the previous error. The catch, equally visible, is locality — the estimate holds only once the iterate is close enough, which is why a good starting guess (or a globalizing safeguard) matters.`,
    statement: String.raw`Let $f$ be twice continuously differentiable near a **simple root** $x^*$ (so $f(x^*) = 0$, $f'(x^*) \neq 0$). Then there is a neighborhood of $x^*$ such that, for any $x_0$ in it, the Newton iterates $x_{n+1} = x_n - f(x_n)/f'(x_n)$ are well defined, converge to $x^*$, and satisfy
$$|x_{n+1} - x^*| \le C\,|x_n - x^*|^2, \qquad C = \frac{\max |f''|}{2\,\min |f'|}$$
over a small interval about $x^*$ — quadratic convergence.`,
    proof: String.raw`Since $f'$ is continuous and $f'(x^*) \neq 0$, pick $\delta > 0$ and constants $0 < m \le |f'| \le \text{(finite)}$, $|f''| \le M$ on $I = [x^* - \delta, x^* + \delta]$, with $\delta$ small enough that $C\delta < 1$ where $C = M/(2m)$; on $I$, $f' \neq 0$ so each Newton step is defined. Let $e_n = x_n - x^*$ and suppose $x_n \in I$. Expand $f$ about $x_n$ by **Taylor's theorem** (with the Lagrange remainder, a **higher-order derivative** term) evaluated at $x^*$: for some $\xi$ between $x_n$ and $x^*$,
$$0 = f(x^*) = f(x_n) + f'(x_n)(x^* - x_n) + \tfrac12 f''(\xi)(x^* - x_n)^2.$$
Divide by $f'(x_n)$ and rearrange, using $x_{n+1} - x^* = x_n - x^* - f(x_n)/f'(x_n)$:
$$x_{n+1} - x^* = -\frac{f(x_n)}{f'(x_n)} + (x_n - x^*) = \frac{f''(\xi)}{2 f'(x_n)}\,(x_n - x^*)^2.$$
Taking absolute values, $|e_{n+1}| \le \dfrac{M}{2m}\,|e_n|^2 = C\,|e_n|^2$. Now if $|e_0| \le \delta$ then $|e_1| \le C\delta\,|e_0| < |e_0| \le \delta$, so $x_1 \in I$, and inductively $|e_{n+1}| \le (C\delta)\,|e_n|$ with $C\delta < 1$, giving $e_n \to 0$, i.e. $x_n \to x^*$; the inequality $|e_{n+1}| \le C|e_n|^2$ then exhibits the quadratic order. $\square$`,
  },

  // ── Numerical linear algebra ────────────────────────────────────────────────
  {
    id: 'numerical-linear-algebra',
    label: 'Numerical Linear Algebra',
    title: 'Numerical Linear Algebra',
    kind: 'definition',
    tags: ['Numerical Analysis'],
    dependencies: ['matrix', 'conditioning', 'determinant'],
    description: String.raw`Almost every large computation eventually reduces to linear algebra, and doing it on a computer is its own discipline. The guiding strategy is factorization: rewrite a matrix as a product of structured pieces — triangular, orthogonal, diagonal — for which the system $Ax = b$, the least-squares problem, or the eigenvalue problem becomes trivial. LU with pivoting solves general systems, QR handles least squares stably, and the SVD reveals rank and conditioning. These factorizations are the computational core beneath scientific computing, and Cramer's rule (solving via determinants) is precisely what one must *not* do.`,
    definition: String.raw`**Numerical linear algebra** is the computational solution of problems posed with a **matrix** $A$: the linear system $Ax = b$, the least-squares problem $\min_x \lVert Ax - b\rVert_2$, and the eigenvalue problem. **Direct methods** produce a factorization in finitely many arithmetic operations: the **LU factorization** $PA = LU$ ($P$ a permutation from pivoting, $L$ unit lower- and $U$ upper-triangular) reduces $Ax = b$ to two triangular solves; the **QR factorization** $A = QR$ ($Q$ orthogonal, $R$ upper-triangular) solves least squares stably. The **singular value decomposition** $A = U\Sigma V^{\!\top}$ ($U, V$ orthogonal, $\Sigma$ diagonal with the singular values) exposes rank and, through $\kappa_2(A) = \sigma_{\max}/\sigma_{\min}$, the **conditioning**; unlike LU and QR it cannot be obtained in finitely many arithmetic operations — it encodes the eigenvalues of $A^{\!\top} A$, which by Abel–Ruffini have no finite radical formula in general — so it is computed iteratively. Solving by Cramer's rule — explicit **determinant** ratios — is exponentially costly and avoided.`,
  },
  {
    id: 'iterative-methods',
    label: 'Iterative Methods',
    title: 'Iterative Methods',
    kind: 'definition',
    tags: ['Numerical Analysis'],
    dependencies: ['numerical-linear-algebra', 'eigenvalue-eigenvector'],
    description: String.raw`When a matrix is enormous and mostly zeros — as the discretizations of PDEs produce — factoring it directly is infeasible because the factors fill in and exhaust memory. Iterative methods instead approach the solution by repeated cheap operations, chiefly matrix–vector products that exploit sparsity. Classical splittings (Jacobi, Gauss–Seidel) generate a sequence whose convergence is dictated by the spectral radius of an iteration matrix; Krylov subspace methods (conjugate gradient for symmetric positive-definite systems, GMRES in general) build successively better approximations from the span of $b, Ab, A^2b, \dots$. Convergence speed hinges on conditioning, which preconditioning aims to improve.`,
    definition: String.raw`An **iterative method** for $Ax = b$ generates a sequence $x_0, x_1, \dots \to x = A^{-1}b$ using only cheap operations (typically sparse matrix–vector products), in contrast to a direct factorization. A **stationary** method comes from a splitting $A = M - N$ with $M$ easily invertible, iterating $x_{k+1} = M^{-1}(N x_k + b)$; it converges for every $x_0$ iff the **spectral radius** $\rho(M^{-1}N) = \max\{\,|\lambda| : \lambda \text{ an } \textbf{eigenvalue} \text{ of } M^{-1}N\,\} < 1$ (Jacobi and Gauss–Seidel are the splittings into the diagonal, resp. lower-triangular, part). **Krylov subspace** methods extract $x_k$ from $x_0 + \mathcal{K}_k$, $\mathcal{K}_k = \operatorname{span}\{r_0, Ar_0, \dots, A^{k-1}r_0\}$: **conjugate gradient** (symmetric positive-definite $A$) and **GMRES** (general $A$). **Preconditioning** replaces $A$ by $P^{-1}A$ with $P \approx A$ to shrink the **conditioning** and accelerate convergence.`,
  },

  // ── Differential equations ──────────────────────────────────────────────────
  {
    id: 'numerical-ode',
    label: 'Numerical ODEs',
    title: 'Numerical Methods for ODEs',
    kind: 'definition',
    tags: ['Numerical Analysis'],
    dependencies: ['ordinary-differential-equation', 'lipschitz-condition'],
    description: String.raw`An initial value problem is solved on a computer by marching forward in time in discrete steps, replacing the differential equation by an update rule for the value at the next step. Euler's method takes the simplest step — follow the current slope — while Runge–Kutta methods sample the slope several times within a step to cancel more terms of the error and achieve higher order. Two distinct concerns govern the choice of method and step size: accuracy (the order of the local error) and stability (whether errors are damped or amplified across many steps), the latter decisive for stiff equations, where an explicit method forces absurdly tiny steps and an implicit one is needed.`,
    definition: String.raw`For the initial value problem $y'(t) = f(t, y)$, $y(t_0) = y_0$ — a first-order **ordinary differential equation**, with $f$ typically **Lipschitz** in $y$ — a **one-step method** with step size $h$ advances $y_n \approx y(t_n)$, $t_n = t_0 + nh$, by $y_{n+1} = y_n + h\,\Phi(t_n, y_n, h)$. **Euler's method** uses $\Phi = f(t_n, y_n)$ (explicit) or $\Phi = f(t_{n+1}, y_{n+1})$ (backward/implicit); **Runge–Kutta** methods evaluate $f$ at several intermediate stages per step. A method has **order** $p$ if its **local truncation error** — the residual when the exact solution is substituted — is $O(h^{p+1})$. It is **stiff**-suitable (A-stable) when its region of absolute stability contains the whole left half-plane, so it stays bounded on $y' = \lambda y$, $\operatorname{Re}\lambda < 0$, for every $h > 0$ (implicit methods only).`,
  },
  {
    id: 'euler-method-convergence',
    label: "Euler Convergence",
    title: "Convergence of Euler's Method",
    kind: 'theorem',
    tags: ['Numerical Analysis'],
    dependencies: ['numerical-ode', 'lipschitz-condition', 'taylor-theorem'],
    description: String.raw`Euler's method actually works: as the step size shrinks, the computed trajectory converges to the true solution, with global error proportional to the step size — first order. The proof shows the two ingredients that recur throughout the numerical analysis of differential equations. *Consistency*: one Euler step is wrong only by $O(h^2)$, the Taylor remainder. *Stability*: the Lipschitz condition keeps the method from amplifying the accumulated error too fast, so summing $N \approx 1/h$ local errors of size $O(h^2)$ yields a global error of size $O(h)$ rather than $O(1)$. This is the simplest instance of the consistency-plus-stability-implies-convergence principle.`,
    statement: String.raw`Let $f(t,y)$ be continuous and **Lipschitz** in $y$ with constant $L$, and let $y$ be the exact solution of $y' = f(t,y)$, $y(t_0) = y_0$, with $y$ twice continuously differentiable and $|y''| \le M$ on $[t_0, T]$. The explicit Euler iterates $y_{n+1} = y_n + h f(t_n, y_n)$ satisfy, for $t_n = t_0 + nh \le T$,
$$|y_n - y(t_n)| \ \le\ \frac{Mh}{2L}\Bigl(e^{L(t_n - t_0)} - 1\Bigr) \ =\ O(h),$$
so $y_n \to y(t_n)$ as $h \to 0$: explicit Euler is convergent of order $1$.`,
    proof: String.raw`*Local error (consistency).* Expanding the exact solution by **Taylor's theorem**, for some $\xi_n \in (t_n, t_{n+1})$,
$$y(t_{n+1}) = y(t_n) + h\,y'(t_n) + \tfrac12 h^2 y''(\xi_n) = y(t_n) + h\,f(t_n, y(t_n)) + \tfrac12 h^2 y''(\xi_n),$$
so the exact solution satisfies the Euler step up to the residual $\tau_n = \tfrac12 h^2 y''(\xi_n)$ with $|\tau_n| \le \tfrac12 M h^2$.

*Error recursion (stability).* Let $e_n = y_n - y(t_n)$. Subtracting the exact relation from the numerical one,
$$e_{n+1} = e_n + h\bigl(f(t_n, y_n) - f(t_n, y(t_n))\bigr) - \tau_n,$$
and the **Lipschitz** bound gives $|f(t_n, y_n) - f(t_n, y(t_n))| \le L\,|e_n|$, so
$$|e_{n+1}| \le (1 + hL)\,|e_n| + \tfrac12 M h^2.$$

*Discrete Grönwall.* With $e_0 = 0$, unrolling this linear recursion,
$$|e_n| \le \tfrac12 M h^2 \sum_{k=0}^{n-1}(1 + hL)^k = \tfrac12 M h^2\,\frac{(1+hL)^n - 1}{hL} = \frac{Mh}{2L}\bigl((1+hL)^n - 1\bigr).$$
Finally $1 + hL \le e^{hL}$, so $(1+hL)^n \le e^{nhL} = e^{L(t_n - t_0)}$, yielding $|e_n| \le \dfrac{Mh}{2L}\bigl(e^{L(t_n - t_0)} - 1\bigr)$. The bound is linear in $h$ and uniform on $[t_0, T]$, so $e_n \to 0$ as $h \to 0$. $\square$`,
  },
  {
    id: 'finite-difference-method',
    label: 'Finite Difference Method',
    title: 'Finite Difference Method',
    kind: 'definition',
    tags: ['Numerical Analysis'],
    dependencies: ['partial-differential-equation', 'taylor-theorem'],
    description: String.raw`The most direct way to solve a differential equation numerically is to lay down a grid and replace each derivative by a difference of nearby grid values, turning the equation into a large system of algebraic equations for the unknown grid values. The replacement is exact up to a power of the grid spacing given by Taylor's theorem, which fixes the method's order of accuracy. For time-dependent problems an explicit update is cheap but conditionally stable — the time step is capped by the spatial spacing through the CFL condition — whereas an implicit update solves a system each step but can be unconditionally stable.`,
    definition: String.raw`The **finite difference method** discretizes a differential equation on a grid $\{x_j = jh\}$ (and $\{t_n = n\,\Delta t\}$ in time), replacing derivatives by **difference quotients** derived from **Taylor's theorem**:
$$u'(x_j) \approx \frac{u_{j+1} - u_{j-1}}{2h}, \qquad u''(x_j) \approx \frac{u_{j+1} - 2u_j + u_{j-1}}{h^2},$$
with truncation error $O(h^2)$. Substituting these into the **partial differential equation** yields a (typically sparse) algebraic system for the grid unknowns $u_j$. The scheme is **consistent** of order $(p,q)$ if its truncation error is $O(h^p + \Delta t^q)$; for an explicit time-stepping scheme **stability** requires the **CFL condition** bounding $\Delta t$ in terms of $h$ (e.g. $\Delta t \le h^2/2$ for the explicit heat equation), while implicit schemes can be unconditionally stable.`,
  },
  {
    id: 'lax-equivalence-theorem',
    label: 'Lax Equivalence',
    title: 'Lax Equivalence Theorem',
    kind: 'theorem',
    tags: ['Numerical Analysis'],
    dependencies: ['finite-difference-method', 'numerical-stability', 'banach-space', 'uniform-boundedness-principle'],
    description: String.raw`This is the organizing theorem of finite-difference methods for evolution equations, and the reason "consistency + stability = convergence" is the slogan of the field. For a well-posed linear initial-value problem and a consistent scheme, convergence — the computed solution approaching the true one as the grid is refined — holds if and only if the scheme is stable, meaning the discrete time-stepping operators are bounded uniformly as the step shrinks. It reduces the hard analytic question of convergence to the algebraic, checkable question of stability (the matrix powers not blowing up), which is why von Neumann stability analysis is a practical tool.`,
    statement: String.raw`For a consistent finite-difference approximation to a well-posed linear initial-value problem (the solution operators forming a bounded family on a **Banach space**), the scheme is **convergent** if and only if it is **stable** — i.e. the discrete evolution operators $\{C(\Delta t)^n : n\,\Delta t \le T\}$ are uniformly bounded as $\Delta t \to 0$.`,
    proof: String.raw`*Stability $\Rightarrow$ convergence (this direction is the genuine, usable content).* Let $u^n$ be the exact solution sampled on the grid and $v^n$ the numerical one, $v^{n+1} = C(\Delta t) v^n$. **Consistency** means the exact solution satisfies the scheme up to a local truncation error: $u^{n+1} = C(\Delta t)u^n + \Delta t\,\tau^n$ with $\lVert \tau^n\rVert \to 0$ as $\Delta t \to 0$. The global error $e^n = v^n - u^n$ then obeys $e^{n+1} = C(\Delta t)e^n - \Delta t\,\tau^n$, so by induction $e^n = C(\Delta t)^n e^0 - \Delta t\sum_{k=0}^{n-1} C(\Delta t)^{\,n-1-k}\tau^k$. **Stability** supplies a constant $K$ with $\lVert C(\Delta t)^m\rVert \le K$ for all $m\,\Delta t \le T$; with $e^0 = 0$,
$$\lVert e^n\rVert \le \Delta t \sum_{k=0}^{n-1} \lVert C(\Delta t)^{\,n-1-k}\rVert\,\lVert \tau^k\rVert \le K\,(n\,\Delta t)\,\max_k \lVert \tau^k\rVert \le K\,T\,\max_k\lVert\tau^k\rVert \to 0.$$
This is a fully rigorous argument from the stated hypotheses.

*Convergence $\Rightarrow$ stability (sketch, naming the deep input).* The converse is the harder half and rests on functional analysis beyond this graph: if the scheme were unstable, $\sup_n \lVert C(\Delta t)^n\rVert = \infty$ along some sequence $\Delta t \to 0$, and the **uniform boundedness principle** (Banach–Steinhaus) on the **Banach space** of initial data produces a fixed datum on which the numerical solutions are unbounded, contradicting convergence. The careful statement and the well-posedness hypotheses are due to **Lax and Richtmyer**; their theorem is the named external input here. $\square$`,
  },
  {
    id: 'finite-element-method',
    label: 'Finite Element Method',
    title: 'Finite Element Method',
    kind: 'definition',
    tags: ['Numerical Analysis'],
    dependencies: ['partial-differential-equation', 'sobolev-space', 'lax-milgram'],
    description: String.raw`The finite element method solves a PDE not by discretizing the derivatives but by reformulating the equation: multiply by a test function and integrate, moving derivatives onto the test function to get a weak (variational) form posed in a Sobolev space. One then seeks the solution in a finite-dimensional subspace of piecewise polynomials on a mesh of simple cells, which turns the weak form into a sparse linear system (the Galerkin method). Its strengths are geometric flexibility on complicated domains and a rigorous error theory grounded in the Lax–Milgram theorem and Céa's lemma, making it the dominant method in structural, thermal, and many fluid simulations.`,
    definition: String.raw`The **finite element method** recasts a **partial differential equation** in **weak form**: multiplying by a test function $v$ and integrating by parts gives a bilinear form $a(u, v) = \ell(v)$ to hold for all $v$ in a **Sobolev space** $V$ (e.g. $H^1_0$). **Galerkin** discretization picks a finite-dimensional subspace $V_h \subseteq V$ of piecewise polynomials on a mesh of cells and seeks $u_h \in V_h$ with $a(u_h, v_h) = \ell(v_h)$ for all $v_h \in V_h$, a sparse linear system in the nodal coefficients. When $a$ is bounded and coercive, the **Lax–Milgram theorem** gives existence and uniqueness of both $u$ and $u_h$, and Céa's lemma bounds the error $\lVert u - u_h\rVert$ by the best approximation of $u$ from $V_h$.`,
  },

  // ── Stochastic methods ──────────────────────────────────────────────────────
  {
    id: 'monte-carlo-method',
    label: 'Monte Carlo Method',
    title: 'Monte Carlo Method',
    kind: 'definition',
    tags: ['Numerical Analysis'],
    dependencies: ['random-variable', 'expectation', 'law-of-large-numbers'],
    description: String.raw`A Monte Carlo method computes a deterministic quantity by recasting it as an average over randomness and then estimating that average by sampling. To integrate a function, view the integral as an expectation, draw random points, and average the values: the law of large numbers guarantees convergence to the true value. What makes the method indispensable is the *rate*: the error shrinks like $1/\sqrt{N}$ in the number of samples regardless of the dimension, so where grid-based quadrature suffers the curse of dimensionality, Monte Carlo is unfazed — the method of choice for high-dimensional integrals in physics, finance, and statistics.`,
    definition: String.raw`A **Monte Carlo method** estimates a quantity expressed as an **expectation** $\mu = \mathbb{E}[g(X)]$ by drawing i.i.d. samples $X_1, \dots, X_N$ from the law of the **random variable** $X$ and forming the sample average
$$\hat\mu_N = \frac1N \sum_{i=1}^N g(X_i).$$
By the **law of large numbers** $\hat\mu_N \to \mu$ almost surely. To approximate an integral $\int_\Omega f$, write it as $\mathbb{E}[f(U)]\cdot\operatorname{vol}(\Omega)$ for $U$ uniform on $\Omega$. The estimator is **unbiased**, $\mathbb{E}[\hat\mu_N] = \mu$, and variance-reduction techniques (importance, stratified, antithetic sampling) lower its spread without bias.`,
  },
  {
    id: 'monte-carlo-error',
    label: 'Monte Carlo Error',
    title: 'Monte Carlo Error Rate',
    kind: 'proposition',
    tags: ['Numerical Analysis'],
    dependencies: ['monte-carlo-method', 'variance', 'variance-of-sum', 'expectation'],
    description: String.raw`The signature property of Monte Carlo is the dimension-independent error rate. Because the samples are independent, the variance of their average is the single-sample variance divided by $N$, so the typical error — the root-mean-square deviation from the truth — falls off as $\sigma/\sqrt{N}$. The constant $\sigma$ is the standard deviation of the integrand under sampling, and crucially neither the rate $1/\sqrt{N}$ nor this argument refers to the dimension of the domain at all. Quadrupling the sample count halves the error: slow, but immune to the curse of dimensionality that cripples grid methods.`,
    statement: String.raw`Let $g(X)$ have finite variance $\sigma^2 = \operatorname{Var}(g(X))$, and let $\hat\mu_N = \frac1N\sum_{i=1}^N g(X_i)$ be the Monte Carlo estimator from i.i.d. samples. Then
$$\mathbb{E}[\hat\mu_N] = \mu, \qquad \operatorname{Var}(\hat\mu_N) = \frac{\sigma^2}{N}, \qquad \text{so the root-mean-square error } \sqrt{\mathbb{E}[(\hat\mu_N - \mu)^2]} = \frac{\sigma}{\sqrt{N}},$$
independent of the dimension of the sample space.`,
    proof: String.raw`Unbiasedness is linearity of the **expectation**: $\mathbb{E}[\hat\mu_N] = \frac1N\sum_{i=1}^N \mathbb{E}[g(X_i)] = \frac1N\cdot N\mu = \mu$, since each $g(X_i)$ has mean $\mu$. For the variance, the samples are independent, so all covariances $\operatorname{Cov}(g(X_i), g(X_j))$ with $i \neq j$ vanish; by **variance-of-sum** the cross terms drop and
$$\operatorname{Var}\Bigl(\sum_{i=1}^N g(X_i)\Bigr) = \sum_{i=1}^N \operatorname{Var}(g(X_i)) = N\sigma^2.$$
Scaling by $1/N$, the **variance** obeys $\operatorname{Var}(\hat\mu_N) = \operatorname{Var}\bigl(\tfrac1N\sum_i g(X_i)\bigr) = \tfrac{1}{N^2}\cdot N\sigma^2 = \sigma^2/N$. Since $\hat\mu_N$ is unbiased, the mean-square error equals the variance: $\mathbb{E}[(\hat\mu_N - \mu)^2] = \operatorname{Var}(\hat\mu_N) = \sigma^2/N$, whose square root is $\sigma/\sqrt{N}$. No step used the dimension of the space $X$ lives in. $\square$`,
  },
]

import type { MathNode } from '../types'

export const COMPLEX_ANALYSIS_NODES: MathNode[] = [
  {
    id: 'holomorphic-function',
    label: 'Holomorphic Function',
    title: 'Holomorphic Function',
    kind: 'definition',
    tags: ['Complex Analysis'],
    dependencies: ['complex-numbers', 'derivative', 'open-closed-sets'],
    description: String.raw`Differentiability of a complex function looks formally like the real case — a limit of difference quotients — but the quotient is taken in $\mathbb{C}$, so the increment $h$ may approach $0$ from *any* direction in the plane and the limit must be the same regardless. This single constraint is dramatically stronger than real differentiability: it forces the function to be infinitely differentiable, analytic, and rigid in ways with no real-variable analogue, and it is the source of every theorem in the subject. A function holomorphic on all of $\mathbb{C}$ is called **entire**.`,
    definition: String.raw`Let $U \subseteq \mathbb{C}$ be open. A function $f : U \to \mathbb{C}$ is **complex-differentiable** at $z_0 \in U$ if the limit
$$f'(z_0) := \lim_{h \to 0} \frac{f(z_0 + h) - f(z_0)}{h}, \qquad h \in \mathbb{C} \setminus \{0\},$$
exists in $\mathbb{C}$ (the limit being over all $h$ in a punctured neighbourhood of $0$, so its value must agree along every approach). $f$ is **holomorphic** on $U$ if it is complex-differentiable at every point of $U$, and **entire** if it is holomorphic on all of $\mathbb{C}$.`,
  },
  {
    id: 'cauchy-riemann-equations',
    label: 'Cauchy–Riemann',
    title: 'Cauchy–Riemann Equations',
    kind: 'definition',
    tags: ['Complex Analysis'],
    dependencies: ['partial-derivative', 'complex-numbers'],
    description: String.raw`Writing a complex function as $f = u + iv$ in terms of two real functions of two real variables $x, y$ (where $z = x + iy$), the Cauchy–Riemann equations are the pair of partial differential equations linking $u$ and $v$. They are exactly the analytic content of complex differentiability: a function with continuous partials is holomorphic *precisely when* its real and imaginary parts satisfy them. Geometrically they say the Jacobian of $f$, viewed as a map $\mathbb{R}^2 \to \mathbb{R}^2$, acts as a rotation-and-scaling (a complex multiplication), which is why holomorphic maps are angle-preserving.`,
    definition: String.raw`For $f = u + iv$ with $u, v : U \to \mathbb{R}$ real-differentiable functions of $z = x + iy$, the **Cauchy–Riemann equations** at a point are the relations
$$\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}, \qquad \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}.$$`,
  },
  {
    id: 'holomorphic-iff-cauchy-riemann',
    label: 'Holomorphic ⇔ Cauchy–Riemann',
    title: 'Holomorphy and the Cauchy–Riemann Equations',
    kind: 'proposition',
    tags: ['Complex Analysis'],
    dependencies: ['holomorphic-function', 'cauchy-riemann-equations', 'total-derivative'],
    description: String.raw`This is the bridge between the one-line complex-analytic definition of holomorphy and the two real partial differential equations. The forward direction is forced by taking the complex difference quotient along the two coordinate axes and equating the results. The converse — that continuously differentiable real and imaginary parts satisfying the equations give a holomorphic function — is what lets one recognise holomorphic functions in real-variable terms, and supplies the continuity of the partials that the Green's-theorem proof of Cauchy's theorem needs.`,
    statement: String.raw`Let $f = u + iv$ be defined on an open set $U \subseteq \mathbb{C}$, with $z = x + iy$.
**(Necessity)** If $f$ is complex-differentiable at $z_0$, then the first-order partials of $u, v$ exist at $z_0$ and satisfy the **Cauchy–Riemann equations** there, and $f'(z_0) = u_x + i v_x$.
**(Sufficiency)** If $u, v$ have continuous first-order partials on $U$ satisfying the Cauchy–Riemann equations, then $f$ is holomorphic on $U$.`,
    proof: String.raw`**Necessity.** Suppose $f'(z_0)$ exists. The limit defining it is the same along every approach of $h \to 0$. Take $h = t \in \mathbb{R}$, $t \to 0$ (horizontal approach):
$$f'(z_0) = \lim_{t \to 0} \frac{f(z_0 + t) - f(z_0)}{t} = u_x(z_0) + i\,v_x(z_0),$$
which exhibits the **partial derivatives** $u_x, v_x$ at $z_0$. Take instead $h = it$, $t \in \mathbb{R}$, $t \to 0$ (vertical approach):
$$f'(z_0) = \lim_{t \to 0} \frac{f(z_0 + it) - f(z_0)}{it} = \frac{1}{i}\bigl(u_y(z_0) + i\,v_y(z_0)\bigr) = v_y(z_0) - i\,u_y(z_0).$$
Equating real and imaginary parts of the two expressions for $f'(z_0)$ gives $u_x = v_y$ and $v_x = -u_y$, the **Cauchy–Riemann equations**, and $f'(z_0) = u_x + i v_x$.

**Sufficiency.** Fix $z_0 = x_0 + i y_0$ and write $h = s + it$. Since $u, v$ are real-differentiable at $z_0$ (continuous partials imply differentiability),
$$u(z_0 + h) - u(z_0) = u_x s + u_y t + o(|h|), \qquad v(z_0 + h) - v(z_0) = v_x s + v_y t + o(|h|),$$
with all partials evaluated at $z_0$. Substituting the Cauchy–Riemann relations $u_y = -v_x$, $v_y = u_x$,
$$f(z_0 + h) - f(z_0) = (u_x s - v_x t) + i(v_x s + u_x t) + o(|h|) = (u_x + i v_x)(s + it) + o(|h|),$$
since $(u_x + i v_x)(s + it) = (u_x s - v_x t) + i(v_x s + u_x t)$. Dividing by $h = s + it$ and letting $h \to 0$, the $o(|h|)/h$ term vanishes, so the difference quotient converges to $u_x + i v_x$ independently of direction. Hence $f'(z_0)$ exists; as $z_0 \in U$ was arbitrary, $f$ is holomorphic. $\square$`,
  },
  {
    id: 'contour-integral',
    label: 'Contour Integral',
    title: 'Contour Integral',
    kind: 'definition',
    tags: ['Complex Analysis'],
    dependencies: ['holomorphic-function', 'line-integral', 'riemann-integral'],
    description: String.raw`The integral of a complex function along a path is the engine of the whole theory. One pulls $f$ back through a parametrization of the curve and integrates the resulting complex-valued function of one real variable, treating real and imaginary parts separately. Splitting $f\,dz$ into its real and imaginary one-forms shows a contour integral is just a pair of real line integrals, which is exactly what lets Green's theorem be applied to it. The basic estimate $\bigl|\int_\gamma f\,dz\bigr| \le (\sup|f|)\cdot(\text{length})$ controls these integrals throughout.`,
    definition: String.raw`Let $\gamma : [a, b] \to \mathbb{C}$ be a piecewise-$C^1$ curve and $f$ continuous on the image of $\gamma$. The **contour integral** of $f$ along $\gamma$ is
$$\int_\gamma f(z)\,dz := \int_a^b f(\gamma(t))\,\gamma'(t)\,dt,$$
the right-hand side being the Riemann integral of a continuous (piecewise-continuous) $\mathbb{C}$-valued function, computed coordinatewise on its real and imaginary parts. Writing $f = u + iv$ and $dz = dx + i\,dy$,
$$\int_\gamma f\,dz = \int_\gamma (u\,dx - v\,dy) + i\int_\gamma (v\,dx + u\,dy),$$
a sum of two real **line integrals**. The value is independent of orientation-preserving reparametrization and reverses sign under reversal of orientation. The **standard estimate** holds:
$$\Bigl|\int_\gamma f\,dz\Bigr| \le \sup_{z \in \gamma}|f(z)| \cdot \operatorname{length}(\gamma).$$`,
    proof: String.raw`**The standard estimate.** Write $\int_\gamma f\,dz = R e^{i\theta}$ with $R \ge 0$. Then
$$R = e^{-i\theta}\int_\gamma f\,dz = \int_a^b \operatorname{Re}\!\bigl(e^{-i\theta} f(\gamma(t))\gamma'(t)\bigr)\,dt \le \int_a^b \bigl|f(\gamma(t))\bigr|\,|\gamma'(t)|\,dt,$$
the middle equality because $R$ is real (so equals its own real part) and the real part of a Riemann integral is the integral of the real part, and the inequality because $\operatorname{Re}(w) \le |w|$ and $|e^{-i\theta}| = 1$. Bounding $|f(\gamma(t))| \le \sup_{z\in\gamma}|f(z)|$ and recalling $\operatorname{length}(\gamma) = \int_a^b |\gamma'(t)|\,dt$ gives the claim. $\square$`,
  },
  {
    id: 'cauchy-integral-theorem',
    label: "Cauchy's Integral Theorem",
    title: "Cauchy's Integral Theorem",
    kind: 'theorem',
    tags: ['Complex Analysis'],
    dependencies: ['contour-integral', 'holomorphic-iff-cauchy-riemann', 'greens-theorem', 'cauchy-riemann-equations'],
    description: String.raw`Cauchy's theorem is the keystone of complex analysis: the contour integral of a holomorphic function around a closed loop bounding a region inside its domain is zero. Equivalently, on a simply connected domain a holomorphic integral is path-independent. The reason is the Cauchy–Riemann equations: when one writes the contour integral as two real line integrals and applies Green's theorem, the integrands of both area integrals vanish identically by Cauchy–Riemann. Everything downstream — the integral formula, analyticity, residues — is a consequence.`,
    statement: String.raw`Let $f$ be holomorphic with continuous derivative on an open set containing the closure of a region $R \subseteq \mathbb{C}$ whose boundary $\partial R$ is a positively oriented, piecewise-$C^1$ simple closed curve. Then
$$\oint_{\partial R} f(z)\,dz = 0.$$
In particular, on a simply connected domain the integral of a holomorphic function around any piecewise-$C^1$ simple closed curve vanishes.`,
    proof: String.raw`Write $f = u + iv$, with $u, v$ having continuous first-order partials (the hypothesis that $f'$ is continuous, together with $f'(z) = u_x + i v_x$ from the **Cauchy–Riemann proposition**, makes all four partials continuous). By the decomposition of a **contour integral** into real **line integrals**,
$$\oint_{\partial R} f\,dz = \oint_{\partial R} (u\,dx - v\,dy) + i \oint_{\partial R} (v\,dx + u\,dy).$$
Apply **Green's theorem** to each real line integral over the region $R$. For the first, with $P = u$, $Q = -v$:
$$\oint_{\partial R} (u\,dx - v\,dy) = \iint_R \Bigl(\frac{\partial(-v)}{\partial x} - \frac{\partial u}{\partial y}\Bigr)\,dA = -\iint_R (v_x + u_y)\,dA.$$
For the second, with $P = v$, $Q = u$:
$$\oint_{\partial R} (v\,dx + u\,dy) = \iint_R \Bigl(\frac{\partial u}{\partial x} - \frac{\partial v}{\partial y}\Bigr)\,dA = \iint_R (u_x - v_y)\,dA.$$
By the **Cauchy–Riemann equations** (which $f$ satisfies, being holomorphic, by the proposition) $u_x = v_y$ and $u_y = -v_x$, so both integrands vanish identically on $R$: $v_x + u_y = 0$ and $u_x - v_y = 0$. Hence both area integrals are $0$, and $\oint_{\partial R} f\,dz = 0$. On a simply connected domain any simple closed curve bounds such a region $R$ contained in the domain, so the conclusion applies. $\square$`,
  },
  {
    id: 'cauchy-integral-formula',
    label: "Cauchy's Integral Formula",
    title: "Cauchy's Integral Formula",
    kind: 'theorem',
    tags: ['Complex Analysis'],
    dependencies: ['cauchy-integral-theorem', 'contour-integral'],
    description: String.raw`Cauchy's formula reconstructs the value of a holomorphic function at an interior point from its values on a surrounding contour. The boundary data of a holomorphic function thus determines it completely inside — an extreme form of rigidity with no real-variable analogue. The proof deforms the contour down to an arbitrarily small circle about the point (legal by Cauchy's theorem on the region between), on which the integral is computed directly. Differentiating under the integral sign then yields formulas for every derivative, showing at a stroke that a holomorphic function is infinitely differentiable.`,
    statement: String.raw`Let $f$ be holomorphic with continuous derivative on an open set containing the closure of the region bounded by a positively oriented, piecewise-$C^1$ simple closed curve $\gamma$. Then for every $a$ in the interior of $\gamma$,
$$f(a) = \frac{1}{2\pi i} \oint_\gamma \frac{f(z)}{z - a}\,dz.$$`,
    proof: String.raw`Fix $a$ inside $\gamma$ and let $\varepsilon > 0$ be small enough that the circle $C_\rho$ of radius $\rho$ centred at $a$, positively oriented, lies inside $\gamma$ for all $0 < \rho \le \varepsilon$. The function $g(z) = \dfrac{f(z)}{z - a}$ is holomorphic with continuous derivative on a neighbourhood of the closed annular region $\overline{\Omega}$ between $\gamma$ and $C_\rho$ (it avoids the only singularity $z = a$, which lies inside $C_\rho$). This region is doubly connected, so its boundary is the *disjoint* union of the two loops $\gamma$ and $C_\rho$ and is not a simple closed curve; **Cauchy's integral theorem** cannot be applied to $\Omega$ directly. We reduce to that theorem by a crosscut.

*Crosscut.* Pick a point $p$ on $\gamma$ and a point $q$ on $C_\rho$ and join them by a straight segment $L$ lying in $\overline{\Omega}$, meeting $\gamma$ only at $p$ and $C_\rho$ only at $q$ (e.g. along a ray from $a$). A single such crosscut does **not** disconnect the doubly connected region $\Omega$; it lowers its connectivity by one, producing a single *simply connected* region $\Omega'$ whose boundary, traversed once with $\Omega'$ kept on the left, is one positively oriented, piecewise-$C^1$ simple closed curve: run along all of $\gamma$ positively, down $L$ from $p$ to $q$, along all of $C_\rho$ negatively (clockwise, relative to $C_\rho$'s own orientation), then back up $L$ from $q$ to $p$. Since $g$ is holomorphic with continuous derivative on $\overline{\Omega'}$, **Cauchy's integral theorem** gives $\oint_{\partial\Omega'} g = 0$. The segment $L$ is traversed once in each direction, so its two contributions cancel, leaving all of $\gamma$ traced positively and all of $C_\rho$ traced negatively. Therefore
$$\oint_\gamma g(z)\,dz - \oint_{C_\rho} g(z)\,dz = 0, \qquad\text{i.e.}\qquad \oint_\gamma \frac{f(z)}{z-a}\,dz = \oint_{C_\rho} \frac{f(z)}{z-a}\,dz \quad (0 < \rho \le \varepsilon).$$
Now evaluate the right side. Parametrize $C_\rho$ by $z = a + \rho e^{i\theta}$, $\theta \in [0, 2\pi]$, so $dz = i\rho e^{i\theta}\,d\theta$ and
$$\oint_{C_\rho} \frac{dz}{z - a} = \int_0^{2\pi} \frac{i\rho e^{i\theta}}{\rho e^{i\theta}}\,d\theta = 2\pi i.$$
Therefore
$$\oint_{C_\rho} \frac{f(z)}{z-a}\,dz - 2\pi i\, f(a) = \oint_{C_\rho} \frac{f(z) - f(a)}{z - a}\,dz.$$
Since $f$ is (complex-)differentiable, hence continuous, at $a$, given $\eta > 0$ there is $\rho$ small with $|f(z) - f(a)| \le \eta$ for $|z - a| = \rho$. On $C_\rho$, $|z - a| = \rho$, so the integrand is bounded by $\eta/\rho$, and by the **standard estimate** for contour integrals,
$$\Bigl|\oint_{C_\rho} \frac{f(z) - f(a)}{z - a}\,dz\Bigr| \le \frac{\eta}{\rho}\cdot 2\pi\rho = 2\pi\eta.$$
The left side $\oint_\gamma \frac{f(z)}{z-a}\,dz - 2\pi i f(a)$ is independent of $\rho$, yet is bounded by $2\pi\eta$ for every $\eta > 0$; hence it is $0$. Dividing by $2\pi i$ gives the formula. $\square$`,
  },
  {
    id: 'cauchy-derivative-formula',
    label: 'Cauchy Derivative Formula',
    title: "Cauchy's Formula for Derivatives",
    kind: 'corollary',
    tags: ['Complex Analysis'],
    dependencies: ['cauchy-integral-formula', 'contour-integral'],
    description: String.raw`Differentiating Cauchy's integral formula under the integral sign — legitimate because the integrand is smooth in the parameter away from the contour — gives an integral expression for *every* derivative of a holomorphic function. The immediate and remarkable consequence is that a function differentiable once on an open set is automatically infinitely differentiable, and each derivative is again holomorphic. The same formulas, with their explicit denominators, yield the Cauchy estimates bounding $|f^{(n)}(a)|$ by the supremum of $|f|$ on a surrounding circle.`,
    statement: String.raw`Under the hypotheses of Cauchy's integral formula, $f$ is infinitely complex-differentiable in the interior of $\gamma$, and for every $n \ge 0$ and every interior point $a$,
$$f^{(n)}(a) = \frac{n!}{2\pi i} \oint_\gamma \frac{f(z)}{(z - a)^{n+1}}\,dz.$$
In particular, if $|f| \le M$ on a circle $|z - a| = R$ lying with its interior in the domain (the **Cauchy estimate**), then $|f^{(n)}(a)| \le \dfrac{n!\,M}{R^n}$.`,
    proof: String.raw`We prove the formula by induction on $n$, the case $n = 0$ being **Cauchy's integral formula**. Suppose it holds for $n$; we differentiate
$$f^{(n)}(a) = \frac{n!}{2\pi i}\oint_\gamma \frac{f(z)}{(z-a)^{n+1}}\,dz$$
with respect to $a$. For $a$ in the interior of $\gamma$, the distance $\delta$ from $a$ to the (compact) curve $\gamma$ is positive; for increments $h$ with $|h| < \delta/2$ the points $z$ on $\gamma$ satisfy $|z - a| \ge \delta$ and $|z - a - h| \ge \delta/2$. The difference quotient is
$$\frac{f^{(n)}(a+h) - f^{(n)}(a)}{h} = \frac{n!}{2\pi i}\oint_\gamma f(z)\,\frac{1}{h}\Bigl(\frac{1}{(z-a-h)^{n+1}} - \frac{1}{(z-a)^{n+1}}\Bigr)\,dz.$$
As $h \to 0$ the bracketed difference quotient converges, uniformly for $z \in \gamma$, to $\frac{d}{da}(z-a)^{-(n+1)} = (n+1)(z-a)^{-(n+2)}$: writing $w_1 = z - a - h$, $w_2 = z - a$, the algebraic identity $\frac{1}{h}\bigl(w_1^{-(n+1)} - w_2^{-(n+1)}\bigr) = \frac{w_2 - w_1}{h}\sum_{j} w_1^{-(j+1)}w_2^{-(n+1-j)}$ with $w_2 - w_1 = h$ shows the quotient equals a finite sum of products of factors each bounded by $(\delta/2)^{-1}$, and it differs from $(n+1)(z-a)^{-(n+2)}$ by a quantity $O(|h|)$ uniformly in $z$. Since $f$ is bounded on the compact $\gamma$, the **standard estimate** lets us pass the limit inside the integral, giving
$$f^{(n+1)}(a) = \frac{n!}{2\pi i}\oint_\gamma f(z)\,(n+1)(z-a)^{-(n+2)}\,dz = \frac{(n+1)!}{2\pi i}\oint_\gamma \frac{f(z)}{(z-a)^{n+2}}\,dz,$$
completing the induction and showing $f$ is infinitely differentiable inside $\gamma$.

For the **Cauchy estimate**, take $\gamma$ to be the circle $|z - a| = R$, of length $2\pi R$, on which $|z - a|^{n+1} = R^{n+1}$ and $|f| \le M$. The **standard estimate** for contour integrals gives
$$|f^{(n)}(a)| = \frac{n!}{2\pi}\Bigl|\oint_\gamma \frac{f(z)}{(z-a)^{n+1}}\,dz\Bigr| \le \frac{n!}{2\pi}\cdot \frac{M}{R^{n+1}}\cdot 2\pi R = \frac{n!\,M}{R^n}. \qquad \square$$`,
  },
  {
    id: 'complex-analyticity',
    label: 'Analyticity',
    title: 'Analyticity (Holomorphic = Analytic)',
    kind: 'theorem',
    tags: ['Complex Analysis'],
    dependencies: ['cauchy-integral-formula', 'uniform-convergence', 'cauchy-derivative-formula'],
    description: String.raw`Holomorphic and analytic name the same class of functions. Every function complex-differentiable on an open set equals, near each point, a convergent power series — its own Taylor series — with positive radius of convergence reaching the nearest singularity. The proof expands the Cauchy kernel $\frac{1}{z-w}$ as a geometric series in $(w - a)$, which converges uniformly on the contour, and integrates term by term against Cauchy's formula. This is the deepest contrast with real analysis, where infinitely differentiable functions need not equal their Taylor series.`,
    statement: String.raw`Let $f$ be holomorphic with continuous derivative on an open set $U$, and let $a \in U$ with $\overline{D}(a, R) \subseteq U$ for the closed disk of radius $R$. Then for all $w$ with $|w - a| < R$,
$$f(w) = \sum_{n=0}^{\infty} c_n\,(w - a)^n, \qquad c_n = \frac{f^{(n)}(a)}{n!} = \frac{1}{2\pi i}\oint_{|z-a|=R} \frac{f(z)}{(z - a)^{n+1}}\,dz,$$
the series converging absolutely for $|w - a| < R$. Thus holomorphic functions are analytic.`,
    proof: String.raw`Let $\gamma$ be the circle $|z - a| = R$, positively oriented, and fix $w$ with $|w - a| = r < R$. By **Cauchy's integral formula**,
$$f(w) = \frac{1}{2\pi i}\oint_\gamma \frac{f(z)}{z - w}\,dz.$$
For $z$ on $\gamma$ we have $|z - a| = R$, so $\bigl|\frac{w - a}{z - a}\bigr| = \frac{r}{R} < 1$, and the Cauchy kernel expands as a geometric series:
$$\frac{1}{z - w} = \frac{1}{(z - a) - (w - a)} = \frac{1}{z - a}\cdot\frac{1}{1 - \frac{w - a}{z - a}} = \sum_{n=0}^{\infty} \frac{(w - a)^n}{(z - a)^{n+1}}.$$
The $n$-th term has modulus $\frac{r^n}{R^{n+1}}$, independent of $z \in \gamma$, and $\sum_n \frac{r^n}{R^{n+1}} = \frac{1}{R - r} < \infty$; by the Weierstrass $M$-test the series converges **uniformly** in $z$ on $\gamma$. Multiplying by the bounded continuous $f(z)$ preserves uniform convergence, so the series may be integrated term by term against $f(z)\,dz$:
$$f(w) = \frac{1}{2\pi i}\oint_\gamma f(z)\sum_{n=0}^{\infty}\frac{(w-a)^n}{(z-a)^{n+1}}\,dz = \sum_{n=0}^{\infty}(w - a)^n\cdot\frac{1}{2\pi i}\oint_\gamma \frac{f(z)}{(z-a)^{n+1}}\,dz.$$
By the **Cauchy integral formula** (the $n=0$ case) and its differentiated form, the inner integral equals $c_n = \frac{f^{(n)}(a)}{n!}$. Hence $f(w) = \sum_{n\ge 0} c_n (w - a)^n$ for $|w - a| = r$, and since $r < R$ was arbitrary the expansion holds throughout the open disk; absolute convergence is immediate from $|c_n| \le \frac{\sup_\gamma |f|}{R^n}$ (a **Cauchy estimate**) and $|w - a| < R$. $\square$`,
  },
  {
    id: 'liouville-theorem',
    label: "Liouville's Theorem",
    title: "Liouville's Theorem",
    kind: 'theorem',
    tags: ['Complex Analysis'],
    dependencies: ['cauchy-derivative-formula', 'cauchy-riemann-equations'],
    description: String.raw`A bounded entire function is constant. Holomorphy on the whole plane is so rigid that the only bounded examples are the trivial ones — there is no complex analogue of a bounded, non-constant smooth function like $\sin x$ on $\mathbb{R}$. The proof is a single application of the Cauchy estimate for the first derivative: bounding $|f'(a)|$ by $M/R$ on circles of every radius $R$ and letting $R \to \infty$ forces $f' \equiv 0$. A few further lines give the fundamental theorem of algebra.`,
    statement: String.raw`Every bounded entire function is constant: if $f$ is holomorphic on all of $\mathbb{C}$ and $|f(z)| \le M$ for all $z$, then $f$ is constant.`,
    proof: String.raw`Let $a \in \mathbb{C}$ be arbitrary. For any radius $R > 0$, $f$ is holomorphic on a neighbourhood of the closed disk $\overline{D}(a, R)$ (being entire) and $|f| \le M$ on the bounding circle $|z - a| = R$. The **Cauchy estimate** (the $n = 1$ case of Cauchy's formula for derivatives) gives
$$|f'(a)| \le \frac{1!\cdot M}{R^1} = \frac{M}{R}.$$
This holds for every $R > 0$; letting $R \to \infty$ forces $f'(a) = 0$. As $a$ was arbitrary, $f' \equiv 0$ on $\mathbb{C}$. A holomorphic function with vanishing derivative on the connected set $\mathbb{C}$ is constant: writing $f = u + iv$, $f' = u_x + iv_x = 0$ together with the **Cauchy–Riemann equations** $u_y = -v_x = 0$, $v_y = u_x = 0$ makes all partials of $u, v$ vanish, so $u, v$ are constant on the connected set $\mathbb{C}$, hence so is $f$. $\square$`,
  },
  {
    id: 'isolated-singularity',
    label: 'Isolated Singularity',
    title: 'Isolated Singularity',
    kind: 'definition',
    tags: ['Complex Analysis'],
    dependencies: ['holomorphic-function'],
    description: String.raw`A point where a function fails to be holomorphic but is holomorphic on a punctured neighbourhood around it is an isolated singularity. These come in exactly three types, distinguished by the behaviour of the Laurent expansion: removable (the function extends holomorphically), a pole (it blows up like a finite power of $\frac{1}{z - z_0}$), and essential (wild behaviour, by the Casorati–Weierstrass and Picard theorems). Isolated singularities are where the residue calculus lives, since the residue is read off the Laurent series at such a point.`,
    definition: String.raw`A point $z_0 \in \mathbb{C}$ is an **isolated singularity** of $f$ if $f$ is holomorphic on a punctured disk $D'(z_0, r) = \{\,z : 0 < |z - z_0| < r\,\}$ for some $r > 0$, but $f$ is not (defined and) holomorphic at $z_0$ itself. Classified by the Laurent expansion $f(z) = \sum_{n=-\infty}^{\infty} a_n (z - z_0)^n$ on $D'(z_0, r)$: it is **removable** if $a_n = 0$ for all $n < 0$; a **pole of order $m$** if $a_{-m} \neq 0$ and $a_n = 0$ for all $n < -m$; and **essential** if $a_n \neq 0$ for infinitely many $n < 0$.`,
  },
  {
    id: 'laurent-series',
    label: 'Laurent Series',
    title: 'Laurent Series',
    kind: 'theorem',
    tags: ['Complex Analysis'],
    dependencies: ['cauchy-integral-formula', 'isolated-singularity', 'uniform-convergence', 'cauchy-integral-theorem', 'complex-analyticity'],
    description: String.raw`On an annulus, a holomorphic function has a unique two-sided power-series expansion: the usual non-negative powers of $(z - z_0)$ together with negative powers, the latter capturing the singular behaviour toward the inner boundary. It is the analytic-on-an-annulus analogue of the Taylor expansion, and it is what makes the classification of isolated singularities and the definition of the residue possible. The proof applies Cauchy's formula on the annulus, whose boundary is an outer circle minus an inner one, and expands the kernel as a convergent geometric series in opposite directions on the two circles.`,
    statement: String.raw`Let $f$ be holomorphic with continuous derivative on the annulus $A = \{\,z : r < |z - z_0| < R\,\}$ (with $0 \le r < R \le \infty$). Then $f$ has a unique expansion convergent on $A$,
$$f(z) = \sum_{n=-\infty}^{\infty} a_n\,(z - z_0)^n, \qquad a_n = \frac{1}{2\pi i}\oint_{|w - z_0| = \rho}\frac{f(w)}{(w - z_0)^{n+1}}\,dw,$$
where $\rho$ is any radius with $r < \rho < R$ (the coefficient being independent of $\rho$ by Cauchy's theorem). The series converges absolutely on $A$ and uniformly on compact subsets.`,
    proof: String.raw`Fix $z \in A$ and choose radii $r < \rho_1 < |z - z_0| < \rho_2 < R$; let $C_1, C_2$ be the circles $|w - z_0| = \rho_1, \rho_2$, positively oriented, and let $C_\varepsilon$ be a small positively oriented circle around $z$ lying in the open annulus between $C_1$ and $C_2$. The function $g(w) = f(w)/(w - z)$ is holomorphic on a neighbourhood of the closed annulus between $C_1$ and $C_2$ except at $w = z$. Excising the open disk bounded by $C_\varepsilon$ leaves a triply connected region lying between the outer circle $C_2$ and the two inner circles $C_1, C_\varepsilon$; two non-crossing straight slits (one joining $C_1$ to $C_2$, one joining $C_\varepsilon$ to $C_2$) reduce it to a single simply connected region bounded by one positively oriented, piecewise-$C^1$ simple closed curve — all of $C_2$ positively, each of $C_1, C_\varepsilon$ negatively, and each slit once in each direction. On it **Cauchy's integral theorem** gives $\oint = 0$, and the slits cancel in pairs, yielding $\oint_{C_2} g - \oint_{C_1} g - \oint_{C_\varepsilon} g = 0$. By **Cauchy's integral formula** $\oint_{C_\varepsilon} g = 2\pi i\, f(z)$, so
$$f(z) = \frac{1}{2\pi i}\oint_{C_2}\frac{f(w)}{w - z}\,dw \;-\; \frac{1}{2\pi i}\oint_{C_1}\frac{f(w)}{w - z}\,dw.$$
On $C_2$, $|w - z_0| = \rho_2 > |z - z_0|$, so $\bigl|\frac{z - z_0}{w - z_0}\bigr| < 1$ and, exactly as in the proof of **analyticity**, $\frac{1}{w - z} = \sum_{n\ge 0}\frac{(z - z_0)^n}{(w - z_0)^{n+1}}$ converges uniformly in $w \in C_2$; term-by-term integration gives $\sum_{n \ge 0} a_n (z - z_0)^n$ with $a_n$ as stated.

On $C_1$, $|w - z_0| = \rho_1 < |z - z_0|$, so now $\bigl|\frac{w - z_0}{z - z_0}\bigr| < 1$ and we expand the other way:
$$-\frac{1}{w - z} = \frac{1}{z - w} = \frac{1}{(z - z_0)}\cdot\frac{1}{1 - \frac{w - z_0}{z - z_0}} = \sum_{k \ge 0}\frac{(w - z_0)^k}{(z - z_0)^{k+1}},$$
uniformly convergent in $w \in C_1$. Integrating term by term and re-indexing $n = -(k+1) \le -1$ gives $\sum_{n \le -1} a_n (z - z_0)^n$ with the same coefficient formula. By **Cauchy's integral theorem** the integrals defining $a_n$ are unchanged if $C_1, C_2$ are replaced by any circle of radius $\rho \in (r, R)$, since $\frac{f(w)}{(w - z_0)^{n+1}}$ is holomorphic on $A$. Adding the two parts yields the stated two-sided series.

*Uniqueness.* If $f(z) = \sum_m b_m (z - z_0)^m$ converges (uniformly on the circle $|w - z_0| = \rho$), multiply by $(z - z_0)^{-n-1}$ and integrate over that circle; using $\oint (w - z_0)^{m - n - 1}\,dw = 2\pi i$ when $m = n$ and $0$ otherwise (a direct parametrized computation), term-by-term integration isolates $b_n = a_n$. $\square$`,
  },
  {
    id: 'residue',
    label: 'Residue',
    title: 'Residue',
    kind: 'definition',
    tags: ['Complex Analysis'],
    dependencies: ['laurent-series', 'isolated-singularity'],
    description: String.raw`The residue of a function at an isolated singularity is the single Laurent coefficient $a_{-1}$ — the coefficient of $\frac{1}{z - z_0}$. Among all the Laurent terms it is the only one whose integral around a small loop survives (every other power integrates to zero), which is exactly why it controls contour integrals. For a simple pole it is a one-line limit, and for higher poles a derivative; this turns the evaluation of many integrals into routine differentiation.`,
    definition: String.raw`If $z_0$ is an **isolated singularity** of $f$ with **Laurent series** $f(z) = \sum_{n=-\infty}^{\infty} a_n (z - z_0)^n$ on a punctured disk about $z_0$, the **residue** of $f$ at $z_0$ is the coefficient
$$\operatorname{Res}(f, z_0) := a_{-1} = \frac{1}{2\pi i}\oint_{|z - z_0| = \rho} f(z)\,dz$$
for any sufficiently small $\rho > 0$. At a **pole of order $m$** it is computed by
$$\operatorname{Res}(f, z_0) = \frac{1}{(m-1)!}\lim_{z \to z_0}\frac{d^{\,m-1}}{dz^{\,m-1}}\bigl[(z - z_0)^m f(z)\bigr];$$
in particular at a **simple pole** ($m = 1$), $\operatorname{Res}(f, z_0) = \lim_{z\to z_0}(z - z_0)f(z)$.`,
    proof: String.raw`**The two descriptions of $a_{-1}$ agree, and the pole formula is correct.** The contour expression is the $n = -1$ instance of the **Laurent series** coefficient formula $a_n = \frac{1}{2\pi i}\oint (w - z_0)^{-n-1} f(w)\,dw$. For a pole of order $m$, write $g(z) = (z - z_0)^m f(z) = \sum_{n \ge -m} a_n (z - z_0)^{n+m} = \sum_{k \ge 0} a_{k - m}(z - z_0)^k$, a convergent power series, so $g$ extends holomorphically to $z_0$ with Taylor coefficient of $(z - z_0)^k$ equal to $a_{k-m}$. In particular $g^{(m-1)}(z_0) = (m-1)!\,a_{-1}$, since the coefficient of $(z - z_0)^{m-1}$ in $g$ (the case $k = m-1$) is $a_{-1}$. Dividing by $(m-1)!$ and taking the limit $z \to z_0$ (continuity of the derivative of the holomorphic $g$) gives the stated formula; the case $m = 1$ is the limit of $g(z) = (z - z_0)f(z)$. $\square$`,
  },
  {
    id: 'residue-theorem',
    label: 'Residue Theorem',
    title: 'Residue Theorem',
    kind: 'theorem',
    tags: ['Complex Analysis'],
    dependencies: ['cauchy-integral-theorem', 'residue', 'laurent-series'],
    description: String.raw`The residue theorem evaluates a contour integral as $2\pi i$ times the sum of the residues of the integrand at the singularities enclosed. It is the great computational engine of complex analysis, reducing many otherwise intractable real integrals and infinite sums to the algebra of residues. The proof deforms the contour, by Cauchy's theorem, into a collection of small circles around the singularities, on each of which the integral picks out exactly the residue from the Laurent series.`,
    statement: String.raw`Let $f$ be holomorphic with continuous derivative on an open set containing the closure of the region bounded by a positively oriented, piecewise-$C^1$ simple closed contour $\gamma$, except at finitely many isolated singularities $z_1, \dots, z_k$ lying in the interior of $\gamma$ and none on $\gamma$. Then
$$\oint_\gamma f(z)\,dz = 2\pi i \sum_{j=1}^{k} \operatorname{Res}(f, z_j).$$`,
    proof: String.raw`Each $z_j$ is an interior point, so choose radii $\rho_j > 0$ small enough that the closed disks $\overline{D}(z_j, \rho_j)$ are pairwise disjoint, contained in the interior of $\gamma$, and each meets only its own singularity. Let $C_j$ be the circle $|z - z_j| = \rho_j$, positively oriented. On the region $\Omega$ obtained from the interior of $\gamma$ by removing the open disks $D(z_j, \rho_j)$, the function $f$ is holomorphic (all singularities have been excised) with continuous derivative. The region $\Omega$ is $(k+1)$-tuply connected: its boundary is the disjoint union of the $k+1$ loops $\gamma, C_1, \dots, C_k$, not a simple closed curve, so **Cauchy's integral theorem** does not apply to $\Omega$ directly. We reduce to it by crosscuts.

*Crosscuts.* Choose $k$ pairwise non-crossing straight slits $L_1, \dots, L_k$ lying in $\overline{\Omega}$, where $L_j$ joins a point of $C_j$ to a point of $\gamma$ and meets the boundary loops only at its two endpoints. Cutting $\Omega$ along all $k$ slits yields a single simply connected region $\Omega^\ast$ (each cut lowers the connectivity by one, and $k$ cuts make it simply connected), bounded by one positively oriented, piecewise-$C^1$ simple closed curve $\partial\Omega^\ast$. Tracing $\partial\Omega^\ast$ keeping $\Omega^\ast$ on the left, this boundary consists of: all of $\gamma$ traversed positively; each $C_j$ traversed negatively (clockwise, so the excised disk stays outside $\Omega^\ast$); and each slit $L_j$ traversed once in each direction. By **Cauchy's integral theorem** applied to $\Omega^\ast$ (on a neighbourhood of whose closure $f$ is holomorphic with continuous derivative), $\oint_{\partial\Omega^\ast} f\,dz = 0$. The two traversals of each slit are in opposite directions and cancel, leaving
$$\oint_\gamma f(z)\,dz - \sum_{j=1}^{k}\oint_{C_j} f(z)\,dz = 0, \qquad\text{so}\qquad \oint_\gamma f(z)\,dz = \sum_{j=1}^{k}\oint_{C_j} f(z)\,dz.$$
For each $j$, the circle $C_j$ lies in the punctured disk on which $f$ has its **Laurent series** about $z_j$, and (for $\rho_j$ small) it equals the contour in the integral formula for the residue; thus by the definition of the **residue**,
$$\oint_{C_j} f(z)\,dz = 2\pi i\,\operatorname{Res}(f, z_j).$$
(Concretely, integrating the uniformly convergent Laurent series $\sum_n a_n^{(j)}(z - z_j)^n$ term by term over $C_j$, every power $(z - z_j)^n$ with $n \neq -1$ integrates to $0$ while $(z - z_j)^{-1}$ integrates to $2\pi i$, leaving $2\pi i\,a_{-1}^{(j)} = 2\pi i\,\operatorname{Res}(f, z_j)$.) Summing over $j$ gives $\oint_\gamma f(z)\,dz = 2\pi i\sum_{j=1}^{k}\operatorname{Res}(f, z_j)$. $\square$`,
  },
]

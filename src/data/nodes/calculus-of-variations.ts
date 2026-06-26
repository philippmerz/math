import type { MathNode } from '../types'

export const CALCULUS_OF_VARIATIONS_NODES: MathNode[] = [
  // ── The basic objects ──────────────────────────────────────────────────────
  {
    id: 'functional',
    label: 'Functional',
    title: 'Functional',
    kind: 'definition',
    tags: ['Calculus of Variations'],
    dependencies: ['function', 'riemann-integral'],
    description: String.raw`Ordinary calculus optimizes a function of finitely many numbers; the calculus of variations optimizes a quantity that depends on an entire *curve*. Such a quantity — a number attached to each admissible function — is a functional, almost always given as an integral of a density built from the curve and its slope. Shortest path, least time, least area, and least energy are all of this form. The whole subject is the search for the curves that make a functional stationary, the infinite-dimensional analogue of setting a gradient to zero.`,
    definition: String.raw`Fix an interval $[a, b]$ and a smooth **Lagrangian** $L(x, y, p)$ (the integrand, with $p$ standing for the slot into which $y'$ is substituted). On a class $\mathcal{A}$ of **admissible** functions $y : [a, b] \to \mathbb{R}$ — typically the $C^1$ curves meeting prescribed boundary data $y(a) = A$, $y(b) = B$ — the associated **functional** is the map $J : \mathcal{A} \to \mathbb{R}$,
$$J[y] = \int_a^b L\bigl(x, y(x), y'(x)\bigr)\,dx,$$
a number assigned to each curve via the **Riemann integral**. More generally $L$ may take vector-valued $y$ or higher derivatives, but the integral form is the central case.`,
  },
  {
    id: 'admissible-variation',
    label: 'Admissible Variation',
    title: 'Admissible Variation',
    kind: 'definition',
    tags: ['Calculus of Variations'],
    dependencies: ['functional'],
    description: String.raw`To differentiate a functional one needs directions in which to perturb a curve. Because competitors must keep the prescribed endpoint values, an allowed perturbation has to vanish at the endpoints; otherwise the perturbed curve would leave the admissible class. These endpoint-vanishing perturbations are the variations, the infinite-dimensional analogue of the displacement vectors along which one takes a directional derivative.`,
    definition: String.raw`Fix admissible curves with boundary data $y(a) = A$, $y(b) = B$. An **admissible variation** is a function $\eta \in C^1[a, b]$ (or $C^\infty$, or $C_c^\infty(a, b)$, depending on the smoothness assumed) with
$$\eta(a) = \eta(b) = 0.$$
For such $\eta$ and small $\varepsilon \in \mathbb{R}$ the curve $y + \varepsilon\,\eta$ is again admissible, since it has the same endpoint values; the family $\{\,y + \varepsilon\eta : \varepsilon \in \mathbb{R}\,\}$ is a one-parameter path through $y$ in the admissible class.`,
  },
  {
    id: 'first-variation',
    label: 'First Variation',
    title: 'First Variation',
    kind: 'definition',
    tags: ['Calculus of Variations'],
    dependencies: ['functional', 'admissible-variation', 'partial-derivative', 'chain-rule'],
    description: String.raw`The first variation is the derivative of a functional in a chosen direction: freeze an admissible variation, restrict the functional to the line through the curve in that direction, and differentiate the resulting one-variable function at the base point. A curve where every such directional derivative vanishes is *stationary* — this is the variational analogue of a critical point, the condition from which the governing differential equation is extracted.`,
    definition: String.raw`Let $J[y] = \int_a^b L(x, y, y')\,dx$ and let $\eta$ be an **admissible variation**. The **first variation** of $J$ at $y$ in the direction $\eta$ is
$$\delta J[y; \eta] := \left.\frac{d}{d\varepsilon}\right|_{\varepsilon = 0} J[y + \varepsilon\eta] = \int_a^b \left(\frac{\partial L}{\partial y}\,\eta + \frac{\partial L}{\partial y'}\,\eta'\right) dx,$$
the second equality obtained by differentiating under the integral sign and using the **partial derivatives** of $L$ via the chain rule. A curve $y$ is a **stationary point** (or extremal) of $J$ if $\delta J[y; \eta] = 0$ for every admissible variation $\eta$. A minimizer or maximizer is necessarily stationary.`,
  },
  {
    id: 'fundamental-lemma-cov',
    label: 'Fundamental Lemma',
    title: 'Fundamental Lemma of the Calculus of Variations',
    kind: 'lemma',
    tags: ['Calculus of Variations'],
    dependencies: ['continuity', 'riemann-integral'],
    description: String.raw`This is the bridge from "the integral against every test perturbation vanishes" to "the integrand itself vanishes." If a continuous function integrates to zero against all smooth bumps that die at the endpoints, it cannot be nonzero anywhere: a bump concentrated where it is positive would force a positive integral. The lemma is what converts the integral stationarity condition $\delta J = 0$ into a pointwise differential equation.`,
    statement: String.raw`Let $f : [a, b] \to \mathbb{R}$ be continuous. If
$$\int_a^b f(x)\,\eta(x)\,dx = 0 \quad \text{for every } \eta \in C_c^\infty(a, b)$$
(every smooth function with compact support in the open interval), then $f \equiv 0$ on $[a, b]$.`,
    proof: String.raw`Suppose not, so $f(x_0) \neq 0$ for some $x_0 \in (a, b)$; say $f(x_0) > 0$ (otherwise replace $f$ by $-f$). By **continuity** there is a closed interval $[c, d] \subseteq (a, b)$ containing $x_0$ on which $f(x) \ge f(x_0)/2 > 0$. Choose a fixed smooth bump $\eta$ with $\eta > 0$ on $(c, d)$, $\eta = 0$ outside $[c, d]$, and $\eta \ge 0$ everywhere — for instance $\eta(x) = \exp\!\bigl(-1/((x - c)(d - x))\bigr)$ on $(c, d)$ and $0$ elsewhere, which lies in $C_c^\infty(a, b)$. Then $f\eta \ge 0$ on $[a, b]$ and $f\eta \ge (f(x_0)/2)\,\eta > 0$ on $(c, d)$, so by monotonicity and positivity of the **Riemann integral**
$$\int_a^b f\eta\,dx \ge \frac{f(x_0)}{2}\int_c^d \eta\,dx > 0,$$
contradicting the hypothesis. Hence $f(x) = 0$ for all $x \in (a, b)$, and by continuity also at the endpoints. $\square$`,
  },
  {
    id: 'euler-lagrange-equation',
    label: 'Euler–Lagrange Equation',
    title: 'Euler–Lagrange Equation',
    kind: 'theorem',
    tags: ['Calculus of Variations'],
    dependencies: ['first-variation', 'fundamental-lemma-cov', 'fundamental-theorem-of-calculus'],
    description: String.raw`The central theorem of the subject: a curve that makes an integral functional stationary must satisfy a specific second-order differential equation, obtained by integrating the first variation by parts and stripping off the arbitrary test function. It converts a variational problem (minimize over all curves) into a differential equation (solve a boundary-value problem) — the bridge from the calculus of variations to differential equations, geometry, and physics.`,
    statement: String.raw`Let $L(x, y, p)$ be $C^2$ and let $y \in C^2[a, b]$ be a stationary point of $J[y] = \int_a^b L(x, y, y')\,dx$ among $C^1$ curves with fixed endpoints. Then $y$ satisfies the **Euler–Lagrange equation**
$$\frac{\partial L}{\partial y}\bigl(x, y, y'\bigr) - \frac{d}{dx}\!\left[\frac{\partial L}{\partial y'}\bigl(x, y, y'\bigr)\right] = 0, \qquad x \in (a, b).$$`,
    proof: String.raw`Let $\eta \in C_c^\infty(a, b)$ be any test function; it is an **admissible variation** ($\eta(a) = \eta(b) = 0$). Stationarity gives, from the **first variation** formula,
$$0 = \delta J[y; \eta] = \int_a^b\!\left(\frac{\partial L}{\partial y}\,\eta + \frac{\partial L}{\partial y'}\,\eta'\right) dx.$$
Integrate the second term by parts. Since $y \in C^2$ and $L \in C^2$, the function $x \mapsto \partial L/\partial y'(x, y(x), y'(x))$ is $C^1$, so by the **fundamental theorem of calculus** (integration by parts)
$$\int_a^b \frac{\partial L}{\partial y'}\,\eta'\,dx = \left[\frac{\partial L}{\partial y'}\,\eta\right]_a^b - \int_a^b \frac{d}{dx}\!\left(\frac{\partial L}{\partial y'}\right)\eta\,dx = -\int_a^b \frac{d}{dx}\!\left(\frac{\partial L}{\partial y'}\right)\eta\,dx,$$
the boundary term vanishing because $\eta(a) = \eta(b) = 0$. Substituting back,
$$\int_a^b \left(\frac{\partial L}{\partial y} - \frac{d}{dx}\frac{\partial L}{\partial y'}\right)\eta\,dx = 0 \quad \text{for every } \eta \in C_c^\infty(a, b).$$
The bracketed coefficient is continuous (again by $L \in C^2$, $y \in C^2$), so the **fundamental lemma of the calculus of variations** forces it to vanish identically on $(a, b)$, which is the Euler–Lagrange equation. $\square$`,
  },
  {
    id: 'beltrami-identity',
    label: 'Beltrami Identity',
    title: 'Beltrami Identity',
    kind: 'corollary',
    tags: ['Calculus of Variations'],
    dependencies: ['euler-lagrange-equation'],
    description: String.raw`When the Lagrangian does not depend explicitly on the independent variable, the Euler–Lagrange equation has a first integral: a combination of $L$ and its slope-derivative stays constant along an extremal. This is the variational shadow of energy conservation (and a special case of Noether's theorem for time-translation symmetry), and it reduces an autonomous second-order Euler–Lagrange equation to a first-order one — exactly the simplification that makes the brachistochrone solvable in closed form.`,
    statement: String.raw`If $L = L(y, y')$ does not depend explicitly on $x$, then along any $C^2$ extremal $y$,
$$L - y'\,\frac{\partial L}{\partial y'} = \text{constant}.$$`,
    proof: String.raw`Let $H := L - y'\,\partial L/\partial y'$. Differentiate along the extremal, using the chain rule (and $\partial L/\partial x = 0$ by hypothesis):
$$\frac{dH}{dx} = \frac{\partial L}{\partial y}\,y' + \frac{\partial L}{\partial y'}\,y'' - y''\,\frac{\partial L}{\partial y'} - y'\,\frac{d}{dx}\frac{\partial L}{\partial y'} = y'\left(\frac{\partial L}{\partial y} - \frac{d}{dx}\frac{\partial L}{\partial y'}\right).$$
The two $y''\,\partial L/\partial y'$ terms cancel. By the **Euler–Lagrange equation** the parenthesized factor is $0$, so $dH/dx = 0$ and $H$ is constant on $(a, b)$. $\square$`,
  },

  // ── Classical problems ─────────────────────────────────────────────────────
  {
    id: 'brachistochrone',
    label: 'Brachistochrone',
    title: 'Brachistochrone Problem',
    kind: 'proposition',
    tags: ['Calculus of Variations'],
    dependencies: ['euler-lagrange-equation', 'beltrami-identity'],
    description: String.raw`Among all curves joining two points, which one lets a frictionless bead slide from rest down to the other in the *least time*? Posed by Johann Bernoulli in 1696, this brachistochrone ("shortest-time") problem launched the calculus of variations — and the contest it provoked, with Newton reputedly solving it overnight, drew in the Bernoullis, Leibniz, and l'Hôpital. The answer is a cycloid: the curve traced by a point on a rolling circle, not the straight line one might naively guess.`,
    statement: String.raw`Place the start at the origin with the $y$-axis pointing downward. A bead released from rest sliding without friction under gravity $g$ along a curve $y(x)$ reaches energy $\tfrac12 v^2 = g y$, so $v = \sqrt{2gy}$ and the descent time is $T[y] = \int_0^{x_1} \sqrt{(1 + y'^2)/(2gy)}\,dx$. Every extremal of $T$ is an arc of a **cycloid**, given parametrically by $x = r(\theta - \sin\theta)$, $y = r(1 - \cos\theta)$; this cycloidal arc is in fact the minimizer.`,
    proof: String.raw`The integrand $L(y, y') = \sqrt{(1 + y'^2)/(2gy)}$ has no explicit $x$-dependence, so the **Beltrami identity** applies: $L - y'\,\partial L/\partial y'$ is constant. Compute $\partial L/\partial y' = y'/\sqrt{2gy(1 + y'^2)}$, hence
$$L - y'\frac{\partial L}{\partial y'} = \frac{1 + y'^2}{\sqrt{2gy(1+y'^2)}} - \frac{y'^2}{\sqrt{2gy(1+y'^2)}} = \frac{1}{\sqrt{2gy(1 + y'^2)}} = c,$$
a constant. Squaring gives $y(1 + y'^2) = 1/(2gc^2) =: 2r$, the classical brachistochrone first integral $y(1 + y'^2) = 2r$. Solving for the slope, $y' = \sqrt{(2r - y)/y}$, which separates. Substituting $y = r(1 - \cos\theta) = 2r\sin^2(\theta/2)$ gives $dy = r\sin\theta\,d\theta$ and $y' = \cot(\theta/2)$, so $dx = dy/y' = r\sin\theta\tan(\theta/2)\,d\theta = r(1 - \cos\theta)\,d\theta$; integrating with $x(0) = 0$ yields $x = r(\theta - \sin\theta)$. Thus the extremal is the stated **cycloid**. (That this **Euler–Lagrange** extremal is the genuine minimizer, not merely stationary, follows from convexity of $L$ in $y'$ — the Legendre/Weierstrass sufficiency conditions.) $\square$`,
  },
  {
    id: 'isoperimetric-problem',
    label: 'Isoperimetric Problem',
    title: 'Isoperimetric Problem',
    kind: 'definition',
    tags: ['Calculus of Variations'],
    dependencies: ['euler-lagrange-equation', 'lagrange-multipliers'],
    description: String.raw`The oldest variational question: among all closed curves of a given perimeter, which encloses the most area? In the plane the answer is the circle, and the resulting bound $4\pi A \le P^2$ is the isoperimetric inequality. What makes the problem the prototype of *constrained* variation is that one extremizes one functional (area) subject to another being fixed (perimeter) — handled by the variational Lagrange-multiplier rule.`,
    definition: String.raw`An **isoperimetric problem** extremizes a functional $J[y] = \int_a^b L(x, y, y')\,dx$ subject to a fixed value of a second functional $K[y] = \int_a^b M(x, y, y')\,dx = \ell$. By the **Lagrange multiplier** rule for functionals, a constrained extremal that is not a critical point of $K$ alone satisfies, for some constant $\lambda \in \mathbb{R}$, the Euler–Lagrange equation of $L - \lambda M$:
$$\frac{\partial (L - \lambda M)}{\partial y} - \frac{d}{dx}\frac{\partial (L - \lambda M)}{\partial y'} = 0.$$
The model case maximizes enclosed area $A = \tfrac12\oint (x\,dy - y\,dx)$ at fixed perimeter $P = \oint \sqrt{dx^2 + dy^2}$, whose solution is the circle and whose conclusion is the **isoperimetric inequality** $4\pi A \le P^2$, with equality only for the circle.`,
  },
  {
    id: 'minimal-surface',
    label: 'Minimal Surface',
    title: 'Minimal Surface',
    kind: 'definition',
    tags: ['Calculus of Variations'],
    dependencies: ['euler-lagrange-equation', 'partial-derivative', 'divergence'],
    description: String.raw`A minimal surface is one that locally minimizes area for its boundary — the shape a soap film spans across a wire loop (Plateau's problem). Working out the Euler–Lagrange condition for the area functional gives a second-order nonlinear PDE whose geometric meaning is that the *mean curvature* vanishes everywhere: at each point the surface bends equally and oppositely in two perpendicular directions, so it has no net tendency to shrink. The plane, catenoid, and helicoid are the classical examples; the subject ties variation to differential geometry and PDE.`,
    definition: String.raw`For a surface given as a graph $z = u(x, y)$ over a planar domain $\Omega$, the area is the functional
$$A[u] = \int_\Omega \sqrt{1 + u_x^2 + u_y^2}\,dx\,dy.$$
A graph is a **minimal surface** if it is a stationary point of $A$ for boundary-fixing variations, i.e. it satisfies the Euler–Lagrange equation of $A$ — the **minimal surface equation**, written in **divergence** form as
$$\operatorname{div}\!\left(\frac{\nabla u}{\sqrt{1 + |\nabla u|^2}}\right) = 0.$$
Carrying out the divergence and clearing the positive denominator $(1 + |\nabla u|^2)^{3/2}$, this is equivalent to the expanded **minimal surface equation**
$$(1 + u_y^2)\,u_{xx} - 2 u_x u_y\,u_{xy} + (1 + u_x^2)\,u_{yy} = 0,$$
where the **partial derivatives** $u_x, u_y, \dots$ are those of $u$. Geometrically this says the **mean curvature** $H$ vanishes identically; the condition makes sense for any (not just graphical) surface, defining minimal surfaces in general.`,
  },

  // ── Mechanics ──────────────────────────────────────────────────────────────
  {
    id: 'hamiltons-principle',
    label: "Hamilton's Principle",
    title: "Hamilton's Principle (Least Action)",
    kind: 'definition',
    tags: ['Calculus of Variations'],
    dependencies: ['functional', 'euler-lagrange-equation'],
    description: String.raw`Mechanics can be founded not on forces but on a single variational law: of all conceivable motions between two configurations in a fixed time, nature selects the one that makes the *action* stationary. The action is the time-integral of the Lagrangian, kinetic minus potential energy. Its Euler–Lagrange equations are exactly Newton's second law, so the entire content of conservative classical mechanics is repackaged as one extremal principle — the template later carried into field theory and the path-integral formulation of quantum mechanics.`,
    definition: String.raw`For a system with configuration $q(t) \in \mathbb{R}^n$, kinetic energy $T$, and potential energy $V$, the **Lagrangian** is $L = T - V$ and the **action** over $[t_0, t_1]$ is the functional
$$S[q] = \int_{t_0}^{t_1} L\bigl(q(t), \dot q(t), t\bigr)\,dt.$$
**Hamilton's principle** asserts that the physical trajectory between fixed configurations $q(t_0), q(t_1)$ is a **stationary point** of $S$: $\delta S = 0$ for all variations vanishing at the endpoints. By the **Euler–Lagrange equation** this is equivalent to $\frac{d}{dt}\frac{\partial L}{\partial \dot q} = \frac{\partial L}{\partial q}$. For a single particle with $L = \tfrac12 m|\dot q|^2 - V(q)$ this reads $m\ddot q = -\nabla V$ — Newton's second law.`,
  },
  {
    id: 'lagrangian-mechanics',
    label: 'Lagrangian Mechanics',
    title: 'Lagrangian Mechanics',
    kind: 'definition',
    tags: ['Calculus of Variations'],
    dependencies: ['hamiltons-principle', 'euler-lagrange-equation'],
    description: String.raw`Lagrangian mechanics is the working formulation of classical dynamics built on Hamilton's principle. Rather than tracking forces in fixed coordinates, it describes a system by generalized coordinates adapted to its constraints and a single scalar Lagrangian; the equations of motion are then the Euler–Lagrange equations. Because those equations transform covariantly, the formalism is coordinate-independent and absorbs constraints automatically, handling pendulums, orbits, and continuous fields far more cleanly than Newton's vectorial laws.`,
    definition: String.raw`A **Lagrangian system** is specified by a configuration manifold with generalized coordinates $q = (q^1, \dots, q^n)$ and a Lagrangian $L(q, \dot q, t)$. Its motions are the stationary points of the action $S[q] = \int L\,dt$ (**Hamilton's principle**), characterized by the **Euler–Lagrange equations**
$$\frac{d}{dt}\frac{\partial L}{\partial \dot q^i} - \frac{\partial L}{\partial q^i} = 0, \qquad i = 1, \dots, n.$$
A coordinate $q^i$ that does not appear in $L$ (a **cyclic** coordinate) yields a conserved **generalized momentum** $p_i = \partial L/\partial \dot q^i$, since then $\dot p_i = \partial L/\partial q^i = 0$. The form of the equations is invariant under any smooth change of generalized coordinates, which is the formalism's defining advantage.`,
  },
  {
    id: 'hamiltonian-mechanics',
    label: 'Hamiltonian Mechanics',
    title: 'Hamiltonian Mechanics',
    kind: 'definition',
    tags: ['Calculus of Variations'],
    dependencies: ['lagrangian-mechanics'],
    description: String.raw`Hamiltonian mechanics rewrites Lagrangian dynamics on phase space — positions paired with momenta — by trading each velocity for its conjugate momentum through a Legendre transform. The Lagrangian is replaced by the Hamiltonian, which under the usual conditions is the total energy, and the single set of second-order Euler–Lagrange equations becomes a symmetric first-order system. The resulting symplectic geometry of phase space is the launching point for canonical transformations, statistical mechanics, and the quantum correspondence.`,
    definition: String.raw`Given a Lagrangian $L(q, \dot q, t)$, define the conjugate **momenta** $p_i = \partial L/\partial \dot q^i$ and the **Hamiltonian** by the Legendre transform
$$H(q, p, t) = \sum_i p_i\,\dot q^i - L,$$
with the $\dot q^i$ expressed in terms of $(q, p)$ (assuming the transform is invertible, i.e. $\det[\partial^2 L/\partial \dot q^i \partial \dot q^j] \neq 0$). The **Euler–Lagrange equations** of **Lagrangian mechanics** are then equivalent to **Hamilton's equations**
$$\dot q^i = \frac{\partial H}{\partial p_i}, \qquad \dot p_i = -\frac{\partial H}{\partial q^i}.$$
When $L = T - V$ with $T$ quadratic in $\dot q$ and $L$ has no explicit time dependence, $H = T + V$ is the conserved total energy. The pairs $(q, p)$ are coordinates on **phase space**, carrying a canonical symplectic structure.`,
  },
  {
    id: 'noethers-theorem',
    label: "Noether's Theorem",
    title: "Noether's Theorem",
    kind: 'theorem',
    tags: ['Calculus of Variations'],
    dependencies: ['hamiltons-principle', 'euler-lagrange-equation', 'fundamental-theorem-of-calculus', 'beltrami-identity'],
    description: String.raw`Every continuous symmetry of an action gives rise to a conserved quantity. Invariance under time translation yields conservation of energy, under spatial translation conservation of momentum, under rotation conservation of angular momentum. Noether's theorem thus reveals the great conservation laws not as accidents but as the exact shadows of the symmetries of the laws of motion — one of the deepest organizing principles in physics, and the crowning achievement of the variational viewpoint.`,
    statement: String.raw`Let $L(q, \dot q, t)$ and consider a one-parameter family of transformations acting on both time and configuration, $(t, q) \mapsto (T_s(t, q),\, Q_s(t, q))$ with $T_0 = t$, $Q_0(t, q) = q$, with infinitesimal generators $\tau(t, q) := \tfrac{d}{ds}\big|_{s=0} T_s$ and $\xi(t, q) := \tfrac{d}{ds}\big|_{s=0} Q_s$. Suppose the action $S[q] = \int L(q, \dot q, t)\,dt$ is **invariant** to first order: for every curve, $\tfrac{d}{ds}\big|_{s=0}\!\int L\bigl(Q_s, \tfrac{dQ_s}{dT_s}, T_s\bigr)\,dT_s = 0$. Then, along any solution of the **Euler–Lagrange equations**, the **Noether charge**
$$Q := \sum_i \frac{\partial L}{\partial \dot q^i}\bigl(\xi^i - \dot q^i\,\tau\bigr) + L\,\tau$$
is conserved: $\frac{dQ}{dt} = 0$. In the special case of a transformation acting on $q$ alone ($\tau = 0$) under the pointwise invariance $L(Q_s(q), \tfrac{d}{dt}Q_s(q)) = L(q, \dot q)$, this reduces to $Q = \sum_i \frac{\partial L}{\partial \dot q^i}\,\xi^i$.`,
    proof: String.raw`Write the variation of the curve induced at fixed $t$ by the transformation as $\delta q^i := \xi^i - \dot q^i\,\tau$ (the difference between the transformed configuration and the original at the same clock time, to first order in $s$), and recall the time-shift $\delta t := \tau$. A first-order computation of how $S = \int L\,dt$ changes when the curve undergoes $\delta q$ and the integration variable undergoes $\delta t$ gives the standard variation formula
$$\frac{d}{ds}\Big|_{s=0} S = \int \left[\sum_i\left(\frac{\partial L}{\partial q^i} - \frac{d}{dt}\frac{\partial L}{\partial \dot q^i}\right)\delta q^i\right] dt + \left[\sum_i \frac{\partial L}{\partial \dot q^i}\,\delta q^i + L\,\tau\right]_{t_0}^{t_1},$$
in which the bulk integrand is the **Euler–Lagrange** expression contracted with $\delta q$, and the boundary term is a total time-derivative of $\sum_i \tfrac{\partial L}{\partial \dot q^i}\delta q^i + L\,\tau$. **(Derivation of the boundary term.)** Substituting $\delta q^i = \xi^i - \dot q^i\tau$ into $\sum_i \tfrac{\partial L}{\partial \dot q^i}\delta q^i + L\,\tau = \sum_i \tfrac{\partial L}{\partial \dot q^i}(\xi^i - \dot q^i\tau) + L\,\tau = Q$ identifies it with the asserted **Noether charge**. **(Invariance.)** By hypothesis $\tfrac{d}{ds}\big|_0 S = 0$ for every interval $[t_0, t_1]$. **(On a solution.)** Along a solution of the **Euler–Lagrange equations** the bulk integrand vanishes identically, so the invariance reduces to $\bigl[\,Q\,\bigr]_{t_0}^{t_1} = 0$ for all $t_0 < t_1$; by the **fundamental theorem of calculus** this forces $\frac{dQ}{dt} = 0$, i.e. $Q$ is conserved.

*Energy from time-translation.* For the pure time shift $T_s = t + s$, $Q_s = q$ (so $\tau = 1$, $\xi = 0$), which is an invariance of the action exactly when $L$ has no explicit $t$-dependence, the charge is $Q = \sum_i \frac{\partial L}{\partial \dot q^i}(0 - \dot q^i\cdot 1) + L\cdot 1 = L - \sum_i \dot q^i\frac{\partial L}{\partial \dot q^i}$, i.e. (up to sign) the conserved energy $H = \sum_i \dot q^i\frac{\partial L}{\partial \dot q^i} - L$ — the **Beltrami**-type integral. Note this genuinely requires the $L\,\tau$ boundary term, hence a transformation acting on $t$: the $\tau = 0$ charge alone cannot produce the $-L$ term. $\square$`,
  },

  // ── Existence theory ───────────────────────────────────────────────────────
  {
    id: 'lower-semicontinuity',
    label: 'Lower Semicontinuity',
    title: 'Lower Semicontinuity',
    kind: 'definition',
    tags: ['Calculus of Variations'],
    dependencies: ['continuity', 'limit-of-a-sequence', 'weak-topology'],
    description: String.raw`Lower semicontinuity is the one-sided continuity that is exactly right for minimization. A function is lower semicontinuous if it never jumps *down* in the limit: the value at a limit point cannot exceed what the function approaches. This is all one needs to make minima behave — a lower semicontinuous function on a compact set attains its infimum — and it is the property a functional must have for the direct method to pass to the limit, even when full continuity fails (as it does for energies in the weak topology).`,
    definition: String.raw`A function $F : X \to \mathbb{R} \cup \{+\infty\}$ on a topological space $X$ is **lower semicontinuous** (lsc) at $x$ if for every $c < F(x)$ there is a neighborhood $U$ of $x$ with $F(y) > c$ for all $y \in U$; $F$ is lsc on $X$ if it is lsc at every point, equivalently if each sublevel set $\{\,x : F(x) \le c\,\}$ is closed. The **sequential** version requires, for every sequence $x_n \to x$,
$$F(x) \le \liminf_{n \to \infty} F(x_n).$$
Topological lsc always implies sequential lsc, and the two coincide when $X$ is metric — more generally, first-countable. **Sequential weak lower semicontinuity** is the sequential version with $x_n \to x$ replaced by weak convergence $x_n \rightharpoonup x$ — the version that the direct method requires. Here the distinction matters: the weak topology of an infinite-dimensional space is generally not metrizable (not first-countable), so the sequential notion is genuinely weaker than the topological one and is the operative one for minimizing sequences.`,
  },
  {
    id: 'weierstrass-extreme-value-abstract',
    label: 'Generalized Extreme Value',
    title: 'Lower Semicontinuity and Attainment of the Infimum',
    kind: 'proposition',
    tags: ['Calculus of Variations'],
    dependencies: ['lower-semicontinuity', 'compactness'],
    description: String.raw`This is the abstract engine of every existence proof by the direct method: lower semicontinuity plus compactness forces a minimum to exist. It is the exact generalization of the classical extreme value theorem — which assumes a continuous function on a compact set — weakening continuity to its one-sided minimization-friendly version. In applications the relevant compactness is in a weak topology, and the relevant semicontinuity is weak lower semicontinuity, but the logical skeleton is this short argument.`,
    statement: String.raw`Let $K$ be a non-empty sequentially compact topological space and $F : K \to \mathbb{R} \cup \{+\infty\}$ sequentially lower semicontinuous with $\inf_K F < +\infty$. Then $F$ attains its infimum: there is $x^* \in K$ with $F(x^*) = \inf_K F$.`,
    proof: String.raw`Let $m = \inf_K F \in [-\infty, +\infty)$ and take a **minimizing sequence** $x_n \in K$ with $F(x_n) \to m$ (possible by definition of infimum). By sequential **compactness** of $K$, some subsequence $x_{n_k} \to x^*$ in $K$. By **lower semicontinuity**,
$$F(x^*) \le \liminf_{k} F(x_{n_k}) = \lim_k F(x_{n_k}) = m,$$
the equality holding because $F(x_n) \to m$ implies every subsequence converges to $m$. But $F(x^*) \ge m = \inf_K F$ by definition of the infimum. Hence $F(x^*) = m$; in particular $m > -\infty$ and the infimum is attained at $x^*$. $\square$`,
  },
  {
    id: 'direct-method',
    label: 'Direct Method',
    title: 'Direct Method of the Calculus of Variations',
    kind: 'theorem',
    tags: ['Calculus of Variations'],
    dependencies: ['functional', 'weierstrass-extreme-value-abstract', 'lower-semicontinuity', 'sobolev-space', 'banach-alaoglu', 'weak-topology', 'convex-function', 'fatous-lemma'],
    description: String.raw`The direct method proves a minimizer *exists* without solving the Euler–Lagrange equation. Tonelli's insight was that one can run the abstract "compactness + lower semicontinuity" recipe directly on the functional, provided one works in the right function space. Coercivity confines a minimizing sequence to a bounded set; reflexivity of a Sobolev space then yields a weakly convergent subsequence; and convexity of the Lagrangian in the gradient gives weak lower semicontinuity, so the weak limit is the sought minimizer. This is the modern existence theory of variational problems, the point where the subject becomes functional analysis.`,
    statement: String.raw`Let $\Omega \subseteq \mathbb{R}^n$ be bounded with Lipschitz boundary, $1 < q < \infty$, and consider
$$J[u] = \int_\Omega L\bigl(x, u(x), \nabla u(x)\bigr)\,dx$$
over the admissible class $\mathcal{A} = \{\,u \in W^{1,q}(\Omega) : u = g \text{ on } \partial\Omega\,\}$ (a closed affine subset of a **Sobolev space**). Assume **(coercivity)** $L(x, u, p) \ge \alpha\,|p|^q - \beta$ with $\alpha > 0$, and **(convexity)** $p \mapsto L(x, u, p)$ is **convex** for each $(x, u)$, with $L$ continuous and bounded below. If $\mathcal{A} \neq \emptyset$, then $J$ attains its minimum on $\mathcal{A}$.`,
    proof: String.raw`This is the classical theorem of **Tonelli**; the proof instantiates the abstract attainment principle **weierstrass-extreme-value-abstract** in the **weak topology** of $W^{1,q}(\Omega)$, and the two analytic inputs beyond this graph are named explicitly.

*Minimizing sequence and bound.* Since $\mathcal{A} \neq \emptyset$ and $L$ is bounded below, $m := \inf_{\mathcal{A}} J$ is finite; pick $u_k \in \mathcal{A}$ with $J[u_k] \to m$. By coercivity, $\alpha\int_\Omega |\nabla u_k|^q - \beta|\Omega| \le J[u_k] \le m + 1$ for large $k$, so $\lVert \nabla u_k\rVert_{L^q}$ is bounded; with the boundary condition and the **Poincaré inequality** (the named input controlling $\lVert u_k\rVert_{L^q}$ by $\lVert \nabla u_k\rVert_{L^q}$ on a bounded domain), the full $W^{1,q}$-norms $\lVert u_k\rVert_{W^{1,q}}$ are bounded.

*Compactness (weak).* For $1 < q < \infty$ the space $W^{1,q}(\Omega)$ is **reflexive**, so by the **Banach–Alaoglu theorem** (in reflexive form: bounded sets are sequentially weakly precompact) a subsequence $u_{k_j} \rightharpoonup u^*$ converges **weakly** in $W^{1,q}$. The affine constraint set $\mathcal{A}$ is convex and norm-closed, hence weakly closed, so $u^* \in \mathcal{A}$.

*Weak lower semicontinuity.* Under the convexity of $L$ in $p$ (together with the lower bound and continuity), $J$ is **sequentially weakly lower semicontinuous** on $W^{1,q}$: $J[u^*] \le \liminf_j J[u_{k_j}]$. This is **Tonelli's lower-semicontinuity theorem**, the second deep input; its proof combines Mazur's lemma (a convex combination of the weakly convergent gradients converges strongly) with the pointwise convexity inequality for $L$ and Fatou's lemma. (Convexity in $p$ is essentially necessary: it is equivalent to weak lower semicontinuity for these integrands.)

*Conclusion.* Combining, $m \le J[u^*] \le \liminf_j J[u_{k_j}] = m$, so $J[u^*] = m$ and the minimum is attained at $u^* \in \mathcal{A}$. The logical skeleton — minimizing sequence, extract a convergent (here weakly convergent) subsequence by compactness, pass to the limit by **lower semicontinuity** — is exactly **weierstrass-extreme-value-abstract**; the named external inputs are the Poincaré inequality, reflexivity of $W^{1,q}$ feeding **Banach–Alaoglu**, and Tonelli's weak-lower-semicontinuity theorem. $\square$`,
  },
]

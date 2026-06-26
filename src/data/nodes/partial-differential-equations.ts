import type { MathNode } from '../types'

export const PDE_NODES: MathNode[] = [
  // ── Basic objects and classification ─────────────────────────────────────────
  {
    id: 'partial-differential-equation',
    label: 'Partial Differential Equation',
    title: 'Partial Differential Equation',
    kind: 'definition',
    tags: ['Partial Differential Equations'],
    dependencies: ['partial-derivative', 'differential-equation'],
    description: String.raw`Where an ordinary differential equation constrains a function of one variable, a partial differential equation constrains a function of several — relating it to its partial derivatives in each direction. These are the equations of continuous physics: heat, waves, fluids, electromagnetism, gravity, finance. Unlike the ODE case, there is no single existence-and-uniqueness theorem; what data make a problem well-posed, and how solutions behave, depend sharply on the structure of the equation, so the subject splits into the study of distinct equation types. Closed-form solutions are rare, which is why the theory invests so heavily in qualitative properties, weak formulations, and approximation.`,
    definition: String.raw`A **partial differential equation** (PDE) of order $k$ for an unknown function $u : \Omega \to \mathbb{R}$ on an open set $\Omega \subseteq \mathbb{R}^n$ is a relation
$$F\bigl(x,\ u(x),\ Du(x),\ D^2 u(x),\ \dots,\ D^k u(x)\bigr) = 0 \qquad (x \in \Omega),$$
where $D^j u$ collects all **partial derivatives** of $u$ of order $j$ and $k$ is the largest order actually appearing. The PDE is **linear** if $F$ is affine in $u$ and its derivatives, $\sum_{|\alpha| \le k} a_\alpha(x)\, \partial^\alpha u = f(x)$; it is **semilinear** if only the highest-order part is linear with coefficients independent of $u$, and **quasilinear** if those top coefficients may depend on $u$ and its lower derivatives. A **solution** is a function with enough derivatives to satisfy the relation pointwise (a *classical* solution), a requirement later relaxed to admit **weak solutions**.`,
  },
  {
    id: 'classification-of-pdes',
    label: 'Classification of PDEs',
    title: 'Elliptic, Parabolic, Hyperbolic',
    kind: 'definition',
    tags: ['Partial Differential Equations'],
    dependencies: ['partial-differential-equation', 'eigenvalue-eigenvector'],
    description: String.raw`The behaviour of a second-order linear PDE is governed almost entirely by its top-order part — the principal symbol — encoded in a symmetric coefficient matrix. The signature of that matrix sorts equations into three families whose prototypes are Laplace's equation (elliptic, modelling equilibrium), the heat equation (parabolic, modelling diffusion), and the wave equation (hyperbolic, modelling propagation). The type is not a cosmetic label: it dictates which boundary or initial data yield a well-posed problem, whether solutions smooth out or carry singularities, and at what speed information travels. In two variables the trichotomy reduces to the sign of a discriminant.`,
    definition: String.raw`Consider a second-order linear operator $L u = \sum_{i,j=1}^n a_{ij}(x)\,\partial_i \partial_j u + (\text{lower order})$ with symmetric principal coefficient matrix $A(x) = (a_{ij}(x))$. At a point $x$ the operator is, by the **eigenvalues** of $A(x)$:

- **elliptic** if all eigenvalues have the same sign (none zero) — prototype $\Delta u = 0$;
- **parabolic** if exactly one eigenvalue is zero (with a compatible first-order term in the missing direction) — prototype $u_t - \Delta u = 0$;
- **hyperbolic** if one eigenvalue has the opposite sign to the rest (all nonzero) — prototype $u_{tt} - \Delta u = 0$.

In two variables, writing $A u_{xx} + 2B u_{xy} + C u_{yy}$, the type is the sign of the **discriminant** $B^2 - AC$: negative gives elliptic, zero parabolic, positive hyperbolic.`,
  },

  // ── The three model equations ────────────────────────────────────────────────
  {
    id: 'laplace-equation',
    label: "Laplace's Equation",
    title: "Laplace's Equation & Harmonic Functions",
    kind: 'definition',
    tags: ['Partial Differential Equations'],
    dependencies: ['partial-differential-equation', 'divergence', 'gradient'],
    description: String.raw`The simplest and most fundamental elliptic equation asks that the Laplacian of $u$ vanish; its solutions are the harmonic functions. These are the steady states of diffusion — the temperature distribution a body settles into when no heat is flowing — and, in the plane, exactly the real and imaginary parts of holomorphic functions. Harmonic functions are extraordinarily rigid: they are automatically smooth, they satisfy a mean value property (each value is the average over surrounding spheres), they obey a maximum principle, and they are determined inside a region by their boundary values alone. The inhomogeneous version, with a prescribed source, is Poisson's equation.`,
    definition: String.raw`The **Laplacian** of a twice-differentiable function $u$ on an open set $\Omega \subseteq \mathbb{R}^n$ is
$$\Delta u = \operatorname{div}(\nabla u) = \sum_{i=1}^n \frac{\partial^2 u}{\partial x_i^2},$$
the **divergence** of the **gradient**. **Laplace's equation** is $\Delta u = 0$; a function satisfying it on $\Omega$ is **harmonic** there. The inhomogeneous equation $-\Delta u = f$ for a prescribed source $f$ is **Poisson's equation**. Harmonic functions of class $C^2$ are automatically $C^\infty$ (indeed real-analytic) on $\Omega$.`,
  },
  {
    id: 'heat-equation',
    label: 'Heat Equation',
    title: 'Heat Equation',
    kind: 'definition',
    tags: ['Partial Differential Equations'],
    dependencies: ['partial-differential-equation', 'laplace-equation', 'initial-value-problem'],
    description: String.raw`The prototypical parabolic equation models diffusion: the rate of change of a quantity in time equals the Laplacian of its current spatial distribution, so the quantity flows from where it is concentrated toward where it is sparse. It describes heat conduction, the spreading of a chemical concentration, and — after rescaling — the probability density of Brownian motion. Diffusion is irreversibly smoothing: solutions become infinitely differentiable the instant $t > 0$ no matter how rough the initial data, and the equation cannot in general be run backward in time. On the whole line it is solved by convolution with the Gaussian heat kernel; on a bounded interval, by Fourier series.`,
    definition: String.raw`The **heat equation** for $u(x, t)$ with $x \in \Omega \subseteq \mathbb{R}^n$ and $t > 0$ is
$$u_t = \Delta u,$$
where $\Delta$ acts in the spatial variables (the **Laplacian**, see **laplace-equation**). Here the diffusivity has been normalized to $1$: the general constant-diffusivity equation $u_t = \kappa\,\Delta u$ is reduced to this form by rescaling time $t \mapsto \kappa t$. An **initial value problem** prescribes $u(\cdot, 0) = g$; on a bounded domain one also imposes boundary conditions (e.g. **Dirichlet** $u = 0$ on $\partial\Omega$) for all $t > 0$. The time-independent solutions are exactly the **harmonic** functions, so equilibria of the heat equation solve Laplace's equation.`,
  },
  {
    id: 'wave-equation',
    label: 'Wave Equation',
    title: 'Wave Equation',
    kind: 'definition',
    tags: ['Partial Differential Equations'],
    dependencies: ['partial-differential-equation', 'laplace-equation'],
    description: String.raw`The prototypical hyperbolic equation governs vibration and propagation: a vibrating string, sound in air, light, gravitational radiation. Because it is second order in time, specifying the state requires both an initial displacement and an initial velocity. Unlike diffusion, wave propagation is reversible, conserves energy, and transmits signals at a strict finite speed $c$ — a disturbance at one point cannot be felt elsewhere until enough time has passed for the wave to arrive. In one spatial dimension every solution splits cleanly into a left-moving and a right-moving profile (d'Alembert's formula); in odd dimensions $\ge 3$ disturbances propagate sharply along light cones (Huygens' principle).`,
    definition: String.raw`The **wave equation** for $u(x, t)$ with $x \in \Omega \subseteq \mathbb{R}^n$ and propagation speed $c > 0$ is
$$u_{tt} = c^2\,\Delta u,$$
with $\Delta$ the spatial **Laplacian** (**laplace-equation**). Its **initial value problem** prescribes both the initial position $u(\cdot, 0) = g$ and the initial velocity $u_t(\cdot, 0) = h$; on a bounded domain one adds boundary conditions for $t > 0$. The equation is invariant under time reversal $t \mapsto -t$, and the spacetime operator $\partial_{tt} - c^2 \Delta$ (the **d'Alembertian**) factors in one dimension as $(\partial_t - c\partial_x)(\partial_t + c\partial_x)$.`,
  },

  // ── Posing problems ──────────────────────────────────────────────────────────
  {
    id: 'boundary-value-problem',
    label: 'Boundary Value Problem',
    title: 'Boundary & Initial Value Problems',
    kind: 'definition',
    tags: ['Partial Differential Equations'],
    dependencies: ['partial-differential-equation', 'classification-of-pdes', 'initial-value-problem'],
    description: String.raw`A PDE on its own underdetermines the solution; supplementary data on the boundary of the domain (and, for time-dependent equations, at the initial instant) select a particular one. The art is to match the type of data to the type of equation: elliptic equations want boundary data all around, hyperbolic equations want initial data and propagate it, and a mismatch produces a problem that is ill-posed — with no solution, many solutions, or solutions that explode under tiny perturbations of the data. Hadamard distilled the requirement into three conditions; meeting them is the central design constraint when modelling with PDEs.`,
    definition: String.raw`A **boundary value problem** poses a PDE on a domain $\Omega$ together with conditions on $\partial\Omega$: a **Dirichlet** condition prescribes the values $u|_{\partial\Omega} = g$, a **Neumann** condition the normal derivative $\partial u/\partial n|_{\partial\Omega} = h$, and a **Robin** condition a combination $\alpha u + \beta\,\partial u/\partial n = h$. Time-dependent equations additionally require **initial conditions** at $t = 0$ ($u(\cdot,0) = g$, and for the wave equation also $u_t(\cdot,0) = h$), making them initial–boundary value problems. The problem is **well-posed** in the sense of Hadamard when (i) a solution **exists**, (ii) it is **unique**, and (iii) it **depends continuously** on the data in suitable norms. Which condition type yields well-posedness is dictated by the **classification** of the equation.`,
  },

  // ── Classical solution methods ───────────────────────────────────────────────
  {
    id: 'separation-of-variables',
    label: 'Separation of Variables',
    title: 'Separation of Variables',
    kind: 'definition',
    tags: ['Partial Differential Equations'],
    dependencies: ['partial-differential-equation', 'fourier-series', 'eigenvalue-eigenvector'],
    description: String.raw`The oldest constructive method for linear PDEs on simple domains searches for solutions that factor as a product of single-variable functions. Substituting such an ansatz forces each variable's part to satisfy an ordinary differential equation, with a shared separation constant linking them. On a bounded interval the spatial ODE becomes an eigenvalue problem whose eigenfunctions are sines and cosines; superposing them with coefficients chosen to match the initial data reconstructs the solution as a Fourier series. This is the classical route to the heat, wave, and Laplace equations on rectangles, discs, and balls, and it is where Fourier analysis was born.`,
    definition: String.raw`**Separation of variables** seeks solutions of a linear homogeneous PDE in the product form $u(x, t) = X(x)\,T(t)$ (more variables factor likewise). Substituting and dividing by $XT$ forces each side to equal a common constant $-\lambda$ (the **separation constant**), splitting the PDE into ordinary differential equations. With homogeneous boundary conditions the spatial equation becomes an **eigenvalue problem** $-X'' = \lambda X$ whose admissible $\lambda$ (the **eigenvalues**) and **eigenfunctions** $X_n$ form a complete orthogonal system; the general solution is the superposition $u = \sum_n c_n X_n(x)\,T_n(t)$, with the coefficients $c_n$ fixed by expanding the remaining initial/boundary data as a **Fourier series** in the $X_n$.`,
  },
  {
    id: 'method-of-characteristics',
    label: 'Method of Characteristics',
    title: 'Method of Characteristics',
    kind: 'definition',
    tags: ['Partial Differential Equations'],
    dependencies: ['partial-differential-equation', 'ordinary-differential-equation', 'weak-solution'],
    description: String.raw`First-order PDEs can be solved by reducing them to ordinary differential equations along special curves. The idea is that the equation prescribes the derivative of $u$ in one privileged direction at each point; following that direction traces out a characteristic curve along which the PDE collapses to an ODE, transporting the boundary/initial data into the interior. This makes finite-speed propagation manifest. For nonlinear equations the characteristics can collide: where they cross, the implied solution would become multivalued, classical solutions cease to exist, and a discontinuity — a shock — forms, forcing a passage to weak solutions governed by jump and entropy conditions.`,
    definition: String.raw`For a quasilinear first-order PDE $a(x, y, u)\,u_x + b(x, y, u)\,u_y = c(x, y, u)$, the **characteristic curves** are the solutions of the **characteristic system** of ordinary differential equations
$$\frac{dx}{ds} = a, \qquad \frac{dy}{ds} = b, \qquad \frac{du}{ds} = c.$$
Along each such curve the PDE reduces to the last ODE for $u$. Given initial data on a noncharacteristic curve $\Gamma$, solving the system from each point of $\Gamma$ sweeps out a surface $u = u(x, y)$ — the solution — valid as long as distinct characteristics do not cross. For a nonlinear **conservation law** $u_t + (q(u))_x = 0$ the characteristics are straight lines carrying constant $u$; when they intersect, a **shock** forms and the classical solution must be replaced by a weak one.`,
  },

  // ── Generalized solutions and the modern framework ───────────────────────────
  {
    id: 'weak-derivative',
    label: 'Weak Derivative',
    title: 'Weak Derivative',
    kind: 'definition',
    tags: ['Partial Differential Equations'],
    dependencies: ['partial-differential-equation', 'lp-space', 'tempered-distribution'],
    description: String.raw`The integration-by-parts formula trades a derivative on one factor for a derivative on the other, with no boundary term when one factor vanishes near the boundary. This identity lets us define a derivative for functions too rough to differentiate pointwise: we simply declare $v$ to be the derivative of $u$ if it obeys the integration-by-parts identity against every test function. When the classical derivative exists it agrees with this one, but the weak derivative also exists for functions with corners and is the precise notion of differentiability that Sobolev spaces are built on.`,
    definition: String.raw`Let $\Omega \subseteq \mathbb{R}^n$ be open and $C_c^\infty(\Omega)$ the smooth functions with compact support in $\Omega$ (the **test functions**). For $u \in L^1_{\mathrm{loc}}(\Omega)$ and a multi-index $\alpha$, a function $v \in L^1_{\mathrm{loc}}(\Omega)$ is the **weak $\alpha$-th partial derivative** of $u$, written $v = \partial^\alpha u$, if
$$\int_\Omega u\,\partial^\alpha \varphi\,dx = (-1)^{|\alpha|}\int_\Omega v\,\varphi\,dx \qquad \text{for all } \varphi \in C_c^\infty(\Omega).$$
This is exactly the integration-by-parts identity, with the boundary terms killed by the compact support of $\varphi$. When it exists the weak derivative is unique up to a null set, and it coincides with the classical derivative whenever the latter exists and is continuous. It is the restriction to ordinary functions of the more general derivative of a **tempered distribution** (where $v$ may be a measure or worse).`,
  },
  {
    id: 'weak-solution',
    label: 'Weak Solution',
    title: 'Weak Solution',
    kind: 'definition',
    tags: ['Partial Differential Equations'],
    dependencies: ['partial-differential-equation', 'weak-derivative', 'tempered-distribution'],
    description: String.raw`Demanding that a solution literally possess all the derivatives the PDE names is often the wrong demand: shocks in fluids and kinks in vibrating strings are physical solutions that fail to be differentiable. The weak formulation lowers the bar. Multiply the equation by a smooth test function, integrate over the domain, and use integration by parts to move derivatives off the unknown and onto the test function. A function satisfying the resulting integral identity for every test function is a weak solution; it need not be smooth. This is the strategy of modern PDE theory: prove a weak solution exists first, in a Hilbert or Sobolev space where compactness and duality are available, then study regularity separately to discover how smooth it actually is.`,
    definition: String.raw`A locally integrable $u$ is a **weak solution** of a PDE $L u = f$ on $\Omega$ if it satisfies the equation in the sense of integration against **test functions**: every derivative falling on $u$ is moved, via integration by parts, onto a $\varphi \in C_c^\infty(\Omega)$. For example, $u$ is a weak solution of $-\Delta u = f$ if
$$\int_\Omega \nabla u \cdot \nabla \varphi\,dx = \int_\Omega f\,\varphi\,dx \qquad \text{for all } \varphi \in C_c^\infty(\Omega),$$
the **weak (variational) form** obtained by one integration by parts. More generally a **distributional solution** requires $\langle u, L^* \varphi\rangle = \langle f, \varphi\rangle$ for the formal adjoint $L^*$. A classical $C^k$ solution is automatically a weak solution; the converse — that weak solutions are in fact smooth — is the content of **regularity** theory.`,
  },
  {
    id: 'sobolev-space',
    label: 'Sobolev Space',
    title: 'Sobolev Space',
    kind: 'definition',
    tags: ['Partial Differential Equations'],
    dependencies: ['lp-space', 'weak-derivative', 'banach-space', 'hilbert-space'],
    description: String.raw`Sobolev spaces are the function spaces in which the existence theory for PDEs is naturally carried out. A function belongs to one if it, together with its weak derivatives up to a given order, is $p$-th power integrable; the norm measures both the function and its derivatives. This packages "how rough is the function allowed to be" into a single Banach (and, when $p = 2$, Hilbert) space that is complete, so limits of approximate solutions stay inside it. The Sobolev embedding theorems are the quantitative payoff: enough weak derivatives in $L^p$ buys genuine continuity or higher integrability, which is how one recovers classical regularity from a weak solution.`,
    definition: String.raw`Let $\Omega \subseteq \mathbb{R}^n$ be open, $k \in \mathbb{N}$, and $1 \le p \le \infty$. The **Sobolev space** $W^{k,p}(\Omega)$ consists of the functions $u \in L^p(\Omega)$ all of whose **weak derivatives** $\partial^\alpha u$ with $|\alpha| \le k$ exist and lie in $L^p(\Omega)$, normed by
$$\lVert u\rVert_{W^{k,p}} = \Bigl(\sum_{|\alpha| \le k} \lVert \partial^\alpha u\rVert_{L^p}^p\Bigr)^{1/p} \quad (p < \infty), \qquad \lVert u\rVert_{W^{k,\infty}} = \max_{|\alpha| \le k}\lVert \partial^\alpha u\rVert_{L^\infty}.$$
Each $W^{k,p}(\Omega)$ is a **Banach space**, and for $p = 2$ it is a **Hilbert space** $H^k(\Omega) = W^{k,2}(\Omega)$ with inner product $\langle u, v\rangle = \sum_{|\alpha|\le k}\int_\Omega \partial^\alpha u\,\partial^\alpha v\,dx$. The closure of $C_c^\infty(\Omega)$ in this norm is $W_0^{k,p}(\Omega)$, the functions vanishing (in the trace sense) on $\partial\Omega$. For $\Omega$ bounded with Lipschitz boundary (or any extension domain) the **Sobolev embedding theorem** asserts $W^{k,p}(\Omega) \hookrightarrow C^m(\overline\Omega)$ when $k - n/p > m$, trading derivatives for continuity; the domain-regularity hypothesis is essential, as the embedding into $C^m(\overline\Omega)$ can fail for open sets with sufficiently irregular (e.g. cusped) boundaries. On the whole space the clean form is $W^{k,p}(\mathbb{R}^n) \hookrightarrow C^m(\mathbb{R}^n)$ when $k - n/p > m$.`,
  },
  {
    id: 'fundamental-solution',
    label: 'Fundamental Solution',
    title: "Fundamental Solution (Green's Function)",
    kind: 'definition',
    tags: ['Partial Differential Equations'],
    dependencies: ['laplace-equation', 'tempered-distribution', 'convolution'],
    description: String.raw`A linear differential operator with constant coefficients is completely captured by its response to a single point source. The fundamental solution is exactly that response — the (distributional) solution when the right-hand side is a Dirac delta concentrated at the origin. Because the operator commutes with translations, the response to a source spread out over space is obtained by superposing shifted copies of the point response, which is precisely convolution. So one impulse solves everything: convolving the fundamental solution with an arbitrary source $f$ produces a solution of the inhomogeneous equation. The Newtonian potential for the Laplacian and the Gaussian heat kernel are the canonical examples; on a bounded domain with boundary conditions the analogous object is the Green's function.`,
    definition: String.raw`For a constant-coefficient linear differential operator $L$ on $\mathbb{R}^n$, a **fundamental solution** is a **tempered distribution** $E$ with
$$L E = \delta_0,$$
the Dirac delta at the origin. Then for suitable sources $f$ the **convolution** $u = E * f$ solves $L u = f$, since $L(E * f) = (LE) * f = \delta_0 * f = f$. For the **Laplacian** $-\Delta$ the fundamental solution is the **Newtonian potential**
$$E(x) = \begin{cases} -\frac{1}{2\pi}\log|x|, & n = 2,\\[4pt] \frac{1}{(n-2)\,\omega_{n-1}}\,|x|^{2-n}, & n \ge 3,\end{cases}$$
with $\omega_{n-1}$ the surface area of the unit sphere. On a bounded domain $\Omega$, the **Green's function** $G(x, y)$ adds to $E$ a harmonic correction so that $G(\cdot, y)$ vanishes on $\partial\Omega$, representing solutions of the Dirichlet problem by $u(x) = \int_\Omega G(x,y) f(y)\,dy$ plus a boundary term.`,
  },
  {
    id: 'heat-kernel',
    label: 'Heat Kernel',
    title: 'Heat Kernel',
    kind: 'proposition',
    tags: ['Partial Differential Equations'],
    dependencies: ['heat-equation', 'fundamental-solution', 'convolution', 'approximate-identity'],
    description: String.raw`The heat kernel is the fundamental solution of the heat equation: the temperature profile resulting from a unit of heat deposited at a single point at the initial instant. It is the Gaussian whose width grows like the square root of time — the same Gaussian that governs the position of a Brownian particle, which is no accident. Convolving the initial data with the heat kernel solves the initial value problem on the whole space, and the smoothness of the Gaussian for every positive time is the source of the heat equation's instantaneous smoothing: even a rough or singular initial distribution becomes infinitely differentiable the moment $t > 0$.`,
    statement: String.raw`The **heat kernel** on $\mathbb{R}^n$ is
$$\Phi(x, t) = \frac{1}{(4\pi t)^{n/2}}\,e^{-|x|^2/(4t)} \qquad (x \in \mathbb{R}^n,\ t > 0).$$
It solves the **heat equation** $\Phi_t = \Delta \Phi$ for $t > 0$, has unit mass $\int_{\mathbb{R}^n}\Phi(x,t)\,dx = 1$ for every $t > 0$, and is the **fundamental solution** in the sense that $u(x, t) = (\Phi(\cdot, t) * g)(x) = \int_{\mathbb{R}^n} \Phi(x - y, t)\,g(y)\,dy$ solves the initial value problem $u_t = \Delta u$ with $u(\cdot, t) \to g$ as $t \downarrow 0$ (for $g$ bounded continuous, uniformly on compacta).`,
    proof: String.raw`*$\Phi$ solves the heat equation.* Write $\Phi = (4\pi t)^{-n/2} e^{-|x|^2/(4t)}$. Direct differentiation in $t$ gives
$$\Phi_t = \Phi\Bigl(-\frac{n}{2t} + \frac{|x|^2}{4t^2}\Bigr),$$
while in each spatial variable $\partial_{x_i}\Phi = -\frac{x_i}{2t}\Phi$ and $\partial_{x_i}^2\Phi = \bigl(\frac{x_i^2}{4t^2} - \frac{1}{2t}\bigr)\Phi$, so summing over $i$,
$$\Delta\Phi = \Bigl(\frac{|x|^2}{4t^2} - \frac{n}{2t}\Bigr)\Phi = \Phi_t.$$
*Unit mass.* Substituting $y = x/\sqrt{4t}$ reduces $\int_{\mathbb{R}^n}\Phi\,dx$ to $\pi^{-n/2}\int_{\mathbb{R}^n} e^{-|y|^2}\,dy = \pi^{-n/2}\bigl(\int_{\mathbb{R}}e^{-s^2}\,ds\bigr)^n = \pi^{-n/2}\cdot \pi^{n/2} = 1$, using the Gaussian integral $\int_{\mathbb{R}}e^{-s^2}\,ds = \sqrt{\pi}$.
*The convolution solves the IVP.* For $t > 0$, $u = \Phi(\cdot,t) * g$ is smooth and, differentiating under the integral (justified by the rapid decay of $\Phi$ and its derivatives), $u_t - \Delta u = \int (\Phi_t - \Delta\Phi)(x-y,t)\,g(y)\,dy = 0$ by the first part, so $u$ solves the **heat equation**. The family $\{\Phi(\cdot, t)\}_{t > 0}$ is an approximate identity — nonnegative, of unit mass, and concentrating at $0$ as $t \downarrow 0$ (the mass outside any ball $\{|x| > \rho\}$ tends to $0$, again by the substitution $y = x/\sqrt{4t}$) — so the standard approximate-identity estimate gives $\Phi(\cdot,t)*g \to g$ as $t\downarrow 0$, uniformly on compact sets for bounded continuous $g$. Thus $\Phi$ is the **fundamental solution** for the Cauchy problem, exhibited as a **convolution** kernel. $\square$`,
  },

  // ── Solvability of the model problems ────────────────────────────────────────
  {
    id: 'dalembert-formula',
    label: "d'Alembert's Formula",
    title: "d'Alembert's Formula",
    kind: 'theorem',
    tags: ['Partial Differential Equations'],
    dependencies: ['wave-equation', 'method-of-characteristics'],
    description: String.raw`In one spatial dimension the wave equation can be solved in complete closed form. The d'Alembertian operator factors into a forward and a backward transport operator, so every solution is the sum of a profile travelling rightward at speed $c$ and one travelling leftward at speed $c$ — the two halves of the initial disturbance walking off in opposite directions. d'Alembert's formula assembles these two profiles from the initial position and velocity. It makes the finite speed of propagation and the domain of dependence completely explicit: the solution at a point depends only on the initial data within the backward light cone, the interval of points that could have signalled to it in time.`,
    statement: String.raw`For the one-dimensional **wave equation** $u_{tt} = c^2 u_{xx}$ on $\mathbb{R} \times (0, \infty)$ with initial data $u(x, 0) = g(x) \in C^2$ and $u_t(x, 0) = h(x) \in C^1$, the unique $C^2$ solution is
$$u(x, t) = \frac{1}{2}\bigl(g(x + ct) + g(x - ct)\bigr) + \frac{1}{2c}\int_{x - ct}^{x + ct} h(s)\,ds.$$
In particular $u(x, t)$ depends only on the initial data on the interval $[x - ct, x + ct]$ (its **domain of dependence**), exhibiting propagation at finite speed $c$.`,
    proof: String.raw`Factor the operator: $\partial_{tt} - c^2\partial_{xx} = (\partial_t - c\partial_x)(\partial_t + c\partial_x)$. Introduce **characteristic** coordinates $\xi = x + ct$, $\eta = x - ct$ (the lines along which information travels, per the **method of characteristics**). By the chain rule $\partial_x = \partial_\xi + \partial_\eta$ and $\partial_t = c(\partial_\xi - \partial_\eta)$, so
$$u_{tt} - c^2 u_{xx} = -4c^2\,u_{\xi\eta}.$$
Hence the equation becomes $u_{\xi\eta} = 0$. Integrating in $\eta$ then $\xi$, the general $C^2$ solution is $u = F(\xi) + G(\eta) = F(x + ct) + G(x - ct)$ for arbitrary $C^2$ functions $F, G$ — the announced left- and right-moving waves.

Impose the initial data. At $t = 0$: $F(x) + G(x) = g(x)$, and $u_t = c F'(x+ct) - cG'(x-ct)$ gives $c\bigl(F'(x) - G'(x)\bigr) = h(x)$. Integrating the second, $F(x) - G(x) = \frac{1}{c}\int_0^x h + C$. Solving the linear system for $F, G$,
$$F(x) = \tfrac12 g(x) + \tfrac{1}{2c}\int_0^x h + \tfrac{C}{2}, \qquad G(x) = \tfrac12 g(x) - \tfrac{1}{2c}\int_0^x h - \tfrac{C}{2}.$$
Therefore
$$u(x,t) = F(x+ct) + G(x-ct) = \tfrac12\bigl(g(x+ct)+g(x-ct)\bigr) + \tfrac{1}{2c}\Bigl(\int_0^{x+ct} h - \int_0^{x-ct} h\Bigr),$$
and the difference of the two integrals is $\int_{x-ct}^{x+ct} h$. The constant $C$ cancels. This $u$ is $C^2$ (as $g \in C^2$, $h \in C^1$) and manifestly depends only on the data on $[x-ct, x+ct]$; uniqueness in the $C^2$ class follows because any $C^2$ solution must have the factored form $F(x+ct)+G(x-ct)$, whose $F, G$ are then forced by the data exactly as above. $\square$`,
  },
  {
    id: 'duhamel-principle',
    label: "Duhamel's Principle",
    title: "Duhamel's Principle",
    kind: 'proposition',
    tags: ['Partial Differential Equations'],
    dependencies: ['heat-equation', 'wave-equation', 'fundamental-theorem-of-calculus'],
    description: String.raw`Inhomogeneous evolution equations — those with a time-dependent forcing term — can be solved once the homogeneous problem is understood. Duhamel's principle treats the forcing as a continuous succession of instantaneous impulses: at each moment the source injects a small amount of initial data, which then evolves freely under the homogeneous flow for the remaining time. Superposing (integrating) these freely-evolving contributions over all the moments at which they were injected reconstructs the forced solution. It is the PDE analogue of variation of parameters for ODEs, and it reduces every inhomogeneous linear evolution problem to the homogeneous one plus an integral.`,
    statement: String.raw`Let $S(t)$ denote the solution operator of a homogeneous linear evolution equation $u_t = A u$ (so $u(t) = S(t)u_0$ solves the homogeneous problem with $u(0) = u_0$). Then the inhomogeneous problem
$$u_t = A u + f(t), \qquad u(0) = u_0$$
is solved by **Duhamel's formula**
$$u(t) = S(t)\,u_0 + \int_0^t S(t - s)\,f(s)\,ds.$$
The same construction with the appropriate two-parameter solution operator handles second-order evolution such as the **wave equation** $u_{tt} = c^2\Delta u + f$.`,
    proof: String.raw`Write $u(t) = S(t)u_0 + w(t)$ with $w(t) = \int_0^t S(t-s)f(s)\,ds$; since $S(t)u_0$ already solves the homogeneous problem with the correct initial value, it suffices to show $w$ solves $w_t = Aw + f$, $w(0) = 0$. Clearly $w(0) = \int_0^0 = 0$. Differentiate the integral in $t$ by the **fundamental theorem of calculus** (Leibniz rule), separating the contribution of the moving endpoint $s = t$ from the dependence of the integrand on $t$:
$$w_t(t) = S(t - s)f(s)\big|_{s = t} + \int_0^t \partial_t\bigl[S(t-s)f(s)\bigr]\,ds = S(0)f(t) + \int_0^t A\,S(t-s)f(s)\,ds.$$
Now $S(0) = I$, and the operator $A$ pulls out of the (convergent) integral, giving $w_t(t) = f(t) + A\int_0^t S(t-s)f(s)\,ds = f(t) + A w(t)$. Hence $u = S(t)u_0 + w$ solves $u_t = Au + f$ with $u(0) = u_0$. For the second-order **wave equation** the same argument applies with $S(t-s)$ replaced by the operator sending a forcing impulse to the free wave it generates from zero displacement and velocity $f(s)$; the endpoint term then vanishes at first order and reappears correctly at second order, yielding the time-integrated free evolution of the source. $\square$`,
  },

  // ── Qualitative and existence theory ─────────────────────────────────────────
  {
    id: 'mean-value-property',
    label: 'Mean Value Property',
    title: 'Mean Value Property of Harmonic Functions',
    kind: 'theorem',
    tags: ['Partial Differential Equations'],
    dependencies: ['laplace-equation', 'divergence-theorem', 'convolution'],
    description: String.raw`Harmonic functions have no local fluctuations to average out: the value at the centre of any ball equals the average of the values over the surrounding sphere, and over the solid ball. This averaging identity is the structural heart of harmonic function theory. It instantly implies the maximum principle (an interior value can never strictly exceed all surrounding values), smoothness (averaging is an infinitely smoothing operation), and rigidity results like Liouville's theorem. It also runs in reverse — a continuous function with the mean value property is automatically harmonic — so it can serve as an alternative definition.`,
    statement: String.raw`Let $u \in C^2(\Omega)$ be **harmonic** ($\Delta u = 0$) on an open set $\Omega \subseteq \mathbb{R}^n$. Then for every ball $\overline{B}(x, r) \subseteq \Omega$,
$$u(x) = \frac{1}{|\partial B(x,r)|}\int_{\partial B(x,r)} u\,dS = \frac{1}{|B(x,r)|}\int_{B(x,r)} u\,dy,$$
the average of $u$ over the sphere and over the ball. Conversely, a continuous $u$ satisfying the spherical mean value identity for all small balls is harmonic.`,
    proof: String.raw`Fix $x$ and define $\phi(r) = \dfrac{1}{|\partial B(x,r)|}\displaystyle\int_{\partial B(x,r)} u\,dS = \dfrac{1}{\omega_{n-1}}\displaystyle\int_{\partial B(0,1)} u(x + r\omega)\,dS(\omega)$ after rescaling to the unit sphere ($\omega_{n-1} = |\partial B(0,1)|$). Differentiating under the integral,
$$\phi'(r) = \frac{1}{\omega_{n-1}}\int_{\partial B(0,1)} \nabla u(x + r\omega)\cdot \omega\,dS(\omega) = \frac{1}{|\partial B(x,r)|}\int_{\partial B(x,r)} \frac{\partial u}{\partial n}\,dS,$$
the average outward normal derivative. By the **divergence theorem** applied to the vector field $\nabla u$ on $B(x,r)$,
$$\int_{\partial B(x,r)} \frac{\partial u}{\partial n}\,dS = \int_{B(x,r)} \operatorname{div}(\nabla u)\,dy = \int_{B(x,r)} \Delta u\,dy = 0,$$
since $u$ is **harmonic**. Hence $\phi'(r) = 0$, so $\phi$ is constant; letting $r \downarrow 0$ and using continuity of $u$ gives $\phi(r) = \lim_{r\to 0}\phi(r) = u(x)$, which is the spherical mean value identity. The solid (ball) average follows by integrating the spherical one in $r$: $\int_{B(x,r)} u\,dy = \int_0^r \bigl(\int_{\partial B(x,s)} u\,dS\bigr) ds = u(x)\int_0^r |\partial B(x,s)|\,ds = u(x)\,|B(x,r)|$.

*Converse.* Let $u$ be merely **continuous** and satisfy the spherical identity for all small balls. First, $u$ is automatically smooth. Fix a radial mollifier $\eta_\varepsilon(y) = \varepsilon^{-n}\eta(|y|/\varepsilon)$ with $\eta \in C_c^\infty$ supported in $|y| \le 1$, $\eta \ge 0$, and $\int \eta_\varepsilon = 1$. Writing the convolution in polar coordinates and using that the spherical averages of $u$ all equal $u(x)$, $(u * \eta_\varepsilon)(x) = \int_0^\varepsilon \eta_\varepsilon^{\mathrm{rad}}(s)\Bigl(\int_{\partial B(x,s)} u\,dS\Bigr)ds = u(x)\int_0^\varepsilon \eta_\varepsilon^{\mathrm{rad}}(s)\,|\partial B(0,s)|\,ds = u(x)\int \eta_\varepsilon = u(x)$, so $u = u * \eta_\varepsilon$ on the set where the convolution is defined; since $u * \eta_\varepsilon \in C^\infty$, $u$ is $C^\infty$, in particular $C^2$. Now the classical Laplacian exists, and the forward computation applies: were $\Delta u(x_0) \neq 0$ at some point, say $\Delta u > 0$ on a small ball (by continuity of $\Delta u$), then $\phi'(r) = \frac{1}{|\partial B(x_0,r)|}\int_{B(x_0,r)}\Delta u\,dy > 0$, contradicting $\phi \equiv u(x_0)$. Hence $\Delta u \equiv 0$ and $u$ is harmonic. $\square$`,
  },
  {
    id: 'maximum-principle',
    label: 'Maximum Principle',
    title: 'Maximum Principle',
    kind: 'theorem',
    tags: ['Partial Differential Equations'],
    dependencies: ['laplace-equation', 'mean-value-property', 'heat-equation'],
    description: String.raw`A solution of an elliptic or parabolic equation with no zeroth-order term cannot have an interior extremum more extreme than its boundary values — it attains its maximum and minimum on the boundary. For the Laplacian this is an immediate corollary of the mean value property: a value strictly larger than its neighbours' average is impossible, because the value equals that average. The principle reflects the physical content of diffusion — heat flows from hot to cold, so no interior point can be hotter than the hottest boundary point without a source — and it delivers, in a single stroke, uniqueness and continuous dependence (hence well-posedness) for the Dirichlet problem.`,
    statement: String.raw`**(Elliptic, weak form.)** Let $\Omega \subseteq \mathbb{R}^n$ be open, bounded, and connected, and let $u \in C^2(\Omega) \cap C(\overline\Omega)$ be **harmonic** on $\Omega$. Then $u$ attains its maximum and its minimum over $\overline\Omega$ on the boundary $\partial\Omega$:
$$\max_{\overline\Omega} u = \max_{\partial\Omega} u, \qquad \min_{\overline\Omega} u = \min_{\partial\Omega} u.$$
**(Strong form.)** If, in addition, $u$ attains an interior maximum (or minimum), then $u$ is constant. The analogous statement holds for solutions of the **heat equation**, with the extremum attained on the *parabolic* boundary (the base $t = 0$ together with the lateral boundary, excluding the final time).`,
    proof: String.raw`*Strong form.* Let $M = \max_{\overline\Omega} u$ and suppose $u(x_0) = M$ at some interior $x_0 \in \Omega$. Let $\Omega_M = \{x \in \Omega : u(x) = M\}$, which is nonempty and, by continuity, relatively closed in $\Omega$. It is also open: for any $x \in \Omega_M$, choose $r$ with $\overline{B}(x, r) \subseteq \Omega$; by the **mean value property**,
$$M = u(x) = \frac{1}{|B(x,r)|}\int_{B(x,r)} u\,dy \le M,$$
with equality forcing $u \equiv M$ on $B(x,r)$ (a continuous function $\le M$ whose average equals $M$ cannot dip below $M$ anywhere), so $B(x,r) \subseteq \Omega_M$. A nonempty subset of the connected set $\Omega$ that is both open and closed is all of $\Omega$, so $u \equiv M$: $u$ is constant.

*Weak form.* Apply the strong form: either $u$ is constant (and the conclusion is trivial), or $u$ attains no interior maximum, so its maximum over the compact $\overline\Omega$ is attained on $\partial\Omega$. The minimum follows by applying the result to $-u$, which is also harmonic.

*Parabolic case.* For the **heat equation** the same dichotomy holds with the spherical means replaced by the heat-equation mean value identity over backward heat balls; the upshot is that an interior or final-time maximum propagates back through the parabolic interior, so the extreme values occur on the parabolic boundary. (A self-contained version: for the strict subsolution $v = u - \varepsilon t$ one has $v_t - \Delta v = -\varepsilon < 0$, which cannot have an interior or final-time maximum since there $v_t \ge 0$ and $\Delta v \le 0$; letting $\varepsilon \to 0$ gives the result for $u$.) $\square$`,
  },
  {
    id: 'energy-method',
    label: 'Energy Method',
    title: 'Energy Method (Uniqueness)',
    kind: 'proposition',
    tags: ['Partial Differential Equations'],
    dependencies: ['heat-equation', 'wave-equation', 'divergence-theorem'],
    description: String.raw`Multiplying a PDE by the solution itself (or its time derivative) and integrating over the domain produces a single nonnegative quantity — an energy — whose evolution in time is controlled by the equation. For the heat equation this energy can only decrease; for the wave equation it is exactly conserved. Tracking it gives uniqueness almost for free: the difference of two solutions of the same problem has zero initial energy and an energy that cannot grow, so it must stay zero, forcing the solutions to coincide. The energy method is the most robust route to uniqueness and stability, applying far beyond the cases where explicit solution formulas exist.`,
    statement: String.raw`Let $\Omega \subseteq \mathbb{R}^n$ be bounded with smooth boundary. **(Heat.)** The initial–boundary value problem $u_t = \Delta u$ on $\Omega \times (0, T]$, $u = g$ on $\partial\Omega$, $u(\cdot, 0) = \phi$, has at most one solution in $C^2$. **(Wave.)** The problem $u_{tt} = c^2\Delta u$ with prescribed boundary values and initial data $u(\cdot,0), u_t(\cdot,0)$ has at most one $C^2$ solution, and for the homogeneous Dirichlet problem the energy $E(t) = \tfrac12\int_\Omega\bigl(u_t^2 + c^2|\nabla u|^2\bigr)\,dx$ is constant in time.`,
    proof: String.raw`*Heat.* Let $u_1, u_2$ solve the same problem and set $w = u_1 - u_2$, so $w_t = \Delta w$ on $\Omega\times(0,T]$, $w = 0$ on $\partial\Omega$, $w(\cdot,0) = 0$. Define $E(t) = \tfrac12\int_\Omega w(x,t)^2\,dx \ge 0$. Then, using the equation and Green's first identity $\int_\Omega w\,\Delta w = -\int_\Omega|\nabla w|^2 + \int_{\partial\Omega} w\,\partial_n w$ (integration by parts, itself a consequence of the **divergence theorem** applied to $w\nabla w$), with the boundary term killed by $w|_{\partial\Omega} = 0$,
$$E'(t) = \int_\Omega w\,w_t\,dx = \int_\Omega w\,\Delta w\,dx = -\int_\Omega |\nabla w|^2\,dx \le 0.$$
So $E$ is nonincreasing; since $E(0) = \tfrac12\int_\Omega w(\cdot,0)^2 = 0$ and $E \ge 0$, we get $E(t) = 0$ for all $t$, hence $w \equiv 0$ and $u_1 = u_2$.

*Wave.* For a $C^2$ solution $u$ of the homogeneous Dirichlet problem, differentiate the energy and integrate by parts via the **divergence theorem** (the boundary term $\int_{\partial\Omega} u_t\,\partial_n u$ vanishes since $u_t = 0$ on $\partial\Omega$):
$$E'(t) = \int_\Omega \bigl(u_t u_{tt} + c^2\nabla u\cdot\nabla u_t\bigr)\,dx = \int_\Omega u_t\bigl(u_{tt} - c^2\Delta u\bigr)\,dx = 0,$$
so $E(t) \equiv E(0)$: energy is **conserved**. For uniqueness let $w = u_1 - u_2$ solve the homogeneous problem with zero initial data; then its energy is constant and equals $E(0) = 0$, so $\int_\Omega(w_t^2 + c^2|\nabla w|^2)\,dx = 0$ for all $t$, forcing $w_t \equiv 0$ and $\nabla w \equiv 0$; thus $w$ is constant in space and time, and being zero initially, $w \equiv 0$. $\square$`,
  },
  {
    id: 'lax-milgram',
    label: 'Lax–Milgram',
    title: 'Lax–Milgram Theorem',
    kind: 'theorem',
    tags: ['Partial Differential Equations'],
    dependencies: ['weak-solution', 'sobolev-space', 'hilbert-space', 'riesz-representation-hilbert', 'orthogonal-projection'],
    description: String.raw`Lax–Milgram is the abstract existence engine behind the variational approach to elliptic PDEs. A weak formulation expresses "solve $Lu = f$" as "find $u$ in a Hilbert space such that $a(u, v) = \ell(v)$ for all test directions $v$," where $a$ is a bilinear form built from the equation and $\ell$ a linear functional built from the data. Lax–Milgram guarantees a unique such $u$ provided $a$ is bounded and coercive — coercivity being the abstract counterpart of the equation's ellipticity. It is essentially the Riesz representation theorem freed from the assumption of symmetry, and applied in a Sobolev space it produces weak solutions of elliptic boundary value problems with almost no further work.`,
    statement: String.raw`Let $H$ be a real **Hilbert space** and $a : H \times H \to \mathbb{R}$ a bilinear form that is **bounded** ($|a(u,v)| \le C\lVert u\rVert\lVert v\rVert$) and **coercive** ($a(u, u) \ge \alpha\lVert u\rVert^2$ for some $\alpha > 0$). Then for every bounded linear functional $\ell \in H^*$ there is a unique $u \in H$ with
$$a(u, v) = \ell(v) \qquad \text{for all } v \in H,$$
and $\lVert u\rVert \le \alpha^{-1}\lVert \ell\rVert$. Consequently the **weak (variational) problem** for a coercive elliptic operator has a unique **weak solution** in the **Sobolev space** $H_0^1(\Omega)$.`,
    proof: String.raw`For each fixed $u$, the map $v \mapsto a(u, v)$ is a bounded linear functional on $H$, so by the **Riesz representation theorem** there is a unique $Au \in H$ with $a(u, v) = \langle Au, v\rangle$ for all $v$; $A : H \to H$ is linear and bounded ($\lVert Au\rVert \le C\lVert u\rVert$). Likewise $\ell(v) = \langle z, v\rangle$ for a unique $z \in H$. The equation $a(u,v) = \ell(v)$ for all $v$ is therefore equivalent to the single equation $Au = z$, so it suffices to show $A$ is a bijection of $H$.

*$A$ is injective with closed range.* Coercivity gives $\alpha\lVert u\rVert^2 \le a(u,u) = \langle Au, u\rangle \le \lVert Au\rVert\lVert u\rVert$, so $\lVert Au\rVert \ge \alpha\lVert u\rVert$. Hence $A$ is injective, and it has closed range: if $Au_n \to y$ then $(u_n)$ is Cauchy (as $\lVert u_n - u_m\rVert \le \alpha^{-1}\lVert Au_n - Au_m\rVert$), so $u_n \to u$ in the complete space $H$ and $y = Au$.

*$A$ is surjective.* Let $R = A(H)$, a closed subspace. If $R \neq H$ then $R^\perp \neq \{0\}$ (orthogonal decomposition in a Hilbert space); take $0 \neq w \in R^\perp$. Then $\alpha\lVert w\rVert^2 \le a(w,w) = \langle Aw, w\rangle = 0$ since $Aw \in R \perp w$, forcing $w = 0$, a contradiction. So $R = H$ and $A$ is onto.

Thus $A$ is a bounded linear bijection; $u = A^{-1}z$ is the unique solution, and $\alpha\lVert u\rVert^2 \le a(u,u) = \ell(u) \le \lVert\ell\rVert\lVert u\rVert$ gives $\lVert u\rVert \le \alpha^{-1}\lVert\ell\rVert$. Applied to $H = H_0^1(\Omega)$ with $a(u,v) = \int_\Omega \nabla u\cdot\nabla v$ (coercive there by the **Poincaré inequality**, an external input not separately nodal here) and $\ell(v) = \int_\Omega f v$, this yields a unique **weak solution** of $-\Delta u = f$ with zero Dirichlet data. $\square$`,
  },
]

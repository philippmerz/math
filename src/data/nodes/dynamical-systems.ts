import type { MathNode } from '../types'

export const DYNAMICAL_SYSTEMS_NODES: MathNode[] = [
  // ── Basic objects ──────────────────────────────────────────────────────────
  {
    id: 'dynamical-system',
    label: 'Dynamical System',
    title: 'Dynamical System',
    kind: 'definition',
    tags: ['Dynamical Systems'],
    dependencies: ['function'],
    description: String.raw`A dynamical system is a space of states together with a rule for how they evolve in time. The subject was born from celestial mechanics — Newton's equations determine a planet's future exactly, yet the long-run behavior of three or more bodies resists closed-form solution. Poincaré's response reframed the question: instead of solving for trajectories explicitly, study the *qualitative* structure of the family of all trajectories — which states are fixed, which recur, which scatter, what the system settles into as time runs to infinity. Time may be discrete (iterate a map) or continuous (flow along a differential equation), and the two pictures translate into one another.`,
    definition: String.raw`A **discrete-time dynamical system** is a set $X$ (the **state space** or **phase space**) together with a map $T : X \to X$; the dynamics is the iteration $T^n = T \circ \cdots \circ T$ ($n$ times), with $T^0 = \mathrm{id}$. A **continuous-time dynamical system** (a **flow**) is a family of maps $\varphi_t : X \to X$ for $t \in \mathbb{R}$ (or $t \ge 0$) satisfying the group law $\varphi_0 = \mathrm{id}$ and $\varphi_{s+t} = \varphi_s \circ \varphi_t$; it typically arises as the solution operator of an autonomous differential equation $\dot x = f(x)$, with $\varphi_t(x)$ the state at time $t$ started from $x$. Sampling a flow at unit times, $T = \varphi_1$, recovers a discrete system, so the two settings are tightly linked.`,
  },
  {
    id: 'orbit',
    label: 'Orbit',
    title: 'Orbit',
    kind: 'definition',
    tags: ['Dynamical Systems'],
    dependencies: ['dynamical-system'],
    description: String.raw`The orbit of a point is the trajectory it traces under the dynamics — the complete record of where it goes. Organizing the state space into its orbits, and describing how they sit together (which are periodic, which are dense, which converge where), is the central descriptive task of dynamics: the phase portrait. An invariant set is one that orbits cannot leave, so it is a union of whole orbits and a natural unit of analysis.`,
    definition: String.raw`For a map $T : X \to X$, the **forward orbit** of $x \in X$ is the sequence $\mathcal{O}^+(x) = \{\,T^n(x) : n \ge 0\,\} = x, T(x), T^2(x), \dots$; if $T$ is invertible the **full orbit** also includes the backward iterates $T^{-n}(x)$. For a flow $\varphi_t$, the orbit of $x$ is the curve $\{\,\varphi_t(x) : t \in \mathbb{R}\,\}$. A set $A \subseteq X$ is **(forward) invariant** if $T(A) \subseteq A$ (resp. $\varphi_t(A) \subseteq A$ for all $t$), so it is a union of orbits; the **forward** orbit $\mathcal{O}^+(x)$ is the smallest forward-invariant set containing $x$, while for an invertible map or a flow the full orbit is the smallest **fully invariant** set (invariant under the dynamics run in both time directions) containing $x$.`,
  },
  {
    id: 'fixed-point-and-periodic-orbit',
    label: 'Fixed & Periodic Points',
    title: 'Fixed Points & Periodic Orbits',
    kind: 'definition',
    tags: ['Dynamical Systems'],
    dependencies: ['orbit'],
    description: String.raw`The simplest orbits are those that do not move (fixed points, the equilibria of the system) and those that repeat after finitely many steps (periodic orbits, the cycles). These are the skeleton of the phase portrait: other orbits wind toward them, away from them, or between them, so locating fixed and periodic points and analyzing their behavior is the first concrete step in studying any system. A period-$n$ point of $T$ is exactly a fixed point of $T^n$, which is how the search for cycles reduces to the search for equilibria.`,
    definition: String.raw`A **fixed point** of a map $T : X \to X$ is a point with $T(x) = x$. A point $x$ is **periodic** with period $n \ge 1$ if $T^n(x) = x$; the least such $n$ is its **prime period**, and the set $\{\,x, T(x), \dots, T^{n-1}(x)\,\}$ is its **periodic orbit** (a cycle of $n$ distinct points when $n$ is prime period). A periodic point of $T$ is precisely a fixed point of the iterate $T^n$. For a flow $\varphi_t$, an **equilibrium** satisfies $\varphi_t(x) = x$ for all $t$ (equivalently $f(x) = 0$ when $\dot x = f(x)$), and a **periodic orbit** is a non-equilibrium with $\varphi_{\tau}(x) = x$ for some minimal period $\tau > 0$.`,
  },
  {
    id: 'stability',
    label: 'Stability',
    title: 'Stability',
    kind: 'definition',
    tags: ['Dynamical Systems'],
    dependencies: ['fixed-point-and-periodic-orbit', 'metric-space', 'eigenvalue-eigenvector', 'derivative'],
    description: String.raw`An equilibrium is only physically meaningful if it persists under small disturbances — a pencil balanced on its tip is an equilibrium, but not a stable one. Stability formalizes "small perturbations stay small," and asymptotic stability adds "and decay away." The decisive practical test is linearization: near a fixed point the dynamics is governed to first order by the derivative there, and the equilibrium inherits the stability of that linear map — eigenvalues inside the unit circle for a map, in the open left half-plane for a flow (the Hartman–Grobman theorem makes this rigorous away from the borderline cases). When linearization is inconclusive or unavailable, one seeks a Lyapunov function: an "energy" that strictly decreases along orbits, certifying that they funnel into the equilibrium.`,
    definition: String.raw`Let $x^*$ be a fixed point of $T : X \to X$ on a metric space $(X, d)$. It is **Lyapunov stable** if for every $\varepsilon > 0$ there is $\delta > 0$ such that $d(x, x^*) < \delta$ implies $d(T^n x, x^*) < \varepsilon$ for all $n \ge 0$. It is **asymptotically stable** if, in addition, there is $\delta_0 > 0$ with $d(x, x^*) < \delta_0 \Rightarrow T^n x \to x^*$. The **linearization** at $x^*$ (for $X \subseteq \mathbb{R}^d$, $T$ differentiable) is the matrix $DT(x^*)$ of partial **derivatives**; $x^*$ is **hyperbolic** if no **eigenvalue** of $DT(x^*)$ has modulus $1$, and a hyperbolic fixed point is asymptotically stable exactly when every eigenvalue satisfies $|\lambda| < 1$ (a **sink**). A **Lyapunov function** near $x^*$ is a continuous $V \ge 0$ with $V(x^*) = 0$, $V > 0$ elsewhere, and $V(Tx) \le V(x)$ (strictly, for asymptotic stability) on a neighborhood; its existence implies stability. (For a flow $\dot x = f(x)$ the analogue replaces $|\lambda| < 1$ by $\operatorname{Re}\lambda < 0$ for the eigenvalues of $Df(x^*)$, and $V(Tx) \le V(x)$ by $\dot V = \nabla V \cdot f \le 0$.)`,
  },
  {
    id: 'bifurcation',
    label: 'Bifurcation',
    title: 'Bifurcation',
    kind: 'definition',
    tags: ['Dynamical Systems'],
    dependencies: ['stability'],
    description: String.raw`Real systems carry parameters — a growth rate, a forcing amplitude, a temperature — and as a parameter varies the qualitative structure of the dynamics is usually stable, but at isolated critical values it reorganizes abruptly. A bifurcation is such a qualitative change: equilibria are created or destroyed in pairs (saddle-node), exchange stability (transcritical, pitchfork), or shed a small periodic orbit as a fixed point loses stability (Hopf). The period-doubling bifurcation, repeated in an accelerating cascade with Feigenbaum's universal ratio, is one of the canonical routes by which a system passes from orderly to chaotic behavior. Bifurcation theory classifies these transitions by the way eigenvalues of the linearization cross the stability boundary.`,
    definition: String.raw`Consider a family of maps $T_\mu : X \to X$ depending on a parameter $\mu \in \mathbb{R}^k$. A **bifurcation** occurs at $\mu = \mu_0$ if the topological structure of the phase portrait of $T_\mu$ changes as $\mu$ crosses $\mu_0$ — i.e. $T_\mu$ for $\mu$ near $\mu_0$ is not, for all nearby $\mu$, topologically conjugate to $T_{\mu_0}$. Local bifurcations are organized by how an eigenvalue of the linearization $DT_{\mu}(x^*_\mu)$ at a fixed point crosses the unit circle: a real eigenvalue passing through $+1$ gives **saddle-node / transcritical / pitchfork** bifurcations, through $-1$ a **period-doubling** bifurcation, and a complex-conjugate pair crossing the unit circle gives a **Neimark–Sacker** bifurcation, where an invariant circle (carrying generically quasi-periodic motion) is born. For a flow $\dot x = f_\mu(x)$ the analogue uses eigenvalues of $Df_\mu(x^*_\mu)$ crossing the imaginary axis: a real eigenvalue through $0$ again gives saddle-node / transcritical / pitchfork, and a complex-conjugate pair through the imaginary axis gives a **Hopf** bifurcation, where a periodic orbit (limit cycle) is born.`,
  },
  {
    id: 'attractor',
    label: 'Attractor',
    title: 'Attractor',
    kind: 'definition',
    tags: ['Dynamical Systems'],
    dependencies: ['orbit', 'stability', 'metric-space'],
    description: String.raw`After transients die away, a dissipative system settles onto a small set in phase space — the attractor — that captures its eventual behavior. The defining demands are that the set be invariant, that it draw in every nearby orbit (its basin of attraction), and that it be minimal, so it cannot be split into smaller attracting pieces; minimality is what excludes, say, the union of two distinct sinks from counting as one attractor. The simplest attractors are an asymptotically stable equilibrium (a point) and a limit cycle (a closed loop), but the deep surprise of the subject is the strange attractor — a set of fractal geometry, like the Lorenz attractor, onto which the dynamics is chaotic, reconciling "the system settles down" with "the system is unpredictable."`,
    definition: String.raw`Let $T : X \to X$ (or a flow $\varphi_t$) be continuous on a metric space. A closed invariant set $A \subseteq X$ is an **attractor** if it is (i) **attracting**: there is an open neighborhood $U \supseteq A$ (its **basin** is $\bigcup_{n \ge 0} T^{-n}(U)$) such that for all $x \in U$ the orbit's distance to $A$ tends to $0$, $d(T^n x, A) \to 0$; and (ii) **minimal** with respect to (i): no proper closed nonempty invariant subset of $A$ is itself attracting (the intended indecomposability is often strengthened to **chain transitivity** of $T|_A$, or to $A$ being the omega-limit set of one of its points; this is genuinely stronger than mere absence of a proper attracting subset, and is not the same as topological transitivity — an attracting heteroclinic cycle has no proper attracting invariant subset yet carries no dense orbit). An asymptotically **stable** fixed point and a stable **periodic orbit** (limit cycle) are attractors; an attractor with fractal structure on which $T|_A$ is chaotic is a **strange attractor**.`,
  },

  // ── Chaos ──────────────────────────────────────────────────────────────────
  {
    id: 'chaos',
    label: 'Chaos',
    title: 'Chaos',
    kind: 'definition',
    tags: ['Dynamical Systems'],
    dependencies: ['orbit', 'metric-space'],
    description: String.raw`Chaos is the discovery that deterministic laws can produce effectively unpredictable behavior. The mechanism is sensitive dependence on initial conditions: two states starting imperceptibly apart separate at an exponential rate, so any uncertainty in the initial data — and there is always some — is amplified until prediction fails. This is Lorenz's butterfly effect. Sensitivity alone is not enough (a simple expansion $x \mapsto 2x$ is sensitive but boring); the chaos one cares about combines sensitivity with recurrence, captured by Devaney's definition as the conjunction of sensitive dependence, a dense set of periodic orbits, and topological transitivity (one orbit visits everywhere). The result is a fully determined system that is, for all practical and statistical purposes, random.`,
    definition: String.raw`Let $T : X \to X$ be continuous on a metric space $(X, d)$ with no isolated points. $T$ has **sensitive dependence on initial conditions** if there is $\delta > 0$ such that for every $x$ and every neighborhood $U$ of $x$ there exist $y \in U$ and $n \ge 0$ with $d(T^n x, T^n y) > \delta$ — nearby points are eventually driven a definite distance apart. $T$ is **topologically transitive** if for every pair of nonempty open sets $U, V$ some iterate satisfies $T^n(U) \cap V \neq \varnothing$ (when $X$ is a complete separable metric space with no isolated points this is equivalent, by the Birkhoff transitivity theorem, to the existence of a dense orbit). $T$ is **chaotic in the sense of Devaney** if it is topologically transitive, its periodic points are dense in $X$, and it has sensitive dependence — and a theorem of Banks et al. shows the first two conditions already *imply* the third.`,
  },
  {
    id: 'lyapunov-exponent',
    label: 'Lyapunov Exponent',
    title: 'Lyapunov Exponent',
    kind: 'definition',
    tags: ['Dynamical Systems'],
    dependencies: ['chaos', 'derivative', 'eigenvalue-eigenvector'],
    description: String.raw`Where chaos says nearby orbits separate, the Lyapunov exponent measures how fast: it is the average exponential rate of separation along an orbit. A positive largest exponent is the sharp quantitative signature of chaos, and its reciprocal — the Lyapunov time — sets the horizon beyond which prediction is hopeless (a few days for weather, millions of years for the solar system). The full spectrum of exponents, one per phase-space direction, records the local rates of stretching and contracting; their sum controls how volumes evolve, and Pesin's theory ties the sum of the *positive* exponents to the Kolmogorov–Sinai entropy, the rate at which the system generates new, unpredictable information.`,
    definition: String.raw`For a differentiable map $T : \mathbb{R}^d \to \mathbb{R}^d$ and a point $x$, let $D_x T^n = DT(T^{n-1}x)\cdots DT(x)$ be the **derivative** (Jacobian) of the $n$-th iterate along the orbit. The **Lyapunov exponent** in a direction $v \neq 0$ is
$$\lambda(x, v) = \lim_{n \to \infty} \frac{1}{n} \log \frac{\lVert D_x T^n\, v\rVert}{\lVert v\rVert},$$
when the limit exists; it measures the exponential rate $\lVert \delta_n\rVert \approx \lVert\delta_0\rVert\, e^{\lambda n}$ at which an infinitesimal perturbation $\delta_0 = v$ grows. The values taken by $v \mapsto \lambda(x,v)$, listed with multiplicities (each repeated as many times as the dimension of the Oseledets subspace realizing it), form the **Lyapunov spectrum** $\lambda_1 \ge \cdots \ge \lambda_d$ (the logarithms of the asymptotic singular values of $D_x T^n$, i.e. the limits $\tfrac1n\log$ of the **eigenvalues**' square roots of $(D_x T^n)^\top D_x T^n$); the number of *distinct* exponents is at most $d$ and can be strictly less; the **Oseledets multiplicative ergodic theorem** guarantees these limits exist almost everywhere in a measure-preserving system. A **positive** largest exponent $\lambda_1 > 0$ is the hallmark of chaos, and $1/\lambda_1$ is the **Lyapunov time**.`,
  },

  // ── Ergodic theory ─────────────────────────────────────────────────────────
  {
    id: 'measure-preserving-system',
    label: 'Measure-Preserving System',
    title: 'Measure-Preserving System',
    kind: 'definition',
    tags: ['Dynamical Systems'],
    dependencies: ['dynamical-system', 'measure', 'measurable-function'],
    description: String.raw`When a dynamical system carries a probability distribution that the dynamics leaves unchanged, time evolution becomes a measure-preserving transformation and the full power of measure theory and probability comes to bear. Such invariant measures are abundant: Hamiltonian mechanics preserves phase-space volume (Liouville's theorem), and any continuous map of a compact space has at least one invariant probability measure (the Krylov–Bogolyubov theorem). This is the setting of ergodic theory, where one studies not individual orbits but the statistical behavior of typical orbits — and where dynamics meets probability and statistical mechanics.`,
    definition: String.raw`A **measure-preserving system** is a quadruple $(X, \mathcal{B}, \mu, T)$ where $(X, \mathcal{B}, \mu)$ is a probability space (a **measure** $\mu$ with $\mu(X) = 1$ on a $\sigma$-algebra $\mathcal{B}$) and $T : X \to X$ is a **measurable** map that **preserves** $\mu$:
$$\mu(T^{-1} A) = \mu(A) \quad \text{for all } A \in \mathcal{B}.$$
Equivalently (for $T$ measurable), $\mu$ is **$T$-invariant**: the pushforward $T_*\mu = \mu$. The preimage form $T^{-1}A$ is used because it behaves well even when $T$ is non-invertible. A continuous-time analogue requires $\mu(\varphi_t^{-1}A) = \mu(A)$ for every $t$.`,
  },
  {
    id: 'poincare-recurrence',
    label: 'Poincaré Recurrence',
    title: 'Poincaré Recurrence Theorem',
    kind: 'theorem',
    tags: ['Dynamical Systems'],
    dependencies: ['measure-preserving-system'],
    description: String.raw`A bounded measure-preserving system cannot wander off forever: almost every starting point must, infinitely often, return arbitrarily close to where it began. The reason is a pigeonhole argument in measure — if a positive-measure set never returned to itself, its disjoint preimages would consume more than the total measure available. This innocuous-looking result has a startling consequence for statistical mechanics: an isolated mechanical system, evolving by volume-preserving Hamiltonian flow in a bounded energy shell, must eventually revisit (to any prescribed accuracy) any configuration it has ever passed through — including, in principle, a markedly more ordered one. Reconciling this recurrence with the thermodynamic arrow of time (Zermelo's objection to Boltzmann) is resolved by the astronomically long recurrence times for macroscopic systems.`,
    statement: String.raw`Let $(X, \mathcal{B}, \mu, T)$ be a measure-preserving system with $\mu(X) = 1$. For any measurable set $A$ with $\mu(A) > 0$, almost every point of $A$ returns to $A$: the set of $x \in A$ with $T^n(x) \in A$ for some $n \ge 1$ has full measure in $A$. In fact almost every point of $A$ returns to $A$ **infinitely often**.`,
    proof: String.raw`Let $A$ have $\mu(A) > 0$ and let $N = \{\,x \in A : T^n(x) \notin A \text{ for all } n \ge 1\,\}$ be the set of points of $A$ that never return. Then $N$ is measurable, and by definition no point of $N$ ever re-enters $A$ — in particular no point of $N$ enters $N$ — so the sets
$$N,\ T^{-1}N,\ T^{-2}N,\ \dots$$
are pairwise disjoint: if $x \in T^{-i}N \cap T^{-j}N$ with $i < j$, then $T^i x \in N$ and $T^{j} x = T^{\,j-i}(T^i x) \in N \subseteq A$, contradicting that the point $T^i x \in N$ never returns to $A$. By **measure-preservation** every preimage has the same measure, $\mu(T^{-k}N) = \mu(N)$. Disjointness and countable additivity of $\mu$ then give
$$\sum_{k=0}^{\infty} \mu(N) = \sum_{k=0}^{\infty}\mu(T^{-k}N) = \mu\!\Bigl(\bigcup_{k \ge 0} T^{-k}N\Bigr) \le \mu(X) = 1.$$
A sum of infinitely many copies of $\mu(N)$ can be finite only if $\mu(N) = 0$. Hence almost every point of $A$ returns to $A$ at least once.

For infinitely many returns, reuse the same set $N$ directly. A point $x \in A$ returns to $A$ only finitely often iff it has a last return: there is a smallest time $k \ge 0$ (with $k = 0$ allowed, meaning $x$ itself never returns) such that $T^k x \in A$ but $T^n(T^k x) \notin A$ for all $n \ge 1$, i.e. $T^k x \in N$. Hence the set of points of $A$ returning only finitely often is contained in $\bigcup_{k \ge 0} T^{-k}N$, and by **measure-preservation**
$$\mu\!\Bigl(\bigcup_{k \ge 0} T^{-k}N\Bigr) \le \sum_{k \ge 0}\mu(T^{-k}N) = \sum_{k \ge 0}\mu(N) = 0.$$
Therefore $\mu(\{\,x \in A : T^n x \in A \text{ for infinitely many } n\,\}) = \mu(A)$. $\square$`,
  },
  {
    id: 'ergodicity',
    label: 'Ergodicity',
    title: 'Ergodicity',
    kind: 'definition',
    tags: ['Dynamical Systems'],
    dependencies: ['measure-preserving-system'],
    description: String.raw`Ergodicity is the indecomposability of a measure-preserving system: it cannot be split into two invariant pieces of positive measure, so the dynamics genuinely mixes the whole space rather than staying confined to a smaller invariant region. The physical content is Boltzmann's ergodic hypothesis — that a single typical orbit, given enough time, samples the entire energy surface in due statistical proportion, so that time averages may be replaced by phase-space averages. Equivalently, ergodicity says the system has no nonconstant conserved quantity beyond the invariant measure itself: any measurable function constant along orbits must be constant almost everywhere. It is the hypothesis under which Birkhoff's theorem delivers "time average = space average."`,
    definition: String.raw`A measure-preserving system $(X, \mathcal{B}, \mu, T)$ is **ergodic** if every $T$-**invariant** measurable set is trivial: whenever $T^{-1}A = A$ (up to a $\mu$-null set), one has $\mu(A) \in \{0, 1\}$. Equivalently, every $T$-invariant measurable function is constant almost everywhere: if $f \circ T = f$ ($\mu$-a.e.) then $f$ is constant a.e. (The equivalence: a nontrivial invariant set gives the nonconstant invariant indicator $\mathbf{1}_A$; conversely a nonconstant invariant $f$ has some level set $\{f > c\}$ of measure strictly between $0$ and $1$, and it is invariant.)`,
  },
  {
    id: 'maximal-ergodic-theorem',
    label: 'Maximal Ergodic Theorem',
    title: 'Maximal Ergodic Theorem',
    kind: 'lemma',
    tags: ['Dynamical Systems'],
    dependencies: ['measure-preserving-system', 'lebesgue-integral', 'dominated-convergence-theorem'],
    description: String.raw`This is the combinatorial heart of the pointwise ergodic theorem — the one nontrivial inequality from which Birkhoff's result is squeezed out by routine measure theory. It controls the integral of a function over the set where *some* partial average of its Birkhoff sums is positive: that integral cannot be negative. Garsia's proof is a clean, self-contained telescoping argument on the running maxima of the partial sums, requiring no machinery beyond measure-preservation and linearity of the integral. From it one derives the dominated control needed to pass to the limit and pin the time average down almost everywhere.`,
    statement: String.raw`Let $(X, \mathcal{B}, \mu, T)$ be a measure-preserving system and $f \in L^1(\mu)$ real-valued. Set $S_0 = 0$ and $S_n = f + f\circ T + \cdots + f\circ T^{n-1}$ for $n \ge 1$, and let
$$E = \Bigl\{\, x \in X : \sup_{n \ge 1} S_n(x) > 0 \,\Bigr\}$$
be the set where some partial Birkhoff sum is positive. Then $\displaystyle \int_E f\,d\mu \ge 0$.`,
    proof: String.raw`(Garsia.) Put $M_N = \max(0, S_1, S_2, \dots, S_N)$ for $N \ge 1$, a measurable function with $M_N \ge 0$, and let $E_N = \{\,M_N > 0\,\} = \{\,\max_{1 \le n \le N} S_n > 0\,\}$, so that $E_N \uparrow E$.

For $1 \le n \le N$ we have $M_N \circ T \ge S_n \circ T$, and since $S_{n+1} = f + S_n \circ T$,
$$f + M_N \circ T \ge f + S_n \circ T = S_{n+1}.$$
Also $f + M_N\circ T \ge f + 0 = S_1$ (taking the $0$-term of $M_N\circ T$). Hence $f + M_N \circ T \ge \max(S_1, \dots, S_N) \ge \max(0, S_1, \dots, S_N) - \, [\text{the } 0]$. More precisely, on $E_N$ the maximum $\max(0,S_1,\dots,S_N)$ equals $\max(S_1,\dots,S_N) = M_N$, so there
$$f \ge M_N - M_N \circ T.$$
Therefore
$$\int_{E_N} f\,d\mu \ \ge\ \int_{E_N} \bigl(M_N - M_N\circ T\bigr)\,d\mu.$$
Now $M_N = 0$ off $E_N$, so $\int_{E_N} M_N\,d\mu = \int_X M_N\,d\mu$. Meanwhile $M_N \circ T \ge 0$ everywhere, so $\int_{E_N} M_N\circ T\,d\mu \le \int_X M_N\circ T\,d\mu$, and by **measure-preservation** (change of variables under the $\mu$-preserving $T$) $\int_X M_N\circ T\,d\mu = \int_X M_N\,d\mu$. Combining,
$$\int_{E_N} f\,d\mu \ \ge\ \int_X M_N\,d\mu - \int_X M_N\circ T\,d\mu \ =\ \int_X M_N\,d\mu - \int_X M_N\,d\mu \ =\ 0.$$
Since $f \in L^1$ and $E_N \uparrow E$, dominated convergence (the integrands $f\,\mathbf{1}_{E_N}$ are dominated by $|f| \in L^1$) gives $\int_E f\,d\mu = \lim_N \int_{E_N} f\,d\mu \ge 0$. $\square$`,
  },
  {
    id: 'birkhoff-ergodic-theorem',
    label: 'Birkhoff Ergodic Theorem',
    title: 'Birkhoff Pointwise Ergodic Theorem',
    kind: 'theorem',
    tags: ['Dynamical Systems'],
    dependencies: ['ergodicity', 'maximal-ergodic-theorem', 'lebesgue-integral', 'conditional-expectation', 'law-of-large-numbers', 'fatous-lemma', 'dominated-convergence-theorem'],
    description: String.raw`This is the theorem that turns dynamics into statistics. It asserts that the time average of an observable along almost every individual orbit actually converges, and — when the system is ergodic — converges to the single number given by the space average, the integral of the observable. "The fraction of time a typical orbit spends in a region equals the measure of that region": this is exactly the ergodic hypothesis that statistical mechanics needs to justify replacing intractable time averages over a trajectory with computable phase-space averages. It is also a sweeping strengthening of the strong law of large numbers, which is the special case of independent coordinates under the shift map. The proof's only hard input is the maximal ergodic inequality; everything else is bookkeeping with invariant functions.`,
    statement: String.raw`Let $(X, \mathcal{B}, \mu, T)$ be a measure-preserving system and $f \in L^1(\mu)$. Then the **time averages** converge for $\mu$-almost every $x$,
$$\bar f(x) := \lim_{n \to \infty} \frac{1}{n}\sum_{k=0}^{n-1} f(T^k x),$$
the limit $\bar f$ is $T$-invariant and lies in $L^1$ with $\int \bar f\,d\mu = \int f\,d\mu$, and in general $\bar f = \mathbb{E}[f \mid \mathcal{I}]$ is the **conditional expectation** onto the $\sigma$-algebra $\mathcal{I}$ of invariant sets. If moreover $T$ is **ergodic**, then $\bar f$ is constant a.e. and equals the **space average**:
$$\lim_{n \to \infty}\frac{1}{n}\sum_{k=0}^{n-1} f(T^k x) = \int_X f\,d\mu \qquad \text{for } \mu\text{-a.e. } x.$$`,
    proof: String.raw`Write $A_n f = \tfrac1n\sum_{k=0}^{n-1} f\circ T^k$. Set $\overline{f}^* = \limsup_n A_n f$ and $\underline{f}_* = \liminf_n A_n f$; both are $T$-invariant, since $A_n f(Tx)$ and $A_n f(x)$ differ by $\tfrac1n(f(T^n x) - f(x)) \to 0$ (using that $f$, hence $f \circ T^n$, is finite a.e.). Trivially $\underline{f}_* \le \overline{f}^*$ pointwise; the crux is the reverse inequality almost everywhere.

*Almost-everywhere convergence.* Fix two rationals $a > b$ and form the $T$-invariant set $E = E_{a,b} = \{\,\underline{f}_* < b\,\} \cap \{\,\overline{f}^* > a\,\}$ (invariant as an intersection of invariant level sets). We show $\mu(E) = 0$. Working in the measure-preserving system obtained by restricting $T$ to the $T$-invariant set $E$: at every point of $E$ we have $\overline{f}^* > a$, i.e. $A_n f > a$ for infinitely many $n$, so $S_n\bigl((f-a)\mathbf{1}_E\bigr) = \sum_{k<n}(f-a)\circ T^k > 0$ for some $n$, whence the maximal set of $(f-a)\mathbf{1}_E$ is all of $E$. The **maximal ergodic theorem** gives $\int_E (f-a)\,d\mu \ge 0$, i.e.
$$\int_E f\,d\mu \ge a\,\mu(E).$$
Symmetrically, on $E$ we have $\underline{f}_* < b$, so $A_n(b-f) > 0$ infinitely often; applying the maximal ergodic theorem to $(b-f)\mathbf{1}_E$ gives $\int_E (b-f)\,d\mu \ge 0$, i.e. $\int_E f\,d\mu \le b\,\mu(E)$. Combining, $a\,\mu(E) \le \int_E f\,d\mu \le b\,\mu(E)$; since $a > b$ this forces $\mu(E) = 0$. Taking the countable union over all rational pairs $a > b$, the set $\{\underline{f}_* < \overline{f}^*\}$ is null, so $\overline{f}^* = \underline{f}_*$ a.e.; call the common value $\bar f$. Thus $A_n f$ converges a.e. to the $T$-invariant limit $\bar f$, and $\bar f$ is finite a.e. (the truncations below show it is in $L^1$).

*Integral identity.* It remains to pass the integral through the a.e. limit $A_n f \to \bar f$ over each invariant set $C \in \mathcal{I}$, where $\int_C A_n f\,d\mu = \int_C f\,d\mu$ since $\int_C f\circ T^k\,d\mu = \int_C f\,d\mu$ for every $k$ (by $T$-invariance of $\mu$ and of $C$). First take $f$ **bounded**, $|f| \le M$: then $|A_n f| \le M$, so bounded convergence gives $\int_C \bar f\,d\mu = \lim_n \int_C A_n f\,d\mu = \int_C f\,d\mu$. For general $f \in L^1$, split $f = g + h$ with $g$ bounded and $\lVert h\rVert_{L^1} < \varepsilon$. The bounded part gives $\int_C \bar g\,d\mu = \int_C g\,d\mu$. For the remainder, the **maximal ergodic theorem** applied to $|h| - \lambda$ on the invariant set $\{\sup_n A_n|h| > \lambda\}$ yields the weak-type bound $\lambda\,\mu(\sup_n A_n|h| > \lambda) \le \lVert h\rVert_{L^1} < \varepsilon$; hence $\overline{|h|}{}^* = \lim_n A_n|h|$ (which exists a.e. and dominates $|\bar h|$) satisfies $\lambda\,\mu(\overline{|h|}{}^* > \lambda) \le \varepsilon$, and by Fatou $\int|\bar h|\,d\mu \le \liminf_n \int A_n|h|\,d\mu = \lVert h\rVert_{L^1} < \varepsilon$. Thus $\bar f = \bar g + \bar h \in L^1$ and $\bigl|\int_C \bar f\,d\mu - \int_C f\,d\mu\bigr| = \bigl|\int_C \bar h\,d\mu - \int_C h\,d\mu\bigr| \le \int|\bar h| + \lVert h\rVert_{L^1} < 2\varepsilon$. Letting $\varepsilon \to 0$ gives $\int_C \bar f\,d\mu = \int_C f\,d\mu$ for every $C \in \mathcal{I}$; with $C = X$, $\int_X \bar f\,d\mu = \int_X f\,d\mu$. Since $\bar f$ is $\mathcal{I}$-measurable and integrates to $f$ over every invariant set, it is by definition the **conditional expectation** $\bar f = \mathbb{E}[f\mid\mathcal{I}]$.

*Ergodic case.* If $T$ is **ergodic**, then $\mathcal{I}$ is trivial, so the $\mathcal{I}$-measurable $\bar f$ is constant a.e.; its constant value equals its integral $\int_X \bar f\,d\mu = \int_X f\,d\mu$. Thus the time average equals the space average $\int_X f\,d\mu$ for a.e. $x$. Taking $X = Y^{\mathbb{N}}$ with the shift and a product measure recovers the strong **law of large numbers** as the independent special case. $\square$`,
  },
]

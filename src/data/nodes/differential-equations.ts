import type { MathNode } from '../types'

export const DIFFERENTIAL_EQUATIONS_NODES: MathNode[] = [
  {
    id: 'differential-equation',
    label: 'Differential Equation',
    title: 'Differential Equation',
    kind: 'definition',
    tags: ['Differential Equations'],
    dependencies: ['derivative'],
    description: String.raw`A differential equation relates an unknown function to its own derivatives. It does not give the function outright; it constrains how the function changes in terms of where it currently is. This is the language in which natural laws are stated — Newton's second law, radioactive decay, heat flow — because such laws describe rates of change rather than values directly. The central questions are which functions satisfy a given equation, and how the choice is narrowed by side conditions.`,
    definition: String.raw`A **differential equation** in an unknown function $y$ of one or more variables is an equation
$$F\bigl(t,\ y,\ y',\ y'',\ \dots,\ y^{(n)}\bigr) = 0$$
relating $y$ and finitely many of its **derivatives** to the independent variable(s) $t$, where $F$ is a given function. Its **order** is the order $n$ of the highest derivative that actually appears. A **solution** on an interval (or domain) $I$ is a function $y$, differentiable to order $n$ on $I$, that satisfies the equation identically for every point of $I$.`,
  },
  {
    id: 'ordinary-differential-equation',
    label: 'ODE',
    title: 'Ordinary Differential Equation',
    kind: 'definition',
    tags: ['Differential Equations'],
    dependencies: ['differential-equation', 'derivative'],
    description: String.raw`An ordinary differential equation constrains a function of a *single* real variable — typically thought of as time — and its successive derivatives. The "ordinary" distinguishes it from partial differential equations, which involve several independent variables and partial derivatives. The basic first-order explicit form $y' = f(t,y)$ is in a sense universal: any higher-order explicit equation becomes a first-order *system* by treating each lower derivative as a new coordinate. ODEs are the mathematics of deterministic time evolution.`,
    definition: String.raw`An **ordinary differential equation** (ODE) is a **differential equation** whose unknown $y$ is a function of a single independent variable. Its **explicit first-order** form is
$$y'(t) = f\bigl(t, y(t)\bigr),$$
where $f$ is given on a region of the $(t,y)$-plane; more generally $y$ may be vector-valued, $y : I \to \mathbb{R}^n$, giving a first-order **system**. Any explicit $n$-th order ODE $y^{(n)} = g\bigl(t, y, y', \dots, y^{(n-1)}\bigr)$ reduces to such a first-order system: setting $u_1 = y,\ u_2 = y',\ \dots,\ u_n = y^{(n-1)}$ yields $u_1' = u_2,\ \dots,\ u_{n-1}' = u_n,\ u_n' = g(t, u_1, \dots, u_n)$, i.e. $u' = f(t, u)$ with $u = (u_1, \dots, u_n)$.`,
  },
  {
    id: 'initial-value-problem',
    label: 'Initial Value Problem',
    title: 'Initial Value Problem',
    kind: 'definition',
    tags: ['Differential Equations'],
    dependencies: ['ordinary-differential-equation'],
    description: String.raw`A differential equation alone usually has an entire family of solutions; pinning down a single one requires extra data. An initial value problem supplies the state of the system at one instant and asks for the trajectory that flows from it. Physically this is the statement that the present determines the future: given a particle's position and velocity now, its whole motion is fixed. The mathematical content is whether such a trajectory exists, and whether the initial state determines it uniquely — the well-posedness question answered locally by Picard–Lindelöf.`,
    definition: String.raw`An **initial value problem** (IVP) for a first-order **ordinary differential equation** consists of the equation together with the value of the unknown at one point:
$$y'(t) = f\bigl(t, y(t)\bigr), \qquad y(t_0) = y_0,$$
with $(t_0, y_0)$ a prescribed point in the domain of $f$. A **solution** on an interval $I \ni t_0$ is a differentiable $y : I \to \mathbb{R}^n$ satisfying both the differential equation on $I$ and the **initial condition** $y(t_0) = y_0$.`,
  },
  {
    id: 'lipschitz-condition',
    label: 'Lipschitz Condition',
    title: 'Lipschitz Condition',
    kind: 'definition',
    tags: ['Differential Equations'],
    dependencies: ['continuity', 'metric-space', 'mean-value-theorem'],
    description: String.raw`A Lipschitz condition is a quantitative bound on how fast a function can change: the gap between two output values is controlled by a fixed constant times the gap between the inputs. It is stronger than continuity but weaker than differentiability, and it is exactly the regularity needed to keep nearby trajectories of an ODE from splitting apart — which is what makes solutions unique. For the right-hand side $f(t,y)$ of an ODE, the relevant condition is Lipschitz continuity in the state variable $y$, uniformly in $t$.`,
    definition: String.raw`A function $g$ defined on a subset $D$ of a **metric space** (here $D \subseteq \mathbb{R}^n$ with the Euclidean distance) is **Lipschitz continuous** with constant $L \ge 0$ if
$$\lVert g(u) - g(v)\rVert \le L\,\lVert u - v\rVert \qquad \text{for all } u, v \in D.$$
For an ODE $y' = f(t, y)$ one says $f$ is **Lipschitz in $y$** on a region $R = [t_0 - a, t_0 + a] \times \overline{B}(y_0, b)$ if there is a single constant $L$ with
$$\lVert f(t, u) - f(t, v)\rVert \le L\,\lVert u - v\rVert \qquad \text{for all } (t, u), (t, v) \in R.$$
Any Lipschitz function is **continuous**; if $f$ has a continuous, bounded $y$-derivative on a convex region, the mean value theorem supplies such an $L$.`,
  },
  {
    id: 'ivp-integral-equation',
    label: 'IVP ⇔ Integral Equation',
    title: 'Equivalence of the IVP with an Integral Equation',
    kind: 'lemma',
    tags: ['Differential Equations'],
    dependencies: ['initial-value-problem', 'continuity', 'continuous-implies-integrable', 'fundamental-theorem-of-calculus'],
    description: String.raw`The pivot of the existence theory is a change of viewpoint: a differentiable solution of the initial value problem is the same thing as a continuous solution of an associated integral equation. Recasting the problem in integral form has two payoffs — it builds the initial condition directly into the equation, and it replaces differentiation (which loses regularity) by integration (which gains it), turning the search for a solution into the search for a fixed point of a self-map on a space of continuous functions.`,
    statement: String.raw`Let $f$ be **continuous** on a region containing $(t_0, y_0)$ and let $I$ be an interval with $t_0 \in I$. A continuous function $y : I \to \mathbb{R}^n$ with $(t, y(t))$ in that region satisfies the **initial value problem** $y' = f(t, y)$, $y(t_0) = y_0$ on $I$ if and only if it satisfies the integral equation
$$y(t) = y_0 + \int_{t_0}^{t} f\bigl(s, y(s)\bigr)\,ds \qquad (t \in I).$$`,
    proof: String.raw`($\Rightarrow$) Suppose $y$ solves the IVP. Then $y$ is differentiable with $y'(s) = f(s, y(s))$, and the map $s \mapsto f(s, y(s))$ is **continuous** (composition of the continuous $f$ with the continuous $s \mapsto (s, y(s))$), hence **integrable** on $[t_0, t]$ (or $[t, t_0]$) by **continuous $\Rightarrow$ integrable**. By part (II) of the **Fundamental Theorem of Calculus** applied componentwise to the antiderivative $y$ of $y'$,
$$\int_{t_0}^{t} f\bigl(s, y(s)\bigr)\,ds = \int_{t_0}^{t} y'(s)\,ds = y(t) - y(t_0) = y(t) - y_0,$$
which rearranges to the integral equation.

($\Leftarrow$) Suppose $y$ is continuous and satisfies the integral equation. The integrand $s \mapsto f(s, y(s))$ is continuous, so by part (I) of the **Fundamental Theorem of Calculus** the map $t \mapsto \int_{t_0}^{t} f(s, y(s))\,ds$ is differentiable with derivative $f(t, y(t))$; hence $y$ is differentiable with $y'(t) = f(t, y(t))$. Setting $t = t_0$ in the integral equation gives $y(t_0) = y_0 + 0 = y_0$. Thus $y$ solves the IVP. $\square$`,
  },
  {
    id: 'picard-lindelof',
    label: 'Existence & Uniqueness',
    title: 'Picard–Lindelöf Theorem',
    kind: 'theorem',
    tags: ['Differential Equations'],
    dependencies: ['initial-value-problem', 'lipschitz-condition', 'ivp-integral-equation', 'banach-fixed-point', 'complete-metric-space', 'integral-basic-properties'],
    description: String.raw`The Picard–Lindelöf theorem is the basic well-posedness result for ordinary differential equations: if the right-hand side is continuous and Lipschitz in the state variable, the initial value problem has one and only one solution on a small enough time interval around the initial instant. The proof is the prototype of the fixed-point method in analysis: rewrite the IVP as an integral equation, observe that solving it means finding a fixed point of the Picard operator on a complete space of continuous functions, and show that on a short interval this operator is a contraction, so the Banach fixed-point theorem applies and even produces the solution as the limit of explicit successive approximations.`,
    statement: String.raw`Let $f$ be **continuous** on the box $R = [t_0 - a, t_0 + a] \times \overline{B}(y_0, b)$ and **Lipschitz in $y$** there with constant $L$. Put $M = \sup_R \lVert f\rVert$ and $h = \min\bigl(a,\ b/M\bigr)$ (with $h = a$ if $M = 0$). Then the **initial value problem** $y' = f(t, y)$, $y(t_0) = y_0$ has a **unique** solution $y$ on $J = [t_0 - h, t_0 + h]$, and it is the uniform limit of the Picard iterates $y_0(t) \equiv y_0$, $y_{k+1}(t) = y_0 + \int_{t_0}^{t} f(s, y_k(s))\,ds$.`,
    proof: String.raw`By the **equivalence of the IVP with an integral equation**, a continuous $y : J \to \overline{B}(y_0, b)$ solves the IVP iff it is a fixed point of the **Picard operator**
$$(T y)(t) = y_0 + \int_{t_0}^{t} f\bigl(s, y(s)\bigr)\,ds.$$
Let $X = \{\,y \in C(J, \mathbb{R}^n) : \lVert y(t) - y_0\rVert \le b \text{ for all } t \in J\,\}$, equipped with the supremum distance $d(u, v) = \sup_{t \in J} \lVert u(t) - v(t)\rVert$. With this metric $C(J, \mathbb{R}^n)$ is a **complete metric space** (the uniform limit of continuous functions is continuous, and the limit of a uniformly Cauchy sequence exists pointwise), and $X$ is closed in it — a uniform limit of functions staying within $b$ of $y_0$ again stays within $b$ — hence $(X, d)$ is itself a complete metric space, and it is non-empty (the constant $y_0$ lies in it).

*$T$ maps $X$ into $X$.* For $y \in X$ and $t \in J$, every $(s, y(s))$ with $s$ between $t_0$ and $t$ lies in $R$, so $\lVert f(s, y(s))\rVert \le M$. By the **comparison/estimation bound** for the integral (a **basic property of the integral**),
$$\lVert (T y)(t) - y_0\rVert = \Bigl\lVert \int_{t_0}^{t} f(s, y(s))\,ds \Bigr\rVert \le |t - t_0|\,M \le hM \le b,$$
the last step because $h \le b/M$. And $Ty$ is continuous (it is an integral with continuous integrand). So $Ty \in X$.

*A contraction after passing to an equivalent metric.* For $u, v \in X$ and $t \in J$, the **Lipschitz condition** gives, again by the comparison bound,
$$\lVert (Tu)(t) - (Tv)(t)\rVert \le \Bigl| \int_{t_0}^{t} \lVert f(s, u(s)) - f(s, v(s))\rVert\,ds \Bigr| \le L\,\Bigl|\int_{t_0}^{t} \lVert u(s) - v(s)\rVert\,ds\Bigr| \le L\,|t - t_0|\,d(u, v).$$
Iterating this estimate through the powers of $T$ yields, by induction on $k$,
$$\lVert (T^k u)(t) - (T^k v)(t)\rVert \le \frac{L^k\,|t - t_0|^k}{k!}\,d(u, v) \le \frac{(Lh)^k}{k!}\,d(u, v),$$
so $d(T^k u, T^k v) \le \frac{(Lh)^k}{k!}\,d(u, v)$. Since $\frac{(Lh)^k}{k!} \to 0$, some power $T^N$ has $\frac{(Lh)^N}{N!} < 1$ and is therefore a contraction on the complete space $(X, d)$. By the **Banach fixed-point theorem** $T^N$ has a unique fixed point $y^* \in X$; then $T y^*$ is also a fixed point of $T^N$ (as $T^N(Ty^*) = T(T^N y^*) = T y^*$), so by uniqueness $T y^* = y^*$, i.e. $y^*$ is a fixed point of $T$. Any fixed point of $T$ is a fixed point of $T^N$, so $y^*$ is the *unique* fixed point of $T$ in $X$.

By the integral-equation equivalence, $y^*$ is the unique solution of the IVP among functions valued in $\overline{B}(y_0, b)$; the contraction estimate also shows the iterates $y_k = T^k y_0$ converge to $y^*$ in $d$, i.e. **uniformly** on $J$. $\square$`,
  },
  {
    id: 'linear-differential-equation',
    label: 'Linear ODE',
    title: 'Linear Differential Equation',
    kind: 'definition',
    tags: ['Differential Equations'],
    dependencies: ['ordinary-differential-equation', 'derivative', 'linear-map'],
    description: String.raw`A linear differential equation is one in which the unknown function and its derivatives appear only to the first power and are never multiplied together — the equation is *affine* in $(y, y', y'', \dots)$. This restriction is enormously consequential: the left-hand side becomes a linear operation on functions, so the machinery of linear algebra applies. Solutions of the homogeneous version add and scale to give new solutions (superposition), and the full solution set is an affine space — one particular solution plus the homogeneous solutions. Linear ODEs are the most thoroughly solvable class.`,
    definition: String.raw`A **linear ordinary differential equation** of order $n$ is one of the form
$$y^{(n)} + p_{n-1}(t)\,y^{(n-1)} + \cdots + p_1(t)\,y' + p_0(t)\,y = g(t),$$
with given coefficient functions $p_0, \dots, p_{n-1}$ and **forcing term** $g$ on an interval $I$. It is **homogeneous** when $g \equiv 0$ and **inhomogeneous** otherwise. Writing $L[y] := y^{(n)} + \sum_{j=0}^{n-1} p_j(t)\,y^{(j)}$ defines a map $L$ on $n$-times-differentiable functions, and the equation reads $L[y] = g$; $L$ is a **linear map** in the sense that $L[\alpha y_1 + \beta y_2] = \alpha L[y_1] + \beta L[y_2]$ for scalars $\alpha, \beta$.`,
    proof: String.raw`**$L$ is linear.** Differentiation is linear: $(\alpha y_1 + \beta y_2)^{(j)} = \alpha\,y_1^{(j)} + \beta\,y_2^{(j)}$ for every order $j$, by the sum and constant-multiple rules for the **derivative** applied $j$ times. Hence
$$L[\alpha y_1 + \beta y_2] = (\alpha y_1 + \beta y_2)^{(n)} + \sum_{j=0}^{n-1} p_j(t)\,(\alpha y_1 + \beta y_2)^{(j)} = \alpha\Bigl(y_1^{(n)} + \sum_j p_j y_1^{(j)}\Bigr) + \beta\Bigl(y_2^{(n)} + \sum_j p_j y_2^{(j)}\Bigr) = \alpha L[y_1] + \beta L[y_2].$$
So $L$ satisfies the defining identity of a **linear map** between the (real) vector space of $n$-times-differentiable functions on $I$ and the space of functions on $I$. $\square$`,
  },
  {
    id: 'superposition-principle',
    label: 'Superposition Principle',
    title: 'Superposition for Linear ODEs',
    kind: 'proposition',
    tags: ['Differential Equations'],
    dependencies: ['linear-differential-equation', 'kernel-image', 'subspace'],
    description: String.raw`Superposition is the structural payoff of linearity. Because the differential operator of a linear ODE is a linear map, the homogeneous solutions form a vector space — they can be added and scaled freely — and the general solution of the inhomogeneous equation is obtained from a single particular solution by adding any homogeneous solution. This is exactly the affine structure of the solution set of a linear equation $L[y] = g$: it is a coset of the kernel of $L$. It reduces solving a linear ODE to finding one particular solution plus a basis of the homogeneous solution space.`,
    statement: String.raw`Let $L[y] = y^{(n)} + \sum_{j=0}^{n-1} p_j(t)\,y^{(j)}$ be the operator of a **linear ordinary differential equation** on an interval $I$. Then:
**(a)** the set $H = \{\,y : L[y] = 0\,\}$ of solutions of the homogeneous equation is a **subspace** (the **kernel** of $L$) — in particular sums and scalar multiples of homogeneous solutions are again homogeneous solutions;
**(b)** if $y_p$ is any one solution of the inhomogeneous equation $L[y] = g$, then the complete solution set is the affine space
$$\{\,y : L[y] = g\,\} = y_p + H = \{\,y_p + y_h : y_h \in H\,\}.$$`,
    proof: String.raw`By the **linear differential equation** node, $L$ is a **linear map** on the vector space $V$ of $n$-times-differentiable functions on $I$.

**(a)** $H = \{y \in V : L[y] = 0\}$ is precisely the **kernel** $\ker L$. The kernel of a linear map is a **subspace**: $L[0] = 0$ so $0 \in H$; and if $y_1, y_2 \in H$ and $\alpha, \beta$ are scalars, then $L[\alpha y_1 + \beta y_2] = \alpha L[y_1] + \beta L[y_2] = 0$, so $\alpha y_1 + \beta y_2 \in H$. Thus $H$ is closed under linear combinations — the superposition statement.

**(b)** First, every $y_p + y_h$ with $y_h \in H$ solves the inhomogeneous equation: $L[y_p + y_h] = L[y_p] + L[y_h] = g + 0 = g$. Conversely, if $y$ is any solution, $L[y] = g$, then $L[y - y_p] = L[y] - L[y_p] = g - g = 0$, so $y - y_p =: y_h \in H$ and $y = y_p + y_h$. Hence the solution set is exactly $y_p + H$. $\square$`,
  },
]

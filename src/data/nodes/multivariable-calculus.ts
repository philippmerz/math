import type { MathNode } from '../types'

export const MULTIVARIABLE_CALCULUS_NODES: MathNode[] = [
  {
    id: 'vector-field',
    label: 'Vector Field',
    title: 'Vector Field',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['function', 'euclidean-space'],
    description: String.raw`A **vector field** assigns a vector to each point of a region — a velocity field of a fluid, a force field, the gradient of a potential. It is the central object of vector calculus: its rate of spreading (divergence) and rate of swirling (curl) are differential invariants, and the integral theorems tie those local quantities to global flux and circulation. Formally it is just a map $U \to \mathbb{R}^n$, but viewed as attaching an *arrow* at each point rather than a value.`,
    definition: String.raw`A **vector field** on an open set $U \subseteq \mathbb{R}^n$ is a map $\mathbf{F} : U \to \mathbb{R}^n$, written in components $\mathbf{F}(x) = \bigl(F_1(x), \dots, F_n(x)\bigr)$. It is **continuous**, **$C^k$**, or **smooth** according as all its components are. A **scalar field** is by contrast a map $U \to \mathbb{R}$.`,
  },
  {
    id: 'total-derivative',
    label: 'Total Derivative',
    title: 'Total Derivative (Differentiability)',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['derivative', 'linear-map', 'limit-of-a-function'],
    description: String.raw`In one variable, differentiability means the graph has a tangent line; in several variables it means the graph has a tangent *plane* — the map is approximated near a point by a linear map up to an error that is small compared with the displacement. This **total derivative** is the genuine derivative of a multivariable map: a single linear map (the Jacobian once a basis is chosen) that simultaneously controls every partial and every directional derivative. Mere existence of the partial derivatives is strictly weaker and does not imply it.`,
    definition: String.raw`A map $F : U \to \mathbb{R}^m$, with $U \subseteq \mathbb{R}^n$ open, is **(totally) differentiable** at $a \in U$ if there is a linear map $DF(a) : \mathbb{R}^n \to \mathbb{R}^m$ with
$$\lim_{h \to 0} \frac{\bigl\| F(a + h) - F(a) - DF(a)\,h \bigr\|}{\|h\|} = 0.$$
The linear map $DF(a)$, when it exists, is unique and is called the **total derivative** (or differential) of $F$ at $a$. $F$ is **continuously differentiable** ($C^1$) on $U$ if it is differentiable at every point and $a \mapsto DF(a)$ is continuous.`,
    proof: String.raw`**Uniqueness of $DF(a)$.** Suppose linear maps $L$ and $L'$ both satisfy the limit condition. Fix a unit vector $u$ and set $h = tu$ with $t \to 0$. Subtracting the two approximations, $\frac{\|(L - L')(tu)\|}{\|tu\|} \to 0$; but $(L - L')(tu) = t\,(L - L')u$, so $\frac{|t|\,\|(L-L')u\|}{|t|} = \|(L - L')u\| \to 0$, a quantity independent of $t$. Hence $(L - L')u = 0$ for every unit $u$, so $L = L'$. The defining limit therefore pins down $DF(a)$ unambiguously. $\square$`,
  },
  {
    id: 'partial-derivative',
    label: 'Partial Derivative',
    title: 'Partial Derivative',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['derivative', 'euclidean-space'],
    description: String.raw`A **partial derivative** is the ordinary one-variable derivative taken in a single coordinate direction, freezing the other variables. It measures how the function changes as you nudge just one input. Each partial is easy to compute, but the partials alone do not capture differentiability — only when assembled (and the map is genuinely differentiable) do they become the entries of the total derivative.`,
    definition: String.raw`Let $f$ be defined on an open set $U \subseteq \mathbb{R}^n$ and $a \in U$. The **$i$-th partial derivative** of $f$ at $a$ is
$$\frac{\partial f}{\partial x_i}(a) := \lim_{h \to 0} \frac{f(a + h\,e_i) - f(a)}{h},$$
where $e_i$ is the $i$-th standard basis vector, when this limit exists. It is the ordinary derivative at $0$ of the one-variable slice $t \mapsto f(a + t e_i)$.`,
  },
  {
    id: 'jacobian',
    label: 'Jacobian',
    title: 'Jacobian Matrix',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['total-derivative', 'partial-derivative', 'matrix', 'determinant'],
    description: String.raw`Once bases are fixed, the total derivative of a map $\mathbb{R}^n \to \mathbb{R}^m$ becomes a matrix — the **Jacobian** — whose entries are the partial derivatives. It is the multivariable analogue of $f'(a)$: the linear map of best first-order approximation. When $m = n$, the absolute value of its determinant is the local factor by which the map scales volume, and a nonzero determinant signals local invertibility (the inverse function theorem).`,
    definition: String.raw`Let $F : U \to \mathbb{R}^m$ be differentiable at $a \in U \subseteq \mathbb{R}^n$. The **Jacobian matrix** of $F$ at $a$ is the $m \times n$ matrix of first partial derivatives
$$J_F(a) = \Bigl[\,\frac{\partial F_i}{\partial x_j}(a)\,\Bigr]_{\substack{1 \le i \le m \\ 1 \le j \le n}},$$
which is the matrix of the **total derivative** $DF(a)$ relative to the standard bases. When $m = n$, the **Jacobian determinant** is $\det J_F(a)$.`,
    proof: String.raw`**The matrix of $DF(a)$ is $J_F(a)$.** Suppose $F$ is differentiable at $a$ with total derivative $DF(a)$. Apply the defining limit of the **total derivative** along $h = t e_j$, $t \to 0$:
$$0 = \lim_{t \to 0}\frac{\bigl\|F(a + t e_j) - F(a) - DF(a)(t e_j)\bigr\|}{|t|} = \lim_{t \to 0}\Bigl\| \frac{F(a + t e_j) - F(a)}{t} - DF(a)\,e_j \Bigr\|.$$
Reading this componentwise, the $i$-th component of $\frac{F(a + t e_j) - F(a)}{t}$ converges to the $i$-th component of $DF(a)\,e_j$. The left side is exactly the difference quotient defining $\frac{\partial F_i}{\partial x_j}(a)$, so that **partial derivative** exists and equals the $(i,j)$ entry of the matrix of $DF(a)$. Hence the matrix of $DF(a)$ in the standard bases is precisely $J_F(a)$. $\square$`,
  },
  {
    id: 'gradient',
    label: 'Gradient',
    title: 'Gradient',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['partial-derivative', 'total-derivative', 'dot-product', 'jacobian'],
    description: String.raw`The **gradient** packages the partial derivatives of a scalar field into a single vector. For a differentiable function it is the vector that represents the total derivative through the dot product, and it has a sharp geometric meaning: where it is nonzero it points in the direction of steepest ascent, its length is the maximal rate of increase, and it is orthogonal to the level set through the point. This makes it the central object of gradient-based optimization.`,
    definition: String.raw`For $f : U \to \mathbb{R}$ differentiable at $a \in U \subseteq \mathbb{R}^n$, the **gradient** of $f$ at $a$ is the vector
$$\nabla f(a) := \Bigl(\frac{\partial f}{\partial x_1}(a), \dots, \frac{\partial f}{\partial x_n}(a)\Bigr) \in \mathbb{R}^n.$$
It represents the **total derivative** $Df(a) : \mathbb{R}^n \to \mathbb{R}$ via the dot product: $Df(a)\,h = \nabla f(a) \cdot h$ for all $h \in \mathbb{R}^n$.`,
    proof: String.raw`**$Df(a)\,h = \nabla f(a) \cdot h$.** For a scalar $f$, $Df(a)$ is a linear functional on $\mathbb{R}^n$, so it has Jacobian matrix the $1 \times n$ row whose $j$-th entry is $\frac{\partial f}{\partial x_j}(a)$ — this is the content of the **Jacobian** identification of the total derivative's matrix. Acting on $h = (h_1, \dots, h_n)$ gives $Df(a)\,h = \sum_j \frac{\partial f}{\partial x_j}(a)\,h_j$, which is exactly $\nabla f(a) \cdot h$ by the definition of the **dot product**. $\square$`,
  },
  {
    id: 'directional-derivative',
    label: 'Directional Derivative',
    title: 'Directional Derivative',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['gradient', 'total-derivative', 'dot-product'],
    description: String.raw`The **directional derivative** is the rate of change of a function as you move through a point along a prescribed direction. The partial derivatives are the special cases where the direction is a coordinate axis. For a differentiable function it is computed by dotting the direction into the gradient — so it is largest along the gradient, zero along a level set, and most negative opposite the gradient, which is why steepest descent follows $-\nabla f$.`,
    definition: String.raw`The **directional derivative** of $f : U \to \mathbb{R}$ at $a$ along a vector $v \in \mathbb{R}^n$ is
$$D_v f(a) := \lim_{t \to 0} \frac{f(a + t v) - f(a)}{t},$$
when the limit exists. If $f$ is differentiable at $a$ then $D_v f(a) = \nabla f(a) \cdot v$ for every $v$; the partial derivative $\frac{\partial f}{\partial x_i}(a)$ is the case $v = e_i$.`,
    proof: String.raw`**$D_v f(a) = \nabla f(a) \cdot v$ for differentiable $f$.** Apply the defining limit of the **total derivative** along the segment $h = tv$:
$$\frac{f(a + tv) - f(a)}{t} = \frac{Df(a)(tv) + R(tv)}{t} = Df(a)\,v + \frac{R(tv)}{t},$$
where $R(h) := f(a+h) - f(a) - Df(a)\,h$ satisfies $\|R(h)\|/\|h\| \to 0$. For $v \neq 0$, $\bigl|R(tv)/t\bigr| = \|v\|\cdot \|R(tv)\|/\|tv\| \to 0$ as $t \to 0$; for $v = 0$ the quotient is identically $0$. Hence the limit exists and equals $Df(a)\,v$, which by the **gradient** representation of the total derivative is $\nabla f(a) \cdot v$. Taking $v = e_i$ recovers $\frac{\partial f}{\partial x_i}(a)$. $\square$`,
  },
  {
    id: 'multivariable-chain-rule',
    label: 'Multivariable Chain Rule',
    title: 'Multivariable Chain Rule (along a curve)',
    kind: 'theorem',
    tags: ['Multivariable Calculus'],
    dependencies: ['total-derivative', 'gradient'],
    description: String.raw`Differentiating a scalar field along a moving point: if you ride along a curve $\gamma$ through a region and record the value of $f$, the rate at which that reading changes is the gradient of $f$ dotted into your velocity. This is the chain rule for a composition $f \circ \gamma$ of a multivariable function with a vector-valued path, and it is the engine behind the gradient theorem and classical Stokes — wherever a line integral must be pulled back through a parametrization.`,
    statement: String.raw`Let $U \subseteq \mathbb{R}^n$ be open, $\gamma : (a, b) \to U$ differentiable at $t_0$, and $f : U \to \mathbb{R}$ (totally) differentiable at $\gamma(t_0)$. Then $f \circ \gamma$ is differentiable at $t_0$ with
$$(f \circ \gamma)'(t_0) = Df(\gamma(t_0))\,\gamma'(t_0) = \nabla f(\gamma(t_0)) \cdot \gamma'(t_0).$$`,
    proof: String.raw`Write $p := \gamma(t_0)$, $L := Df(p)$, and $v := \gamma'(t_0)$. By the **total derivative** of $f$ at $p$,
$$f(p + w) = f(p) + L\,w + R(w), \qquad \frac{|R(w)|}{\|w\|} \to 0 \ \text{ as } w \to 0,$$
where we set $R(0) := 0$, so that $|R(w)| \le \varepsilon(w)\,\|w\|$ with $\varepsilon(w) \to 0$ as $w \to 0$ (and $\varepsilon(0) := 0$). Apply this with $w = w(t) := \gamma(t) - \gamma(t_0)$, which tends to $0$ as $t \to t_0$ since $\gamma$ is differentiable, hence continuous, at $t_0$. For $t \neq t_0$,
$$\frac{f(\gamma(t)) - f(\gamma(t_0))}{t - t_0} = \frac{L\,w(t) + R(w(t))}{t - t_0} = L\Bigl(\frac{w(t)}{t - t_0}\Bigr) + \frac{R(w(t))}{t - t_0}.$$
As $t \to t_0$ the difference quotient $\frac{w(t)}{t - t_0} = \frac{\gamma(t) - \gamma(t_0)}{t - t_0} \to \gamma'(t_0) = v$, and $L$ is linear hence continuous, so the first term tends to $L\,v$. For the remainder, estimate
$$\Bigl|\frac{R(w(t))}{t - t_0}\Bigr| \le \varepsilon(w(t))\,\frac{\|w(t)\|}{|t - t_0|} = \varepsilon(w(t))\,\Bigl\|\frac{w(t)}{t - t_0}\Bigr\|.$$
The factor $\bigl\|\frac{w(t)}{t-t_0}\bigr\|$ converges to $\|v\|$ and is therefore bounded near $t_0$, while $\varepsilon(w(t)) \to 0$ because $w(t) \to 0$; hence the product $\to 0$. Therefore the difference quotient converges and
$$(f \circ \gamma)'(t_0) = L\,v = Df(\gamma(t_0))\,\gamma'(t_0).$$
Finally, by the **gradient** representation of the total derivative of a scalar field, $Df(\gamma(t_0))\,v = \nabla f(\gamma(t_0)) \cdot v$, giving the second equality. $\square$`,
  },
  {
    id: 'clairaut-theorem',
    label: 'Clairaut / Schwarz',
    title: 'Clairaut–Schwarz Theorem (Equality of Mixed Partials)',
    kind: 'theorem',
    tags: ['Multivariable Calculus'],
    dependencies: ['partial-derivative', 'mean-value-theorem', 'continuity'],
    description: String.raw`The order in which you take mixed second partial derivatives does not matter, provided those mixed partials are continuous. This symmetry $\partial_x \partial_y f = \partial_y \partial_x f$ is what makes the Hessian symmetric, makes the exterior derivative satisfy $d^2 = 0$, and underlies the curl-of-gradient and divergence-of-curl identities of vector calculus. Continuity is essential — there are functions whose mixed partials exist everywhere but disagree at a point.`,
    statement: String.raw`Let $f$ be defined on an open set $U \subseteq \mathbb{R}^2$ (the general case is this one applied to a pair of coordinates), and suppose $\partial_x f$, $\partial_y f$, $\partial_x\partial_y f$, and $\partial_y\partial_x f$ exist on $U$ with the two mixed partials continuous at $a = (a_1, a_2)$. Then
$$\frac{\partial^2 f}{\partial x\,\partial y}(a) = \frac{\partial^2 f}{\partial y\,\partial x}(a).$$`,
    proof: String.raw`For small $h, k \neq 0$ form the second difference
$$\Delta(h,k) := f(a_1+h, a_2+k) - f(a_1+h, a_2) - f(a_1, a_2+k) + f(a_1, a_2).$$
Let $\varphi(x) := f(x, a_2 + k) - f(x, a_2)$. Then $\Delta(h,k) = \varphi(a_1 + h) - \varphi(a_1)$, and $\varphi$ is differentiable in $x$ with $\varphi'(x) = \partial_x f(x, a_2+k) - \partial_x f(x, a_2)$. By the **Mean Value Theorem** there is $\xi$ between $a_1$ and $a_1 + h$ with
$$\Delta(h,k) = h\,\varphi'(\xi) = h\bigl(\partial_x f(\xi, a_2 + k) - \partial_x f(\xi, a_2)\bigr).$$
Now apply the **Mean Value Theorem** in the second variable to $y \mapsto \partial_x f(\xi, y)$: there is $\eta$ between $a_2$ and $a_2 + k$ with $\partial_x f(\xi, a_2+k) - \partial_x f(\xi, a_2) = k\,\partial_y\partial_x f(\xi, \eta)$. Thus $\Delta(h,k) = hk\,\partial_y\partial_x f(\xi, \eta)$ with $(\xi,\eta) \to a$ as $(h,k) \to 0$, and by **continuity** of $\partial_y\partial_x f$ at $a$,
$$\lim_{(h,k)\to 0} \frac{\Delta(h,k)}{hk} = \partial_y\partial_x f(a).$$
By symmetry — grouping $\Delta$ the other way with $\psi(y) := f(a_1+h, y) - f(a_1, y)$ and using continuity of $\partial_x\partial_y f$ — the same limit equals $\partial_x\partial_y f(a)$. Two expressions for one limit are equal, giving $\partial_x\partial_y f(a) = \partial_y\partial_x f(a)$. $\square$`,
  },
  {
    id: 'divergence',
    label: 'Divergence',
    title: 'Divergence',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['vector-field', 'partial-derivative'],
    description: String.raw`The **divergence** of a vector field is a scalar field measuring the net outward flux per unit volume at each point — the rate at which the field is "spreading out." It is positive at sources, negative at sinks, and zero for an incompressible flow. The divergence theorem promotes this infinitesimal flux density to the total flux through a closed surface, which is why divergence is the natural language for conservation laws.`,
    definition: String.raw`The **divergence** of a $C^1$ vector field $\mathbf{F} = (F_1, \dots, F_n)$ on $U \subseteq \mathbb{R}^n$ is the scalar field
$$\operatorname{div}\mathbf{F} := \nabla \cdot \mathbf{F} = \sum_{i=1}^{n} \frac{\partial F_i}{\partial x_i}.$$`,
  },
  {
    id: 'curl',
    label: 'Curl',
    title: 'Curl',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['vector-field', 'partial-derivative'],
    description: String.raw`The **curl** of a three-dimensional vector field is a vector field measuring the infinitesimal rotation of the flow — its direction is the axis of swirl and its magnitude twice the local angular velocity. A field with vanishing curl is *irrotational* and is, on a simply connected domain, the gradient of a potential. Stokes' theorem relates the curl to the circulation around a loop.`,
    definition: String.raw`The **curl** of a $C^1$ vector field $\mathbf{F} = (F_1, F_2, F_3)$ on $U \subseteq \mathbb{R}^3$ is the vector field
$$\operatorname{curl}\mathbf{F} := \nabla \times \mathbf{F} = \Bigl(\frac{\partial F_3}{\partial y} - \frac{\partial F_2}{\partial z},\; \frac{\partial F_1}{\partial z} - \frac{\partial F_3}{\partial x},\; \frac{\partial F_2}{\partial x} - \frac{\partial F_1}{\partial y}\Bigr).$$
In the plane, the **scalar curl** of $(P, Q)$ is $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}$.`,
  },
  {
    id: 'multiple-integral',
    label: 'Multiple Integral',
    title: 'Multiple Integral',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['riemann-integral', 'euclidean-space'],
    description: String.raw`A **multiple integral** extends the Riemann integral from an interval to a region of $\mathbb{R}^n$, totalling a quantity weighted by area, volume, or mass. The definition mirrors the one-dimensional one — partition a box, form Darboux sums over sub-boxes, and pass to the common refinement — and it is evaluated in practice by Fubini's theorem (as an iterated integral) and transformed by the change-of-variables formula (which inserts the absolute Jacobian determinant).`,
    definition: String.raw`Let $R = [a_1, b_1] \times \cdots \times [a_n, b_n]$ be a closed box and $f : R \to \mathbb{R}$ bounded. For a partition $P$ of $R$ into sub-boxes $\{Q_j\}$, with $m_j = \inf_{Q_j} f$, $M_j = \sup_{Q_j} f$, and $\operatorname{vol}(Q_j)$ the product of the side lengths, set $\underline{S}(P) = \sum_j m_j \operatorname{vol}(Q_j)$ and $\overline{S}(P) = \sum_j M_j \operatorname{vol}(Q_j)$. Then $f$ is **integrable** over $R$ with integral $\int_R f = \sup_P \underline{S}(P) = \inf_P \overline{S}(P)$ when these agree. For a **Jordan-measurable** region $D \subseteq R$ — one whose boundary $\partial D$ has content zero — and bounded $f$, set $\int_D f := \int_R f\cdot \mathbf{1}_D$, where $\mathbf{1}_D$ is the indicator of $D$; the Jordan condition is what guarantees $f\cdot\mathbf{1}_D$ is Darboux-integrable over $R$ (the discontinuities introduced along $\partial D$ form a content-zero set) so that the right-hand side exists.`,
  },
  {
    id: 'line-integral',
    label: 'Line Integral',
    title: 'Line Integral',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['vector-field', 'riemann-integral', 'dot-product'],
    description: String.raw`A **line integral** accumulates a quantity along a curve. For a vector field it sums the tangential component along the path — the **work** done by a force, or the **circulation** of a flow. The value is computed by pulling the field back through a parametrization and integrating in one variable. For a gradient field the result depends only on the endpoints, the vector-calculus form of the fundamental theorem of calculus.`,
    definition: String.raw`Let $\mathbf{F}$ be a continuous vector field on $U \subseteq \mathbb{R}^n$ and $\gamma : [a, b] \to U$ a piecewise-$C^1$ curve. The **line integral** of $\mathbf{F}$ along $\gamma$ is
$$\int_\gamma \mathbf{F} \cdot d\mathbf{r} := \int_a^b \mathbf{F}(\gamma(t)) \cdot \gamma'(t)\, dt,$$
a Riemann integral of the integrand $t \mapsto \mathbf{F}(\gamma(t)) \cdot \gamma'(t)$, which is bounded and continuous except at the finitely many breakpoints of $\gamma$ (where $\gamma'$ may jump) — hence piecewise continuous and integrable, the integral being the sum of the integrals over the smooth pieces. It is independent of orientation-preserving reparametrization and changes sign under reversal of orientation.`,
  },
  {
    id: 'gradient-theorem',
    label: 'Gradient Theorem',
    title: 'Gradient Theorem (FTC for Line Integrals)',
    kind: 'theorem',
    tags: ['Multivariable Calculus'],
    dependencies: ['line-integral', 'gradient', 'multivariable-chain-rule', 'fundamental-theorem-of-calculus'],
    description: String.raw`The line integral of a gradient field depends only on the endpoints of the path, not the path itself. This is the multivariable fundamental theorem of calculus: integrating the derivative $\nabla f$ along a curve recovers the net change in $f$. A consequence is that gradient fields are exactly the *conservative* fields, around any closed loop of which the circulation vanishes.`,
    statement: String.raw`Let $f$ be $C^1$ on an open set $U \subseteq \mathbb{R}^n$ and $\gamma : [a, b] \to U$ a piecewise-$C^1$ curve from $p = \gamma(a)$ to $q = \gamma(b)$. Then
$$\int_\gamma \nabla f \cdot d\mathbf{r} = f(q) - f(p).$$
In particular the integral is path-independent, and vanishes over any closed loop.`,
    proof: String.raw`Assume first $\gamma$ is $C^1$ and let $g(t) := f(\gamma(t))$. By the **multivariable chain rule** applied to the composition $f \circ \gamma$ (valid since $f$ is differentiable and $\gamma$ is $C^1$), $g$ is differentiable with
$$g'(t) = \nabla f(\gamma(t)) \cdot \gamma'(t),$$
which is continuous (it is the composition and dot product of continuous maps, $\nabla f$ being continuous as $f$ is $C^1$). By the definition of the **line integral** and then the **Fundamental Theorem of Calculus** (part II, applied to $g$ whose continuous derivative is $g'$),
$$\int_\gamma \nabla f \cdot d\mathbf{r} = \int_a^b g'(t)\, dt = g(b) - g(a) = f(q) - f(p).$$
For a piecewise-$C^1$ curve, sum this over the smooth pieces; the intermediate endpoint values telescope, leaving $f(q) - f(p)$. If $\gamma$ is closed, $p = q$ and the integral is $0$. $\square$`,
  },
  {
    id: 'surface-integral',
    label: 'Surface Integral',
    title: 'Surface Integral',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['vector-field', 'multiple-integral', 'dot-product'],
    description: String.raw`A **surface integral** integrates over a two-dimensional surface in space. For a vector field on an **oriented** surface — one carrying a continuous choice of unit normal — it measures the **flux**, the net rate at which the field crosses the surface. It is the line integral promoted one dimension, computed by pulling the field back through a parametrization with the area element supplied by the cross product of the parameter tangents; it is the quantity that divergence and curl are tied to by the Stokes-family theorems.`,
    definition: String.raw`Let $S \subseteq \mathbb{R}^3$ be a surface with a regular parametrization $\Phi : D \to \mathbb{R}^3$ over a region $D \subseteq \mathbb{R}^2$ — meaning $\Phi$ is $C^1$, one-to-one on the interior of $D$, and $\Phi_u \times \Phi_v \neq 0$ — with **orientation** given by the unit normal $\mathbf{n} = \frac{\Phi_u \times \Phi_v}{\|\Phi_u \times \Phi_v\|}$. (Injectivity is what makes the value depend only on $S$ and its orientation, not on the chosen $\Phi$: a parametrization covering $S$ twice would double the integral.) For a continuous vector field $\mathbf{F}$ on $S$, the **flux surface integral** is
$$\iint_S \mathbf{F} \cdot d\mathbf{S} := \iint_D \mathbf{F}(\Phi(u,v)) \cdot \bigl(\Phi_u \times \Phi_v\bigr)\, du\, dv = \iint_S (\mathbf{F} \cdot \mathbf{n})\, dS,$$
where $dS = \|\Phi_u \times \Phi_v\|\, du\, dv$ is the scalar area element. The value is independent of orientation-preserving reparametrization and changes sign under reversal of orientation.`,
  },
  {
    id: 'greens-theorem',
    label: "Green's Theorem",
    title: "Green's Theorem",
    kind: 'theorem',
    tags: ['Multivariable Calculus'],
    dependencies: ['line-integral', 'multiple-integral', 'curl', 'fundamental-theorem-of-calculus', 'fubinis-theorem'],
    description: String.raw`In the plane, the circulation of a vector field around the boundary of a region equals the integral of its scalar curl over the region. It converts a one-dimensional boundary integral into a two-dimensional area integral, and is the common ancestor of both Stokes' theorem (the curl form) and the divergence theorem (the flux form). The mechanism is the fundamental theorem of calculus applied one variable at a time.`,
    statement: String.raw`Let $R \subseteq \mathbb{R}^2$ be a region bounded by a positively oriented, piecewise-$C^1$ simple closed curve $\partial R$, and let $P, Q$ be $C^1$ on an open set containing $R$. Then
$$\oint_{\partial R} (P\, dx + Q\, dy) = \iint_R \Bigl(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\Bigr)\, dA.$$`,
    proof: String.raw`It suffices to prove the two halves
$$\oint_{\partial R} P\, dx = -\iint_R \frac{\partial P}{\partial y}\, dA, \qquad \oint_{\partial R} Q\, dy = \iint_R \frac{\partial Q}{\partial x}\, dA,$$
and add them; the general region is cut by lines parallel to the axes into finitely many **simple** pieces — each one simultaneously vertically simple (for the first identity) and horizontally simple (for the second) — along which interior boundary contributions cancel in pairs (opposite orientations), so the two identities below hold on each piece and add there.

**First identity, on a vertically simple region** $R = \{(x,y) : a \le x \le b,\ g(x) \le y \le h(x)\}$. By **Fubini's theorem** and the **Fundamental Theorem of Calculus** in $y$,
$$\iint_R \frac{\partial P}{\partial y}\, dA = \int_a^b \Bigl(\int_{g(x)}^{h(x)} \frac{\partial P}{\partial y}\, dy\Bigr) dx = \int_a^b \bigl(P(x, h(x)) - P(x, g(x))\bigr)\, dx.$$
The boundary $\partial R$, positively oriented, runs left-to-right along the bottom $y = g(x)$ and right-to-left along the top $y = h(x)$ (the vertical sides contribute nothing to $\oint P\, dx$ since $x$ is constant there, $dx = 0$). Hence
$$\oint_{\partial R} P\, dx = \int_a^b P(x, g(x))\, dx - \int_a^b P(x, h(x))\, dx = -\iint_R \frac{\partial P}{\partial y}\, dA.$$

**Second identity, on a horizontally simple region**, is the mirror computation in $x$: again by **Fubini** and the **FTC**, $\iint_R \frac{\partial Q}{\partial x}\, dA = \oint_{\partial R} Q\, dy$, the side without $dy$-contribution now being the horizontal pieces.

Summing the two identities yields $\oint_{\partial R}(P\, dx + Q\, dy) = \iint_R(\partial_x Q - \partial_y P)\, dA$, whose integrand is the **scalar curl** of $(P, Q)$. $\square$`,
  },
  {
    id: 'divergence-theorem',
    label: 'Divergence Theorem',
    title: 'Divergence Theorem (Gauss)',
    kind: 'theorem',
    tags: ['Multivariable Calculus'],
    dependencies: ['surface-integral', 'divergence', 'multiple-integral', 'fundamental-theorem-of-calculus', 'fubinis-theorem'],
    description: String.raw`The outward flux of a vector field through a closed surface equals the integral of the field's divergence over the enclosed solid. Net flow out is the sum of all interior sources — this is the precise statement of which divergence is the local density. It is the basis of conservation laws in physics (continuity equations) and of Gauss's law in electromagnetism, and the three-dimensional sibling of Green's theorem.`,
    statement: String.raw`Let $V \subseteq \mathbb{R}^3$ be a solid region bounded by a piecewise-$C^1$ closed surface $\partial V$ oriented by the outward unit normal $\mathbf{n}$, and let $\mathbf{F} = (F_1, F_2, F_3)$ be $C^1$ on an open set containing $V$. Then
$$\iint_{\partial V} \mathbf{F} \cdot d\mathbf{S} = \iiint_V (\nabla \cdot \mathbf{F})\, dV.$$`,
    proof: String.raw`By linearity it suffices to prove $\iint_{\partial V} (0,0,F_3) \cdot \mathbf{n}\, dS = \iiint_V \frac{\partial F_3}{\partial z}\, dV$ and the two analogous identities for $F_1, F_2$; summing them gives the theorem, since $\mathbf{F}\cdot\mathbf{n} = F_1 n_1 + F_2 n_2 + F_3 n_3$ and $\nabla\cdot\mathbf{F} = \sum \partial_i F_i$.

Take $V$ to be $z$-simple: $V = \{(x,y,z) : (x,y) \in D,\ \phi(x,y) \le z \le \psi(x,y)\}$ (a general region is partitioned into such pieces, with internal surfaces cancelling by opposite normals). By **Fubini's theorem** and the **Fundamental Theorem of Calculus** in $z$,
$$\iiint_V \frac{\partial F_3}{\partial z}\, dV = \iint_D \Bigl(\int_{\phi(x,y)}^{\psi(x,y)} \frac{\partial F_3}{\partial z}\, dz\Bigr) dA = \iint_D \bigl(F_3(x,y,\psi) - F_3(x,y,\phi)\bigr)\, dA.$$
The boundary $\partial V$ has a top $z = \psi$, a bottom $z = \phi$, and a vertical side. On the side the outward normal is horizontal, so its third component $n_3 = 0$ and $(0,0,F_3)\cdot\mathbf{n} = 0$ there. The top, parametrized by $(x,y) \mapsto (x,y,\psi(x,y))$ over $D$, has upward outward normal with surface element $\bigl(-\psi_x, -\psi_y, 1\bigr)\, dA$, so $\iint_{\text{top}}(0,0,F_3)\cdot d\mathbf{S} = \iint_D F_3(x,y,\psi)\, dA$. The bottom, with *downward* outward normal, contributes $-\iint_D F_3(x,y,\phi)\, dA$. Adding,
$$\iint_{\partial V} (0,0,F_3)\cdot d\mathbf{S} = \iint_D \bigl(F_3(x,y,\psi) - F_3(x,y,\phi)\bigr)\, dA = \iiint_V \frac{\partial F_3}{\partial z}\, dV.$$
The $F_1$ and $F_2$ identities follow by taking $V$ to be $x$-simple and $y$-simple respectively, the same computation with axes permuted. Summing the three gives the divergence theorem. $\square$`,
  },
  {
    id: 'stokes-theorem',
    label: "Stokes' Theorem",
    title: "Stokes' Theorem (Classical)",
    kind: 'theorem',
    tags: ['Multivariable Calculus'],
    dependencies: ['surface-integral', 'curl', 'line-integral', 'greens-theorem', 'multivariable-chain-rule', 'clairaut-theorem', 'jacobian'],
    description: String.raw`The circulation of a vector field around the boundary of an oriented surface equals the flux of its curl through the surface. Microscopic rotations in the interior assemble into the net circulation on the rim — the curl form of the fundamental theorem of calculus. Classical Stokes is Green's theorem transported from the flat parameter domain to a curved surface by a parametrization.`,
    statement: String.raw`Let $S$ be an oriented surface in $\mathbb{R}^3$ given by a one-to-one regular $C^2$ parametrization $\Phi : D \to \mathbb{R}^3$ (so $\Phi_u \times \Phi_v \neq 0$ on $D$, orienting $S$ by $\mathbf{n} = \frac{\Phi_u \times \Phi_v}{\|\Phi_u \times \Phi_v\|}$) over a closed region $D \subseteq \mathbb{R}^2$ to which Green's theorem applies, with $\Phi$ carrying the positively oriented boundary $\partial D$ onto the positively oriented boundary curve $\partial S$, and let $\mathbf{F}$ be $C^1$ near $S$. Then
$$\oint_{\partial S} \mathbf{F} \cdot d\mathbf{r} = \iint_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S}.$$`,
    proof: String.raw`Write $\Phi = \Phi(u,v)$. Since $\Phi$ is one-to-one and regular it maps $\partial D$, positively oriented, onto $\partial S$ with its positive orientation, so $\partial S$ is parametrized by $t \mapsto \Phi(u(t), v(t))$ for $(u(t), v(t))$ tracing $\partial D$. Pull the **line integral** back to the parameter plane: along $\partial D$,
$$\oint_{\partial S} \mathbf{F} \cdot d\mathbf{r} = \oint_{\partial D} \bigl(\mathbf{F}(\Phi) \cdot \Phi_u\bigr)\, du + \bigl(\mathbf{F}(\Phi) \cdot \Phi_v\bigr)\, dv,$$
using the **multivariable chain rule** componentwise, $\frac{d}{dt}\Phi(u(t),v(t)) = \Phi_u\, u' + \Phi_v\, v'$, to expand $\mathbf{F}(\Phi)\cdot d\mathbf{r}$. Set $P := \mathbf{F}(\Phi)\cdot\Phi_u$ and $Q := \mathbf{F}(\Phi)\cdot\Phi_v$. By **Green's theorem** on $D$,
$$\oint_{\partial D} P\, du + Q\, dv = \iint_D \Bigl(\frac{\partial Q}{\partial u} - \frac{\partial P}{\partial v}\Bigr)\, du\, dv.$$
Differentiate, using the product rule together with the **multivariable chain rule** for the partials of $\mathbf{F}(\Phi)$ (so $\partial_u[\mathbf{F}(\Phi)] = J\mathbf{F}\,\Phi_u$, $\partial_v[\mathbf{F}(\Phi)] = J\mathbf{F}\,\Phi_v$, applied componentwise). Writing $J\mathbf{F}$ for the Jacobian of $\mathbf{F}$,
$$\frac{\partial Q}{\partial u} = (J\mathbf{F}\,\Phi_u)\cdot\Phi_v + \mathbf{F}(\Phi)\cdot\Phi_{vu}, \qquad \frac{\partial P}{\partial v} = (J\mathbf{F}\,\Phi_v)\cdot\Phi_u + \mathbf{F}(\Phi)\cdot\Phi_{uv}.$$
Because $\Phi$ is $C^2$, $\Phi_{uv} = \Phi_{vu}$ by the **Clairaut–Schwarz theorem**, so the second-derivative terms cancel, leaving
$$\frac{\partial Q}{\partial u} - \frac{\partial P}{\partial v} = (J\mathbf{F}\,\Phi_u)\cdot\Phi_v - (J\mathbf{F}\,\Phi_v)\cdot\Phi_u.$$
A direct expansion of the right side in components shows it equals $(\nabla\times\mathbf{F})(\Phi)\cdot(\Phi_u\times\Phi_v)$: the antisymmetric combination of first partials of $\mathbf{F}$ is exactly the **curl**, contracted against $\Phi_u\times\Phi_v$. Therefore
$$\iint_D \Bigl(\frac{\partial Q}{\partial u} - \frac{\partial P}{\partial v}\Bigr) du\, dv = \iint_D (\nabla\times\mathbf{F})(\Phi)\cdot(\Phi_u\times\Phi_v)\, du\, dv = \iint_S (\nabla\times\mathbf{F})\cdot d\mathbf{S},$$
the last step being the definition of the **surface integral**. Combining the displayed equalities proves the theorem. $\square$`,
  },
  {
    id: 'implicit-function-theorem',
    label: 'Implicit Function Theorem',
    title: 'Implicit Function Theorem',
    kind: 'theorem',
    tags: ['Multivariable Calculus'],
    dependencies: ['jacobian', 'total-derivative', 'determinant', 'banach-fixed-point', 'continuity', 'mean-value-theorem', 'mean-value-inequality'],
    description: String.raw`When can an equation $F(x, y) = 0$ be solved for $y$ as a function of $x$? The **implicit function theorem** answers: locally yes, with a differentiable solution, whenever the partial derivative of $F$ in $y$ is invertible. It guarantees that level sets are locally graphs and supplies a formula for the derivative of the implicit function. Its proof rests on the contraction mapping principle, and the inverse function theorem is the special case $F(x,y) = f(y) - x$.`,
    statement: String.raw`Let $F : U \to \mathbb{R}^m$ be $C^1$ on an open set $U \subseteq \mathbb{R}^n \times \mathbb{R}^m$, with $F(a, b) = 0$, and suppose the partial Jacobian $D_y F(a, b) \in \mathbb{R}^{m \times m}$ is invertible (equivalently $\det D_y F(a,b) \neq 0$). Then there are open neighbourhoods $A \ni a$ in $\mathbb{R}^n$ and $B \ni b$ in $\mathbb{R}^m$ and a unique $C^1$ map $g : A \to B$ with $g(a) = b$ and
$$F(x, g(x)) = 0 \quad\text{for all } x \in A,$$
and these are the only solutions of $F = 0$ in $A \times B$. Moreover $Dg(x) = -\bigl(D_y F(x, g(x))\bigr)^{-1} D_x F(x, g(x))$.`,
    proof: String.raw`Let $L := D_y F(a, b)$, invertible by hypothesis. For fixed $x$ define $T_x(y) := y - L^{-1} F(x, y)$; a point $y$ is a fixed point of $T_x$ iff $F(x, y) = 0$, since $L^{-1}$ is injective. Compute the $y$-derivative
$$D_y T_x(y) = I - L^{-1} D_y F(x, y),$$
which vanishes at $(a, b)$. By **continuity** of the partials of $F$ (the **total derivative** $y \mapsto D_y F$ is continuous as $F$ is $C^1$), there are closed balls $\overline{B}(b, r) \subseteq \mathbb{R}^m$ and $\overline{B}(a, \rho) \subseteq \mathbb{R}^n$ on which the operator norm satisfies $\|D_y T_x(y)\| \le \tfrac12$. Since $\overline{B}(b, r)$ is convex and $y \mapsto T_x(y)$ is $C^1$ there with $\|D_y T_x\| \le \tfrac12$ throughout, the **mean value inequality** (the vector-valued bound $\|T_x(y_1) - T_x(y_2)\| \le \sup_{\xi} \|D_y T_x(\xi)\|\,\|y_1 - y_2\|$, the supremum taken over the segment) gives $\|T_x(y_1) - T_x(y_2)\| \le \tfrac12\|y_1 - y_2\|$ for all $y_1, y_2 \in \overline{B}(b, r)$. Thus $T_x$ is a $\tfrac12$-contraction in $y$ on $\overline{B}(b, r)$ for each fixed $x \in \overline{B}(a, \rho)$.

Shrinking $\rho$ if necessary, continuity of $F$ gives $\|T_x(b) - b\| = \|L^{-1} F(x, b)\| \le r/2$ for $\|x - a\| < \rho$ (it is $0$ at $x = a$). Then for $y \in \overline{B}(b, r)$, $\|T_x(y) - b\| \le \|T_x(y) - T_x(b)\| + \|T_x(b) - b\| \le \tfrac12 r + \tfrac12 r = r$, so $T_x$ maps the complete metric space $\overline{B}(b, r)$ into itself. By the **Banach fixed-point theorem**, $T_x$ has a unique fixed point in $\overline{B}(b, r)$; call it $g(x)$. This $g : B(a,\rho) \to \overline{B}(b,r)$ is the unique solution of $F(x, y) = 0$ there, with $g(a) = b$.

**Lipschitz continuity of $g$.** Uniqueness of fixed points plus the uniform contraction bound $g$: for $x, x'$ near $a$, since $g(x) = T_x(g(x))$ and $g(x') = T_{x'}(g(x'))$,
$$\|g(x) - g(x')\| = \|T_x(g(x)) - T_{x'}(g(x'))\| \le \|T_x(g(x)) - T_x(g(x'))\| + \|T_x(g(x')) - T_{x'}(g(x'))\|,$$
the first term $\le \tfrac12\|g(x) - g(x')\|$ by the contraction property. Absorbing it into the left side, $\|g(x) - g(x')\| \le 2\|T_x(g(x')) - T_{x'}(g(x'))\|$. Now $T_x(y) - T_{x'}(y) = L^{-1}\bigl(F(x', y) - F(x, y)\bigr)$, and applying the **Mean Value Theorem** to each component of $x \mapsto F(x, y)$ on the segment from $x'$ to $x$ (its $C^1$ partials $D_x F$ are bounded by some $M$ on the compact neighbourhood) gives $\|F(x', y) - F(x, y)\| \le M\|x - x'\|$. Hence with $C := 2\|L^{-1}\|\,M$,
$$\|g(x) - g(x')\| \le C\,\|x - x'\|,$$
so $g$ is Lipschitz, in particular continuous, near $a$.

**Differentiability of $g$.** Since $D_y F(a,b)$ is invertible and the partials of $F$ are continuous, $A(x) := D_y F(x, g(x))$ stays invertible for $x$ near $a$; write $B(x) := D_x F(x, g(x))$. Fix such an $x$ and let $h \to 0$, set $k := g(x+h) - g(x)$, which satisfies $\|k\| \le C\|h\|$ by the Lipschitz bound. Because $F$ is differentiable at $(x, g(x))$ and $F(x+h, g(x+h)) = 0 = F(x, g(x))$,
$$0 = F(x+h, g(x)+k) - F(x, g(x)) = B(x)\,h + A(x)\,k + R, \qquad R = o\bigl(\|h\| + \|k\|\bigr) = o(\|h\|),$$
the last estimate using $\|k\| \le C\|h\|$. Solving the linear part for $k$,
$$g(x+h) - g(x) = k = -A(x)^{-1}\bigl(B(x)\,h + R\bigr) = -A(x)^{-1}B(x)\,h - A(x)^{-1}R,$$
and $\|A(x)^{-1}R\| \le \|A(x)^{-1}\|\,\|R\| = o(\|h\|)$. Thus
$$\frac{\bigl\| g(x+h) - g(x) + A(x)^{-1}B(x)\,h \bigr\|}{\|h\|} \to 0 \quad (h \to 0),$$
which is precisely differentiability of $g$ at $x$ with
$$Dg(x) = -A(x)^{-1}B(x) = -\bigl(D_y F(x, g(x))\bigr)^{-1} D_x F(x, g(x)).$$
This formula is a continuous function of $x$ (composition of the continuous maps $g$, the continuous partials of $F$, and matrix inversion), so $Dg$ is continuous and $g$ is $C^1$. $\square$`,
  },
  {
    id: 'inverse-function-theorem',
    label: 'Inverse Function Theorem',
    title: 'Inverse Function Theorem',
    kind: 'corollary',
    tags: ['Multivariable Calculus'],
    dependencies: ['implicit-function-theorem', 'jacobian', 'determinant', 'total-derivative', 'mean-value-inequality'],
    description: String.raw`A continuously differentiable map is locally invertible, with differentiable inverse, exactly where its derivative is invertible — a nonzero Jacobian determinant. The local inverse linearizes to the inverse of the original derivative. It is the companion of the implicit function theorem (and quickly deduced from it), and the foundation of the change of coordinates underlying the change-of-variables formula and the manifold charts of differential geometry.`,
    statement: String.raw`Let $f : U \to \mathbb{R}^n$ be $C^1$ on an open set $U \subseteq \mathbb{R}^n$ and suppose $Df(a)$ is invertible (equivalently $\det J_f(a) \neq 0$). Then there are open neighbourhoods $A \ni a$ and $W \ni f(a)$ such that $f|_A : A \to W$ is a bijection whose inverse $f^{-1} : W \to A$ is $C^1$, with $D(f^{-1})(y) = \bigl(Df(f^{-1}(y))\bigr)^{-1}$ for all $y \in W$.`,
    proof: String.raw`Apply the **implicit function theorem** to $F(x, y) := f(y) - x$, a $C^1$ map on $\mathbb{R}^n \times U$ with $F(f(a), a) = 0$, the "$y$"-block being $y$ and $D_y F(x, y) = Df(y)$, invertible at $(f(a), a)$ by hypothesis. The theorem yields open neighbourhoods $W_0 \ni f(a)$ and $A_0 \ni a$ and a unique $C^1$ map $g : W_0 \to A_0$ with $g(f(a)) = a$ and $f(g(x)) = x$ for all $x \in W_0$, and moreover $(x, y) = (x, g(x))$ is the *only* solution of $f(y) = x$ inside $W_0 \times A_0$.

**A lower bound making $f$ locally injective.** Since $Df(a)$ is invertible there is $c > 0$ with $\|Df(a)\,v\| \ge 2c\,\|v\|$ for all $v$. As $f$ is $C^1$, choose an open ball $B := B(a, \delta) \subseteq A_0$ small enough that the operator norm satisfies $\|Df(y) - Df(a)\| \le c$ for $y \in B$. Consider $\varphi(y) := f(y) - Df(a)\,y$, a $C^1$ map on the convex set $B$ with $D\varphi(y) = Df(y) - Df(a)$, hence $\|D\varphi(y)\| \le c$ on $B$. By the **mean value inequality** applied to $\varphi$ on the segment $[y', y] \subseteq B$, $\|\varphi(y) - \varphi(y')\| \le \sup_{\xi \in [y',y]} \|D\varphi(\xi)\|\,\|y - y'\| \le c\,\|y - y'\|$, i.e. $\|f(y) - f(y') - Df(a)(y - y')\| \le c\,\|y - y'\|$, so
$$\|f(y) - f(y')\| \ge \|Df(a)(y - y')\| - c\,\|y - y'\| \ge 2c\,\|y-y'\| - c\,\|y-y'\| = c\,\|y - y'\|.$$
Hence $f|_B$ is injective.

**An open domain.** Set $A := B \cap f^{-1}(W_0)$, open as the intersection of the open ball $B$ with the preimage of the open set $W_0$ under the continuous $f$, and containing $a$ (since $f(a) \in W_0$). Put $W := f(A)$. For $x \in W_0$, its unique preimage in $A_0$ under $f$ is $g(x)$, so
$$x \in W = f(A) \iff g(x) \in A,$$
because the unique $y \in A_0 \supseteq A$ with $f(y) = x$ is $y = g(x)$. Therefore $W = \{x \in W_0 : g(x) \in A\} = g^{-1}(A) \cap W_0$, which is open as $g$ is continuous and $A, W_0$ are open. Clearly $f(a) \in W$.

**Bijection with $C^1$ inverse.** By construction $f(A) = W$, so $f|_A : A \to W$ is surjective, and it is injective because $A \subseteq B$ and $f|_B$ is injective. For $x \in W$ the unique preimage equals $g(x)$ (as above), so $(f|_A)^{-1} = g|_W$, which is $C^1$. The derivative is supplied directly by the **implicit function theorem**'s formula, with no separate chain rule needed: applied to $F(x, y) = f(y) - x$ one has $D_y F(x, y) = Df(y)$ and $D_x F(x, y) = -I$, so
$$Dg(x) = -\bigl(D_y F(x, g(x))\bigr)^{-1} D_x F(x, g(x)) = -\bigl(Df(g(x))\bigr)^{-1}(-I) = \bigl(Df(g(x))\bigr)^{-1}.$$
Hence
$$D(f^{-1})(y) = Dg(y) = \bigl(Df(g(y))\bigr)^{-1} = \bigl(Df(f^{-1}(y))\bigr)^{-1}, \qquad y \in W.$$
The Jacobian determinant condition $\det J_f(a) \neq 0$ is just the invertibility of $Df(a)$ via the **determinant** characterization of invertible matrices. $\square$`,
  },
  {
    id: 'manifold',
    label: 'Manifold',
    title: 'Topological Manifold',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['topological-space', 'homeomorphism', 'hausdorff-space', 'euclidean-space'],
    description: String.raw`A **manifold** is a space that is locally indistinguishable from Euclidean space: zoom in far enough at any point and it looks like a piece of $\mathbb{R}^n$. Curves, surfaces, and the configuration spaces of mechanics and the spacetimes of relativity are manifolds. The local Euclidean structure is what allows calculus to be carried over to curved spaces once a compatible smooth atlas is added.`,
    definition: String.raw`A **topological manifold of dimension $n$** is a topological space $M$ that is **Hausdorff**, second-countable, and **locally Euclidean of dimension $n$**: every point has an open neighbourhood **homeomorphic** to an open subset of $\mathbb{R}^n$. Such a homeomorphism $\varphi : U \to \varphi(U) \subseteq \mathbb{R}^n$ is a **chart**; a collection of charts covering $M$ is an **atlas**. The dimension $n$ is well defined by invariance of domain.`,
  },
  {
    id: 'differential-form',
    label: 'Differential Form',
    title: 'Differential Form',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['smooth-manifold', 'tangent-space', 'clairaut-theorem'],
    description: String.raw`A **differential form** is the object built to be integrated over a manifold. A $k$-form eats $k$ tangent vectors at a point and returns a number, alternating and multilinear, so that it transforms correctly under change of coordinates and assigns a signed $k$-dimensional volume. The **exterior derivative** $d$ raises degree by one and satisfies $d^2 = 0$; it unifies gradient, curl, and divergence into a single operation, and is what makes the generalized Stokes theorem possible.`,
    definition: String.raw`Let $M$ be a smooth $n$-manifold. A **differential $k$-form** $\omega$ assigns to each $p \in M$ an alternating $k$-linear map $\omega_p : (T_pM)^k \to \mathbb{R}$, varying smoothly with $p$. In a chart $\omega = \sum_{i_1 < \cdots < i_k} f_{i_1\cdots i_k}\, dx^{i_1} \wedge \cdots \wedge dx^{i_k}$ with smooth coefficients, where $\wedge$ is the alternating (wedge) product. The **exterior derivative** is the unique $\mathbb{R}$-linear $d$ raising degree by one with: (i) $d f = \sum_i \partial_i f\, dx^i$ on functions; (ii) the graded Leibniz rule $d(\alpha \wedge \beta) = d\alpha \wedge \beta + (-1)^{\deg \alpha}\,\alpha \wedge d\beta$; and (iii) on a monomial, $d\bigl(f\, dx^{i_1}\wedge\cdots\wedge dx^{i_k}\bigr) = df \wedge dx^{i_1}\wedge\cdots\wedge dx^{i_k}$ — equivalently $d(dx^i) = 0$, so the basic differentials $dx^i$ are closed. The identity $d \circ d = 0$ is then a theorem (proved below), not a defining property.`,
    proof: String.raw`**$d^2 = 0$.** By $\mathbb{R}$-linearity it suffices to check this on a chart monomial $\omega = f\, dx^I$, where $dx^I := dx^{i_1}\wedge\cdots\wedge dx^{i_k}$. By the defining property (iii), $d\omega = df \wedge dx^I = \sum_j \partial_j f\, dx^j \wedge dx^I$. Apply $d$ again. Each summand $\partial_j f\, dx^j \wedge dx^I$ is itself a monomial with basic block $dx^j \wedge dx^I = dx^j \wedge dx^{i_1}\wedge\cdots\wedge dx^{i_k}$, so property (iii) applies once more — and this is the step that encodes $d(dx^j \wedge dx^I) = 0$, i.e. that the basic differentials are closed:
$$d(d\omega) = \sum_{j} d\bigl(\partial_j f\bigr) \wedge dx^j \wedge dx^I = \sum_{j}\sum_{l} \partial_l\partial_j f\; dx^l \wedge dx^j \wedge dx^I.$$
In the double sum, $\partial_l\partial_j f = \partial_j\partial_l f$ by the **Clairaut–Schwarz theorem** (coefficients are smooth, so mixed partials are continuous and hence equal), making the coefficient array *symmetric* in $(l, j)$, while $dx^l \wedge dx^j = -\,dx^j \wedge dx^l$ is *antisymmetric*. The contraction of a symmetric array with an antisymmetric one vanishes — the $(l,j)$ and $(j,l)$ terms cancel in pairs, and the $l = j$ terms vanish because $dx^l \wedge dx^l = 0$. Hence $d^2\omega = 0$. $\square$`,
  },
  {
    id: 'generalized-stokes-theorem',
    label: 'Generalized Stokes',
    title: 'Generalized Stokes Theorem',
    kind: 'theorem',
    tags: ['Multivariable Calculus'],
    dependencies: ['differential-form', 'smooth-manifold', 'fundamental-theorem-of-calculus', 'fubinis-theorem'],
    description: String.raw`A single theorem subsumes the entire integral calculus of vector fields: the integral of $d\omega$ over an oriented manifold-with-boundary equals the integral of $\omega$ over its boundary. The fundamental theorem of calculus, the gradient theorem, Green's theorem, classical Stokes, and the divergence theorem are all special cases, obtained by interpreting $\omega$ as a form of the appropriate degree. The exterior derivative and the boundary operator are adjoint with respect to integration.`,
    statement: String.raw`Let $M$ be an oriented smooth $n$-manifold with boundary $\partial M$ carrying the induced (boundary) orientation, and let $\omega$ be a compactly supported smooth $(n-1)$-form on $M$. Then
$$\int_M d\omega = \int_{\partial M} \omega.$$`,
    proof: String.raw`Choose a locally finite oriented atlas with charts to open subsets of the half-space $\mathbb{H}^n = \{x : x_n \ge 0\}$ and, invoking the standard existence of a **smooth partition of unity subordinate to a locally finite open cover** of a smooth manifold, a subordinate family $\{\rho_\alpha\}$ of smooth functions with $0 \le \rho_\alpha \le 1$, each $\rho_\alpha$ supported in one chart, and $\sum_\alpha \rho_\alpha = 1$ on a neighbourhood of $\operatorname{supp}\omega$. Since $\omega$ has compact support, only finitely many $\rho_\alpha\omega$ are nonzero and $\omega = \sum_\alpha \rho_\alpha\omega$; both sides of the claimed identity are linear in $\omega$ and $d(\rho_\alpha\omega)$ summed over $\alpha$ gives $d\omega$ (the extra terms $\sum_\alpha d\rho_\alpha \wedge \omega = d(\sum_\alpha\rho_\alpha)\wedge\omega = 0$ cancel). So it suffices to prove the identity for a form $\omega$ supported inside a single chart, i.e. for a compactly supported $(n-1)$-form on $\mathbb{H}^n$.

Write $\omega = \sum_{i=1}^n f_i\, dx^1\wedge\cdots\wedge\widehat{dx^i}\wedge\cdots\wedge dx^n$ with each $f_i$ smooth and compactly supported, the hat denoting omission. Then $d\omega = \sum_i (-1)^{i-1}\partial_i f_i\; dx^1\wedge\cdots\wedge dx^n$, so
$$\int_{\mathbb{H}^n} d\omega = \sum_{i=1}^n (-1)^{i-1}\int_{\mathbb{H}^n} \partial_i f_i\, dx.$$
Evaluate each term by **Fubini's theorem**, integrating the $i$-th variable first. For $i < n$ the $x_i$-integral runs over all of $\mathbb{R}$, and by the **Fundamental Theorem of Calculus** $\int_{-\infty}^{\infty}\partial_i f_i\, dx_i = 0$ because $f_i$ has compact support (it vanishes at $\pm\infty$); these terms drop out. For $i = n$ the $x_n$-integral runs over $[0,\infty)$, and the **FTC** gives $\int_0^\infty \partial_n f_n\, dx_n = -f_n(x', 0)$ where $x' = (x_1,\dots,x_{n-1})$. Hence
$$\int_{\mathbb{H}^n} d\omega = (-1)^{n-1}\!\int_{\mathbb{R}^{n-1}} -f_n(x',0)\, dx' = (-1)^{n}\!\int_{\mathbb{R}^{n-1}} f_n(x',0)\, dx'.$$
On the other side, the boundary $\partial\mathbb{H}^n = \{x_n = 0\}$ pulls back $\omega$ to $f_n\, dx^1\wedge\cdots\wedge dx^{n-1}$ (every term with a $dx^i$, $i<n$, restricts to a form involving $dx^n|_{x_n=0} = 0$ except the $i=n$ term). With the induced boundary orientation, which differs from the coordinate orientation of $\{x_n=0\}$ by the sign $(-1)^n$, $\int_{\partial\mathbb{H}^n}\omega = (-1)^n\int_{\mathbb{R}^{n-1}} f_n(x',0)\, dx'$. The two sides agree, proving the single-chart case, and summing over the partition of unity gives the theorem on $M$. $\square$`,
  },
]

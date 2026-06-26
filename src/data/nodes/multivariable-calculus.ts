import type { MathNode } from '../types'

export const MULTIVARIABLE_CALCULUS_NODES: MathNode[] = [
  {
    id: 'vector-field',
    label: 'Vector Field',
    title: 'Vector Field',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['function', 'real-numbers'],
    definition: String.raw`A **vector field** on a region $U \subseteq \mathbb{R}^n$ is a map $\mathbf{F} : U \to \mathbb{R}^n$ assigning a vector to each point — a flow, a force, or a gradient field. Its calculus — divergence, curl, and the integral theorems — is the language of fluid dynamics and electromagnetism.`,
  },
  {
    id: 'partial-derivative',
    label: 'Partial Derivative',
    title: 'Partial Derivative',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['derivative'],
    definition: String.raw`A **partial derivative** of a function $f$ of several variables is its derivative in one coordinate direction, holding the others fixed:
$$\frac{\partial f}{\partial x_i}(a) = \lim_{h \to 0} \frac{f(a + h\,e_i) - f(a)}{h},$$
where $e_i$ is the $i$-th standard basis vector. Each partial measures change along one coordinate axis; when $f$ is differentiable, together they form the entries of its derivative as a linear map — the Jacobian.`,
  },
  {
    id: 'directional-derivative',
    label: 'Directional Derivative',
    title: 'Directional Derivative',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['gradient'],
    definition: String.raw`The **directional derivative** of $f$ at $a$ along a unit vector $u$ is its rate of change in that direction:
$$D_u f(a) = \lim_{t \to 0} \frac{f(a + t u) - f(a)}{t} = \nabla f(a) \cdot u$$
for differentiable $f$. Where $\nabla f(a) \neq 0$ it is greatest along the gradient and zero along the level set; the partial derivatives are the cases $u = e_i$.`,
  },
  {
    id: 'gradient',
    label: 'Gradient',
    title: 'Gradient',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['partial-derivative'],
    definition: String.raw`The **gradient** of a differentiable scalar function of several variables is the vector of its partial derivatives,
$$\nabla f = \Bigl(\tfrac{\partial f}{\partial x_1}, \dots, \tfrac{\partial f}{\partial x_n}\Bigr).$$
Where it is nonzero it points in the direction of steepest increase, with magnitude the maximal rate of change, and is orthogonal to the level sets of $f$ — the basis of gradient-based optimization.`,
  },
  {
    id: 'jacobian',
    label: 'Jacobian',
    title: 'Jacobian Matrix',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['partial-derivative', 'matrix', 'determinant'],
    definition: String.raw`The **Jacobian** of a differentiable map $F : \mathbb{R}^n \to \mathbb{R}^m$ at a point is the $m \times n$ matrix of its first partial derivatives,
$$J_F = \Bigl[\,\frac{\partial F_i}{\partial x_j}\,\Bigr],$$
which represents the **total derivative** — the linear map best approximating $F$ near the point. For $m = n$, $|\det J_F|$ measures local volume distortion, and $\det J_F \neq 0$ signals *local* invertibility.`,
  },
  {
    id: 'divergence',
    label: 'Divergence',
    title: 'Divergence',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['vector-field', 'partial-derivative'],
    definition: String.raw`The **divergence** of a vector field $\mathbf{F} = (F_1, \dots, F_n)$ is the scalar
$$\operatorname{div} \mathbf{F} = \nabla \cdot \mathbf{F} = \sum_{i} \frac{\partial F_i}{\partial x_i}.$$
It measures the net outward flux per unit volume at a point — positive at sources, negative at sinks. The divergence theorem ties it to total flux.`,
  },
  {
    id: 'curl',
    label: 'Curl',
    title: 'Curl',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['vector-field', 'partial-derivative'],
    definition: String.raw`The **curl** of a vector field $\mathbf{F}$ in $\mathbb{R}^3$ is the vector
$$\operatorname{curl} \mathbf{F} = \nabla \times \mathbf{F},$$
measuring the field's infinitesimal rotation — its axis and rate of swirl at each point. A field with zero curl is *irrotational* (locally a gradient); Stokes' theorem relates curl to circulation.`,
  },
  {
    id: 'multiple-integral',
    label: 'Multiple Integral',
    title: 'Multiple Integral',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['riemann-integral'],
    definition: String.raw`A **multiple integral** integrates a function over a region of $\mathbb{R}^n$,
$$\iint_R f \, dA, \qquad \iiint_V f \, dV,$$
giving area-, volume-, or mass-weighted totals. By Fubini's theorem it is evaluated as an iterated integral, one variable at a time, and change of variables introduces the absolute value of the Jacobian determinant as a factor.`,
  },
  {
    id: 'line-integral',
    label: 'Line Integral',
    title: 'Line Integral',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['vector-field', 'riemann-integral'],
    definition: String.raw`A **line integral** integrates along a curve $C$. For a vector field $\mathbf{F}$ it accumulates the tangential component — the **work** done along the path:
$$\int_C \mathbf{F} \cdot d\mathbf{r}.$$
When $\mathbf{F} = \nabla f$ is a gradient field the integral depends only on the endpoints (the gradient theorem) — the vector-calculus echo of the fundamental theorem of calculus.`,
  },
  {
    id: 'surface-integral',
    label: 'Surface Integral',
    title: 'Surface Integral',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['vector-field', 'multiple-integral'],
    definition: String.raw`A **surface integral** integrates over a surface $S$ in $\mathbb{R}^3$. For a vector field on an **oriented** surface — one with a continuous unit normal $\mathbf{n}$ — it measures the **flux**, the net flow across it:
$$\iint_S \mathbf{F} \cdot d\mathbf{S} = \iint_S \mathbf{F} \cdot \mathbf{n}\,dS.$$
It is the line integral one dimension up, and the quantity that divergence and curl are tied to by the Stokes-family theorems.`,
  },
  {
    id: 'greens-theorem',
    label: "Green's Theorem",
    title: "Green's Theorem",
    kind: 'theorem',
    tags: ['Multivariable Calculus'],
    dependencies: ['line-integral', 'multiple-integral', 'curl'],
    definition: String.raw`**Green's theorem**: for a positively oriented, piecewise-smooth simple closed curve $C$ bounding a region $R$, with $P, Q$ having continuous partial derivatives on $R$,
$$\oint_C (P\,dx + Q\,dy) = \iint_R \Bigl(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\Bigr) dA.$$
The integrand on the right is the scalar curl; it is the planar case of both Stokes' and the divergence theorems.`,
  },
  {
    id: 'stokes-theorem',
    label: "Stokes' Theorem",
    title: "Stokes' Theorem",
    kind: 'theorem',
    tags: ['Multivariable Calculus'],
    dependencies: ['surface-integral', 'curl', 'line-integral'],
    definition: String.raw`**Stokes' theorem** equates the circulation of a vector field around the boundary of an oriented surface $S$ to the flux of its curl through $S$:
$$\oint_{\partial S} \mathbf{F} \cdot d\mathbf{r} = \iint_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S}.$$
Circulation on the edge is assembled from microscopic rotation inside — the curl form of the fundamental theorem of calculus.`,
  },
  {
    id: 'divergence-theorem',
    label: 'Divergence Theorem',
    title: 'Divergence Theorem',
    kind: 'theorem',
    tags: ['Multivariable Calculus'],
    dependencies: ['surface-integral', 'divergence', 'multiple-integral'],
    definition: String.raw`The **divergence theorem** (Gauss's) equates the outward flux of a vector field through a closed surface $\partial V$ to the integral of its divergence over the enclosed volume:
$$\iint_{\partial V} \mathbf{F} \cdot d\mathbf{S} = \iiint_V (\nabla \cdot \mathbf{F}) \, dV.$$
Net flux out is the sum of all interior sources — the basis of conservation laws and of Gauss's law in physics.`,
  },
  {
    id: 'implicit-function-theorem',
    label: 'Implicit Function Theorem',
    title: 'Implicit Function Theorem',
    kind: 'theorem',
    tags: ['Multivariable Calculus'],
    dependencies: ['jacobian', 'determinant', 'continuity'],
    definition: String.raw`The **implicit function theorem**: if $F(x, y)$ is continuously differentiable, $F(a, b) = 0$, and the partial Jacobian $\partial F/\partial y$ is invertible at $(a, b)$ — equivalently $\det(\partial F/\partial y) \neq 0$, which for one equation is just $\partial F/\partial y \neq 0$ — then near $a$ the equation $F(x, y) = 0$ has, for each $x$, a unique nearby solution $y = g(x)$ with $g(a) = b$ and $g$ differentiable. It guarantees that level sets are locally graphs; the inverse function theorem is its sibling.`,
  },
  {
    id: 'manifold',
    label: 'Manifold',
    title: 'Manifold',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['topological-space', 'homeomorphism'],
    definition: String.raw`A **manifold** is a space that locally looks like $\mathbb{R}^n$: a Hausdorff topological space in which every point has a neighbourhood homeomorphic to an open subset of $\mathbb{R}^n$; the integer $n$ is its **dimension**. Smoothly patched together, manifolds are the setting for calculus on curved spaces — curves, surfaces, and the spacetimes of physics.`,
  },
  {
    id: 'differential-form',
    label: 'Differential Form',
    title: 'Differential Form',
    kind: 'definition',
    tags: ['Multivariable Calculus'],
    dependencies: ['manifold'],
    definition: String.raw`A **differential form** is the object built to be integrated over a manifold: a field of alternating multilinear functions of tangent vectors, written $\omega = \sum f_I\, dx^{i_1} \wedge \cdots \wedge dx^{i_k}$ for a $k$-form. The **exterior derivative** $d$ raises degree and satisfies $d^2 = 0$, packaging gradient, curl, and divergence into one operation.`,
  },
  {
    id: 'generalized-stokes-theorem',
    label: 'Generalized Stokes',
    title: 'Generalized Stokes Theorem',
    kind: 'theorem',
    tags: ['Multivariable Calculus'],
    dependencies: ['differential-form', 'manifold'],
    definition: String.raw`The **generalized Stokes theorem** unifies the integral theorems of calculus: for a compactly supported smooth $(n-1)$-form $\omega$ on an oriented $n$-manifold $M$ with boundary $\partial M$ (carrying the induced orientation),
$$\int_M d\omega = \int_{\partial M} \omega.$$
The fundamental theorem of calculus, Green's, classical Stokes', and the divergence theorem are all special cases — the exterior derivative and the boundary operator are adjoint.`,
  },
]

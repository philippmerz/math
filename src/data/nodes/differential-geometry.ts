import type { MathNode } from '../types'

export const DIFFERENTIAL_GEOMETRY_NODES: MathNode[] = [
  {
    id: 'smooth-manifold',
    label: 'Smooth Manifold',
    title: 'Smooth Manifold',
    kind: 'definition',
    tags: ['Differential Geometry'],
    dependencies: ['manifold', 'euclidean-space'],
    description: String.raw`A topological manifold supports continuity but not yet differentiation: its charts overlap by mere homeomorphisms, and "differentiable function" makes no chart-independent sense. A **smooth manifold** fixes this by demanding the overlaps be infinitely differentiable, so that a function smooth in one chart is smooth in every overlapping chart. This compatibility is exactly what is needed to transport the calculus of $\mathbb{R}^n$ onto a curved space — to differentiate functions, define tangent vectors, and ultimately do geometry.`,
    definition: String.raw`Let $M$ be a topological manifold of dimension $n$. Two charts $\varphi : U \to \mathbb{R}^n$ and $\psi : V \to \mathbb{R}^n$ are **smoothly compatible** if either $U \cap V = \varnothing$ or the **transition map**
$$\psi \circ \varphi^{-1} : \varphi(U \cap V) \to \psi(U \cap V)$$
is a $C^\infty$ diffeomorphism between open subsets of $\mathbb{R}^n$. A **smooth atlas** is an atlas of pairwise smoothly compatible charts; it is **maximal** if it contains every chart smoothly compatible with all of its members. A **smooth manifold** is a topological manifold together with a maximal smooth atlas (a **smooth structure**). A function $f : M \to \mathbb{R}$ is **smooth** if $f \circ \varphi^{-1}$ is $C^\infty$ on $\varphi(U)$ for every chart $\varphi$ in the atlas; smooth compatibility of charts guarantees this is independent of the chart chosen.`,
  },
  {
    id: 'tangent-space',
    label: 'Tangent Space',
    title: 'Tangent Space',
    kind: 'definition',
    tags: ['Differential Geometry'],
    dependencies: ['smooth-manifold', 'vector-space'],
    description: String.raw`On a curved manifold there is no ambient space to subtract points in, so "velocity vector" must be defined intrinsically. The **tangent space** $T_pM$ is the right notion: it collects the velocities of all smooth curves passing through $p$, packaged so that they form a genuine vector space of dimension $\dim M$. Equivalently — and more algebraically — a tangent vector is a **derivation**, an operator that takes the directional derivative of any smooth function at $p$ and obeys linearity and the Leibniz rule. The tangent space is the linear approximation to $M$ at $p$, the arena in which differential calculus on the manifold takes place.`,
    definition: String.raw`Let $M$ be a smooth manifold and $p \in M$; write $C^\infty_p$ for the smooth real-valued functions defined near $p$. A **tangent vector** at $p$ is a **derivation**: an $\mathbb{R}$-linear map $X : C^\infty_p \to \mathbb{R}$ satisfying the **Leibniz rule**
$$X(fg) = X(f)\,g(p) + f(p)\,X(g).$$
The **tangent space** $T_pM$ is the set of all such derivations, a real vector space under $(aX + bY)(f) = a\,X(f) + b\,Y(f)$. In a chart $\varphi = (x^1,\dots,x^n)$ about $p$ the coordinate derivations $\partial/\partial x^i|_p$, sending $f \mapsto \partial_i(f \circ \varphi^{-1})(\varphi(p))$, form a basis, so $\dim T_pM = \dim M = n$. Equivalently, $T_pM$ is the set of smooth curves $\gamma$ with $\gamma(0)=p$ modulo first-order tangency, $X(f) = \tfrac{d}{dt}\big|_{0} f(\gamma(t))$.`,
  },
  {
    id: 'vector-bundle',
    label: 'Vector Bundle',
    title: 'Vector Bundle',
    kind: 'definition',
    tags: ['Differential Geometry'],
    dependencies: ['tangent-space', 'smooth-manifold', 'smooth-map', 'diffeomorphism', 'vector-space'],
    description: String.raw`Many geometric objects on a manifold are not single vectors but a vector attached to every point: a velocity at each point (a vector field), a tensor at each point, a differential form at each point. A **vector bundle** is the structure that makes "a smoothly varying choice of vector space, one per point" precise. Locally it is just a product $U \times \mathbb{R}^k$, but globally it may twist — the Möbius band is the simplest nontrivial example. The prototype is the **tangent bundle** $TM = \bigsqcup_p T_pM$, whose smooth sections are exactly the vector fields; tensors and differential forms are sections of bundles built functorially from $TM$.`,
    definition: String.raw`A **smooth vector bundle of rank $k$** over a smooth manifold $M$ is a smooth manifold $E$ with a smooth surjection $\pi : E \to M$ such that each **fibre** $E_p := \pi^{-1}(p)$ is a $k$-dimensional real vector space, and each point of $M$ has an open neighbourhood $U$ with a diffeomorphism (a **local trivialization**)
$$\Phi : \pi^{-1}(U) \xrightarrow{\;\cong\;} U \times \mathbb{R}^k$$
satisfying $\mathrm{pr}_1 \circ \Phi = \pi$ and restricting to a linear isomorphism $E_p \to \{p\} \times \mathbb{R}^k$ on each fibre. A **section** is a smooth map $s : M \to E$ with $\pi \circ s = \mathrm{id}_M$. The **tangent bundle** $TM = \bigsqcup_{p \in M} T_pM$, with $\pi$ sending $T_pM$ to $p$, is a rank-$\dim M$ vector bundle whose sections are the **vector fields**.`,
  },
  {
    id: 'riemannian-metric',
    label: 'Riemannian Metric',
    title: 'Riemannian Metric',
    kind: 'definition',
    tags: ['Differential Geometry'],
    dependencies: ['tangent-space', 'vector-bundle', 'inner-product-space'],
    description: String.raw`A bare smooth manifold has no notion of length, angle, or volume — diffeomorphisms are free to stretch it arbitrarily. A **Riemannian metric** restores all of this by installing an inner product on each tangent space, varying smoothly from point to point. From it one reads off the length of a curve (by integrating the speed), the angle between two directions, and the volume of a region. Equipping a manifold with a metric turns it into a **Riemannian manifold**, the central object of intrinsic differential geometry; the indefinite (Lorentzian) variant is the setting of general relativity.`,
    definition: String.raw`A **Riemannian metric** $g$ on a smooth manifold $M$ assigns to each $p \in M$ an inner product $g_p : T_pM \times T_pM \to \mathbb{R}$ — symmetric, bilinear, and positive-definite — that varies smoothly with $p$: for any smooth vector fields $X, Y$ the function $p \mapsto g_p(X_p, Y_p)$ is smooth. In a chart with coordinate fields $\partial_i$ this is the data of the smooth, symmetric, positive-definite matrix $g_{ij}(p) = g_p(\partial_i, \partial_j)$. The pair $(M, g)$ is a **Riemannian manifold**. The **length** of a smooth curve $\gamma : [a,b] \to M$ is $L(\gamma) = \int_a^b \sqrt{g_{\gamma(t)}(\dot\gamma(t), \dot\gamma(t))}\,dt$, and the **angle** between $u, v \in T_pM$ is fixed by $g_p(u,v) = |u|\,|v|\cos\theta$ with $|u| = \sqrt{g_p(u,u)}$.`,
  },
  {
    id: 'connection',
    label: 'Connection',
    title: 'Connection (Covariant Derivative)',
    kind: 'definition',
    tags: ['Differential Geometry'],
    dependencies: ['vector-bundle', 'tangent-space', 'vector-field', 'riemannian-metric'],
    description: String.raw`To differentiate a vector field one wants to compare its values at nearby points — but those values live in different tangent spaces, which a bare manifold gives no way to identify. A **connection** supplies exactly this missing identification: a rule $\nabla$ for differentiating sections of a vector bundle in a given direction, equivalently a rule for **parallel transport** of vectors along curves. Unlike the ordinary directional derivative in $\mathbb{R}^n$, a connection is extra structure and is not unique. On a Riemannian manifold, however, there is a single distinguished choice — the **Levi-Civita connection**, the unique torsion-free connection compatible with the metric (existence and uniqueness are proved below).`,
    definition: String.raw`A **connection** (covariant derivative) on a vector bundle $E \to M$ is a map $\nabla$ sending a vector field $X$ on $M$ and a section $s$ of $E$ to a section $\nabla_X s$, that is $C^\infty(M)$-linear in $X$, $\mathbb{R}$-linear in $s$, and obeys the **Leibniz rule** in $s$:
$$\nabla_{fX} s = f\,\nabla_X s,\qquad \nabla_X(s + s') = \nabla_X s + \nabla_X s',\qquad \nabla_X(f s) = (Xf)\,s + f\,\nabla_X s$$
for all $f \in C^\infty(M)$. A vector field $V$ along a curve $\gamma$ is **parallel** if $\nabla_{\dot\gamma}V = 0$; solving this linear ODE transports any $v \in T_{\gamma(a)}M$ to each $T_{\gamma(t)}M$, the **parallel transport** of $v$. For a connection on $E = TM$ the **torsion** is $T(X,Y) = \nabla_X Y - \nabla_Y X - [X,Y]$, and $\nabla$ is **metric** for a Riemannian $g$ when $X\,g(Y,Z) = g(\nabla_X Y, Z) + g(Y, \nabla_X Z)$.`,
  },
  {
    id: 'levi-civita-connection',
    label: 'Levi-Civita Connection',
    title: 'Fundamental Theorem of Riemannian Geometry',
    kind: 'theorem',
    tags: ['Differential Geometry'],
    dependencies: ['connection', 'riemannian-metric', 'inner-product-space'],
    description: String.raw`Among the many connections a manifold admits, a Riemannian metric singles out exactly one that is both **torsion-free** (its symmetric part agrees with the Lie bracket, so it has no built-in twisting) and **metric-compatible** (parallel transport preserves inner products, hence lengths and angles). This is the **Levi-Civita connection**, and the assertion that it exists and is unique is the *fundamental theorem of Riemannian geometry*. Its uniqueness is what makes curvature, geodesics, and the whole intrinsic geometry of $(M,g)$ canonical rather than a matter of arbitrary choice.`,
    statement: String.raw`On any Riemannian manifold $(M, g)$ there exists a unique connection $\nabla$ on $TM$ that is **torsion-free** ($\nabla_X Y - \nabla_Y X = [X,Y]$) and **compatible with the metric** ($X\,g(Y,Z) = g(\nabla_X Y, Z) + g(Y, \nabla_X Z)$). It is the **Levi-Civita connection**.`,
    proof: String.raw`**Uniqueness.** Suppose $\nabla$ is such a connection. Write metric compatibility for the three cyclic permutations of $(X,Y,Z)$:
$$X\,g(Y,Z) = g(\nabla_X Y, Z) + g(Y, \nabla_X Z),$$
$$Y\,g(Z,X) = g(\nabla_Y Z, X) + g(Z, \nabla_Y X),$$
$$Z\,g(X,Y) = g(\nabla_Z X, Y) + g(X, \nabla_Z Y).$$
Add the first two and subtract the third; in each pair use torsion-freeness $\nabla_A B - \nabla_B A = [A,B]$ to collapse the differences. The result is the **Koszul formula**
$$2\,g(\nabla_X Y, Z) = X g(Y,Z) + Y g(Z,X) - Z g(X,Y) + g([X,Y], Z) - g([Y,Z], X) + g([Z,X], Y).$$
The right-hand side involves only $g$, the **Lie bracket**, and directional derivatives of functions — not $\nabla$. Since $g$ is **positive-definite** hence nondegenerate (from **inner-product-space**), $g(\nabla_X Y, Z)$ being determined for all $Z$ determines $\nabla_X Y$. Thus at most one such $\nabla$ exists.

**Existence.** *Define* $\nabla_X Y$ by declaring $g(\nabla_X Y, Z)$ to equal the right-hand side of the Koszul formula for every $Z$; nondegeneracy of $g$ makes this a well-defined section. One verifies directly that this $\nabla$ satisfies the **connection** axioms — $C^\infty$-linearity in $X$, additivity in $Y$, and the Leibniz rule $\nabla_X(fY) = (Xf)Y + f\nabla_X Y$ (the extra terms $Xf$, $Yf$ produced on the right-hand side combine to exactly $(Xf)g(Y,Z)$). Symmetrizing and antisymmetrizing the formula recovers metric compatibility and torsion-freeness respectively. Hence a connection with the two properties exists, and by the first part it is unique. $\square$`,
  },
  {
    id: 'geodesic',
    label: 'Geodesic',
    title: 'Geodesic',
    kind: 'definition',
    tags: ['Differential Geometry'],
    dependencies: ['riemannian-metric', 'levi-civita-connection', 'picard-lindelof'],
    description: String.raw`A straight line in $\mathbb{R}^n$ is the path that never turns — its velocity is constant — and it is also the shortest path between its endpoints. On a curved manifold these two ideas split apart, and a **geodesic** captures the first one intrinsically: it is the curve whose velocity is parallel-transported along itself, so that it has zero covariant acceleration $\nabla_{\dot\gamma}\dot\gamma = 0$. Great circles on a sphere and free-fall worldlines in general relativity are geodesics. Geodesics also *locally* minimize length, and through each point in each direction there passes exactly one geodesic, by the existence-uniqueness theorem for the geodesic ODE.`,
    definition: String.raw`Let $(M, g)$ be a Riemannian manifold with Levi-Civita connection $\nabla$. A smooth curve $\gamma : I \to M$ is a **geodesic** if its velocity field is parallel along it,
$$\nabla_{\dot\gamma}\dot\gamma = 0.$$
In local coordinates $(x^i)$, writing the connection's **Christoffel symbols** $\Gamma^k_{ij}$ defined by $\nabla_{\partial_i}\partial_j = \Gamma^k_{ij}\partial_k$, this is the second-order system
$$\ddot\gamma^{\,k} + \Gamma^k_{ij}(\gamma)\,\dot\gamma^{\,i}\dot\gamma^{\,j} = 0,\qquad k = 1,\dots,n.$$
By existence and uniqueness for ODEs, for each $p \in M$ and $v \in T_pM$ there is a unique maximal geodesic $\gamma_v$ with $\gamma_v(0) = p$ and $\dot\gamma_v(0) = v$. Metric compatibility forces $|\dot\gamma|$ to be constant, so a geodesic is automatically parametrized proportionally to arc length.`,
  },
  {
    id: 'curvature',
    label: 'Curvature',
    title: 'Riemann Curvature Tensor',
    kind: 'definition',
    tags: ['Differential Geometry'],
    dependencies: ['connection', 'levi-civita-connection'],
    description: String.raw`On flat space, parallel-transporting a vector around a closed loop returns it unchanged, and mixed covariant derivatives commute. **Curvature** is precisely the obstruction to both: it measures how much parallel transport around an infinitesimal loop rotates a vector, equivalently the failure of the covariant derivatives in two directions to commute. This obstruction is encoded, point by point and tensorially, in the **Riemann curvature tensor** $R$. It vanishes identically exactly when the metric is locally Euclidean (flat), so curvature is the local invariant that detects intrinsic bending — distinguishing a sphere from a plane in a way no isometry can erase.`,
    definition: String.raw`Let $\nabla$ be the Levi-Civita connection of $(M, g)$. The **Riemann curvature tensor** is the map sending vector fields $X, Y, Z$ to
$$R(X, Y)Z = \nabla_X \nabla_Y Z - \nabla_Y \nabla_X Z - \nabla_{[X,Y]}Z.$$
It is $C^\infty(M)$-linear in each argument (the bracket term is exactly what cancels the non-tensorial pieces), hence defines at each point a tensor $R_p : T_pM \times T_pM \times T_pM \to T_pM$. Lowering an index, $R(X,Y,Z,W) := g(R(X,Y)Z, W)$ satisfies the symmetries $R(X,Y,Z,W) = -R(Y,X,Z,W) = -R(X,Y,W,Z) = R(Z,W,X,Y)$ together with the first **Bianchi identity** $R(X,Y)Z + R(Y,Z)X + R(Z,X)Y = 0$. The manifold is **flat** — locally isometric to Euclidean space — if and only if $R \equiv 0$.`,
  },
  {
    id: 'gaussian-curvature',
    label: 'Gaussian Curvature',
    title: 'Gaussian Curvature',
    kind: 'definition',
    tags: ['Differential Geometry'],
    dependencies: ['curvature', 'riemannian-metric', 'geodesic'],
    description: String.raw`For a surface — a Riemannian $2$-manifold — the full Riemann tensor collapses to a single number at each point, the **Gaussian curvature** $K$. It is positive where the surface is dome-like (a sphere), negative where it is saddle-like, and zero where it is locally flat (a plane or cylinder). Gauss's *Theorema Egregium* is the remarkable fact that $K$, though originally defined using the way the surface sits in space, depends only on the intrinsic metric — a flatlander could measure it without ever leaving the surface. This intrinsic curvature is what enters the Gauss–Bonnet theorem.`,
    definition: String.raw`Let $(S, g)$ be a Riemannian $2$-manifold with Riemann curvature tensor $R$ and Levi-Civita connection. At $p \in S$ choose any $g_p$-orthonormal basis $e_1, e_2$ of the tangent plane $T_pS$. The **Gaussian curvature** at $p$ is the sectional curvature of that plane,
$$K(p) = g_p\bigl(R(e_1, e_2)e_2,\; e_1\bigr).$$
By the symmetries of $R$ this value is independent of the chosen orthonormal basis, so $K : S \to \mathbb{R}$ is a well-defined smooth function determined entirely by $g$. (Equivalently, in geodesic normal coordinates centered at $p$ the metric expands as $g_{ij} = \delta_{ij} - \tfrac{1}{3}K\bigl(|x|^2\,\delta_{ij} - x_i x_j\bigr) + O(|x|^3)$, exhibiting $K$ as the leading deviation from flatness.)`,
  },
  {
    id: 'gauss-bonnet-theorem',
    label: 'Gauss–Bonnet',
    title: 'Gauss–Bonnet Theorem',
    kind: 'theorem',
    tags: ['Differential Geometry'],
    dependencies: ['gaussian-curvature', 'euler-characteristic', 'generalized-stokes-theorem', 'geodesic'],
    description: String.raw`The **Gauss–Bonnet theorem** is the prototype of a deep theme in geometry: a quantity defined by local curvature, when totaled over a whole space, equals a purely topological invariant. For a compact surface without boundary, integrating the Gaussian curvature gives $2\pi$ times the Euler characteristic — so however you bend or dent the surface, the *total* curvature cannot change. A sphere always integrates to $4\pi$, a torus always to $0$. Geometry is locally free but globally constrained by topology.`,
    statement: String.raw`Let $(S, g)$ be a compact, oriented Riemannian $2$-manifold without boundary, with Gaussian curvature $K$ and Riemannian area element $dA$. Then
$$\int_S K\, dA = 2\pi\,\chi(S),$$
where $\chi(S)$ is the Euler characteristic. More generally, for a geodesic triangle $T$ with interior angles $\alpha, \beta, \gamma$ the **local Gauss–Bonnet formula** holds: $\int_T K\, dA = \alpha + \beta + \gamma - \pi$.`,
    proof: String.raw`**Local formula.** For a region $T$ bounded by a piecewise-smooth curve, the local Gauss–Bonnet formula reads $\int_T K\, dA + \int_{\partial T} \kappa_g\, ds + \sum_i \theta_i = 2\pi$, where $\kappa_g$ is the geodesic curvature of the boundary and $\theta_i$ are the exterior angles at the corners. This is itself an instance of **Stokes' theorem**: in an orthonormal coframe the structure equation $d\omega_{12} = -K\,dA$ holds for the connection $1$-form $\omega_{12}$, and integrating it over $T$ via the **generalized Stokes theorem** converts $\int_T K\,dA$ into a boundary integral of $\omega_{12}$, which the geodesic curvature and the turning of the frame supply. For a geodesic triangle the edges are geodesics, so $\kappa_g \equiv 0$, and the exterior angles are $\pi - \alpha,\ \pi - \beta,\ \pi - \gamma$; the formula collapses to $\int_T K\, dA = (\alpha+\beta+\gamma) - \pi$.

**Globalization by triangulation.** Triangulate $S$ by geodesic triangles, with $V$ vertices, $E$ edges, and $F$ faces. Summing the local formula over all faces, the curvature integrals add to $\int_S K\, dA$. The angle terms regroup by vertex: around each vertex the interior angles of the triangles meeting there total $2\pi$, so the grand total of all interior angles over all faces is $2\pi V$. Each of the $F$ faces also contributes a $-\pi$. Hence
$$\int_S K\, dA = \sum_{\text{faces}}\!\bigl(\alpha + \beta + \gamma - \pi\bigr) = 2\pi V - \pi F.$$
Every triangle has $3$ edges and every edge is shared by exactly $2$ triangles, so $3F = 2E$, i.e. $\pi F = 3\pi F - 2\pi F = 2\pi E - 2\pi F$. Substituting,
$$\int_S K\, dA = 2\pi V - \pi F = 2\pi V - (2\pi E - 2\pi F) = 2\pi(V - E + F) = 2\pi\,\chi(S),$$
the last equality being the definition of the **Euler characteristic** from a triangulation. $\square$`,
  },
  {
    id: 'lie-group',
    label: 'Lie Group',
    title: 'Lie Group',
    kind: 'definition',
    tags: ['Differential Geometry'],
    dependencies: ['smooth-manifold', 'group', 'smooth-map'],
    description: String.raw`Continuous symmetry — rotating a sphere, translating space, rescaling — comes in families parametrized by a manifold rather than by a discrete set. A **Lie group** is the structure that fuses the two: a set that is simultaneously a group and a smooth manifold, with the group operations themselves smooth. This compatibility lets calculus and group theory interact, and it is enormously restrictive in a productive way — a Lie group is determined near the identity by its tangent space at the identity, its Lie algebra. The rotation groups $SO(n)$, the unitary groups $U(n)$, the general linear groups, and $\mathbb{R}^n$ under addition are the basic examples; Lie groups are the symmetry groups pervading geometry and physics.`,
    definition: String.raw`A **Lie group** is a smooth manifold $G$ that is also a group, such that the multiplication map $m : G \times G \to G$, $(a, b) \mapsto ab$, and the inversion map $\iota : G \to G$, $a \mapsto a^{-1}$, are **smooth** (with $G \times G$ given its product smooth structure). A **homomorphism of Lie groups** is a group homomorphism that is also a smooth map. For each $a \in G$ the **left translation** $L_a : g \mapsto ag$ is a diffeomorphism of $G$, so $G$ is homogeneous: its local geometry looks the same at every point, and any structure can be propagated from the identity by left translation.`,
  },
  {
    id: 'lie-algebra',
    label: 'Lie Algebra',
    title: 'Lie Algebra',
    kind: 'definition',
    tags: ['Differential Geometry'],
    dependencies: ['lie-group', 'tangent-space', 'vector-space'],
    description: String.raw`Differentiating a Lie group at its identity element produces its **Lie algebra**: the tangent space $T_eG$, the infinitesimal version of the group. The group's multiplication leaves on this tangent space a residue — the **Lie bracket** $[X, Y]$, an antisymmetric product measuring the failure of two infinitesimal motions to commute (for matrix groups it is the commutator $XY - YX$). The exponential map carries the algebra back into the group, and Lie's theorems show that for a connected, simply connected group the algebra determines the group up to isomorphism — so the curved, global problem of classifying symmetry groups reduces to the linear algebra of brackets.`,
    definition: String.raw`A **Lie algebra** over $\mathbb{R}$ is a vector space $\mathfrak{g}$ with a bilinear bracket $[\cdot, \cdot] : \mathfrak{g} \times \mathfrak{g} \to \mathfrak{g}$ that is **alternating**, $[X, X] = 0$ (hence antisymmetric $[X,Y] = -[Y,X]$), and satisfies the **Jacobi identity**
$$[X, [Y, Z]] + [Y, [Z, X]] + [Z, [X, Y]] = 0.$$
The **Lie algebra of a Lie group** $G$ is $\mathfrak{g} = T_eG$, the tangent space at the identity, equipped with the bracket transported from the commutator $[X, Y] = XY - YX$ of the corresponding left-invariant vector fields (a left-invariant field is determined by its value at $e$, and the bracket of two such fields is again left-invariant). Its dimension equals $\dim G$.`,
  },
  {
    id: 'poincare-lemma',
    label: 'Poincaré Lemma',
    title: 'Poincaré Lemma',
    kind: 'lemma',
    tags: ['Differential Geometry'],
    dependencies: ['differential-form', 'euclidean-space'],
    description: String.raw`On a flat, contractible region every form that *could* be a derivative actually is one: closedness ($d\omega = 0$) is not just necessary but sufficient for exactness ($\omega = d\eta$). The **Poincaré lemma** makes this precise and is the local input to all of de Rham theory — it says the de Rham cohomology of a ball vanishes in positive degrees, so any failure of closed forms to be exact is a *global*, topological phenomenon rather than a local one.`,
    statement: String.raw`Let $U \subseteq \mathbb{R}^n$ be open and **star-shaped** with respect to a point (in particular, convex, or any contractible open set). Then for every $k \ge 1$, every closed $k$-form on $U$ is exact: if $\omega$ is a smooth $k$-form with $d\omega = 0$, there is a smooth $(k-1)$-form $\eta$ on $U$ with $\omega = d\eta$. Equivalently, $H^k_{\mathrm{dR}}(U) = 0$ for all $k \ge 1$.`,
    proof: String.raw`Take $U$ star-shaped about the origin, so $tx \in U$ for $t \in [0,1]$, $x \in U$. Define the **homotopy operator** $h$ on $k$-forms: for $\omega = \sum_{I} f_I\, dx^{i_1}\wedge\cdots\wedge dx^{i_k}$ set
$$(h\omega)(x) = \sum_{I}\sum_{j=1}^{k} (-1)^{j-1}\Bigl(\int_0^1 t^{k-1} f_I(tx)\, dt\Bigr) x^{i_j}\, dx^{i_1}\wedge\cdots\wedge\widehat{dx^{i_j}}\wedge\cdots\wedge dx^{i_k},$$
a $(k-1)$-form on $U$. A direct computation, differentiating under the integral sign and using the **exterior derivative** axioms from **differential-form** (linearity, the Leibniz rule, and $d^2 = 0$), yields the **homotopy identity**
$$d(h\omega) + h(d\omega) = \omega \qquad (k \ge 1).$$
The single point where the integral is evaluated is the **Fundamental Theorem of Calculus**: the contraction $\frac{d}{dt}\bigl(t^k f_I(tx)\bigr) = k t^{k-1} f_I(tx) + t^k \sum_l \partial_l f_I(tx) x^l$ integrates from $0$ to $1$ to give $f_I(x)$ (the lower limit contributes $0$ because $k \ge 1$). Now if $d\omega = 0$, the identity collapses to $\omega = d(h\omega)$, so $\eta = h\omega$ exhibits $\omega$ as exact. $\square$`,
  },
  {
    id: 'de-rham-cohomology',
    label: 'De Rham Cohomology',
    title: 'De Rham Cohomology',
    kind: 'definition',
    tags: ['Differential Geometry'],
    dependencies: ['differential-form', 'poincare-lemma', 'vector-space'],
    description: String.raw`Because the exterior derivative satisfies $d^2 = 0$, every exact form is closed; **de Rham cohomology** measures the converse failure — the closed forms that are *not* exact. On a contractible region the Poincaré lemma kills all such classes, so a nonzero de Rham class is a witness to a global feature of the manifold: a hole that obstructs antidifferentiation. The quotient $\ker d / \operatorname{im} d$ in each degree is a real vector space, computed purely from calculus, yet — as de Rham's theorem will show — it sees exactly the same holes that algebraic topology sees.`,
    definition: String.raw`Let $M$ be a smooth manifold and $\Omega^k(M)$ the real vector space of smooth $k$-forms, with exterior derivative $d : \Omega^k(M) \to \Omega^{k+1}(M)$. A form is **closed** if $d\omega = 0$ and **exact** if $\omega = d\eta$ for some $\eta \in \Omega^{k-1}(M)$. Since $d \circ d = 0$ (from **differential-form**), every exact form is closed, $\operatorname{im}\bigl(d : \Omega^{k-1} \to \Omega^k\bigr) \subseteq \ker\bigl(d : \Omega^k \to \Omega^{k+1}\bigr)$. The **$k$-th de Rham cohomology** is the quotient vector space
$$H^k_{\mathrm{dR}}(M) = \frac{\ker\bigl(d : \Omega^k(M) \to \Omega^{k+1}(M)\bigr)}{\operatorname{im}\bigl(d : \Omega^{k-1}(M) \to \Omega^k(M)\bigr)}.$$
By the **Poincaré lemma**, $H^k_{\mathrm{dR}}(U) = 0$ for $k \ge 1$ when $U$ is contractible, and $H^0_{\mathrm{dR}}(M) \cong \mathbb{R}^{(\#\text{components})}$ since the closed $0$-forms are the locally constant functions.`,
  },
  {
    id: 'de-rham-theorem',
    label: 'De Rham Theorem',
    title: "De Rham's Theorem",
    kind: 'theorem',
    tags: ['Differential Geometry'],
    dependencies: ['de-rham-cohomology', 'poincare-lemma', 'cohomology', 'generalized-stokes-theorem', 'mayer-vietoris'],
    description: String.raw`**De Rham's theorem** is one of the great bridges in mathematics: the cohomology a manifold carries through *calculus* — closed forms modulo exact ones — is isomorphic to the cohomology it carries through *topology* — singular cohomology with real coefficients. Integration of forms over chains is the bridge: by Stokes' theorem, integrating a closed form over a cycle depends only on the homology class of the cycle, giving a pairing that turns out to be a perfect duality. So a hole detected by some loop you cannot fill is the same hole that obstructs a closed $1$-form from having a global potential. Calculus literally measures the topology.`,
    statement: String.raw`For every smooth manifold $M$ and every $k$, integration of forms over smooth chains induces a natural isomorphism of real vector spaces
$$H^k_{\mathrm{dR}}(M) \;\xrightarrow{\;\cong\;}\; H^k(M; \mathbb{R}),$$
where the right-hand side is singular cohomology with real coefficients. Under it the wedge product on de Rham classes corresponds to the cup product on singular cohomology.`,
    proof: String.raw`*(Sketch via the Mayer–Vietoris / sheaf-theoretic comparison; the two genuine inputs are named.)* Define the **de Rham map** $\mathcal{I}^k : H^k_{\mathrm{dR}}(M) \to H^k(M;\mathbb{R})$ by sending a closed $k$-form $\omega$ to the singular cochain $c \mapsto \int_c \omega$ on smooth $k$-simplices. This is well defined on cohomology by the **generalized Stokes theorem**: if $\omega = d\eta$ is exact then $\int_c \omega = \int_c d\eta = \int_{\partial c}\eta$ vanishes on cycles ($\partial c = 0$), and if $c = \partial b$ is a boundary then $\int_{\partial b}\omega = \int_b d\omega = 0$ for closed $\omega$; so the value depends only on the de Rham class and the homology class. Hence $\mathcal{I}^k$ is a well-defined natural transformation of cohomology theories.

To prove it an isomorphism, both $H^\bullet_{\mathrm{dR}}(-)$ and $H^\bullet(-;\mathbb{R})$ satisfy the Eilenberg–Steenrod-style axioms needed for an induction over an open cover: each sends disjoint unions to products, each carries a **Mayer–Vietoris long exact sequence** for an open cover $M = U \cup V$, and $\mathcal{I}$ commutes with the connecting maps of these sequences (again by Stokes). The induction's **base case** is precisely the **Poincaré lemma**: on a contractible open set $U$, $H^k_{\mathrm{dR}}(U) = 0 = H^k(U;\mathbb{R})$ for $k \ge 1$ and both equal $\mathbb{R}$ for $k = 0$, so $\mathcal{I}$ is an isomorphism there. Covering $M$ by contractible opens with contractible finite intersections (a *good cover*, which exists by taking geodesically convex balls for any Riemannian metric) and applying the **five lemma** to the Mayer–Vietoris ladder, an induction on the number of sets in the cover propagates the isomorphism from the pieces to all of $M$; a colimit argument extends it to manifolds not admitting a finite good cover. Compatibility of wedge with cup product is checked on the cochain level. $\square$`,
  },
]

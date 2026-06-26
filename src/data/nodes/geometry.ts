import type { MathNode } from '../types'

export const GEOMETRY_NODES: MathNode[] = [
  {
    id: 'euclidean-space',
    label: 'Euclidean Space ℝⁿ',
    title: 'Euclidean Space (ℝⁿ)',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['real-numbers', 'cartesian-product'],
    description: String.raw`Built on ZFC, geometry needs no primitive notions of its own. Euclidean $n$-space is the set of $n$-tuples of real numbers, equipped with the Euclidean distance. The plane ($n = 2$) and space ($n = 3$) are the familiar cases; points are tuples, lines and planes are solution sets of linear equations, and length, distance, and angle all flow from the coordinatewise product of vectors — the dot product, developed in linear algebra on top of this set. This is the model in which Euclid's and Hilbert's axioms become provable statements rather than assumptions.`,
    definition: String.raw`**Euclidean $n$-space** is the set $\mathbb{R}^n = \underbrace{\mathbb{R} \times \cdots \times \mathbb{R}}_{n}$ of $n$-tuples of real numbers, carrying the **Euclidean distance**
$$d(x, y) = |x - y| = \sqrt{\sum_{i=1}^{n} (x_i - y_i)^2}.$$
The pair $(\mathbb{R}^n, d)$ is the standard Euclidean space; that $d$ satisfies the metric axioms (in particular the triangle inequality, which is Cauchy–Schwarz for finite sums) is established once the **dot product** is in hand, since $d(x,y) = \sqrt{(x-y)\cdot(x-y)}$ is the distance induced by that inner product.`,
  },
  {
    id: 'euclidean-plane',
    label: 'Euclidean Plane ℝ²',
    title: 'Euclidean Plane (ℝ²)',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['euclidean-space'],
    description: String.raw`The Euclidean plane is the case $n = 2$ of Euclidean space: the coordinate pairs, with the usual distance. Here points are pairs and lines are solution sets of linear equations, so the synthetic axioms of plane geometry hold as provable theorems — uniting Euclid's synthetic geometry with Descartes' coordinate geometry in one structure.`,
    definition: String.raw`The **Euclidean plane** is Euclidean space at $n = 2$: the set $\mathbb{R}^2 = \mathbb{R} \times \mathbb{R}$ of ordered pairs, with distance
$$d\bigl((x_1, y_1), (x_2, y_2)\bigr) = \sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2}.$$
It inherits the metric structure of $(\mathbb{R}^n, d)$ at $n = 2$.`,
  },
  {
    id: 'point',
    label: 'Point',
    title: 'Point',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['euclidean-plane'],
    description: String.raw`Euclid's "that which has no part" becomes, in the analytic model, a single location in the coordinate plane. There is nothing primitive about it: a point is its tuple of coordinates, a set like any other in the ZFC universe.`,
    definition: String.raw`A **point** of the plane is an element of $\mathbb{R}^2$ — an ordered pair $(x, y)$ of real numbers, its **coordinates**. (More generally, a point of $\mathbb{R}^n$ is an $n$-tuple.) Two points are equal exactly when their coordinates agree.`,
  },
  {
    id: 'line',
    label: 'Line',
    title: 'Line',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['point'],
    description: String.raw`A line is not a primitive but a particular set of points: those satisfying one nondegenerate linear constraint. The implicit description (an equation $ax + by = c$) and the parametric description (a point plus a direction) coincide, and that equivalence is exactly what a line *is*.`,
    definition: String.raw`A **line** is a subset of $\mathbb{R}^2$ of the form
$$\ell = \{(x, y) \in \mathbb{R}^2 : a x + b y = c\}, \qquad (a, b) \neq (0, 0),$$
for real coefficients $a, b, c$. Equivalently $\ell = \{P + t\,v : t \in \mathbb{R}\}$ for some point $P \in \ell$ and **direction vector** $v \neq 0$.`,
    proof: String.raw`**The implicit and parametric descriptions coincide.** Let $\ell = \{(x,y) : ax + by = c\}$ with $(a,b) \neq (0,0)$. The associated homogeneous equation $ax + by = 0$ has solution set the one-dimensional space spanned by $v = (-b, a) \neq 0$ (indeed $a(-b) + b(a) = 0$, and any solution is a scalar multiple of $v$ since the linear map $(x,y)\mapsto ax+by$ has rank $1$). Pick any particular solution $P$ of $ax + by = c$ — one exists, e.g. $P = (ac, bc)/(a^2 + b^2)$ — so a point $(x,y)$ satisfies $ax + by = c$ iff $(x,y) - P$ satisfies the homogeneous equation, i.e. iff $(x,y) = P + tv$ for some $t \in \mathbb{R}$. Conversely, given $P$ and $v = (v_1, v_2) \neq 0$, the set $\{P + tv\}$ is cut out by the linear equation $-v_2 x + v_1 y = -v_2 P_1 + v_1 P_2$, whose coefficient pair $(-v_2, v_1) \neq (0,0)$. The two forms therefore describe the same subsets. $\square$`,
  },
  {
    id: 'collinear',
    label: 'Collinear Points',
    title: 'Collinearity',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['line', 'point', 'incidence'],
    description: String.raw`Points are collinear when a single line passes through all of them. For three points this has a clean algebraic test: the two displacement vectors from one of them are parallel, equivalently a certain determinant vanishes. Non-collinearity of three points is the condition that they form a genuine triangle.`,
    definition: String.raw`Points $P_1, \dots, P_k \in \mathbb{R}^2$ are **collinear** when there is a single **line** $\ell$ with $P_i \in \ell$ for all $i$. For three points $A, B, C$ with $A \neq B$, collinearity is equivalent to the vanishing of the determinant
$$\det\begin{pmatrix} B_1 - A_1 & C_1 - A_1 \\ B_2 - A_2 & C_2 - A_2 \end{pmatrix} = 0,$$
i.e. to $C - A$ being a scalar multiple of $B - A$.`,
    proof: String.raw`**The determinant test is correct.** Suppose $A \neq B$, so $u = B - A \neq 0$. The line through $A$ and $B$ is, by the parametric form of **line**, $\ell = \{A + t u : t \in \mathbb{R}\}$, the unique line containing both (uniqueness is established in **incidence**). Then $C$ is collinear with $A, B$ iff $C \in \ell$ iff $C - A = t u$ for some $t \in \mathbb{R}$, i.e. iff $w = C - A$ is a scalar multiple of $u$. Two vectors $u, w \in \mathbb{R}^2$ are linearly dependent iff the matrix with columns $u, w$ is singular, i.e. iff $\det(u \mid w) = u_1 w_2 - u_2 w_1 = 0$ — which is exactly the displayed determinant. $\square$`,
  },
  {
    id: 'incidence',
    label: 'Incidence',
    title: 'Incidence Theorems',
    kind: 'proposition',
    tags: ['Geometry'],
    dependencies: ['point', 'line', 'dot-product', 'orthogonality'],
    description: String.raw`In the analytic plane incidence is just set membership: a point lies on a line when it satisfies the line's equation. Hilbert's incidence axioms then become theorems about $\mathbb{R}^2$ — two distinct points lie on exactly one line, and two distinct lines meet in at most one point.`,
    statement: String.raw`Incidence is the relation $P \in \ell$ ("$P$ lies on $\ell$"). Then:
$$\text{(I1)}\quad \forall\, P \neq Q\ \exists!\,\ell\ (P \in \ell \wedge Q \in \ell);$$
$$\text{(I2)}\quad \text{two distinct lines have at most one common point.}$$`,
    proof: String.raw`**(I1) Existence.** Given distinct points $P, Q$, set $v = Q - P \neq 0$. By the parametric form of **line**, $\ell = \{P + t v : t \in \mathbb{R}\}$ is a line, and it contains $P$ (at $t = 0$) and $Q$ (at $t = 1$).

**(I1) Uniqueness.** Suppose lines $\ell, \ell'$ both contain $P$ and $Q$. Writing $\ell$ in implicit form $\{(x,y): a x + b y = c\}$, the two equations $aP_1 + bP_2 = c$ and $aQ_1 + bQ_2 = c$ subtract to $a(Q_1 - P_1) + b(Q_2 - P_2) = 0$, i.e. $(a,b)\cdot v = 0$; since $(a,b) \neq (0,0)$ and $v \neq 0$ in $\mathbb{R}^2$, $(a,b)$ is determined up to scale by being orthogonal to $v$, and then $c = aP_1 + bP_2$ is determined too. The same holds for $\ell'$, so $\ell'$ has a defining equation that is a scalar multiple of $\ell$'s, whence $\ell = \ell'$ as sets.

**(I2).** Let $\ell \neq \ell'$ share two distinct points $P, Q$. By the uniqueness just proved, $\ell$ and $\ell'$ would then both equal the unique line through $P, Q$, contradicting $\ell \neq \ell'$. Hence distinct lines meet in at most one point. $\square$`,
  },
  {
    id: 'betweenness',
    label: 'Betweenness',
    title: 'Betweenness',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['line', 'collinear'],
    description: String.raw`Betweenness is defined by convex combination: $C$ lies between $A$ and $B$ when it sits strictly inside the segment, at a proper interior ratio. This linearly orders the points of each line and lets Hilbert's order axioms — including Pasch's — be proved rather than assumed.`,
    definition: String.raw`For distinct points $A \neq B$, a point $C$ is **between** $A$ and $B$, written $A * C * B$, when
$$C = (1 - t)A + tB \quad \text{for some } t \in (0, 1).$$
Equivalently, $C$ is collinear with $A, B$ and lies strictly inside the segment they bound.`,
    proof: String.raw`**Betweenness implies collinearity, and orders each line.** If $C = (1-t)A + tB$ then $C - A = t(B - A)$, a scalar multiple of $B - A$, so by the determinant criterion of **collinear** the points $A, B, C$ are collinear. Now fix any line $\ell$ and a parametrization $\varphi(s) = P + s\,w$ ($w \neq 0$) identifying $\ell$ with $\mathbb{R}$ via the parameter $s$; this identification is an affine bijection, so for points $X = \varphi(x)$ and $Z = \varphi(z)$ on $\ell$ a third point $Y = \varphi(y)$ satisfies $Y = (1-t)X + tZ$ with $t \in (0,1)$ exactly when $y = (1-t)x + tz$, i.e. exactly when $y$ lies strictly between the reals $x$ and $z$. Thus for ANY labeling of three distinct collinear points, the convex-combination notion of betweenness reduces to strict order-betweenness of their parameters. For three distinct reals $x, y, z$ exactly one lies strictly between the other two; transporting this back along $\varphi$, exactly one of three distinct collinear points lies between the other two, and the relation is independent of the chosen parametrization since two parametrizations differ by an order-preserving or order-reversing affine map, both of which preserve strict betweenness. $\square$`,
  },
  {
    id: 'line-segment',
    label: 'Line Segment',
    title: 'Line Segment',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['betweenness', 'euclidean-space'],
    description: String.raw`A segment is the two endpoints together with every point between them — a convex set carrying a length. A ray instead extends indefinitely past one endpoint. Both are sliced out of a line by an inequality on the parameter.`,
    definition: String.raw`The **line segment** $\overline{AB}$ joining $A \neq B$ is the set of convex combinations
$$\overline{AB} = \{(1 - t)A + tB : t \in [0, 1]\},$$
its endpoints together with all points between them. Its **length** is $|AB| = d(A, B)$, the Euclidean distance. The **ray** from $A$ through $B$ is $\{(1 - t)A + tB : t \ge 0\}$, allowing all non-negative $t$.`,
  },
  {
    id: 'isometry',
    label: 'Isometry',
    title: 'Isometry of Euclidean Space',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['euclidean-space', 'dot-product'],
    description: String.raw`An isometry is a rigid motion: a map of Euclidean space to itself that preserves all distances. Such maps form a group, and every one of them is an affine map $x \mapsto Qx + b$ with $Q$ orthogonal — a rotation or reflection followed by a translation. Isometries are exactly the transformations under which two figures count as congruent.`,
    definition: String.raw`An **isometry** of $\mathbb{R}^n$ is a distance-preserving map $f : \mathbb{R}^n \to \mathbb{R}^n$,
$$|f(x) - f(y)| = |x - y| \qquad \text{for all } x, y \in \mathbb{R}^n.$$
Equivalently — as a theorem — $f(x) = Q x + b$ for a fixed $b \in \mathbb{R}^n$ and an **orthogonal** matrix $Q$ (one with $Q^{\mathsf T} Q = I$). Isometries are bijections, closed under composition and inverse, forming the **Euclidean group**. (No surjectivity need be assumed: a distance-preserving self-map of $\mathbb{R}^n$ is automatically bijective, as the proof shows.)`,
    proof: String.raw`**Every isometry has the form $x \mapsto Qx + b$ with $Q$ orthogonal.** Let $f$ be a distance-preserving self-map of $\mathbb{R}^n$ and set $g(x) = f(x) - f(0)$, so $g(0) = 0$ and $g$ is still distance-preserving. First, $g$ preserves the **dot product**: for all $x$, $|g(x)|^2 = |g(x) - g(0)|^2 = |x - 0|^2 = |x|^2$, and from $|g(x) - g(y)|^2 = |x - y|^2$, expanding both sides via bilinearity of the dot product and cancelling the equal squared-norm terms gives $g(x)\cdot g(y) = x\cdot y$. Hence, with $e_1, \dots, e_n$ the standard basis, the vectors $g(e_i)$ are orthonormal. Writing $Q$ for the matrix with columns $g(e_i)$, we have $Q^{\mathsf T} Q = I$, so $Q$ is orthogonal. Finally $g$ is linear and equals $Q$: for any $x = \sum_i x_i e_i$, the vector $g(x) - Qx$ has zero dot product with every $g(e_j)$ (since $g(x)\cdot g(e_j) = x\cdot e_j = x_j = (Qx)\cdot g(e_j)$), and the $g(e_j)$ span $\mathbb{R}^n$, so $g(x) = Qx$. Therefore $f(x) = Qx + b$ with $b = f(0)$. Surjectivity was never used; and since $Q^{\mathsf T} Q = I$ makes $Q$ invertible, $f$ is automatically a bijection with inverse $x \mapsto Q^{\mathsf T}(x - b)$. Such maps preserve distance, so they are exactly the distance-preserving self-maps of $\mathbb{R}^n$. $\square$`,
  },
  {
    id: 'congruence',
    label: 'Congruence',
    title: 'Congruence',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['line-segment', 'isometry'],
    description: String.raw`Congruence is sameness of shape and size: two figures are congruent when a rigid motion of the plane carries one exactly onto the other. For segments this reduces to equality of length. With congruence defined through the isometry group, Hilbert's congruence axioms — segment transport and the SAS criterion — become provable.`,
    definition: String.raw`Two subsets $F, G \subseteq \mathbb{R}^2$ are **congruent**, written $F \cong G$, when there is an **isometry** $f$ of the plane with $f(F) = G$. In particular two segments are congruent iff they have equal length, $\overline{AB} \cong \overline{CD} \iff |AB| = |CD|$.`,
    proof: String.raw`**Congruence is an equivalence relation, and for segments it is equality of length.** Reflexivity, symmetry, and transitivity follow because the **isometry** maps form a group: the identity fixes $F$; if $f(F) = G$ then $f^{-1}(G) = F$; and if $f(F) = G$, $h(G) = H$ then $(h \circ f)(F) = H$. For segments: if $f$ is an isometry with $f(\overline{AB}) = \overline{CD}$, it must send endpoints to endpoints (the endpoints are the only points not strictly between two others of the set), so $\{f(A), f(B)\} = \{C, D\}$ and $|CD| = |f(A)f(B)| = |AB|$ since $f$ preserves distance. Conversely if $|AB| = |CD|$, the isometry $f(x) = Q x + b$ that sends $A \mapsto C$ and the unit direction $(B - A)/|AB| \mapsto (D - C)/|CD|$ (extend this single unit vector to an orthonormal basis to obtain the orthogonal matrix $Q$, and set $b = C - QA$) carries $\overline{AB}$ onto $\overline{CD}$, since it fixes the endpoint correspondence and $B \mapsto C + |AB|\,(D - C)/|CD| = D$ using $|AB| = |CD|$. $\square$`,
  },
  {
    id: 'angle',
    label: 'Angle',
    title: 'Angle',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['line-segment', 'dot-product', 'cauchy-schwarz', 'sine-cosine', 'pi-and-periodicity'],
    description: String.raw`An angle is the figure formed by two rays from a common vertex. Its measure is the arccosine of the normalized dot product of the two side directions, where $\arccos$ is the inverse of cosine on $[0,\pi]$. The cosine here is the analytic function built upstream from its power series, so there is no circularity. Cauchy–Schwarz guarantees the normalized dot product lies in $[-1,1]$, the domain of $\arccos$, so the measure is well-defined.`,
    definition: String.raw`An **angle** $\angle BAC$ is the figure formed by two rays sharing the endpoint $A$ (the **vertex**), through points $B$ and $C$ (the **sides**). With direction vectors $u = B - A$ and $v = C - A$ (both nonzero), its **measure** is
$$\theta := \arccos\!\left(\frac{u \cdot v}{|u|\,|v|}\right) \in [0, \pi],$$
where $\arccos : [-1,1] \to [0,\pi]$ is the inverse of the analytic cosine of **sine-cosine** restricted to $[0,\pi]$. The angle is **right** when $\theta = \tfrac{\pi}{2}$ (equivalently $u \cdot v = 0$), **acute** when $\theta \in (0, \tfrac{\pi}{2})$ (equivalently $u \cdot v > 0$ and $u, v$ not positively parallel), **obtuse** when $\theta \in (\tfrac{\pi}{2}, \pi)$ (equivalently $u \cdot v < 0$ and $v$ not a negative multiple of $u$), and **straight** when $\theta = \pi$ (equivalently $v$ is a negative multiple of $u$).`,
    proof: String.raw`**The measure is well-defined.** The ratio $(u\cdot v)/(|u|\,|v|)$ is unaffected by which positive scaling of $u, v$ is chosen along each ray, so it depends only on the two rays. It lies in $[-1, 1]$: by **Cauchy–Schwarz** applied to the **dot product** (a genuine inner product on $\mathbb{R}^n$), $|u\cdot v| \le |u|\,|v|$ with $|u|, |v| > 0$, hence $-1 \le (u\cdot v)/(|u||v|) \le 1$. By **pi-and-periodicity**, the analytic cosine of **sine-cosine** restricts to a continuous strictly decreasing bijection $\cos : [0,\pi] \to [-1,1]$; its inverse $\arccos : [-1,1] \to [0,\pi]$ therefore exists and is single-valued, so $\theta = \arccos\bigl((u\cdot v)/(|u||v|)\bigr)$ is the unique element of $[0,\pi]$ with $\cos\theta = (u\cdot v)/(|u||v|)$. Since this construction defines $\cos$ analytically and upstream of the present node, the definition is not circular. The four classification cases partition $[0,\pi]$ — $\{0\} \cup (0,\tfrac{\pi}{2}) \cup \{\tfrac{\pi}{2}\} \cup (\tfrac{\pi}{2},\pi) \cup \{\pi\}$, with the degenerate $\theta = 0$ (positively parallel rays) excluded from the named classes — and because $\cos$ is strictly decreasing on $[0,\pi]$ with $\cos\tfrac{\pi}{2} = 0$, the sign of $u\cdot v$ matches each case as stated. $\square$`,
  },
  {
    id: 'angle-addition-rays',
    label: 'Angle Addition for Rays',
    title: 'Angle Addition for Rays on One Side',
    kind: 'proposition',
    tags: ['Geometry'],
    dependencies: ['angle', 'dot-product', 'sine-cosine', 'pi-and-periodicity', 'isometry', 'angle-addition-formulas'],
    description: String.raw`Angle measure is additive for a ray that lies strictly between two others. If a ray $X$ from the vertex lies inside the open cone spanned by rays $P$ and $Q$ — concretely $X = aP + bQ$ with $a, b > 0$ — then the measure of the wide angle $\angle(P,Q)$ is the sum of the two sub-angles $\angle(P,X)$ and $\angle(X,Q)$. This is the genuine "betweenness of rays" lemma that lets several Euclidean angle computations (notably the triangle angle sum) decompose a straight angle into consecutive pieces. The proof reduces, via a rotation, to the half-plane parametrization $V = (\cos t, \sin t)$ with $t = \angle(P,V)$, where additivity becomes the arithmetic identity $(t_Q - 0) = (t_X - 0) + (t_Q - t_X)$.`,
    statement: String.raw`Let $P, Q \in \mathbb{R}^n$ be nonzero with $Q$ not a positive scalar multiple of $P$, and let
$$X = aP + bQ, \qquad a, b > 0,$$
with $X \neq 0$ (automatic when $P, Q$ are linearly independent), so the ray of direction $X$ lies strictly inside the open cone spanned by $P$ and $Q$. Then, with $\angle(\,\cdot\,,\cdot\,)$ the **angle** measure of two rays from a common vertex,
$$\angle(P, Q) = \angle(P, X) + \angle(X, Q).$$`,
    proof: String.raw`Angle measure depends only on the rays, i.e. on the unit vectors $\hat P, \hat Q, \hat X$, and is invariant under any **isometry** fixing the vertex: an isometry $f(x) = Mx$ with $M$ orthogonal preserves the **dot product**, $Mx\cdot My = x\cdot y$, hence preserves norms and the ratio $(u\cdot v)/(|u||v|)$, hence the angle. We use this to normalize.

**Reduction to the plane and to a standard position.** Since $Q$ is not a positive multiple of $P$, the vectors $P, Q$ are either negatively parallel or linearly independent. In either case the three vectors $P, Q, X = aP + bQ$ all lie in the subspace $W = \operatorname{span}(P, Q)$, of dimension $1$ or $2$; embed $W$ in a coordinate plane and choose an orthogonal $M$ (a rotation of that plane, extended by the identity on $W^{\perp}$) carrying $\hat P$ to $(1, 0, 0, \dots)$ and the component of $\hat Q$ orthogonal to $\hat P$ to a nonnegative multiple of $(0, 1, 0, \dots)$. After applying $M$ we may therefore assume
$$\hat P = (1, 0), \qquad \hat Q = (\cos\theta, \sin\theta) \ \text{ with } \sin\theta \ge 0,$$
working in the plane $W$ (writing only the two relevant coordinates), where $\theta = \angle(P, Q) \in [0, \pi]$: indeed $\hat P\cdot\hat Q = \cos\theta$ and, by the **angle** definition, $\angle(P,Q) = \arccos(\hat P\cdot\hat Q) = \theta$ because $\theta \in [0,\pi]$ and $\cos$ is a bijection there (**pi-and-periodicity**). Since $Q$ is not a positive multiple of $P$ we have $\theta > 0$.

**The half-plane parametrization.** Claim: every unit vector $V = (v_1, v_2)$ with $v_2 \ge 0$ equals $(\cos t, \sin t)$ for the unique $t = \angle(P, V) \in [0, \pi]$. By **pi-and-periodicity**, $\cos : [0,\pi] \to [-1,1]$ is a strictly decreasing bijection, so there is a unique $t \in [0,\pi]$ with $\cos t = v_1$ ($v_1 \in [-1,1]$ since $|V| = 1$); on $[0,\pi]$ one has $\sin t \ge 0$ (by the **sine-cosine** sign behaviour established in **pi-and-periodicity**: $\sin$ rises from $0$ to $1$ on $[0,\tfrac{\pi}{2}]$ and falls back to $0$ on $[\tfrac{\pi}{2},\pi]$, staying $\ge 0$), and $\sin t = \sqrt{1 - \cos^2 t} = \sqrt{1 - v_1^2} = |v_2| = v_2$. Thus $V = (\cos t, \sin t)$, and $t = \arccos(v_1) = \arccos(\hat P\cdot V) = \angle(P, V)$.

**The intermediate ray lies in the upper half-plane, in order.** Write $X = a'\hat P + b'\hat Q$ with $a' = a\,|P| > 0$ and $b' = b\,|Q| > 0$ (so $X$ and $aP + bQ$ are positive multiples of one another, hence the same ray and the same $\hat X$). Its second coordinate is $a'\cdot 0 + b'\sin\theta = b'\sin\theta \ge 0$, so $\hat X$ lies in the closed upper half-plane and the parametrization applies: $\hat X = (\cos s, \sin s)$ with $s = \angle(P, X) \in [0,\pi]$. To order the three parameters we use the bilinear, antisymmetric planar cross product $u \times v := u_1 v_2 - u_2 v_1$, for which $\hat P \times \hat Q = \sin\theta \ge 0$. Then
$$\hat P \times \hat X = \tfrac{1}{|X|}\,\hat P \times (a'\hat P + b'\hat Q) = \tfrac{b'}{|X|}\,(\hat P \times \hat Q) = \tfrac{b'\sin\theta}{|X|} \ge 0,$$
$$\hat X \times \hat Q = \tfrac{1}{|X|}\,(a'\hat P + b'\hat Q) \times \hat Q = \tfrac{a'}{|X|}\,(\hat P \times \hat Q) = \tfrac{a'\sin\theta}{|X|} \ge 0,$$
using $\hat P\times\hat P = \hat Q\times\hat Q = 0$. Now compute these cross products from the parametrizations: $\hat P \times \hat X = (1)(\sin s) - (0)(\cos s) = \sin s$, and $\hat X \times \hat Q = \cos s\,\sin\theta - \sin s\,\cos\theta = \sin(\theta - s)$. Hence $\sin s \ge 0$ (consistent with $s \in [0,\pi]$) and $\sin(\theta - s) \ge 0$. Since $s, \theta \in [0,\pi]$ we have $\theta - s \in [-\pi, \pi]$, where $\sin \ge 0$ forces $\theta - s \in [0, \pi]$ (the only other possibility, $\theta - s = -\pi$, would require $\theta = 0$, excluded as $\theta > 0$). Therefore $0 \le s \le \theta$.

**Additivity.** With $\hat P$ at parameter $0$, $\hat X$ at parameter $s$, and $\hat Q$ at parameter $\theta$, and $0 \le s \le \theta \le \pi$, the second sub-angle is
$$\angle(X, Q) = \arccos(\hat X\cdot\hat Q) = \arccos\big(\cos s\cos\theta + \sin s\sin\theta\big) = \arccos\big(\cos(\theta - s)\big) = \theta - s,$$
using the cosine difference formula and that $\theta - s \in [0, \pi]$, where $\arccos\circ\cos$ is the identity. Therefore
$$\angle(P, X) + \angle(X, Q) = s + (\theta - s) = \theta = \angle(P, Q),$$
which is the asserted additivity. $\square$`,
  },
  {
    id: 'triangle',
    label: 'Triangle',
    title: 'Triangle',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['line-segment', 'angle', 'collinear'],
    description: String.raw`A triangle is the figure determined by three non-collinear points joined pairwise by segments, enclosing three interior angles. It is the basic rigid figure of the plane, fixed up to congruence by suitable data (SAS, ASA, SSS). In the Euclidean plane its angles sum to a straight angle — a fact equivalent to the parallel postulate, and false in the non-Euclidean models.`,
    definition: String.raw`A **triangle** is determined by three **non-collinear** points $A, B, C$ — its **vertices** — together with the three segments $\overline{AB}, \overline{BC}, \overline{CA}$ — its **sides** — and the three interior **angles** $\angle A, \angle B, \angle C$ at the vertices. Non-collinearity (the determinant of **collinear** being nonzero) ensures the figure is genuinely two-dimensional, with positive area $\tfrac12\,\bigl|\det(B - A \mid C - A)\bigr|$.`,
  },
  {
    id: 'parallel-lines',
    label: 'Parallel Lines',
    title: 'Parallel Lines',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['line'],
    description: String.raw`Two lines are parallel when they never meet — or, by convention, are equal. In coordinates this is exactly the condition that they have the same direction (proportional direction vectors, equivalently proportional coefficient pairs in their equations).`,
    definition: String.raw`Two **lines** $\ell, \ell'$ are **parallel**, written $\ell \parallel \ell'$, when $\ell = \ell'$ or $\ell \cap \ell' = \varnothing$. Writing $\ell = \{a x + b y = c\}$ and $\ell' = \{a' x + b' y = c'\}$, this holds iff the coefficient pairs are proportional: $(a', b') = \lambda(a, b)$ for some $\lambda \neq 0$, equivalently iff their direction vectors are scalar multiples of one another.`,
    proof: String.raw`**The coordinate criterion is correct.** The intersection $\ell \cap \ell'$ is the solution set of the $2 \times 2$ linear system with coefficient matrix $M = \begin{pmatrix} a & b \\ a' & b' \end{pmatrix}$ and right side $(c, c')$. If $\det M = ab' - a'b \neq 0$, the system has a unique solution, so the lines meet in exactly one point — not parallel. If $\det M = 0$, the rows are proportional (as $(a,b) \neq 0$), say $(a', b') = \lambda(a, b)$; then either $c' = \lambda c$, making the equations equivalent and $\ell = \ell'$, or $c' \neq \lambda c$, making the system inconsistent and $\ell \cap \ell' = \varnothing$. In both sub-cases $\ell \parallel \ell'$. Hence parallelism is equivalent to $\det M = 0$, i.e. to proportional coefficient (equivalently direction) vectors. $\square$`,
  },
  {
    id: 'parallel-postulate',
    label: 'Parallel Postulate',
    title: 'Parallel Postulate (Playfair)',
    kind: 'theorem',
    tags: ['Geometry'],
    dependencies: ['incidence', 'parallel-lines', 'line', 'point'],
    description: String.raw`In the analytic plane, Playfair's form of Euclid's fifth postulate is a theorem: through a point off a line there passes exactly one parallel to it. Its fame is as the axiom *independent* of Hilbert's others — keeping incidence, order, and congruence while admitting many parallels yields a consistent hyperbolic geometry (the Poincaré disk, built inside ZFC), so the postulate is not derivable from them; admitting none gives elliptic geometry. Settling that independence was a turning point in mathematics. But in the *coordinate* model $\mathbb{R}^2$, where the metric is fixed, it simply holds.`,
    statement: String.raw`**Playfair's axiom.** For every line $\ell \subseteq \mathbb{R}^2$ and every point $P \notin \ell$, there is exactly one line $\ell'$ with $P \in \ell'$ and $\ell' \parallel \ell$.`,
    proof: String.raw`Write $\ell = \{(x,y) : a x + b y = c\}$ with $(a,b) \neq (0,0)$, and let $P = (p, q) \notin \ell$, so $a p + b q \neq c$.

**Existence.** Set $c' = a p + b q$ and $\ell' = \{(x,y) : a x + b y = c'\}$. This is a **line** (same nonzero coefficient pair), it contains $P$ by construction, and its coefficient pair equals $\ell$'s, so $\ell' \parallel \ell$ by the criterion of **parallel-lines**. Moreover $\ell' \neq \ell$ since $c' \neq c$.

**Uniqueness.** Suppose $m$ is any line through $P$ parallel to $\ell$. By **parallel-lines**, $m$ has a defining equation with coefficient pair proportional to $(a, b)$; rescaling, write $m = \{a x + b y = c''\}$. Since $P \in m$, $c'' = a p + b q = c'$, so $m = \ell'$. (Two lines with the same defining equation are equal as sets — the converse of the multiplicity noted in **incidence**.) Hence the parallel through $P$ is unique. $\square$`,
  },
  {
    id: 'triangle-angle-sum',
    label: 'Triangle Angle Sum',
    title: 'Triangle Angle Sum',
    kind: 'theorem',
    tags: ['Geometry'],
    dependencies: ['triangle', 'angle', 'parallel-postulate', 'parallel-lines', 'angle-addition-rays', 'collinear', 'determinant'],
    description: String.raw`The three interior angles of a Euclidean triangle sum to a straight angle, $\pi$. The proof draws through one vertex the line parallel to the opposite side; the two pairs of alternate angles it creates equal the other two interior angles, and together with the angle at the vertex they fill out the straight angle along the drawn line. This fact is equivalent to the parallel postulate and fails in the non-Euclidean models.`,
    statement: String.raw`Let $ABC$ be a **triangle** with interior **angle** measures $\alpha = \angle A$, $\beta = \angle B$, $\gamma = \angle C$. Then
$$\alpha + \beta + \gamma = \pi.$$`,
    proof: String.raw`Work with the side directions at each vertex as in **angle**. Set $u = B - A$, $v = C - A$, and $w = C - B$, so the three are nonzero (the vertices are distinct) and satisfy the identity
$$v = u + w, \qquad \text{since } u + w = (B - A) + (C - B) = C - A = v.$$
Through $A$ draw the line $m$ parallel to the opposite side $BC$; by **parallel-postulate** such a parallel exists, and by **parallel-lines** its direction is that of $BC$, namely $w$. On $m$ take the two opposite rays from $A$ with directions $w$ and $-w$.

**The three angles at $A$ sum to $\pi$.** We claim
$$\angle(-w, u) + \angle(u, v) + \angle(v, w) = \pi,$$
where $\angle(\,\cdot\,,\cdot\,)$ denotes the **angle** of two rays from $A$. First, the two end rays $-w$ and $w$ are antiparallel, and for any nonzero $u$,
$$\angle(-w, u) + \angle(u, w) = \arccos\!\Big(\!-\tfrac{w\cdot u}{|w|\,|u|}\Big) + \arccos\!\Big(\tfrac{w\cdot u}{|w|\,|u|}\Big) = \pi,$$
using the identity $\arccos(-t) + \arccos(t) = \pi$ for $t \in [-1,1]$ (immediate from $\cos(\pi - \alpha) = -\cos\alpha$ and the $\arccos$ range $[0,\pi]$). Second, by non-collinearity of $A, B, C$ the determinant $\det(u \mid v) = u_1 v_2 - u_2 v_1 \neq 0$ (criterion of **collinear**, via **determinant**); since $u \times w := u_1 w_2 - u_2 w_1 = u \times (v - u) = u \times v = \det(u\mid v) \neq 0$, the vectors $u$ and $w$ are linearly independent, so $w$ is not a positive multiple of $u$. As $v = 1\cdot u + 1\cdot w$ is a positive combination of $u$ and $w$, **angle-addition-rays** (with $P = u$, $Q = w$, $X = v$) gives
$$\angle(u, w) = \angle(u, v) + \angle(v, w).$$
Combining the two displays, $\angle(-w, u) + \angle(u, v) + \angle(v, w) = \angle(-w, u) + \angle(u, w) = \pi$.

**Identifying the three angles with the interior angles.** The middle angle $\angle(u, v)$ is the interior angle $\alpha = \angle A$ by the definition of **angle**. The angle $\angle(-w, u)$ equals the interior angle $\beta = \angle B$ — the angle at $B$ between $\overrightarrow{BA}$ (direction $A - B = -u$) and $\overrightarrow{BC}$ (direction $C - B = w$) — because the two share a cosine:
$$\frac{(-w)\cdot u}{|w|\,|u|} = \frac{(-u)\cdot w}{|u|\,|w|},$$
the numerators both being $-(u\cdot w)$, so by the well-definedness of **angle** the measures coincide. Likewise $\angle(v, w)$ equals $\gamma = \angle C$ — the angle at $C$ between $\overrightarrow{CA}$ (direction $A - C = -v$) and $\overrightarrow{CB}$ (direction $B - C = -w$) — since
$$\frac{v\cdot w}{|v|\,|w|} = \frac{(-v)\cdot(-w)}{|v|\,|w|}.$$
Substituting these three identifications into the claim, $\beta + \alpha + \gamma = \pi$, i.e. $\alpha + \beta + \gamma = \pi$. $\square$`,
  },
  {
    id: 'circle',
    label: 'Circle',
    title: 'Circle',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['point', 'euclidean-plane'],
    description: String.raw`A circle is the locus of points at a fixed distance — the radius — from a fixed centre. Squaring the distance gives its familiar implicit equation. In the Euclidean plane the ratio of any circle's circumference to its diameter is the universal constant $\pi$.`,
    definition: String.raw`The **circle** with centre $O = (a, b)$ and radius $r > 0$ is the set of points at distance $r$ from $O$:
$$C(O, r) = \{\,P \in \mathbb{R}^2 : |OP| = r\,\} = \{\,(x, y) : (x - a)^2 + (y - b)^2 = r^2\,\}.$$
The two descriptions agree because $|OP| = r \ge 0$ iff $|OP|^2 = r^2$, and $|OP|^2 = (x - a)^2 + (y - b)^2$ by the Euclidean distance.`,
  },
  {
    id: 'pythagorean-theorem',
    label: 'Pythagorean Theorem',
    title: 'Pythagorean Theorem',
    kind: 'theorem',
    tags: ['Geometry'],
    dependencies: ['triangle', 'angle', 'dot-product'],
    description: String.raw`In a right triangle the squares on the two legs sum to the square on the hypotenuse. In the coordinate plane this is a one-line consequence of the dot product: it is exactly the statement that the legs meet at a right angle, the cross term in the expansion of the squared length of the hypotenuse vanishing precisely when the legs are perpendicular. Over the remaining axioms it is equivalent to the parallel postulate, and it is the source of the Euclidean distance formula.`,
    statement: String.raw`Let $ABC$ be a triangle with the right angle at $C$ (so $\angle C = \tfrac{\pi}{2}$), with legs $a = |BC|$, $b = |CA|$ and hypotenuse $c = |AB|$. Then
$$a^2 + b^2 = c^2.$$`,
    proof: String.raw`Place the right-angle vertex and form the leg vectors $u = A - C$ and $v = B - C$, so $b = |u|$ and $a = |v|$. The right angle at $C$ means, by the definition of **angle**, that the side directions are orthogonal: $\cos(\angle C) = (u\cdot v)/(|u||v|) = \cos(\tfrac{\pi}{2}) = 0$, hence $u \cdot v = 0$. The hypotenuse is $\overline{AB}$ with $A - B = u - v$, so using bilinearity and symmetry of the **dot product**,
$$c^2 = |A - B|^2 = (u - v)\cdot(u - v) = u\cdot u - 2\,(u\cdot v) + v\cdot v = |u|^2 + |v|^2 = b^2 + a^2,$$
the cross term $2(u\cdot v)$ vanishing exactly because the legs are perpendicular. Thus $a^2 + b^2 = c^2$. $\square$`,
  },
]

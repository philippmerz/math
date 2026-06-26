import type { MathNode } from '../types'

export const GEOMETRY_NODES: MathNode[] = [
  {
    id: 'euclidean-plane',
    label: 'Euclidean Plane ℝ²',
    title: 'Euclidean Plane (ℝ²)',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['real-numbers', 'cartesian-product'],
    definition: String.raw`Built on ZFC, plane geometry has no primitive notions of its own: the plane *is* the set $\mathbb{R}^2 = \mathbb{R} \times \mathbb{R}$ of coordinate pairs, equipped with the distance
$$d\bigl((x_1, y_1), (x_2, y_2)\bigr) = \sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2}.$$
Points are pairs, lines are solution sets of linear equations, and Euclid's axioms hold as provable theorems — the analytic model that unites synthetic and coordinate geometry (and generalizes to $\mathbb{R}^n$).`,
  },
  {
    id: 'point',
    label: 'Point',
    title: 'Point',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['euclidean-plane'],
    definition: String.raw`A **point** of the plane is simply an element of $\mathbb{R}^2$ — an ordered pair $(x, y)$ of real numbers recording its coordinates (in $\mathbb{R}^n$, an $n$-tuple). Built on ZFC there is nothing primitive about it: a point *is* its tuple of coordinates, a set like any other. Euclid's "that which has no part" becomes a single location in the coordinate plane.`,
  },
  {
    id: 'line',
    label: 'Line',
    title: 'Line',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['point'],
    definition: String.raw`A **line** is not a primitive but a particular *set* of points: the solutions in $\mathbb{R}^2$ of a nondegenerate linear equation,
$$\ell = \{(x, y) \in \mathbb{R}^2 : a x + b y = c\}, \qquad (a, b) \neq (0, 0),$$
equivalently the set $\{P + t\,v : t \in \mathbb{R}\}$ through a point $P$ in a direction $v \neq 0$. It is exactly the points of the plane meeting one linear constraint.`,
  },
  {
    id: 'incidence',
    label: 'Incidence',
    title: 'Incidence',
    kind: 'theorem',
    tags: ['Geometry'],
    dependencies: ['point', 'line'],
    definition: String.raw`In the analytic plane **incidence** is just set membership: a point lies on a line when it satisfies the line's equation, $P \in \ell$. The classical incidence facts are then provable, not assumed —
$$\forall P \neq Q\;\exists!\,\ell\,(P \in \ell \wedge Q \in \ell),$$
two distinct points lie on exactly one line, and two distinct lines meet in at most one point — so Hilbert's incidence axioms become theorems about $\mathbb{R}^2$.`,
  },
  {
    id: 'betweenness',
    label: 'Betweenness',
    title: 'Betweenness',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['line'],
    definition: String.raw`**Betweenness** is defined by convex combination: for distinct points $A \neq B$, a point $C$ lies between them when
$$C = (1 - t)A + tB \quad \text{for some } 0 < t < 1.$$
This linearly orders the points of each line and, relative to any line, separates the rest of the plane into two half-planes, so Hilbert's order axioms — including Pasch's — hold as theorems in $\mathbb{R}^2$ rather than being assumed.`,
  },
  {
    id: 'line-segment',
    label: 'Line Segment',
    title: 'Line Segment',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['betweenness'],
    definition: String.raw`A **line segment** $\overline{AB}$ is the two endpoints together with all points between them — the convex combinations
$$\overline{AB} = \{(1 - t)A + tB : 0 \le t \le 1\}.$$
A **ray** from $A$ through $B$ instead allows all $t \ge 0$. Segments carry a length $|AB|$ and the relation of congruence.`,
  },
  {
    id: 'congruence',
    label: 'Congruence',
    title: 'Congruence',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['line-segment'],
    definition: String.raw`**Congruence** ($\cong$) is defined, not assumed: two segments are congruent when they have equal length, and two figures when an **isometry** of $\mathbb{R}^2$ — a distance-preserving map, that is a composition of translations, rotations, and reflections — carries one onto the other. Hilbert's congruence axioms, including segment transport and SAS, are then theorems.`,
  },
  {
    id: 'angle',
    label: 'Angle',
    title: 'Angle',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['line-segment'],
    definition: String.raw`An **angle** is the figure formed by two rays sharing a common endpoint — the *vertex* — the rays being its *sides*. Its measure is recovered analytically from the dot product of the side directions $u, v$,
$$\cos\theta = \frac{u \cdot v}{|u|\,|v|},$$
classifying it, against the right angle, as acute, right, obtuse, or straight ($\theta = \pi$).`,
  },
  {
    id: 'triangle',
    label: 'Triangle',
    title: 'Triangle',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['line-segment', 'angle'],
    definition: String.raw`A **triangle** is the figure determined by three non-collinear points — its *vertices* — joined pairwise by segments, its *sides*, enclosing three interior *angles*. The basic rigid figure of the plane, it is fixed up to congruence by suitable data: SAS, with ASA and SSS following. In the Euclidean plane its interior angles sum to a straight angle $\pi$ — a theorem equivalent to the parallel postulate, and false in the non-Euclidean models (less in hyperbolic, more in elliptic).`,
  },
  {
    id: 'parallel-postulate',
    label: 'Parallel Postulate',
    title: 'Parallel Postulate',
    kind: 'theorem',
    tags: ['Geometry'],
    dependencies: ['incidence', 'line'],
    definition: String.raw`In the analytic plane **Playfair's axiom** is a theorem: through a point not on a line $\ell$ there passes exactly one line parallel to $\ell$. Its fame is as Euclid's fifth postulate, *independent* of Hilbert's other axioms — keeping incidence, order, and congruence while admitting *many* parallels yields a consistent **hyperbolic** geometry (realized inside ZFC by the Poincaré disk), proving the postulate is not derivable; admitting *no* parallels gives **elliptic** geometry, which also adjusts the order axioms. Settling that independence was a celebrated turning point in mathematics.`,
  },
  {
    id: 'circle',
    label: 'Circle',
    title: 'Circle',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['point', 'euclidean-plane'],
    definition: String.raw`A **circle** with centre $O = (a, b)$ and radius $r > 0$ is the set of points at distance $r$ from $O$:
$$\{\,P \in \mathbb{R}^2 : |OP| = r\,\} = \{\,(x, y) : (x - a)^2 + (y - b)^2 = r^2\,\}.$$
In the Euclidean plane the ratio of any circle's circumference to its diameter is the constant $\pi$.`,
  },
  {
    id: 'pythagorean-theorem',
    label: 'Pythagorean Theorem',
    title: 'Pythagorean Theorem',
    kind: 'theorem',
    tags: ['Geometry'],
    dependencies: ['triangle', 'parallel-postulate'],
    definition: String.raw`The **Pythagorean theorem**: in a right triangle with legs $a, b$ and hypotenuse $c$,
$$a^2 + b^2 = c^2.$$
In the coordinate plane it follows from the dot product — it is exactly the statement that the legs meet at a right angle — and over the remaining axioms it is equivalent to the parallel postulate. It is the source of the Euclidean distance formula.`,
  },
]

import type { MathNode } from '../types'

/** Geometry — 12 nodes. */
export const GEOMETRY_NODES: MathNode[] = [
  {
    id: 'point',
    label: 'Point',
    title: 'Point',
    kind: 'primitive',
    tags: ['Geometry'],
    dependencies: ['first-order-logic'],
    definition: String.raw`A **point** is a primitive notion of Euclidean geometry — Euclid's "that which has no part" — having position but no extent. Euclidean geometry can be cast as a first-order theory (Tarski's elementary geometry): like *set* in set theory, *point* is left undefined, and the axioms govern how points, lines, and their relations behave.`,
  },
  {
    id: 'line',
    label: 'Line',
    title: 'Line',
    kind: 'primitive',
    tags: ['Geometry'],
    dependencies: ['point'],
    definition: String.raw`A **line** is a primitive notion: a straight, endless, one-dimensional figure, determined by the points lying on it. The incidence relation "$P$ lies on $\ell$" links the two primitives and, together with the axioms of order and congruence, underpins plane geometry.`,
  },
  {
    id: 'incidence',
    label: 'Incidence',
    title: 'Incidence',
    kind: 'axiom',
    tags: ['Geometry'],
    dependencies: ['point', 'line'],
    definition: String.raw`The **incidence axioms** govern how points and lines meet. Chief among them: through any two distinct points passes exactly one line.
$$\forall P \neq Q\;\exists!\,\ell\,(P \in \ell \wedge Q \in \ell).$$
With axioms that every line has at least two points and that there exist three non-collinear points, they fix the basic incidence structure underlying the plane.`,
  },
  {
    id: 'betweenness',
    label: 'Betweenness',
    title: 'Betweenness',
    kind: 'axiom',
    tags: ['Geometry'],
    dependencies: ['line'],
    definition: String.raw`**Betweenness** orders the points on a line: the relation "$C$ lies between $A$ and $B$." Its axioms — of three distinct collinear points at most one lies between the others, plus Pasch's axiom (a line meeting one side of a triangle, but no vertex, must also meet a second side) — give each line a linear order and split the plane into two sides of every line.`,
  },
  {
    id: 'line-segment',
    label: 'Line Segment',
    title: 'Line Segment',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['betweenness'],
    definition: String.raw`A **line segment** $\overline{AB}$ (with $A \neq B$) is the pair of endpoints together with all points between them:
$$\overline{AB} := \{A, B\} \cup \{X : X \text{ lies between } A \text{ and } B\}.$$
A **ray** from $A$ through $B$ keeps the endpoint $A$ but extends without bound past $B$. Segments carry the notions of length and congruence.`,
  },
  {
    id: 'congruence',
    label: 'Congruence',
    title: 'Congruence',
    kind: 'axiom',
    tags: ['Geometry'],
    dependencies: ['line-segment'],
    definition: String.raw`**Congruence** ($\cong$) is the geometric notion of "same size and shape," taken as a primitive relation on segments and angles. Its axioms make it an equivalence relation, allow any segment to be copied onto any ray, and declare triangles congruent when they agree by SAS — letting geometry compare figures without coordinates.`,
  },
  {
    id: 'angle',
    label: 'Angle',
    title: 'Angle',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['line-segment'],
    definition: String.raw`An **angle** is the figure formed by two distinct rays — its *sides* — sharing a common endpoint, the *vertex*. Angles are compared by congruence and, once a unit is fixed, measured by a real number. They are classified relative to the right angle (half a straight angle) as acute, right, or obtuse.`,
  },
  {
    id: 'triangle',
    label: 'Triangle',
    title: 'Triangle',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['line-segment', 'angle'],
    definition: String.raw`A **triangle** is the figure determined by three non-collinear points — its *vertices* — joined pairwise by segments, its *sides*, enclosing three interior *angles*. It is the basic rigid figure of the plane: by the congruence axioms (SAS, with ASA and SSS following) it is fixed up to congruence by suitable data. In Euclidean geometry — equivalently, granting the parallel postulate — its interior angles sum to a straight angle (less in hyperbolic geometry, more in elliptic).`,
  },
  {
    id: 'parallel-postulate',
    label: 'Parallel Postulate',
    title: 'Parallel Postulate',
    kind: 'axiom',
    tags: ['Geometry'],
    dependencies: ['incidence', 'line'],
    definition: String.raw`The **parallel postulate** is Euclid's fifth postulate, equivalent (given the other axioms) to Playfair's form: through a point not on a line $\ell$ there passes exactly one line parallel to $\ell$. It is independent of the rest — keeping the incidence, order, and congruence axioms while admitting *many* parallels yields the consistent **hyperbolic** geometry, proving the postulate cannot be derived from them. Allowing *no* parallels gives **elliptic** geometry, but that also requires modifying further axioms. These non-Euclidean geometries were a celebrated branch point in the history of mathematics.`,
  },
  {
    id: 'circle',
    label: 'Circle',
    title: 'Circle',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['point', 'congruence'],
    definition: String.raw`A **circle** with centre $O$ is, synthetically, the set of all points $P$ whose segment $\overline{OP}$ is congruent to a fixed segment — the **radius**; equivalently, in a metric setting, all points at distance $r$ from $O$:
$$\{\,P : |OP| = r\,\}.$$
In **Euclidean** geometry the ratio of any circle's circumference to its diameter is the constant $\pi$.`,
  },
  {
    id: 'pythagorean-theorem',
    label: 'Pythagorean Theorem',
    title: 'Pythagorean Theorem',
    kind: 'theorem',
    tags: ['Geometry'],
    dependencies: ['triangle', 'congruence', 'parallel-postulate'],
    definition: String.raw`The **Pythagorean theorem**: in a right triangle with legs $a, b$ and hypotenuse $c$,
$$a^2 + b^2 = c^2.$$
Over the remaining axioms it is equivalent to the parallel postulate — holding in Euclidean geometry and failing in the non-Euclidean ones — and it is the source of the Euclidean distance formula.`,
  },
  {
    id: 'euclidean-plane',
    label: 'Euclidean Plane ℝ²',
    title: 'Euclidean Plane (ℝ²)',
    kind: 'definition',
    tags: ['Geometry'],
    dependencies: ['real-numbers', 'cartesian-product'],
    definition: String.raw`The **Euclidean plane** is the analytic model of plane geometry: the set $\mathbb{R}^2 = \mathbb{R} \times \mathbb{R}$ of coordinate pairs, with distance
$$d\bigl((x_1, y_1), (x_2, y_2)\bigr) = \sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2}.$$
Points become pairs and lines become solution sets of linear equations, so Euclid's axioms hold as provable theorems — uniting synthetic and coordinate geometry.`,
  },
]

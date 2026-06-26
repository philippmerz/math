import type { MathNode } from '../types'

export const ORDER_THEORY_NODES: MathNode[] = [
  {
    id: 'partial-order',
    label: 'Partial Order',
    title: 'Partial Order',
    kind: 'definition',
    tags: ['Order Theory'],
    dependencies: ['relation'],
    definition: String.raw`A **partial order** on a set $P$ is a relation $\le$ that is reflexive, antisymmetric, and transitive:
$$a \le a,\qquad (a \le b \wedge b \le a) \Rightarrow a = b,\qquad (a \le b \wedge b \le c) \Rightarrow a \le c.$$
Some elements may be incomparable; the pair $(P, \le)$ is a *partially ordered set*, or poset.`,
  },
  {
    id: 'total-order',
    label: 'Total Order',
    title: 'Total (Linear) Order',
    kind: 'definition',
    tags: ['Order Theory'],
    dependencies: ['partial-order'],
    definition: String.raw`A **total** (or **linear**) **order** is a partial order in which any two elements are comparable:
$$\forall a\,\forall b\,(a \le b \;\vee\; b \le a).$$
Every pair lies on a single line, with no incomparabilities — as in $\mathbb{Z}$, $\mathbb{Q}$, and $\mathbb{R}$.`,
  },
  {
    id: 'supremum',
    label: 'Supremum',
    title: 'Supremum (Least Upper Bound)',
    kind: 'definition',
    tags: ['Order Theory'],
    dependencies: ['partial-order'],
    definition: String.raw`The **supremum** of a subset $S$ of a poset $P$ is its *least upper bound*: an element $u \in P$ above every member of $S$, below every other upper bound.
$$u = \sup S \;\Longleftrightarrow\; \bigl(\forall s \in S\; s \le u\bigr) \wedge \bigl(\forall v \in P\,[(\forall s \in S\; s \le v) \rightarrow u \le v]\bigr).$$
When it exists it is unique. The dual greatest lower bound is the **infimum** $\inf S$.`,
  },
  {
    id: 'knaster-tarski',
    label: 'Knaster–Tarski',
    title: 'Knaster–Tarski Fixed-Point Theorem',
    kind: 'theorem',
    tags: ['Order Theory'],
    dependencies: ['partial-order', 'supremum'],
    definition: String.raw`The **Knaster–Tarski theorem**: an order-preserving map on a complete lattice has a fixed point — and its set of fixed points is itself a complete lattice, so least and greatest fixed points always exist. It is the foundation of recursive definitions and denotational semantics, and it gives a slick proof of Cantor–Schröder–Bernstein.`,
  },
]

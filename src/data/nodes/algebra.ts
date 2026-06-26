import type { MathNode } from '../types'

/** Algebra — 9 nodes. */
export const ALGEBRA_NODES: MathNode[] = [
  {
    id: 'natural-number-arithmetic',
    label: 'Arithmetic on ℕ',
    title: 'Arithmetic on the Naturals',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['recursion-theorem'],
    definition: String.raw`**Addition and multiplication on $\mathbb{N}$** are defined by recursion on $\omega$:
$$m + 0 = m,\quad m + S(n) = S(m + n);\qquad m \cdot 0 = 0,\quad m \cdot S(n) = m\cdot n + m,$$
with order $m \le n :\Leftrightarrow \exists k\,(m + k = n)$. These make $\mathbb{N} = (\omega, +, \cdot, \le)$ a commutative, ordered semiring — the arithmetic that $\mathbb{Z}$ and $\mathbb{Q}$ extend.`,
  },
  {
    id: 'binary-operation',
    label: 'Binary Operation',
    title: 'Binary Operation',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['function', 'cartesian-product'],
    definition: String.raw`A **binary operation** on a set $S$ is a function $\ast : S \times S \to S$, written $a \ast b$. Totality and closure are built into being a function $S \times S \to S$: every ordered pair of elements yields a result lying again in $S$. Associativity, commutativity, identities, and inverses are then further properties an operation may possess.`,
  },
  {
    id: 'group',
    label: 'Group',
    title: 'Group',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['binary-operation'],
    definition: String.raw`A **group** is a set $G$ with a binary operation $*$ that is associative, has an identity $e$, and gives every element an inverse:
$$(a * b) * c = a * (b * c),\qquad e * a = a * e = a,\qquad a * a^{-1} = a^{-1} * a = e.$$
It is **abelian** when $*$ is also commutative. Groups axiomatize symmetry and invertible composition.`,
  },
  {
    id: 'ring',
    label: 'Ring',
    title: 'Ring',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['group'],
    definition: String.raw`A **ring** $(R, +, \cdot)$ is an abelian group under $+$ together with an associative multiplication that distributes over addition:
$$a\cdot(b + c) = a\cdot b + a\cdot c,\qquad (a + b)\cdot c = a\cdot c + b\cdot c.$$
With a multiplicative identity $1$ and commutative $\cdot$ it is a *commutative ring with unity* — $\mathbb{Z}$ being the prototypical example.`,
  },
  {
    id: 'field',
    label: 'Field',
    title: 'Field',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['ring'],
    definition: String.raw`A **field** is a commutative ring $(F, +, \cdot)$ with $1 \neq 0$ in which every non-zero element is invertible:
$$\forall a \in F\,\bigl(a \neq 0 \rightarrow \exists b\,(a \cdot b = 1)\bigr),$$
writing $b = a^{-1}$. Equivalently, $(F, +)$ is an abelian group, $(F \setminus \{0\}, \cdot)$ is an abelian group, and $\cdot$ distributes over $+$. Examples: $\mathbb{Q}$, $\mathbb{R}$, $\mathbb{C}$.`,
  },
  {
    id: 'ordered-field',
    label: 'Ordered Field',
    title: 'Ordered Field',
    kind: 'definition',
    tags: ['Algebra', 'Order Theory'],
    dependencies: ['field', 'total-order'],
    definition: String.raw`An **ordered field** is a field $F$ with a total order $\le$ compatible with its operations:
$$a \le b \Rightarrow a + c \le b + c,\qquad (0 \le a \wedge 0 \le b) \Rightarrow 0 \le a\cdot b.$$
$\mathbb{Q}$ and $\mathbb{R}$ are ordered fields; $\mathbb{C}$ admits no compatible order. Arithmetic and order interlock, giving inequalities their familiar rules.`,
  },
  {
    id: 'integers',
    label: 'Integers ℤ',
    title: 'Integers (ℤ)',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['natural-number-arithmetic', 'quotient-set'],
    definition: String.raw`The **integers** $\mathbb{Z}$ extend $\mathbb{N}$ by formally adjoining additive inverses. Take $\mathbb{N} \times \mathbb{N}$ modulo
$$(a, b) \sim (c, d) \;:\Longleftrightarrow\; a + d = b + c,$$
so the class $[(a, b)]$ stands for the difference $a - b$. With the induced $+$ and $\cdot$, $\,\mathbb{Z} = (\mathbb{N} \times \mathbb{N})/{\sim}$ is a commutative ordered ring.`,
  },
  {
    id: 'rationals',
    label: 'Rationals ℚ',
    title: 'Rational Numbers (ℚ)',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['integers', 'quotient-set', 'ordered-field'],
    definition: String.raw`The **rationals** $\mathbb{Q}$ extend $\mathbb{Z}$ by formally adjoining inverses of the non-zero integers. Take $\mathbb{Z} \times (\mathbb{Z} \setminus \{0\})$ modulo
$$(a, b) \sim (c, d) \;:\Longleftrightarrow\; a\cdot d = b\cdot c,$$
so $[(a, b)]$ is the fraction $a/b$. The quotient $\mathbb{Q}$ is an ordered field — the field of fractions of $\mathbb{Z}$, and the prime subfield embedded in every ordered field.`,
  },
  {
    id: 'polynomial',
    label: 'Polynomial',
    title: 'Polynomial',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['field', 'natural-number-arithmetic'],
    definition: String.raw`A **polynomial** over a field $F$ is a finite formal expression
$$p(x) = \sum_{k=0}^{n} a_k\,x^k, \qquad a_k \in F,$$
its **degree** the largest $k$ with $a_k \neq 0$ (the zero polynomial having degree $-\infty$). Polynomials form a commutative ring $F[x]$, and over $\mathbb{R}$ each defines a smooth polynomial function — the simplest functions of analysis.`,
  },
]

import type { MathNode } from './types'

/**
 * The foundational core of Zermelo–Fraenkel set theory with Choice (ZFC).
 *
 * `dependencies` lists each node's prerequisites; an edge is drawn from every
 * prerequisite to the node it enables, so the graph reads top-down from the two
 * primitives (set, membership) through the axioms to the constructions they
 * support. Definitions use `String.raw` so LaTeX backslashes survive verbatim.
 */
export const MATH_NODES: MathNode[] = [
  {
    id: 'set',
    label: 'Set',
    title: 'Set',
    kind: 'primitive',
    tags: ['Set Theory'],
    dependencies: ['first-order-logic'],
    definition: String.raw`A **set** is the sole kind of object in Zermelo–Fraenkel set theory, a first-order theory in the language of membership: there are no *urelements*, so the members of a set are themselves sets. The theory never says what a set *is*; its axioms instead govern which sets exist and when two are equal. Everything else — numbers, ordered pairs, functions, spaces — is built as a set.`,
  },
  {
    id: 'membership',
    label: 'Membership ∈',
    title: 'Membership (∈)',
    kind: 'primitive',
    tags: ['Set Theory'],
    dependencies: ['set'],
    definition: String.raw`**Membership**, written $a \in b$, is the single primitive relation of set theory: it asserts that the set $a$ is an element of the set $b$. Its negation is $a \notin b$. Every statement of ZFC is built from $\in$ and equality $=$ using first-order logic.`,
  },
  {
    id: 'extensionality',
    label: 'Extensionality',
    title: 'Axiom of Extensionality',
    kind: 'axiom',
    tags: ['Set Theory'],
    dependencies: ['membership'],
    definition: String.raw`A set is determined entirely by its elements: any two sets with the same members are equal.
$$\forall A\,\forall B\,\bigl(\forall x\,(x \in A \leftrightarrow x \in B) \;\rightarrow\; A = B\bigr)$$
There is thus no order or multiplicity among elements — only membership matters. This is what makes $\{a,b\} = \{b,a\}$ and $\{a,a\} = \{a\}$.`,
  },
  {
    id: 'separation',
    label: 'Separation',
    title: 'Axiom Schema of Specification (Separation)',
    kind: 'axiom',
    tags: ['Set Theory'],
    dependencies: ['replacement'],
    definition: String.raw`For any set $A$ and any first-order formula $\varphi(x)$ in which $B$ does not occur free, the members of $A$ satisfying $\varphi$ form a set:
$$\forall A\,\exists B\,\forall x\,\bigl(x \in B \leftrightarrow (x \in A \wedge \varphi(x))\bigr).$$
This is a *schema* — one axiom per formula $\varphi$ (which may carry parameters). Carving subsets out of an existing set, rather than forming $\{x : \varphi(x)\}$ outright, is exactly what blocks Russell's paradox. Though listed among the ZFC axioms, Separation is in fact a consequence of Replacement.`,
  },
  {
    id: 'pairing',
    label: 'Pairing',
    title: 'Axiom of Pairing',
    kind: 'axiom',
    tags: ['Set Theory'],
    dependencies: ['membership', 'extensionality'],
    definition: String.raw`For any sets $a$ and $b$ there is a set whose members are exactly $a$ and $b$:
$$\forall a\,\forall b\,\exists P\,\forall x\,\bigl(x \in P \leftrightarrow (x = a \vee x = b)\bigr).$$
By Extensionality this set is unique; it is written $\{a, b\}$.`,
  },
  {
    id: 'union',
    label: 'Union',
    title: 'Axiom of Union',
    kind: 'axiom',
    tags: ['Set Theory'],
    dependencies: ['membership', 'extensionality'],
    definition: String.raw`For any set $A$ there is a set containing exactly the members of the members of $A$:
$$\forall A\,\exists U\,\forall x\,\bigl(x \in U \leftrightarrow \exists Y\,(Y \in A \wedge x \in Y)\bigr).$$
By Extensionality this set is unique; it is written $\bigcup A$. It flattens one level of nesting, gathering every element that occurs in some element of $A$.`,
  },
  {
    id: 'subset',
    label: 'Subset ⊆',
    title: 'Subset (⊆)',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['membership', 'extensionality'],
    definition: String.raw`$A$ is a **subset** of $B$, written $A \subseteq B$, when every element of $A$ is an element of $B$:
$$A \subseteq B \;:\Longleftrightarrow\; \forall x\,(x \in A \rightarrow x \in B).$$
Mutual inclusion characterizes equality: $A = B$ iff $A \subseteq B$ and $B \subseteq A$, the implication from mutual inclusion to equality being the Axiom of Extensionality. The subset is *proper*, written $A \subsetneq B$, when also $A \neq B$.`,
  },
  {
    id: 'power-set',
    label: 'Power Set',
    title: 'Axiom of Power Set',
    kind: 'axiom',
    tags: ['Set Theory'],
    dependencies: ['subset'],
    definition: String.raw`For any set $A$ there is a set $\mathcal{P}(A)$ whose elements are exactly the subsets of $A$:
$$\forall A\,\exists P\,\forall X\,\bigl(X \in P \leftrightarrow X \subseteq A\bigr).$$
$\mathcal{P}(A)$ is the **power set** of $A$. Cantor's theorem shows it is always strictly larger than $A$; iterating it on an infinite set climbs through ever-larger infinities.`,
  },
  {
    id: 'empty-set',
    label: 'Empty Set ∅',
    title: 'Empty Set (∅)',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['separation', 'extensionality'],
    definition: String.raw`The **empty set** $\varnothing$ is the unique set with no elements:
$$\forall x\,(x \notin \varnothing).$$
Given any set $A$, Separation yields $\{x \in A : x \neq x\} = \varnothing$, so it exists; Extensionality makes it unique. It is the starting point from which the entire cumulative hierarchy is built.`,
  },
  {
    id: 'pair-set',
    label: 'Unordered Pair {a,b}',
    title: 'Unordered Pair ({a, b})',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['pairing'],
    definition: String.raw`The **unordered pair** of $a$ and $b$ is the set $\{a, b\}$ supplied by Pairing:
$$\forall x\,\bigl(x \in \{a,b\} \leftrightarrow (x = a \vee x = b)\bigr).$$
Order and repetition are invisible to it: $\{a, b\} = \{b, a\}$, and $\{a, a\}$ collapses to the singleton $\{a\}$.`,
  },
  {
    id: 'singleton',
    label: 'Singleton {a}',
    title: 'Singleton ({a})',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['pairing'],
    definition: String.raw`The **singleton** $\{a\}$ is the set whose only element is $a$, obtained from Pairing by taking $b = a$:
$$\forall x\,\bigl(x \in \{a\} \leftrightarrow x = a\bigr).$$
A set and its singleton differ: $\varnothing$ has no elements, while $\{\varnothing\}$ has exactly one.`,
  },
  {
    id: 'ordered-pair',
    label: 'Ordered Pair (a,b)',
    title: 'Ordered Pair (⟨a, b⟩)',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['pair-set', 'singleton'],
    definition: String.raw`The **ordered pair** $\langle a, b\rangle$ records two sets *with* their order. Kuratowski's definition:
$$\langle a, b\rangle := \{\{a\}, \{a, b\}\}.$$
Its characteristic property — provable from this definition — is $\langle a, b\rangle = \langle c, d\rangle \leftrightarrow (a = c \wedge b = d)$, recovering the order that the unordered pair throws away.`,
  },
  {
    id: 'binary-union',
    label: 'Union of Sets ∪',
    title: 'Union of Sets (∪)',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['union', 'pair-set'],
    definition: String.raw`The **union** of $A$ and $B$ is $A \cup B := \bigcup \{A, B\}$, the set of elements lying in $A$ or in $B$:
$$\forall x\,\bigl(x \in A \cup B \leftrightarrow (x \in A \vee x \in B)\bigr).$$
It combines Pairing (to form $\{A, B\}$) with the Axiom of Union (to flatten it).`,
  },
  {
    id: 'intersection',
    label: 'Intersection ∩',
    title: 'Intersection (∩)',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['separation'],
    definition: String.raw`The **intersection** of $A$ and $B$ is the set of elements lying in both:
$$A \cap B := \{x \in A : x \in B\}.$$
It needs no axiom of its own — it is Separation applied to $A$ with the formula $x \in B$. (Note $A \cap B \subseteq A$, which is why one existing set suffices.)`,
  },
  {
    id: 'cartesian-product',
    label: 'Cartesian Product ×',
    title: 'Cartesian Product (×)',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['ordered-pair', 'power-set', 'separation', 'binary-union'],
    definition: String.raw`The **Cartesian product** $A \times B$ is the set of all ordered pairs with first coordinate in $A$ and second in $B$:
$$A \times B := \{\langle a, b\rangle : a \in A,\; b \in B\}.$$
This is a set because every such pair lies in $\mathcal{P}(\mathcal{P}(A \cup B))$, so Separation carves $A \times B$ out of that power set.`,
  },
  {
    id: 'relation',
    label: 'Relation',
    title: 'Binary Relation',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['cartesian-product'],
    definition: String.raw`A **binary relation** from $A$ to $B$ is any subset $R \subseteq A \times B$; one writes $a\,R\,b$ for $\langle a, b\rangle \in R$. A relation *on* $A$ is a subset of $A \times A$. This single notion underlies orderings, equivalences, and functions alike.`,
  },
  {
    id: 'function',
    label: 'Function',
    title: 'Function',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['relation'],
    definition: String.raw`A **function** $f : A \to B$ is a relation $f \subseteq A \times B$ that is total and single-valued: each $a \in A$ relates to exactly one $b \in B$, denoted $f(a)$.
$$\forall a \in A\;\exists! b \in B\,\bigl(\langle a, b\rangle \in f\bigr).$$
$A$ is the domain and $B$ the codomain. Functions are themselves sets — sets of ordered pairs.`,
  },
  {
    id: 'replacement',
    label: 'Replacement',
    title: 'Axiom Schema of Replacement',
    kind: 'axiom',
    tags: ['Set Theory'],
    dependencies: ['membership'],
    definition: String.raw`If a formula $\varphi(x, y)$ behaves as a function — for each $x$, exactly one $y$ — then the image of any set $A$ under it is again a set:
$$\forall A\,\Bigl(\,\forall x \in A\,\exists! y\,\varphi(x,y) \;\rightarrow\; \exists B\,\forall y\,\bigl(y \in B \leftrightarrow \exists x \in A\,\varphi(x,y)\bigr)\Bigr).$$
A *schema*, one axiom per $\varphi$. It lets the size of a set bound what is built from it, and it implies Separation.`,
  },
  {
    id: 'regularity',
    label: 'Regularity',
    title: 'Axiom of Regularity (Foundation)',
    kind: 'axiom',
    tags: ['Set Theory'],
    dependencies: ['membership'],
    definition: String.raw`**Regularity** (Foundation) says every non-empty set $A$ has a member disjoint from it:
$$\forall A\,\bigl(A \neq \varnothing \rightarrow \exists x \in A\,(x \cap A = \varnothing)\bigr).$$
This rules out infinite descending chains $\cdots \in x_2 \in x_1 \in x_0$ and self-membership $x \in x$, so the set-theoretic universe is built in well-founded layers.`,
  },
  {
    id: 'transitive-set',
    label: 'Transitive Set',
    title: 'Transitive Set',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['subset'],
    definition: String.raw`A set $A$ is **transitive** when every element of an element of $A$ is itself an element of $A$:
$$\forall x\,(x \in A \rightarrow x \subseteq A),$$
equivalently $\bigcup A \subseteq A$. Every von Neumann ordinal is a transitive set on which $\in$ is exactly the well-ordering — which is what makes transitive sets the natural setting for the ordinals.`,
  },
  {
    id: 'successor',
    label: 'Successor S(x)',
    title: 'Successor (S(x))',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['binary-union', 'singleton'],
    definition: String.raw`The **successor** of a set $x$ adjoins $x$ itself as a new element:
$$S(x) := x \cup \{x\}.$$
Starting from $\varnothing$ and iterating gives the von Neumann naturals $0 = \varnothing$, $1 = \{0\}$, $2 = \{0,1\}, \dots$, where each $n$ is the set of its predecessors and so has exactly $n$ elements.`,
  },
  {
    id: 'infinity',
    label: 'Infinity',
    title: 'Axiom of Infinity',
    kind: 'axiom',
    tags: ['Set Theory'],
    dependencies: ['empty-set', 'successor'],
    definition: String.raw`There exists an **inductive** set — one containing $\varnothing$ and closed under successor:
$$\exists I\,\bigl(\varnothing \in I \;\wedge\; \forall x\,(x \in I \rightarrow S(x) \in I)\bigr).$$
This is the only ZFC axiom that asserts an actually infinite set, giving ZFC the strength to construct the natural numbers and everything beyond.`,
  },
  {
    id: 'natural-numbers',
    label: 'Natural Numbers ω',
    title: 'Natural Numbers (ω)',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['infinity', 'successor', 'empty-set', 'separation'],
    definition: String.raw`The set of **natural numbers** $\omega$ is the *smallest* inductive set: the intersection of all inductive subsets of an inductive set $I$ (which exists by Infinity).
$$\omega := \{\,x \in I : x \text{ lies in every inductive set}\,\}.$$
Its members are exactly the finite von Neumann ordinals $\varnothing, S(\varnothing), S(S(\varnothing)), \dots$ Because $\omega$ is the *least* inductive set, proof by induction over it is valid.`,
  },
  {
    id: 'well-order',
    label: 'Well-Ordering',
    title: 'Well-Ordering',
    kind: 'definition',
    tags: ['Set Theory', 'Order Theory'],
    dependencies: ['total-order'],
    definition: String.raw`A **well-ordering** of a set $A$ is a linear order $\le$ in which every non-empty subset has a least element:
$$\forall S\,\bigl(\varnothing \neq S \subseteq A \;\rightarrow\; \exists m \in S\,\forall x \in S\,(m \le x)\bigr).$$
Among linear orders, the well-orderings are precisely those that support transfinite induction and recursion.`,
  },
  {
    id: 'ordinal',
    label: 'Ordinal',
    title: 'Ordinal',
    kind: 'definition',
    tags: ['Set Theory', 'Order Theory'],
    dependencies: ['transitive-set', 'well-order', 'regularity'],
    definition: String.raw`An **ordinal** is a transitive set that is well-ordered by membership $\in$ — equivalently, under Regularity, a transitive set all of whose elements are transitive. Ordinals are the canonical representatives of well-orderings: every well-ordered set is order-isomorphic to exactly one ordinal, and any set of ordinals is well-ordered by $\in$.`,
  },
  {
    id: 'choice-function',
    label: 'Choice Function',
    title: 'Choice Function',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['function'],
    definition: String.raw`A **choice function** for a family $A$ of non-empty sets is a function $f$ with domain $A$ that selects one element from each member:
$$f : A \to \bigcup A \quad\text{with}\quad \forall X \in A\,\bigl(f(X) \in X\bigr).$$
It packages a choice from every member of the family into a single function — no rule for the selections need be given, only that they exist.`,
  },
  {
    id: 'choice',
    label: 'Choice (AC)',
    title: 'Axiom of Choice (AC)',
    kind: 'axiom',
    tags: ['Set Theory'],
    dependencies: ['choice-function'],
    definition: String.raw`The **Axiom of Choice** asserts that every family of non-empty sets admits a choice function:
$$\forall A\,\bigl(\varnothing \notin A \;\rightarrow\; \exists f\,(f \text{ is a choice function for } A)\bigr).$$
Non-constructive and independent of the other axioms (Gödel 1938, Cohen 1963), it is equivalent to Zorn's Lemma and to the Well-Ordering Theorem. It is the **C** in ZFC.`,
  },

  // ── Building toward analysis ─────────────────────────────────────────────
  // Quotient machinery, the algebraic tower (group → ring → field), the order
  // tower (partial → total order), the number systems ℤ → ℚ → ℝ (built two
  // ways), and the analysis core: limits, continuity, the derivative, and the
  // Riemann integral.

  {
    id: 'equivalence-relation',
    label: 'Equivalence Relation',
    title: 'Equivalence Relation',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['relation'],
    definition: String.raw`An **equivalence relation** on a set $A$ is a relation $R \subseteq A \times A$ — with $a \sim b$ written for $\langle a, b\rangle \in R$ — that is reflexive, symmetric, and transitive: for all $a, b, c \in A$,
$$a \sim a,\qquad a \sim b \Rightarrow b \sim a,\qquad (a \sim b \wedge b \sim c) \Rightarrow a \sim c.$$
It is the abstract notion of *sameness up to a chosen criterion*, and it partitions $A$ into disjoint classes.`,
  },
  {
    id: 'equivalence-class',
    label: 'Equivalence Class',
    title: 'Equivalence Class',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['equivalence-relation'],
    definition: String.raw`The **equivalence class** of $a \in A$ under an equivalence relation $\sim$ is the set of everything related to $a$:
$$[a] := \{x \in A : x \sim a\}.$$
Distinct classes are disjoint and together cover $A$, so $\sim$ partitions $A$; moreover $[a] = [b]$ iff $a \sim b$.`,
  },
  {
    id: 'quotient-set',
    label: 'Quotient Set',
    title: 'Quotient Set',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['equivalence-class', 'power-set'],
    definition: String.raw`The **quotient set** $A/{\sim}$ is the set of all equivalence classes of $\sim$ on $A$:
$$A/{\sim} := \{\,[a] : a \in A\,\}.$$
It exists as a subset of $\mathcal{P}(A)$ by Separation. Passing to the quotient forges new objects by *identifying* elements deemed equivalent — the engine behind $\mathbb{Z}$, $\mathbb{Q}$, and $\mathbb{R}$.`,
  },
  {
    id: 'recursion-theorem',
    label: 'Recursion Theorem',
    title: 'Recursion Theorem',
    kind: 'theorem',
    tags: ['Set Theory'],
    dependencies: ['natural-numbers', 'function'],
    definition: String.raw`The **recursion theorem** licenses definition by recursion on $\omega$: given a set $X$, a point $c \in X$, and a map $g : X \to X$, there is a *unique* function $f : \omega \to X$ with
$$f(0) = c,\qquad f\bigl(S(n)\bigr) = g\bigl(f(n)\bigr).$$
It is what makes the informal "$\dots$" rigorous, and it is the basis for defining addition and multiplication on $\omega$ (and hence its order).`,
  },
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
    id: 'absolute-value',
    label: 'Absolute Value',
    title: 'Absolute Value',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['ordered-field'],
    definition: String.raw`The **absolute value** on an ordered field is
$$|x| := \begin{cases} x & \text{if } x \ge 0, \\ -x & \text{if } x < 0. \end{cases}$$
It measures magnitude: $|x| \ge 0$, $|xy| = |x|\,|y|$, and the triangle inequality $|x + y| \le |x| + |y|$ holds. The quantity $|x - y|$ is the distance on which all of analysis rests.`,
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
    id: 'completeness',
    label: 'Completeness',
    title: 'Completeness (Least Upper Bound Property)',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['ordered-field', 'supremum'],
    definition: String.raw`An ordered field is **complete** when every non-empty subset that is bounded above has a least upper bound *in the field*:
$$\varnothing \neq S \subseteq F \text{ bounded above} \;\Longrightarrow\; \sup S \text{ exists in } F.$$
This *least upper bound property* is exactly what $\mathbb{Q}$ lacks — $\{q \in \mathbb{Q} : q^2 < 2\}$ has no rational supremum — and what singles out $\mathbb{R}$ among ordered fields.`,
  },
  {
    id: 'dedekind-cut',
    label: 'Dedekind Cut',
    title: 'Dedekind Cut',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['rationals', 'subset'],
    definition: String.raw`A **Dedekind cut** is a subset $\alpha \subsetneq \mathbb{Q}$ that is non-empty, downward closed, and has no greatest element:
$$\alpha \neq \varnothing,\quad (q \in \alpha \wedge p < q) \Rightarrow p \in \alpha,\quad \forall q \in \alpha\;\exists r \in \alpha\;(q < r).$$
Each cut pins down one point of the continuum by the rationals lying below it, filling the gaps in $\mathbb{Q}$.`,
  },
  {
    id: 'sequence',
    label: 'Sequence',
    title: 'Sequence',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['function', 'natural-number-arithmetic'],
    definition: String.raw`A **sequence** in a set $X$ is a function $a : \mathbb{N} \to X$, written $(a_n)_{n \in \mathbb{N}}$ with $a_n := a(n)$. It is an $X$-valued list indexed by the naturals — the basic object whose limiting behaviour analysis studies.`,
  },
  {
    id: 'cauchy-sequence',
    label: 'Cauchy Sequence',
    title: 'Cauchy Sequence',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['sequence', 'absolute-value'],
    definition: String.raw`A sequence $(a_n)$ in an ordered field is **Cauchy** when its terms grow arbitrarily close to *one another*:
$$\forall \varepsilon > 0\;\exists N\;\forall m, n \ge N\;\;\; |a_m - a_n| < \varepsilon.$$
Every convergent sequence is Cauchy; a field in which the converse also holds — every Cauchy sequence converges — is *Cauchy-complete*. The least upper bound property implies Cauchy-completeness, and Cauchy sequences of $\mathbb{Q}$ are the raw material for one construction of $\mathbb{R}$.`,
  },
  {
    id: 'dedekind-reals',
    label: 'ℝ via Dedekind Cuts',
    title: 'ℝ via Dedekind Cuts',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['dedekind-cut', 'completeness'],
    definition: String.raw`One construction of the reals takes $\mathbb{R}$ to be the set of all **Dedekind cuts** of $\mathbb{Q}$, ordered by inclusion $\subseteq$. Suitable definitions of $+$ and $\cdot$ on cuts make this an ordered field, and the least upper bound of any non-empty set of cuts that is bounded above is simply their **union** — so completeness is immediate from the construction.`,
  },
  {
    id: 'cauchy-reals',
    label: 'ℝ via Cauchy Sequences',
    title: 'ℝ via Cauchy Sequences',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['cauchy-sequence', 'quotient-set', 'rationals'],
    definition: String.raw`A second construction takes $\mathbb{R}$ to be the Cauchy sequences of $\mathbb{Q}$ modulo *null difference*:
$$(a_n) \sim (b_n) \;:\Longleftrightarrow\; (a_n - b_n) \to 0.$$
Arithmetic is defined termwise on representatives, and the resulting ordered field is complete — every Cauchy sequence of reals converges, since it is the limit of a Cauchy sequence of rationals approximating it term by term.`,
  },
  {
    id: 'real-numbers',
    label: 'Real Numbers ℝ',
    title: 'Real Numbers (ℝ)',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['dedekind-reals', 'cauchy-reals', 'completeness'],
    definition: String.raw`The **real numbers** $\mathbb{R}$ are *the* complete ordered field. The Dedekind-cut and Cauchy-sequence constructions each produce one, and any two complete ordered fields are uniquely isomorphic — so $\mathbb{R}$ is well-defined independently of the route taken. It is the continuum on which analysis lives.`,
  },
  {
    id: 'limit-of-a-sequence',
    label: 'Limit of a Sequence',
    title: 'Limit of a Sequence (Convergence)',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['sequence', 'real-numbers', 'absolute-value'],
    definition: String.raw`A sequence $(a_n)$ of reals **converges** to $L \in \mathbb{R}$ when its terms are eventually within every tolerance of $L$:
$$a_n \to L \;\Longleftrightarrow\; \forall \varepsilon > 0\;\exists N \in \mathbb{N}\;\forall n \ge N\;\; |a_n - L| < \varepsilon.$$
Such an $L$, when it exists, is unique, and is written $\lim_{n \to \infty} a_n$. This $\varepsilon$–$N$ formulation makes the intuitive "approaches" precise.`,
  },
  {
    id: 'limit-of-a-function',
    label: 'Limit of a Function',
    title: 'Limit of a Function',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['real-numbers', 'absolute-value', 'function'],
    definition: String.raw`The **limit** of $f$ at $a$ is $L$ when $f(x)$ can be forced arbitrarily close to $L$ by taking $x$ in the domain close enough to — but distinct from — $a$:
$$\lim_{x \to a} f(x) = L \;\Longleftrightarrow\; \forall \varepsilon > 0\;\exists \delta > 0\;\forall x\,\bigl(0 < |x - a| < \delta \rightarrow |f(x) - L| < \varepsilon\bigr).$$
Such an $L$, when it exists, is unique. This $\varepsilon$–$\delta$ definition underlies continuity, derivatives, and integrals.`,
  },
  {
    id: 'continuity',
    label: 'Continuity',
    title: 'Continuity',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['limit-of-a-function'],
    definition: String.raw`A function $f$ is **continuous at $a$** when its limit there equals its value:
$$\lim_{x \to a} f(x) = f(a),$$
equivalently $\forall \varepsilon > 0\;\exists \delta > 0\;\forall x\,(|x - a| < \delta \rightarrow |f(x) - f(a)| < \varepsilon)$. It is continuous on a set when continuous at each point — informally, drawable without lifting the pen.`,
  },
  {
    id: 'derivative',
    label: 'Derivative',
    title: 'Derivative',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['limit-of-a-function'],
    definition: String.raw`The **derivative** of $f$ at $a$ is the limit of its difference quotients, when that limit exists:
$$f'(a) := \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}.$$
It is the instantaneous rate of change — the slope of the tangent line to the graph of $f$ at $\bigl(a, f(a)\bigr)$. Differentiability at $a$ implies continuity at $a$, but not conversely.`,
  },
  {
    id: 'riemann-integral',
    label: 'Riemann Integral',
    title: 'Riemann Integral',
    kind: 'definition',
    tags: ['Analysis'],
    dependencies: ['function', 'real-numbers', 'supremum'],
    definition: String.raw`The **Riemann integral** of a bounded $f$ on $[a, b]$ is built from partitions $a = x_0 < \dots < x_n = b$. A partition's lower and upper Darboux sums $\underline{S} = \sum_i m_i\,\Delta x_i$ and $\overline{S} = \sum_i M_i\,\Delta x_i$ — with $m_i, M_i$ the infimum and supremum of $f$ on each subinterval — bracket the area. $f$ is **integrable** when the least upper bound of the lower sums meets the greatest lower bound of the upper sums:
$$\int_a^b f := \sup_{\text{partitions}} \underline{S} = \inf_{\text{partitions}} \overline{S}.$$
Every continuous function on $[a, b]$ is integrable.`,
  },
  {
    id: 'fundamental-theorem-of-calculus',
    label: 'Fundamental Theorem of Calculus',
    title: 'Fundamental Theorem of Calculus',
    kind: 'theorem',
    tags: ['Analysis'],
    dependencies: ['derivative', 'riemann-integral', 'continuity'],
    definition: String.raw`The **Fundamental Theorem of Calculus** binds differentiation and integration as inverse processes. For $f$ continuous on $[a, b]$, the accumulation function $A(x) = \int_a^x f$ is differentiable with $A' = f$; and for *any* antiderivative $F$ of $f$,
$$\int_a^b f = F(b) - F(a).$$
It turns the local notion of slope into the global notion of accumulated area.`,
  },

  // ── Logic (the substrate beneath every mathematical theory) ───────────────
  // Classical first-order logic, presented syntactically so it sits below set
  // theory and geometry (both first-order theories). The Law of Excluded
  // Middle is the classical/constructive branch point.

  {
    id: 'proposition',
    label: 'Proposition',
    title: 'Proposition',
    kind: 'primitive',
    tags: ['Logic'],
    dependencies: [],
    definition: String.raw`A **proposition** is a declarative statement that, on the classical (bivalent) view, has exactly one truth value — true or false — the atomic unit of logic. Its internal content is abstracted away; only its truth value matters. Compound statements are assembled from propositions with connectives, and reasoning studies which compounds must hold.`,
  },
  {
    id: 'logical-connectives',
    label: 'Logical Connectives',
    title: 'Logical Connectives',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['proposition'],
    definition: String.raw`**Logical connectives** build compound propositions: negation $\neg P$, conjunction $P \wedge Q$, disjunction $P \vee Q$, implication $P \rightarrow Q$, and the biconditional $P \leftrightarrow Q$. Each is fixed by how the truth value of the whole depends on the truth values of its parts.`,
  },
  {
    id: 'truth-table',
    label: 'Truth Table',
    title: 'Truth Values & Tables',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['logical-connectives'],
    definition: String.raw`A **truth table** lists the truth value of a compound proposition for every combination of values of its components. So $P \wedge Q$ is true only when both are, while $P \rightarrow Q$ is false only when $P$ is true and $Q$ false. Truth tables give the connectives their precise, two-valued meaning.`,
  },
  {
    id: 'tautology',
    label: 'Tautology',
    title: 'Tautology',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['truth-table'],
    definition: String.raw`A **tautology** is a compound proposition true under *every* assignment of truth values to its components — true by form alone, like $P \vee \neg P$ or $(P \wedge (P \rightarrow Q)) \rightarrow Q$. Tautologies are the validities of propositional logic; their predicate-logic counterparts are the logical truths.`,
  },
  {
    id: 'law-of-noncontradiction',
    label: 'Non-Contradiction',
    title: 'Law of Non-Contradiction',
    kind: 'theorem',
    tags: ['Logic'],
    dependencies: ['truth-table'],
    definition: String.raw`The **law of non-contradiction** says no proposition is both true and false:
$$\neg (P \wedge \neg P).$$
A tautology of classical logic — and, unlike Excluded Middle, a theorem of intuitionistic logic too — it is, with Excluded Middle, one of the classical "laws of thought."`,
  },
  {
    id: 'law-of-excluded-middle',
    label: 'Excluded Middle',
    title: 'Law of Excluded Middle',
    kind: 'axiom',
    tags: ['Logic'],
    dependencies: ['tautology'],
    definition: String.raw`The **law of excluded middle** is the principle that every proposition holds or its negation does — no third option (on the classical, bivalent reading, "true or false"):
$$P \vee \neg P.$$
It is the characteristic principle of *classical* logic. Dropping it leads to **intuitionistic** (constructive) logic, where asserting a disjunction demands a proof of one side — a fundamental fork in the foundations of mathematics.`,
  },
  {
    id: 'predicate',
    label: 'Predicate',
    title: 'Predicate',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['proposition'],
    definition: String.raw`A **predicate** is a proposition-valued function — a statement with one or more free variables, such as $x > 0$ or "$x$ is prime," whose truth value is determined once the variables are assigned. Substituting specific objects yields propositions; binding the variables with quantifiers yields statements about a whole domain.`,
  },
  {
    id: 'quantifiers',
    label: 'Quantifiers',
    title: 'Quantifiers (∀, ∃)',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['predicate'],
    definition: String.raw`**Quantifiers** turn a predicate into a proposition by binding its variable over a domain: the universal $\forall x\,P(x)$ ("$P$ holds for all $x$") and the existential $\exists x\,P(x)$ ("$P$ holds for some $x$"). They are dual, exchanged by negation: $\neg \forall x\,P(x) \leftrightarrow \exists x\,\neg P(x)$ and $\neg \exists x\,P(x) \leftrightarrow \forall x\,\neg P(x)$.`,
  },
  {
    id: 'modus-ponens',
    label: 'Modus Ponens',
    title: 'Modus Ponens',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['logical-connectives'],
    definition: String.raw`**Modus ponens** is the primary rule of inference in an axiomatic (Hilbert-style) system: from $P$ and $P \rightarrow Q$, infer $Q$.
$$\frac{P \qquad P \rightarrow Q}{Q}$$
Together with logical axioms it generates formal proofs — a proof being a finite sequence of propositions, each a premise, an axiom, or obtained from earlier ones by such a step.`,
  },
  {
    id: 'first-order-logic',
    label: 'First-Order Logic',
    title: 'First-Order Logic',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['quantifiers', 'modus-ponens', 'law-of-excluded-middle'],
    definition: String.raw`**First-order logic** is the standard formal system for the foundations of mathematics: predicates over a domain, the connectives, the quantifiers $\forall$ and $\exists$, variables, function symbols, and equality $=$, with axioms and inference rules (modus ponens, generalization) generating proofs. Taking Excluded Middle makes it *classical*. ZFC and (in Tarski's axiomatization) Euclidean geometry are both first-order theories — axioms stated in this language.`,
  },

  // ── Geometry & Trigonometry ──────────────────────────────────────────────
  // Synthetic Euclidean geometry (Hilbert-style primitives and axioms), an
  // analytic bridge to the real plane, and trigonometry built on the unit
  // circle and angle measure.

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
In **Euclidean** geometry the ratio of any circle's circumference to its diameter is the constant $\pi$ — a specifically Euclidean fact, as the ratio is not constant in non-Euclidean geometries.`,
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
  {
    id: 'angle-measure',
    label: 'Angle Measure',
    title: 'Angle Measure (Radians)',
    kind: 'definition',
    tags: ['Trigonometry'],
    dependencies: ['angle', 'real-numbers'],
    definition: String.raw`**Angle measure** assigns each angle a real number. In **radians**, the measure is the length of the arc the angle subtends on a unit circle centred at its vertex, so a straight angle is $\pi$ and a right angle is $\tfrac{\pi}{2}$ (a full turn, $2\pi$). Allowing the arc length to be *signed* and to wind around repeatedly extends measure to all of $\mathbb{R}$, making the trigonometric functions $2\pi$-periodic functions on $\mathbb{R}$.`,
  },
  {
    id: 'unit-circle',
    label: 'Unit Circle',
    title: 'Unit Circle',
    kind: 'definition',
    tags: ['Trigonometry'],
    dependencies: ['circle', 'euclidean-plane'],
    definition: String.raw`The **unit circle** is the circle of radius $1$ centred at the origin of the Euclidean plane:
$$\{(x, y) \in \mathbb{R}^2 : x^2 + y^2 = 1\}.$$
Wrapping the real line around it — signed arc length $\theta$, positive counter-clockwise from $(1, 0)$ — converts angle measure into coordinates, the basis of trigonometry.`,
  },
  {
    id: 'sine-cosine',
    label: 'Sine & Cosine',
    title: 'Sine and Cosine',
    kind: 'definition',
    tags: ['Trigonometry'],
    dependencies: ['unit-circle', 'angle-measure'],
    definition: String.raw`For an angle $\theta$ (in radians), **cosine** and **sine** are the coordinates of the point reached by travelling a signed arc length $\theta$ counter-clockwise along the unit circle from $(1, 0)$ (clockwise when $\theta < 0$):
$$(\cos\theta, \sin\theta) \in \{(x,y) : x^2 + y^2 = 1\}.$$
As $\theta$ ranges over $\mathbb{R}$ they give $2\pi$-periodic functions $\cos, \sin : \mathbb{R} \to [-1, 1]$, the prototypes of oscillation.`,
  },
  {
    id: 'tangent',
    label: 'Tangent',
    title: 'Tangent',
    kind: 'definition',
    tags: ['Trigonometry'],
    dependencies: ['sine-cosine'],
    definition: String.raw`The **tangent** is the ratio
$$\tan\theta := \frac{\sin\theta}{\cos\theta},$$
defined wherever $\cos\theta \neq 0$. Together with its reciprocal $\cot = \cos/\sin$ and the reciprocals $\sec = 1/\cos$, $\csc = 1/\sin$ of the base functions, it completes the six trigonometric functions. Geometrically $\tan\theta$ is the slope of the ray from the origin at angle $\theta$.`,
  },
  {
    id: 'pythagorean-identity',
    label: 'Pythagorean Identity',
    title: 'Pythagorean Identity',
    kind: 'theorem',
    tags: ['Trigonometry'],
    dependencies: ['sine-cosine'],
    definition: String.raw`The **Pythagorean identity** is the Pythagorean theorem read off the unit circle:
$$\cos^2\theta + \sin^2\theta = 1 \qquad \text{for all } \theta \in \mathbb{R}.$$
It is the fundamental relation among the trigonometric functions, from which identities like $1 + \tan^2\theta = \sec^2\theta$ follow.`,
  },
  {
    id: 'right-triangle-trig',
    label: 'Right-Triangle Ratios',
    title: 'Right-Triangle Trigonometry',
    kind: 'definition',
    tags: ['Trigonometry'],
    dependencies: ['triangle', 'sine-cosine'],
    definition: String.raw`In a **right triangle**, an acute angle $\theta$ fixes the ratios of side lengths, independent of the triangle's size (by similarity):
$$\sin\theta = \frac{\text{opposite to }\theta}{\text{hypotenuse}},\quad \cos\theta = \frac{\text{adjacent to }\theta}{\text{hypotenuse}},\quad \tan\theta = \frac{\text{opposite to }\theta}{\text{adjacent to }\theta}.$$
This "SOHCAHTOA" picture agrees with the unit-circle definition and is the classical face of trigonometry.`,
  },

  // ── Measure Theory & Lebesgue Integration ────────────────────────────────
  // Measurable structure (σ-algebras), measures and null sets, the Borel /
  // Lebesgue measure on ℝ, measurable and simple functions, and the Lebesgue
  // integral that generalises the Riemann integral.

  {
    id: 'sigma-algebra',
    label: 'σ-Algebra',
    title: 'σ-Algebra',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['power-set', 'natural-numbers'],
    definition: String.raw`A **σ-algebra** on a set $X$ is a collection $\Sigma \subseteq \mathcal{P}(X)$ that contains $X$ and is closed under complement and countable unions:
$$X \in \Sigma,\qquad A \in \Sigma \Rightarrow X \setminus A \in \Sigma,\qquad A_1, A_2, \dots \in \Sigma \Rightarrow \bigcup_{n} A_n \in \Sigma.$$
It is the family of sets that can consistently be assigned a size, closed under complement and the countable unions and intersections analysis needs (but not, in general, uncountable ones).`,
  },
  {
    id: 'measurable-space',
    label: 'Measurable Space',
    title: 'Measurable Space',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['sigma-algebra'],
    definition: String.raw`A **measurable space** is a pair $(X, \Sigma)$ of a set together with a σ-algebra $\Sigma$ on it. The members of $\Sigma$ are the **measurable sets** — those eligible to be measured. It is the domain on which measures and measurable functions live, the measure-theoretic counterpart of a topological space.`,
  },
  {
    id: 'measure',
    label: 'Measure',
    title: 'Measure',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['measurable-space', 'real-numbers'],
    definition: String.raw`A **measure** on $(X, \Sigma)$ is a function $\mu : \Sigma \to [0, \infty]$ with $\mu(\varnothing) = 0$ that is **countably additive**: for pairwise disjoint $A_1, A_2, \dots \in \Sigma$,
$$\mu\Bigl(\bigcup_{n} A_n\Bigr) = \sum_{n} \mu(A_n).$$
It assigns a consistent size — for instance length, area, volume, or probability — to every measurable set.`,
  },
  {
    id: 'null-set',
    label: 'Null Set',
    title: 'Null Set (Measure Zero)',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['measure'],
    definition: String.raw`A **null set** (set of **measure zero**) is a measurable set $N$ with $\mu(N) = 0$. Null sets are negligible: a countable union of null sets is null, and — for Lebesgue measure on $\mathbb{R}$ — even some uncountable sets, such as the Cantor set, are null. They are precisely what "almost every" is allowed to ignore.`,
  },
  {
    id: 'almost-everywhere',
    label: 'Almost Everywhere',
    title: 'Almost Everywhere',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['null-set'],
    definition: String.raw`A property holds **almost everywhere** (a.e.) when it fails only on a null set — the points where it fails are contained in a set of measure zero. Functions equal a.e. are interchangeable for integration, so the theory works with equivalence classes modulo null sets. This tolerance of negligible exceptions is the source of Lebesgue theory's clean convergence theorems.`,
  },
  {
    id: 'borel-sigma-algebra',
    label: 'Borel σ-Algebra',
    title: 'Borel σ-Algebra',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['sigma-algebra', 'real-numbers'],
    definition: String.raw`The **Borel σ-algebra** on $\mathbb{R}$ is the smallest σ-algebra containing every open interval — the intersection of all σ-algebras that do. Its members, the **Borel sets**, form the smallest collection containing the open and closed sets that is closed under countable unions and complements: the natural measurable sets of the real line.`,
  },
  {
    id: 'lebesgue-measure',
    label: 'Lebesgue Measure',
    title: 'Lebesgue Measure',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['measure', 'borel-sigma-algebra'],
    definition: String.raw`**Lebesgue measure** $\lambda$ on $\mathbb{R}$ is the measure assigning each interval its length, $\lambda([a, b]) = b - a$, and invariant under translation. Extending "length" beyond the Borel sets to their completion — the **Lebesgue-measurable sets** — it is the standard measure of the real line (and, via products, of $\mathbb{R}^n$) and the basis of the Lebesgue integral; it cannot be extended consistently to *all* subsets (Vitali sets).`,
  },
  {
    id: 'measurable-function',
    label: 'Measurable Function',
    title: 'Measurable Function',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['measurable-space', 'function'],
    definition: String.raw`A **measurable function** $f : (X, \Sigma) \to (Y, \Sigma_Y)$ is one whose preimages of measurable sets are measurable: $f^{-1}(B) \in \Sigma$ for every $B \in \Sigma_Y$. For real-valued $f$ (with $\mathbb{R}$ carrying its Borel σ-algebra) it suffices that $\{x : f(x) > a\} \in \Sigma$ for all $a \in \mathbb{R}$. Measurability is the regularity needed to integrate, and it survives sums, products, and pointwise limits.`,
  },
  {
    id: 'simple-function',
    label: 'Simple Function',
    title: 'Simple Function',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['measurable-function'],
    definition: String.raw`A **simple function** is a measurable function taking only finitely many values — a finite combination $\sum_{i} c_i \,\mathbf{1}_{A_i}$ of indicator functions of measurable sets $A_i$. Every non-negative measurable function is a pointwise increasing limit of simple functions, which is what makes the Lebesgue integral of such functions well-defined.`,
  },
  {
    id: 'lebesgue-integral',
    label: 'Lebesgue Integral',
    title: 'Lebesgue Integral',
    kind: 'definition',
    tags: ['Measure Theory'],
    dependencies: ['simple-function', 'measure', 'supremum'],
    definition: String.raw`The **Lebesgue integral** of a non-negative measurable $f$ against $\mu$ is the supremum of the integrals of the simple functions beneath it:
$$\int_X f \, d\mu := \sup\Bigl\{\, \int_X s \, d\mu \;:\; s \text{ simple},\ 0 \le s \le f \,\Bigr\},$$
where a simple function $s = \sum_i c_i\,\mathbf{1}_{A_i}$ (disjoint measurable $A_i$, $c_i \ge 0$) has integral $\sum_i c_i\,\mu(A_i)$. A general $f$ is split into positive and negative parts (integrable when at least one part is finite). By partitioning the *range* instead of the domain it integrates far more functions than Riemann's method and obeys powerful limit theorems (monotone and dominated convergence).`,
  },
]

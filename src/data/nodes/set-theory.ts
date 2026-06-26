import type { MathNode } from '../types'

/** Set Theory — 37 nodes. */
export const SET_THEORY_NODES: MathNode[] = [
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
    id: 'cardinality',
    label: 'Cardinality',
    title: 'Cardinality',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['function'],
    definition: String.raw`The **cardinality** $|A|$ of a set measures its size by *bijection*: $|A| = |B|$ when a bijection $A \to B$ exists, and $|A| \le |B|$ when an injection $A \hookrightarrow B$ does. For finite sets it is the number of elements; for infinite sets it opens a hierarchy of *transfinite* sizes, the cardinal numbers.`,
  },
  {
    id: 'countable-uncountable',
    label: 'Countable / Uncountable',
    title: 'Countable and Uncountable Sets',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['cardinality', 'natural-numbers'],
    definition: String.raw`A set is **countable** when it injects into $\mathbb{N}$ — finite, or in bijection with $\mathbb{N}$ (cardinality $\aleph_0$); otherwise it is **uncountable**. $\mathbb{Z}$ and $\mathbb{Q}$ are countable, whereas $\mathbb{R}$ is uncountable (Cantor's diagonal argument). Countability is the first dividing line in the theory of infinite size.`,
  },
  {
    id: 'cantors-theorem',
    label: "Cantor's Theorem",
    title: "Cantor's Theorem",
    kind: 'theorem',
    tags: ['Set Theory'],
    dependencies: ['power-set', 'cardinality'],
    definition: String.raw`**Cantor's theorem**: no set maps onto its power set, so
$$|A| < |\mathcal{P}(A)|$$
for every set $A$. There is no largest cardinality — iterating $\mathcal{P}$ builds an endless tower of infinities — and the same diagonal argument shows $\mathbb{R}$ is uncountable.`,
  },
  {
    id: 'cantor-schroder-bernstein',
    label: 'Schröder–Bernstein',
    title: 'Cantor–Schröder–Bernstein Theorem',
    kind: 'theorem',
    tags: ['Set Theory'],
    dependencies: ['cardinality'],
    definition: String.raw`The **Cantor–Schröder–Bernstein theorem**: if there are injections $A \hookrightarrow B$ and $B \hookrightarrow A$, then a bijection $A \leftrightarrow B$ exists — so $|A| \le |B|$ and $|B| \le |A|$ together give $|A| = |B|$. It makes cardinal comparison a genuine (antisymmetric) order, and it needs no axiom of choice.`,
  },
  {
    id: 'zorns-lemma',
    label: "Zorn's Lemma",
    title: "Zorn's Lemma",
    kind: 'theorem',
    tags: ['Set Theory'],
    dependencies: ['partial-order', 'choice'],
    definition: String.raw`**Zorn's lemma**: a partially ordered set in which every chain (totally ordered subset) has an upper bound contains a maximal element. Equivalent to the Axiom of Choice, it is the form used to produce maximal ideals, vector-space bases, and algebraic closures without explicit construction.`,
  },
  {
    id: 'well-ordering-theorem',
    label: 'Well-Ordering Theorem',
    title: 'Well-Ordering Theorem',
    kind: 'theorem',
    tags: ['Set Theory'],
    dependencies: ['well-order', 'choice'],
    definition: String.raw`The **well-ordering theorem**: every set admits a well-ordering — a total order in which every non-empty subset has a least element. Equivalent to the Axiom of Choice (and to Zorn's lemma), it underwrites transfinite induction and recursion on arbitrary sets, however large.`,
  },
]

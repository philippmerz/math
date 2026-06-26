import type { MathNode } from '../types'

export const SET_THEORY_NODES: MathNode[] = [
  {
    id: 'set',
    label: 'Set',
    title: 'Set',
    kind: 'primitive',
    tags: ['Set Theory'],
    dependencies: ['first-order-logic'],
    description: String.raw`A **set** is the sole kind of object in Zermelo–Fraenkel set theory, a first-order theory in the language of membership: there are no *urelements*, so the members of a set are themselves sets. The theory never says what a set *is*; its axioms instead govern which sets exist and when two are equal. Everything else — numbers, ordered pairs, functions, spaces — is built as a set.`,
  },
  {
    id: 'membership',
    label: 'Membership ∈',
    title: 'Membership (∈)',
    kind: 'primitive',
    tags: ['Set Theory'],
    dependencies: ['set'],
    description: String.raw`**Membership**, written $a \in b$, is the single primitive relation of set theory: it asserts that the set $a$ is an element of the set $b$. Its negation is $a \notin b$. Every statement of ZFC is built from $\in$ and equality $=$ using first-order logic.`,
  },
  {
    id: 'extensionality',
    label: 'Extensionality',
    title: 'Axiom of Extensionality',
    kind: 'axiom',
    tags: ['Set Theory'],
    dependencies: ['membership'],
    description: String.raw`A set is determined entirely by its elements: any two sets with the same members are equal.
$$\forall A\,\forall B\,\bigl(\forall x\,(x \in A \leftrightarrow x \in B) \;\rightarrow\; A = B\bigr)$$
There is thus no order or multiplicity among elements — only membership matters. This is what makes $\{a,b\} = \{b,a\}$ and $\{a,a\} = \{a\}$.`,
    statement: String.raw`Any two sets with the same members are equal:
$$\forall A\,\forall B\,\bigl(\forall x\,(x \in A \leftrightarrow x \in B) \;\rightarrow\; A = B\bigr).$$
The converse — equal sets have the same members — is a logical truth, so $\in$ and $=$ together determine one another.`,
  },
  {
    id: 'separation',
    label: 'Separation',
    title: 'Axiom Schema of Specification (Separation)',
    kind: 'axiom',
    tags: ['Set Theory'],
    dependencies: ['replacement', 'first-order-logic', 'free-and-bound-variables'],
    description: String.raw`For any set $A$ and any first-order formula $\varphi(x)$ in which $B$ does not occur free, the members of $A$ satisfying $\varphi$ form a set:
$$\forall A\,\exists B\,\forall x\,\bigl(x \in B \leftrightarrow (x \in A \wedge \varphi(x))\bigr).$$
This is a *schema* — one axiom per formula $\varphi$ (which may carry parameters). Carving subsets out of an existing set, rather than forming $\{x : \varphi(x)\}$ outright, is exactly what blocks Russell's paradox. Though listed among the ZFC axioms, Separation is in fact a consequence of Replacement.`,
    statement: String.raw`For any set $A$ and any first-order formula $\varphi(x)$ (with parameters allowed, but in which $B$ does not occur free), the elements of $A$ satisfying $\varphi$ form a set:
$$\forall A\,\exists B\,\forall x\,\bigl(x \in B \leftrightarrow (x \in A \wedge \varphi(x))\bigr).$$
One instance per formula $\varphi$; the set $B$ is written $\{x \in A : \varphi(x)\}$.`,
    proof: String.raw`**Derivation from Replacement.** Fix a set $A$ and a formula $\varphi$. Apply Replacement to the functional relation $\psi(x,y) :\equiv (y = x \wedge \varphi(x))$, which sends each $x \in A$ satisfying $\varphi$ to the single value $x$, and every other $x$ to nothing. Its image over $A$ is a set, and that image is precisely $\{x \in A : \varphi(x)\}$ — so the subclass cut out of $A$ by $\varphi$ exists as a set. The construction makes no choice and uses no further axiom; the one degenerate case, when nothing in $A$ satisfies $\varphi$, simply reproduces the empty set. $\square$`,
  },
  {
    id: 'pairing',
    label: 'Pairing',
    title: 'Axiom of Pairing',
    kind: 'axiom',
    tags: ['Set Theory'],
    dependencies: ['membership', 'extensionality'],
    description: String.raw`For any sets $a$ and $b$ there is a set whose members are exactly $a$ and $b$:
$$\forall a\,\forall b\,\exists P\,\forall x\,\bigl(x \in P \leftrightarrow (x = a \vee x = b)\bigr).$$
By Extensionality this set is unique; it is written $\{a, b\}$.`,
    statement: String.raw`For any sets $a$ and $b$ there is a set whose members are exactly $a$ and $b$:
$$\forall a\,\forall b\,\exists P\,\forall x\,\bigl(x \in P \leftrightarrow (x = a \vee x = b)\bigr).$$`,
  },
  {
    id: 'union',
    label: 'Union',
    title: 'Axiom of Union',
    kind: 'axiom',
    tags: ['Set Theory'],
    dependencies: ['membership', 'extensionality'],
    description: String.raw`For any set $A$ there is a set containing exactly the members of the members of $A$:
$$\forall A\,\exists U\,\forall x\,\bigl(x \in U \leftrightarrow \exists Y\,(Y \in A \wedge x \in Y)\bigr).$$
By Extensionality this set is unique; it is written $\bigcup A$. It flattens one level of nesting, gathering every element that occurs in some element of $A$.`,
    statement: String.raw`For any set $A$ there is a set containing exactly the members of the members of $A$:
$$\forall A\,\exists U\,\forall x\,\bigl(x \in U \leftrightarrow \exists Y\,(Y \in A \wedge x \in Y)\bigr).$$
By Extensionality it is unique, written $\bigcup A$.`,
  },
  {
    id: 'subset',
    label: 'Subset ⊆',
    title: 'Subset (⊆)',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['membership', 'extensionality'],
    description: String.raw`$A$ is a **subset** of $B$, written $A \subseteq B$, when every element of $A$ is an element of $B$:
$$A \subseteq B \;:\Longleftrightarrow\; \forall x\,(x \in A \rightarrow x \in B).$$
Mutual inclusion characterizes equality: $A = B$ iff $A \subseteq B$ and $B \subseteq A$, the implication from mutual inclusion to equality being the Axiom of Extensionality. The subset is *proper*, written $A \subsetneq B$, when also $A \neq B$.`,
    definition: String.raw`$A$ is a **subset** of $B$, written $A \subseteq B$, when every element of $A$ is an element of $B$:
$$A \subseteq B \;:\Longleftrightarrow\; \forall x\,(x \in A \rightarrow x \in B).$$
It is *proper*, written $A \subsetneq B$, when additionally $A \neq B$.`,
  },
  {
    id: 'power-set',
    label: 'Power Set',
    title: 'Axiom of Power Set',
    kind: 'axiom',
    tags: ['Set Theory'],
    dependencies: ['subset'],
    description: String.raw`For any set $A$ there is a set $\mathcal{P}(A)$ whose elements are exactly the subsets of $A$:
$$\forall A\,\exists P\,\forall X\,\bigl(X \in P \leftrightarrow X \subseteq A\bigr).$$
$\mathcal{P}(A)$ is the **power set** of $A$. Cantor's theorem shows it is always strictly larger than $A$; iterating it on an infinite set climbs through ever-larger infinities.`,
    statement: String.raw`For any set $A$ there is a set whose elements are exactly the subsets of $A$:
$$\forall A\,\exists P\,\forall X\,\bigl(X \in P \leftrightarrow X \subseteq A\bigr).$$
By Extensionality it is unique, the **power set** $\mathcal{P}(A)$.`,
  },
  {
    id: 'empty-set',
    label: 'Empty Set ∅',
    title: 'Empty Set (∅)',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['separation', 'extensionality'],
    description: String.raw`The **empty set** $\varnothing$ is the unique set with no elements:
$$\forall x\,(x \notin \varnothing).$$
Given any set $A$, Separation yields $\{x \in A : x \neq x\} = \varnothing$, so it exists; Extensionality makes it unique. It is the starting point from which the entire cumulative hierarchy is built.`,
    definition: String.raw`The **empty set** $\varnothing$ is the unique set with no elements:
$$\forall x\,(x \notin \varnothing).$$`,
    proof: String.raw`**Existence and uniqueness.** At least one set exists (the universe of a first-order theory is non-empty, or take any set supplied by another axiom); applying Separation to such a set $A$ with the unsatisfiable formula $x \neq x$ yields $\{x \in A : x \neq x\}$, a set with no members. For uniqueness, if $E$ and $E'$ both have no members then $x \in E \leftrightarrow x \in E'$ holds vacuously for every $x$, so $E = E'$ by Extensionality. The notation $\varnothing$ is therefore unambiguous. $\square$`,
  },
  {
    id: 'pair-set',
    label: 'Unordered Pair {a,b}',
    title: 'Unordered Pair ({a, b})',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['pairing'],
    description: String.raw`The **unordered pair** of $a$ and $b$ is the set $\{a, b\}$ supplied by Pairing:
$$\forall x\,\bigl(x \in \{a,b\} \leftrightarrow (x = a \vee x = b)\bigr).$$
Order and repetition are invisible to it: $\{a, b\} = \{b, a\}$, and $\{a, a\}$ collapses to the singleton $\{a\}$.`,
    definition: String.raw`The **unordered pair** of $a$ and $b$ is the set $\{a, b\}$ supplied by Pairing:
$$\forall x\,\bigl(x \in \{a,b\} \leftrightarrow (x = a \vee x = b)\bigr).$$`,
    proof: String.raw`**Well-definedness.** Pairing supplies a set $P$ with $x \in P \leftrightarrow (x = a \vee x = b)$. If $P'$ satisfies the same condition, then $P$ and $P'$ have exactly the same members, so $P = P'$ by Extensionality. The pair is thus unique, which justifies the notation $\{a, b\}$. $\square$`,
  },
  {
    id: 'singleton',
    label: 'Singleton {a}',
    title: 'Singleton ({a})',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['pairing'],
    description: String.raw`The **singleton** $\{a\}$ is the set whose only element is $a$, obtained from Pairing by taking $b = a$:
$$\forall x\,\bigl(x \in \{a\} \leftrightarrow x = a\bigr).$$
A set and its singleton differ: $\varnothing$ has no elements, while $\{\varnothing\}$ has exactly one.`,
    definition: String.raw`The **singleton** $\{a\}$ is the set whose only element is $a$, obtained from Pairing by taking $b = a$:
$$\forall x\,\bigl(x \in \{a\} \leftrightarrow x = a\bigr).$$`,
    proof: String.raw`**Existence and uniqueness.** Setting $b = a$ in Pairing gives a set with $x \in \{a,a\} \leftrightarrow (x = a \vee x = a) \leftrightarrow x = a$, so $\{a, a\}$ has $a$ as its sole member. Uniqueness follows from Extensionality, exactly as for the unordered pair. $\square$`,
  },
  {
    id: 'ordered-pair',
    label: 'Ordered Pair (a,b)',
    title: 'Ordered Pair (⟨a, b⟩)',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['pair-set', 'singleton'],
    description: String.raw`The **ordered pair** $\langle a, b\rangle$ records two sets *with* their order. Kuratowski's definition:
$$\langle a, b\rangle := \{\{a\}, \{a, b\}\}.$$
Its characteristic property — provable from this definition — is $\langle a, b\rangle = \langle c, d\rangle \leftrightarrow (a = c \wedge b = d)$, recovering the order that the unordered pair throws away.`,
    definition: String.raw`The **ordered pair** $\langle a, b\rangle$ is defined, following Kuratowski, by
$$\langle a, b\rangle := \{\{a\}, \{a, b\}\},$$
a set by two applications of Pairing.`,
    proof: String.raw`**Characteristic property:** $\langle a, b\rangle = \langle c, d\rangle$ iff $a = c$ and $b = d$. This is what makes the encoding faithful — the whole point of the definition.

The "if" direction is immediate. For "only if", suppose $\{\{a\}, \{a,b\}\} = \{\{c\}, \{c,d\}\}$.

*Case $a = b$.* Then $\langle a, b\rangle = \{\{a\}\}$ is a singleton, so $\{\{c\}, \{c,d\}\} = \{\{a\}\}$ forces $\{c\} = \{c,d\} = \{a\}$; hence $c = d = a$, giving $a = c$ and $b = d$.

*Case $a \neq b$.* Now $\{a\} \neq \{a, b\}$. Since $\{a\}$ is a member of the right-hand set, $\{a\} = \{c\}$ or $\{a\} = \{c, d\}$. The latter would force $c = d = a$, collapsing the right-hand set to the singleton $\{\{a\}\}$ — impossible, as the left-hand set has two distinct members. So $\{a\} = \{c\}$, i.e. $a = c$. Matching the remaining members, $\{a, b\} = \{c, d\} = \{a, d\}$; as $b \in \{a, d\}$ and $b \neq a$, we conclude $b = d$.

In either case $a = c$ and $b = d$. $\square$`,
  },
  {
    id: 'binary-union',
    label: 'Union of Sets ∪',
    title: 'Union of Sets (∪)',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['union', 'pair-set'],
    description: String.raw`The **union** of $A$ and $B$ is $A \cup B := \bigcup \{A, B\}$, the set of elements lying in $A$ or in $B$:
$$\forall x\,\bigl(x \in A \cup B \leftrightarrow (x \in A \vee x \in B)\bigr).$$
It combines Pairing (to form $\{A, B\}$) with the Axiom of Union (to flatten it).`,
    definition: String.raw`The **union** of $A$ and $B$ is
$$A \cup B := \bigcup \{A, B\},$$
the set of elements lying in $A$ or in $B$.`,
    proof: String.raw`**Membership characterization:** $x \in A \cup B \leftrightarrow (x \in A \vee x \in B)$. By the Axiom of Union, $x \in \bigcup \{A, B\}$ iff $\exists Y\,(Y \in \{A, B\} \wedge x \in Y)$, i.e. $\exists Y\,\bigl((Y = A \vee Y = B) \wedge x \in Y\bigr)$, which holds exactly when $x \in A$ or $x \in B$. $\square$`,
  },
  {
    id: 'intersection',
    label: 'Intersection ∩',
    title: 'Intersection (∩)',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['separation'],
    description: String.raw`The **intersection** of $A$ and $B$ is the set of elements lying in both:
$$A \cap B := \{x \in A : x \in B\}.$$
It needs no axiom of its own — it is Separation applied to $A$ with the formula $x \in B$. (Note $A \cap B \subseteq A$, which is why one existing set suffices.)`,
    definition: String.raw`The **intersection** of $A$ and $B$ is the set of elements lying in both:
$$A \cap B := \{x \in A : x \in B\}.$$`,
    proof: String.raw`**Well-definedness.** Since $A \cap B \subseteq A$, the collection is obtained from the existing set $A$ by Separation with the formula $x \in B$, so it is a set — no separate axiom is required. Its symmetry, $A \cap B = B \cap A$, is the symmetry of conjunction: $x \in A \wedge x \in B \leftrightarrow x \in B \wedge x \in A$. $\square$`,
  },
  {
    id: 'cartesian-product',
    label: 'Cartesian Product ×',
    title: 'Cartesian Product (×)',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['ordered-pair', 'power-set', 'separation', 'binary-union'],
    description: String.raw`The **Cartesian product** $A \times B$ is the set of all ordered pairs with first coordinate in $A$ and second in $B$:
$$A \times B := \{\langle a, b\rangle : a \in A,\; b \in B\}.$$
This is a set because every such pair lies in $\mathcal{P}(\mathcal{P}(A \cup B))$, so Separation carves $A \times B$ out of that power set.`,
    definition: String.raw`The **Cartesian product** $A \times B$ is the set of all ordered pairs with first coordinate in $A$ and second in $B$:
$$A \times B := \{\langle a, b\rangle : a \in A,\; b \in B\}.$$`,
    proof: String.raw`**It is a set.** Fix $a \in A$ and $b \in B$. Then $\{a\}$ and $\{a, b\}$ are subsets of $A \cup B$, hence members of $\mathcal{P}(A \cup B)$; so $\langle a, b\rangle = \{\{a\}, \{a, b\}\}$ is a subset of $\mathcal{P}(A \cup B)$, i.e. a member of $\mathcal{P}(\mathcal{P}(A \cup B))$. That double power set is a set — $A \cup B$ exists by Union and Pairing, and Power Set applied twice does the rest. Separation now carves out
$$A \times B = \{\,z \in \mathcal{P}(\mathcal{P}(A \cup B)) : z = \langle a, b\rangle \text{ for some } a \in A,\ b \in B\,\},$$
which is therefore a set. $\square$`,
  },
  {
    id: 'relation',
    label: 'Relation',
    title: 'Binary Relation',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['cartesian-product'],
    description: String.raw`A **binary relation** from $A$ to $B$ is any subset $R \subseteq A \times B$; one writes $a\,R\,b$ for $\langle a, b\rangle \in R$. A relation *on* $A$ is a subset of $A \times A$. This single notion underlies orderings, equivalences, and functions alike.`,
    definition: String.raw`A **binary relation** from $A$ to $B$ is a subset $R \subseteq A \times B$; a relation *on* $A$ is a subset of $A \times A$. One writes $a\,R\,b$ to mean $\langle a, b\rangle \in R$.`,
  },
  {
    id: 'function',
    label: 'Function',
    title: 'Function',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['relation'],
    description: String.raw`A **function** $f : A \to B$ is a relation $f \subseteq A \times B$ that is total and single-valued: each $a \in A$ relates to exactly one $b \in B$, denoted $f(a)$.
$$\forall a \in A\;\exists! b \in B\,\bigl(\langle a, b\rangle \in f\bigr).$$
$A$ is the domain and $B$ the codomain. Functions are themselves sets — sets of ordered pairs.`,
    definition: String.raw`A **function** $f : A \to B$ is a relation $f \subseteq A \times B$ that is total and single-valued:
$$\forall a \in A\;\exists! b \in B\,\bigl(\langle a, b\rangle \in f\bigr).$$
The unique such $b$ is written $f(a)$; $A$ is the domain and $B$ the codomain.`,
  },
  {
    id: 'replacement',
    label: 'Replacement',
    title: 'Axiom Schema of Replacement',
    kind: 'axiom',
    tags: ['Set Theory'],
    dependencies: ['membership', 'first-order-logic', 'free-and-bound-variables'],
    description: String.raw`If a formula $\varphi(x, y)$ behaves as a function — for each $x$, exactly one $y$ — then the image of any set $A$ under it is again a set:
$$\forall A\,\Bigl(\,\forall x \in A\,\exists! y\,\varphi(x,y) \;\rightarrow\; \exists B\,\forall y\,\bigl(y \in B \leftrightarrow \exists x \in A\,\varphi(x,y)\bigr)\Bigr).$$
A *schema*, one axiom per $\varphi$. It lets the size of a set bound what is built from it, and it implies Separation.`,
    statement: String.raw`If $\varphi(x, y)$ is functional — for each $x$ at most one $y$ satisfies it — then the image of any set $A$ under it is a set:
$$\forall A\,\Bigl(\,\forall x \in A\,\exists! y\,\varphi(x,y) \;\rightarrow\; \exists B\,\forall y\,\bigl(y \in B \leftrightarrow \exists x \in A\,\varphi(x,y)\bigr)\Bigr).$$
One instance per formula $\varphi$ (parameters allowed).`,
  },
  {
    id: 'regularity',
    label: 'Regularity',
    title: 'Axiom of Regularity (Foundation)',
    kind: 'axiom',
    tags: ['Set Theory'],
    dependencies: ['membership'],
    description: String.raw`**Regularity** (Foundation) says every non-empty set $A$ has a member disjoint from it:
$$\forall A\,\bigl(A \neq \varnothing \rightarrow \exists x \in A\,(x \cap A = \varnothing)\bigr).$$
This rules out infinite descending chains $\cdots \in x_2 \in x_1 \in x_0$ and self-membership $x \in x$, so the set-theoretic universe is built in well-founded layers.`,
    statement: String.raw`Every non-empty set $A$ has a member disjoint from it:
$$\forall A\,\bigl(A \neq \varnothing \rightarrow \exists x \in A\,(x \cap A = \varnothing)\bigr).$$`,
  },
  {
    id: 'transitive-set',
    label: 'Transitive Set',
    title: 'Transitive Set',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['subset'],
    description: String.raw`A set $A$ is **transitive** when every element of an element of $A$ is itself an element of $A$:
$$\forall x\,(x \in A \rightarrow x \subseteq A),$$
equivalently $\bigcup A \subseteq A$. Every von Neumann ordinal is a transitive set on which $\in$ is exactly the well-ordering — which is what makes transitive sets the natural setting for the ordinals.`,
    definition: String.raw`A set $A$ is **transitive** when every element of an element of $A$ is itself an element of $A$:
$$\forall x\,(x \in A \rightarrow x \subseteq A),$$
equivalently $\bigcup A \subseteq A$.`,
    proof: String.raw`**The two formulations agree.** Suppose first that $x \subseteq A$ for every $x \in A$. If $y \in \bigcup A$, then $y \in x$ for some $x \in A$; since $x \subseteq A$, we get $y \in A$. Thus $\bigcup A \subseteq A$. Conversely, suppose $\bigcup A \subseteq A$, and let $x \in A$ with $y \in x$. Then $y \in \bigcup A \subseteq A$, so $y \in A$; as $y$ was arbitrary, $x \subseteq A$. $\square$`,
  },
  {
    id: 'successor',
    label: 'Successor S(x)',
    title: 'Successor (S(x))',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['binary-union', 'singleton'],
    description: String.raw`The **successor** of a set $x$ adjoins $x$ itself as a new element:
$$S(x) := x \cup \{x\}.$$
Starting from $\varnothing$ and iterating gives the von Neumann naturals $0 = \varnothing$, $1 = \{0\}$, $2 = \{0,1\}, \dots$, where each $n$ is the set of its predecessors and so has exactly $n$ elements.`,
    definition: String.raw`The **successor** of a set $x$ adjoins $x$ itself as a new element:
$$S(x) := x \cup \{x\}.$$
It is a set, being the union of the sets $x$ and $\{x\}$.`,
  },
  {
    id: 'infinity',
    label: 'Infinity',
    title: 'Axiom of Infinity',
    kind: 'axiom',
    tags: ['Set Theory'],
    dependencies: ['empty-set', 'successor'],
    description: String.raw`There exists an **inductive** set — one containing $\varnothing$ and closed under successor:
$$\exists I\,\bigl(\varnothing \in I \;\wedge\; \forall x\,(x \in I \rightarrow S(x) \in I)\bigr).$$
This is the only ZFC axiom that asserts an actually infinite set, giving ZFC the strength to construct the natural numbers and everything beyond.`,
    statement: String.raw`There exists an **inductive** set — one containing $\varnothing$ and closed under successor:
$$\exists I\,\bigl(\varnothing \in I \;\wedge\; \forall x\,(x \in I \rightarrow S(x) \in I)\bigr).$$`,
  },
  {
    id: 'natural-numbers',
    label: 'Natural Numbers ω',
    title: 'Natural Numbers (ω)',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['infinity', 'successor', 'empty-set', 'separation'],
    description: String.raw`The set of **natural numbers** $\omega$ is the *smallest* inductive set: the intersection of all inductive subsets of an inductive set $I$ (which exists by Infinity).
$$\omega := \{\,x \in I : x \text{ lies in every inductive set}\,\}.$$
Its members are exactly the finite von Neumann ordinals $\varnothing, S(\varnothing), S(S(\varnothing)), \dots$ Because $\omega$ is the *least* inductive set, proof by induction over it is valid.`,
    definition: String.raw`The set of **natural numbers** $\omega$ is the smallest inductive set: with $I$ any inductive set (which exists by Infinity),
$$\omega := \{\,x \in I : x \text{ belongs to every inductive set}\,\}.$$`,
    proof: String.raw`**$\omega$ is a set, is the least inductive set, and supports induction.** The defining condition is a first-order formula in $x$ (with parameter $I$), so $\omega$ is a set by Separation. It is inductive: $\varnothing$ lies in every inductive set, so $\varnothing \in \omega$; and if $n \in \omega$ then $n$, hence $S(n)$, lies in every inductive set, so $S(n) \in \omega$. For any inductive set $J$, every member of $\omega$ lies in $J$, so $\omega \subseteq J$ — thus $\omega$ is least. Finally, **induction**: if $S \subseteq \omega$ contains $\varnothing$ and is closed under successor, then $S$ is itself inductive, so $\omega \subseteq S$ by leastness, whence $S = \omega$. $\square$`,
  },
  {
    id: 'well-order',
    label: 'Well-Ordering',
    title: 'Well-Ordering',
    kind: 'definition',
    tags: ['Set Theory', 'Order Theory'],
    dependencies: ['total-order'],
    description: String.raw`A **well-ordering** of a set $A$ is a linear order $\le$ in which every non-empty subset has a least element:
$$\forall S\,\bigl(\varnothing \neq S \subseteq A \;\rightarrow\; \exists m \in S\,\forall x \in S\,(m \le x)\bigr).$$
Among linear orders, the well-orderings are precisely those that support transfinite induction and recursion.`,
    definition: String.raw`A **well-ordering** of a set $A$ is a linear (total) order $\le$ in which every non-empty subset has a least element:
$$\forall S\,\bigl(\varnothing \neq S \subseteq A \;\rightarrow\; \exists m \in S\,\forall x \in S\,(m \le x)\bigr).$$`,
  },
  {
    id: 'ordinal',
    label: 'Ordinal',
    title: 'Ordinal',
    kind: 'definition',
    tags: ['Set Theory', 'Order Theory'],
    dependencies: ['transitive-set', 'well-order', 'regularity'],
    description: String.raw`An **ordinal** is a transitive set that is well-ordered by membership $\in$ — equivalently, under Regularity, a transitive set all of whose elements are transitive. Ordinals are the canonical representatives of well-orderings: every well-ordered set is order-isomorphic to exactly one ordinal, and any set of ordinals is well-ordered by $\in$.`,
    definition: String.raw`An **ordinal** is a transitive set that is well-ordered by the membership relation $\in$. Under Regularity this is equivalent to being a transitive set all of whose elements are transitive.`,
  },
  {
    id: 'choice-function',
    label: 'Choice Function',
    title: 'Choice Function',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['function'],
    description: String.raw`A **choice function** for a family $A$ of non-empty sets is a function $f$ with domain $A$ that selects one element from each member:
$$f : A \to \bigcup A \quad\text{with}\quad \forall X \in A\,\bigl(f(X) \in X\bigr).$$
It packages a choice from every member of the family into a single function — no rule for the selections need be given, only that they exist.`,
    definition: String.raw`A **choice function** for a family $A$ of non-empty sets is a function $f$ with domain $A$ that selects one element from each member:
$$f : A \to \bigcup A \quad\text{with}\quad \forall X \in A\,\bigl(f(X) \in X\bigr).$$`,
  },
  {
    id: 'choice',
    label: 'Choice (AC)',
    title: 'Axiom of Choice (AC)',
    kind: 'axiom',
    tags: ['Set Theory'],
    dependencies: ['choice-function'],
    description: String.raw`The **Axiom of Choice** asserts that every family of non-empty sets admits a choice function:
$$\forall A\,\bigl(\varnothing \notin A \;\rightarrow\; \exists f\,(f \text{ is a choice function for } A)\bigr).$$
Non-constructive and independent of the other axioms (Gödel 1938, Cohen 1963), it is equivalent to Zorn's Lemma and to the Well-Ordering Theorem. It is the **C** in ZFC.`,
    statement: String.raw`Every family of non-empty sets admits a choice function:
$$\forall A\,\bigl(\varnothing \notin A \;\rightarrow\; \exists f\,(f \text{ is a choice function for } A)\bigr).$$`,
  },
  {
    id: 'equivalence-relation',
    label: 'Equivalence Relation',
    title: 'Equivalence Relation',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['relation'],
    description: String.raw`An **equivalence relation** on a set $A$ is a relation $R \subseteq A \times A$ — with $a \sim b$ written for $\langle a, b\rangle \in R$ — that is reflexive, symmetric, and transitive: for all $a, b, c \in A$,
$$a \sim a,\qquad a \sim b \Rightarrow b \sim a,\qquad (a \sim b \wedge b \sim c) \Rightarrow a \sim c.$$
It is the abstract notion of *sameness up to a chosen criterion*, and it partitions $A$ into disjoint classes.`,
    definition: String.raw`An **equivalence relation** on a set $A$ is a relation $\sim$ on $A$ (a subset of $A \times A$) that is reflexive, symmetric, and transitive: for all $a, b, c \in A$,
$$a \sim a,\qquad a \sim b \Rightarrow b \sim a,\qquad (a \sim b \wedge b \sim c) \Rightarrow a \sim c.$$`,
  },
  {
    id: 'equivalence-class',
    label: 'Equivalence Class',
    title: 'Equivalence Class',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['equivalence-relation'],
    description: String.raw`The **equivalence class** of $a \in A$ under an equivalence relation $\sim$ is the set of everything related to $a$:
$$[a] := \{x \in A : x \sim a\}.$$
Distinct classes are disjoint and together cover $A$, so $\sim$ partitions $A$; moreover $[a] = [b]$ iff $a \sim b$.`,
    definition: String.raw`The **equivalence class** of $a \in A$ under an equivalence relation $\sim$ is the set of everything related to $a$:
$$[a] := \{x \in A : x \sim a\},$$
a set by Separation.`,
  },
  {
    id: 'quotient-set',
    label: 'Quotient Set',
    title: 'Quotient Set',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['equivalence-class', 'power-set', 'image', 'replacement'],
    description: String.raw`The **quotient set** $A/{\sim}$ is the set of all equivalence classes of $\sim$ on $A$:
$$A/{\sim} := \{\,[a] : a \in A\,\}.$$
It exists as a subset of $\mathcal{P}(A)$ by Separation. Passing to the quotient forges new objects by *identifying* elements deemed equivalent — the engine behind $\mathbb{Z}$, $\mathbb{Q}$, and $\mathbb{R}$.`,
    definition: String.raw`The **quotient set** $A/{\sim}$ is the set of all equivalence classes of $\sim$ on $A$:
$$A/{\sim} := \{\,[a] : a \in A\,\}.$$`,
    proof: String.raw`**It is a set.** Each class $[a]$ is a subset of $A$, so $A/{\sim} \subseteq \mathcal{P}(A)$; being the image of $A$ under the assignment $a \mapsto [a]$, it is a set by Replacement (equivalently, by Separation on $\mathcal{P}(A)$). The map $a \mapsto [a]$, the *canonical projection*, is a surjection $A \twoheadrightarrow A/{\sim}$. $\square$`,
  },
  {
    id: 'recursion-theorem',
    label: 'Recursion Theorem',
    title: 'Recursion Theorem',
    kind: 'theorem',
    tags: ['Set Theory'],
    dependencies: ['natural-numbers', 'function'],
    description: String.raw`The **recursion theorem** licenses definition by recursion on $\omega$: given a set $X$, a point $c \in X$, and a map $g : X \to X$, there is a *unique* function $f : \omega \to X$ with
$$f(0) = c,\qquad f\bigl(S(n)\bigr) = g\bigl(f(n)\bigr).$$
It is what makes the informal "$\dots$" rigorous, and it is the basis for defining addition and multiplication on $\omega$ (and hence its order).`,
    statement: String.raw`Given a set $X$, a point $c \in X$, and a map $g : X \to X$, there is a *unique* function $f : \omega \to X$ with
$$f(0) = c,\qquad f\bigl(S(n)\bigr) = g\bigl(f(n)\bigr)\quad (n \in \omega).$$`,
    proof: String.raw`Call a function $t$ an **approximation** if its domain is some non-zero $n \in \omega$, $t(0) = c$, and $t(S(k)) = g(t(k))$ whenever $S(k) \in n$.

*Overlaps agree.* If $s, t$ are approximations and $k \in \operatorname{dom} s \cap \operatorname{dom} t$, then $s(k) = t(k)$: this holds at $k = 0$ (both equal $c$), and if it holds at $k$ it holds at $S(k)$ (both equal $g$ of the common value), so it holds throughout by induction.

*Approximations exist at every stage.* For each $n \in \omega$ there is an approximation with domain $S(n)$: one with domain $S(0) = \{0\}$ is $\{\langle 0, c\rangle\}$, and an approximation on $S(n)$ extends to one on $S(S(n))$ by adjoining the pair $\langle S(n), g(t(n))\rangle$. The claim follows by induction.

Let $f = \bigcup \{t : t \text{ is an approximation}\}$ — a set, since every approximation is a subset of $\omega \times X$. By the overlap property $f$ is single-valued, hence a function; by the existence property its domain is all of $\omega$; and the defining clauses give $f(0) = c$ and $f(S(n)) = g(f(n))$.

*Uniqueness.* If $f'$ also satisfies the two clauses, then $\{n \in \omega : f(n) = f'(n)\}$ contains $0$ and is closed under successor, so by induction it is all of $\omega$. $\square$`,
  },
  {
    id: 'cardinality',
    label: 'Cardinality',
    title: 'Cardinality',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['function', 'injection', 'bijection'],
    description: String.raw`The **cardinality** $|A|$ of a set measures its size by *bijection*: $|A| = |B|$ when a bijection $A \to B$ exists, and $|A| \le |B|$ when an injection $A \hookrightarrow B$ does. For finite sets it is the number of elements; for infinite sets it opens a hierarchy of *transfinite* sizes — the infinite cardinal numbers.`,
    definition: String.raw`Two sets have the **same cardinality**, written $|A| = |B|$, when a bijection $A \to B$ exists; and $|A| \le |B|$ when an injection $A \hookrightarrow B$ exists. Under Choice, $|A|$ may be taken to be the least ordinal in bijection with $A$.`,
  },
  {
    id: 'countable-uncountable',
    label: 'Countable / Uncountable',
    title: 'Countable and Uncountable Sets',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['cardinality', 'natural-numbers', 'injection', 'bijection'],
    description: String.raw`A set is **countable** when it injects into $\mathbb{N}$ — finite, or in bijection with $\mathbb{N}$ (cardinality $\aleph_0$); otherwise it is **uncountable**. $\mathbb{Z}$ and $\mathbb{Q}$ are countable, whereas $\mathbb{R}$ is uncountable (Cantor's diagonal argument). Countability is the first dividing line in the theory of infinite size.`,
    definition: String.raw`A set is **countable** when it injects into $\mathbb{N}$ — equivalently, when it is finite or in bijection with $\mathbb{N}$ (cardinality $\aleph_0$). Otherwise it is **uncountable**.`,
  },
  {
    id: 'cantors-theorem',
    label: "Cantor's Theorem",
    title: "Cantor's Theorem",
    kind: 'theorem',
    tags: ['Set Theory'],
    dependencies: ['power-set', 'cardinality', 'injection', 'surjection'],
    description: String.raw`No set maps onto its power set, so
$$|A| < |\mathcal{P}(A)|$$
for every set $A$. There is no largest cardinality — iterating $\mathcal{P}$ builds an endless tower of infinities — and the same diagonal argument shows $\mathbb{R}$ is uncountable (indeed $|\mathcal{P}(\mathbb{N})| = |\mathbb{R}|$).`,
    statement: String.raw`For every set $A$,
$$|A| < |\mathcal{P}(A)|:$$
there is an injection $A \to \mathcal{P}(A)$ but no surjection $A \to \mathcal{P}(A)$.`,
    proof: String.raw`The map $a \mapsto \{a\}$ is an injection $A \to \mathcal{P}(A)$, so $|A| \le |\mathcal{P}(A)|$. Suppose, toward a contradiction, that some $f : A \to \mathcal{P}(A)$ were surjective, and form the **diagonal** set
$$D = \{a \in A : a \notin f(a)\},$$
a subset of $A$ by Separation, hence a member of $\mathcal{P}(A)$. By surjectivity $D = f(d)$ for some $d \in A$. But then
$$d \in D \iff d \notin f(d) = D,$$
a contradiction. So no surjection $A \to \mathcal{P}(A)$ exists; in particular there is no bijection, and the inequality is strict. $\square$`,
  },
  {
    id: 'cantor-schroder-bernstein',
    label: 'Schröder–Bernstein',
    title: 'Cantor–Schröder–Bernstein Theorem',
    kind: 'theorem',
    tags: ['Set Theory'],
    dependencies: ['cardinality', 'injection', 'bijection', 'image'],
    description: String.raw`If there are injections $A \hookrightarrow B$ and $B \hookrightarrow A$, then a bijection $A \to B$ exists — so $|A| \le |B|$ and $|B| \le |A|$ together give $|A| = |B|$. It makes cardinal comparison a genuine (antisymmetric) order, and it needs no axiom of choice.`,
    statement: String.raw`If there exist injections $f : A \to B$ and $g : B \to A$, then there exists a bijection $A \to B$. Consequently $|A| \le |B|$ and $|B| \le |A|$ imply $|A| = |B|$.`,
    proof: String.raw`For $S \subseteq A$ set $\Phi(S) = A \setminus g\bigl[\,B \setminus f[S]\,\bigr]$. The operator $\Phi$ is **monotone**: if $S \subseteq T$ then $f[S] \subseteq f[T]$, so $B \setminus f[T] \subseteq B \setminus f[S]$, so $g[B \setminus f[T]] \subseteq g[B \setminus f[S]]$, and finally $\Phi(S) \subseteq \Phi(T)$.

Let $C = \bigcup \{S \subseteq A : S \subseteq \Phi(S)\}$. For each $S$ in this union, $S \subseteq C$ gives $\Phi(S) \subseteq \Phi(C)$, so $S \subseteq \Phi(S) \subseteq \Phi(C)$; taking the union over all such $S$ yields $C \subseteq \Phi(C)$. Applying $\Phi$ once more gives $\Phi(C) \subseteq \Phi(\Phi(C))$, so $\Phi(C)$ is itself one of the sets in the union, whence $\Phi(C) \subseteq C$. Therefore $C = \Phi(C)$, that is,
$$A \setminus C = g\bigl[\,B \setminus f[C]\,\bigr].$$

Define $h : A \to B$ by $h(a) = f(a)$ for $a \in C$ and $h(a) = g^{-1}(a)$ for $a \in A \setminus C$ — well-defined because $A \setminus C \subseteq \operatorname{ran} g$ and $g$ is injective. On $C$, $h = f$ is injective with image $f[C]$; on $A \setminus C$, $h = g^{-1}$ is injective with image $B \setminus f[C]$, since $A \setminus C = g[B \setminus f[C]]$ and $g$ is injective. As $f[C]$ and $B \setminus f[C]$ partition $B$ while $C$ and $A \setminus C$ partition $A$, the map $h$ is a bijection. No appeal to choice is made. $\square$`,
  },
  {
    id: 'zorns-lemma',
    label: "Zorn's Lemma",
    title: "Zorn's Lemma",
    kind: 'theorem',
    tags: ['Set Theory'],
    dependencies: ['partial-order', 'choice', 'transfinite-recursion', 'ordinals-proper-class', 'replacement'],
    description: String.raw`A partially ordered set in which every chain (totally ordered subset) has an upper bound contains a maximal element. Equivalent to the Axiom of Choice, it is the form used to produce maximal ideals, vector-space bases, and algebraic closures without explicit construction.`,
    statement: String.raw`If $(P, \le)$ is a non-empty partially ordered set in which every chain (totally ordered subset) has an upper bound in $P$, then $P$ has a maximal element.`,
    proof: String.raw`**From the Axiom of Choice.** Suppose, toward a contradiction, that $P$ satisfies the hypothesis but has no maximal element. Then every chain $C \subseteq P$ has a *strict* upper bound: it has an upper bound $p$ by hypothesis, and since $p$ is not maximal there is some $q > p$, which strictly bounds $C$. The chains of $P$ form a set (a subfamily of $\mathcal{P}(P)$), so by Choice we may fix a function $u$ assigning to each chain $C$ a strict upper bound $u(C)$.

Define $a_\xi \in P$ for every ordinal $\xi$ by transfinite recursion:
$$a_\xi = u\bigl(\{a_\eta : \eta < \xi\}\bigr).$$
A short induction shows the $a_\eta$ are strictly increasing — at stage $\xi$, $a_\xi$ strictly exceeds every earlier $a_\eta$ — so $\{a_\eta : \eta < \xi\}$ really is a chain and the recursion is legitimate. In particular $\xi \mapsto a_\xi$ is injective.

But then the functional relation $a_\xi \mapsto \xi$ exhibits the class of all ordinals as the image of the *set* $P$ under a definable map, so by Replacement the ordinals would form a set — contradicting the Burali-Forti theorem. Hence $P$ must have a maximal element. $\square$`,
  },
  {
    id: 'well-ordering-theorem',
    label: 'Well-Ordering Theorem',
    title: 'Well-Ordering Theorem',
    kind: 'theorem',
    tags: ['Set Theory'],
    dependencies: ['well-order', 'choice', 'transfinite-recursion', 'ordinals-proper-class', 'bijection', 'replacement'],
    description: String.raw`Every set admits a well-ordering — a total order in which every non-empty subset has a least element. Equivalent to the Axiom of Choice (and to Zorn's lemma), it underwrites transfinite induction and recursion on arbitrary sets, however large.`,
    statement: String.raw`Every set $A$ admits a well-ordering: a total order on $A$ in which every non-empty subset has a least element.`,
    proof: String.raw`**From the Axiom of Choice.** By Choice fix a function $c$ assigning to each non-empty subset $X \subseteq A$ an element $c(X) \in X$. Define $a_\xi \in A$ by transfinite recursion, for as long as possible:
$$a_\xi = c\bigl(A \setminus \{a_\eta : \eta < \xi\}\bigr),\qquad \text{defined while } A \setminus \{a_\eta : \eta < \xi\} \neq \varnothing.$$
Each $a_\xi$ differs from all earlier $a_\eta$ (it is chosen from their complement), so $\xi \mapsto a_\xi$ is injective wherever it is defined.

The process must halt: otherwise $a_\xi$ would be defined for *every* ordinal, injecting the proper class of ordinals into the set $A$ and making the ordinals a set by Replacement — impossible by Burali-Forti. So there is a least ordinal $\theta$ with $A \setminus \{a_\eta : \eta < \theta\} = \varnothing$, at which point $\xi \mapsto a_\xi$ is a bijection $\theta \to A$. Transporting the canonical well-order of the ordinal $\theta$ across this bijection — declaring $a_\eta \preceq a_\xi$ iff $\eta \le \xi$ — well-orders $A$. $\square$`,
  },

  // ── Maps between sets: the injection / surjection / bijection layer ──────────
  {
    id: 'injection',
    label: 'Injection',
    title: 'Injection (Injective Function)',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['function'],
    description: String.raw`An **injection** never collapses two points: distinct inputs keep distinct outputs, so the codomain holds a faithful copy of the domain. Injectivity is exactly what lets a function *embed* one set inside another, and the existence of an injection $A \hookrightarrow B$ is the meaning of "$A$ is no larger than $B$", $|A| \le |B|$.`,
    definition: String.raw`A function $f : A \to B$ is **injective** (an *injection*, written $f : A \hookrightarrow B$) when distinct inputs have distinct outputs:
$$\forall a, a' \in A\,\bigl(f(a) = f(a') \rightarrow a = a'\bigr).$$`,
  },
  {
    id: 'surjection',
    label: 'Surjection',
    title: 'Surjection (Surjective Function)',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['function'],
    description: String.raw`A **surjection** leaves nothing out: every point of the codomain is hit. Where injectivity copies the domain faithfully, surjectivity exhausts the codomain — and a surjection $A \twoheadrightarrow B$ witnesses that $B$ is no larger than $A$. Surjections out of $A$ correspond to partitions of $A$ (the fibres), the dual face of the equivalence-class story.`,
    definition: String.raw`A function $f : A \to B$ is **surjective** (a *surjection*, written $f : A \twoheadrightarrow B$) when every element of the codomain has a preimage:
$$\forall b \in B\;\exists a \in A\,\bigl(f(a) = b\bigr),$$
equivalently when its range is all of $B$.`,
  },
  {
    id: 'bijection',
    label: 'Bijection',
    title: 'Bijection',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['injection', 'surjection'],
    description: String.raw`A **bijection** is a perfect pairing — each element of one set matched to exactly one of the other, with none left over on either side. It is the precise sense in which two sets "have the same number of elements", and it is the notion of *sameness* underlying cardinality: $|A| = |B|$ means a bijection exists.`,
    definition: String.raw`A function $f : A \to B$ is a **bijection** when it is both injective and surjective — equivalently, when every $b \in B$ has *exactly one* preimage. One then writes $f : A \xrightarrow{\sim} B$.`,
  },
  {
    id: 'function-composition',
    label: 'Composition ∘',
    title: 'Composition of Functions (∘)',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['function'],
    description: String.raw`**Composition** chains functions end to end: do $f$, then $g$. It is associative and has the identity functions as units, which is exactly the structure making sets and functions into a *category* — the ambient world in which most of mathematics is phrased.`,
    definition: String.raw`For functions $f : A \to B$ and $g : B \to C$, the **composite** $g \circ f : A \to C$ is given by $(g \circ f)(a) = g(f(a))$; as a set of pairs,
$$g \circ f := \{\langle a, c\rangle \in A \times C : \exists b \in B\,(\langle a, b\rangle \in f \wedge \langle b, c\rangle \in g)\}.$$`,
    proof: String.raw`**It is a function $A \to C$.** The displayed set is a subset of $A \times C$, hence a relation. It is total and single-valued: for each $a \in A$ there is a unique $b = f(a)$ with $\langle a, b\rangle \in f$, and then a unique $c = g(b)$ with $\langle b, c\rangle \in g$, so exactly one $c$ satisfies the defining condition. Associativity, $h \circ (g \circ f) = (h \circ g) \circ f$, holds because both send $a \mapsto h(g(f(a)))$. $\square$`,
  },
  {
    id: 'image',
    label: 'Image f[S]',
    title: 'Image of a Set',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['function', 'separation', 'replacement'],
    description: String.raw`The **image** is where a function sends a chunk of its domain — the set of values it takes there. Taking the image of the whole domain gives the *range*. That images are always sets is, at bottom, the content of Replacement: a definable operation cannot carry a set outside the set universe.`,
    definition: String.raw`For $f : A \to B$ and $S \subseteq A$, the **image** of $S$ under $f$ is
$$f[S] := \{f(x) : x \in S\} = \{b \in B : \exists x \in S\,(f(x) = b)\}.$$
The **range** of $f$ is $f[A]$.`,
    proof: String.raw`**It is a set.** Written as $\{b \in B : \exists x \in S\,(\langle x, b\rangle \in f)\}$, the image is carved out of the codomain $B$ by Separation, so it is a set. (Even without a codomain to separate from, it would be a set: it is the image of $S$ under the operation $x \mapsto f(x)$, a set by Replacement.) $\square$`,
  },
  {
    id: 'inverse-function',
    label: 'Inverse f⁻¹',
    title: 'Inverse Function',
    kind: 'proposition',
    tags: ['Set Theory'],
    dependencies: ['bijection', 'function-composition', 'identity-function'],
    description: String.raw`A bijection can be run backwards, and the result is again a bijection. This is why "same size" is symmetric, and why bijections are the *isomorphisms* of plain sets: invertible maps that carry all set-theoretic structure both ways. The inverse undoes the original on the nose, in both directions.`,
    statement: String.raw`Every bijection $f : A \to B$ has a unique **inverse** $f^{-1} : B \to A$ satisfying
$$f^{-1} \circ f = \operatorname{id}_A \qquad\text{and}\qquad f \circ f^{-1} = \operatorname{id}_B,$$
and $f^{-1}$ is itself a bijection.`,
    proof: String.raw`Let $g = \{\langle b, a\rangle : \langle a, b\rangle \in f\}$, the converse relation. It is a function $B \to A$: *total*, because surjectivity gives each $b \in B$ some $a$ with $f(a) = b$, whence $\langle b, a\rangle \in g$; *single-valued*, because if $\langle b, a\rangle, \langle b, a'\rangle \in g$ then $f(a) = b = f(a')$, so $a = a'$ by injectivity. By construction $g(f(a)) = a$ and $f(g(b)) = b$, i.e. $g \circ f = \operatorname{id}_A$ and $f \circ g = \operatorname{id}_B$. Having a two-sided inverse, $g$ is itself a bijection. Uniqueness: if $h$ also satisfies the two identities, then $h = h \circ \operatorname{id}_B = h \circ (f \circ g) = (h \circ f) \circ g = \operatorname{id}_A \circ g = g$. $\square$`,
  },
  {
    id: 'identity-function',
    label: 'Identity id_A',
    title: 'Identity Function',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['function'],
    description: String.raw`The **identity** does nothing — it hands each input straight back. Trivial as it looks, it is the unit of composition (the "$1$" of the category of sets) and the canonical bijection of a set with itself; it is the yardstick against which inverses and isomorphisms are defined, since $f^{-1}$ is exactly what composes with $f$ to give it back.`,
    definition: String.raw`The **identity function** on a set $A$ is $\operatorname{id}_A : A \to A$ given by $\operatorname{id}_A(a) = a$ for all $a \in A$ — as a set of pairs, the diagonal
$$\operatorname{id}_A := \{\langle a, a\rangle : a \in A\}.$$`,
  },

  // ── Small results re-homed as their own proven nodes ─────────────────────────
  {
    id: 'subset-antisymmetry',
    label: 'Set Equality Criterion',
    title: 'Antisymmetry of Inclusion',
    kind: 'proposition',
    tags: ['Set Theory'],
    dependencies: ['subset', 'extensionality'],
    description: String.raw`This is Extensionality in its everyday working clothes: to prove two sets equal, show each contains the other. Almost every set-equality proof in mathematics runs this way. It also says that inclusion is *antisymmetric*, the property that makes $\subseteq$ a genuine partial order on any collection of sets.`,
    statement: String.raw`For all sets $A$ and $B$,
$$A = B \;\Longleftrightarrow\; (A \subseteq B \;\wedge\; B \subseteq A).$$`,
    proof: String.raw`If $A = B$ then both inclusions hold trivially. Conversely, suppose $A \subseteq B$ and $B \subseteq A$. For any $x$, the first inclusion gives $x \in A \rightarrow x \in B$ and the second $x \in B \rightarrow x \in A$, so $x \in A \leftrightarrow x \in B$. As this holds for every $x$, Extensionality yields $A = B$. $\square$`,
  },
  {
    id: 'no-self-membership',
    label: 'No Self-Membership',
    title: 'No Set Contains Itself',
    kind: 'proposition',
    tags: ['Set Theory'],
    dependencies: ['regularity', 'singleton', 'pair-set', 'binary-union'],
    description: String.raw`Foundation in its most familiar guise: nothing is a member of itself, and there are no membership loops at all. This is why naive objects like "the set of all sets" or Russell's self-referential collection have no place in the well-founded universe — the cumulative hierarchy is built strictly upward, never circling back.`,
    statement: String.raw`No set is a member of itself:
$$\forall x\,(x \notin x).$$
More generally, there is no finite membership cycle $x_0 \in x_1 \in \cdots \in x_n \in x_0$.`,
    proof: String.raw`Let $x$ be any set. By Pairing the singleton $\{x\}$ exists and is non-empty, so by Regularity it has a member disjoint from it; its only member is $x$, so $x \cap \{x\} = \varnothing$. Were $x \in x$, then $x$ would belong to both $x$ and $\{x\}$, i.e. $x \in x \cap \{x\}$ — contradiction. Hence $x \notin x$.

For a cycle $x_0 \in x_1 \in \cdots \in x_n \in x_0$, form the set $A = \{x_0, \dots, x_n\}$ (finitely many Pairings and Unions). Every $x_i \in A$ contains its predecessor in the cycle, which also lies in $A$, so no member of $A$ is disjoint from $A$ — contradicting Regularity. $\square$`,
  },
  {
    id: 'equivalence-classes-partition',
    label: 'Classes Partition',
    title: 'Equivalence Classes Partition a Set',
    kind: 'theorem',
    tags: ['Set Theory'],
    dependencies: ['equivalence-class'],
    description: String.raw`The deep fact behind "modding out": an equivalence relation on $A$ and a partition of $A$ into blocks are *the same data, viewed two ways*. Grouping equivalent elements yields disjoint blocks that cover $A$; conversely any such grouping defines an equivalence. This correspondence is what makes quotient constructions — $\mathbb{Z}/n\mathbb{Z}$, $\mathbb{Q}$, $\mathbb{R}$, function spaces mod null sets — legitimate.`,
    statement: String.raw`Let $\sim$ be an equivalence relation on $A$. Its equivalence classes are non-empty, pairwise disjoint, and cover $A$ — i.e. they *partition* $A$ — with $[a] = [b] \Leftrightarrow a \sim b$. Conversely, every partition of $A$ is the set of classes of a unique equivalence relation.`,
    proof: String.raw`**Classes partition $A$.** *(i) $[a] = [b] \iff a \sim b$.* If $a \sim b$ and $x \in [a]$, then $x \sim a \sim b$, so $x \in [b]$; by symmetry $[a] = [b]$. Conversely, reflexivity gives $a \in [a]$, so $[a] = [b]$ forces $a \in [b]$, i.e. $a \sim b$. *(ii) Disjointness.* If $z \in [a] \cap [b]$ then $a \sim z \sim b$, so $a \sim b$ and $[a] = [b]$ by (i); thus distinct classes are disjoint. *(iii) Cover.* Each $a \in A$ lies in $[a]$ by reflexivity, and every class is non-empty for the same reason.

**Converse.** Given a partition $P$ of $A$, define $a \sim b$ to mean that some block of $P$ contains both. This is reflexive (each $a$ lies in some block, as $P$ covers $A$), symmetric (trivially), and transitive (the block through any point is unique, by disjointness). Its classes are exactly the blocks of $P$, and it is the only equivalence relation with those classes, since (i) recovers the relation from its classes. $\square$`,
  },

  // ── Ordinals: order structure ───────────────────────────────────────────────
  {
    id: 'ordinal-element-is-ordinal',
    label: 'Elements of Ordinals',
    title: 'Every Element of an Ordinal is an Ordinal',
    kind: 'lemma',
    tags: ['Set Theory', 'Order Theory'],
    dependencies: ['ordinal', 'transitive-set'],
    description: String.raw`Ordinals are *hereditary*: look inside an ordinal and you find only smaller ordinals. This is the structural fact that lets membership $\in$ behave as the less-than relation, and that realizes each ordinal literally as the set of all ordinals below it — the von Neumann picture in which $3 = \{0, 1, 2\}$.`,
    statement: String.raw`Every element of an ordinal is itself an ordinal. Consequently each ordinal $\alpha$ is precisely the set of all ordinals below it: $\alpha = \{\beta : \beta \text{ is an ordinal and } \beta \in \alpha\}$.`,
    proof: String.raw`Let $\alpha$ be an ordinal and $\beta \in \alpha$. Since $\alpha$ is transitive, $\beta \subseteq \alpha$, so membership — a well-order on $\alpha$ — restricts to a well-order on $\beta$. It remains to show $\beta$ is transitive. Take $y \in x \in \beta$. From $\beta \subseteq \alpha$ we get $x \in \alpha$, and from $x \subseteq \alpha$ (transitivity of $\alpha$) we get $y \in \alpha$; thus $y, x, \beta$ all lie in $\alpha$, where $\in$ is a *transitive* relation (being a linear order there), so $y \in x$ and $x \in \beta$ give $y \in \beta$. Hence $\beta$ is a transitive set well-ordered by $\in$ — an ordinal. $\square$`,
  },
  {
    id: 'ordinal-trichotomy',
    label: 'Ordinal Trichotomy',
    title: 'Ordinals are Linearly Ordered by ∈',
    kind: 'theorem',
    tags: ['Set Theory', 'Order Theory'],
    dependencies: ['ordinal', 'ordinal-element-is-ordinal', 'no-self-membership', 'intersection', 'separation'],
    description: String.raw`Any two ordinals are comparable — one is a member of the other, or they are equal — with $\in$ playing the role of $<$ and $\subseteq$ that of $\le$. So the ordinals are not merely each internally well-ordered; they are *globally* well-ordered, a single transfinite number line. This comparability is what lets ordinals serve as the universal measuring stick for well-orderings and as the index along which transfinite induction runs.`,
    statement: String.raw`For ordinals $\alpha, \beta$, exactly one of
$$\alpha \in \beta, \qquad \alpha = \beta, \qquad \beta \in \alpha$$
holds; equivalently $\alpha \subseteq \beta \Leftrightarrow (\alpha \in \beta \vee \alpha = \beta)$. Hence $\in$ strictly well-orders every set of ordinals.`,
    proof: String.raw`**Step 1 (inclusion gives membership).** If $\alpha \subsetneq \beta$ are ordinals, then $\alpha \in \beta$. Let $\gamma$ be the $\in$-least element of the non-empty set $\beta \setminus \alpha$ (which has a least element since $\beta$ is well-ordered by $\in$). We show $\gamma = \alpha$. If $\delta \in \gamma$ then $\delta \in \beta$ (as $\gamma \in \beta$ and $\beta$ is transitive), and $\delta \notin \beta \setminus \alpha$ by minimality of $\gamma$, so $\delta \in \alpha$; thus $\gamma \subseteq \alpha$. Conversely let $\delta \in \alpha \subseteq \beta$; comparing $\delta, \gamma \in \beta$ via the linear order $\in$ on $\beta$, if $\delta = \gamma$ or $\gamma \in \delta$ then $\gamma \in \alpha$ (using $\alpha$ transitive in the second case), contradicting $\gamma \in \beta \setminus \alpha$; so $\delta \in \gamma$, giving $\alpha \subseteq \gamma$. Hence $\alpha = \gamma \in \beta$.

**Step 2 (comparability).** Let $\gamma = \alpha \cap \beta$. It is transitive (an intersection of transitive sets) and well-ordered by $\in$ (being a subset of $\alpha$), so $\gamma$ is an ordinal with $\gamma \subseteq \alpha$ and $\gamma \subseteq \beta$. If $\gamma \subsetneq \alpha$ and $\gamma \subsetneq \beta$, then Step 1 gives $\gamma \in \alpha$ and $\gamma \in \beta$, so $\gamma \in \alpha \cap \beta = \gamma$, contradicting $\gamma \notin \gamma$. Hence $\gamma = \alpha$ or $\gamma = \beta$; say $\gamma = \alpha$, so $\alpha \subseteq \beta$ and, by Step 1, $\alpha \in \beta$ or $\alpha = \beta$. The other case is symmetric. So at least one of the three holds; the $\subseteq$ characterization is exactly Step 1 together with this.

**Exclusivity.** $\alpha \in \beta$ and $\beta \in \alpha$ would form a $2$-cycle, and $\alpha = \beta$ with either membership would give $\alpha \in \alpha$ — both barred by Foundation. So exactly one holds.

**Well-ordering.** On any set $S$ of ordinals, $\in$ is irreflexive and transitive (if $\rho \in \sigma \in \tau$ are ordinals then $\rho \in \tau$, since $\tau$ is transitive), and linear by the above. It is well-founded: given non-empty $S$, pick $\alpha \in S$; if $\alpha \cap S = \varnothing$, $\alpha$ is least, otherwise the $\in$-least element of $\alpha \cap S$ (which exists as $\alpha$ is an ordinal) is $\in$-least in $S$. $\square$`,
  },
  {
    id: 'successor-ordinal',
    label: 'Successor Ordinal',
    title: 'Successor Ordinal (α + 1)',
    kind: 'definition',
    tags: ['Set Theory', 'Order Theory'],
    dependencies: ['ordinal', 'successor', 'ordinal-trichotomy', 'ordinal-element-is-ordinal'],
    description: String.raw`Stepping one place past an ordinal: $\alpha + 1$ adds a single new top element, $\alpha$ itself, with nothing squeezed in between. Iterating the step from $0$ produces the natural numbers; iterating it past $\omega$ gives $\omega + 1, \omega + 2, \dots$ The successors are the "steps" of the transfinite staircase, as opposed to the "landings" where one must instead take a limit.`,
    definition: String.raw`The **successor** of an ordinal $\alpha$ is
$$\alpha + 1 := S(\alpha) = \alpha \cup \{\alpha\}.$$`,
    proof: String.raw`**It is the least ordinal greater than $\alpha$.** First, $S(\alpha)$ is an ordinal: it is transitive — each $x \in S(\alpha)$ is either $\alpha$ (and $\alpha \subseteq S(\alpha)$) or an element of $\alpha$ (and $x \subseteq \alpha \subseteq S(\alpha)$ by transitivity of $\alpha$) — and its elements, being $\alpha$ together with the elements of $\alpha$, are all ordinals, so $\in$ well-orders it. Next, $\alpha \in S(\alpha)$, so $\alpha$ precedes $S(\alpha)$. Finally, if $\beta$ is any ordinal with $\alpha \in \beta$, then $S(\alpha) \subseteq \beta$: each element of $S(\alpha)$ is $\alpha \in \beta$ or an element of $\alpha \subseteq \beta$. By trichotomy $S(\alpha) \subseteq \beta$ gives $S(\alpha) \in \beta$ or $S(\alpha) = \beta$ — so no ordinal lies strictly between $\alpha$ and $S(\alpha)$. $\square$`,
  },
  {
    id: 'limit-ordinal',
    label: 'Limit Ordinal',
    title: 'Limit Ordinal',
    kind: 'definition',
    tags: ['Set Theory', 'Order Theory'],
    dependencies: ['ordinal', 'successor-ordinal', 'union', 'ordinal-trichotomy', 'ordinal-element-is-ordinal'],
    description: String.raw`A limit ordinal is reached only by *gathering* its predecessors, never by a single step from a predecessor below — it has no immediate predecessor. These are the "landings" of the transfinite staircase: $\omega$, then $\omega \cdot 2$, $\omega^2$, and so on. They are precisely the stages where a transfinite recursion must take a union rather than apply its successor step.`,
    definition: String.raw`A **limit ordinal** is a non-zero ordinal $\lambda$ that is not the successor of any ordinal — equivalently, one with $\lambda = \bigcup \lambda$ (so $\lambda = \sup\{\alpha : \alpha \in \lambda\}$), equivalently one for which $\alpha \in \lambda \Rightarrow \alpha + 1 \in \lambda$. The least limit ordinal is $\omega$.`,
    proof: String.raw`**The characterizations agree.** For any ordinal $\alpha$, $\bigcup \alpha$ is an ordinal (a transitive set of ordinals), and it is the supremum of the elements of $\alpha$. If $\alpha = \beta + 1$, then $\bigcup \alpha = \beta \neq \alpha$. If $\alpha = 0$, then $\bigcup \alpha = 0$. If $\alpha$ is a non-zero non-successor, then $\bigcup \alpha = \alpha$: inclusion $\bigcup\alpha \subseteq \alpha$ is transitivity of $\alpha$, and for $\xi \in \alpha$ we have $\xi + 1 \in \alpha$ (otherwise trichotomy forces $\alpha \subseteq \xi + 1$, hence $\alpha = \xi+1$ as $\xi \in \alpha$, making $\alpha$ a successor), so $\xi \in \xi + 1 \in \alpha$ shows $\xi \in \bigcup\alpha$. So $\bigcup\lambda = \lambda$ holds exactly when $\lambda$ is $0$ or a limit. Closure under successor lines up the same way: a successor $\lambda = \beta + 1$ has $\beta \in \lambda$ yet $\lambda \notin \lambda$, so it is not closed, whereas a non-successor $\lambda$ satisfies $\xi \in \lambda \Rightarrow \xi + 1 \in \lambda$ by the argument just given. Hence for non-zero $\lambda$ the three conditions coincide. $\square$`,
  },

  // ── Transfinite induction and recursion ─────────────────────────────────────
  {
    id: 'transfinite-induction',
    label: 'Transfinite Induction',
    title: 'Transfinite Induction',
    kind: 'theorem',
    tags: ['Set Theory', 'Order Theory'],
    dependencies: ['ordinal', 'separation', 'first-order-logic'],
    description: String.raw`Ordinary induction, stretched across all the ordinals. To prove a property of every ordinal it suffices to prove it at $\alpha$ whenever it holds at every smaller ordinal — and that single clause silently covers all three cases at once: $0$ (vacuously, nothing is below it), successors, and limits. It is the engine of essentially every argument that reaches past the finite.`,
    statement: String.raw`Let $\varphi(x)$ be any first-order property. If
$$\text{for every ordinal } \alpha,\quad \bigl[(\forall \beta \in \alpha)\,\varphi(\beta)\bigr] \rightarrow \varphi(\alpha),$$
then $\varphi(\alpha)$ holds for every ordinal $\alpha$. (One instance per formula $\varphi$.)`,
    proof: String.raw`Suppose the hypothesis holds yet $\varphi(\alpha_0)$ fails for some ordinal $\alpha_0$. Consider $T = \{\beta \in \alpha_0 : \neg\varphi(\beta)\}$, a subset of $\alpha_0$ by Separation.

If $T = \varnothing$, then $\varphi(\beta)$ holds for all $\beta \in \alpha_0$, so the hypothesis gives $\varphi(\alpha_0)$ — contradiction.

If $T \neq \varnothing$, then since $\alpha_0$ is well-ordered by $\in$, $T$ has an $\in$-least element $\beta_0$. For every $\gamma \in \beta_0$ we have $\gamma \in \alpha_0$ (as $\beta_0 \in \alpha_0$ and $\alpha_0$ is transitive) and $\gamma \notin T$ (minimality), so $\varphi(\gamma)$ holds. Thus $\varphi$ holds below $\beta_0$, and the hypothesis gives $\varphi(\beta_0)$ — contradicting $\beta_0 \in T$.

Either way we reach a contradiction, so $\varphi$ holds at every ordinal. $\square$`,
  },
  {
    id: 'transfinite-recursion',
    label: 'Transfinite Recursion',
    title: 'Transfinite Recursion',
    kind: 'theorem',
    tags: ['Set Theory', 'Order Theory'],
    dependencies: ['ordinal', 'transfinite-induction', 'replacement', 'function', 'first-order-logic'],
    description: String.raw`The recursion theorem for $\omega$, extended along all the ordinals: one may define a value at each ordinal in terms of the values already assigned below it. At successor stages this reads off the previous value; at limit stages it consolidates everything below (typically by a union). This is how the cumulative hierarchy $V_\alpha$, ordinal arithmetic, and the choice-based constructions are all built — each stage standing on the totality of its predecessors.`,
    statement: String.raw`Let $G$ be a class operation assigning a set $G(s)$ to every function $s$ whose domain is an ordinal. Then there is a *unique* class operation $F$, defined on all ordinals, with
$$F(\alpha) = G\bigl(F \restriction \alpha\bigr) \qquad\text{for every ordinal } \alpha.$$
The same holds with an arbitrary well-ordered set in place of the ordinals.`,
    proof: String.raw`Call a function $t$ an **$\alpha$-approximation** if $\operatorname{dom} t = \alpha$ (an ordinal) and $t(\xi) = G(t \restriction \xi)$ for all $\xi \in \alpha$.

*Approximations are unique and coherent.* If $s$ is an $\alpha$-approximation and $t$ a $\beta$-approximation, then $s$ and $t$ agree on $\alpha \cap \beta$: by transfinite induction on $\xi$, if they agree below $\xi$ then $s \restriction \xi = t \restriction \xi$, so $s(\xi) = G(s \restriction \xi) = G(t \restriction \xi) = t(\xi)$. In particular there is at most one $\alpha$-approximation for each $\alpha$.

*Approximations exist.* By transfinite induction, suppose for every $\beta \in \alpha$ there is the (unique) $\beta$-approximation $t_\beta$. The assignment $\beta \mapsto t_\beta$ is definable on the set $\alpha$, so by Replacement $\{t_\beta : \beta \in \alpha\}$ is a set, and hence so is $t := \{\langle \beta, G(t_\beta)\rangle : \beta \in \alpha\}$, a function with domain $\alpha$. For each $\xi \in \alpha$, coherence gives $t \restriction \xi = t_\xi$, so $t(\xi) = G(t_\xi) = G(t \restriction \xi)$; thus $t$ is an $\alpha$-approximation.

Define $F(\alpha) = G(t_\alpha)$ with $t_\alpha$ the unique $\alpha$-approximation. Then $F \restriction \alpha = t_\alpha$ (their values agree, by coherence), so $F(\alpha) = G(F \restriction \alpha)$ for every $\alpha$. Uniqueness of $F$ is transfinite induction once more: any $F'$ obeying the recurrence agrees with $F$ at $\alpha$ whenever it agrees below $\alpha$. Replacing "ordinal" by "initial segment of a fixed well-order" throughout gives the version for a well-ordered set. $\square$`,
  },
  {
    id: 'ordinals-proper-class',
    label: 'Burali-Forti',
    title: 'The Ordinals Form a Proper Class (Burali-Forti)',
    kind: 'theorem',
    tags: ['Set Theory'],
    dependencies: ['ordinal', 'ordinal-element-is-ordinal', 'ordinal-trichotomy', 'no-self-membership'],
    description: String.raw`There is no set of all ordinals — they are *too many*, a proper class. The reason is sharp: such a set would itself be an ordinal, hence a member of itself, which Foundation forbids. Historically the Burali-Forti antinomy of naive set theory, it becomes, in ZFC, a clean theorem; and it is exactly the fact that powers the AC-equivalence proofs, where a construction "running through all the ordinals" must collapse because the ordinals cannot be packed into any set.`,
    statement: String.raw`There is no set whose members are exactly the ordinals; the ordinals form a *proper class*.`,
    proof: String.raw`Suppose toward a contradiction that $\Omega$ is a set with $x \in \Omega \leftrightarrow x$ is an ordinal. Then $\Omega$ is transitive: if $\beta \in \alpha \in \Omega$, then $\beta$ is an ordinal (an element of an ordinal), so $\beta \in \Omega$. And $\Omega$ is well-ordered by $\in$: by trichotomy $\in$ strictly well-orders any set of ordinals. So $\Omega$ is a transitive set well-ordered by $\in$ — that is, $\Omega$ is itself an ordinal. But then $\Omega \in \Omega$, contradicting that no set is a member of itself. Hence no such set exists. $\square$`,
  },

  // ── Adjacent core: representation, cardinals, ordinal arithmetic ─────────────
  {
    id: 'order-isomorphism',
    label: 'Order Isomorphism',
    title: 'Order Isomorphism',
    kind: 'definition',
    tags: ['Order Theory', 'Set Theory'],
    dependencies: ['bijection', 'partial-order'],
    description: String.raw`An order isomorphism is a perfect dictionary between two ordered sets: a bijection that preserves the order in both directions, so the two structures are indistinguishable as *orders*. It is the right notion of "sameness" for ordered sets, and the relation "is order-isomorphic to" — reflexive, symmetric, transitive — sorts them into *order types*.`,
    definition: String.raw`An **order isomorphism** between ordered sets $(P, \le)$ and $(Q, \preceq)$ is a bijection $f : P \to Q$ that preserves order in both directions:
$$a \le b \;\Longleftrightarrow\; f(a) \preceq f(b)\qquad (a, b \in P).$$
When one exists, $P$ and $Q$ are **order-isomorphic**.`,
  },
  {
    id: 'ordinal-representation',
    label: 'Order Type',
    title: 'Every Well-Ordering has an Order Type',
    kind: 'theorem',
    tags: ['Set Theory', 'Order Theory'],
    dependencies: ['well-order', 'ordinal', 'ordinal-trichotomy', 'transfinite-recursion', 'order-isomorphism', 'no-self-membership', 'replacement'],
    description: String.raw`The theorem that justifies the ordinals' very purpose: every well-ordered set is a faithful copy of exactly one ordinal, its *order type*. So the ordinals are not just *some* well-orderings but a complete, non-redundant catalogue of *all* of them — one canonical representative per isomorphism class. The map that realizes this, sending each element to the set of images of its predecessors, is the Mostowski collapse.`,
    statement: String.raw`Every well-ordered set $(W, <)$ is order-isomorphic to a unique ordinal — its **order type** — by a unique order isomorphism.`,
    proof: String.raw`Define $f$ on $W$ by recursion along the well-order:
$$f(w) = \{f(v) : v < w\},$$
the set of images of the predecessors of $w$ (a legitimate definition by transfinite recursion along $W$).

*Each $f(w)$ is an ordinal and $f$ is order-preserving.* By induction along $W$: assume for all $v < w$ that $f(v)$ is an ordinal and $f(v') \in f(v)$ whenever $v' < v$. Then $f(w) = \{f(v) : v < w\}$ is a set of ordinals, and it is transitive — if $\beta \in f(w)$, say $\beta = f(v)$ with $v < w$, and $\gamma \in \beta = f(v)$, then $\gamma = f(v')$ for some $v' < v < w$, so $\gamma \in f(w)$. A transitive set of ordinals is an ordinal, so $f(w)$ is one, and $v < w$ gives $f(v) \in f(w)$ by definition.

*$f$ is an order isomorphism onto an ordinal.* It is injective: for $v < w$, $f(v) \in f(w)$ forces $f(v) \neq f(w)$ (else $f(w) \in f(w)$). Order is reflected too: if $f(v) \in f(w)$ but not $v < w$, then $w \le v$, giving $f(w) \in f(v)$ or $f(w) = f(v)$ and hence a membership cycle, impossible. So $f$ preserves and reflects $<$. Its range $\alpha = \{f(w) : w \in W\}$ is a set by Replacement, transitive by the same argument as above, and a set of ordinals — hence an ordinal — and $f : W \to \alpha$ is an order isomorphism.

*Uniqueness.* If $W$ is also isomorphic to an ordinal $\alpha'$, then $\alpha \cong \alpha'$ as orders; but an order isomorphism $g$ between ordinals is the identity (by induction $g(\xi) = \{g(\eta) : \eta \in \xi\} = \{\eta : \eta \in \xi\} = \xi$), so $\alpha = \alpha'$ and the isomorphism $W \to \alpha$ is unique. $\square$`,
  },
  {
    id: 'cardinal-number',
    label: 'Cardinal Number',
    title: 'Cardinal Number',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['ordinal', 'cardinality', 'ordinal-trichotomy', 'bijection', 'well-ordering-theorem', 'ordinal-representation', 'ordinal-element-is-ordinal'],
    description: String.raw`Cardinals are the official sizes — the ordinals chosen as canonical representatives of "same number of elements". Among all the ordinals of a given size (which a well-ordering crams a set into), the *least* is taken as the size itself; these least-of-their-size ordinals are the cardinals. The finite ones are the natural numbers; then come $\aleph_0 = \omega$, $\aleph_1$, $\aleph_2, \dots$ Under Choice every set has one, turning $|A|$ from a comparison into an actual object.`,
    definition: String.raw`A **cardinal number** is an ordinal $\kappa$ that is not in bijection with any smaller ordinal — an *initial ordinal*:
$$\text{no } \alpha \in \kappa \text{ admits a bijection } \alpha \xrightarrow{\sim} \kappa.$$
Under the Axiom of Choice, the **cardinality** $|A|$ of a set $A$ is the least ordinal in bijection with $A$, which is such a cardinal.`,
    proof: String.raw`**Under Choice, $|A|$ is well-defined and is a cardinal.** By the Well-Ordering Theorem $A$ can be well-ordered, hence (by the existence of order types) is in bijection with some ordinal. The ordinals in bijection with $A$ form a non-empty class, which therefore has an $\in$-least element $\kappa$ — any non-empty class of ordinals does, since within any one of its members the candidates form a set well-ordered by $\in$. This least $\kappa$ is initial: were $\kappa$ in bijection with some $\alpha \in \kappa$, then composing bijections $A \xrightarrow{\sim} \kappa \xrightarrow{\sim} \alpha$ would put $A$ in bijection with the smaller $\alpha$, contradicting minimality. Uniqueness of the least such ordinal is immediate. $\square$`,
  },
  {
    id: 'ordinal-addition',
    label: 'Ordinal Addition',
    title: 'Ordinal Addition',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['ordinal', 'transfinite-recursion', 'successor-ordinal', 'limit-ordinal', 'union'],
    description: String.raw`Ordinal addition continues counting past infinity: $\alpha + \beta$ is the order type of a copy of $\alpha$ followed by a copy of $\beta$. It is associative but, strikingly, **not commutative** — $1 + \omega = \omega$ (one extra item at the *front* of an infinite line changes nothing), whereas $\omega + 1 > \omega$ (one extra item at the *end* is a genuine new last element). Order matters once the infinite is involved.`,
    definition: String.raw`For a fixed ordinal $\alpha$, **ordinal addition** is defined by transfinite recursion on $\beta$:
$$\alpha + 0 = \alpha, \qquad \alpha + (\beta + 1) = (\alpha + \beta) + 1, \qquad \alpha + \lambda = \bigcup_{\beta \in \lambda} (\alpha + \beta)\ \ (\lambda \text{ limit}).$$`,
    proof: String.raw`**Well-definedness.** The three clauses prescribe the value of $\alpha + \beta$ at $\beta = 0$, at successors (in terms of the predecessor's value), and at limits (as a union of earlier values) — exactly the data of a definition by transfinite recursion on $\beta$. By the Transfinite Recursion theorem there is a unique operation $\beta \mapsto \alpha + \beta$ satisfying them, and an easy induction shows each $\alpha + \beta$ is again an ordinal (the union at a limit is an ordinal, being a transitive set of ordinals). $\square$`,
  },
  {
    id: 'ordinal-multiplication',
    label: 'Ordinal Multiplication',
    title: 'Ordinal Multiplication',
    kind: 'definition',
    tags: ['Set Theory'],
    dependencies: ['ordinal', 'transfinite-recursion', 'ordinal-addition', 'successor-ordinal', 'limit-ordinal', 'union'],
    description: String.raw`Ordinal multiplication is repeated addition carried into the transfinite: $\alpha \cdot \beta$ is the order type of $\beta$ copies of $\alpha$ laid end to end (equivalently $\beta \times \alpha$ ordered lexicographically). Like addition it is associative but **not commutative**: $2 \cdot \omega = \omega$ (an infinite run of pairs is just an infinite line), while $\omega \cdot 2 = \omega + \omega$ (two infinite lines, the second beyond the first) is strictly larger.`,
    definition: String.raw`For a fixed ordinal $\alpha$, **ordinal multiplication** is defined by transfinite recursion on $\beta$:
$$\alpha \cdot 0 = 0, \qquad \alpha \cdot (\beta + 1) = \alpha \cdot \beta + \alpha, \qquad \alpha \cdot \lambda = \bigcup_{\beta \in \lambda} \alpha \cdot \beta\ \ (\lambda \text{ limit}).$$`,
    proof: String.raw`**Well-definedness.** As with addition, the clauses give the value at $0$, at successors (via the predecessor's value and one further addition), and at limits (as a union), which is precisely a transfinite recursion on $\beta$; the Transfinite Recursion theorem supplies a unique such operation, and induction shows each $\alpha \cdot \beta$ is an ordinal. $\square$`,
  },
]

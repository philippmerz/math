import type { MathNode } from '../types'

export const ALGEBRA_NODES: MathNode[] = [
  // ── Number systems ─────────────────────────────────────────────────────────
  {
    id: 'natural-number-arithmetic',
    label: 'Arithmetic on ℕ',
    title: 'Arithmetic on the Naturals',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['recursion-theorem', 'natural-numbers'],
    description: String.raw`**Arithmetic on $\mathbb{N}$** equips the natural numbers with addition, multiplication, and the usual order, defined by recursion on the successor structure of $\omega$. Addition iterates "add one," multiplication iterates "add $m$," and $m \le n$ means $n$ is reachable from $m$ by adding something. The result is a commutative, ordered semiring — the arithmetic that $\mathbb{Z}$ and $\mathbb{Q}$ later extend.`,
    definition: String.raw`**Addition and multiplication on $\mathbb{N}$** are defined by recursion on $\omega$:
$$m + 0 = m,\quad m + S(n) = S(m + n);\qquad m \cdot 0 = 0,\quad m \cdot S(n) = m\cdot n + m,$$
with order $m \le n :\Leftrightarrow \exists k\,(m + k = n)$. These make $\mathbb{N} = (\omega, +, \cdot, \le)$ a commutative, ordered semiring.`,
    proof: String.raw`**The recursion is legitimate and the semiring laws hold.** For fixed $m$, the clauses $f(0) = m$, $f(S(n)) = S(f(n))$ define a unique function $f = (m + \cdot)$ by the **recursion theorem** on $\omega$; multiplication is defined likewise using addition. Associativity, commutativity, and distributivity follow by induction on $\omega$. For instance, associativity of $+$: it holds for $p = 0$ since $(m+n)+0 = m+n = m+(n+0)$, and if $(m+n)+p = m+(n+p)$ then $(m+n)+S(p) = S((m+n)+p) = S(m+(n+p)) = m + S(n+p) = m + (n + S(p))$, closing the induction. Commutativity requires the two auxiliary lemmas $0 + n = n$ and $S(m) + n = S(m + n)$ — needed because addition recurses only on its second argument — each proved by induction on $n$; commutativity then follows by induction on $n$, using $S(m+n) = S(m)+n$ in the successor step. The distributive and multiplicative laws are proved the same way, each reduced to a base case and a successor step.

The relation $\le$ is a translation-invariant linear order. It is reflexive ($m + 0 = m$) and transitive (if $m + k = n$ and $n + j = p$ then $m + (k + j) = p$ by associativity). It is **antisymmetric**: if $m + k = n$ and $n + j = m$ then $m + (k + j) = m = m + 0$, so $k + j = 0$ by additive cancellation; since a successor is never $0$, this forces $k = j = 0$, whence $m = n$. Finally it is **linear**: by induction one shows that for all $m, n$ at least one of $m \le n$, $n \le m$ holds. Translation-invariance ($m \le n \Rightarrow m + p \le n + p$) is immediate from the definition. $\square$`,
  },

  // ── Abstract structures ────────────────────────────────────────────────────
  {
    id: 'binary-operation',
    label: 'Binary Operation',
    title: 'Binary Operation',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['function', 'cartesian-product'],
    description: String.raw`A **binary operation** combines two elements of a set into a third, like $+$ or $\times$. Modelling it as a function $S \times S \to S$ builds in two properties for free: it is **total** (defined on every pair) and **closed** (the result lies again in $S$). Associativity, commutativity, identities, and inverses are then further properties an operation may or may not enjoy.`,
    definition: String.raw`A **binary operation** on a set $S$ is a function $\ast : S \times S \to S$, written $a \ast b$ for $\ast(a, b)$. Being a function $S \times S \to S$ encodes totality and closure: every ordered pair $(a, b) \in S \times S$ has exactly one value $a \ast b$, and that value lies in $S$.`,
  },
  {
    id: 'group',
    label: 'Group',
    title: 'Group',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['binary-operation'],
    description: String.raw`A **group** is the algebraic axiomatization of invertible, composable symmetry: a set with an associative operation, a neutral element, and an inverse for everything. Composing two symmetries gives a symmetry, undoing is always possible, and the order of composing three does not matter. When the operation also commutes the group is **abelian**.`,
    definition: String.raw`A **group** is a set $G$ with a binary operation $*$ satisfying, for all $a, b, c \in G$,
$$(a * b) * c = a * (b * c) \quad\text{(associativity)},$$
together with an **identity** $e \in G$ with $e * a = a * e = a$ for all $a$, and for each $a$ an **inverse** $a^{-1}$ with $a * a^{-1} = a^{-1} * a = e$. It is **abelian** when in addition $a * b = b * a$ for all $a, b$.`,
  },
  {
    id: 'group-cancellation',
    label: 'Cancellation in Groups',
    title: 'Uniqueness & Cancellation in Groups',
    kind: 'lemma',
    tags: ['Algebra'],
    dependencies: ['group'],
    description: String.raw`The basic arithmetic of a group: the identity and each inverse are unique, and one may **cancel** a common factor. These facts justify writing "$e$" and "$a^{-1}$" as if they denoted single objects, and they make left/right multiplication by a fixed element a bijection of $G$ — the workhorse behind cosets and Lagrange's theorem.`,
    statement: String.raw`In any group $G$: (i) the identity $e$ is unique; (ii) each $a \in G$ has a unique inverse; (iii) **cancellation** holds — $a * b = a * c \Rightarrow b = c$ and $b * a = c * a \Rightarrow b = c$; (iv) for each fixed $g$, the **left translation** $L_g : x \mapsto g * x$ is a bijection $G \to G$.`,
    proof: String.raw`**(i)** If $e$ and $e'$ are both identities then $e = e * e' = e'$, using each in turn. **(ii)** If $b, b'$ are both inverses of $a$ then $b = b * e = b * (a * b') = (b * a) * b' = e * b' = b'$ by associativity. **(iii)** From $a * b = a * c$, left-multiply by $a^{-1}$ and use associativity and the identity: $b = e*b = (a^{-1}*a)*b = a^{-1}*(a*b) = a^{-1}*(a*c) = (a^{-1}*a)*c = e*c = c$. The right version is symmetric, right-multiplying by $a^{-1}$. **(iv)** $L_g$ is injective by (iii), and surjective since $L_g(g^{-1} * y) = y$ for every $y$; its inverse is $L_{g^{-1}}$. $\square$`,
  },
  {
    id: 'ring',
    label: 'Ring',
    title: 'Ring',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['group'],
    description: String.raw`A **ring** carries two interlocking operations, an addition making it an abelian group and a multiplication that distributes over the addition — the abstract pattern shared by the integers, polynomials, matrices, and functions. Adding a multiplicative identity $1$ and commutativity gives a *commutative ring with unity*, with $\mathbb{Z}$ as the prototype.`,
    definition: String.raw`A **ring** $(R, +, \cdot)$ is an abelian group under $+$ (with identity $0$) together with an associative multiplication $\cdot$ that distributes over addition on both sides:
$$a\cdot(b + c) = a\cdot b + a\cdot c,\qquad (a + b)\cdot c = a\cdot c + b\cdot c.$$
A **ring with unity** has an element $1$ with $1 \cdot a = a \cdot 1 = a$; it is **commutative** when $a \cdot b = b \cdot a$ for all $a, b$.`,
  },
  {
    id: 'field',
    label: 'Field',
    title: 'Field',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['ring'],
    description: String.raw`A **field** is a commutative ring in which division (by anything nonzero) is always possible — the algebraic home of the rational, real, and complex numbers. Both operations behave as group operations: addition on all of $F$, multiplication on the nonzero elements. The condition $1 \neq 0$ rules out the trivial one-element ring.`,
    definition: String.raw`A **field** is a commutative ring $(F, +, \cdot)$ with $1 \neq 0$ in which every nonzero element is multiplicatively invertible:
$$\forall a \in F\,\bigl(a \neq 0 \rightarrow \exists b \in F\,(a \cdot b = 1)\bigr),$$
the unique such $b$ being written $a^{-1}$. Equivalently: $(F, +)$ is an abelian group, $(F \setminus \{0\}, \cdot)$ is an abelian group, and $\cdot$ distributes over $+$. Examples: $\mathbb{Q}$, $\mathbb{R}$, $\mathbb{C}$.`,
  },
  {
    id: 'ordered-field',
    label: 'Ordered Field',
    title: 'Ordered Field',
    kind: 'definition',
    tags: ['Algebra', 'Order Theory'],
    dependencies: ['field', 'total-order'],
    description: String.raw`An **ordered field** is a field whose order is compatible with its arithmetic: adding the same thing to both sides preserves an inequality, and a product of non-negative elements is non-negative. These two compatibility rules generate all the familiar manipulation rules for inequalities. $\mathbb{Q}$ and $\mathbb{R}$ are ordered fields; $\mathbb{C}$ admits no compatible order.`,
    definition: String.raw`An **ordered field** is a field $F$ with a total order $\le$ such that for all $a, b, c \in F$,
$$a \le b \;\Rightarrow\; a + c \le b + c,\qquad (0 \le a \wedge 0 \le b) \;\Rightarrow\; 0 \le a\cdot b.$$
A square is non-negative: $a^2 \ge 0$, since the second rule gives $0 \le a^2$ when $0 \le a$, and when $a \le 0$ the additive rule gives $0 \le -a$, whence $0 \le (-a)^2 = a^2$. For $a \neq 0$ it is strictly positive, $a^2 > 0$, because a field has no zero divisors so $a^2 \neq 0$. In particular $1 = 1^2 > 0$, and the order is uniquely determined by its **positive cone** $\{x : x > 0\}$.`,
  },
  {
    id: 'integers',
    label: 'Integers ℤ',
    title: 'Integers (ℤ)',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['natural-number-arithmetic', 'quotient-set', 'equivalence-relation'],
    description: String.raw`The **integers** $\mathbb{Z}$ are built from $\mathbb{N}$ by formally adjoining additive inverses, so that subtraction is always possible. A pair $(a, b)$ is meant to stand for the difference $a - b$, and two pairs are identified exactly when they would yield the same difference. The result is the smallest ring containing $\mathbb{N}$.`,
    definition: String.raw`Define $\sim$ on $\mathbb{N} \times \mathbb{N}$ by
$$(a, b) \sim (c, d) \;:\Longleftrightarrow\; a + d = b + c.$$
The **integers** are the quotient set $\mathbb{Z} := (\mathbb{N} \times \mathbb{N})/{\sim}$, the class $[(a,b)]$ standing for $a - b$, with
$$[(a,b)] + [(c,d)] := [(a+c,\,b+d)],\qquad [(a,b)] \cdot [(c,d)] := [(ac+bd,\,ad+bc)],$$
and $[(a,b)] \le [(c,d)] :\Leftrightarrow a + d \le b + c$. Then $\mathbb{Z}$ is a commutative ordered ring.`,
    proof: String.raw`**$\sim$ is an equivalence relation and the operations are well defined.** Reflexivity and symmetry of $\sim$ are immediate; transitivity uses cancellation in the semiring $\mathbb{N}$ (add the two defining equations $a + d = b + c$ and $c + f = d + e$, then cancel). To see $+$ is well defined, suppose $(a,b)\sim(a',b')$ and $(c,d)\sim(c',d')$, i.e. $a+b' = b+a'$ and $c+d' = d+c'$; adding gives $(a+c)+(b'+d') = (b+d)+(a'+c')$, so $[(a+c,b+d)] = [(a'+c',b'+d')]$. Multiplication is checked the same way, reducing to the **arithmetic on $\mathbb{N}$**; representative-independence of $\le$ likewise follows from the additive cancellation of $\mathbb{N}$. The ring axioms are then inherited from those of $\mathbb{N}$ class by class, $0 = [(0,0)]$, $1 = [(S0,0)]$, and additive inverse $-[(a,b)] = [(b,a)]$. Moreover $\mathbb{Z}$ is an **integral domain**: it has no zero divisors, for if $[(a,b)]\cdot[(c,d)] = 0$ with $[(a,b)] \neq 0$ then cancellation in $\mathbb{N}$ forces $[(c,d)] = 0$, so a product of nonzero integers is nonzero and multiplicative cancellation holds. $\square$`,
  },
  {
    id: 'rationals',
    label: 'Rationals ℚ',
    title: 'Rational Numbers (ℚ)',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['integers', 'quotient-set', 'equivalence-relation', 'ordered-field'],
    description: String.raw`The **rationals** $\mathbb{Q}$ are built from $\mathbb{Z}$ by formally adjoining multiplicative inverses of nonzero integers, so that division (except by zero) becomes possible. A pair $(a, b)$ stands for the fraction $a/b$, with two pairs identified when they cross-multiply equally. The result is the smallest field containing $\mathbb{Z}$ — its field of fractions.`,
    definition: String.raw`On $\mathbb{Z} \times (\mathbb{Z} \setminus \{0\})$ define
$$(a, b) \sim (c, d) \;:\Longleftrightarrow\; a\cdot d = b\cdot c.$$
The **rationals** are $\mathbb{Q} := \bigl(\mathbb{Z} \times (\mathbb{Z}\setminus\{0\})\bigr)/{\sim}$, the class $[(a,b)]$ being $a/b$, with
$$\tfrac{a}{b} + \tfrac{c}{d} := \tfrac{ad+bc}{bd},\qquad \tfrac{a}{b}\cdot\tfrac{c}{d} := \tfrac{ac}{bd},$$
and $\tfrac{a}{b} > 0 :\Leftrightarrow ab > 0$. Then $\mathbb{Q}$ is an ordered field, the field of fractions of $\mathbb{Z}$.`,
    proof: String.raw`**$\mathbb{Q}$ is an ordered field.** That $\sim$ is an equivalence relation uses that $\mathbb{Z}$ is an **integral domain** (cancellation by the nonzero second coordinate gives transitivity). The operations are well defined: suppose $(a,b)\sim(a',b')$ and $(c,d)\sim(c',d')$, i.e. $ab' = a'b$ and $cd' = c'd$. For addition,
$$(ad+bc)(b'd') = (ab')(dd') + (cd')(bb') = (a'b)(dd') + (c'd)(bb') = (a'd'+b'c')(bd),$$
so $\tfrac{ad+bc}{bd} \sim \tfrac{a'd'+b'c'}{b'd'}$. For multiplication, $(ac)(b'd') = (ab')(cd') = (a'b)(c'd) = (a'c')(bd)$, so $\tfrac{ac}{bd} \sim \tfrac{a'c'}{b'd'}$. Both computations use only commutativity of $\mathbb{Z}$; that $\mathbb{Z}$ is an **integral domain** ensures $bd \neq 0$, so sums and products land back in $\mathbb{Z}\times(\mathbb{Z}\setminus\{0\})$. The field axioms are inherited from the ring $\mathbb{Z}$: $0 = [(0,1)]$, $1 = [(1,1)]$, and any $[(a,b)]$ with $a \neq 0$ has inverse $[(b,a)]$. The positivity $\tfrac{a}{b} > 0 :\Leftrightarrow ab > 0$ is representative-independent: if $(a,b)\sim(a',b')$, i.e. $ab' = a'b$, then $(ab)(b')^2 = (ab')(bb') = (a'b)(bb') = (a'b')b^2$, and since $b^2, (b')^2 > 0$ in $\mathbb{Z}$ this forces $ab > 0 \Leftrightarrow a'b' > 0$. Writing $x \le y :\Leftrightarrow y - x > 0 \text{ or } x = y$, totality follows from the trichotomy of $ab$ in the ordered domain $\mathbb{Z}$, and the two compatibility axioms — that the positive cone is closed under $+$ and $\cdot$ — reduce, after clearing the positive denominators $b^2, d^2$, to the corresponding closure facts in $\mathbb{Z}$. Hence $\mathbb{Q}$ is an **ordered field**, the field of fractions of $\mathbb{Z}$. $\square$`,
  },
  {
    id: 'polynomial',
    label: 'Polynomial',
    title: 'Polynomial',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['field', 'natural-number-arithmetic'],
    description: String.raw`A **polynomial** over a field is a finite formal combination of powers of an indeterminate $x$ with field coefficients — an algebraic object, distinct from the function it induces. Polynomials add and multiply by the schoolbook rules, forming a ring $F[x]$, and their degrees add under multiplication, which makes $F[x]$ an integral domain with a division algorithm.`,
    definition: String.raw`A **polynomial** over a field $F$ is a sequence $(a_0, a_1, a_2, \dots)$ of elements of $F$ with only finitely many nonzero, written
$$p(x) = \sum_{k=0}^{n} a_k\,x^k.$$
Its **degree** $\deg p$ is the largest $k$ with $a_k \neq 0$ (with $\deg 0 = -\infty$). Addition is coefficientwise and multiplication is the convolution $(p q)_k = \sum_{i+j=k} a_i b_j$; these make the set $F[x]$ of all polynomials a commutative ring with unity.`,
    proof: String.raw`**$F[x]$ is an integral domain and $\deg(pq) = \deg p + \deg q$.** The ring axioms follow directly from those of $F$ applied coefficientwise. For the degree law, let $p, q \neq 0$ have leading coefficients $a_m \neq 0$, $b_n \neq 0$ in degrees $m, n$. The coefficient of $x^{m+n}$ in $pq$ is $a_m b_n$, which is nonzero because $F$ is a **field** (hence has no zero divisors), and no higher power can occur; so $\deg(pq) = m + n$ and $pq \neq 0$. Thus $F[x]$ has no zero divisors and is an integral domain. $\square$`,
  },
  {
    id: 'complex-numbers',
    label: 'Complex Numbers ℂ',
    title: 'Complex Numbers (ℂ)',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['real-numbers', 'field', 'ordered-field'],
    description: String.raw`The **complex numbers** $\mathbb{C}$ enlarge $\mathbb{R}$ by a square root $i$ of $-1$, giving every real polynomial a place to factor. Concretely they are pairs $(a, b)$ — written $a + bi$ — added componentwise and multiplied so that $i^2 = -1$. The price of algebraic completeness is order: unlike $\mathbb{R}$, the field $\mathbb{C}$ cannot be ordered.`,
    definition: String.raw`The **complex numbers** are the set $\mathbb{C} := \mathbb{R}^2$ of pairs $(a, b) = a + bi$ with
$$(a,b) + (c,d) := (a+c,\,b+d),\qquad (a,b)\cdot(c,d) := (ac - bd,\,ad + bc),$$
so that $i := (0,1)$ satisfies $i^2 = -1$. With these operations $\mathbb{C}$ is a field containing $\mathbb{R}$ as the subfield $\{(a,0)\}$.`,
    proof: String.raw`**$\mathbb{C}$ is a field, and it carries no compatible order.** We verify the **field** axioms directly on $\mathbb{R}^2$, all reductions being to identities in $\mathbb{R}$. Addition is componentwise, so $(\mathbb{R}^2, +)$ is an abelian group with identity $(0,0)$ and inverse $-(a,b) = (-a,-b)$. Multiplication is commutative since $ac - bd$ and $ad + bc$ are symmetric in $(a,b),(c,d)$, and has identity $(1,0)$: $(a,b)(1,0) = (a, b)$. Associativity and distributivity are routine expansions: for distributivity, $(a,b)\bigl((c,d)+(e,f)\bigr) = (a(c+e) - b(d+f),\, a(d+f) + b(c+e))$, which equals $(a,b)(c,d) + (a,b)(e,f)$ term by term. Every nonzero $(a,b)$ is invertible: with $a^2 + b^2 > 0$ a nonzero real (as $a, b$ are not both $0$),
$$(a,b)\cdot\Bigl(\tfrac{a}{a^2+b^2},\, \tfrac{-b}{a^2+b^2}\Bigr) = \Bigl(\tfrac{a^2+b^2}{a^2+b^2},\, \tfrac{-ab+ba}{a^2+b^2}\Bigr) = (1,0).$$
Since $1 = (1,0) \neq (0,0) = 0$, $\mathbb{C}$ is a field; the map $a \mapsto (a,0)$ is a field embedding of $\mathbb{R}$, and $i = (0,1)$ gives $i^2 = (0,1)(0,1) = (-1, 0) = -1$. There is no compatible order: in any **ordered field** every square is $\ge 0$, so $0 \le i^2 = -1$, forcing $1 \le 0$, contradicting $1 > 0$. $\square$`,
  },

  // ── Unique factorization ───────────────────────────────────────────────────
  {
    id: 'fundamental-theorem-of-arithmetic',
    label: 'FT of Arithmetic',
    title: 'Fundamental Theorem of Arithmetic',
    kind: 'theorem',
    tags: ['Algebra', 'Number Theory'],
    dependencies: ['prime-number', 'euclids-lemma', 'natural-numbers', 'integers'],
    description: String.raw`Every integer above $1$ is a product of primes, and that product is unique up to the order of the factors. Existence makes the primes generate $\mathbb{Z}$ multiplicatively; uniqueness makes them genuine atoms. Together they are the prototype of unique factorization, later abstracted to unique factorization domains.`,
    statement: String.raw`Every integer $n > 1$ can be written as a product of primes,
$$n = p_1^{a_1} \cdots p_k^{a_k}, \qquad p_1 < \cdots < p_k,\ a_i \ge 1,$$
and this representation is unique: the multiset of prime factors of $n$ is determined by $n$.`,
    proof: String.raw`**Existence**, by strong induction on $n$ (valid by induction over $\mathbb{N}$). If $n$ is prime we are done. Otherwise $n = ab$ with $1 < a, b < n$; by the inductive hypothesis $a$ and $b$ are each products of primes, and concatenating gives one for $n$.

**Uniqueness.** Suppose $p_1 \cdots p_r = q_1 \cdots q_s$ are two prime factorizations (with repetition), say $r \le s$. Then $p_1 \mid q_1 \cdots q_s$. By **Euclid's lemma** (the two-factor form, applied repeatedly: $p_1 \mid q_1(q_2\cdots q_s)$ gives $p_1 \mid q_1$ or $p_1 \mid q_2\cdots q_s$, and induction on the number of factors) we get $p_1 \mid q_j$ for some $j$; since $q_j$ is prime and $p_1 > 1$, this forces $p_1 = q_j$. Cancel the common factor (legitimate in the integral domain $\mathbb{Z}$) to get $p_2 \cdots p_r = \prod_{i \neq j} q_i$, a shorter identity, and repeat. After $r$ steps the left side is empty, so the right side must be too, giving $r = s$ and a pairing of the $p$'s with the $q$'s. Hence the two factorizations agree up to order; collecting equal primes yields the stated normal form. $\square$`,
  },

  // ── Group structure ────────────────────────────────────────────────────────
  {
    id: 'subgroup',
    label: 'Subgroup',
    title: 'Subgroup',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['group'],
    description: String.raw`A **subgroup** is a subset of a group that is itself a group under the same operation — a self-contained pocket of symmetry inside a larger one. Kernels, centres, and the cyclic subgroup generated by an element all arise this way, and in a finite group every subgroup's order divides the whole by Lagrange's theorem.`,
    definition: String.raw`A subset $H \subseteq G$ of a group is a **subgroup**, written $H \le G$, if it is nonempty and closed under the operation and inverses: $e \in H$, and $a, b \in H \Rightarrow a*b \in H$ and $a^{-1} \in H$. Equivalently (the one-step test), $H \neq \varnothing$ and $a, b \in H \Rightarrow a * b^{-1} \in H$.`,
    proof: String.raw`**The one-step test is equivalent to the definition.** If $H$ is a subgroup the test clearly holds. Conversely, suppose $H \neq \varnothing$ and $a, b \in H \Rightarrow a*b^{-1} \in H$. Pick $a \in H$; then $e = a * a^{-1} \in H$. For any $b \in H$, $b^{-1} = e * b^{-1} \in H$. For $a, b \in H$, then $b^{-1} \in H$, so $a * b = a * (b^{-1})^{-1} \in H$. Thus $H$ contains $e$ and is closed under inverses and the operation; associativity is inherited from $G$, so $H \le G$. $\square$`,
  },
  {
    id: 'symmetric-group',
    label: 'Symmetric Group',
    title: 'Symmetric Group',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['group', 'bijection', 'function-composition'],
    description: String.raw`The **symmetric group** $\operatorname{Sym}(X)$ collects all the ways to shuffle a set $X$ — its bijections — under composition. It is the universal home of symmetry: by Cayley's theorem every group embeds into some $\operatorname{Sym}(X)$. When $X = \{1, \dots, n\}$ it is written $S_n$ and has $n!$ elements.`,
    definition: String.raw`For a set $X$, the **symmetric group** $\operatorname{Sym}(X)$ is the set of all bijections $\sigma : X \to X$ (the **permutations** of $X$), with the group operation given by composition $\sigma\tau := \sigma \circ \tau$. When $X = \{1, \dots, n\}$ it is denoted $S_n$, and $|S_n| = n!$.`,
    proof: String.raw`**$(\operatorname{Sym}(X), \circ)$ is a group.** Composition of bijections is a bijection, so $\circ$ is a binary operation on $\operatorname{Sym}(X)$ (it is closed). Composition of functions is **associative**: $((\sigma\tau)\rho)(x) = \sigma(\tau(\rho(x))) = (\sigma(\tau\rho))(x)$ for all $x$. The identity map $\operatorname{id}_X$ is a bijection and satisfies $\sigma\circ\operatorname{id}_X = \operatorname{id}_X\circ\sigma = \sigma$, so it is the **identity** element. Each bijection $\sigma$ has a two-sided inverse function $\sigma^{-1}$, which is itself a bijection with $\sigma\circ\sigma^{-1} = \sigma^{-1}\circ\sigma = \operatorname{id}_X$, giving **inverses**. Hence $\operatorname{Sym}(X)$ is a group. For $X = \{1,\dots,n\}$, a permutation is determined by its values $\sigma(1),\dots,\sigma(n)$, a choice of $n$ then $n-1$ then $\dots$ then $1$ remaining targets, so $|S_n| = n!$. $\square$`,
  },
  {
    id: 'permutation-sign',
    label: 'Sign of a Permutation',
    title: 'Sign of a Permutation',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['symmetric-group', 'integers'],
    description: String.raw`Every permutation is either **even** or **odd**, according to whether it is built from an even or odd number of swaps. This parity is captured by the **sign** $\operatorname{sgn}(\sigma) \in \{+1, -1\}$, a homomorphism from the symmetric group onto $\{\pm 1\}$ that sends each transposition to $-1$. It is the combinatorial input behind the determinant and the orientation of Euclidean space.`,
    definition: String.raw`For $\sigma \in S_n$ the **sign** is
$$\operatorname{sgn}(\sigma) := \prod_{1 \le i < j \le n} \frac{\sigma(j) - \sigma(i)}{j - i} \in \{+1, -1\}.$$
Equivalently $\operatorname{sgn}(\sigma) = (-1)^{N(\sigma)}$, where $N(\sigma) = \#\{(i,j) : i < j,\ \sigma(i) > \sigma(j)\}$ is the number of **inversions**. A permutation is **even** if $\operatorname{sgn} = +1$, **odd** if $\operatorname{sgn} = -1$.`,
    proof: String.raw`**$\operatorname{sgn}$ takes values in $\{\pm1\}$, is a homomorphism, and is $-1$ on every transposition.** *Values:* each factor $\frac{\sigma(j)-\sigma(i)}{j-i}$ is a nonzero rational, negative exactly when $(i,j)$ is an inversion, so $\operatorname{sgn}(\sigma) = (-1)^{N(\sigma)}$; its magnitude is $1$ because $\{(i,j) : i<j\} \to \{\{\sigma(i),\sigma(j)\}\}$ runs over the same unordered pairs, so $\prod_{i<j}|\sigma(j)-\sigma(i)| = \prod_{i<j}|j-i|$. Thus $\operatorname{sgn}(\sigma) \in \{+1,-1\}$.

*Homomorphism:* for $\sigma, \tau \in S_n$,
$$\operatorname{sgn}(\sigma\tau) = \prod_{i<j} \frac{\sigma(\tau(j)) - \sigma(\tau(i))}{j - i} = \prod_{i<j} \frac{\sigma(\tau(j)) - \sigma(\tau(i))}{\tau(j) - \tau(i)} \cdot \prod_{i<j} \frac{\tau(j) - \tau(i)}{j - i}.$$
The second product is $\operatorname{sgn}(\tau)$. In the first, as $(i,j)$ ranges over pairs with $i<j$, the unordered pair $\{\tau(i),\tau(j)\}$ ranges over all unordered pairs exactly once, and the ratio $\frac{\sigma(b)-\sigma(a)}{b-a}$ is unchanged under swapping $a,b$; so the first product equals $\prod_{a<b}\frac{\sigma(b)-\sigma(a)}{b-a} = \operatorname{sgn}(\sigma)$. Hence $\operatorname{sgn}(\sigma\tau) = \operatorname{sgn}(\sigma)\operatorname{sgn}(\tau)$.

*Transpositions:* let $\tau = (k\,\ell)$ with $k < \ell$. Its inversions are the pair $(k,\ell)$ together with, for each $m$ with $k < m < \ell$, the two pairs $(k,m)$ and $(m,\ell)$ (the pair is an inversion in exactly one orientation in each case); so $N(\tau) = 1 + 2(\ell - k - 1)$ is odd and $\operatorname{sgn}(\tau) = -1$. Consequently $\operatorname{sgn}((k\,\ell)\circ\sigma) = \operatorname{sgn}((k\,\ell))\operatorname{sgn}(\sigma) = -\operatorname{sgn}(\sigma)$. $\square$`,
  },
  {
    id: 'coset',
    label: 'Coset',
    title: 'Cosets & Index',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['subgroup', 'group-cancellation', 'equivalence-relation'],
    description: String.raw`The **cosets** of a subgroup are its translates inside the group. They tile the group into disjoint blocks, all the same size as the subgroup itself — the geometric picture behind Lagrange's theorem and the construction of quotient groups. The number of blocks is the **index**.`,
    definition: String.raw`For $H \le G$ and $g \in G$, the **left coset** is $gH := \{g * h : h \in H\}$ (and $Hg$ the right coset). The **index** $[G : H]$ is the number of distinct left cosets. The relation $a \sim_H b :\Leftrightarrow a^{-1} b \in H$ is an equivalence relation whose classes are exactly the left cosets.`,
    proof: String.raw`**The left cosets partition $G$ into equinumerous blocks.** The relation $a \sim_H b \Leftrightarrow a^{-1}b \in H$ is reflexive ($a^{-1}a = e \in H$), symmetric ($(a^{-1}b)^{-1} = b^{-1}a \in H$), and transitive ($a^{-1}b, b^{-1}c \in H \Rightarrow a^{-1}c = (a^{-1}b)(b^{-1}c) \in H$), so it is an **equivalence relation**; its class of $a$ is $\{b : a^{-1}b \in H\} = aH$. Hence the left cosets partition $G$. Each has the same cardinality as $H$: the **left translation** $L_g$ restricts to a bijection $H \to gH$, since by **cancellation in groups** it is injective, and it is surjective onto $gH$ by definition. $\square$`,
  },
  {
    id: 'lagrange-theorem-groups',
    label: "Lagrange's Theorem",
    title: "Lagrange's Theorem (Groups)",
    kind: 'theorem',
    tags: ['Algebra'],
    dependencies: ['coset', 'subgroup', 'cyclic-group'],
    description: String.raw`In a finite group, the size of any subgroup divides the size of the whole group. The reason is purely combinatorial: the group is tiled by equal-sized cosets of the subgroup. As a corollary every element's order divides the group order, the first hard constraint of finite group theory.`,
    statement: String.raw`If $G$ is a finite group and $H \le G$, then $|H|$ divides $|G|$, with
$$|G| = [G : H]\cdot|H|.$$
Consequently the order of every element divides $|G|$, and $a^{|G|} = e$ for all $a \in G$.`,
    proof: String.raw`The left **cosets** of $H$ partition $G$ into $[G:H]$ disjoint blocks, and each block has exactly $|H|$ elements. Summing the block sizes gives $|G| = [G:H]\cdot|H|$, so $|H|$ divides $|G|$.

For the corollary, let $a \in G$. Since $G$ is finite, the powers $a, a^2, a^3, \dots$ cannot all be distinct, so $a^i = a^j$ for some $0 \le i < j$, giving $a^{j-i} = e$ with $j - i > 0$; hence $a$ has finite **order** $d$, the least positive integer with $a^d = e$. The powers $e, a, \dots, a^{d-1}$ are pairwise distinct: if $a^i = a^j$ with $0 \le i < j < d$ then $a^{j-i} = e$ with $0 < j - i < d$, contradicting the minimality of $d$. Together with closure ($a^i a^j = a^{(i+j)\bmod d}$, using $a^d = e$) and inverses ($a^{-i} = a^{d-i}$), the **cyclic** subgroup $\langle a\rangle = \{e, a, \dots, a^{d-1}\}$ is a subgroup with exactly $d$ elements, so $d = |\langle a\rangle|$ divides $|G|$ by the first part. Writing $|G| = d m$ gives $a^{|G|} = (a^d)^m = e$. $\square$`,
  },
  {
    id: 'cyclic-group',
    label: 'Cyclic Group',
    title: 'Cyclic Group',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['group', 'subgroup', 'group-homomorphism', 'isomorphism-theorems'],
    description: String.raw`A **cyclic group** is one generated by repeatedly applying a single element and its inverse — the simplest kind of group. Up to isomorphism there is exactly one of each size: the infinite one is $\mathbb{Z}$, and the finite one of order $n$ is the integers modulo $n$. Subgroups and quotients of cyclic groups are again cyclic.`,
    definition: String.raw`A group $G$ is **cyclic** if $G = \langle g \rangle := \{g^k : k \in \mathbb{Z}\}$ for some $g \in G$, called a **generator**. The **order** of $g$ is $|\langle g\rangle|$, the least $n > 0$ with $g^n = e$ if one exists (else $\infty$).`,
    proof: String.raw`**A cyclic group is isomorphic to $\mathbb{Z}$ or to $\mathbb{Z}/n\mathbb{Z}$.** The map $\varphi : \mathbb{Z} \to G$, $k \mapsto g^k$, is a surjective **group homomorphism** ($g^{j+k} = g^j g^k$). If $g$ has infinite order, $\varphi$ is injective, so $G \cong \mathbb{Z}$. Otherwise let $n$ be the least positive integer with $g^n = e$; then $\ker\varphi = n\mathbb{Z}$ (if $g^k = e$, divide $k = qn + r$ with $0 \le r < n$ to force $r = 0$), and by the **first isomorphism theorem** $G \cong \mathbb{Z}/n\mathbb{Z}$, of order $n$. $\square$`,
  },
  {
    id: 'group-homomorphism',
    label: 'Group Homomorphism',
    title: 'Group Homomorphism',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['group', 'group-cancellation', 'subgroup'],
    description: String.raw`A **group homomorphism** is a map between groups that respects their operations — the structure-preserving maps of group theory. Its **kernel** measures how far it is from injective, its **image** is a copy of the source sitting inside the target, and a homomorphism is injective exactly when its kernel is trivial.`,
    definition: String.raw`A **group homomorphism** is a map $\phi : G \to H$ with $\phi(a*b) = \phi(a)*\phi(b)$ for all $a, b \in G$. Its **kernel** is $\ker\phi := \{g \in G : \phi(g) = e_H\}$ and its **image** $\operatorname{im}\phi := \phi(G)$.`,
    proof: String.raw`**$\phi(e_G) = e_H$, $\phi(a^{-1}) = \phi(a)^{-1}$, $\ker\phi \le G$, $\operatorname{im}\phi \le H$, and $\phi$ is injective iff $\ker\phi = \{e_G\}$.** From $\phi(e_G) = \phi(e_G e_G) = \phi(e_G)\phi(e_G)$, **cancellation in groups** gives $\phi(e_G) = e_H$; then $\phi(a)\phi(a^{-1}) = \phi(e_G) = e_H$ shows $\phi(a^{-1}) = \phi(a)^{-1}$. The kernel and image are **subgroups** by the one-step test: each contains $e_G$ (resp. $e_H$), hence is nonempty, and for $a, b \in \ker\phi$, $\phi(ab^{-1}) = \phi(a)\phi(b)^{-1} = e_H e_H^{-1} = e_H$, so $ab^{-1} \in \ker\phi$; similarly for $\phi(a),\phi(b) \in \operatorname{im}\phi$, $\phi(a)\phi(b)^{-1} = \phi(ab^{-1}) \in \operatorname{im}\phi$. Finally, if $\ker\phi = \{e_G\}$ and $\phi(a) = \phi(b)$, then $\phi(a^{-1}b) = e_H$, so $a^{-1}b \in \ker\phi$, giving $a = b$; conversely injectivity forces $\ker\phi = \{e_G\}$. $\square$`,
  },
  {
    id: 'normal-subgroup',
    label: 'Normal Subgroup',
    title: 'Normal Subgroup',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['subgroup', 'group-homomorphism', 'coset'],
    description: String.raw`A **normal subgroup** is one stable under conjugation — its left and right cosets coincide. Normality is precisely the condition needed for the cosets to multiply consistently and form a quotient group, and the normal subgroups turn out to be exactly the kernels of homomorphisms.`,
    definition: String.raw`A subgroup $N \le G$ is **normal**, written $N \trianglelefteq G$, if $gNg^{-1} = N$ for every $g \in G$ (equivalently $gNg^{-1} \subseteq N$ for all $g$, equivalently $gN = Ng$ for all $g$).`,
    proof: String.raw`**A subgroup is normal iff it is the kernel of some homomorphism.** If $N = \ker\phi$ then for $n \in N$ and $g \in G$, $\phi(gng^{-1}) = \phi(g)e_H\phi(g)^{-1} = e_H$, so $gNg^{-1} \subseteq N$, i.e. $N \trianglelefteq G$. Conversely, suppose $N \trianglelefteq G$; we exhibit a homomorphism with kernel $N$ directly. The cosets $\{gN : g \in G\}$ partition $G$, and on this set define $(gN)(hN) := (gh)N$. This is **well defined**: if $gN = g'N$ and $hN = h'N$, write $g' = gn_1$, $h' = hn_2$ with $n_1, n_2 \in N$; then $g'h' = g n_1 h n_2 = (gh)\bigl(h^{-1}n_1 h\bigr)n_2$, and $h^{-1}n_1 h \in N$ since $gNg^{-1} = N$ for all $g$, so $g'h' \in (gh)N$, i.e. $(g'h')N = (gh)N$. This product is associative with identity $N = eN$ and inverse $(gN)^{-1} = g^{-1}N$, so the cosets form a group $Q$. The map $\pi : G \to Q$, $g \mapsto gN$, then satisfies $\pi(gh) = (gh)N = (gN)(hN) = \pi(g)\pi(h)$, a **group homomorphism**, with $\ker\pi = \{g : gN = N\} = \{g : g \in N\} = N$. Hence $N$ is the kernel of $\pi$. $\square$`,
  },
  {
    id: 'quotient-group',
    label: 'Quotient Group',
    title: 'Quotient Group',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['normal-subgroup', 'coset'],
    description: String.raw`The **quotient group** $G/N$ glues the cosets of a normal subgroup into a new group, collapsing $N$ to the identity — the group-theoretic analogue of "working modulo $N$." The canonical projection sends each element to its coset and is a homomorphism with kernel exactly $N$.`,
    definition: String.raw`For $N \trianglelefteq G$, the **quotient group** $G/N$ is the set of cosets $\{gN : g \in G\}$ with the operation
$$(gN)(hN) := (gh)N.$$
The identity is $eN = N$ and $(gN)^{-1} = g^{-1}N$.`,
    proof: String.raw`**The operation is well defined and makes $G/N$ a group.** Well-definedness needs **normality**: if $gN = g'N$ and $hN = h'N$, then $g' = gn_1$, $h' = hn_2$ with $n_i \in N$, so $g'h' = g n_1 h n_2 = (gh)(h^{-1}n_1 h)n_2$, and $h^{-1}n_1h \in N$ because $N \trianglelefteq G$; hence $g'h' \in (gh)N$ and $(g'h')N = (gh)N$. Associativity, identity $N$, and inverses $g^{-1}N$ are inherited from $G$, so $G/N$ is a group. The projection $\pi(g) = gN$ then satisfies $\pi(gh) = \pi(g)\pi(h)$, a homomorphism with kernel $N$. $\square$`,
  },
  {
    id: 'isomorphism-theorems',
    label: 'Isomorphism Theorems',
    title: 'Isomorphism Theorems',
    kind: 'theorem',
    tags: ['Algebra'],
    dependencies: ['quotient-group', 'group-homomorphism', 'normal-subgroup'],
    description: String.raw`The **first isomorphism theorem** says every homomorphic image is a quotient: dividing out the kernel produces a group isomorphic to the image. It is the basic bookkeeping of quotients — the reason kernels and normal subgroups are the same thing — and the second and third theorems extend the pattern to intersections and chains of subgroups.`,
    statement: String.raw`Let $\phi : G \to H$ be a group homomorphism. Then $\ker\phi \trianglelefteq G$ and the induced map
$$\bar\phi : G/\ker\phi \;\xrightarrow{\ \cong\ }\; \operatorname{im}\phi, \qquad g\,\ker\phi \mapsto \phi(g),$$
is an isomorphism. (**Second:** for $H \le G$, $N \trianglelefteq G$, $HN/N \cong H/(H\cap N)$. **Third:** for $N \le M$ both normal, $(G/N)/(M/N) \cong G/M$.)`,
    proof: String.raw`Write $K = \ker\phi$, which is **normal** as the kernel of a homomorphism, so $G/K$ is a **quotient group**. Define $\bar\phi(gK) := \phi(g)$. This is **well defined**: if $gK = g'K$ then $g^{-1}g' \in K$, so $\phi(g)^{-1}\phi(g') = \phi(g^{-1}g') = e_H$, giving $\phi(g) = \phi(g')$. It is a **homomorphism**: $\bar\phi(gK\cdot hK) = \bar\phi(ghK) = \phi(gh) = \phi(g)\phi(h)$. It is **injective**: if $\bar\phi(gK) = e_H$ then $\phi(g) = e_H$, so $g \in K$ and $gK = K$, the identity of $G/K$ — trivial kernel. It is **surjective** onto $\operatorname{im}\phi$ by construction. Hence $\bar\phi$ is an isomorphism. The second and third theorems follow by applying the first to the maps $H \to HN/N$, $h \mapsto hN$, and $G/N \to G/M$, $gN \mapsto gM$, whose kernels are $H \cap N$ and $M/N$ respectively. $\square$`,
  },
  {
    id: 'group-action',
    label: 'Group Action',
    title: 'Group Action',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['group', 'group-homomorphism', 'subgroup', 'symmetric-group'],
    description: String.raw`A **group action** realizes an abstract group as actual symmetries of a set, each group element permuting the set in a way compatible with composition. The set splits into **orbits**, and each point has a **stabilizer** subgroup; this is how abstract groups become concrete and how counting arguments enter group theory.`,
    definition: String.raw`An **action** of a group $G$ on a set $X$ is a map $G \times X \to X$, $(g, x) \mapsto g\cdot x$, with
$$e\cdot x = x,\qquad g\cdot(h\cdot x) = (gh)\cdot x \quad(\forall g,h \in G,\ x \in X).$$
The **orbit** of $x$ is $\operatorname{Orb}(x) := \{g\cdot x : g \in G\}$ and its **stabilizer** $\operatorname{Stab}(x) := \{g : g\cdot x = x\} \le G$. Equivalently, an action is a homomorphism $G \to \operatorname{Sym}(X)$.`,
    proof: String.raw`**An action is the same as a homomorphism $G \to \operatorname{Sym}(X)$, and each stabilizer is a subgroup.** Given an action, define $\rho(g) : X \to X$ by $\rho(g)(x) = g\cdot x$; then for all $x$, $(\rho(g)\circ\rho(h))(x) = g\cdot(h\cdot x) = (gh)\cdot x = \rho(gh)(x)$, so $\rho(g)\circ\rho(h) = \rho(gh)$, and $\rho(e) = \operatorname{id}$ by the first axiom. Thus $\rho(g)\circ\rho(g^{-1}) = \rho(e) = \operatorname{id} = \rho(g^{-1})\circ\rho(g)$, so each $\rho(g)$ is a bijection, i.e. an element of the **symmetric group** $\operatorname{Sym}(X)$, and $\rho : G \to \operatorname{Sym}(X)$ is a **group homomorphism**. Conversely, given a homomorphism $\rho : G \to \operatorname{Sym}(X)$, set $g\cdot x := \rho(g)(x)$; then $e\cdot x = \rho(e)(x) = \operatorname{id}(x) = x$ and $g\cdot(h\cdot x) = \rho(g)(\rho(h)(x)) = (\rho(g)\circ\rho(h))(x) = \rho(gh)(x) = (gh)\cdot x$, so both action axioms hold. These two constructions are mutually inverse — recovering $\rho$ from its action gives back $\rho$, and vice versa — so actions and such homomorphisms are the same. Finally, for fixed $x$, $\operatorname{Stab}(x)$ contains $e$ (as $e\cdot x = x$) and is closed under product and inverse: if $g\cdot x = x$ and $h\cdot x = x$ then $(gh)\cdot x = g\cdot(h\cdot x) = g\cdot x = x$, and $g^{-1}\cdot x = g^{-1}\cdot(g\cdot x) = (g^{-1}g)\cdot x = x$. By the **subgroup** criterion, $\operatorname{Stab}(x) \le G$. $\square$`,
  },
  {
    id: 'orbit-stabilizer-theorem',
    label: 'Orbit–Stabilizer',
    title: 'Orbit–Stabilizer Theorem',
    kind: 'proposition',
    tags: ['Algebra'],
    dependencies: ['group-action', 'coset', 'lagrange-theorem-groups'],
    description: String.raw`The **orbit–stabilizer theorem** ties an orbit's size to a stabilizer's index: the bigger the symmetry pinning a point, the smaller its orbit. It is the counting backbone of group actions — the source of class equations, of Cauchy's and the Sylow theorems, and of "Burnside"-style enumeration.`,
    statement: String.raw`For an action of $G$ on $X$ and any $x \in X$, the map $g\,\operatorname{Stab}(x) \mapsto g\cdot x$ is a bijection between the left cosets of $\operatorname{Stab}(x)$ and the orbit of $x$:
$$|\operatorname{Orb}(x)| = [\,G : \operatorname{Stab}(x)\,].$$
In particular, for finite $G$, $\;|G| = |\operatorname{Orb}(x)|\cdot|\operatorname{Stab}(x)|$.`,
    proof: String.raw`Write $S = \operatorname{Stab}(x)$. Define $\Phi(gS) := g\cdot x$. It is **well defined and injective**: $gS = hS \Leftrightarrow h^{-1}g \in S \Leftrightarrow (h^{-1}g)\cdot x = x \Leftrightarrow g\cdot x = h\cdot x$, the last step applying $h$ to both sides and using the action axioms. It is **surjective** onto $\operatorname{Orb}(x)$ by definition of the orbit. So $\Phi$ is a bijection from the left **cosets** of $S$ to $\operatorname{Orb}(x)$, giving $|\operatorname{Orb}(x)| = [G : S]$. For finite $G$, **Lagrange's theorem** turns this into $|G| = |\operatorname{Orb}(x)|\cdot|S|$. $\square$`,
  },
  {
    id: 'cayleys-theorem',
    label: "Cayley's Theorem",
    title: "Cayley's Theorem",
    kind: 'theorem',
    tags: ['Algebra'],
    dependencies: ['group-action', 'group-homomorphism', 'group-cancellation', 'isomorphism-theorems', 'symmetric-group'],
    description: String.raw`**Cayley's theorem** says every group is a group of permutations: letting a group act on itself by left multiplication embeds it into the symmetric group on its underlying set. Abstract groups are therefore no more general than concrete permutation groups — though the symmetric group it lands in is usually far larger.`,
    statement: String.raw`Every group $G$ is isomorphic to a subgroup of the symmetric group $\operatorname{Sym}(G)$. If $|G| = n < \infty$, then $G$ embeds in $S_n$.`,
    proof: String.raw`Let $G$ act on itself by left multiplication, $g\cdot x := gx$; this is an **action** (it satisfies $e\cdot x = x$ and $g\cdot(h\cdot x) = (gh)\cdot x$), so it gives a **group homomorphism** $\rho : G \to \operatorname{Sym}(G)$ with $\rho(g)(x) = gx$. It is **injective**: if $\rho(g) = \operatorname{id}$ then $gx = x$ for all $x$, in particular $g = ge = e$ (using **cancellation in groups**), so $\ker\rho = \{e\}$. Hence $G \cong \operatorname{im}\rho \le \operatorname{Sym}(G)$ by the first isomorphism theorem. When $|G| = n$, $\operatorname{Sym}(G) \cong S_n$. $\square$`,
  },
  {
    id: 'sylow-theorems',
    label: 'Sylow Theorems',
    title: 'Sylow Theorems',
    kind: 'theorem',
    tags: ['Algebra'],
    dependencies: ['orbit-stabilizer-theorem', 'lagrange-theorem-groups', 'group-action', 'group-cancellation'],
    description: String.raw`The **Sylow theorems** are the sharpest elementary tool for dissecting a finite group. For each prime power dividing the order maximally they guarantee subgroups of that exact size — the **Sylow $p$-subgroups** — show they are all conjugate, and pin down their number modulo $p$. These constraints often force the structure of a group from its order alone.`,
    statement: String.raw`Let $|G| = p^k m$ with $p$ prime and $p \nmid m$. Then: **(I, existence)** $G$ has a subgroup of order $p^k$ (a **Sylow $p$-subgroup**); **(II, conjugacy)** any two Sylow $p$-subgroups are conjugate, and every $p$-subgroup lies inside some Sylow $p$-subgroup; **(III, count)** the number $n_p$ of Sylow $p$-subgroups satisfies $n_p \equiv 1 \pmod p$ and $n_p \mid m$.`,
    proof: String.raw`**(I)** Let $G$ act on the set $\Omega$ of all $p^k$-element subsets of $G$ by left translation, $g\cdot A := gA$. The total count is $|\Omega| = \binom{p^k m}{p^k}$, and $p \nmid |\Omega|$. To see this elementarily, write the binomial coefficient as a product:
$$\binom{p^k m}{p^k} = \prod_{j=0}^{p^k - 1} \frac{p^k m - j}{p^k - j}.$$
For each $j$ in this range, let $p^t$ be the exact power of $p$ dividing $j$ (with $t < k$, since $0 < j < p^k$ when $j \neq 0$, and the $j = 0$ factor is $m$, which is prime to $p$). Then $p^t \mid p^k$, so $p^t$ divides both $p^k m - j$ and $p^k - j$ exactly — i.e. $p^{t+1}$ divides neither — because $p^k m - j = p^t(p^{k-t}m - j/p^t)$ and $p^k - j = p^t(p^{k-t} - j/p^t)$ with the parenthesized cofactors each $\equiv -j/p^t \not\equiv 0 \pmod p$. Hence every factor contributes the same power $p^t$ to numerator and denominator, and these cancel; the product is therefore prime to $p$. Since the orbits partition $\Omega$, some orbit $\mathcal{O}$ has size not divisible by $p$. Fix $A \in \mathcal{O}$ and let $P = \operatorname{Stab}(A)$. By **orbit–stabilizer**, $|\mathcal{O}| = [G:P] = p^k m / |P|$, so $p \nmid |\mathcal{O}|$ forces $p^k \mid |P|$, i.e. $|P| \ge p^k$. On the other hand, fixing $a \in A$, the map $P \to A$, $g \mapsto ga$, is injective (cancellation), so $|P| \le |A| = p^k$. Hence $|P| = p^k$: a Sylow $p$-subgroup.

**(II)** Let $P$ be a Sylow $p$-subgroup and $Q$ any $p$-subgroup. Let $Q$ act on the coset space $G/P$ by left translation. Since $|G/P| = m$ is prime to $p$ while every orbit has $p$-power size (it divides $|Q|$ by **orbit–stabilizer**), some orbit is a single fixed point $gP$: $QgP = gP$, i.e. $g^{-1}Qg \subseteq P$. Thus every $p$-subgroup is contained in a conjugate of $P$; taking $Q$ a Sylow subgroup forces $g^{-1}Qg = P$ by equal order, so all Sylow $p$-subgroups are conjugate.

**(III)** Let $G$ act by conjugation on the set $\operatorname{Syl}_p(G)$ of Sylow $p$-subgroups; by (II) this action is transitive, with $\operatorname{Stab}(P) = N_G(P)$, so by **orbit–stabilizer** $n_p = |\operatorname{Syl}_p(G)| = [G : N_G(P)]$. Since $P \le N_G(P)$, the index tower $[G:P] = [G : N_G(P)]\cdot[N_G(P) : P]$ shows $n_p = [G : N_G(P)]$ divides $[G:P] = m$. Now restrict the conjugation action to a single $P \in \operatorname{Syl}_p(G)$. Its fixed points are the Sylow subgroups $Q$ normalized by $P$; the only such is $P$ itself, for if $P$ normalizes $Q$ then $PQ$ is a subgroup with $|PQ| = |P|\,|Q|/|P\cap Q|$ a power of $p$, and $PQ \supseteq P$ with $|P| = p^k$ maximal forces $PQ = P = Q$. Every other orbit of $P$ on $\operatorname{Syl}_p(G)$ has size dividing $|P| = p^k$ and exceeding $1$, hence divisible by $p$; counting $\operatorname{Syl}_p(G)$ by these orbits gives $n_p \equiv 1 \pmod p$. $\square$`,
  },

  // ── Ring and module structure ──────────────────────────────────────────────
  {
    id: 'ideal',
    label: 'Ideal',
    title: 'Ideal',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['ring'],
    description: String.raw`An **ideal** is to a ring what a normal subgroup is to a group: an additive subgroup that "absorbs" multiplication by anything in the ring. Ideals are exactly the kernels of ring homomorphisms and exactly the subsets one can quotient by — the algebraic substrate of congruences, divisibility, and the coordinate rings of geometry.`,
    definition: String.raw`A subset $I \subseteq R$ of a ring is a **(two-sided) ideal** if $(I, +)$ is a subgroup of $(R, +)$ and $I$ absorbs multiplication:
$$rI \subseteq I \quad\text{and}\quad Ir \subseteq I \qquad (\forall r \in R).$$
In a commutative ring the two conditions coincide. The **principal ideal** generated by $a$ is $(a) = \{ra : r \in R\}$ (in a commutative ring with unity).`,
  },
  {
    id: 'quotient-ring',
    label: 'Quotient Ring',
    title: 'Quotient Ring',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['ideal', 'quotient-group'],
    description: String.raw`The **quotient ring** $R/I$ collapses an ideal to zero, computing with cosets just as modular arithmetic computes with residues. Quotienting a commutative ring with unity by a **maximal** ideal yields a field and by a **prime** ideal an integral domain — the algebraic factory for new fields and the coordinate rings of varieties.`,
    definition: String.raw`For a two-sided ideal $I \trianglelefteq R$ in a ring $R$ with unity, the **quotient ring** $R/I$ is the additive quotient group of cosets $r + I$ with multiplication
$$(r + I)(s + I) := rs + I.$$
The canonical map $\pi : R \to R/I$, $r \mapsto r + I$, is a surjective ring homomorphism with kernel $I$.`,
    proof: String.raw`**The multiplication is well defined, $R/I$ is a ring, and $\pi$ is a surjective ring homomorphism with kernel $I$.** The additive structure is the **quotient group** $(R,+)/(I,+)$. For multiplication, suppose $r + I = r' + I$ and $s + I = s' + I$, so $r' = r + a$, $s' = s + b$ with $a, b \in I$. Then $r's' = rs + (rb + as + ab)$, and $rb, as, ab \in I$ because $I$ **absorbs** multiplication; hence $r's' + I = rs + I$. Associativity and distributivity descend coset-wise from $R$, giving a ring whose unity is $1 + I$ (the image of the unity $1$ of $R$). The canonical map $\pi : R \to R/I$, $r \mapsto r + I$, is **surjective** (every coset is $\pi(r)$ for some $r$) and a **ring homomorphism**: $\pi(r + s) = (r+s)+I = \pi(r) + \pi(s)$, $\pi(rs) = rs + I = (r+I)(s+I) = \pi(r)\pi(s)$, and $\pi(1) = 1 + I$. Its **kernel** is $\{r : r + I = I\} = \{r : r \in I\} = I$. $\square$`,
  },
  {
    id: 'ring-homomorphism',
    label: 'Ring Homomorphism',
    title: 'Ring Homomorphism',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['ring', 'ideal', 'quotient-ring', 'isomorphism-theorems', 'group-homomorphism'],
    description: String.raw`A **ring homomorphism** preserves both ring operations (and the unit). Its kernel is an ideal, its image a subring, and dividing out the kernel recovers the image — the ring version of the first isomorphism theorem. Evaluating a polynomial, reducing modulo $n$, and including a subring are all ring homomorphisms.`,
    definition: String.raw`A **ring homomorphism** between rings with unity is a map $\phi : R \to S$ with
$$\phi(a + b) = \phi(a) + \phi(b),\qquad \phi(ab) = \phi(a)\phi(b),\qquad \phi(1_R) = 1_S.$$
Its **kernel** is $\ker\phi = \{r : \phi(r) = 0\}$ and its **image** $\operatorname{im}\phi = \phi(R)$.`,
    proof: String.raw`**$\ker\phi$ is an ideal, $\operatorname{im}\phi$ a subring, and $R/\ker\phi \cong \operatorname{im}\phi$.** The kernel is an additive subgroup, and for $r \in R$, $k \in \ker\phi$, $\phi(rk) = \phi(r)\phi(k) = \phi(r)\cdot 0 = 0$ (and likewise $kr$), so it **absorbs** multiplication: an **ideal**. The image is closed under $+$ and $\cdot$ and contains $1_S$, a subring. Finally, consider $\bar\phi : R/\ker\phi \to \operatorname{im}\phi$, $r + \ker\phi \mapsto \phi(r)$. Applying the **first isomorphism theorem** to the additive **group homomorphism** $\phi : (R,+) \to (S,+)$ shows $\bar\phi$ is a well-defined additive bijection onto $\operatorname{im}\phi$. It remains to check the ring-specific structure on the **quotient ring** $R/\ker\phi$: multiplicativity,
$$\bar\phi\bigl((r + \ker\phi)(s + \ker\phi)\bigr) = \bar\phi(rs + \ker\phi) = \phi(rs) = \phi(r)\phi(s) = \bar\phi(r + \ker\phi)\,\bar\phi(s + \ker\phi),$$
and $\bar\phi(1_R + \ker\phi) = \phi(1_R) = 1_S$. Hence $\bar\phi$ is a ring isomorphism, $R/\ker\phi \cong \operatorname{im}\phi$. $\square$`,
  },
  {
    id: 'module',
    label: 'Module',
    title: 'Module',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['ring', 'vector-space'],
    description: String.raw`A **module** is a vector space whose scalars come from a ring rather than a field — the natural setting for linear algebra when division is unavailable. Vector spaces are modules over a field; abelian groups are modules over $\mathbb{Z}$. The lack of inverses makes modules far richer and less tame than vector spaces.`,
    definition: String.raw`A **left module** over a ring $R$ with unity is an abelian group $(M, +)$ with a scalar multiplication $R \times M \to M$ satisfying, for $r, s \in R$ and $m, n \in M$,
$$r(m + n) = rm + rn,\quad (r + s)m = rm + sm,\quad (rs)m = r(sm),\quad 1m = m.$$
When $R$ is a field this is exactly a **vector space**; an abelian group is a $\mathbb{Z}$-module via $n\cdot m = m + \cdots + m$.`,
  },

  // ── Fields, extensions, and the big theorems ───────────────────────────────
  {
    id: 'field-extension',
    label: 'Field Extension',
    title: 'Field Extension',
    kind: 'definition',
    tags: ['Algebra'],
    dependencies: ['field', 'vector-space', 'basis', 'linear-independence-span'],
    description: String.raw`A **field extension** is a bigger field containing a smaller one, viewed as a vector space over the smaller. Its **degree** is the dimension of that vector space. Adjoining roots of polynomials builds extensions — $\mathbb{C} = \mathbb{R}(i)$, $\mathbb{Q}(\sqrt 2)$ — and the degrees multiply along towers, the arena where polynomial equations are solved.`,
    definition: String.raw`A **field extension** $E/F$ is a field $E$ together with a subfield $F \subseteq E$. Then $E$ is a **vector space** over $F$ (scalars from $F$, vectors from $E$), and the **degree** is $[E:F] := \dim_F E$. The extension is **finite** if $[E:F] < \infty$.`,
    proof: String.raw`**The tower law: for $F \subseteq K \subseteq E$, $[E:F] = [E:K]\,[K:F]$.** Let $\{x_i\}_{i\in I}$ be an $F$-basis of $K$ and $\{y_j\}_{j\in J}$ a $K$-basis of $E$. Every $e \in E$ is $e = \sum_j b_j y_j$ with $b_j \in K$, and each $b_j = \sum_i a_{ij} x_i$ with $a_{ij} \in F$, so $e = \sum_{i,j} a_{ij}(x_i y_j)$: the products $\{x_i y_j\}$ span $E$ over $F$. They are $F$-independent: if $\sum_{i,j} a_{ij} x_i y_j = 0$, then $\sum_j(\sum_i a_{ij} x_i)y_j = 0$ forces each $\sum_i a_{ij}x_i = 0$ (independence of the $y_j$ over $K$), and then each $a_{ij} = 0$ (independence of the $x_i$ over $F$). So $\{x_iy_j\}$ is an $F$-basis of $E$ of size $|I|\,|J|$, giving $[E:F] = [E:K][K:F]$. $\square$`,
  },
  {
    id: 'fundamental-theorem-of-algebra',
    label: 'FT of Algebra',
    title: 'Fundamental Theorem of Algebra',
    kind: 'theorem',
    tags: ['Algebra'],
    dependencies: ['polynomial', 'complex-numbers', 'liouville-theorem'],
    description: String.raw`Every non-constant polynomial with complex coefficients has a complex root, so $\mathbb{C}$ is **algebraically closed**: a degree-$n$ polynomial factors completely into $n$ linear factors. Though it concerns a purely algebraic object, its shortest proofs are analytic — the cleanest reads it straight off Liouville's theorem.`,
    statement: String.raw`Every non-constant polynomial $p \in \mathbb{C}[x]$ has a root in $\mathbb{C}$. Equivalently, every $p$ of degree $n \ge 1$ factors as $p(x) = c\prod_{i=1}^{n}(x - r_i)$ with $c, r_i \in \mathbb{C}$.`,
    proof: String.raw`Suppose, for contradiction, that a non-constant $p \in \mathbb{C}[x]$ has no root. Then $f := 1/p$ is defined and holomorphic on all of $\mathbb{C}$, i.e. **entire**. As $|x| \to \infty$, $|p(x)| \to \infty$ (the top-degree term dominates: $|p(x)| \ge |a_n||x|^n(1 - o(1))$), so $|f(x)| \to 0$; in particular $f$ is bounded outside some large disk, and continuous hence bounded on the closed disk, so $f$ is bounded on $\mathbb{C}$. By **Liouville's theorem** a bounded entire function is constant, so $f$, and therefore $p$, is constant — contradicting non-constancy. Hence $p$ has a root $r_1$.

Now factor: dividing $p$ by $x - r_1$ in the **polynomial** ring $\mathbb{C}[x]$ leaves remainder $p(r_1) = 0$, so $p(x) = (x - r_1)q(x)$ with $\deg q = n - 1$. Induct on degree to split $p$ into $n$ linear factors. $\square$`,
  },
  {
    id: 'galois-theory',
    label: 'Galois Theory',
    title: 'Galois Theory',
    kind: 'theorem',
    tags: ['Algebra'],
    dependencies: ['field-extension', 'group', 'group-action'],
    description: String.raw`**Galois theory** converts questions about field extensions into questions about finite groups. For a Galois extension it matches each intermediate field with the subgroup of automorphisms fixing it, an order-reversing bijection. The payoff is a precise criterion: a polynomial is solvable by radicals exactly when its Galois group is solvable — explaining the unsolvability of the general quintic.`,
    statement: String.raw`Let $E/F$ be a finite **Galois** extension (normal and separable) with **Galois group** $G = \operatorname{Gal}(E/F)$, the automorphisms of $E$ fixing $F$ pointwise. Then $|G| = [E:F]$, and the maps
$$K \longmapsto \operatorname{Gal}(E/K),\qquad H \longmapsto E^H = \{x \in E : \sigma x = x\ \forall\sigma\in H\}$$
are mutually inverse, order-reversing bijections between intermediate fields $F \subseteq K \subseteq E$ and subgroups $H \le G$; moreover $K/F$ is Galois iff $\operatorname{Gal}(E/K) \trianglelefteq G$, in which case $\operatorname{Gal}(K/F) \cong G/\operatorname{Gal}(E/K)$.`,
    proof: String.raw`*Sketch (every step true, the essential ones present).*

**Degree equals order.** By **Artin's lemma**, if a finite group $H$ acts faithfully by automorphisms on a field $E$ then $[E : E^H] = |H|$. For a finite Galois $E/F$ one has $E^G = F$ (this is the content of normality + separability: the fixed field is no larger than $F$), so $[E:F] = [E:E^G] = |G|$.

**The correspondence.** For an intermediate field $K$, the extension $E/K$ is again Galois, and Artin's lemma gives $E^{\operatorname{Gal}(E/K)} = K$, so $H \mapsto E^H$ and $K \mapsto \operatorname{Gal}(E/K)$ are mutually inverse; both reverse inclusion since a larger subgroup fixes fewer elements (and conversely). Counting via the **tower law** for **field extensions** matches $[E:K] = |\operatorname{Gal}(E/K)|$ with $|H|$ on the nose.

**Normality.** An intermediate $K$ is sent into itself by every $\sigma \in G$ iff $\operatorname{Gal}(E/K)$ is stable under conjugation, i.e. **normal** in $G$ — using that $\sigma\operatorname{Gal}(E/K)\sigma^{-1} = \operatorname{Gal}(E/\sigma K)$; this condition $\sigma K = K$ for all $\sigma$ is exactly normality of $K/F$. The upgrade from $K/F$ normal to $K/F$ **Galois** uses separability of $K/F$, which is inherited from the separability of $E/F$; granting this, when $\operatorname{Gal}(E/K) \trianglelefteq G$, restriction $G \to \operatorname{Gal}(K/F)$, $\sigma \mapsto \sigma|_K$, is a surjective **group homomorphism** with kernel $\operatorname{Gal}(E/K)$ (it acts on the **group** $G$ and on $K$), so by the first isomorphism theorem $\operatorname{Gal}(K/F) \cong G/\operatorname{Gal}(E/K)$. $\square$`,
  },
]

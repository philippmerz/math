import type { MathNode } from '../types'

export const COMMUTATIVE_ALGEBRA_NODES: MathNode[] = [
  {
    id: 'commutative-ring',
    label: 'Commutative Ring',
    title: 'Commutative Ring',
    kind: 'definition',
    tags: ['Commutative Algebra'],
    dependencies: ['ring'],
    description: String.raw`Commutative algebra is the study of rings whose multiplication commutes — the integers, polynomial rings, and rings of functions — together with their ideals and modules. Dropping non-commutativity is exactly what lets "ideal," "divisibility," and "spectrum" behave the way they do for $\mathbb{Z}$, and it makes these rings the algebraic foundation of algebraic geometry and number theory. A commutative ring is a ring in which $ab = ba$ always holds, carrying a multiplicative identity $1$.`,
    definition: String.raw`A **commutative ring with unity** is a ring $(R, +, \cdot)$ — an abelian group under $+$ with an associative, distributive multiplication — whose multiplication is **commutative** and has an **identity**:
$$a\cdot b = b\cdot a,\qquad 1\cdot a = a \qquad (\forall a, b \in R).$$
Unless stated otherwise "ring" below means a commutative ring with $1$. Central examples: $\mathbb{Z}$, any field $F$, the polynomial rings $F[x_1, \dots, x_n]$, and rings of functions into a ring.`,
  },
  {
    id: 'integral-domain',
    label: 'Integral Domain',
    title: 'Integral Domain',
    kind: 'definition',
    tags: ['Commutative Algebra'],
    dependencies: ['commutative-ring'],
    description: String.raw`An integral domain is a commutative ring with $1 \neq 0$ that has no **zero divisors**: a product can be zero only if a factor is. This single restriction is what makes multiplicative cancellation legal and what lets one embed the ring in its field of fractions, just as $\mathbb{Z}$ sits inside $\mathbb{Q}$. Domains are the rings in which divisibility and factorization are well behaved; $\mathbb{Z}$ and $F[x]$ are the prototypes.`,
    definition: String.raw`An **integral domain** is a commutative ring $R$ with $1 \neq 0$ and no zero divisors:
$$\forall a, b \in R\,\bigl(ab = 0 \;\rightarrow\; a = 0 \vee b = 0\bigr).$$`,
    proof: String.raw`**Multiplicative cancellation holds:** if $a \neq 0$ and $ab = ac$, then $b = c$. From $ab = ac$ we get $a(b - c) = ab - ac = 0$ by distributivity. Since $R$ is a **domain** it has no zero divisors, and $a \neq 0$, so the other factor must vanish: $b - c = 0$, i.e. $b = c$. (Conversely, cancellation by every nonzero element forces the no-zero-divisor condition, so the two formulations of "domain" agree.) $\square$`,
  },
  {
    id: 'unit-element',
    label: 'Unit',
    title: 'Unit of a Ring',
    kind: 'definition',
    tags: ['Commutative Algebra'],
    dependencies: ['commutative-ring'],
    description: String.raw`A unit is an invertible element of a ring — one that has a multiplicative inverse. In $\mathbb{Z}$ the units are just $\pm 1$; in a field every nonzero element is a unit. Units are exactly the elements you are allowed to divide by, and factorizations are only ever unique "up to units," so the notion is the bookkeeping that makes unique factorization precise.`,
    definition: String.raw`An element $u$ of a commutative ring $R$ is a **unit** if it has a multiplicative inverse: $\exists v \in R$ with $uv = 1$. The units form an abelian group $R^\times$ under multiplication. Two elements $a, b$ are **associates**, written $a \sim b$, if $a = ub$ for some unit $u$.`,
    proof: String.raw`**$R^\times$ is a group and association is an equivalence relation.** The inverse of a unit is unique (if $uv = uv' = 1$ then $v = v(uv') = (vu)v' = v'$), and $R^\times$ is closed under multiplication: if $uv = 1$ and $u'v' = 1$ then $(uu')(vv') = 1$ by commutativity, so $uu' \in R^\times$, with $1 \in R^\times$ as identity. Hence $R^\times$ is an abelian group. Association is reflexive ($a = 1\cdot a$), symmetric (if $a = ub$ then $b = u^{-1}a$), and transitive (if $a = ub$, $b = u'c$ then $a = (uu')c$), the inverses and products existing because $R^\times$ is a group. $\square$`,
  },
  {
    id: 'prime-ideal',
    label: 'Prime Ideal',
    title: 'Prime Ideal',
    kind: 'definition',
    tags: ['Commutative Algebra'],
    dependencies: ['ideal', 'integral-domain', 'quotient-ring'],
    description: String.raw`A prime ideal is the ideal-theoretic shadow of a prime number: a proper ideal $\mathfrak{p}$ such that whenever a product lands in $\mathfrak{p}$, one of the factors already does. Equivalently — and this is the clean way to think about it — the quotient $R/\mathfrak{p}$ is an integral domain. In $\mathbb{Z}$ the prime ideals are $(0)$ together with the $(p)$ for $p$ prime, and in general primes are the points of the spectrum, central to ideal factorization and to algebraic geometry.`,
    definition: String.raw`A **prime ideal** of a commutative ring $R$ is a proper ideal $\mathfrak{p} \subsetneq R$ such that
$$\forall a, b \in R\,\bigl(ab \in \mathfrak{p} \;\rightarrow\; a \in \mathfrak{p} \vee b \in \mathfrak{p}\bigr).$$`,
    proof: String.raw`**$\mathfrak{p}$ is prime $\iff$ $R/\mathfrak{p}$ is an integral domain.** Work in the **quotient ring** $R/\mathfrak{p}$, where $a + \mathfrak{p} = 0$ means exactly $a \in \mathfrak{p}$, and $(a+\mathfrak{p})(b+\mathfrak{p}) = ab + \mathfrak{p}$.

$(\Rightarrow)$ Suppose $\mathfrak{p}$ is prime. Then $\mathfrak{p} \neq R$ gives $1 \notin \mathfrak{p}$, so $1 + \mathfrak{p} \neq 0 + \mathfrak{p}$, i.e. $R/\mathfrak{p}$ has $1 \neq 0$. If $(a+\mathfrak{p})(b+\mathfrak{p}) = 0$ then $ab \in \mathfrak{p}$, so $a \in \mathfrak{p}$ or $b \in \mathfrak{p}$, i.e. $a + \mathfrak{p} = 0$ or $b + \mathfrak{p} = 0$. Thus $R/\mathfrak{p}$ has no zero divisors and is an **integral domain**.

$(\Leftarrow)$ Suppose $R/\mathfrak{p}$ is a domain. Then $1 \neq 0$ there, so $1 \notin \mathfrak{p}$ and $\mathfrak{p}$ is proper. If $ab \in \mathfrak{p}$, then $(a+\mathfrak{p})(b+\mathfrak{p}) = 0$ in the domain, forcing $a + \mathfrak{p} = 0$ or $b + \mathfrak{p} = 0$, i.e. $a \in \mathfrak{p}$ or $b \in \mathfrak{p}$. So $\mathfrak{p}$ is prime. $\square$`,
  },
  {
    id: 'ideal-correspondence',
    label: 'Correspondence Theorem',
    title: 'Ideal Correspondence (Lattice) Theorem',
    kind: 'theorem',
    tags: ['Commutative Algebra'],
    dependencies: ['ideal', 'quotient-ring', 'isomorphism-theorems'],
    description: String.raw`The correspondence (or lattice, or "fourth isomorphism") theorem says that passing to a quotient $R/I$ exactly hides the ideals below $I$ and faithfully records all the rest: the ideals of $R/I$ are in inclusion-preserving bijection with the ideals of $R$ that contain $I$, via $J \mapsto J/I$ and its inverse $\bar J \mapsto \pi^{-1}(\bar J)$. This is the workhorse that lets one read off properties of an ideal (maximality, primality) from the structure of the quotient ring.`,
    statement: String.raw`Let $R$ be a commutative ring with unity, $I \trianglelefteq R$ an ideal, and $\pi : R \to R/I$ the canonical surjection. The map
$$J \;\longmapsto\; \pi(J) = J/I$$
is an inclusion-preserving bijection from the set of ideals $J$ of $R$ with $I \subseteq J \subseteq R$ onto the set of all ideals of $R/I$, with inverse $\bar J \mapsto \pi^{-1}(\bar J)$. In particular it restricts to a bijection between maximal (resp. prime) ideals of $R$ containing $I$ and maximal (resp. prime) ideals of $R/I$.`,
    proof: String.raw`Write $\pi : R \to R/I$ for the canonical surjective ring homomorphism, whose kernel is $I$ (property of the **quotient ring**).

**Both maps land where claimed.** If $J$ is an ideal of $R$ with $I \subseteq J$, then $\pi(J) = J/I$ is an **ideal** of $R/I$: it is an additive subgroup (image of one under a homomorphism), and for $\bar r = \pi(r) \in R/I$ and $\pi(j) \in \pi(J)$ we have $\bar r\,\pi(j) = \pi(rj) \in \pi(J)$ since $rj \in J$. Conversely, if $\bar J$ is an ideal of $R/I$, then $\pi^{-1}(\bar J) = \{r \in R : \pi(r) \in \bar J\}$ is an ideal of $R$ (preimage of an ideal under a ring homomorphism: closed under subtraction, and $r \in \pi^{-1}(\bar J),\ s \in R \Rightarrow \pi(sr) = \pi(s)\pi(r) \in \bar J$), and it contains $\pi^{-1}(0) = \ker\pi = I$.

**The maps are mutually inverse.** For an ideal $\bar J$ of $R/I$, surjectivity of $\pi$ gives $\pi(\pi^{-1}(\bar J)) = \bar J$. For an ideal $J \supseteq I$ we always have $J \subseteq \pi^{-1}(\pi(J))$; for the reverse, if $r \in \pi^{-1}(\pi(J))$ then $\pi(r) = \pi(j)$ for some $j \in J$, so $r - j \in \ker\pi = I \subseteq J$, whence $r = (r - j) + j \in J$. Thus $\pi^{-1}(\pi(J)) = J$. (This is exactly where $J \supseteq I$ is needed.)

**Inclusion-preserving (in both directions).** If $J_1 \subseteq J_2$ then $\pi(J_1) \subseteq \pi(J_2)$; if $\bar J_1 \subseteq \bar J_2$ then $\pi^{-1}(\bar J_1) \subseteq \pi^{-1}(\bar J_2)$. A bijection that preserves inclusion both ways is an isomorphism of the inclusion orders, so it carries the maximal elements among proper ideals to maximal elements: $J \supseteq I$ is a maximal ideal of $R$ iff $J/I$ is a maximal ideal of $R/I$ (maximality being purely order-theoretic). Primality, however, is *not* an order property, so it needs the ring structure: by the third **isomorphism theorem** $(R/I)/(J/I) \cong R/J$ for $J \supseteq I$, so $R/J$ is an integral domain iff $(R/I)\big/(J/I)$ is, i.e. $J$ is a prime ideal of $R$ iff $J/I$ is a prime ideal of $R/I$ (by the quotient characterization of prime ideals). $\square$`,
  },
  {
    id: 'maximal-ideal',
    label: 'Maximal Ideal',
    title: 'Maximal Ideal',
    kind: 'definition',
    tags: ['Commutative Algebra'],
    dependencies: ['ideal', 'field', 'quotient-ring', 'ideal-correspondence'],
    description: String.raw`A maximal ideal is a proper ideal with no proper ideal strictly above it — a "largest" proper ideal. The decisive fact is that $\mathfrak{m}$ is maximal precisely when the quotient $R/\mathfrak{m}$ is a field, which is the standard way to manufacture fields. Maximal ideals are the closed points of the spectrum and, through the Nullstellensatz, the points of an affine variety.`,
    definition: String.raw`A **maximal ideal** of a commutative ring $R$ is a proper ideal $\mathfrak{m} \subsetneq R$ that is maximal under inclusion among proper ideals:
$$\mathfrak{m} \subseteq I \subseteq R \text{ with } I \text{ an ideal} \;\Longrightarrow\; I = \mathfrak{m} \text{ or } I = R.$$`,
    proof: String.raw`**$\mathfrak{m}$ is maximal $\iff$ $R/\mathfrak{m}$ is a field.** A commutative ring with $1 \neq 0$ is a **field** exactly when its only ideals are $(0)$ and the whole ring: in a field every nonzero $a$ has $a^{-1}$, so an ideal containing a nonzero $a$ contains $a^{-1}a = 1$ and hence everything; conversely if the only ideals are $(0)$ and $R$, then for $a \neq 0$ the ideal $(a)$ is not $(0)$, so $(a) = R$, giving $1 = ba$ for some $b$, i.e. $a$ is invertible. Now apply the **ideal correspondence theorem** to $I = \mathfrak{m}$: with $\pi : R \to R/\mathfrak{m}$ the canonical surjection (kernel $\mathfrak{m}$), the map $J \mapsto \pi(J) = J/\mathfrak{m}$ is an inclusion-preserving bijection between the ideals $J$ of $R$ with $\mathfrak{m} \subseteq J \subseteq R$ and all ideals of the **quotient ring** $R/\mathfrak{m}$, with inverse $\bar J \mapsto \pi^{-1}(\bar J)$ (concretely: $\pi^{-1}(\bar J)$ is an ideal of $R$ containing $\mathfrak{m} = \pi^{-1}(0)$, and these are mutually inverse since $\pi(\pi^{-1}(\bar J)) = \bar J$ by surjectivity and $\pi^{-1}(\pi(J)) = J$ as $J \supseteq \ker\pi$). Under this bijection $\mathfrak{m}$ corresponds to $(0)$ and $R$ to the whole quotient. Since $\mathfrak{m}$ is **proper**, $1 \notin \mathfrak{m}$, so $1 + \mathfrak{m} \neq 0 + \mathfrak{m}$ in $R/\mathfrak{m}$, i.e. the quotient satisfies $1 \neq 0$ and $(0)$ is a proper ideal of it — the hypothesis the field criterion requires. So: $\mathfrak{m}$ is maximal (no ideal strictly between $\mathfrak{m}$ and $R$) iff $R/\mathfrak{m}$ has no ideal strictly between $(0)$ and itself iff $(0)$ and $R/\mathfrak{m}$ are the only ideals of the nonzero ring $R/\mathfrak{m}$ iff $R/\mathfrak{m}$ is a field. $\square$`,
  },
  {
    id: 'maximal-is-prime',
    label: 'Maximal ⟹ Prime',
    title: 'Every Maximal Ideal is Prime',
    kind: 'corollary',
    tags: ['Commutative Algebra'],
    dependencies: ['maximal-ideal', 'prime-ideal'],
    description: String.raw`Maximality is a stronger condition than primality: every maximal ideal is prime, but not conversely (in $\mathbb{Z}$ the ideal $(0)$ is prime yet far from maximal). The cleanest reason is that fields are integral domains, so a quotient that is a field is in particular a domain.`,
    statement: String.raw`In a commutative ring $R$, every maximal ideal $\mathfrak{m}$ is a prime ideal.`,
    proof: String.raw`By the characterization of **maximal ideals**, $R/\mathfrak{m}$ is a field. Every field is an integral domain — a field has $1 \neq 0$, and if $ab = 0$ with $a \neq 0$ then multiplying by $a^{-1}$ gives $b = 0$, so there are no zero divisors. Hence $R/\mathfrak{m}$ is an integral domain, which by the characterization of **prime ideals** says exactly that $\mathfrak{m}$ is prime. $\square$`,
  },
  {
    id: 'krull-existence-maximal-ideal',
    label: 'Existence of Maximal Ideals',
    title: "Krull's Theorem (Existence of Maximal Ideals)",
    kind: 'theorem',
    tags: ['Commutative Algebra'],
    dependencies: ['maximal-ideal', 'ideal', 'zorns-lemma'],
    description: String.raw`Every nonzero ring has at least one maximal ideal — indeed every proper ideal is contained in one. This is the existence theorem that makes the spectrum non-empty and lets one always pass to a residue field; it is a textbook application of Zorn's lemma, and is in fact equivalent to the axiom of choice.`,
    statement: String.raw`Let $R$ be a commutative ring with $1 \neq 0$. Every proper ideal $I \subsetneq R$ is contained in a maximal ideal. In particular $R$ has a maximal ideal.`,
    proof: String.raw`Let $\Sigma = \{\,J : J \text{ is a proper ideal of } R \text{ with } I \subseteq J\,\}$, partially ordered by inclusion. It is non-empty since $I \in \Sigma$. Let $\mathcal{C} \subseteq \Sigma$ be a chain (totally ordered by inclusion) and put $U = \bigcup_{J \in \mathcal{C}} J$. Then $U$ is an ideal: given $a, b \in U$ and $r \in R$, both $a, b$ lie in some common $J \in \mathcal{C}$ (the larger of the two containing them, the chain being totally ordered), so $a - b, ra \in J \subseteq U$. Moreover $U$ is **proper**: if $1 \in U$ then $1 \in J$ for some $J \in \mathcal{C}$, making that $J$ improper — contrary to $J \in \Sigma$. Hence $U \in \Sigma$ is an upper bound for $\mathcal{C}$. Every chain having an upper bound, **Zorn's lemma** yields a maximal element $\mathfrak{m} \in \Sigma$. This $\mathfrak{m}$ is a **maximal ideal**: it is proper and contains $I$, and any ideal strictly larger than $\mathfrak{m}$ is either improper or, if proper, would lie in $\Sigma$ above $\mathfrak{m}$, contradicting maximality in $\Sigma$. Taking $I = (0)$ (proper since $1 \neq 0$) shows $R$ has a maximal ideal. $\square$`,
  },
  {
    id: 'euclidean-domain',
    label: 'Euclidean Domain',
    title: 'Euclidean Domain',
    kind: 'definition',
    tags: ['Commutative Algebra'],
    dependencies: ['integral-domain'],
    description: String.raw`A Euclidean domain is an integral domain equipped with a notion of "size" supporting division with remainder — the abstract setting in which the Euclidean algorithm runs. The integers (size $|\cdot|$) and polynomial rings over a field (size $\deg$) are the models. The single division-with-remainder axiom is strong: it forces every ideal to be principal.`,
    definition: String.raw`A **Euclidean domain** is an integral domain $R$ together with a **Euclidean function** $d : R \setminus \{0\} \to \mathbb{N}$ such that for all $a, b \in R$ with $b \neq 0$ there exist $q, r \in R$ with
$$a = q b + r, \qquad r = 0 \ \text{ or } \ d(r) < d(b).$$
(The quotient and remainder need not be unique.) Examples: $\mathbb{Z}$ with $d(n) = |n|$, and $F[x]$ with $d(p) = \deg p$.`,
  },
  {
    id: 'principal-ideal-domain',
    label: 'Principal Ideal Domain',
    title: 'Principal Ideal Domain',
    kind: 'definition',
    tags: ['Commutative Algebra'],
    dependencies: ['integral-domain', 'ideal'],
    description: String.raw`A principal ideal domain (PID) is an integral domain in which every ideal is generated by a single element. The single-generator condition is what makes finitely generated modules over a PID completely classifiable — the structure theorem behind Jordan normal form and the classification of finite abelian groups — with $\mathbb{Z}$ and $F[x]$ as the prototypes.`,
    definition: String.raw`A **principal ideal domain** (PID) is an integral domain $R$ in which every ideal is **principal**: for each ideal $I$ there is $a \in R$ with
$$I = (a) = \{\,ra : r \in R\,\}.$$`,
  },
  {
    id: 'ed-implies-pid',
    label: 'Euclidean ⟹ PID',
    title: 'Every Euclidean Domain is a PID',
    kind: 'proposition',
    tags: ['Commutative Algebra'],
    dependencies: ['euclidean-domain', 'principal-ideal-domain', 'ideal'],
    description: String.raw`The Euclidean axiom buys principality: in a Euclidean domain an ideal is generated by any of its nonzero elements of least size, exactly as in $\mathbb{Z}$ where $(a, b) = (\gcd(a,b))$. This places $\mathbb{Z}$ and $F[x]$ inside the PIDs.`,
    statement: String.raw`Every Euclidean domain is a principal ideal domain.`,
    proof: String.raw`Let $(R, d)$ be a **Euclidean domain** and $I \subseteq R$ an ideal. If $I = (0)$ it is principal. Otherwise the set $\{\,d(x) : x \in I,\ x \neq 0\,\} \subseteq \mathbb{N}$ is non-empty, so by well-ordering of $\mathbb{N}$ it has a least element, attained at some $b \in I$ with $b \neq 0$. We claim $I = (b)$. Clearly $(b) \subseteq I$ since $I$ is an ideal. Conversely take any $a \in I$; by the **Euclidean** division property write $a = qb + r$ with $r = 0$ or $d(r) < d(b)$. Then $r = a - qb \in I$ (both $a$ and $qb$ lie in the ideal $I$). If $r \neq 0$, then $d(r) < d(b)$ contradicts the minimality of $d(b)$ among nonzero elements of $I$; hence $r = 0$ and $a = qb \in (b)$. Thus $I = (b)$ is principal, so $R$ is a **PID**. $\square$`,
  },
  {
    id: 'irreducible-element',
    label: 'Irreducible Element',
    title: 'Irreducible & Prime Elements',
    kind: 'definition',
    tags: ['Commutative Algebra'],
    dependencies: ['integral-domain', 'unit-element', 'prime-ideal'],
    description: String.raw`Two competing notions of "atom" in a domain. An element is **irreducible** if it cannot be split into a product of two non-units — the naive "can't factor it" condition. It is **prime** if, whenever it divides a product, it divides a factor — Euclid's lemma promoted to a definition. Prime always implies irreducible; the reverse can fail, and unique factorization is precisely the statement that the two coincide.`,
    definition: String.raw`Let $R$ be an integral domain and $p \in R$ a nonzero non-unit. Then $p$ is **irreducible** if
$$p = ab \;\Longrightarrow\; a \text{ is a unit or } b \text{ is a unit},$$
and $p$ is **prime** if the ideal $(p)$ is a prime ideal, equivalently
$$p \mid ab \;\Longrightarrow\; p \mid a \ \text{ or } \ p \mid b.$$`,
    proof: String.raw`**In an integral domain every prime element is irreducible.** Let $p$ be prime and suppose $p = ab$. Then $p \mid ab$, so by primality $p \mid a$ or $p \mid b$; say $p \mid a$, write $a = pc$. Then $p = ab = pcb$, and cancelling $p$ (legal since $R$ is a **domain** and $p \neq 0$) gives $1 = cb$, so $b$ is a **unit**. Symmetrically if $p \mid b$ then $a$ is a unit. Hence $p$ is irreducible. (The converse can fail in a general domain, e.g. $2$ is irreducible but not prime in $\mathbb{Z}[\sqrt{-5}]$; the two notions coincide exactly in a unique factorization domain.) $\square$`,
  },
  {
    id: 'unique-factorization-domain',
    label: 'Unique Factorization Domain',
    title: 'Unique Factorization Domain',
    kind: 'definition',
    tags: ['Commutative Algebra'],
    dependencies: ['integral-domain', 'irreducible-element'],
    description: String.raw`A unique factorization domain (UFD) is a domain where the fundamental theorem of arithmetic holds: every nonzero non-unit factors into irreducibles, and that factorization is unique up to order and unit factors. This is the natural home of $\gcd$ and divisibility. Every PID is a UFD, and by Gauss's lemma $R[x]$ is a UFD whenever $R$ is, so $F[x_1, \dots, x_n]$ enjoys unique factorization.`,
    definition: String.raw`A **unique factorization domain** (UFD) is an integral domain $R$ in which every nonzero non-unit $a$ admits a factorization into irreducibles,
$$a = p_1 p_2 \cdots p_n \qquad (p_i \text{ irreducible}),$$
and this factorization is **unique up to order and associates**: if $a = p_1 \cdots p_n = q_1 \cdots q_m$ with all $p_i, q_j$ irreducible, then $n = m$ and, after reindexing, $p_i \sim q_i$ for each $i$.`,
    proof: String.raw`**In a UFD every irreducible element is prime.** This is the key consequence that distinguishes UFDs. Let $p$ be **irreducible** and suppose $p \mid ab$, say $ab = pc$. If $a$ or $b$ is zero the conclusion is trivial; if either is a unit, $p$ divides the other directly. Otherwise factor $a = \prod x_i$, $b = \prod y_j$, and $c = \prod z_k$ into irreducibles. Then $\prod x_i \prod y_j = p \prod z_k$ are two irreducible factorizations of $ab$. By **uniqueness**, $p$ is an associate of some factor on the left — some $x_i$ or some $y_j$. If $p \sim x_i$ then $p \mid a$; if $p \sim y_j$ then $p \mid b$. Hence $p$ is prime. So in a UFD the irreducibles are exactly the primes. $\square$`,
  },
  {
    id: 'pid-implies-ufd',
    label: 'PID ⟹ UFD',
    title: 'Every PID is a UFD',
    kind: 'theorem',
    tags: ['Commutative Algebra'],
    dependencies: ['principal-ideal-domain', 'unique-factorization-domain', 'irreducible-element', 'noetherian-ring'],
    description: String.raw`The principal ideal condition forces unique factorization. Existence of factorizations comes from the ascending chain condition (a PID is Noetherian), and uniqueness comes from the fact that in a PID every irreducible is prime — proved via Bézout, exactly as for $\mathbb{Z}$. This subsumes the fundamental theorem of arithmetic and unique factorization in $F[x]$.`,
    statement: String.raw`Every principal ideal domain is a unique factorization domain.`,
    proof: String.raw`Let $R$ be a **PID**.

**Existence of factorizations.** A PID is **Noetherian**: every ideal is generated by one element, hence by finitely many, so the ascending chain condition holds. Suppose, for contradiction, some nonzero non-unit $a_0$ has no factorization into irreducibles. Then $a_0$ is not itself irreducible, so $a_0 = a_1 b_1$ with $a_1, b_1$ non-units; at least one factor, say $a_1$, again has no irreducible factorization. Iterating yields $a_0, a_1, a_2, \dots$ each a proper divisor of the previous, giving a strictly ascending chain $(a_0) \subsetneq (a_1) \subsetneq (a_2) \subsetneq \cdots$ (each inclusion strict because $a_{i+1}$ properly divides $a_i$, so $(a_i) \subseteq (a_{i+1})$ with equality only if the cofactor is a unit, which it is not). This violates the ascending chain condition. Hence every nonzero non-unit factors into irreducibles.

**In a PID every irreducible is prime.** Let $p$ be **irreducible** and suppose $p \mid ab$ but $p \nmid a$. Consider the ideal $(p, a) = (d)$, principal since $R$ is a PID. Then $d \mid p$; as $p$ is irreducible, $d$ is a unit or an associate of $p$. It cannot be an associate of $p$, for then $p \mid a$ (as $d \mid a$), contrary to assumption. So $d$ is a unit and $(p, a) = R$; write $1 = sp + ta$ for some $s, t \in R$. Multiply by $b$: $b = spb + tab$. Both $spb$ and $tab$ are divisible by $p$ (the second since $p \mid ab$), so $p \mid b$. Thus $p$ is prime.

**Uniqueness.** Suppose $p_1 \cdots p_n = q_1 \cdots q_m$ with all $p_i, q_j$ irreducible, and induct on $n$.

*Base case $n = 1$.* Here $p_1 = q_1 \cdots q_m$. If $m \ge 2$, then $p_1 = q_1\,(q_2 \cdots q_m)$ exhibits $p_1$ as a product of two non-units (each $q_j$ is irreducible, hence a non-unit, and a product of non-units in a domain is a non-unit), contradicting the irreducibility of $p_1$. So $m = 1$ and $p_1 = q_1$, in particular $p_1 \sim q_1$; thus $n = m = 1$ with the factors matched.

*Inductive step $n \ge 2$.* Assume the claim for shorter products on the left. Now $p_1$ is **prime** (previous step), and $p_1 \mid q_1 \cdots q_m$, so $p_1 \mid q_j$ for some $j$; since $q_j$ is irreducible and $p_1$ is a non-unit, $p_1 \sim q_j$, say $q_j = u p_1$ with $u$ a **unit**. Cancel $p_1$ (valid in the domain $R$, as $p_1 \neq 0$):
$$p_2 \cdots p_n = u\, q_1 \cdots \widehat{q_j} \cdots q_m.$$
The left side is a nonempty product of irreducibles (since $n \ge 2$), hence a non-unit; so the right side is a non-unit, forcing $m - 1 \ge 1$, i.e. at least one factor $q_i$ ($i \neq j$) remains. Absorb the unit $u$ into one such factor, replacing $q_i$ by the associate (still irreducible) $u q_i$; the right side is now a product of $m - 1$ irreducibles. Applying the inductive hypothesis to $p_2 \cdots p_n$ (length $n - 1$) gives $n - 1 = m - 1$ and a pairing of the remaining factors up to associates. Together with $p_1 \sim q_j$ this yields $n = m$ and a full pairing $p_i \sim q_{\sigma(i)}$. Hence factorizations are unique up to order and associates, and $R$ is a **UFD**. $\square$`,
  },
  {
    id: 'noetherian-ring',
    label: 'Noetherian Ring',
    title: 'Noetherian Ring',
    kind: 'definition',
    tags: ['Commutative Algebra'],
    dependencies: ['commutative-ring', 'ideal'],
    description: String.raw`A Noetherian ring is one with no infinite strictly increasing chains of ideals — equivalently, every ideal is finitely generated. This finiteness is the single most important tameness condition in commutative algebra: it makes ideal theory manageable and underpins essentially all of algebraic geometry. Hilbert's basis theorem propagates it to polynomial rings, so $F[x_1, \dots, x_n]$ is Noetherian.`,
    definition: String.raw`A commutative ring $R$ is **Noetherian** if it satisfies the **ascending chain condition** (ACC) on ideals: every increasing chain
$$I_1 \subseteq I_2 \subseteq I_3 \subseteq \cdots$$
of ideals **stabilizes**, i.e. there is $N$ with $I_n = I_N$ for all $n \ge N$.`,
    proof: String.raw`**ACC holds $\iff$ every ideal is finitely generated.**

$(\Rightarrow)$ Suppose ACC holds, and let $I$ be an ideal that is *not* finitely generated. Pick $a_1 \in I$; since $(a_1) \neq I$, pick $a_2 \in I \setminus (a_1)$; inductively, since $(a_1, \dots, a_n) \neq I$ (else $I$ were finitely generated), pick $a_{n+1} \in I \setminus (a_1, \dots, a_n)$. This produces a strictly ascending chain $(a_1) \subsetneq (a_1, a_2) \subsetneq \cdots$ that never stabilizes, contradicting ACC. Hence every ideal is finitely generated.

$(\Leftarrow)$ Suppose every ideal is finitely generated, and let $I_1 \subseteq I_2 \subseteq \cdots$ be an ascending chain. Their union $I = \bigcup_n I_n$ is an ideal (any two elements lie in a common $I_n$, which is closed under the operations and absorbs multiplication). By hypothesis $I = (a_1, \dots, a_k)$ for finitely many generators; each $a_j$ lies in some $I_{n_j}$, so all lie in $I_N$ with $N = \max_j n_j$. Then $I \subseteq I_N \subseteq I = \bigcup I_n$, forcing $I_n = I_N$ for all $n \ge N$. So ACC holds. $\square$`,
  },
  {
    id: 'localization',
    label: 'Localization',
    title: 'Localization',
    kind: 'definition',
    tags: ['Commutative Algebra'],
    dependencies: ['commutative-ring', 'prime-ideal', 'equivalence-relation'],
    description: String.raw`Localization formally inverts a chosen set of elements of a ring, building a ring of fractions $S^{-1}R$ — the algebraic analogue of zooming in on part of a space. Inverting everything outside a prime $\mathfrak{p}$ gives the **local ring** $R_\mathfrak{p}$, which has a unique maximal ideal and isolates the behaviour of $R$ near that prime. It is the standard device for studying a ring one prime at a time, and the construction generalizes the passage from $\mathbb{Z}$ to $\mathbb{Q}$.`,
    definition: String.raw`Let $R$ be a commutative ring and $S \subseteq R$ a **multiplicative set**: $1 \in S$ and $S$ is closed under multiplication. On $R \times S$ define
$$(a, s) \sim (b, t) \;:\Longleftrightarrow\; \exists u \in S\,\bigl(u(at - bs) = 0\bigr).$$
The **localization** is $S^{-1}R := (R \times S)/{\sim}$, the class of $(a, s)$ written $\tfrac{a}{s}$, with
$$\tfrac{a}{s} + \tfrac{b}{t} := \tfrac{at + bs}{st}, \qquad \tfrac{a}{s}\cdot\tfrac{b}{t} := \tfrac{ab}{st}.$$
For a prime ideal $\mathfrak{p}$, taking $S = R \setminus \mathfrak{p}$ gives the **local ring** $R_\mathfrak{p}$.`,
    proof: String.raw`**$\sim$ is an equivalence relation, the operations are well defined, and $R_\mathfrak{p}$ is local.** Reflexivity and symmetry of $\sim$ are clear (take $u = 1$). For transitivity, suppose $u(at - bs) = 0$ and $v(bw - ct) = 0$ with $u, v \in S$; multiply the first by $vw$ and the second by $us$ and add, obtaining $uvt(aw - cs) = 0$, and $uvt \in S$ (closure under multiplication, $t \in S$), so $(a,s) \sim (c, w)$. The extra factor $u$ in the definition is exactly what rescues transitivity when $R$ has zero divisors. Well-definedness of $+$ and $\cdot$ is checked the same way: replacing a representative by an equivalent one changes numerator and denominator compatibly, the auxiliary $u$ absorbing the discrepancy; the ring axioms then descend from those of $R$, with $0 = \tfrac{0}{1}$, $1 = \tfrac{1}{1}$.

For the **local ring** $R_\mathfrak{p}$ with $S = R \setminus \mathfrak{p}$ (a multiplicative set precisely because $\mathfrak{p}$ is a **prime ideal**: $1 \notin \mathfrak{p}$ and $a, b \notin \mathfrak{p} \Rightarrow ab \notin \mathfrak{p}$), let
$$\mathfrak{m} = \mathfrak{p}R_\mathfrak{p} = \bigl\{\tfrac{a}{s} : a \in \mathfrak{p},\ s \notin \mathfrak{p}\bigr\}.$$
A fraction $\tfrac{a}{s}$ is a **unit** of $R_\mathfrak{p}$ iff $a \notin \mathfrak{p}$ (then $\tfrac{s}{a}$ is its inverse). Hence the non-units are exactly the elements of $\mathfrak{m}$, so $\mathfrak{m}$ is a proper ideal containing every proper ideal — the unique maximal ideal. A ring with a unique maximal ideal is **local**. $\square$`,
  },
  {
    id: 'spectrum-of-a-ring',
    label: 'Spectrum (Spec)',
    title: 'Spectrum of a Ring',
    kind: 'definition',
    tags: ['Commutative Algebra'],
    dependencies: ['prime-ideal', 'ideal', 'topological-space'],
    description: String.raw`The spectrum $\operatorname{Spec} R$ turns a commutative ring into a space: its points are the prime ideals, and the **Zariski topology** declares a set closed when it consists of all primes containing some fixed ideal. Ring elements then behave like functions on this space (the "value" of $f$ at $\mathfrak{p}$ being its image in the residue field), and ring homomorphisms induce continuous maps. This is the construction that lets algebraic geometry treat any commutative ring as a geometric object.`,
    definition: String.raw`The **spectrum** of a commutative ring $R$ is the set
$$\operatorname{Spec} R := \{\,\mathfrak{p} \subseteq R : \mathfrak{p} \text{ is a prime ideal}\,\}.$$
For an ideal $I \subseteq R$ set $V(I) = \{\,\mathfrak{p} \in \operatorname{Spec} R : I \subseteq \mathfrak{p}\,\}$. The **Zariski topology** takes the sets $V(I)$ as its closed sets.`,
    proof: String.raw`**The sets $V(I)$ are the closed sets of a topology on $\operatorname{Spec} R$.** We verify the axioms of a **topological space** for the family $\{V(I)\}$ as closed sets (equivalently, their complements as open sets).

*The whole space and the empty set are closed:* $V((0)) = \operatorname{Spec} R$ (every prime contains $0$) and $V(R) = \varnothing$ (no prime is improper, so none contains $1$).

*Closed under arbitrary intersections:* for any family of ideals $\{I_\alpha\}$,
$$\bigcap_\alpha V(I_\alpha) = \{\mathfrak{p} : I_\alpha \subseteq \mathfrak{p}\ \forall \alpha\} = \{\mathfrak{p} : \textstyle\sum_\alpha I_\alpha \subseteq \mathfrak{p}\} = V\!\bigl(\textstyle\sum_\alpha I_\alpha\bigr),$$
since a prime contains every $I_\alpha$ iff it contains the ideal they generate.

*Closed under finite unions:* $V(I) \cup V(J) = V(IJ)$, where $IJ$ is the product ideal. Indeed if $\mathfrak{p} \supseteq I$ or $\mathfrak{p} \supseteq J$ then $\mathfrak{p} \supseteq IJ$. Conversely suppose $\mathfrak{p} \supseteq IJ$ but $\mathfrak{p} \not\supseteq I$, so there is $a \in I \setminus \mathfrak{p}$. For every $b \in J$, $ab \in IJ \subseteq \mathfrak{p}$, and since $\mathfrak{p}$ is **prime** and $a \notin \mathfrak{p}$, we get $b \in \mathfrak{p}$; thus $J \subseteq \mathfrak{p}$. So $\mathfrak{p} \in V(I) \cup V(J)$.

The closed sets thus contain $\varnothing, \operatorname{Spec} R$ and are stable under arbitrary intersections and finite unions; complementing, the open sets satisfy the three axioms of a topological space. $\square$`,
  },
  {
    id: 'nullstellensatz',
    label: 'Nullstellensatz',
    title: "Hilbert's Nullstellensatz",
    kind: 'theorem',
    tags: ['Commutative Algebra'],
    dependencies: ['maximal-ideal', 'prime-ideal', 'polynomial', 'noetherian-ring', 'field-extension', 'krull-existence-maximal-ideal'],
    description: String.raw`Over an algebraically closed field $k$, Hilbert's Nullstellensatz is the precise dictionary between algebra and geometry. Its "weak" form says the maximal ideals of $k[x_1, \dots, x_n]$ are exactly the points of $k^n$ (so a system of polynomials with no common ideal-theoretic obstruction has a common zero); its "strong" form says the polynomials vanishing on the zero set of an ideal $I$ are precisely the radical $\sqrt{I}$. Together they make ideals and varieties two views of one object — the cornerstone of algebraic geometry.`,
    statement: String.raw`Let $k$ be an algebraically closed field and $R = k[x_1, \dots, x_n]$.
**(Weak form)** Every maximal ideal of $R$ has the form $\mathfrak{m}_a = (x_1 - a_1, \dots, x_n - a_n)$ for a unique point $a = (a_1, \dots, a_n) \in k^n$; consequently a proper ideal $I \subsetneq R$ has a common zero in $k^n$.
**(Strong form)** For any ideal $I \subseteq R$, with $V(I) = \{a \in k^n : f(a) = 0\ \forall f \in I\}$ and $I(V) = \{f : f|_V = 0\}$,
$$I\bigl(V(I)\bigr) = \sqrt{I} := \{\,f \in R : f^m \in I \text{ for some } m \ge 1\,\}.$$`,
    proof: String.raw`*The hard input is Zariski's lemma; the rest is genuine and given in full.*

**Zariski's lemma.** If a field $L$ is finitely generated as a $k$-**algebra** (a quotient of some $k[x_1, \dots, x_m]$), then $L$ is a finite — hence algebraic — **field extension** of $k$. This is the one nontrivial input; it follows from the Noether normalization lemma over the **Noetherian** ring $R$, or from the Artin–Tate argument. We use it as a cited result with its stated hypotheses.

**Weak form.** Let $\mathfrak{m} \subseteq R$ be a **maximal ideal**. Then $L = R/\mathfrak{m}$ is a **field** (characterization of maximal ideals) and is generated as a $k$-algebra by the images $\bar{x}_i$, so by Zariski's lemma $L/k$ is algebraic. As $k$ is **algebraically closed**, the only algebraic extension of $k$ is $k$ itself, so the inclusion $k \hookrightarrow L$ is an isomorphism. Let $a_i \in k$ be the element corresponding to $\bar{x}_i$; then $x_i - a_i \in \mathfrak{m}$, so $\mathfrak{m} \supseteq \mathfrak{m}_a = (x_1 - a_1, \dots, x_n - a_n)$. But $\mathfrak{m}_a$ is itself maximal (the evaluation map $R \to k$, $f \mapsto f(a)$, is onto with kernel exactly $\mathfrak{m}_a$, so $R/\mathfrak{m}_a \cong k$ is a field), so $\mathfrak{m} = \mathfrak{m}_a$. Uniqueness of $a$ is clear since $a_i$ is recovered as the value of $x_i$. Now if $I \subsetneq R$ is proper, by Krull's theorem it lies in some maximal ideal $\mathfrak{m} = \mathfrak{m}_a$; then every $f \in I$ satisfies $f(a) = 0$, so $a$ is a common zero.

**Strong form, via the Rabinowitsch trick.** The inclusion $\sqrt{I} \subseteq I(V(I))$ is immediate: if $f^m \in I$ then $f^m$ vanishes on $V(I)$, and since $k$ is a field (a domain) $f$ vanishes there too. For the reverse, let $f \in I(V(I))$, with $I = (g_1, \dots, g_r)$ finitely generated (possible because $R$ is **Noetherian**, by Hilbert's basis theorem). Introduce a new variable $t$ and consider the ideal $J = (g_1, \dots, g_r,\ 1 - tf) \subseteq k[x_1, \dots, x_n, t]$. The polynomials of $J$ have no common zero in $k^{n+1}$: at any point where all $g_i$ vanish we have $f = 0$ too (as $f \in I(V(I))$), forcing $1 - tf = 1 \neq 0$. By the weak form $J$ cannot be proper, so $J = (1)$ and we may write
$$1 = \sum_{i} h_i(x, t)\, g_i(x) + h_0(x, t)\,(1 - tf)$$
in $k[x, t]$. Substitute $t = 1/f$ and clear denominators by multiplying through by a high power $f^N$: the term with $1 - tf$ dies, leaving $f^N = \sum_i (f^N h_i)|_{t = 1/f}\, g_i \in I$. Hence $f \in \sqrt{I}$, giving $I(V(I)) = \sqrt{I}$. $\square$`,
  },
  {
    id: 'integral-element',
    label: 'Integral Element',
    title: 'Integral Elements & Integral Closure',
    kind: 'definition',
    tags: ['Commutative Algebra'],
    dependencies: ['commutative-ring', 'integral-domain', 'polynomial', 'module', 'cayley-hamilton', 'adjugate', 'determinant'],
    description: String.raw`An element of a ring extension is **integral** over a subring when it satisfies a *monic* polynomial with coefficients in the subring — the abstraction of "algebraic integer" ($\sqrt{2}$ satisfies $x^2 - 2$, but $\tfrac12$ satisfies no monic integer polynomial). The integral elements form a subring, the **integral closure**; a domain that equals its own integral closure in its fraction field is **integrally closed**, a normality condition every UFD enjoys.`,
    definition: String.raw`Let $R \subseteq S$ be commutative rings. An element $s \in S$ is **integral over $R$** if it satisfies a **monic** polynomial relation
$$s^n + c_{n-1}s^{n-1} + \cdots + c_1 s + c_0 = 0, \qquad c_i \in R.$$
The **integral closure** of $R$ in $S$ is the set of all such $s$ (it is a subring of $S$ containing $R$). An integral domain $R$ with fraction field $K$ is **integrally closed** (normal) if its integral closure in $K$ equals $R$.`,
    proof: String.raw`**Integrality is equivalent to lying in a finitely generated $R$-submodule, and the integral elements form a subring.** If $s$ is **integral** via a monic relation of degree $n$, then $R[s]$ is generated as an $R$-module by $1, s, \dots, s^{n-1}$ (the monic relation rewrites $s^n$, and inductively every higher power, in terms of these), so $R[s]$ is a finitely generated $R$-module. Conversely, if $s$ lies in a subring $M$ that is finitely generated as an $R$-module and is faithful, then multiplication by $s$ is an $R$-linear endomorphism of $M$; by the determinant–adjugate (Cayley–Hamilton) trick, $s$ satisfies the characteristic-type monic equation $\det(s\cdot \mathrm{Id} - [\,\cdot s\,]) = 0$ with coefficients in $R$, so $s$ is integral. Now if $s, t$ are both integral over $R$, then $R[s, t]$ is a finitely generated $R$-module (it is finitely generated over the finitely generated $R[s]$), and it contains $s \pm t$ and $st$; by the equivalence just shown these are integral. Hence the integral elements form a subring containing $R$ — the **integral closure**. $\square$`,
  },
  {
    id: 'krull-dimension',
    label: 'Krull Dimension',
    title: 'Krull Dimension',
    kind: 'definition',
    tags: ['Commutative Algebra'],
    dependencies: ['prime-ideal', 'spectrum-of-a-ring'],
    description: String.raw`Krull dimension measures the "geometric dimension" of a ring by the longest chain of nested prime ideals it supports. A field has dimension $0$ (only one prime, $(0)$); $\mathbb{Z}$ and $F[x]$ have dimension $1$ (chains $(0) \subsetneq (p)$); the polynomial ring $F[x_1, \dots, x_n]$ has dimension $n$, matching the dimension of affine $n$-space. It is the algebraic counterpart of topological dimension on $\operatorname{Spec}$.`,
    definition: String.raw`The **Krull dimension** of a commutative ring $R$ is the supremum of the lengths $\ell$ of chains of prime ideals
$$\mathfrak{p}_0 \subsetneq \mathfrak{p}_1 \subsetneq \cdots \subsetneq \mathfrak{p}_\ell$$
in $R$ (a chain of length $\ell$ has $\ell + 1$ primes):
$$\dim R := \sup\{\,\ell : \exists\ \mathfrak{p}_0 \subsetneq \cdots \subsetneq \mathfrak{p}_\ell \text{ in } \operatorname{Spec} R\,\}.$$
Thus $\dim R = 0$ means every prime ideal is maximal, and $\dim R = 1$ (for a domain) means $(0)$ is prime and every nonzero prime is maximal.`,
  },
  {
    id: 'dedekind-domain',
    label: 'Dedekind Domain',
    title: 'Dedekind Domain',
    kind: 'definition',
    tags: ['Commutative Algebra'],
    dependencies: ['noetherian-ring', 'prime-ideal', 'integral-element', 'krull-dimension', 'integral-domain'],
    description: String.raw`A Dedekind domain is the ring in which unique factorization, lost for *elements*, is recovered for *ideals*: although a number like $6 = 2\cdot 3 = (1+\sqrt{-5})(1-\sqrt{-5})$ may factor several ways, every nonzero ideal factors uniquely into prime ideals. The rings of integers of number fields are the motivating example, which makes Dedekind domains the foundation of algebraic number theory. They are characterized by three clean conditions: Noetherian, integrally closed, and of dimension one.`,
    definition: String.raw`A **Dedekind domain** is an integral domain $R$ that is not a field and satisfies all three of:
1. $R$ is **Noetherian**;
2. $R$ is **integrally closed** in its field of fractions;
3. $R$ has **Krull dimension one** — every nonzero prime ideal is maximal.`,
    proof: String.raw`**Equivalent characterization: unique factorization of ideals.** A domain $R$ (not a field) is a Dedekind domain *if and only if* every nonzero proper ideal $I \subseteq R$ factors as a product of prime ideals,
$$I = \mathfrak{p}_1^{a_1} \cdots \mathfrak{p}_g^{a_g},$$
uniquely up to the order of the factors. This is the property relied on downstream (e.g. for rings of integers $\mathcal{O}_K$). *Proof sketch, citing the precise inputs.*

$(\Rightarrow)$ Assume (1)–(3). The key step is that in a Dedekind domain every nonzero ideal is **invertible**: defining $I^{-1} = \{x \in K : xI \subseteq R\}$ in the fraction field $K$, one shows $I\,I^{-1} = R$. Invertibility uses all three axioms — **Noetherian** to guarantee $I$ contains a product of nonzero primes and to run a maximal-counterexample argument, **dimension one** so that maximal and nonzero-prime coincide, and **integrally closed** to rule out $I^{-1} = R$ for a proper $I$ (otherwise an element of $\mathfrak{p}^{-1}\setminus R$ would be integral over $R$, contradicting normality). Granting invertibility, existence and uniqueness of the prime factorization follow by a Noetherian induction: a maximal ideal $\mathfrak{p} \supseteq I$ gives $I \subseteq \mathfrak{p}$, and $\mathfrak{p}^{-1}I$ is a strictly larger ideal whose factorization, multiplied by $\mathfrak{p}$, yields one for $I$; uniqueness comes from cancelling invertible prime factors using the **prime ideal** property.

$(\Leftarrow)$ Conversely, unique ideal factorization forces (1)–(3): every ideal is invertible hence finitely generated (Noetherian); a nonzero prime $\mathfrak{p}$ cannot sit strictly below another nonzero prime, for cancelling would give a contradiction with factorization, so dimension is one; and integral closedness follows because an element integral over $R$ generates a fractional ideal that, by unique factorization, must already lie in $R$. $\square$`,
  },
]

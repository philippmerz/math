import type { MathNode } from '../types'

export const CATEGORY_THEORY_NODES: MathNode[] = [
  {
    id: 'category',
    label: 'Category',
    title: 'Category',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['function-composition'],
    description: String.raw`Mathematics is full of structured objects together with the maps that respect that structure: sets and functions, groups and homomorphisms, spaces and continuous maps. A **category** abstracts exactly this pattern — a collection of objects, arrows (**morphisms**) between them, a way to compose arrows head-to-tail, and a "do-nothing" identity arrow on each object — subject to the rules that composition is associative and the identities act as units. The decisive move is to forget the internal makeup of objects and study them solely through their arrows; element-free, this language transfers verbatim from one area to the next.`,
    definition: String.raw`A **category** $C$ consists of:
- a class of **objects** $\operatorname{ob}(C)$;
- for each ordered pair $(A, B)$ of objects, a class $\operatorname{Hom}_C(A, B)$ of **morphisms** from $A$ to $B$, written $f : A \to B$, with the hom-classes pairwise disjoint (so each $f$ has a well-defined **domain** and **codomain**);
- for each triple $(A, B, C)$ a **composition** $\circ : \operatorname{Hom}_C(B, C) \times \operatorname{Hom}_C(A, B) \to \operatorname{Hom}_C(A, C)$, $(g, f) \mapsto g \circ f$;
- for each object $A$ an **identity** morphism $\mathrm{id}_A \in \operatorname{Hom}_C(A, A)$,

satisfying, whenever the composites are defined,
$$h \circ (g \circ f) = (h \circ g) \circ f \quad\text{(associativity)}, \qquad \mathrm{id}_B \circ f = f = f \circ \mathrm{id}_A \quad (f : A \to B).$$
A category is **small** when its objects and morphisms form sets, and **locally small** when each $\operatorname{Hom}_C(A, B)$ is a set. The leading example is $\mathbf{Set}$, with sets as objects, functions as morphisms, ordinary **composition of functions**, and the **identity functions** as units.`,
    proof: String.raw`**The identity on each object is unique.** Suppose $i_A$ and $i_A'$ both serve as identities on $A$ — that is, each satisfies the unit law $\mathrm{id} \circ f = f$ and $g \circ \mathrm{id} = g$ for all composable $f, g$. Then, composing the two, the right-unit law for $i_A'$ gives $i_A \circ i_A' = i_A$, while the left-unit law for $i_A$ gives $i_A \circ i_A' = i_A'$. Hence $i_A = i_A'$. The symbol $\mathrm{id}_A$ is therefore unambiguous. (That $\mathbf{Set}$ is a category is precisely the content of **function-composition**: composition there is associative with the identity functions as units.) $\square$`,
  },
  {
    id: 'functor',
    label: 'Functor',
    title: 'Functor',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['category', 'opposite-category'],
    description: String.raw`If categories are the worlds, **functors** are the maps between worlds. A functor carries the objects and arrows of one category to those of another while respecting the categorical structure — it sends identities to identities and composites to composites, so any commuting diagram is sent to a commuting diagram. Functors let constructions in one area be transported to another: the fundamental group $\pi_1 : \mathbf{Top}_* \to \mathbf{Grp}$ turns pointed spaces into groups and continuous maps into homomorphisms, converting topology into algebra.`,
    definition: String.raw`A **(covariant) functor** $F : C \to D$ assigns to each object $A$ of $C$ an object $F(A)$ of $D$, and to each morphism $f : A \to B$ of $C$ a morphism $F(f) : F(A) \to F(B)$ of $D$, such that
$$F(\mathrm{id}_A) = \mathrm{id}_{F(A)}, \qquad F(g \circ f) = F(g) \circ F(f)$$
for all objects $A$ and composable morphisms $f, g$. A **contravariant** functor $C \to D$ is a covariant functor $C^{\mathrm{op}} \to D$: it reverses arrows, $F(f) : F(B) \to F(A)$, and $F(g \circ f) = F(f) \circ F(g)$. The composite of functors and the **identity functor** $\mathrm{id}_C$ make categories themselves the objects of a category.`,
  },
  {
    id: 'natural-transformation',
    label: 'Natural Transformation',
    title: 'Natural Transformation',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['functor'],
    description: String.raw`Once functors are maps between categories, the next question is what a map *between functors* should be. A **natural transformation** is a family of morphisms — one component at each object — that intertwines the two functors uniformly: it does not matter whether you first apply a morphism and then transform, or transform and then apply. This "naturality" is the precise formalization of a construction being *canonical*, free of arbitrary choices. Natural transformations are the 2-cells that make the functors $C \to D$ into a category in their own right.`,
    definition: String.raw`Let $F, G : C \to D$ be functors. A **natural transformation** $\eta : F \Rightarrow G$ is a family of morphisms $\eta_A : F(A) \to G(A)$ in $D$, indexed by the objects $A$ of $C$, such that for every morphism $f : A \to B$ in $C$ the **naturality square** commutes:
$$G(f) \circ \eta_A = \eta_B \circ F(f).$$
It is a **natural isomorphism** when every component $\eta_A$ is an isomorphism (a morphism with a two-sided inverse). The natural transformations $F \Rightarrow G$, composed componentwise, are the morphisms of the **functor category** $[C, D] = D^C$ (when $C$ is small, this is a genuine category), whose objects are the functors $C \to D$.`,
  },
  {
    id: 'opposite-category',
    label: 'Opposite & Duality',
    title: 'Opposite Category & Duality',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['category'],
    description: String.raw`Every categorical statement has a mirror image, obtained by reversing all the arrows. The **opposite category** $C^{\mathrm{op}}$ makes this precise: it has the same objects but turns each morphism $A \to B$ around into a morphism $B \to A$, and reverses the order of composition. Because the axioms of a category are symmetric under arrow-reversal, $C^{\mathrm{op}}$ is again a category, and any theorem proved for all categories applies to the opposites too. Reading a notion in $C^{\mathrm{op}}$ yields its **dual**: products dualize to coproducts, limits to colimits, monomorphisms to epimorphisms. Duality halves the work of the subject.`,
    definition: String.raw`The **opposite** (or **dual**) category $C^{\mathrm{op}}$ of a category $C$ has the same objects as $C$, and morphisms $\operatorname{Hom}_{C^{\mathrm{op}}}(A, B) = \operatorname{Hom}_C(B, A)$. Composition in $C^{\mathrm{op}}$, written $\bullet$, is the composition of $C$ in the reversed order: for $f \in \operatorname{Hom}_{C^{\mathrm{op}}}(A, B)$ and $g \in \operatorname{Hom}_{C^{\mathrm{op}}}(B, E)$,
$$g \bullet f := f \circ g \in \operatorname{Hom}_{C^{\mathrm{op}}}(A, E),$$
where $f \circ g$ is the composite in $C$ (legal since $f \in \operatorname{Hom}_C(B, A)$ and $g \in \operatorname{Hom}_C(E, B)$). The identities are unchanged. The **dual** of any statement $P$ is the statement obtained by interpreting $P$ in $C^{\mathrm{op}}$, i.e. reversing every arrow and the order of every composite.`,
    proof: String.raw`**$C^{\mathrm{op}}$ is a category.** The data are well-typed: $g \bullet f$ has the asserted domain and codomain. *Associativity:* for opposite-composable $f, g, h$, using the definition twice and associativity in $C$,
$$h \bullet (g \bullet f) = h \bullet (f \circ g) = (f \circ g) \circ h = f \circ (g \circ h) = (g \circ h) \bullet f = (h \bullet g) \bullet f.$$
*Units:* for $f \in \operatorname{Hom}_{C^{\mathrm{op}}}(A, B) = \operatorname{Hom}_C(B, A)$ we have $\mathrm{id}_B \bullet f = f \circ \mathrm{id}_B = f$ and $f \bullet \mathrm{id}_A = \mathrm{id}_A \circ f = f$, the unit laws of $C$. So $C^{\mathrm{op}}$ satisfies the axioms of **category**. Finally $(C^{\mathrm{op}})^{\mathrm{op}} = C$, since reversing twice restores domains, codomains, and the original order of composition — which is why dualizing a true statement again yields a true statement. $\square$`,
  },
  {
    id: 'monomorphism-epimorphism',
    label: 'Mono- & Epimorphism',
    title: 'Monomorphism & Epimorphism',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['category', 'opposite-category'],
    description: String.raw`Injectivity and surjectivity are defined using elements, which a general category does not have. **Monomorphisms** and **epimorphisms** capture the same idea purely through composition: a monomorphism is *left-cancellable* (it can be cancelled from the left of an equation of morphisms), an epimorphism *right-cancellable*. The two notions are exactly dual — an epimorphism in $C$ is a monomorphism in $C^{\mathrm{op}}$ — and in $\mathbf{Set}$ they recover precisely the injections and the surjections.`,
    definition: String.raw`A morphism $m : A \to B$ in a category $C$ is a **monomorphism** (monic) when it is left-cancellable: for every object $X$ and all $f, g : X \to A$,
$$m \circ f = m \circ g \;\Longrightarrow\; f = g.$$
A morphism $e : A \to B$ is an **epimorphism** (epic) when it is right-cancellable: for all $h, k : B \to Y$, $\;h \circ e = k \circ e \Rightarrow h = k$. By the definition of the **opposite category**, $e$ is an epimorphism in $C$ iff $e$ is a monomorphism in $C^{\mathrm{op}}$ — the two notions are dual.`,
    proof: String.raw`**In $\mathbf{Set}$, monomorphisms are exactly the injections.** Let $m : A \to B$ be a function.

($\Leftarrow$) Suppose $m$ is injective and $m \circ f = m \circ g$ for functions $f, g : X \to A$. For each $x \in X$, $m(f(x)) = m(g(x))$, and injectivity gives $f(x) = g(x)$; so $f = g$, and $m$ is monic.

($\Rightarrow$) Suppose $m$ is monic. Let $a, a' \in A$ with $m(a) = m(a')$. Take $X$ a one-point set $\{*\}$ and define $f, g : X \to A$ by $f(*) = a$, $g(*) = a'$. Then $m \circ f$ and $m \circ g$ both send $*$ to $m(a) = m(a')$, so $m \circ f = m \circ g$; cancellation gives $f = g$, i.e. $a = a'$. Hence $m$ is injective.

**In $\mathbf{Set}$, epimorphisms are exactly the surjections.** Let $e : A \to B$ be a function. This cannot be obtained by dualizing the monomorphism case: duality only relates epimorphisms in $\mathbf{Set}$ to monomorphisms in $\mathbf{Set}^{\mathrm{op}}$, which is not $\mathbf{Set}$, so the claim needs its own argument.

($\Leftarrow$) Suppose $e$ is surjective and $h \circ e = k \circ e$ for functions $h, k : B \to Y$. Given any $b \in B$, surjectivity provides $a \in A$ with $e(a) = b$, so $h(b) = h(e(a)) = k(e(a)) = k(b)$; thus $h = k$, and $e$ is epic.

($\Rightarrow$) Suppose $e$ is epic. Take $Y = \{0, 1\}$, let $h : B \to Y$ be the characteristic function of the image $\operatorname{im}(e)$ (so $h(b) = 1$ iff $b \in \operatorname{im}(e)$), and let $k : B \to Y$ be the constant map $1$. For every $a \in A$ we have $e(a) \in \operatorname{im}(e)$, so $h(e(a)) = 1 = k(e(a))$; hence $h \circ e = k \circ e$. Cancellation gives $h = k$, which forces $h(b) = 1$ for all $b \in B$, i.e. $\operatorname{im}(e) = B$. Thus $e$ is surjective. (The coincidence of epic and surjective is special to $\mathbf{Set}$: in $\mathbf{Ring}$ the inclusion $\mathbb{Z} \hookrightarrow \mathbb{Q}$ is epic but not surjective.) $\square$`,
  },
  {
    id: 'initial-terminal-object',
    label: 'Initial & Terminal',
    title: 'Initial & Terminal Objects',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['category', 'opposite-category'],
    description: String.raw`Some objects are distinguished not by what they contain but by how everything else relates to them. An **initial object** has exactly one arrow *to* every object; a **terminal object** has exactly one arrow *from* every object. In $\mathbf{Set}$ the empty set is initial (the empty function is the unique map out of it) and any singleton is terminal. The two notions are dual. Their fundamental feature — the prototype for all universal properties — is that such an object is unique up to a *unique* isomorphism: the maps mandated by the property pin the object down completely.`,
    definition: String.raw`An object $0$ of a category $C$ is **initial** when for every object $X$ there is exactly one morphism $0 \to X$. An object $1$ is **terminal** when for every object $X$ there is exactly one morphism $X \to 1$. Terminal in $C$ is the same as initial in $C^{\mathrm{op}}$, so the two notions are dual. An object that is both initial and terminal is a **zero object**.`,
    proof: String.raw`**An initial object is unique up to a unique isomorphism.** Let $0$ and $0'$ both be initial. Initiality of $0$ gives a unique morphism $u : 0 \to 0'$; initiality of $0'$ gives a unique $v : 0' \to 0$. Then $v \circ u : 0 \to 0$ is a morphism, but initiality of $0$ says $\operatorname{Hom}(0, 0)$ has exactly one element, which must be $\mathrm{id}_0$; hence $v \circ u = \mathrm{id}_0$. Symmetrically $u \circ v = \mathrm{id}_{0'}$. So $u$ is an isomorphism, and it is the *only* morphism $0 \to 0'$, hence the unique isomorphism between them. Dualizing in $C^{\mathrm{op}}$ via **opposite-category** gives the same for terminal objects. $\square$`,
  },
  {
    id: 'universal-property',
    label: 'Universal Property',
    title: 'Universal Property',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['initial-terminal-object', 'functor'],
    description: String.raw`A **universal property** characterizes an object by its relationships rather than its internal construction: it specifies a configuration of arrows and asks for the "best" or "most efficient" object fitting that configuration, where "best" means initial or terminal among all candidates. Because initial and terminal objects are unique up to unique isomorphism, an object satisfying a universal property is determined by it — the property *is* the definition, independent of any particular construction. Free groups, quotients, products, tensor products, and limits are all specified this way.`,
    definition: String.raw`A **universal property** for an object $U$ presents $U$ as the **initial** (or, dually, **terminal**) object of an auxiliary **category of candidates**, whose objects are configurations of the relevant shape and whose morphisms are arrows of $C$ compatible with those configurations. Concretely, a universal arrow from an object $X$ to a functor $G : D \to C$ is a pair $(U, \eta)$ with $\eta : X \to G(U)$ such that every $f : X \to G(Y)$ factors as $f = G(\bar f) \circ \eta$ for a *unique* $\bar f : U \to Y$ — exactly an initial object in the comma category $(X \downarrow G)$. Since an initial object is unique up to a unique isomorphism (by **initial-terminal-object**), any two objects satisfying the same universal property are canonically isomorphic.`,
  },
  {
    id: 'product-coproduct',
    label: 'Product & Coproduct',
    title: 'Product & Coproduct',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['universal-property'],
    description: String.raw`The **product** of two objects $A$ and $B$ is the universal object equipped with projections to each factor: any object mapping to both $A$ and $B$ does so in a unique way through the product. This single description specializes to the cartesian product of sets, the direct product of groups, and the product topology of spaces. The **coproduct** is the exact dual, with arrows reversed: it carries injections *from* the factors and is universal for maps *out*. In $\mathbf{Set}$ the coproduct is the disjoint union; in $\mathbf{Grp}$, the free product; in abelian groups, the direct sum.`,
    definition: String.raw`A **product** of objects $A, B$ in a category $C$ is an object $A \times B$ together with morphisms $\pi_A : A \times B \to A$ and $\pi_B : A \times B \to B$ (the **projections**) such that for every object $X$ with morphisms $f : X \to A$ and $g : X \to B$ there is a *unique* morphism $\langle f, g\rangle : X \to A \times B$ with
$$\pi_A \circ \langle f, g\rangle = f, \qquad \pi_B \circ \langle f, g\rangle = g.$$
This is the **universal property** of the product. A **coproduct** $A \sqcup B$ is the dual: an object with **injections** $\iota_A : A \to A \sqcup B$, $\iota_B : B \to A \sqcup B$ such that for every $X$ with $f : A \to X$, $g : B \to X$ there is a unique $[f, g] : A \sqcup B \to X$ satisfying $[f, g] \circ \iota_A = f$ and $[f, g] \circ \iota_B = g$.`,
    proof: String.raw`**A product, when it exists, is unique up to a unique isomorphism compatible with the projections.** Let $(P, \pi_A, \pi_B)$ and $(P', \pi_A', \pi_B')$ both be products of $A, B$. Applying the universal property of $P$ to the pair $(\pi_A', \pi_B')$ yields a unique $u : P' \to P$ with $\pi_A \circ u = \pi_A'$, $\pi_B \circ u = \pi_B'$; symmetrically a unique $v : P \to P'$ with $\pi_A' \circ v = \pi_A$, $\pi_B' \circ v = \pi_B$. Then $u \circ v : P \to P$ satisfies $\pi_A \circ (u \circ v) = \pi_A$ and $\pi_B \circ (u \circ v) = \pi_B$. But $\mathrm{id}_P$ also satisfies these, and the universal property asserts the mediating morphism is *unique*, so $u \circ v = \mathrm{id}_P$; symmetrically $v \circ u = \mathrm{id}_{P'}$. Thus $u$ is an isomorphism intertwining the projections, and uniqueness of mediating morphisms makes it the only such. This is exactly the uniqueness guaranteed by **universal-property**. The coproduct statement is the dual, read off in $C^{\mathrm{op}}$. $\square$`,
  },
  {
    id: 'limit-colimit',
    label: 'Limit & Colimit',
    title: 'Limit & Colimit',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['functor', 'natural-transformation', 'universal-property', 'initial-terminal-object'],
    description: String.raw`Products and coproducts are the simplest of a unified construction. A **diagram** in $C$ is a functor from a small index category, and a **limit** is the universal object mapping compatibly into the whole diagram — a "best approximation from above." Limits subsume products (over a discrete index), equalizers, and pullbacks; their duals, **colimits**, subsume coproducts, coequalizers, and pushouts. A category having all small limits is **complete**, one having all small colimits **cocomplete**; $\mathbf{Set}$ is both.`,
    definition: String.raw`Let $J$ be a small category and $D : J \to C$ a functor (a **diagram** of shape $J$). A **cone** over $D$ with apex $X$ is a family of morphisms $\lambda_j : X \to D(j)$, one per object $j$ of $J$, such that $D(u) \circ \lambda_j = \lambda_k$ for every morphism $u : j \to k$ of $J$ (equivalently, a natural transformation from the constant functor $\Delta_X$ to $D$). A **limit** of $D$ is a cone $(L, (\mu_j))$ that is **terminal** among cones: for every cone $(X, (\lambda_j))$ there is a *unique* morphism $h : X \to L$ with $\mu_j \circ h = \lambda_j$ for all $j$. A **colimit** is the dual — an initial **cocone** under $D$, i.e. a limit in $C^{\mathrm{op}}$. $C$ is **complete** if every diagram from a small $J$ has a limit, and **cocomplete** if every such diagram has a colimit.`,
    proof: String.raw`**A limit is unique up to a unique cone-isomorphism.** Cones over $D$ with their cone-morphisms (morphisms of apices commuting with the legs) form a category, and by definition a limit is a *terminal* object of it. By **initial-terminal-object** a terminal object is unique up to a unique isomorphism; transporting that statement to this category of cones (via **universal-property**) gives the claim. The colimit case is the dual, being terminal in the cocone category of $C^{\mathrm{op}}$. $\square$`,
  },
  {
    id: 'representable-functor',
    label: 'Representable Functor',
    title: 'Representable Functor',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['natural-transformation'],
    description: String.raw`Each object $A$ of a (locally small) category gives a functor that records the maps out of $A$: it sends an object $X$ to the set $\operatorname{Hom}(A, X)$ and a morphism to post-composition. A functor to $\mathbf{Set}$ is **representable** when it is naturally isomorphic to such a **hom-functor**. Representability says the functor's values are completely governed by maps out of a single **representing object**, which is then determined up to unique isomorphism — the idea standing behind universal properties and the Yoneda lemma.`,
    definition: String.raw`Let $C$ be locally small. For an object $A$, the **covariant hom-functor** $h^A = \operatorname{Hom}_C(A, -) : C \to \mathbf{Set}$ sends each object $X$ to the set $\operatorname{Hom}_C(A, X)$ and each morphism $g : X \to Y$ to post-composition
$$\operatorname{Hom}_C(A, g) : \operatorname{Hom}_C(A, X) \to \operatorname{Hom}_C(A, Y), \qquad p \mapsto g \circ p.$$
(Functoriality is immediate: $\operatorname{Hom}(A, \mathrm{id}_X)$ is the identity, and post-composing by $g' \circ g$ equals post-composing by $g$ then by $g'$, by associativity.) A functor $F : C \to \mathbf{Set}$ is **representable** when there is an object $A$ and a natural isomorphism $F \cong h^A$; $A$ is a **representing object**. Dually, $h_A = \operatorname{Hom}_C(-, A) : C^{\mathrm{op}} \to \mathbf{Set}$ uses pre-composition, and represents contravariant set-valued functors.`,
  },
  {
    id: 'yoneda-lemma',
    label: 'Yoneda Lemma',
    title: 'Yoneda Lemma',
    kind: 'theorem',
    tags: ['Category Theory'],
    dependencies: ['representable-functor', 'full-faithful-functor'],
    description: String.raw`The **Yoneda lemma** is the central structural fact of category theory. It says that the natural transformations from a hom-functor $\operatorname{Hom}(A, -)$ into any set-valued functor $F$ are in bijection with the *elements* of $F(A)$ — and this bijection is itself natural. The transformation is recovered from a single element $u \in F(A)$ by transporting $u$ along each morphism out of $A$. A first consequence is that the **Yoneda embedding** $A \mapsto \operatorname{Hom}(A, -)$ is full and faithful, so an object is completely determined, up to isomorphism, by its entire web of incoming or outgoing morphisms.`,
    statement: String.raw`Let $C$ be locally small, $A$ an object of $C$, and $F : C \to \mathbf{Set}$ a functor. Then the map
$$\Phi : \operatorname{Nat}\bigl(\operatorname{Hom}_C(A, -),\, F\bigr) \longrightarrow F(A), \qquad \Phi(\eta) = \eta_A(\mathrm{id}_A),$$
is a bijection, natural in both $A$ and $F$. Consequently the **Yoneda embedding** $\mathbf{y} : C^{\mathrm{op}} \to [C, \mathbf{Set}]$, $A \mapsto \operatorname{Hom}_C(A, -)$, is full and faithful.`,
    proof: String.raw`Write $h^A = \operatorname{Hom}_C(A, -)$, defined in **representable-functor**.

*Construction of an inverse.* For $u \in F(A)$ define a family $\Psi(u)$ with components, for each object $X$,
$$\Psi(u)_X : \operatorname{Hom}_C(A, X) \to F(X), \qquad \Psi(u)_X(p) = F(p)(u).$$
This is natural: for $g : X \to Y$ and $p : A \to X$, naturality requires $F(g)\bigl(\Psi(u)_X(p)\bigr) = \Psi(u)_Y(h^A(g)(p))$. The left side is $F(g)(F(p)(u)) = F(g \circ p)(u)$ by functoriality of $F$, and the right side is $F(g \circ p)(u)$ since $h^A(g)(p) = g \circ p$. So $\Psi(u) \in \operatorname{Nat}(h^A, F)$.

*$\Phi$ and $\Psi$ are mutually inverse.* First, $\Phi(\Psi(u)) = \Psi(u)_A(\mathrm{id}_A) = F(\mathrm{id}_A)(u) = \mathrm{id}_{F(A)}(u) = u$, using $F(\mathrm{id}_A) = \mathrm{id}_{F(A)}$. Conversely, let $\eta : h^A \Rightarrow F$ and put $u = \Phi(\eta) = \eta_A(\mathrm{id}_A)$; we must show $\Psi(u) = \eta$, i.e. $\eta_X(p) = F(p)(u)$ for every $p : A \to X$. Apply the naturality square of $\eta$ to the morphism $p : A \to X$: it states $\eta_X \circ h^A(p) = F(p) \circ \eta_A$ as maps $\operatorname{Hom}_C(A, A) \to F(X)$. Evaluate both sides at $\mathrm{id}_A \in \operatorname{Hom}_C(A, A)$: the left gives $\eta_X(p \circ \mathrm{id}_A) = \eta_X(p)$, the right gives $F(p)(\eta_A(\mathrm{id}_A)) = F(p)(u)$. Hence $\eta_X(p) = F(p)(u)$, so $\Psi(u) = \eta$. Thus $\Phi$ is a bijection with inverse $\Psi$.

*Naturality* in $F$ and $A$ is the routine check that both sides transform compatibly under natural transformations $F \Rightarrow F'$ and morphisms $A \to A'$ (both reduce, via functoriality, to applying the relevant map to the chosen element); we omit the diagram.

*Full and faithful embedding.* Taking $F = h^B = \operatorname{Hom}_C(B, -)$, the lemma gives a bijection
$$\operatorname{Nat}(h^A, h^B) \;\cong\; h^B(A) = \operatorname{Hom}_C(B, A) = \operatorname{Hom}_{C^{\mathrm{op}}}(A, B),$$
which is exactly the action of $\mathbf{y}$ on hom-sets; being a bijection, $\mathbf{y}$ is full and faithful. Faithfulness forces an object to be determined up to isomorphism by its hom-functor: if $h^A \cong h^B$ as functors, then chasing the iso and its inverse back through this bijection produces mutually inverse morphisms between $A$ and $B$, so $A \cong B$. $\square$`,
  },
  {
    id: 'adjunction',
    label: 'Adjunction',
    title: 'Adjoint Functors',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['natural-transformation', 'representable-functor'],
    description: String.raw`An **adjunction** is a precise, two-sided correspondence between two functors going in opposite directions. The left adjoint $F$ provides the "freest" or "most efficient" solution to the problem posed by the right adjoint $G$: maps out of a free construction $F(A)$ correspond exactly to maps out of $A$ into the underlying object $G(B)$. Free–forgetful pairs, the product–diagonal and exponential adjunctions, and the description of limits and colimits as adjoints to the diagonal are all instances. Adjunctions are arguably the organizing concept of the entire subject.`,
    definition: String.raw`Functors $F : C \to D$ and $G : D \to C$ form an **adjunction** $F \dashv G$ ($F$ **left adjoint** to $G$) when there is a bijection
$$\Phi_{A, B} : \operatorname{Hom}_D(F(A), B) \;\xrightarrow{\ \sim\ }\; \operatorname{Hom}_C(A, G(B)),$$
natural in $A \in C$ and $B \in D$ — that is, $\Phi$ is a natural isomorphism between the two functors $C^{\mathrm{op}} \times D \to \mathbf{Set}$ given by $(A, B) \mapsto \operatorname{Hom}_D(F(A), B)$ and $(A, B) \mapsto \operatorname{Hom}_C(A, G(B))$. Equivalently, an adjunction is given by a **unit** $\eta : \mathrm{id}_C \Rightarrow G F$ and **counit** $\varepsilon : F G \Rightarrow \mathrm{id}_D$ satisfying the **triangle identities** $\varepsilon F \circ F\eta = \mathrm{id}_F$ and $G\varepsilon \circ \eta G = \mathrm{id}_G$. The naturality of $\Phi$ says each $G(B)$ **represents** the functor $A \mapsto \operatorname{Hom}_D(F(A), B)$.`,
  },
  {
    id: 'monad',
    label: 'Monad',
    title: 'Monad',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['adjunction'],
    description: String.raw`A **monad** packages the algebraic essence of an adjunction into a single endofunctor with two structure maps. Think of $T(A)$ as "formal expressions built from $A$": the **unit** $\eta$ embeds an element as a trivial expression, and the **multiplication** $\mu$ flattens an expression-of-expressions into one expression, the associativity and unit laws ensuring this flattening is coherent. Every adjunction $F \dashv G$ yields the monad $T = GF$. Monads encode algebraic theories (groups, rings, modules) and, in functional programming, model effects like state, exceptions, and input/output.`,
    definition: String.raw`A **monad** on a category $C$ is an endofunctor $T : C \to C$ together with natural transformations $\eta : \mathrm{id}_C \Rightarrow T$ (**unit**) and $\mu : T^2 \Rightarrow T$ (**multiplication**) making the following diagrams commute, as identities of natural transformations:
$$\mu \circ T\mu = \mu \circ \mu T \quad\text{(associativity)}, \qquad \mu \circ T\eta = \mathrm{id}_T = \mu \circ \eta T \quad\text{(unit laws)}.$$
Here $T\mu, \mu T : T^3 \Rightarrow T^2$ and $T\eta, \eta T : T \Rightarrow T^2$ are whiskerings. Equivalently, $(T, \eta, \mu)$ is a **monoid** in the strict monoidal category $([C, C], \circ, \mathrm{id}_C)$ of endofunctors of $C$, with composition as the tensor product. Every **adjunction** $F \dashv G$ with unit $\eta$ and counit $\varepsilon$ gives a monad $T = G F$, $\,\mu = G \varepsilon F$.`,
  },
  {
    id: 'full-faithful-functor',
    label: 'Full & Faithful',
    title: 'Full and Faithful Functors',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['functor'],
    description: String.raw`A functor acts not only on objects but on each hom-set, $f \mapsto F(f)$. The two basic conditions on this action are **faithfulness** (the action is injective on each hom-set — the functor forgets no distinctions between parallel morphisms) and **fullness** (the action is surjective onto each hom-set — every morphism between images comes from one below). A functor that is **fully faithful** identifies the morphisms of the source with those between the images, so it embeds the source as a full subcategory up to isomorphism. These notions are what the Yoneda embedding satisfies and what an equivalence requires.`,
    definition: String.raw`A functor $F : C \to D$ is **faithful** when for all objects $A, B$ the map $F : \operatorname{Hom}_C(A, B) \to \operatorname{Hom}_D(F(A), F(B))$ is injective; **full** when each such map is surjective; and **fully faithful** when each is a bijection. $F$ is **essentially surjective** when every object of $D$ is isomorphic to $F(A)$ for some object $A$ of $C$.`,
    proof: String.raw`**A fully faithful functor reflects isomorphisms.** Suppose $F$ is fully faithful and $f : A \to B$ in $C$ has $F(f)$ an isomorphism in $D$, with inverse $k : F(B) \to F(A)$. By fullness, $k = F(g)$ for some $g : B \to A$; by faithfulness applied to the equalities $F(g \circ f) = F(g) \circ F(f) = k \circ F(f) = \mathrm{id}_{F(A)} = F(\mathrm{id}_A)$ we get $g \circ f = \mathrm{id}_A$, and symmetrically from $F(f \circ g) = F(f) \circ F(g) = \mathrm{id}_{F(B)} = F(\mathrm{id}_B)$ we get $f \circ g = \mathrm{id}_B$. Hence $f$ is an isomorphism. $\square$`,
  },
  {
    id: 'equivalence-of-categories',
    label: 'Equivalence',
    title: 'Equivalence of Categories',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['natural-transformation', 'full-faithful-functor'],
    description: String.raw`Isomorphism of categories — a functor with a strict two-sided inverse — is too rigid, because in practice objects should only need to correspond *up to isomorphism*, not on the nose. **Equivalence of categories** is the right relaxation: a functor with a quasi-inverse whose composites are *naturally isomorphic* to the identities, rather than equal to them. Equivalent categories share every categorical property. A clean and constantly used characterization: a functor is part of an equivalence exactly when it is fully faithful and essentially surjective.`,
    definition: String.raw`An **equivalence of categories** is a functor $F : C \to D$ for which there exist a functor $G : D \to C$ (a **quasi-inverse**) and natural isomorphisms $\eta : \mathrm{id}_C \xRightarrow{\ \sim\ } G F$ and $\varepsilon : F G \xRightarrow{\ \sim\ } \mathrm{id}_D$. Categories $C, D$ are **equivalent**, $C \simeq D$, when such an $F$ exists. A standard theorem (whose converse direction uses a choice of one isomorphism per object) states that $F$ is an equivalence if and only if it is **fully faithful** and **essentially surjective** in the sense of **full-faithful-functor**.`,
  },
  {
    id: 'cartesian-closed-category',
    label: 'Cartesian Closed',
    title: 'Cartesian Closed Category',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['product-coproduct', 'adjunction', 'initial-terminal-object'],
    description: String.raw`A **cartesian closed category** is one where not only do products exist, but the collection of morphisms between two objects is *itself* an object — the **exponential** $C^A$, an internal "function space." The defining adjunction is *currying*: a morphism from $B \times A$ to $C$ is the same as a morphism from $B$ to $C^A$. These categories are exactly the models of the simply typed lambda calculus, making them the categorical home of functional computation and, through Curry–Howard, of intuitionistic proof.`,
    definition: String.raw`A category $\mathcal{C}$ is **cartesian closed** when it has a **terminal object** $1$, binary **products** $A \times B$, and, for each pair of objects $A, C$, an **exponential** object $C^A$ together with an **evaluation** morphism $\mathrm{ev} : C^A \times A \to C$ such that, for each object $A$, the functor $- \times A : \mathcal{C} \to \mathcal{C}$ has $(-)^A$ as right adjoint:
$$\operatorname{Hom}_{\mathcal{C}}(B \times A,\, C) \;\cong\; \operatorname{Hom}_{\mathcal{C}}(B,\, C^A),$$
naturally in $B$ and $C$. Concretely, every $f : B \times A \to C$ factors as $f = \mathrm{ev} \circ (\bar f \times \mathrm{id}_A)$ for a *unique* **transpose** $\bar f : B \to C^A$.`,
  },
  {
    id: 'topos',
    label: 'Topos',
    title: 'Topos',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['cartesian-closed-category', 'limit-colimit', 'monomorphism-epimorphism'],
    description: String.raw`An **(elementary) topos** is a category that behaves like the category of sets while being vastly more general. On top of being cartesian closed with all finite limits, it has a **subobject classifier** $\Omega$: an object of "truth values" such that the subobjects of any object correspond exactly to morphisms into $\Omega$, internalizing the idea of a characteristic function. Toposes carry their own internal (intuitionistic) logic and unify sheaf theory, algebraic geometry, and models of set theory; the category of sheaves on a space is the motivating example.`,
    definition: String.raw`An **elementary topos** is a category $\mathcal{E}$ that is **cartesian closed**, has all finite **limits**, and possesses a **subobject classifier**: an object $\Omega$ with a morphism $\mathrm{true} : 1 \to \Omega$ (from the terminal object) such that for every **monomorphism** $m : S \hookrightarrow A$ there is a *unique* **characteristic** morphism $\chi_m : A \to \Omega$ making
$$\begin{array}{ccc} S & \to & 1 \\ \downarrow{\scriptstyle m} & & \downarrow{\scriptstyle \mathrm{true}} \\ A & \xrightarrow{\ \chi_m\ } & \Omega \end{array}$$
a **pullback** square. Thus subobjects of $A$ correspond bijectively to morphisms $A \to \Omega$. In $\mathbf{Set}$, $\Omega = \{\,\mathrm{false}, \mathrm{true}\,\}$ and $\chi_m$ is the indicator function of the subset.`,
  },
  {
    id: 'zero-object',
    label: 'Zero Object',
    title: 'Zero Object & Zero Morphisms',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['initial-terminal-object'],
    description: String.raw`In categories of algebraic objects there is a single object that is both the smallest (initial) and the largest (terminal) — the trivial group, the zero module, the one-point pointed set. Such a **zero object** lets one speak of the **zero morphism** between any two objects: the unique map that factors through the zero object. Zero objects and zero morphisms are the bare minimum needed to formulate kernels, cokernels, and exact sequences abstractly.`,
    definition: String.raw`A **zero object** in a category $C$ is an object $0$ that is both **initial** and **terminal**. When $C$ has a zero object, the **zero morphism** $0_{A,B} : A \to B$ between any objects $A, B$ is the composite $A \to 0 \to B$ of the unique morphisms to and from $0$.`,
    proof: String.raw`**The zero morphism is well-defined and absorbed by composition.** Since $0$ is terminal there is a unique $!_A : A \to 0$, and since $0$ is initial a unique $i_B : 0 \to B$, so $0_{A,B} := i_B \circ !_A$ is canonically determined. For any $g : B \to E$, $\,g \circ 0_{A,B} = g \circ i_B \circ {!_A}$; but $g \circ i_B : 0 \to E$ and $i_E : 0 \to E$ are both morphisms out of the initial object $0$, hence equal, giving $g \circ 0_{A,B} = i_E \circ {!_A} = 0_{A,E}$. Dually, precomposing a zero morphism with any morphism yields a zero morphism, using uniqueness of maps into the terminal $0$ (via **initial-terminal-object**). $\square$`,
  },
  {
    id: 'kernel-cokernel',
    label: 'Kernel & Cokernel',
    title: 'Categorical Kernel & Cokernel',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['zero-object', 'limit-colimit', 'monomorphism-epimorphism'],
    description: String.raw`In a category with a zero object, the **kernel** of a morphism is its universal "vanishing locus" — the most general object that the morphism sends to zero — and the **cokernel** is the dual, the universal quotient killing the image. These generalize the kernel and image of a linear map or group homomorphism, but defined purely by a universal property rather than by elements. Kernels are equalizers with the zero morphism; cokernels, coequalizers — both special limits and colimits. They are the raw material of homological algebra.`,
    definition: String.raw`Let $C$ have a **zero object** and let $f : A \to B$. A **kernel** of $f$ is a morphism $k : K \to A$ with $f \circ k = 0_{K,B}$ that is **universal** with this property: for every $g : X \to A$ with $f \circ g = 0_{X,B}$ there is a *unique* $\bar g : X \to K$ with $k \circ \bar g = g$. Equivalently, $K$ is the **limit** (equalizer) of the pair $f, 0_{A,B} : A \rightrightarrows B$. A **cokernel** of $f$ is the dual: a morphism $c : B \to Q$ with $c \circ f = 0_{A,Q}$ universal among morphisms out of $B$ killing $f$ — the **colimit** (coequalizer) of $f, 0_{A,B}$.`,
    proof: String.raw`**A kernel is a monomorphism, unique up to unique isomorphism.** Let $k : K \to A$ be a kernel of $f$. Uniqueness up to a unique isomorphism is the general uniqueness of limits from **limit-colimit** (a kernel is the equalizer of $f$ and $0_{A,B}$). That $k$ is monic: suppose $k \circ p = k \circ q$ for $p, q : X \to K$. Setting $g := k \circ p = k \circ q$, we have $f \circ g = f \circ k \circ p = 0_{K,B} \circ p = 0_{X,B}$ (using that the zero morphism is absorbed under precomposition, from **zero-object**). So $g$ factors uniquely through the kernel as some $\bar g : X \to K$ with $k \circ \bar g = g$; but both $p$ and $q$ are such factorizations, so by the uniqueness clause $p = \bar g = q$. Hence $k$ is a **monomorphism**. The cokernel statements are dual. $\square$`,
  },
  {
    id: 'abelian-category',
    label: 'Abelian Category',
    title: 'Abelian Category',
    kind: 'definition',
    tags: ['Category Theory'],
    dependencies: ['zero-object', 'product-coproduct', 'kernel-cokernel'],
    description: String.raw`An **abelian category** axiomatizes the categories in which homological algebra works — abelian groups, modules over a ring, and sheaves of abelian groups are the prototypes. It has a zero object, every morphism has a kernel and a cokernel, finite products coincide with finite coproducts (**biproducts**), and, crucially, every monomorphism is the kernel of its cokernel and every epimorphism the cokernel of its kernel. This last condition makes the image–coimage comparison an isomorphism, so exact sequences, diagram chases, and derived functors all make sense.`,
    definition: String.raw`An **abelian category** is a category $\mathcal{A}$ satisfying:
- it has a **zero object** $0$;
- every pair of objects has a **biproduct** $A \oplus B$ — an object that is simultaneously a **product** and a **coproduct**, with the injection/projection structure compatible so that $\operatorname{Hom}(A, B)$ is an abelian group and composition is bilinear (an **additive** category);
- every morphism has a **kernel** and a **cokernel**;
- every **monomorphism** is a kernel (of some morphism) and every **epimorphism** is a cokernel.

The last axiom is equivalent to: for every $f : A \to B$, the canonical morphism $\operatorname{coim} f := \operatorname{coker}(\ker f) \to \ker(\operatorname{coker} f) =: \operatorname{im} f$ is an isomorphism, so $f$ factors as an epimorphism followed by a monomorphism through a well-defined **image**.`,
    proof: String.raw`**In an abelian category, a monomorphism with zero cokernel is an isomorphism.** Let $m : A \to B$ be monic with $\operatorname{coker} m = 0$.

*Step 1: every monomorphism is the kernel of its own cokernel.* By the abelian axiom (from **kernel-cokernel** and the last clause), $m$ is a kernel, say $m = \ker g$ for some $g : B \to E$, so $g \circ m = 0$. Write $c := \operatorname{coker} m : B \to Q$ for the cokernel. Since $g \circ m = 0$, the universal property of the cokernel factors $g$ through $c$: there is $h : Q \to E$ with $g = h \circ c$. Now let $\ell := \ker c : \ker(\operatorname{coker} m) \to B$. From $c \circ \ell = 0$ we get $g \circ \ell = h \circ c \circ \ell = 0$, so $\ell$ factors through $m = \ker g$: there is a *unique* $u : \ker(\operatorname{coker} m) \to A$ with $m \circ u = \ell$. Conversely $c \circ m = 0$ (definition of cokernel), so $m$ factors through $\ell = \ker c$: there is a unique $v : A \to \ker(\operatorname{coker} m)$ with $\ell \circ v = m$. Then $m \circ u \circ v = \ell \circ v = m$, and $m$ monic gives $u \circ v = \mathrm{id}_A$; while $\ell \circ v \circ u = m \circ u = \ell$, and $\ell$ monic (it is a kernel, hence monic by **kernel-cokernel**) gives $v \circ u = \mathrm{id}$. Thus $u$ is an isomorphism intertwining $m$ and $\ell$, i.e. $m = \ker(\operatorname{coker} m)$ as subobjects of $B$.

*Step 2: conclude.* Since $\operatorname{coker} m = 0$, the cokernel morphism is the unique map $B \to 0$. Its kernel is all of $B$: $\mathrm{id}_B : B \to B$ satisfies $0_{B,0} \circ \mathrm{id}_B = 0_{B,0}$, and for any $t : X \to B$ one has $0_{B,0} \circ t = 0_{X,0}$ automatically (every map into $0$ is the zero map), so $t$ factors uniquely as $\mathrm{id}_B \circ t$; hence $\ker(B \to 0) = \mathrm{id}_B$. By Step 1 and uniqueness of kernels up to unique isomorphism (from **kernel-cokernel**), $m \cong \mathrm{id}_B$, so $m$ is an isomorphism. $\square$`,
  },
]

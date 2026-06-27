import type { MathNode } from '../types'

export const MULTILINEAR_ALGEBRA_NODES: MathNode[] = [
  // ── Multilinearity and the tensor product ──────────────────────────────────
  {
    id: 'multilinear-map',
    label: 'Multilinear Map',
    title: 'Multilinear & Bilinear Maps',
    kind: 'definition',
    tags: ['Multilinear Algebra'],
    dependencies: ['vector-space', 'linear-map'],
    description: String.raw`A linear map is linear in its single argument; a **multilinear** map is linear in each of several arguments *separately*, with the others held fixed. The dot product, the cross product, the determinant read as a function of its columns, and the evaluation of a covector on a vector are all multilinear. Multilinearity is the natural home of "products" in linear algebra: a $k$-linear map measures how $k$ vectors combine when scaling any one of them scales the output proportionally. The whole of this area is organized around linearizing multilinear maps — replacing a map of many vector arguments by a single linear map on one cleverly built space.`,
    definition: String.raw`Let $V_1, \dots, V_k$ and $U$ be vector spaces over a field $F$. A map $b : V_1 \times \cdots \times V_k \to U$ is **multilinear** ($k$-linear) if it is linear in each argument with the others fixed: for every index $i$, all $v_j \in V_j$, $v_i, v_i' \in V_i$, and $a \in F$,
$$b(\dots, v_i + v_i', \dots) = b(\dots, v_i, \dots) + b(\dots, v_i', \dots), \qquad b(\dots, a v_i, \dots) = a\, b(\dots, v_i, \dots).$$
A $2$-linear map is **bilinear**, and a $1$-linear map is just a **linear map**. A multilinear map $V \times \cdots \times V \to U$ (all factors equal) is **alternating** if it vanishes whenever two arguments are equal, and **symmetric** if its value is unchanged under any transposition of two arguments.`,
  },
  {
    id: 'tensor-product-vector-spaces',
    label: 'Tensor Product',
    title: 'Tensor Product of Vector Spaces',
    kind: 'definition',
    tags: ['Multilinear Algebra'],
    dependencies: ['vector-space', 'subspace', 'multilinear-map', 'linear-independence-span'],
    description: String.raw`The tensor product $V \otimes W$ is the vector space built so that bilinear maps out of $V \times W$ become *linear* maps out of $V \otimes W$. One forms the (enormous) free vector space on the set of pairs $(v, w)$ and then quotients by exactly the relations that bilinearity demands — distributivity in each slot and the ability to pull scalars across the $\otimes$ symbol. What survives is a space whose elements are finite sums of **pure tensors** $v \otimes w$, in which $\otimes$ is bilinear by construction and nothing more is imposed. The general tensor product of modules over a ring is the same construction one level more general; over a field everything is free, so the theory is especially clean.`,
    definition: String.raw`Let $V, W$ be vector spaces over $F$. Let $\mathcal{F}$ be the **free vector space** on the set $V \times W$ — the space of all finitely supported functions $V \times W \to F$, with basis the indicator symbols $[v, w]$. Let $R \subseteq \mathcal{F}$ be the **subspace** spanned by all elements of the forms
$$[v + v', w] - [v, w] - [v', w], \quad [v, w + w'] - [v, w] - [v, w'], \quad [av, w] - a[v, w], \quad [v, aw] - a[v, w],$$
for $v, v' \in V$, $w, w' \in W$, $a \in F$. The **tensor product** is the quotient $V \otimes W := \mathcal{F}/R$, and the **pure tensor** is $v \otimes w := [v, w] + R$. By construction the canonical map $\otimes : V \times W \to V \otimes W$, $(v, w) \mapsto v \otimes w$, is **bilinear**, and every element of $V \otimes W$ is a *finite* sum $\sum_i v_i \otimes w_i$ of pure tensors (since the $[v, w]$ span $\mathcal{F}$, their classes span the quotient).`,
    proof: String.raw`The construction is well defined. $\mathcal{F}$ is a genuine vector space (finitely supported $F$-valued functions, with pointwise operations), and $R$ is a **subspace** of it (it is by definition the **span** of a set of vectors, hence closed under linear combinations by **linear-independence-span**), so the quotient $V \otimes W = \mathcal{F}/R$ is a vector space and the projection $\mathcal{F} \to V \otimes W$ is linear. Bilinearity of $\otimes$ is exactly the statement that the four families of generators of $R$ map to $0$: e.g. $(v + v') \otimes w - v \otimes w - v' \otimes w$ is the class of the first generator, which lies in $R$ and so is $0$ in the quotient, giving additivity in the first slot; the remaining three generators give additivity in the second slot and homogeneity in each. Thus $\otimes$ is a **multilinear** map of two arguments. Finally the classes of the spanning set $\{[v,w]\}$ span $\mathcal{F}/R$, and since each $[v,w]$ maps to the pure tensor $v \otimes w$, the pure tensors span $V \otimes W$; an arbitrary element is therefore a finite linear combination $\sum_i a_i (v_i \otimes w_i) = \sum_i (a_i v_i) \otimes w_i$, a finite sum of pure tensors. $\square$`,
  },
  {
    id: 'tensor-universal-property',
    label: 'Universal Property of ⊗',
    title: 'Universal Property of the Tensor Product',
    kind: 'theorem',
    tags: ['Multilinear Algebra'],
    dependencies: ['tensor-product-vector-spaces', 'multilinear-map', 'universal-property'],
    description: String.raw`The defining feature of the tensor product is not how it is built but what it does: it converts bilinear maps into linear maps, in a way that is best possible. Every bilinear map $b : V \times W \to U$ factors *uniquely* through the canonical bilinear map $\otimes$ via an honest linear map $\tilde b : V \otimes W \to U$. This **universal property** characterizes $V \otimes W$ up to a unique isomorphism, so any concrete model satisfying it may be used interchangeably — the explicit quotient construction is just one realization. In categorical language $(V \otimes W, \otimes)$ is the initial object among bilinear maps out of $V \times W$.`,
    statement: String.raw`Let $V, W$ be vector spaces over $F$. For every vector space $U$ and every **bilinear** map $b : V \times W \to U$, there is a *unique* linear map $\tilde b : V \otimes W \to U$ with $\tilde b(v \otimes w) = b(v, w)$ for all $v \in V$, $w \in W$ — that is, $\tilde b \circ \otimes = b$. The pair $(V \otimes W, \otimes)$ is determined up to a unique isomorphism by this property.`,
    proof: String.raw`*Existence.* With $\mathcal{F}$ the free vector space on $V \times W$ from **tensor-product-vector-spaces**, a function on the basis $\{[v,w]\}$ extends uniquely to a linear map on $\mathcal{F}$; let $B : \mathcal{F} \to U$ be the linear map with $B([v,w]) = b(v,w)$. Because $b$ is **bilinear**, $B$ annihilates each generator of $R$: for instance $B([v+v',w] - [v,w] - [v',w]) = b(v+v',w) - b(v,w) - b(v',w) = 0$, and similarly for the other three families. Hence $R \subseteq \ker B$, so $B$ descends to a well-defined linear map $\tilde b : \mathcal{F}/R = V \otimes W \to U$ with $\tilde b(v \otimes w) = B([v,w]) = b(v,w)$.

*Uniqueness.* Any linear $g : V \otimes W \to U$ with $g(v \otimes w) = b(v,w)$ agrees with $\tilde b$ on every pure tensor; since the pure tensors **span** $V \otimes W$ and both maps are linear, they agree everywhere, so $g = \tilde b$.

*Characterization up to unique isomorphism.* The pair $(V \otimes W, \otimes)$ is precisely an initial object in the category whose objects are pairs $(U, b)$ of a space with a bilinear map $V \times W \to U$ and whose morphisms $(U, b) \to (U', b')$ are linear $h : U \to U'$ with $h \circ b = b'$: the existence-and-uniqueness above says there is exactly one morphism from $(V \otimes W, \otimes)$ to any object. By **universal-property**, an initial object is unique up to a unique isomorphism, so any other pair with the same factorization property is canonically isomorphic to $(V \otimes W, \otimes)$ by an isomorphism commuting with the canonical bilinear maps. $\square$`,
  },
  {
    id: 'tensor-product-basis',
    label: 'Basis of V ⊗ W',
    title: 'Basis and Dimension of a Tensor Product',
    kind: 'proposition',
    tags: ['Multilinear Algebra'],
    dependencies: ['tensor-product-vector-spaces', 'tensor-universal-property', 'basis', 'multilinear-map'],
    description: String.raw`Tensoring multiplies dimensions. If $\{e_i\}$ is a basis of $V$ and $\{f_j\}$ a basis of $W$, then the pure tensors $\{e_i \otimes f_j\}$ form a basis of $V \otimes W$, so $\dim(V \otimes W) = \dim V \cdot \dim W$ in finite dimensions. Spanning is immediate from bilinearity; the work is linear independence, and the clean way to get it is to manufacture, via the universal property, a linear functional that reads off any single coordinate. This is also why $V \otimes W$ is genuinely larger than $V \times W$ (whose dimension is $\dim V + \dim W$): the tensor product records *products* of coordinates, not pairs.`,
    statement: String.raw`Let $\{e_i\}_{i \in I}$ be a basis of $V$ and $\{f_j\}_{j \in J}$ a basis of $W$. Then $\{e_i \otimes f_j\}_{(i,j) \in I \times J}$ is a basis of $V \otimes W$. In particular, if $V, W$ are finite-dimensional then $\dim(V \otimes W) = \dim V \cdot \dim W$.`,
    proof: String.raw`*Spanning.* Any pure tensor is $v \otimes w$ with $v = \sum_i a_i e_i$ and $w = \sum_j b_j f_j$ finite sums; by bilinearity of $\otimes$ (from **tensor-product-vector-spaces**), $v \otimes w = \sum_{i,j} a_i b_j (e_i \otimes f_j)$. Since pure tensors span $V \otimes W$, so do the $e_i \otimes f_j$.

*Independence.* Suppose $\sum_{(i,j) \in S} c_{ij}\, e_i \otimes f_j = 0$ for a finite set $S$ of index pairs. Fix one pair $(p, q)$. Let $e^{*}_p : V \to F$ be the linear functional dual to the basis $\{e_i\}$ (sending $e_p \mapsto 1$ and $e_i \mapsto 0$ for $i \neq p$, extended linearly), and likewise $f^{*}_q : W \to F$. The map $b : V \times W \to F$, $b(v, w) = e^{*}_p(v)\, f^{*}_q(w)$, is **bilinear**, so by **tensor-universal-property** it induces a linear $\tilde b : V \otimes W \to F$ with $\tilde b(e_i \otimes f_j) = e^{*}_p(e_i)\, f^{*}_q(f_j) = \delta_{ip}\delta_{jq}$. Applying $\tilde b$ to the relation gives $0 = \tilde b\bigl(\sum_{(i,j)} c_{ij} e_i \otimes f_j\bigr) = c_{pq}$. As $(p,q)$ was arbitrary, every coefficient vanishes, so the family is linearly independent.

Being independent and spanning, $\{e_i \otimes f_j\}$ is a **basis** of $V \otimes W$. When $I, J$ are finite the index set $I \times J$ has $|I|\,|J| = \dim V \cdot \dim W$ elements, giving the dimension formula. $\square$`,
  },

  // ── Duality and tensors of type (p, q) ─────────────────────────────────────
  {
    id: 'dual-space-algebraic',
    label: 'Dual Space',
    title: 'Algebraic Dual Space',
    kind: 'definition',
    tags: ['Multilinear Algebra'],
    dependencies: ['vector-space', 'linear-map', 'basis'],
    description: String.raw`The dual of a vector space collects all of its scalar measurements: the linear functionals $V \to F$. These form a vector space $V^{*}$ under pointwise operations, and a covector eating a vector to produce a scalar is the most basic pairing in multilinear algebra. In finite dimensions a basis $\{e_i\}$ of $V$ produces the **dual basis** $\{e^{i}\}$ of $V^{*}$ singled out by $e^{i}(e_j) = \delta^{i}_{j}$, so $\dim V^{*} = \dim V$. (Unlike the functional-analytic dual of a normed space, which retains only the *continuous* functionals, the algebraic dual keeps all linear ones.)`,
    definition: String.raw`The **algebraic dual** of a vector space $V$ over $F$ is the vector space $V^{*} = \{\varphi : V \to F \mid \varphi \text{ linear}\}$ of all **linear maps** to the field, with $(\varphi + \psi)(v) = \varphi(v) + \psi(v)$ and $(a\varphi)(v) = a\,\varphi(v)$. The **dual pairing** is the bilinear evaluation $\langle \varphi, v\rangle := \varphi(v)$, $V^{*} \times V \to F$. Given a finite **basis** $\{e_1, \dots, e_n\}$ of $V$, the **dual basis** $\{e^{1}, \dots, e^{n}\}$ of $V^{*}$ is defined by $e^{i}(e_j) = \delta^{i}_{j}$ (Kronecker delta).`,
    proof: String.raw`$V^{*}$ is a vector space and the dual basis is a basis. Pointwise sum and scalar multiple of linear maps are linear, and the vector-space axioms hold pointwise (inherited from $F$), so $V^{*}$ is a vector space with zero functional $0$. Now let $\{e_1, \dots, e_n\}$ be a basis of $V$ and define $e^{i}$ on the basis by $e^{i}(e_j) = \delta^{i}_{j}$, extended linearly (a **linear map** is determined by, and may be freely prescribed on, a basis). *Independence:* if $\sum_i a_i e^{i} = 0$ then evaluating at $e_j$ gives $a_j = 0$ for each $j$. *Spanning:* for any $\varphi \in V^{*}$ and any $v = \sum_j v_j e_j$, $\varphi(v) = \sum_j v_j \varphi(e_j) = \bigl(\sum_i \varphi(e_i) e^{i}\bigr)(v)$, so $\varphi = \sum_i \varphi(e_i)\, e^{i}$. Hence $\{e^{i}\}$ is a **basis**, and $\dim V^{*} = n = \dim V$. $\square$`,
  },
  {
    id: 'tensor-type-pq',
    label: 'Tensor of Type (p,q)',
    title: 'Tensors of Type (p, q)',
    kind: 'definition',
    tags: ['Multilinear Algebra'],
    dependencies: ['tensor-product-vector-spaces', 'tensor-product-basis', 'dual-space-algebraic', 'tensor-universal-property', 'universal-property'],
    description: String.raw`Fixing one vector space $V$, a **tensor of type $(p, q)$** is an element of the tensor product of $p$ copies of $V$ and $q$ copies of its dual $V^{*}$ — equivalently, by the universal property, a multilinear map taking $p$ covectors and $q$ vectors to a scalar. Vectors are type $(1,0)$, covectors type $(0,1)$, linear operators type $(1,1)$, and bilinear forms type $(0,2)$. This bookkeeping of "$p$ contravariant, $q$ covariant slots" is the algebra underlying tensor calculus on manifolds, where such tensors become tensor fields. The components in a basis carry $p$ upper and $q$ lower indices, $T^{i_1 \dots i_p}_{\;j_1 \dots j_q}$.`,
    definition: String.raw`Let $V$ be a vector space over $F$ with algebraic dual $V^{*}$. A **tensor of type $(p, q)$** on $V$ is an element of
$$T^{p}_{q}(V) := \underbrace{V \otimes \cdots \otimes V}_{p} \otimes \underbrace{V^{*} \otimes \cdots \otimes V^{*}}_{q},$$
the tensor product (associated in any fixed order — all associations are canonically isomorphic by the **universal property**) of $p$ copies of $V$ and $q$ copies of $V^{*}$, with $T^{0}_{0}(V) := F$. When $\dim V = n < \infty$, choosing a **basis** $\{e_i\}$ of $V$ and its dual basis $\{e^{j}\}$ of $V^{*}$ gives, by **tensor-product-basis**, the basis $\{e_{i_1} \otimes \cdots \otimes e_{i_p} \otimes e^{j_1} \otimes \cdots \otimes e^{j_q}\}$ of $T^{p}_{q}(V)$, so every tensor has unique **components** $T^{i_1 \dots i_p}_{\;j_1 \dots j_q} \in F$ and $\dim T^{p}_{q}(V) = n^{p+q}$.`,
    proof: String.raw`The basis and dimension claims are justified. Associativity of $\otimes$ up to canonical isomorphism — so that $T^{p}_{q}(V)$ is well defined independent of bracketing — follows from **tensor-universal-property**: $(A \otimes B) \otimes C$ and $A \otimes (B \otimes C)$ both classify trilinear maps $A \times B \times C \to U$ (a linear map out of either, composed with the canonical map, is a trilinear map, and conversely each trilinear map factors uniquely through each), hence are canonically isomorphic as initial objects for the same multilinear problem. Iterating the basis result **tensor-product-basis** across the $p + q$ factors, the indicated products of basis vectors and dual basis vectors form a **basis** of $T^{p}_{q}(V)$; its cardinality is $n^{p} \cdot n^{q} = n^{p+q}$, and uniqueness of coordinates with respect to a basis gives the components. $\square$`,
  },
  {
    id: 'tensor-contraction',
    label: 'Contraction',
    title: 'Tensor Contraction',
    kind: 'proposition',
    tags: ['Multilinear Algebra'],
    dependencies: ['tensor-type-pq', 'tensor-universal-property', 'dual-space-algebraic', 'tensor-product-basis'],
    description: String.raw`**Contraction** pairs one upper (vector) slot of a tensor with one lower (covector) slot and sums them off, lowering a type $(p, q)$ tensor to type $(p-1, q-1)$. The prototype is the trace: a type $(1,1)$ tensor *is* a linear operator, and contracting its two slots returns its trace, a basis-independent scalar. The operation is engineered from the dual pairing $\langle \varphi, v\rangle = \varphi(v)$, and the point of building it through the universal property is precisely that it does not depend on any choice of basis — in components it is the Einstein summation $T^{\dots i \dots}_{\;\dots i \dots}$ over a repeated index.`,
    statement: String.raw`Let $V$ be finite-dimensional. There is a unique linear **contraction** map $C : T^{p}_{q}(V) \to T^{p-1}_{q-1}(V)$ (contracting the first contravariant against the first covariant slot) determined on pure tensors by
$$C\bigl(v_1 \otimes \cdots \otimes v_p \otimes \varphi^{1} \otimes \cdots \otimes \varphi^{q}\bigr) = \varphi^{1}(v_1)\; v_2 \otimes \cdots \otimes v_p \otimes \varphi^{2} \otimes \cdots \otimes \varphi^{q}.$$
For a type $(1,1)$ tensor it is independent of basis, and in components $C(T) = \sum_i T^{i}_{\;i}$, the **trace**.`,
    proof: String.raw`*Existence and uniqueness.* The map
$$(v_1, \dots, v_p, \varphi^{1}, \dots, \varphi^{q}) \longmapsto \varphi^{1}(v_1)\; v_2 \otimes \cdots \otimes v_p \otimes \varphi^{2} \otimes \cdots \otimes \varphi^{q}$$
is **multilinear** in its $p + q$ arguments: in $v_1$ and $\varphi^{1}$ this is the bilinearity of the dual pairing $\langle\varphi^{1}, v_1\rangle = \varphi^{1}(v_1)$ from **dual-space-algebraic**, and in each remaining argument it is the linearity of $\otimes$. By **tensor-universal-property** (in its iterated form), it induces a unique linear map $C$ on $T^{p}_{q}(V) = V^{\otimes p} \otimes (V^{*})^{\otimes q}$ with the stated values on pure tensors, and uniqueness holds because pure tensors span the domain.

*Trace and basis-independence for type $(1,1)$.* Pick a basis $\{e_i\}$ with dual basis $\{e^{j}\}$. By **tensor-product-basis** a type $(1,1)$ tensor is $T = \sum_{i,j} T^{i}_{\;j}\, e_i \otimes e^{j}$, and applying $C$ termwise gives $C(T) = \sum_{i,j} T^{i}_{\;j}\, e^{j}(e_i) = \sum_{i,j} T^{i}_{\;j}\,\delta^{j}_{i} = \sum_i T^{i}_{\;i}$. Under the canonical isomorphism $V \otimes V^{*} \cong \operatorname{End}(V)$ sending $v \otimes \varphi$ to the rank-one operator $x \mapsto \varphi(x)\,v$, the tensor $T$ corresponds to the operator with matrix $(T^{i}_{\;j})$, whose trace is $\sum_i T^{i}_{\;i}$. Since $C$ was defined without reference to a basis, this scalar is the same in every basis — i.e. the trace is basis-independent. $\square$`,
  },
  {
    id: 'hom-tensor-adjunction',
    label: 'Hom–⊗ Adjunction',
    title: 'Hom–Tensor Adjunction',
    kind: 'theorem',
    tags: ['Multilinear Algebra'],
    dependencies: ['tensor-product-vector-spaces', 'tensor-universal-property', 'multilinear-map', 'dual-space-algebraic', 'adjunction'],
    description: String.raw`Tensoring and taking $\operatorname{Hom}$ are two halves of one adjunction. A linear map *out of* a tensor product $V \otimes W$ is the same data as a bilinear map on $V \times W$, which in turn is the same as a linear map $V \to \operatorname{Hom}(W, U)$ assigning to each $v$ the partial map $w \mapsto b(v, w)$. This is **currying** in linear algebra: $\operatorname{Hom}(V \otimes W, U) \cong \operatorname{Hom}(V, \operatorname{Hom}(W, U))$, naturally in all variables, which says the functor $-\, \otimes W$ is left adjoint to $\operatorname{Hom}(W, -)$. Specializing $U = F$ gives $(V \otimes W)^{*} \cong \operatorname{Hom}(V, W^{*})$, and it makes the tensor product the monoidal structure for which $\operatorname{Hom}$ is the internal hom.`,
    statement: String.raw`For vector spaces $V, W, U$ over $F$ there is an isomorphism of vector spaces
$$\Phi : \operatorname{Hom}(V \otimes W,\, U) \;\xrightarrow{\ \sim\ }\; \operatorname{Hom}\bigl(V,\, \operatorname{Hom}(W, U)\bigr), \qquad \Phi(g)(v)(w) = g(v \otimes w),$$
natural in $V, W, U$. Equivalently, the functor $-\, \otimes W$ is **left adjoint** to $\operatorname{Hom}(W, -)$.`,
    proof: String.raw`*$\Phi$ is well defined and linear.* For $g \in \operatorname{Hom}(V \otimes W, U)$ and fixed $v$, the map $w \mapsto g(v \otimes w)$ is linear in $w$ (as $w \mapsto v \otimes w$ is linear and $g$ is linear), so $\Phi(g)(v) \in \operatorname{Hom}(W, U)$; and $v \mapsto \Phi(g)(v)$ is linear in $v$ (since $v \mapsto v \otimes w$ is linear), so $\Phi(g) \in \operatorname{Hom}(V, \operatorname{Hom}(W, U))$. That $\Phi$ itself is linear in $g$ is immediate from the pointwise definition.

*Inverse via the universal property.* Let $\psi \in \operatorname{Hom}(V, \operatorname{Hom}(W, U))$. The map $b_\psi : V \times W \to U$, $b_\psi(v, w) = \psi(v)(w)$, is **bilinear**: linear in $w$ because $\psi(v)$ is a linear map, and linear in $v$ because $\psi$ is linear and evaluation at $w$ is linear. By **tensor-universal-property** there is a *unique* linear $\Psi(\psi) : V \otimes W \to U$ with $\Psi(\psi)(v \otimes w) = \psi(v)(w)$. The assignment $\psi \mapsto \Psi(\psi)$ is linear. Now $\Phi(\Psi(\psi))(v)(w) = \Psi(\psi)(v \otimes w) = \psi(v)(w)$, so $\Phi \circ \Psi = \mathrm{id}$; and $\Psi(\Phi(g))$ is the unique linear map sending $v \otimes w \mapsto \Phi(g)(v)(w) = g(v \otimes w)$, which is $g$ itself (both agree on the spanning pure tensors), so $\Psi \circ \Phi = \mathrm{id}$. Hence $\Phi$ is an isomorphism.

*Naturality and adjunction.* For linear maps $V' \to V$, $W' \to W$, $U \to U'$, both sides transform by pre- and post-composition, and the defining formula $\Phi(g)(v)(w) = g(v \otimes w)$ commutes with these substitutions — a direct check on pure tensors, which suffices since they span. This naturality in $(V, W, U)$ is exactly the statement that $\Phi$ is a natural isomorphism $\operatorname{Hom}(-\otimes W, -) \cong \operatorname{Hom}(-, \operatorname{Hom}(W, -))$, i.e. an **adjunction** $(-\otimes W) \dashv \operatorname{Hom}(W, -)$. Taking $U = F$ gives $(V \otimes W)^{*} \cong \operatorname{Hom}(V, W^{*})$, where $W^{*}$ is the **dual-space-algebraic**. $\square$`,
  },

  // ── Exterior algebra ───────────────────────────────────────────────────────
  {
    id: 'exterior-power',
    label: 'Exterior Power',
    title: 'Exterior Power & Wedge Product',
    kind: 'definition',
    tags: ['Multilinear Algebra'],
    dependencies: ['tensor-product-vector-spaces', 'multilinear-map', 'tensor-universal-property', 'universal-property'],
    description: String.raw`The exterior power $\Lambda^{k} V$ is to *alternating* multilinear maps what the tensor product is to all multilinear maps: it is the universal recipient, turning every alternating $k$-linear map out of $V^{k}$ into a linear map out of $\Lambda^{k} V$. Its product, the **wedge** $\wedge$, is antisymmetric — swapping two factors flips the sign, and any factor repeated kills the product. This antisymmetry is exactly what is needed to model signed $k$-dimensional volume: $v_1 \wedge \cdots \wedge v_k$ vanishes precisely when the $v_i$ are linearly dependent. The construction is the quotient of $V^{\otimes k}$ that forces alternation.`,
    definition: String.raw`Let $V$ be a vector space over $F$ and $k \ge 1$. Inside the $k$-fold tensor power $V^{\otimes k} = V \otimes \cdots \otimes V$, let $N_k$ be the subspace spanned by all pure tensors $v_1 \otimes \cdots \otimes v_k$ in which $v_i = v_j$ for some $i \neq j$. The **$k$-th exterior power** is the quotient
$$\textstyle\bigwedge^{k} V := V^{\otimes k} / N_k,$$
and the **wedge product** of vectors is $v_1 \wedge \cdots \wedge v_k := (v_1 \otimes \cdots \otimes v_k) + N_k$. Set $\bigwedge^{0} V := F$ and $\bigwedge^{1} V := V$. The induced map $V^{k} \to \bigwedge^{k} V$, $(v_1, \dots, v_k) \mapsto v_1 \wedge \cdots \wedge v_k$, is **alternating** multilinear, and $\bigwedge^{k} V$ has the **universal property**: every alternating $k$-linear map $V^{k} \to U$ factors uniquely through it by a linear map $\bigwedge^{k} V \to U$.`,
    proof: String.raw`*The wedge map is alternating, and antisymmetry holds.* The composite $V^{k} \to V^{\otimes k} \to \bigwedge^{k} V$ is **multilinear** (the canonical map to $V^{\otimes k}$ is, and the quotient is linear). It is **alternating**: if $v_i = v_j$ then $v_1 \otimes \cdots \otimes v_k \in N_k$, so its class $v_1 \wedge \cdots \wedge v_k = 0$. Antisymmetry under swapping adjacent factors $v_i, v_{i+1}$ then follows: expanding $0 = (\cdots \otimes (v_i + v_{i+1}) \otimes (v_i + v_{i+1}) \otimes \cdots)$ modulo $N_k$ by multilinearity leaves $v_1 \wedge \cdots v_i \wedge v_{i+1} \cdots + v_1 \wedge \cdots v_{i+1} \wedge v_i \cdots = 0$, since the two repeated-factor terms lie in $N_k$; hence swapping two adjacent (and so, by composing transpositions, any two) factors negates the wedge.

*Universal property.* Let $\alpha : V^{k} \to U$ be alternating multilinear. By the iterated **tensor-universal-property**, the multilinear $\alpha$ factors as $\alpha = \bar\alpha \circ \otimes$ for a unique linear $\bar\alpha : V^{\otimes k} \to U$. Because $\alpha$ is alternating, $\bar\alpha$ kills every generator $v_1 \otimes \cdots \otimes v_k$ of $N_k$ with a repeated factor (its image is $\alpha(v_1, \dots, v_k) = 0$), so $N_k \subseteq \ker \bar\alpha$ and $\bar\alpha$ descends to a unique linear $\hat\alpha : \bigwedge^{k} V = V^{\otimes k}/N_k \to U$ with $\hat\alpha(v_1 \wedge \cdots \wedge v_k) = \alpha(v_1, \dots, v_k)$. Uniqueness holds because the wedges of vectors span $\bigwedge^{k} V$. This is exactly the asserted **universal-property**, identifying $\bigwedge^{k} V$ as the universal target of alternating $k$-linear maps. $\square$`,
  },
  {
    id: 'exterior-power-basis',
    label: 'Basis of Λᵏ V',
    title: 'Basis and Dimension of an Exterior Power',
    kind: 'proposition',
    tags: ['Multilinear Algebra'],
    dependencies: ['exterior-power', 'basis', 'tensor-product-basis', 'dual-space-algebraic', 'permutation-sign', 'determinant'],
    description: String.raw`Antisymmetry collapses the tensor power dramatically. If $\dim V = n$ with basis $\{e_1, \dots, e_n\}$, then the wedges $e_{i_1} \wedge \cdots \wedge e_{i_k}$ over strictly increasing index tuples $i_1 < \cdots < i_k$ form a basis of $\Lambda^{k} V$, so $\dim \Lambda^{k} V = \binom{n}{k}$. In particular $\Lambda^{k} V = 0$ for $k > n$, and $\Lambda^{n} V$ is one-dimensional — the fact that powers the determinant. Spanning comes from sorting indices and discarding repeats; independence is again proved by building alternating functionals that read off a single coordinate.`,
    statement: String.raw`Let $V$ be $n$-dimensional with basis $\{e_1, \dots, e_n\}$. For $0 \le k \le n$, the family $\{\, e_{i_1} \wedge \cdots \wedge e_{i_k} : 1 \le i_1 < i_2 < \cdots < i_k \le n \,\}$ is a basis of $\bigwedge^{k} V$, so $\dim \bigwedge^{k} V = \binom{n}{k}$. For $k > n$, $\bigwedge^{k} V = 0$.`,
    proof: String.raw`*Spanning.* By **tensor-product-basis**, $V^{\otimes k}$ is spanned by the pure tensors $e_{i_1} \otimes \cdots \otimes e_{i_k}$ over all tuples; their images span $\bigwedge^{k} V$. Using the antisymmetry from **exterior-power**: a wedge with a repeated index is $0$, and reordering the indices into increasing order multiplies the wedge by the **sign** of the sorting permutation (from **permutation-sign**). Hence every wedge of basis vectors equals $\pm$ one with strictly increasing indices, and the increasing wedges span. For $k > n$ every $k$-tuple from $n$ indices must repeat one, so all such wedges are $0$ and $\bigwedge^{k} V = 0$.

*Independence.* Suppose $\sum_{i_1 < \cdots < i_k} c_{i_1 \dots i_k}\, e_{i_1} \wedge \cdots \wedge e_{i_k} = 0$. Fix an increasing tuple $p_1 < \cdots < p_k$. Let $\{e^{j}\}$ be the dual basis (from **dual-space-algebraic**) and define $\alpha : V^{k} \to F$ by
$$\alpha(x_1, \dots, x_k) = \sum_{\sigma \in S_k} \operatorname{sgn}(\sigma)\, e^{p_1}(x_{\sigma(1)}) \cdots e^{p_k}(x_{\sigma(k)}),$$
the determinant of the $k \times k$ matrix $\bigl(e^{p_a}(x_b)\bigr)$. This $\alpha$ is multilinear and **alternating** (a determinant is alternating in its columns), so by the universal property of **exterior-power** it induces a linear $\hat\alpha : \bigwedge^{k} V \to F$ with $\hat\alpha(e_{i_1} \wedge \cdots \wedge e_{i_k}) = \det\bigl(e^{p_a}(e_{i_b})\bigr) = \det\bigl(\delta^{p_a}_{i_b}\bigr)$. For increasing tuples this determinant is $1$ if $(i_1, \dots, i_k) = (p_1, \dots, p_k)$ and $0$ otherwise (a permutation matrix of distinct increasing rows/columns is the identity only when the tuples match). Applying $\hat\alpha$ to the relation yields $c_{p_1 \dots p_k} = 0$; as the tuple was arbitrary, all coefficients vanish.

Thus the increasing wedges are a **basis**; there are $\binom{n}{k}$ strictly increasing $k$-tuples in $\{1, \dots, n\}$. $\square$`,
  },
  {
    id: 'exterior-algebra',
    label: 'Exterior Algebra',
    title: 'Exterior Algebra',
    kind: 'definition',
    tags: ['Multilinear Algebra'],
    dependencies: ['exterior-power', 'exterior-power-basis', 'tensor-product-vector-spaces', 'binomial-theorem'],
    description: String.raw`Assembling all the exterior powers into one graded space and letting the wedge multiply across degrees gives the **exterior algebra** $\Lambda V = \bigoplus_k \Lambda^{k} V$. It is the universal associative algebra in which every vector squares to zero, and its multiplication is **graded-commutative**: $\alpha \wedge \beta = (-1)^{kl}\, \beta \wedge \alpha$ for forms of degrees $k$ and $l$. For $\dim V = n$ it has total dimension $2^{n}$, and it is the algebraic backbone of differential forms on a manifold, where $\Lambda^{k}(T_p^{*}M)$ houses the $k$-forms and $\wedge$ is the wedge of forms.`,
    definition: String.raw`The **exterior algebra** of $V$ is the graded vector space $\bigwedge V := \bigoplus_{k \ge 0} \bigwedge^{k} V$ equipped with the associative bilinear **wedge product** extending that on vectors: on decomposables,
$$(v_1 \wedge \cdots \wedge v_k) \wedge (w_1 \wedge \cdots \wedge w_l) = v_1 \wedge \cdots \wedge v_k \wedge w_1 \wedge \cdots \wedge w_l \in \textstyle\bigwedge^{k+l} V.$$
It is the quotient of the tensor algebra $\bigoplus_k V^{\otimes k}$ by the two-sided ideal generated by all $v \otimes v$ ($v \in V$); equivalently the universal associative unital $F$-algebra receiving a linear map $V \to A$ with $v \mapsto v$ squaring to $0$. The product is **graded-commutative**: for $\alpha \in \bigwedge^{k} V$, $\beta \in \bigwedge^{l} V$, $\alpha \wedge \beta = (-1)^{kl}\, \beta \wedge \alpha$. When $\dim V = n$, $\dim \bigwedge V = \sum_{k=0}^{n} \binom{n}{k} = 2^{n}$.`,
    proof: String.raw`*Well-definedness of the product.* The map $(V^{\otimes k}) \times (V^{\otimes l}) \to \bigwedge^{k+l} V$ sending a pair of pure tensors to the class of their concatenation is bilinear and descends through the quotients defining $\bigwedge^{k} V$ and $\bigwedge^{l} V$ from **exterior-power**: if either argument has a repeated factor, or acquires one after concatenation, the result lies in $N_{k+l}$ and so is $0$; thus the product respects the relations $N_k, N_l$ and is well defined on $\bigwedge^{k} V \times \bigwedge^{l} V$. Associativity is inherited from associativity of $\otimes$ (both sides are the class of the concatenated tensor).

*Graded commutativity.* Moving each of the $l$ vectors $w_1, \dots, w_l$ leftward past the $k$ vectors $v_1, \dots, v_k$ requires $kl$ adjacent transpositions, each contributing a sign $-1$ by the antisymmetry of **exterior-power**; hence $\alpha \wedge \beta = (-1)^{kl} \beta \wedge \alpha$ on decomposables, and by bilinearity in general.

*Total dimension.* As a graded space $\bigwedge V$ is the direct sum of the $\bigwedge^{k} V$, whose dimensions are $\binom{n}{k}$ by **exterior-power-basis** (and $0$ for $k > n$); summing, $\sum_{k=0}^{n} \binom{n}{k} = 2^{n}$ by the **binomial-theorem** evaluated at $x = y = 1$. $\square$`,
  },
  {
    id: 'symmetric-algebra',
    label: 'Symmetric Algebra',
    title: 'Symmetric Power & Symmetric Algebra',
    kind: 'definition',
    tags: ['Multilinear Algebra'],
    dependencies: ['tensor-product-vector-spaces', 'multilinear-map', 'tensor-universal-property', 'basis'],
    description: String.raw`Imposing *commutativity* on the tensor algebra instead of antisymmetry yields the **symmetric algebra** $S(V)$, the universal recipient of *symmetric* multilinear maps. Where the exterior power forces $v \wedge v = 0$, the symmetric power forces $uv = vu$, so the product cares only about which vectors appear and how often, not their order. After choosing a basis $\{x_1, \dots, x_n\}$ of $V$, $S(V)$ is canonically the polynomial ring $F[x_1, \dots, x_n]$, with $S^{k}(V)$ the homogeneous polynomials of degree $k$. This is the algebraic source of polynomial functions on a vector space.`,
    definition: String.raw`Let $V$ be a vector space over $F$ and $k \ge 1$. Inside $V^{\otimes k}$ let $J_k$ be the subspace spanned by all differences $v_1 \otimes \cdots \otimes v_k - v_{\tau(1)} \otimes \cdots \otimes v_{\tau(k)}$ over transpositions $\tau$. The **$k$-th symmetric power** is $S^{k}(V) := V^{\otimes k}/J_k$, with symmetric product $v_1 \cdots v_k := (v_1 \otimes \cdots \otimes v_k) + J_k$; it carries the **universal property** that every symmetric $k$-linear map $V^{k} \to U$ factors uniquely through it. The **symmetric algebra** is $S(V) := \bigoplus_{k \ge 0} S^{k}(V)$ ($S^{0}(V) := F$, $S^{1}(V) := V$), the quotient of the tensor algebra by the two-sided ideal generated by all $u \otimes v - v \otimes u$ — the universal *commutative* unital $F$-algebra receiving a linear map from $V$. If $\dim V = n < \infty$ with basis $\{x_1, \dots, x_n\}$, then $S(V) \cong F[x_1, \dots, x_n]$ as graded algebras, and $\dim S^{k}(V) = \binom{n + k - 1}{k}$.`,
    proof: String.raw`*Universal property of $S^{k}(V)$.* Let $\beta : V^{k} \to U$ be symmetric multilinear. By the iterated **tensor-universal-property** it factors as $\beta = \bar\beta \circ \otimes$ for a unique linear $\bar\beta : V^{\otimes k} \to U$. Symmetry of $\beta$ means $\bar\beta$ annihilates each generator $v_1 \otimes \cdots \otimes v_k - v_{\tau(1)} \otimes \cdots \otimes v_{\tau(k)}$ of $J_k$, so $J_k \subseteq \ker\bar\beta$ and $\bar\beta$ descends to a unique linear $\hat\beta : S^{k}(V) \to U$ with $\hat\beta(v_1 \cdots v_k) = \beta(v_1, \dots, v_k)$; uniqueness holds since symmetric products of vectors span $S^{k}(V)$.

*Polynomial model and dimension.* Sending $x_i \mapsto x_i$ extends to an algebra map $S(V) \to F[x_1, \dots, x_n]$, surjective since the $x_i$ generate the polynomial ring. In $S^{k}(V)$ the products $x_{i_1} \cdots x_{i_k}$ depend only on the multiset of indices (commutativity), so $S^{k}(V)$ is spanned by the monomials $x_1^{a_1} \cdots x_n^{a_n}$ with $\sum a_i = k$; these map to the distinct degree-$k$ monomials of $F[x_1, \dots, x_n]$, which are linearly independent there, so the spanning monomials of $S^{k}(V)$ are independent too and form a **basis**. Hence the map is an isomorphism in each degree, and $\dim S^{k}(V)$ equals the number of degree-$k$ monomials in $n$ variables, $\binom{n+k-1}{k}$ (stars and bars). $\square$`,
  },
  {
    id: 'determinant-top-exterior-power',
    label: 'det = Λⁿ',
    title: 'The Determinant as the Top Exterior Power',
    kind: 'theorem',
    tags: ['Multilinear Algebra'],
    dependencies: ['exterior-power', 'exterior-power-basis', 'determinant', 'linear-map', 'permutation-sign', 'symmetric-group'],
    description: String.raw`The determinant is not an arbitrary formula but the action of a linear map on the top exterior power. For $\dim V = n$, the space $\Lambda^{n} V$ is one-dimensional, so any linear operator $T : V \to V$ induces a map $\Lambda^{n} T$ on it that must be multiplication by a single scalar — and that scalar is exactly $\det T$. This is the basis-free definition of the determinant: it is how $T$ scales top-degree volume. Multiplicativity $\det(ST) = \det S \det T$ becomes the functoriality $\Lambda^{n}(ST) = \Lambda^{n}(S)\Lambda^{n}(T)$, and the Leibniz sign-sum formula falls out of expanding a wedge.`,
    statement: String.raw`Let $V$ be $n$-dimensional and $T : V \to V$ linear. Since $\dim \bigwedge^{n} V = 1$, the induced linear map $\bigwedge^{n} T : \bigwedge^{n} V \to \bigwedge^{n} V$, determined by $(\bigwedge^{n} T)(v_1 \wedge \cdots \wedge v_n) = T v_1 \wedge \cdots \wedge T v_n$, is multiplication by a scalar $\lambda_T \in F$. This scalar equals the **determinant**: writing $T e_j = \sum_i A_{ij} e_i$ in a basis $\{e_i\}$, $\lambda_T = \det(A_{ij})$. It is independent of the basis, and $\lambda_{ST} = \lambda_S \lambda_T$.`,
    proof: String.raw`By **exterior-power-basis**, $\bigwedge^{n} V$ is one-dimensional with basis the single element $\omega := e_1 \wedge \cdots \wedge e_n$. The assignment $(v_1, \dots, v_n) \mapsto T v_1 \wedge \cdots \wedge T v_n$ is alternating multilinear (composition of $T$ in each slot with the alternating wedge map of **exterior-power**), so by the universal property of **exterior-power** it induces a linear map $\bigwedge^{n} T$ on $\bigwedge^{n} V$ with the stated effect on decomposables. A linear endomorphism of a one-dimensional space is multiplication by a scalar $\lambda_T$, fixed by $\bigwedge^{n} T(\omega) = \lambda_T\, \omega$.

*Computing $\lambda_T$.* Expand using multilinearity of the wedge:
$$T e_1 \wedge \cdots \wedge T e_n = \Bigl(\sum_{i_1} A_{i_1 1} e_{i_1}\Bigr) \wedge \cdots \wedge \Bigl(\sum_{i_n} A_{i_n n} e_{i_n}\Bigr) = \sum_{i_1, \dots, i_n} A_{i_1 1} \cdots A_{i_n n}\; e_{i_1} \wedge \cdots \wedge e_{i_n}.$$
A term vanishes unless $i_1, \dots, i_n$ are distinct (a repeated index kills the wedge, by **exterior-power**), i.e. unless $(i_1, \dots, i_n) = (\sigma(1), \dots, \sigma(n))$ for some $\sigma$ in the **symmetric-group** $S_n$. For such a term, reordering $e_{\sigma(1)} \wedge \cdots \wedge e_{\sigma(n)}$ back to $e_1 \wedge \cdots \wedge e_n$ contributes the **sign** $\operatorname{sgn}(\sigma)$ (from **permutation-sign**). Hence
$$T e_1 \wedge \cdots \wedge T e_n = \Bigl(\sum_{\sigma \in S_n} \operatorname{sgn}(\sigma)\, A_{\sigma(1), 1} \cdots A_{\sigma(n), n}\Bigr)\, \omega,$$
and the parenthesized scalar is the Leibniz formula for $\det(A)$ from **determinant** (the sum over $\sigma$ of $\operatorname{sgn}(\sigma) \prod_i A_{\sigma(i), i}$, equal to $\det A$ since $\det A = \det A^{\mathsf T}$). Thus $\lambda_T = \det A$.

*Basis independence and multiplicativity.* The map $\bigwedge^{n} T$ is defined without reference to any basis, so the scalar $\lambda_T$ it represents is intrinsic; computing it in any basis therefore yields the same value, which is why $\det$ is basis-independent. Finally, applying the construction to a composite, $\bigwedge^{n}(ST)(\omega) = STv_1 \wedge \cdots = \bigwedge^{n}(S)\bigl(\bigwedge^{n}(T)(\omega)\bigr) = \lambda_S \lambda_T\, \omega$, so $\lambda_{ST} = \lambda_S \lambda_T$, recovering multiplicativity of the determinant. $\square$`,
  },
]

import type { MathNode } from '../types'

export const MODEL_THEORY_NODES: MathNode[] = [
  // ── Structures and truth ───────────────────────────────────────────────────
  {
    id: 'structure-model',
    label: 'Structure',
    title: 'Structure',
    kind: 'definition',
    tags: ['Model Theory'],
    dependencies: ['first-order-logic'],
    description: String.raw`Syntax — the constants, function symbols, and relation symbols of a signature — is meaningless until it is given an interpretation. A **structure** supplies one: it fixes a non-empty set of objects (the domain) and reads each symbol of the language as an actual element, operation, or relation on that set. A group, an ordered field, a graph, the natural numbers with $+$ and $\times$ — each is a structure for its signature. Model theory studies the interplay between these concrete structures and the first-order sentences they make true.`,
    definition: String.raw`Fix a **signature** (language) $\sigma$ consisting of constant symbols, function symbols, and relation symbols, each with an arity. A **structure** $M$ for $\sigma$ (a $\sigma$-structure) consists of a non-empty set $|M|$, the **domain** (or universe), together with an **interpretation**: for each constant symbol $c$ an element $c^M \in |M|$; for each $n$-ary function symbol $f$ a function $f^M : |M|^n \to |M|$; and for each $n$-ary relation symbol $R$ a relation $R^M \subseteq |M|^n$. The **cardinality** of $M$ is $|{|M|}|$.`,
  },
  {
    id: 'satisfaction',
    label: 'Satisfaction',
    title: 'Satisfaction (Truth in a Model)',
    kind: 'definition',
    tags: ['Model Theory'],
    dependencies: ['structure-model'],
    description: String.raw`What does it mean for a formula to be *true* in a structure? Tarski answered with a definition by recursion on the shape of the formula: a relation symbol is true of a tuple when that tuple lies in the interpreted relation, the connectives are handled by their truth tables, and a quantifier $\forall x$ ranges over the elements of the domain. This makes the informal notion of truth precise and draws the founding distinction of logic — between **syntax** (formulas, derivations) and **semantics** (structures, truth).`,
    definition: String.raw`Let $M$ be a $\sigma$-structure. A **variable assignment** is a function $s$ sending variables to elements of $|M|$; it extends to terms by $s(c) = c^M$ and $s(f(t_1,\dots,t_n)) = f^M(s(t_1),\dots,s(t_n))$. **Satisfaction** $M \models \varphi[s]$ is defined by recursion on $\varphi$: $M \models (t_1 = t_2)[s]$ iff $s(t_1) = s(t_2)$; $M \models R(t_1,\dots,t_n)[s]$ iff $(s(t_1),\dots,s(t_n)) \in R^M$; the connectives follow their truth clauses ($M \models \neg\varphi[s]$ iff $M \not\models \varphi[s]$, and similarly for $\wedge,\vee,\rightarrow$); and $M \models \forall x\,\varphi[s]$ iff $M \models \varphi[s']$ for every assignment $s'$ agreeing with $s$ off $x$, with $\exists x\,\varphi$ the dual. For a **sentence** $\varphi$ (no free variables) truth is independent of $s$, and one writes $M \models \varphi$.`,
  },
  {
    id: 'theory-and-model',
    label: 'Theory & Model',
    title: 'Theory & Model',
    kind: 'definition',
    tags: ['Model Theory'],
    dependencies: ['satisfaction', 'godel-completeness'],
    description: String.raw`A set of axioms carves out the class of objects obeying them: the models of the field axioms are exactly the fields, of the group axioms the groups. A **theory** is just such a set of sentences, and a **model** is a structure satisfying all of them. The theory is **consistent** precisely when it has a model — and by Gödel's completeness theorem this semantic notion coincides with the syntactic one, that the theory proves no contradiction. Model theory studies the whole class of models a theory admits.`,
    definition: String.raw`A **theory** $T$ over a signature $\sigma$ is a set of $\sigma$-sentences. A $\sigma$-structure $M$ is a **model** of $T$, written $M \models T$, if $M \models \varphi$ for every $\varphi \in T$. The theory $T$ is **satisfiable** (**consistent**) if it has at least one model; by **Gödel's completeness theorem** this is equivalent to syntactic consistency $T \nvdash \bot$. $T$ is **complete** if it is consistent and, for every $\sigma$-sentence $\varphi$, either $T \models \varphi$ or $T \models \neg\varphi$ (equivalently $T \vdash \varphi$ or $T \vdash \neg\varphi$) — equivalently, $T$ has, up to elementary equivalence, exactly one model. For a structure $M$, its **complete theory** $\operatorname{Th}(M) = \{\varphi : M \models \varphi\}$ is always complete.`,
  },
  {
    id: 'elementary-equivalence',
    label: 'Elementary Equivalence',
    title: 'Elementary Equivalence',
    kind: 'definition',
    tags: ['Model Theory'],
    dependencies: ['satisfaction'],
    description: String.raw`First-order logic has limited eyesight. Two structures may differ wildly — even in cardinality — yet agree on every sentence the language can express. Such structures are **elementarily equivalent**: the language cannot tell them apart. The rationals and the reals, viewed merely as dense linear orders without endpoints, are elementarily equivalent though far from isomorphic. This relation captures exactly what first-order logic can and cannot perceive, and is the basic equivalence of model theory.`,
    definition: String.raw`Two $\sigma$-structures $M$ and $N$ are **elementarily equivalent**, written $M \equiv N$, if they satisfy exactly the same $\sigma$-sentences: for every sentence $\varphi$, $M \models \varphi \iff N \models \varphi$. Equivalently, $\operatorname{Th}(M) = \operatorname{Th}(N)$. Elementary equivalence is an equivalence relation on $\sigma$-structures, strictly coarser than isomorphism: isomorphic structures are elementarily equivalent, but elementarily equivalent structures need not be isomorphic.`,
  },
  {
    id: 'isomorphism-implies-elementary-equivalence',
    label: 'Iso ⟹ Elem. Equiv.',
    title: 'Isomorphism Implies Elementary Equivalence',
    kind: 'proposition',
    tags: ['Model Theory'],
    dependencies: ['elementary-equivalence', 'structure-model', 'satisfaction'],
    description: String.raw`Elementary equivalence is genuinely weaker than isomorphism, but it is implied by it: a structure-preserving bijection cannot change the truth value of any first-order sentence. This is the easy direction that makes elementary equivalence a coarsening of isomorphism, and it is proved by the natural induction on formulas — the isomorphism transports the interpretation of every symbol, hence the satisfaction of every atomic formula, and the connectives and quantifiers ride along.`,
    statement: String.raw`If $M$ and $N$ are isomorphic $\sigma$-structures, then $M \equiv N$. Here an **isomorphism** $h : M \to N$ is a bijection $|M| \to |N|$ with $h(c^M) = c^N$, $h(f^M(\bar a)) = f^N(h\bar a)$, and $R^M(\bar a) \iff R^N(h\bar a)$ for all symbols and tuples.`,
    proof: String.raw`Let $h : M \to N$ be an isomorphism. For any assignment $s$ into $M$, write $h \circ s$ for the assignment $x \mapsto h(s(x))$ into $N$. A first induction on terms, using that $h$ commutes with the interpretations of constants and function symbols, gives $h(s(t)) = (h\circ s)(t)$ for every term $t$ (the value of a term is transported by $h$). Now induct on the formula $\varphi$ to show $M \models \varphi[s] \iff N \models \varphi[h\circ s]$. *Atomic:* for $t_1 = t_2$, $s(t_1) = s(t_2) \iff h(s(t_1)) = h(s(t_2))$ since $h$ is injective, and the right side is $(h\circ s)(t_1) = (h\circ s)(t_2)$ by the term identity; for $R(\bar t)$, $(s\bar t) \in R^M \iff (h\,s\bar t) \in R^N$ as $h$ preserves $R$. *Connectives:* immediate from the recursive truth clauses and the inductive hypothesis. *Quantifier:* $M \models \exists x\,\psi[s]$ iff some $a \in |M|$ has $M \models \psi[s(a/x)]$; since $h$ is a **bijection**, $a$ ranges over $|M|$ exactly as $h(a)$ ranges over $|N|$, and by induction this holds iff some $b \in |N|$ has $N \models \psi[(h\circ s)(b/x)]$, i.e. $N \models \exists x\,\psi[h\circ s]$. Applying this to a **sentence** $\varphi$ (where the assignment is irrelevant) yields $M \models \varphi \iff N \models \varphi$; hence $M \equiv N$. $\square$`,
  },
  {
    id: 'elementary-embedding',
    label: 'Elementary Embedding',
    title: 'Elementary Embedding & Substructure',
    kind: 'definition',
    tags: ['Model Theory'],
    dependencies: ['satisfaction', 'elementary-equivalence'],
    description: String.raw`Ordinary homomorphisms preserve only the atomic structure — the operations and basic relations. An **elementary embedding** preserves far more: the truth of *every* formula, with parameters, carries across. Its image is then an **elementary substructure**, a sub-universe that agrees with the ambient structure on all first-order facts about its own elements (not merely $M \equiv N$, but the stronger statement that $M$ sits inside $N$ without $N$ being able to add or remove any first-order property of $M$'s tuples). Elementary embeddings are the true structure-preserving maps of model theory.`,
    definition: String.raw`Let $M, N$ be $\sigma$-structures. An injection $j : |M| \to |N|$ is an **elementary embedding**, written $j : M \prec N$, if for every formula $\varphi(x_1,\dots,x_n)$ and all $a_1,\dots,a_n \in |M|$,
$$M \models \varphi[a_1,\dots,a_n] \iff N \models \varphi[j(a_1),\dots,j(a_n)].$$
When $|M| \subseteq |N|$, $M$ is a **substructure** of $N$ if the inclusion preserves all symbols, and an **elementary substructure** ($M \preceq N$) if the inclusion is an elementary embedding. Taking $n = 0$ shows any elementary embedding gives $M \equiv N$; the full condition (allowing parameters) is strictly stronger.`,
  },
  {
    id: 'definable-set',
    label: 'Definable Set',
    title: 'Definable Set',
    kind: 'definition',
    tags: ['Model Theory'],
    dependencies: ['satisfaction'],
    description: String.raw`The subsets of a structure that the language can actually name are its **definable sets**: the solution sets of formulas, where some variables are filled in by fixed parameters from the domain. In the field of real numbers the definable sets turn out to be exactly the semialgebraic ones (finite Boolean combinations of polynomial inequalities); in the complex field they are the constructible sets. Understanding which sets a structure can define is understanding what it can express — the geometric heart of modern model theory.`,
    definition: String.raw`Let $M$ be a $\sigma$-structure and $A \subseteq |M|$ a set of **parameters**. A set $X \subseteq |M|^n$ is **definable over $A$** if there is a formula $\varphi(x_1,\dots,x_n, y_1,\dots,y_m)$ and parameters $b_1,\dots,b_m \in A$ with
$$X = \{\,(a_1,\dots,a_n) \in |M|^n : M \models \varphi[a_1,\dots,a_n,b_1,\dots,b_m]\,\}.$$
$X$ is **definable** if it is definable over some finite $A$, and **$\emptyset$-definable** (or *parameter-free definable*) if $m = 0$. For each fixed $n$ the definable subsets of $|M|^n$ form a Boolean algebra — closed under finite union, finite intersection, and complement within $|M|^n$ — since the connectives act on the defining formulas; the existential quantifier moreover makes coordinate projections of definable sets definable (landing in a different power $|M|^k$), and products of definable sets are again definable.`,
  },
  {
    id: 'type-model-theory',
    label: 'Type',
    title: 'Type',
    kind: 'definition',
    tags: ['Model Theory'],
    dependencies: ['theory-and-model', 'compactness-theorem', 'elementary-embedding'],
    description: String.raw`A **type** is a complete first-order description of a possible element (or tuple): a maximal consistent set of formulas in fixed free variables, saying everything the language can say about a hypothetical point. A type may be **realized** by an actual element of a model, or merely *finitely approximated* — every finite part realized, but no single element fitting all of it. Counting how many types a theory has over its parameter sets measures its complexity (the subject of **stability** theory), and **saturated** models — those realizing every type over every small parameter set — are model theory's richest, most homogeneous objects.`,
    definition: String.raw`Let $M$ be a $\sigma$-structure, $A \subseteq |M|$, and write $\sigma_A$ for $\sigma$ with a fresh constant for each $a \in A$. An **$n$-type over $A$** is a set $p(x_1,\dots,x_n)$ of $\sigma_A$-formulas (in the displayed free variables) that is **consistent** with $\operatorname{Th}(M_A)$ — i.e. finitely satisfiable in $M_A$ — where $M_A$ is $M$ expanded by interpreting the new constants. The type is **complete** if for every such formula $\varphi$ it contains $\varphi$ or $\neg\varphi$; the set of complete $n$-types over $A$ is denoted $S_n(A)$. A tuple $\bar c$ in an **elementary extension** $N \succeq M_A$ **realizes** $p$ if $N \models \varphi[\bar c]$ for all $\varphi \in p$. Applying **compactness** to $\operatorname{Th}(M_A) \cup p$ (with the free variables read as fresh constants for the witness) yields a model whose $\sigma$-reduct is an elementary extension of $M$ realizing $p$ — so every type over $A$ is realized in some elementary extension of $M$, even when omitted in $M$ itself.`,
  },

  // ── Constructions: ultraproducts ───────────────────────────────────────────
  {
    id: 'ultrafilter',
    label: 'Ultrafilter',
    title: 'Filter & Ultrafilter',
    kind: 'definition',
    tags: ['Model Theory'],
    dependencies: ['power-set', 'zorns-lemma'],
    description: String.raw`An **ultrafilter** on a set is a consistent, maximally decisive notion of "large" subset: it is closed under supersets and finite intersections, never contains the empty set, and — the decisive clause — for every subset, declares either it or its complement large, never both. One can think of it as a finitely additive two-valued measure, assigning each set measure $0$ or $1$. Principal ultrafilters (everything containing a fixed point) are trivial; the existence of *non-principal* ones, which dodge every finite set, requires Zorn's lemma and is what makes ultraproducts produce genuinely new structures.`,
    definition: String.raw`A **filter** on a set $I$ is a non-empty collection $\mathcal{F} \subseteq \mathcal{P}(I)$ with $\emptyset \notin \mathcal{F}$, closed upward ($A \in \mathcal{F}$ and $A \subseteq B \subseteq I$ imply $B \in \mathcal{F}$) and under finite intersection ($A, B \in \mathcal{F}$ imply $A \cap B \in \mathcal{F}$). An **ultrafilter** is a filter $\mathcal{U}$ that is maximal — equivalently, for every $A \subseteq I$ exactly one of $A$, $I \setminus A$ lies in $\mathcal{U}$. It is **principal** if $\mathcal{U} = \{A : i_0 \in A\}$ for some fixed $i_0 \in I$, and **non-principal** otherwise; a non-principal ultrafilter contains every cofinite set and no finite set. The **Fréchet filter** of cofinite subsets of an infinite $I$ extends, by **Zorn's lemma** applied to filters ordered by inclusion, to a non-principal ultrafilter (the *ultrafilter lemma*).`,
  },
  {
    id: 'ultraproduct',
    label: 'Ultraproduct',
    title: 'Ultraproduct',
    kind: 'definition',
    tags: ['Model Theory'],
    dependencies: ['structure-model', 'ultrafilter', 'equivalence-relation'],
    description: String.raw`An **ultraproduct** fuses a whole family of structures into a single new one. Take the Cartesian product of the domains, then glue two sequences together whenever they agree on a "large" set of coordinates — large in the sense of a chosen ultrafilter. Each symbol is interpreted coordinatewise, and the ultrafilter's decisiveness makes this well defined. The construction's power comes from Łoś's theorem (next), which says a sentence is true in the ultraproduct exactly when it is true on almost all coordinates — yielding nonstandard models on demand and a one-line proof of compactness.`,
    definition: String.raw`Let $(M_i)_{i \in I}$ be $\sigma$-structures and $\mathcal{U}$ an **ultrafilter** on $I$. On the product $\prod_{i} |M_i|$ define $f \sim_{\mathcal{U}} g$ iff $\{\,i : f(i) = g(i)\,\} \in \mathcal{U}$; this is an **equivalence relation** (reflexivity from $I \in \mathcal{U}$, symmetry trivially, transitivity since $\mathcal{U}$ is closed under intersection). The **ultraproduct** $\prod_{\mathcal{U}} M_i$ has domain the quotient $(\prod_i |M_i|)/{\sim_{\mathcal{U}}}$, with elements written $[f]$, and interpretations applied coordinatewise on representatives: $c^{\prod_{\mathcal{U}}} = [\,i \mapsto c^{M_i}]$, $f^{\prod_{\mathcal{U}}}([g_1],\dots) = [\,i \mapsto f^{M_i}(g_1(i),\dots)]$, and $R^{\prod_{\mathcal{U}}}([g_1],\dots,[g_n])$ iff $\{\,i : R^{M_i}(g_1(i),\dots,g_n(i))\,\} \in \mathcal{U}$. The ultrafilter property makes each interpretation well defined on $\sim_{\mathcal{U}}$-classes. When all $M_i = M$, the result is the **ultrapower** $M^I/\mathcal{U}$, with a diagonal embedding $a \mapsto [\,i \mapsto a]$.`,
  },
  {
    id: 'los-theorem',
    label: 'Łoś’s Theorem',
    title: "Łoś's Theorem",
    kind: 'theorem',
    tags: ['Model Theory'],
    dependencies: ['ultraproduct', 'satisfaction', 'elementary-embedding', 'choice'],
    description: String.raw`Łoś's theorem (the *fundamental theorem of ultraproducts*) is what makes the ultraproduct worth building: truth in the ultraproduct is decided coordinatewise by majority vote of the ultrafilter. A formula holds of given elements in $\prod_{\mathcal{U}} M_i$ exactly when it holds, on a set of coordinates belonging to $\mathcal{U}$, of any representatives. In particular an ultrapower $M^I/\mathcal{U}$ is always an elementary extension of $M$ — so the diagonal embedding sees no first-order difference — which is the engine behind nonstandard analysis and a slick proof of compactness.`,
    statement: String.raw`Let $\prod_{\mathcal{U}} M_i$ be an ultraproduct. For every formula $\varphi(x_1,\dots,x_n)$ and elements $[g_1],\dots,[g_n]$,
$$\prod_{\mathcal{U}} M_i \models \varphi[\,[g_1],\dots,[g_n]\,] \iff \{\,i \in I : M_i \models \varphi[g_1(i),\dots,g_n(i)]\,\} \in \mathcal{U}.$$
Consequently the diagonal map $M \to M^I/\mathcal{U}$ is an **elementary embedding**: $M \prec M^I/\mathcal{U}$.`,
    proof: String.raw`By induction on $\varphi$; write $\llbracket\varphi\rrbracket = \{\,i : M_i \models \varphi[\bar g(i)]\,\}$. A preliminary term induction (identical in form, using the coordinatewise definition of $f^{\prod_{\mathcal{U}}}$) shows $\{\,i : t^{M_i}[\bar g(i)] = h(i)\,\} \in \mathcal{U}$ for a representative $h$ of the value $[t]$ of each term $t$, so the atomic case reduces to the **ultraproduct** definition: for $R(\bar t)$, $\prod_{\mathcal{U}} M_i \models R[\,\overline{[g]}\,]$ iff $\llbracket R(\bar t)\rrbracket \in \mathcal{U}$ by construction, and likewise for $t_1 = t_2$ via the $\sim_{\mathcal{U}}$ definition.

*Negation.* $\prod_{\mathcal{U}} M_i \models \neg\varphi$ iff $\llbracket\varphi\rrbracket \notin \mathcal{U}$ iff $I \setminus \llbracket\varphi\rrbracket = \llbracket\neg\varphi\rrbracket \in \mathcal{U}$ — this step uses precisely the *ultra*filter dichotomy (for a mere filter only one direction holds). *Conjunction.* $\llbracket\varphi\wedge\psi\rrbracket = \llbracket\varphi\rrbracket \cap \llbracket\psi\rrbracket$, and $\mathcal{U}$ is closed under finite intersection with both members detected iff each is, so the equivalence passes through. The remaining connectives reduce to $\neg, \wedge$.

*Existential.* Suppose $\prod_{\mathcal{U}} M_i \models \exists x\,\psi[\,\overline{[g]}\,]$. Then some $[h]$ witnesses it, so by induction $\{\,i : M_i \models \psi[h(i), \bar g(i)]\,\} \in \mathcal{U}$, and each such $i$ has $M_i \models \exists x\,\psi[\bar g(i)]$; hence $\llbracket\exists x\,\psi\rrbracket \in \mathcal{U}$ by upward closure. Conversely if $\llbracket\exists x\,\psi\rrbracket \in \mathcal{U}$, choose for each $i \in \llbracket\exists x\,\psi\rrbracket$ a witness $h(i) \in |M_i|$ (and $h(i)$ arbitrary otherwise); then $\{\,i : M_i \models \psi[h(i),\bar g(i)]\,\} \supseteq \llbracket\exists x\,\psi\rrbracket \in \mathcal{U}$, so by induction $\prod_{\mathcal{U}} M_i \models \psi[\,[h], \overline{[g]}\,]$, giving $\exists x\,\psi$. (The "$\Leftarrow$" step uses the axiom of choice to assemble $h$.) The universal case is dual via negation.

Finally, for the ultrapower take all $M_i = M$ and $g_k(i) \equiv a_k$ constant: then $\llbracket\varphi\rrbracket$ is $I$ (if $M \models \varphi[\bar a]$) or $\emptyset$, so $\prod_{\mathcal{U}} M \models \varphi[\overline{[a]}]$ iff $M \models \varphi[\bar a]$; that is exactly the elementary-embedding condition for the diagonal map. $\square$`,
  },

  // ── Theories: completeness tests and classification ────────────────────────
  {
    id: 'los-vaught-test',
    label: 'Łoś–Vaught Test',
    title: 'Łoś–Vaught Test',
    kind: 'proposition',
    tags: ['Model Theory'],
    dependencies: ['theory-and-model', 'lowenheim-skolem', 'elementary-equivalence', 'isomorphism-implies-elementary-equivalence'],
    description: String.raw`The Łoś–Vaught test is the standard cheap route to *completeness*: if a theory in a countable language has no finite models and all its models of some fixed infinite size are isomorphic, then the theory is complete. The idea is that incompleteness would split the models into two elementarily inequivalent families; Löwenheim–Skolem shrinks or grows representatives of both families to the categoricity cardinal, where they would have to be isomorphic — hence elementarily equivalent — a contradiction. It is how one proves, for instance, that the theory of dense linear orders without endpoints is complete.`,
    statement: String.raw`Let $T$ be a consistent theory in a countable signature that has no finite models and is **$\kappa$-categorical** for some infinite cardinal $\kappa$ (all models of $T$ of cardinality $\kappa$ are isomorphic). Then $T$ is **complete**.`,
    proof: String.raw`Suppose $T$ were not complete. Then some sentence $\varphi$ is undecided: both $T_1 = T \cup \{\varphi\}$ and $T_2 = T \cup \{\neg\varphi\}$ are consistent, so each has a model $M_1, M_2$. Since $T$ has no finite models, $M_1$ and $M_2$ are infinite. The signature is countable, so by the **Löwenheim–Skolem theorem** (downward to a countably infinite model if $\kappa = \aleph_0$, upward otherwise) each $T_j$ has a model $N_j$ of cardinality exactly $\kappa$. Both $N_1, N_2 \models T$ and have cardinality $\kappa$, so by **$\kappa$-categoricity** $N_1 \cong N_2$, whence $N_1 \equiv N_2$ are **elementarily equivalent**. But $N_1 \models \varphi$ and $N_2 \models \neg\varphi$, so they disagree on $\varphi$ — contradicting elementary equivalence. Hence no such $\varphi$ exists and $T$ is complete. $\square$`,
  },
  {
    id: 'categoricity',
    label: 'Categoricity',
    title: 'Categoricity & Morley’s Theorem',
    kind: 'theorem',
    tags: ['Model Theory'],
    dependencies: ['theory-and-model', 'los-vaught-test', 'cardinal-number'],
    description: String.raw`A theory is **categorical** in a cardinal $\kappa$ when it pins down its $\kappa$-sized model uniquely up to isomorphism. First-order logic can never be categorical across *all* infinite sizes (Löwenheim–Skolem forbids it), but it can be categorical at a particular cardinal — and the Łoś–Vaught test turns such categoricity into completeness. Morley's theorem is the deep surprise: for a countable theory, categoricity in *one* uncountable cardinal already forces categoricity in *every* uncountable cardinal. This dichotomy — countable behaviour can differ, but the uncountable spectrum is all-or-nothing — launched Shelah's classification theory.`,
    statement: String.raw`A theory $T$ is **$\kappa$-categorical** if it has, up to isomorphism, exactly one model of cardinality $\kappa$. **(Łoś–Vaught.)** A consistent theory in a countable language with no finite models that is $\kappa$-categorical for some infinite $\kappa$ is complete. **(Morley's categoricity theorem.)** If $T$ is a countable complete theory that is $\kappa$-categorical for some *uncountable* cardinal $\kappa$, then $T$ is $\lambda$-categorical for *every* uncountable $\lambda$.`,
    proof: String.raw`The completeness clause is exactly the **Łoś–Vaught test** proved above. The transfer clause is **Morley's theorem**, whose full proof lies well beyond this graph; here is an honest sketch naming its deep inputs. One shows uncountable categoricity forces $T$ to be **$\omega$-stable**: it admits only countably many complete types over each countable parameter set — otherwise, by a tree-of-types construction, $T$ would have $2^{\aleph_0}$ pairwise non-isomorphic models in some uncountable power, breaking categoricity. Over an $\omega$-stable theory Morley develops a dimension theory: a notion of **Morley rank** (an ordinal-valued dimension on definable sets) and **strongly minimal** definable sets, on which algebraic closure behaves like linear span and yields a well-defined invariant *dimension*. An uncountably categorical $T$ has a strongly minimal "skeleton" controlling every uncountable model, whose isomorphism type is fixed by a single cardinal dimension; equating dimensions shows all models of a given uncountable cardinality are isomorphic, uniformly in the cardinal. The named external inputs — $\omega$-stability, Morley rank, and strongly minimal sets with their dimension theory — are the precise machinery this graph does not develop. $\square$`,
  },
  {
    id: 'quantifier-elimination',
    label: 'Quantifier Elimination',
    title: 'Quantifier Elimination',
    kind: 'definition',
    tags: ['Model Theory'],
    dependencies: ['theory-and-model', 'definable-set'],
    description: String.raw`A theory has **quantifier elimination** when every formula can be rewritten, provably, into a quantifier-free one — so the definable sets are exactly the Boolean combinations of atomic conditions, with no hidden complexity buried inside quantifiers. This is a structural windfall: definable sets become as transparent as the language's basic relations permit. Algebraically closed fields have it (whence Chevalley's theorem that the image of a constructible set is constructible), and real closed fields have it by Tarski's theorem, which makes the elementary theory of the reals decidable.`,
    definition: String.raw`A theory $T$ in a signature $\sigma$ admits **quantifier elimination** if for every $\sigma$-formula $\varphi(\bar x)$ there is a quantifier-free $\sigma$-formula $\psi(\bar x)$ (in the same free variables) with $T \vdash \forall \bar x\,(\varphi(\bar x) \leftrightarrow \psi(\bar x))$. Equivalently, in every model $M \models T$, every **definable set** is defined by a quantifier-free formula. (For sentences one allows quantifier-free formulas in the constants; if $\sigma$ has no constants one closes off under $\top, \bot$.) A standard criterion reduces this to eliminating a single existential quantifier from $\exists y\,\bigl(\bigwedge_k \ell_k\bigr)$ for conjunctions of literals $\ell_k$.`,
  },

  // ── Nonstandard analysis ───────────────────────────────────────────────────
  {
    id: 'nonstandard-analysis',
    label: 'Nonstandard Analysis',
    title: 'Nonstandard Analysis & Transfer',
    kind: 'theorem',
    tags: ['Model Theory'],
    dependencies: ['los-theorem', 'elementary-embedding', 'real-numbers', 'ordered-field', 'ultrafilter', 'ultraproduct'],
    description: String.raw`Leibniz reasoned with infinitesimals; nonstandard analysis makes that reasoning rigorous. An ultrapower of the real field produces the **hyperreals** $^{*}\mathbb{R}$, a proper ordered field extension of $\mathbb{R}$ containing genuine infinitesimals (nonzero numbers smaller than every $1/n$) and their reciprocals, infinite numbers. The **transfer principle** — Łoś's theorem in disguise — says $\mathbb{R}$ and $^{*}\mathbb{R}$ satisfy exactly the same first-order statements, so every classical theorem transfers, and limits, continuity, and derivatives can be recast as honest algebra of infinitesimals.`,
    statement: String.raw`There is an ordered field $^{*}\mathbb{R}$ with an **elementary embedding** $\mathbb{R} \prec {}^{*}\mathbb{R}$ (the *standard part* of the structure on the real field, in the language of ordered fields with a symbol for each real function and relation), such that $^{*}\mathbb{R} \neq \mathbb{R}$: it contains a nonzero **infinitesimal** $\varepsilon$ with $0 < \varepsilon < 1/n$ for every $n \in \mathbb{N}$, and infinite elements $1/\varepsilon > n$. **Transfer principle:** for every first-order sentence $\varphi$ in this language, $\mathbb{R} \models \varphi \iff {}^{*}\mathbb{R} \models \varphi$.`,
    proof: String.raw`Fix a non-principal **ultrafilter** $\mathcal{U}$ on $\mathbb{N}$ (it exists by the ultrafilter lemma) and form the ultrapower $^{*}\mathbb{R} := \mathbb{R}^{\mathbb{N}}/\mathcal{U}$ of the real field, taken in the full language with a symbol for every relation and function on $\mathbb{R}$. By **Łoś's theorem** the diagonal map $\mathbb{R} \to {}^{*}\mathbb{R}$ is an **elementary embedding**, so $^{*}\mathbb{R}$ is again an ordered field (all the ordered-field axioms are first-order sentences true in $\mathbb{R}$, hence in $^{*}\mathbb{R}$) and the transfer principle is precisely the sentence case of Łoś's equivalence, $\mathbb{R} \models \varphi \iff {}^{*}\mathbb{R} \models \varphi$.

It remains to exhibit an infinitesimal, i.e. to see the embedding is proper. Let $\varepsilon = [\,n \mapsto 1/n\,] \in {}^{*}\mathbb{R}$. For each fixed $k \in \mathbb{N}$, the set $\{\,n : 0 < 1/n < 1/k\,\} = \{\,n : n > k\,\}$ is cofinite, hence in the non-principal $\mathcal{U}$; so by Łoś's theorem $^{*}\mathbb{R} \models 0 < \varepsilon < 1/k$. Thus $\varepsilon$ is a positive number below every standard $1/k$ — a nonzero infinitesimal — and $1/\varepsilon = [\,n \mapsto n\,]$ exceeds every standard $k$, an infinite element. In particular $\varepsilon \notin \mathbb{R}$ (no positive real is below all $1/k$), so $^{*}\mathbb{R} \neq \mathbb{R}$. The non-principality of $\mathcal{U}$ is exactly what makes the diagonal $\{n : 1/n = r\}$ small for every real $r$, forcing $\varepsilon$ to be new. $\square$`,
  },
]

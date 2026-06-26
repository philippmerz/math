import type { MathNode } from '../types'

export const LOGIC_NODES: MathNode[] = [
  // ── Propositional logic ────────────────────────────────────────────────────
  {
    id: 'proposition',
    label: 'Proposition',
    title: 'Proposition',
    kind: 'primitive',
    tags: ['Logic'],
    dependencies: [],
    description: String.raw`A **proposition** is a declarative statement that, on the classical (bivalent) view, has exactly one truth value — true or false — the atomic unit of logic. Its internal content is abstracted away; only its truth value matters. Compound statements are assembled from propositions with connectives, and logic studies which compounds must hold. As the starting primitive it is described, never defined.`,
  },
  {
    id: 'logical-connectives',
    label: 'Logical Connectives',
    title: 'Logical Connectives',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['proposition'],
    description: String.raw`**Logical connectives** build compound propositions: negation $\neg P$, conjunction $P \wedge Q$, disjunction $P \vee Q$, implication $P \rightarrow Q$, and the biconditional $P \leftrightarrow Q$. Each is *truth-functional* — the truth value of the whole is fixed by those of its parts — and from them every propositional formula is built up.`,
    definition: String.raw`The **connectives** are the unary $\neg$ and the binary $\wedge, \vee, \rightarrow, \leftrightarrow$. Fixing a set of **atomic** propositions, the **formulas** of propositional logic are generated inductively: every atom is a formula, and if $\varphi$ and $\psi$ are formulas then so are $\neg\varphi$, $(\varphi \wedge \psi)$, $(\varphi \vee \psi)$, $(\varphi \rightarrow \psi)$, and $(\varphi \leftrightarrow \psi)$; nothing else is a formula.`,
  },
  {
    id: 'truth-table',
    label: 'Truth Table',
    title: 'Truth Values & Tables',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['logical-connectives'],
    description: String.raw`A **truth table** lists the truth value of a compound proposition for every combination of values of its components — giving the connectives their precise two-valued meaning. So $P \wedge Q$ is true only when both are, while $P \rightarrow Q$ is false only when $P$ is true and $Q$ false.`,
    definition: String.raw`A **truth assignment** (valuation) is a function $v$ from the atoms to $\{\mathrm{T}, \mathrm{F}\}$. It extends uniquely to all formulas by the connective clauses: $v(\neg\varphi) = \mathrm{T}$ iff $v(\varphi) = \mathrm{F}$; $v(\varphi \wedge \psi) = \mathrm{T}$ iff both are $\mathrm{T}$; $v(\varphi \vee \psi) = \mathrm{T}$ iff at least one is; $v(\varphi \rightarrow \psi) = \mathrm{F}$ iff $v(\varphi) = \mathrm{T}$ and $v(\psi) = \mathrm{F}$; $v(\varphi \leftrightarrow \psi) = \mathrm{T}$ iff $v(\varphi) = v(\psi)$. A **truth table** tabulates this over all $2^n$ assignments to the $n$ atoms.`,
  },
  {
    id: 'tautology',
    label: 'Tautology',
    title: 'Tautology',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['truth-table'],
    description: String.raw`A **tautology** is a compound proposition true under *every* assignment of truth values to its components — true by form alone, like $P \vee \neg P$ or $(P \wedge (P \rightarrow Q)) \rightarrow Q$. Tautologies are the validities of propositional logic; their predicate-logic counterparts are the logical truths.`,
    definition: String.raw`A formula $\varphi$ is a **tautology** (propositionally valid) if $v(\varphi) = \mathrm{T}$ for every truth assignment $v$; **satisfiable** if $v(\varphi) = \mathrm{T}$ for some $v$; and a **contradiction** if for none. Thus $\varphi$ is a tautology iff $\neg\varphi$ is a contradiction, and $\varphi$ is satisfiable iff it is not a contradiction.`,
  },
  {
    id: 'logical-equivalence',
    label: 'Logical Equivalence',
    title: 'Logical Equivalence',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['tautology'],
    description: String.raw`Two formulas are **logically equivalent** when they share a truth value under every assignment — interchangeable in any context. The basic equivalences — double negation, the **De Morgan laws** $\neg(P \wedge Q) \equiv \neg P \vee \neg Q$, distributivity, and $P \rightarrow Q \equiv \neg P \vee Q$ — let any formula be rewritten, for instance into a normal form.`,
    definition: String.raw`Formulas $\varphi$ and $\psi$ are **logically equivalent**, written $\varphi \equiv \psi$, when $v(\varphi) = v(\psi)$ for every truth assignment $v$ — equivalently, when $\varphi \leftrightarrow \psi$ is a tautology. Equivalence is a congruence: substituting a subformula by an equivalent one leaves the truth value of the whole unchanged.`,
  },
  {
    id: 'law-of-noncontradiction',
    label: 'Non-Contradiction',
    title: 'Law of Non-Contradiction',
    kind: 'proposition',
    tags: ['Logic'],
    dependencies: ['tautology'],
    description: String.raw`No proposition is both true and false: $\neg(P \wedge \neg P)$. A tautology of classical logic — and, unlike Excluded Middle, a theorem of intuitionistic logic too — it is, with Excluded Middle, one of the classical "laws of thought."`,
    statement: String.raw`For every proposition $P$, the formula $\neg(P \wedge \neg P)$ is a tautology.`,
    proof: String.raw`By truth table on the single atom $P$. If $v(P) = \mathrm{T}$ then $v(\neg P) = \mathrm{F}$, so $v(P \wedge \neg P) = \mathrm{F}$ and $v(\neg(P \wedge \neg P)) = \mathrm{T}$. If $v(P) = \mathrm{F}$ then $v(P \wedge \neg P) = \mathrm{F}$ as well, again giving $\mathrm{T}$. True under both assignments, the formula is a tautology. It is moreover an *intuitionistic* theorem — shown not by the table (a two-valued table establishes only classical validity) but by a direct constructive derivation: assume $P \wedge \neg P$; then both $P$ and $\neg P$ hold, and since $\neg P$ abbreviates $P \rightarrow \bot$, modus ponens gives $\bot$; discharging the assumption yields $\neg(P \wedge \neg P)$. This uses no excluded middle, which is why — unlike $P \vee \neg P$ — it survives in constructive logic. $\square$`,
  },
  {
    id: 'law-of-excluded-middle',
    label: 'Excluded Middle',
    title: 'Law of Excluded Middle',
    kind: 'proposition',
    tags: ['Logic'],
    dependencies: ['tautology'],
    description: String.raw`The **law of excluded middle** says every proposition holds or its negation does — no third option: $P \vee \neg P$. It is the characteristic principle of *classical* logic; dropping it gives **intuitionistic** (constructive) logic, where asserting a disjunction demands a proof of one side — a fundamental fork in the foundations of mathematics.`,
    statement: String.raw`For every proposition $P$, the formula $P \vee \neg P$ is a tautology of classical (two-valued) logic.`,
    proof: String.raw`By truth table, in the two-valued semantics. If $v(P) = \mathrm{T}$ then $v(P \vee \neg P) = \mathrm{T}$; if $v(P) = \mathrm{F}$ then $v(\neg P) = \mathrm{T}$, so $v(P \vee \neg P) = \mathrm{T}$ again. True under every assignment, it is a tautology. The proof leans on bivalence — that every atom is assigned $\mathrm{T}$ or $\mathrm{F}$. **Intuitionistic** logic, reading $\vee$ constructively, does not derive $P \vee \neg P$; it is precisely this principle that separates classical from constructive reasoning. $\square$`,
  },

  // ── First-order syntax ─────────────────────────────────────────────────────
  {
    id: 'predicate',
    label: 'Predicate',
    title: 'Predicate',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['proposition'],
    description: String.raw`A **predicate** is a proposition-valued function — a statement with free variables, such as $x > 0$ or "$x$ is prime," whose truth value is fixed once the variables are assigned. Substituting specific objects yields propositions; binding the variables with quantifiers yields statements about a whole domain.`,
    definition: String.raw`A **predicate** (relation symbol) of arity $n$ is interpreted, over a domain $D$, as an $n$-ary relation $R \subseteq D^n$. Applied to $n$ terms it forms an **atomic formula** $P(t_1, \dots, t_n)$, true exactly when the tuple of values of the terms lies in $R$. A $0$-ary predicate is a proposition; a unary one names a property of elements.`,
  },
  {
    id: 'quantifiers',
    label: 'Quantifiers',
    title: 'Quantifiers (∀, ∃)',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['predicate'],
    description: String.raw`**Quantifiers** turn a predicate into a proposition by binding its variable over a domain: the universal $\forall x\,P(x)$ ("$P$ holds for all $x$") and the existential $\exists x\,P(x)$ ("$P$ holds for some $x$"). They are dual, exchanged by negation: $\neg\forall x\,P(x) \equiv \exists x\,\neg P(x)$.`,
    definition: String.raw`The **quantifiers** bind a variable in a formula: $\forall x\,\varphi$ holds in a domain when $\varphi$ holds for every value of $x$, and $\exists x\,\varphi$ when it holds for some value. They are interdefinable through negation,
$$\neg \forall x\,\varphi \equiv \exists x\,\neg\varphi, \qquad \neg \exists x\,\varphi \equiv \forall x\,\neg\varphi, \qquad \exists x\,\varphi \equiv \neg\forall x\,\neg\varphi.$$`,
  },
  {
    id: 'free-and-bound-variables',
    label: 'Free & Bound Variables',
    title: 'Free & Bound Variables',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['quantifiers'],
    description: String.raw`A variable occurrence is **bound** when it lies in the scope of a quantifier on that variable, and **free** otherwise — the same variable can occur both ways. A formula with no free variables is a **sentence**: it has a definite truth value in a structure, whereas a formula with free variables expresses a property of its free variables.`,
    definition: String.raw`In $\forall x\,\varphi$ and $\exists x\,\varphi$ the quantifier **binds** every free occurrence of $x$ within $\varphi$; an occurrence bound by no quantifier is **free**. A **sentence** is a formula with no free variables. The **substitution** $\varphi[t/x]$ replaces each free occurrence of $x$ by the term $t$, first renaming bound variables of $\varphi$ so that no variable occurring in $t$ becomes bound (capture-avoidance).`,
  },
  {
    id: 'first-order-logic',
    label: 'First-Order Logic',
    title: 'First-Order Logic',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['quantifiers', 'logical-connectives', 'free-and-bound-variables'],
    description: String.raw`**First-order logic** is the standard formal language for mathematics: over a **signature** of constant, function, and relation symbols it builds terms and formulas using the connectives, the quantifiers $\forall, \exists$ over individual variables, and equality $=$. "First-order" means quantification ranges over elements of the domain, not over its subsets or predicates. ZFC and Tarski's geometry are first-order theories.`,
    definition: String.raw`Fix a **signature** $\sigma$ of constant, function, and relation symbols with arities. **Terms** are generated from variables and constants by applying function symbols. **Atomic formulas** are $t_1 = t_2$ and $R(t_1, \dots, t_n)$ for an $n$-ary relation symbol $R$ and terms $t_i$. **Formulas** are generated from atomic ones by the connectives $\neg, \wedge, \vee, \rightarrow, \leftrightarrow$ and the quantifiers $\forall x, \exists x$ over individual variables. A first-order **theory** is a set of sentences over $\sigma$.`,
  },
  {
    id: 'logical-consequence',
    label: 'Logical Consequence',
    title: 'Logical Consequence (⊨)',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['first-order-logic', 'satisfaction'],
    description: String.raw`**Logical consequence** (semantic entailment) is truth-preservation across all interpretations: $\varphi$ follows from $\Gamma$ when every structure that makes all of $\Gamma$ true also makes $\varphi$ true. A **valid** sentence (logical truth) is one true in every structure — the consequence of the empty set. This is the *meaning* side of logic, against which a proof system is measured.`,
    definition: String.raw`Write $\Gamma \models \varphi$ when every structure $M$ that satisfies every sentence of $\Gamma$ also satisfies $\varphi$, where satisfaction $M \models \psi$ is Tarski's truth definition. Then $\varphi$ is **valid**, $\models \varphi$, when it holds in every structure, and $\Gamma$ is **satisfiable** when some structure satisfies all of $\Gamma$. (So $\Gamma \models \varphi$ iff $\Gamma \cup \{\neg\varphi\}$ is unsatisfiable.)`,
  },

  // ── Proof theory ───────────────────────────────────────────────────────────
  {
    id: 'modus-ponens',
    label: 'Modus Ponens',
    title: 'Modus Ponens',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['logical-connectives'],
    description: String.raw`**Modus ponens** is the primary rule of inference: from $P$ and $P \rightarrow Q$, infer $Q$. It is the engine that drives derivations forward in a Hilbert-style proof system.`,
    definition: String.raw`**Modus ponens** is the inference rule
$$\frac{\varphi \qquad \varphi \rightarrow \psi}{\psi},$$
permitting the passage from premises $\varphi$ and $\varphi \rightarrow \psi$ to the conclusion $\psi$. In a Hilbert-style first-order system it is the sole propositional rule, used alongside **generalization** (from $\varphi$ infer $\forall x\,\varphi$) for the quantifiers.`,
  },
  {
    id: 'formal-proof',
    label: 'Formal Proof',
    title: 'Formal Proof & Derivability (⊢)',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['modus-ponens', 'first-order-logic'],
    description: String.raw`A **formal proof** is a finite, purely syntactic derivation: a sequence of formulas, each a logical axiom, a premise, or a consequence of earlier ones by an inference rule. Writing $\Gamma \vdash \varphi$ when such a derivation exists makes "provable" a mechanical, checkable notion — the *syntax* side of logic, complementary to semantic consequence.`,
    definition: String.raw`Fix a system of **logical axiom** schemes (governing the connectives, quantifiers, and equality) together with the rules **modus ponens** and **generalization**. A **derivation** of $\varphi$ from a set $\Gamma$ of **sentences** is a finite sequence $\varphi_1, \dots, \varphi_n = \varphi$ in which each $\varphi_i$ is a logical axiom, a member of $\Gamma$, or obtained from earlier entries by a rule (generalization applied only to variables not free in the premises, which keeps $\vdash$ sound); one then writes $\Gamma \vdash \varphi$. The set $\Gamma$ is **consistent** if $\Gamma \nvdash \bot$ — it derives no contradiction.`,
  },
  {
    id: 'soundness-theorem',
    label: 'Soundness',
    title: 'Soundness Theorem',
    kind: 'theorem',
    tags: ['Logic'],
    dependencies: ['formal-proof', 'logical-consequence'],
    description: String.raw`**Soundness** guarantees the proof system proves only truths: anything derivable from $\Gamma$ is a genuine semantic consequence of $\Gamma$. It is the easy and indispensable half of the match between syntax and semantics — without it, formal provability would carry no meaning.`,
    statement: String.raw`For first-order logic, if $\Gamma \vdash \varphi$ then $\Gamma \models \varphi$.`,
    proof: String.raw`By induction on the length of a derivation of $\varphi$ from $\Gamma$, showing every line is satisfied in an arbitrary model $M$ of $\Gamma$.

**Base.** Each logical axiom is **valid** — true in every structure under every variable assignment — as one checks scheme by scheme; and each member of $\Gamma$ is satisfied in $M$ because $M$ is a model of $\Gamma$.

**Inductive step.** The rules preserve satisfaction in $M$. If $M \models \varphi$ and $M \models \varphi \rightarrow \psi$, then by the truth clause for $\rightarrow$, $M \models \psi$ (modus ponens). If $M \models \varphi$ under every assignment to its free variables, then $M \models \forall x\,\varphi$ (generalization).

Hence every line of the derivation, in particular $\varphi$, is satisfied in every model of $\Gamma$; that is, $\Gamma \models \varphi$. $\square$`,
  },
  {
    id: 'lindenbaum-lemma',
    label: 'Lindenbaum’s Lemma',
    title: "Lindenbaum's Lemma",
    kind: 'lemma',
    tags: ['Logic'],
    dependencies: ['formal-proof', 'zorns-lemma'],
    description: String.raw`**Lindenbaum's lemma** says every consistent set of sentences extends to a *maximal* consistent one — a complete theory deciding every sentence. It is the key extension step in Henkin's proof of completeness, turning a bare consistent theory into one rich enough to read a model off of.`,
    statement: String.raw`Every consistent set of sentences $\Gamma$ extends to a **maximal consistent** set $\Gamma^* \supseteq \Gamma$: a consistent set such that for every sentence $\varphi$, exactly one of $\varphi$, $\neg\varphi$ belongs to $\Gamma^*$.`,
    proof: String.raw`Order the consistent sets of sentences extending $\Gamma$ by inclusion. The union of a chain of such sets is consistent: a derivation of a contradiction is finite, so it would already be a derivation from one member of the chain, contradicting that member's consistency. Thus every chain has an upper bound, and **Zorn's lemma** provides a maximal element $\Gamma^* \supseteq \Gamma$.

Maximality forces completeness. For any sentence $\varphi$, at least one of $\Gamma^* \cup \{\varphi\}$, $\Gamma^* \cup \{\neg\varphi\}$ is consistent — otherwise $\Gamma^* \vdash \neg\varphi$ and $\Gamma^* \vdash \varphi$, making $\Gamma^*$ inconsistent. By maximality the consistent one equals $\Gamma^*$, so $\Gamma^*$ contains $\varphi$ or $\neg\varphi$; consistency forbids both. (For a countable language one may instead enumerate the sentences and add each or its negation in turn, avoiding any appeal to choice.) $\square$`,
  },
  {
    id: 'godel-completeness',
    label: 'Gödel Completeness',
    title: "Gödel's Completeness Theorem",
    kind: 'theorem',
    tags: ['Logic'],
    dependencies: ['soundness-theorem', 'lindenbaum-lemma', 'satisfaction'],
    description: String.raw`Gödel's completeness theorem closes the gap between proof and truth in first-order logic: provability and semantic consequence coincide, $\Gamma \vdash \varphi \Leftrightarrow \Gamma \models \varphi$. Equivalently, every consistent theory has a model. It certifies that the finite, mechanical proof system captures *all* of first-order validity.`,
    statement: String.raw`For first-order logic, $\Gamma \vdash \varphi$ if and only if $\Gamma \models \varphi$. Equivalently: every consistent set of sentences has a model.`,
    proof: String.raw`The forward direction is **soundness**. For the converse it suffices to prove the model-existence form — every consistent $\Gamma$ has a model — since if $\Gamma \nvdash \varphi$ then $\Gamma \cup \{\neg\varphi\}$ is consistent, and a model of it witnesses $\Gamma \not\models \varphi$.

So let $\Gamma$ be consistent. Build a **Henkin extension**: enlarge the language with a fresh constant $c_{\exists x\,\psi}$ for every existential sentence and add the witness axiom $\exists x\,\psi \rightarrow \psi[c_{\exists x\,\psi}/x]$. Each round adds $|L|$ constants and preserves consistency — a contradiction would use only finitely many witness axioms, which can be discharged back into $\Gamma$ — so iterating $\omega$ times and taking the union gives a still-consistent theory, over a language of the same cardinality, in which *every* existential sentence has a witness. By **Lindenbaum's lemma**, extend it to a maximal consistent (hence Henkin-complete) theory $\Gamma^*$.

Build the **term model** $M$: its domain is the set of closed terms modulo $t \sim t'$ iff $(t = t') \in \Gamma^*$. The equality axioms make $\sim$ a **congruence** — an equivalence compatible with every function and relation symbol — so interpreting each symbol on $\sim$-classes is well defined. A **truth-lemma** induction then shows $M \models \varphi \Leftrightarrow \varphi \in \Gamma^*$ for every sentence $\varphi$: the atomic case is the definition of $M$, the Boolean cases ($\neg, \wedge, \vee, \rightarrow$) come from maximal consistency, and the quantifier cases ($\exists$, and dually $\forall$) from the Henkin witnesses. Hence $M \models \Gamma^* \supseteq \Gamma$, so $\Gamma$ has a model. $\square$`,
  },
  {
    id: 'compactness-theorem',
    label: 'Compactness Theorem',
    title: 'Compactness Theorem',
    kind: 'corollary',
    tags: ['Logic'],
    dependencies: ['godel-completeness'],
    description: String.raw`A set of first-order sentences has a model if and only if every *finite* subset does. A corollary of completeness (because proofs are finite), it is the workhorse of model theory — building infinite models from finite consistency, and yielding non-standard models of arithmetic and analysis.`,
    statement: String.raw`A set $\Gamma$ of first-order sentences has a model if and only if every finite subset of $\Gamma$ has a model.`,
    proof: String.raw`If $\Gamma$ has a model, that structure satisfies every subset, so in particular each finite subset has a model.

Conversely, suppose $\Gamma$ has no model. By the model-existence form of **Gödel completeness**, $\Gamma$ is then inconsistent, so $\Gamma \vdash \bot$. A derivation is **finite**, hence uses only finitely many sentences $\Gamma_0 \subseteq \Gamma$; thus $\Gamma_0 \vdash \bot$, and by **soundness** $\Gamma_0$ has no model. Contrapositively, if every finite subset of $\Gamma$ has a model, then $\Gamma$ has a model. $\square$`,
  },
  {
    id: 'lowenheim-skolem',
    label: 'Löwenheim–Skolem',
    title: 'Löwenheim–Skolem Theorem',
    kind: 'theorem',
    tags: ['Logic'],
    dependencies: ['godel-completeness', 'compactness-theorem', 'cardinality'],
    description: String.raw`A countable first-order theory with an infinite model has models of *every* infinite cardinality. First-order logic thus cannot pin down the size of an infinite structure — the source of *Skolem's paradox*: set theory proves uncountable sets exist, yet itself has countable models.`,
    statement: String.raw`A theory in a countable first-order language with an infinite model has a countable model (**downward**) and a model of every infinite cardinality $\kappa$ (**upward**).`,
    proof: String.raw`**Downward.** The Henkin term model built in the proof of completeness has as domain a quotient of the closed terms; a language of cardinality $\lambda \ge \aleph_0$ has at most $\lambda$ closed terms (only $\lambda$ finite strings of symbols exist), so the model has cardinality $\le \lambda$. To get a countably *infinite* model of a countable theory $T$ that has an infinite model, adjoin the sentences $\lambda_n :\equiv \exists x_1 \cdots \exists x_n \bigwedge_{i < j} x_i \neq x_j$ ("at least $n$ elements"): each holds in that infinite model, so $T \cup \{\lambda_n : n \ge 1\}$ is consistent, and its countable term model satisfies every $\lambda_n$, hence is countably infinite.

**Upward.** Fix an infinite cardinal $\kappa$. Adjoin $\kappa$ fresh constants $\{c_\alpha : \alpha < \kappa\}$ with the axioms $c_\alpha \neq c_\beta$ for $\alpha \neq \beta$. Each finite subset of the enlarged theory uses finitely many constants and is satisfied in the given infinite model by interpreting them as distinct elements, so by **compactness** the enlarged theory is consistent. Its Henkin term model lives over a language of cardinality $\kappa$, hence has at most $\kappa$ elements, while the distinctness axioms force at least $\kappa$; so it has cardinality exactly $\kappa$ and models $T$. $\square$`,
  },

  // ── Incompleteness ─────────────────────────────────────────────────────────
  {
    id: 'godel-numbering',
    label: 'Gödel Numbering',
    title: 'Gödel Numbering & Arithmetization',
    kind: 'definition',
    tags: ['Logic'],
    dependencies: ['first-order-logic', 'natural-numbers'],
    description: String.raw`**Gödel numbering** assigns a natural number to every symbol, formula, and proof, so that syntax becomes arithmetic: "is a formula," "is a proof of," and substitution turn into arithmetical relations on the codes. Because these relations are computable, they can be *expressed inside* any theory containing a little arithmetic — the device that lets a theory talk about its own sentences.`,
    definition: String.raw`A **Gödel numbering** is an effective injection $\ulcorner \cdot \urcorner$ from expressions — symbols, terms, formulas, and finite sequences of formulas — into $\mathbb{N}$, with computable inverse; writing $\overline{m}$ for the **numeral** of $m \in \mathbb{N}$, an expression $e$ is named inside the language by the closed term $\overline{\ulcorner e \urcorner}$. Under the coding the basic syntactic relations are primitive recursive: "codes a formula," the substitution function, and the **proof predicate** $\mathrm{Prf}_T(p, n)$ ("$p$ codes a $T$-derivation of the formula with code $n$"). A primitive recursive relation is **represented** by a formula in any consistent theory $T$ extending Robinson arithmetic $Q$, so $T$ can refer to its own syntax.`,
  },
  {
    id: 'diagonal-lemma',
    label: 'Diagonal Lemma',
    title: 'Diagonal (Fixed-Point) Lemma',
    kind: 'lemma',
    tags: ['Logic'],
    dependencies: ['godel-numbering'],
    description: String.raw`The **diagonal lemma** is the self-reference engine: for any property of sentences expressible in the theory, there is a sentence asserting that this property holds of *itself*. It lets one build a sentence that says "I am not provable" — the heart of Gödel's incompleteness theorems, and of Tarski's undefinability of truth.`,
    statement: String.raw`Let $T$ extend Robinson arithmetic. For every formula $\varphi(x)$ with one free variable there is a sentence $\sigma$ with
$$T \vdash \sigma \leftrightarrow \varphi(\overline{\ulcorner \sigma \urcorner}),$$
where $\overline{\ulcorner \sigma \urcorner}$ is the numeral of $\sigma$'s code.`,
    proof: String.raw`Substitution is primitive recursive, so by the **Gödel numbering** it is **represented** in $T$ by a formula $\mathrm{Diag}(x, y)$ capturing the function $d$ with $d(\ulcorner \psi(x) \urcorner) = \ulcorner \psi(\overline{\ulcorner \psi(x) \urcorner}) \urcorner$ (substitute a formula's own code-numeral for its free variable): for every $m$, $T \vdash \forall y\,\bigl(\mathrm{Diag}(\overline{m}, y) \leftrightarrow y = \overline{d(m)}\bigr)$. Given $\varphi(x)$, set $\theta(x) :\equiv \exists y\,(\mathrm{Diag}(x, y) \wedge \varphi(y))$, let $m = \ulcorner \theta(x) \urcorner$, and put $\sigma :\equiv \theta(\overline{m})$. Then $d(m) = \ulcorner \theta(\overline{m}) \urcorner = \ulcorner \sigma \urcorner$, so $T \vdash \mathrm{Diag}(\overline{m}, y) \leftrightarrow y = \overline{\ulcorner \sigma \urcorner}$; substituting into $\theta(\overline{m})$ collapses the existential to $\varphi(\overline{\ulcorner \sigma \urcorner})$, giving $T \vdash \sigma \leftrightarrow \varphi(\overline{\ulcorner \sigma \urcorner})$. $\square$`,
  },
  {
    id: 'godel-incompleteness',
    label: 'Gödel Incompleteness',
    title: "Gödel's Incompleteness Theorems",
    kind: 'theorem',
    tags: ['Logic'],
    dependencies: ['diagonal-lemma', 'formal-proof'],
    description: String.raw`Any consistent, effectively axiomatized theory strong enough to encode arithmetic has a true statement it cannot prove (**first**); and no such theory that can formalize its own provability can prove its own consistency (**second**). They set hard limits on formalization, ending Hilbert's program of a complete, self-certifying foundation for mathematics.`,
    statement: String.raw`Let $T$ be a consistent, recursively axiomatized theory extending Robinson arithmetic, with provability predicate $\mathrm{Prov}_T$. **(First)** There is a sentence $G_T$, true in the standard model $\mathbb{N}$, with $T \nvdash G_T$; if $T$ is $\omega$-consistent then also $T \nvdash \neg G_T$. Hence $T$ is incomplete — and by **Rosser's** refinement, using a modified self-referential sentence, mere consistency already suffices for incompleteness. **(Second)** If moreover $T$ extends $\mathsf{PA}$ — so that $T$ satisfies the Hilbert–Bernays–Löb derivability conditions — then $T \nvdash \mathrm{Con}(T)$.`,
    proof: String.raw`**First.** Apply the **diagonal lemma** to the formula $\neg\,\mathrm{Prov}_T(x)$ (where $\mathrm{Prov}_T(x) :\equiv \exists p\,\mathrm{Prf}_T(p, x)$), obtaining a sentence $G_T$ with $T \vdash G_T \leftrightarrow \neg\,\mathrm{Prov}_T(\overline{\ulcorner G_T \urcorner})$ — informally, "$G_T$ is not provable." Suppose $T \vdash G_T$. Then some number $p$ codes a derivation of $G_T$, so $\mathrm{Prf}_T(\overline{p}, \overline{\ulcorner G_T \urcorner})$ is true and, the proof predicate being representable, $T \vdash \mathrm{Prov}_T(\overline{\ulcorner G_T \urcorner})$; with the fixed point this gives $T \vdash \neg G_T$, contradicting consistency. So $T \nvdash G_T$ — whence $G_T$ is true in $\mathbb{N}$. That $T \nvdash \neg G_T$ uses $\omega$-consistency (Gödel) or a modified self-referential sentence (Rosser).

**Second.** Assuming $T \supseteq \mathsf{PA}$, the reasoning "if $T$ is consistent then $G_T$ is unprovable" can itself be carried out inside $T$ — this is what the **derivability conditions** secure — yielding $T \vdash \mathrm{Con}(T) \rightarrow G_T$. If $T \vdash \mathrm{Con}(T)$ then $T \vdash G_T$, contradicting the first theorem; therefore $T \nvdash \mathrm{Con}(T)$. Through the representable proof predicate, these limits are the logical twin of the undecidability of the halting problem. $\square$`,
  },
]

import type { MathNode } from '../types'

/** Logic — 10 nodes. */
export const LOGIC_NODES: MathNode[] = [
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
]

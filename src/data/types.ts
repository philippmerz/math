/**
 * The categories of mathematical content. `definition` names a *kind of
 * statement* (not an object), like `axiom`; the last four are all proven
 * statements that differ only in role (see {@link ProvenNode}). Ordered
 * foundational → derived.
 */
export type NodeKind =
  | 'primitive'
  | 'axiom'
  | 'definition'
  | 'lemma'
  | 'proposition'
  | 'theorem'
  | 'corollary'

/** Fields shared by every node, whatever its kind. */
interface BaseNode {
  /** Stable, URL-safe identifier; also the React Flow node id. */
  id: string
  /** Short label drawn inside the graph node. */
  label: string
  /** Full title shown in the panel header. */
  title: string
  /** Mathematical area(s) this concept belongs to, used for filtering. */
  tags: string[]
  /** ids of the prerequisite concepts this one is built from. */
  dependencies: string[]
  /**
   * The informal overview, present on every node: motivation, intuition, and a
   * natural-language definition or statement — the primary explanatory field.
   * Markdown with LaTeX (`$…$`, `$$…$$`).
   */
  description: string
}

/** A primitive (undefined) notion — described informally, never formally defined. */
export interface PrimitiveNode extends BaseNode {
  kind: 'primitive'
}

/** An axiom: a statement asserted without proof — though one may optionally show
 *  it is in fact derivable from the others (e.g. Separation from Replacement). */
export interface AxiomNode extends BaseNode {
  kind: 'axiom'
  /** The formal statement of the axiom. Markdown with LaTeX. */
  statement: string
  /** Optional derivation, when the axiom is actually provable from the others. */
  proof?: string
}

/** A definition: introduces an object/concept via its rigorous formal definition. */
export interface DefinitionNode extends BaseNode {
  kind: 'definition'
  /** The rigorous formal definition, in careful-textbook style. Markdown with LaTeX. */
  definition: string
  /** Optional well-definedness / existence proof for the defined object. */
  proof?: string
}

/**
 * A proven statement. Theorem, lemma, corollary, and proposition are all
 * fundamentally the same — a `statement` and its `proof` — and share this one
 * shape, differing only by `kind`, which marks the role in the chain: a *lemma*
 * is an auxiliary step, a *proposition* a minor standalone result, a *theorem* a
 * milestone, a *corollary* an easy consequence of one.
 */
export interface ProvenNode extends BaseNode {
  kind: 'theorem' | 'lemma' | 'proposition' | 'corollary'
  /** The formal statement. Markdown with LaTeX. */
  statement: string
  /** A proof of the statement within the ambient theory. Markdown with LaTeX. */
  proof: string
}

/**
 * A single concept in the knowledge graph, discriminated by `kind`. The graph is
 * the set of all `MathNode`s; the edges are induced by `dependencies` (which
 * gathers everything the node is directly based on — concepts, axioms, and the
 * lemmas/results its proof leans on).
 */
export type MathNode = PrimitiveNode | AxiomNode | DefinitionNode | ProvenNode

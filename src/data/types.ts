/**
 * The four classical categories of mathematical content. Like `axiom` and
 * `theorem`, `definition` names a *kind of statement*, not an object — so it sits
 * naturally alongside the others.
 */
export type NodeKind = 'primitive' | 'axiom' | 'definition' | 'theorem'

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

/** A theorem: a formal statement together with its proof. */
export interface TheoremNode extends BaseNode {
  kind: 'theorem'
  /** The formal statement of the theorem. Markdown with LaTeX. */
  statement: string
  /** A proof of the statement within the ambient theory. Markdown with LaTeX. */
  proof: string
}

/**
 * A single concept in the knowledge graph, discriminated by `kind`. The graph is
 * the set of all `MathNode`s; the edges are induced by `dependencies`.
 */
export type MathNode = PrimitiveNode | AxiomNode | DefinitionNode | TheoremNode

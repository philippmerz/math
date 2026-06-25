/** The kind of mathematical object a node represents. */
export type NodeKind = 'primitive' | 'axiom' | 'definition' | 'theorem'

/**
 * A single concept in the knowledge graph. The graph is the set of all
 * `MathNode`s; the edges are induced by `dependencies`.
 */
export interface MathNode {
  /** Stable, URL-safe identifier; also the React Flow node id. */
  id: string
  /** Short label drawn inside the graph node. */
  label: string
  /** Full title shown in the definition panel header. */
  title: string
  kind: NodeKind
  /** Mathematical area(s) this concept belongs to, used for filtering. */
  tags: string[]
  /** ids of the prerequisite concepts this one is built from. */
  dependencies: string[]
  /** Concise definition as Markdown with LaTeX math (`$…$`, `$$…$$`). */
  definition: string
}

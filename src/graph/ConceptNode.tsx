import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { ConceptNode as ConceptNodeType } from './layout'

/** Renders a single concept box. Handles are hidden but anchor the edges. */
export function ConceptNode({ data, selected }: NodeProps<ConceptNodeType>) {
  const { expand } = data
  return (
    <div className={`concept-node${selected ? ' is-selected' : ''}`}>
      <Handle type="target" position={Position.Top} isConnectable={false} />
      <span className="concept-node__label">{data.label}</span>
      {expand && (
        <button
          type="button"
          className="concept-node__badge"
          aria-label={
            expand.expanded
              ? 'Hide constructions'
              : `Show ${expand.count} equivalent constructions`
          }
          title={
            expand.expanded
              ? 'Hide constructions'
              : `Show ${expand.count} equivalent constructions`
          }
          // Stop the click from selecting the node / opening its panel.
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation()
            expand.onToggle()
          }}
        >
          {expand.expanded ? '−' : `+${expand.count}`}
        </button>
      )}
      <Handle type="source" position={Position.Bottom} isConnectable={false} />
    </div>
  )
}

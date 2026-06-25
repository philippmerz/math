import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { ConceptNode as ConceptNodeType } from './layout'

/** Renders a single concept box. Handles are hidden but anchor the edges. */
export function ConceptNode({ data, selected }: NodeProps<ConceptNodeType>) {
  return (
    <div className={`concept-node${selected ? ' is-selected' : ''}`}>
      <Handle type="target" position={Position.Top} isConnectable={false} />
      <span className="concept-node__label">{data.label}</span>
      <Handle type="source" position={Position.Bottom} isConnectable={false} />
    </div>
  )
}

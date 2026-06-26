import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'
import type { MathNode } from '../data/types'
import { dependentsById, nodeById } from '../data/graph'
import { AreaTag } from './AreaTag'

// Module-scope so the plugin arrays keep a stable identity across renders.
const remarkPlugins = [remarkMath]
const rehypePlugins = [rehypeMathjax]

type Props = {
  node: MathNode | null
  onClose: () => void
  onNavigate: (id: string) => void
}

function Chips({ ids, onNavigate }: { ids: string[]; onNavigate: (id: string) => void }) {
  return (
    <div className="panel__chips">
      {ids.map((id) => {
        const n = nodeById.get(id)
        return n ? (
          <button
            key={id}
            type="button"
            className="panel__chip"
            onClick={() => onNavigate(id)}
          >
            {n.label}
          </button>
        ) : null
      })}
    </div>
  )
}

export function DefinitionPanel({ node, onClose, onNavigate }: Props) {
  if (!node) return null
  const dependents = dependentsById.get(node.id) ?? []

  return (
    <aside className="panel" aria-label="Definition">
      <header className="panel__header">
        <span className="panel__kind">{node.kind}</span>
        <button type="button" className="panel__close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </header>

      <h2 className="panel__title">{node.title}</h2>

      {node.tags.length > 0 && (
        <div className="panel__tags">
          {node.tags.map((tag) => (
            <AreaTag key={tag} tag={tag} className="panel__tag" />
          ))}
        </div>
      )}

      <div className="panel__body">
        <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
          {node.definition}
        </ReactMarkdown>
      </div>

      {node.dependencies.length > 0 && (
        <section className="panel__section">
          <h3 className="panel__section-title">Built from</h3>
          <Chips ids={node.dependencies} onNavigate={onNavigate} />
        </section>
      )}

      {dependents.length > 0 && (
        <section className="panel__section">
          <h3 className="panel__section-title">Leads to</h3>
          <Chips ids={dependents.map((d) => d.id)} onNavigate={onNavigate} />
        </section>
      )}
    </aside>
  )
}

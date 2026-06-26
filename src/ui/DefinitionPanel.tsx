import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'
import type { MathNode } from '../data/types'
import { dependentsById, nodeById } from '../data/graph'
import { AreaTag } from './AreaTag'

// Module-scope so the plugin arrays keep a stable identity across renders.
const remarkPlugins = [remarkMath]
const rehypePlugins = [rehypeMathjax]

function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
      {children}
    </ReactMarkdown>
  )
}

/** The formal section(s) a node carries, in reading order, by kind. */
function formalSections(node: MathNode): { label: string; md: string }[] {
  const out: { label: string; md: string }[] = []
  if (node.kind === 'primitive') return out // description only
  if (node.kind === 'definition') {
    if (node.definition) out.push({ label: 'Definition', md: node.definition })
  } else if (node.statement) {
    // axiom + every proven statement (theorem / lemma / corollary / proposition)
    out.push({ label: 'Statement', md: node.statement })
  }
  if (node.proof) out.push({ label: 'Proof', md: node.proof })
  return out
}

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

      {node.description && (
        <div className="panel__body">
          <Markdown>{node.description}</Markdown>
        </div>
      )}

      {formalSections(node).map((s) => (
        <section key={s.label} className="panel__section">
          <h3 className="panel__section-title">{s.label}</h3>
          <div className="panel__body">
            <Markdown>{s.md}</Markdown>
          </div>
        </section>
      ))}

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

      {/* Thumb-friendly close, pinned to the bottom on small screens. */}
      <button type="button" className="panel__close-bottom" onClick={onClose}>
        Close
      </button>
    </aside>
  )
}

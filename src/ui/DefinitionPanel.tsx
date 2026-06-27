import { useEffect, useState, type PointerEvent as ReactPointerEvent } from 'react'
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

/** The formal content a node carries: its primary statement/definition, and an
 *  optional proof — split so the proof can be rendered as a collapsible block. */
function formalContent(node: MathNode): {
  primary?: { label: string; md: string }
  proof?: string
} {
  const proof = 'proof' in node && node.proof ? node.proof : undefined
  if (node.kind === 'primitive') return {}
  if (node.kind === 'definition') {
    return { primary: node.definition ? { label: 'Definition', md: node.definition } : undefined, proof }
  }
  // axiom + every proven statement carry a `statement`
  return { primary: node.statement ? { label: 'Statement', md: node.statement } : undefined, proof }
}

type Props = {
  node: MathNode | null
  onClose: () => void
  onNavigate: (id: string) => void
  /** Desktop sidebar: draggable left edge to resize, persisted. (Off in the
   *  mobile bottom sheet, which is full-width.) */
  resizable?: boolean
}

const MIN_W = 320
const MAX_W = 760
const WIDTH_KEY = 'mathgraph-panel-width'

function clampWidth(w: number): number {
  return Math.min(Math.max(w, MIN_W), Math.min(MAX_W, window.innerWidth * 0.92))
}

function Chips({ ids, onNavigate }: { ids: string[]; onNavigate: (id: string) => void }) {
  return (
    <div className="panel__chips">
      {ids.map((id) => {
        const n = nodeById.get(id)
        return n ? (
          <button key={id} type="button" className="panel__chip" onClick={() => onNavigate(id)}>
            {n.label}
          </button>
        ) : null
      })}
    </div>
  )
}

export function DefinitionPanel({ node, onClose, onNavigate, resizable = false }: Props) {
  // Proofs start expanded; collapse resets when navigating to another node.
  const [proofOpen, setProofOpen] = useState(true)
  const nodeId = node?.id
  useEffect(() => setProofOpen(true), [nodeId])

  const [width, setWidth] = useState(() => {
    const saved = Number(localStorage.getItem(WIDTH_KEY))
    return clampWidth(saved >= MIN_W ? saved : 440)
  })
  const startResize = (e: ReactPointerEvent) => {
    e.preventDefault()
    const onMove = (ev: globalThis.PointerEvent) => setWidth(clampWidth(window.innerWidth - ev.clientX))
    const onUp = (ev: globalThis.PointerEvent) => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      document.body.classList.remove('is-col-resizing')
      const w = clampWidth(window.innerWidth - ev.clientX)
      setWidth(w)
      try {
        localStorage.setItem(WIDTH_KEY, String(Math.round(w)))
      } catch {
        /* ignore */
      }
    }
    document.body.classList.add('is-col-resizing')
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  if (!node) return null
  const dependents = dependentsById.get(node.id) ?? []
  const { primary, proof } = formalContent(node)

  return (
    <aside className="panel" aria-label="Definition" style={resizable ? { width } : undefined}>
      {resizable && (
        <div
          className="panel__resize"
          style={{ right: width }}
          onPointerDown={startResize}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize panel"
        />
      )}
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

      {primary && (
        <section className="panel__formal">
          <h3 className="panel__formal-label">{primary.label}</h3>
          <div className="panel__body">
            <Markdown>{primary.md}</Markdown>
          </div>
        </section>
      )}

      {proof && (
        <section className="panel__formal panel__proof">
          <button
            type="button"
            className="panel__proof-toggle"
            aria-expanded={proofOpen}
            onClick={() => setProofOpen((o) => !o)}
          >
            <svg className="panel__proof-chevron" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M3 4.5 6 8l3-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            Proof
          </button>
          {proofOpen && (
            <div className="panel__body panel__proof-body">
              <Markdown>{proof}</Markdown>
            </div>
          )}
        </section>
      )}

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

import { useMemo } from 'react'
import { MATH_NODES } from '../data/nodes'
import type { NodeKind } from '../data/types'

// Foundational order: primitives and axioms first, then what's built on them.
const SECTIONS: { kind: NodeKind; label: string }[] = [
  { kind: 'primitive', label: 'Primitives' },
  { kind: 'axiom', label: 'Axioms' },
  { kind: 'definition', label: 'Definitions' },
  { kind: 'lemma', label: 'Lemmas' },
  { kind: 'proposition', label: 'Propositions' },
  { kind: 'theorem', label: 'Theorems' },
  { kind: 'corollary', label: 'Corollaries' },
]

/**
 * A plain, complete enumeration of every concept, grouped by kind and sorted
 * within each group. Reached at `#/index` and linked from Settings — it exists
 * for completeness and quick reference, not as primary navigation.
 */
export function ConceptIndex() {
  const groups = useMemo(
    () =>
      SECTIONS.map((s) => ({
        ...s,
        items: MATH_NODES.filter((n) => n.kind === s.kind).sort((a, b) =>
          a.title.localeCompare(b.title),
        ),
      })).filter((g) => g.items.length > 0),
    [],
  )

  return (
    <main className="index">
      <header className="index__bar">
        <a className="index__back" href="#/">
          ← Graph
        </a>
        <h1 className="index__title">Index of concepts</h1>
        <span className="index__count">{MATH_NODES.length} total</span>
      </header>

      <div className="index__scroll">
        {groups.map((g) => (
          <section key={g.kind} className="index__section">
            <h2 className="index__heading">
              {g.label}
              <span className="index__n">{g.items.length}</span>
            </h2>
            <ul className="index__list">
              {g.items.map((n) => (
                <li key={n.id} className="index__item">
                  <span className="index__name">{n.title}</span>
                  {n.tags.length > 0 && (
                    <span className="index__areas">{n.tags.join(' · ')}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  )
}

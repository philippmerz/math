/**
 * Graph-integrity check for the node corpus.
 *
 * Validates what the type system cannot: unique ids, well-formed fields, that
 * every `dependencies` id resolves, and that the dependency graph is acyclic.
 * Exits non-zero on any problem, so it works as a CI / pre-commit gate.
 *
 *   npm run check
 *
 * Imports the real data via Node's type stripping — no fragile text parsing.
 */
import { MATH_NODES } from '../src/data/nodes/index.ts'
import type { NodeKind } from '../src/data/types.ts'

const VALID_KINDS: ReadonlySet<NodeKind> = new Set([
  'primitive',
  'axiom',
  'definition',
  'theorem',
])

const problems: string[] = []
const fail = (msg: string) => problems.push(msg)

// 1. Shape and unique ids.
const ids = new Set<string>()
for (const n of MATH_NODES) {
  const id = n?.id ?? '<no id>'
  for (const field of ['id', 'label', 'title', 'definition'] as const) {
    if (typeof n[field] !== 'string' || n[field].length === 0) {
      fail(`[field] node "${id}" has missing/empty "${field}"`)
    }
  }
  if (!VALID_KINDS.has(n.kind)) fail(`[kind] node "${id}" has invalid kind "${n.kind}"`)
  if (!Array.isArray(n.tags) || n.tags.length === 0) fail(`[tags] node "${id}" has no tags`)
  if (!Array.isArray(n.dependencies)) fail(`[deps] node "${id}" dependencies is not an array`)
  if (ids.has(n.id)) fail(`[dup] duplicate id "${n.id}"`)
  ids.add(n.id)
}

// 2. Dependencies must resolve and not be self-referential.
for (const n of MATH_NODES) {
  for (const dep of n.dependencies ?? []) {
    if (dep === n.id) fail(`[self] node "${n.id}" depends on itself`)
    else if (!ids.has(dep)) fail(`[dangling] node "${n.id}" → unknown dependency "${dep}"`)
  }
}

// 3. The dependency graph must be acyclic (report the first cycle found).
const byId = new Map(MATH_NODES.map((n) => [n.id, n]))
const state = new Map<string, 1 | 2>() // 1 = on stack, 2 = done
const stack: string[] = []
let cyclic = false

function visit(id: string): void {
  if (cyclic) return
  state.set(id, 1)
  stack.push(id)
  for (const dep of byId.get(id)?.dependencies ?? []) {
    if (!byId.has(dep)) continue
    const s = state.get(dep)
    if (s === 1) {
      fail(`[cycle] ${[...stack.slice(stack.indexOf(dep)), dep].join(' → ')}`)
      cyclic = true
      return
    }
    if (s === undefined) {
      visit(dep)
      if (cyclic) return
    }
  }
  stack.pop()
  state.set(id, 2)
}
for (const n of MATH_NODES) if (!state.has(n.id)) visit(n.id)

// Report.
const areas = [...new Set(MATH_NODES.flatMap((n) => n.tags ?? []))].sort()
const edges = MATH_NODES.reduce((sum, n) => sum + (n.dependencies?.length ?? 0), 0)

if (problems.length === 0) {
  console.log(
    `✓ graph OK — ${MATH_NODES.length} nodes, ${edges} edges, ` +
      `${areas.length} areas [${areas.join(', ')}]`,
  )
  process.exit(0)
}

console.error(`✗ ${problems.length} problem(s) found:`)
for (const p of problems) console.error(`  ${p}`)
process.exit(1)

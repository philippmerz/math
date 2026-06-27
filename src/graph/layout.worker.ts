import { Graphviz } from '@hpcc-js/wasm-graphviz'

// Off-main-thread layout. `flow` is a single Graphviz pass; `grouped` is a
// two-level layout: each field is laid out on its own, then the fields are
// stacked top-to-bottom by their dependencies (each field a box sized to its
// own bounding box). That makes the consequence chain run *down* the page
// instead of sprawling sideways. Positions come back as node centres.

type GvNode = { id: string; field: string; deps: string[] }
type Spacing = { ranksep: number; nodesep: number }
type Params = { flow: Spacing; field: Spacing; fieldDag: Spacing }
type Req = { reqId: number; mode: 'flow' | 'grouped'; nodes: GvNode[]; nodeW: number; nodeH: number; params: Params }
type PosMap = Record<string, [number, number]>

const post = (m: unknown) => (self as unknown as { postMessage: (m: unknown) => void }).postMessage(m)
let gvPromise: ReturnType<typeof Graphviz.load> | null = null

self.onmessage = async (e: MessageEvent<Req>) => {
  const { reqId } = e.data
  try {
    gvPromise ??= Graphviz.load()
    const gv = await gvPromise
    const pos = e.data.mode === 'flow' ? flowLayout(gv, e.data) : groupedLayout(gv, e.data)
    post({ reqId, pos })
  } catch (err) {
    post({ reqId, error: String(err) })
  }
}

type Gv = Awaited<ReturnType<typeof Graphviz.load>>

function nodeDecl(nodeW: number, nodeH: number): string {
  return `node [shape=box, fixedsize=true, width=${(nodeW / 72).toFixed(3)}, height=${(nodeH / 72).toFixed(3)}];`
}

// Run one Graphviz pass; return node centres (y flipped to top-down) and the
// graph's bounding-box size.
function run(gv: Gv, dot: string): { pos: PosMap; w: number; h: number } {
  const j = JSON.parse(gv.layout(dot, 'json', 'dot')) as {
    bb: string
    objects?: { name?: string; pos?: string }[]
  }
  const bb = j.bb.split(',').map(Number)
  const height = bb[3]
  const pos: PosMap = {}
  for (const o of j.objects ?? []) {
    if (o.pos && typeof o.name === 'string') {
      const [x, y] = o.pos.split(',').map(Number)
      pos[o.name] = [x, height - y]
    }
  }
  return { pos, w: bb[2], h: bb[3] }
}

function flowLayout(gv: Gv, req: Req): PosMap {
  const { nodes, params } = req
  const ids = new Set(nodes.map((n) => n.id))
  let s = `digraph G {\n  graph [rankdir=TB, ranksep=${params.flow.ranksep}, nodesep=${params.flow.nodesep}];\n  ${nodeDecl(req.nodeW, req.nodeH)}\n`
  for (const n of nodes) s += `  "${n.id}";\n`
  for (const n of nodes) for (const d of n.deps) if (ids.has(d)) s += `  "${d}" -> "${n.id}";\n`
  return run(gv, s + '}').pos
}

function groupedLayout(gv: Gv, req: Req): PosMap {
  const { nodes, params } = req
  const fieldOf = new Map(nodes.map((n) => [n.id, n.field]))
  const byField = new Map<string, GvNode[]>()
  for (const n of nodes) {
    const list = byField.get(n.field)
    if (list) list.push(n)
    else byField.set(n.field, [n])
  }

  // Pass 1 — lay out each field independently; keep its positions + box size.
  const fieldLayout = new Map<string, { pos: PosMap; w: number; h: number }>()
  for (const [field, fnodes] of byField) {
    const ids = new Set(fnodes.map((n) => n.id))
    let s = `digraph G {\n  graph [rankdir=TB, ranksep=${params.field.ranksep}, nodesep=${params.field.nodesep}];\n  ${nodeDecl(req.nodeW, req.nodeH)}\n`
    for (const n of fnodes) s += `  "${n.id}";\n`
    for (const n of fnodes) for (const d of n.deps) if (ids.has(d)) s += `  "${d}" -> "${n.id}";\n`
    fieldLayout.set(field, run(gv, s + '}'))
  }

  // Field→field dependency edges, as from → {to}. A nested Map (not concatenated
  // string keys) so field names with spaces can't collide.
  const fieldEdges = new Map<string, Set<string>>()
  for (const n of nodes) {
    for (const d of n.deps) {
      const from = fieldOf.get(d)
      if (!from || from === n.field) continue
      const tos = fieldEdges.get(from) ?? fieldEdges.set(from, new Set()).get(from)!
      tos.add(n.field)
    }
  }

  // Pass 2 — lay out the field DAG, each field a box sized to its own layout.
  let s = `digraph G {\n  graph [rankdir=TB, ranksep=${params.fieldDag.ranksep}, nodesep=${params.fieldDag.nodesep}, newrank=true];\n`
  for (const [field, fl] of fieldLayout) {
    s += `  "${field}" [shape=box, fixedsize=true, width=${(fl.w / 72).toFixed(3)}, height=${(fl.h / 72).toFixed(3)}];\n`
  }
  for (const [from, tos] of fieldEdges) {
    for (const to of tos) s += `  "${from}" -> "${to}";\n`
  }
  const fieldPos = run(gv, s + '}').pos

  // Combine: each node sits at its field's centre, offset to the field's
  // top-left, plus its local position within the field.
  const out: PosMap = {}
  for (const [field, fl] of fieldLayout) {
    const fc = fieldPos[field]
    if (!fc) continue
    for (const id in fl.pos) {
      const [lx, ly] = fl.pos[id]
      out[id] = [fc[0] - fl.w / 2 + lx, fc[1] - fl.h / 2 + ly]
    }
  }
  return out
}

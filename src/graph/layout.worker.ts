import { Graphviz } from '@hpcc-js/wasm-graphviz'

// Off-main-thread layout: a DOT source comes in, node centre positions go out.
// Graphviz `dot` does the same layered/clustered layout dagre did, but in
// compiled WASM — ~10× faster — and here it never blocks the UI thread.

type Req = { reqId: number; dot: string }
type GraphvizJson = { bb: string; objects?: { name?: string; pos?: string }[] }

const post = (msg: unknown) => (self as unknown as { postMessage: (m: unknown) => void }).postMessage(msg)

let gvPromise: ReturnType<typeof Graphviz.load> | null = null

self.onmessage = async (e: MessageEvent<Req>) => {
  const { reqId, dot } = e.data
  try {
    gvPromise ??= Graphviz.load()
    const gv = await gvPromise
    const json = JSON.parse(gv.layout(dot, 'json', 'dot')) as GraphvizJson
    // bb = "llx,lly,urx,ury"; Graphviz y is bottom-up, so flip to top-down.
    const height = Number(json.bb.split(',')[3])
    const pos: Record<string, [number, number]> = {}
    for (const o of json.objects ?? []) {
      if (o.pos && typeof o.name === 'string' && !o.name.startsWith('cluster')) {
        const [x, y] = o.pos.split(',').map(Number)
        pos[o.name] = [x, height - y]
      }
    }
    post({ reqId, pos })
  } catch (err) {
    post({ reqId, error: String(err) })
  }
}

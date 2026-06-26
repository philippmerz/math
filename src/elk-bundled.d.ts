declare module 'elkjs/lib/elk.bundled.js' {
  export default class ELK {
    constructor(options?: Record<string, unknown>)
    layout(graph: unknown): Promise<unknown>
  }
}

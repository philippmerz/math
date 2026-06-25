# Mathematics Graph

An open, pure-frontend tool for visualising mathematics as a directed dependency
graph. Each concept is a labelled node; an arrow runs from every prerequisite to
the concept it enables. Click a node to read a concise, MathJax-rendered
definition. Search jumps to any concept; the canvas has light (`#fff`) and dark
(`#000`) modes.

The seed content is the foundational core of **Zermelo–Fraenkel set theory with
Choice (ZFC)** — the two primitives, the ten axioms, and the constructions
(ordered pairs, functions, ordinals, …) built on top of them.

No backend, no accounts, no paywall. It builds to static files and ships on
GitHub Pages.

## Stack

- **React + TypeScript** (Vite)
- **[@xyflow/react](https://reactflow.dev)** for the canvas, **[dagre](https://github.com/dagrejs/dagre)** for the top-down layered layout
- **[react-markdown](https://github.com/remarkjs/react-markdown) + remark-math + rehype-mathjax** to render Markdown definitions with LaTeX (MathJax SVG, so math inherits the text colour and themes automatically)

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

## How it is organised

```
src/
  data/
    types.ts    MathNode — the one data type
    nodes.ts    the ZFC content (the single source of truth)
    graph.ts    derived lookups: by-id, reverse-deps, search
  graph/
    layout.ts       dagre → positioned nodes + edges (computed once)
    GraphView.tsx   the React Flow canvas (selection, dimming, camera)
    ConceptNode.tsx the node renderer
  ui/
    SearchBox.tsx        search input + results
    DefinitionPanel.tsx  Markdown + MathJax panel (lazy-loaded)
    ThemeToggle.tsx
  hooks/useTheme.ts
  App.tsx         composition root: owns theme, selection, query
```

Data flows one way: `App` owns the `theme`, `selectedId`, and `query` state and
passes it down; children report user intent back up through callbacks. The graph
layout is pure and runs once at module load.

## Adding a concept

Append one object to [`src/data/nodes.ts`](src/data/nodes.ts):

```ts
{
  id: 'union',                       // stable, unique, URL-safe
  label: 'Union',                    // short — drawn on the node
  title: 'Axiom of Union',           // full — panel header
  kind: 'axiom',                     // 'primitive' | 'axiom' | 'definition'
  dependencies: ['membership'],      // ids this concept is built from
  definition: String.raw`...`,       // Markdown + LaTeX ($…$, $$…$$)
}
```

Use `String.raw` so LaTeX backslashes (`\forall`, `\varnothing`, …) survive the
template literal verbatim. Edges, the reverse "Leads to" links, search, and the
layout all update automatically — there is nothing else to wire up.

## Deploy to GitHub Pages

The repo includes [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds and publishes `dist/` on every push to `main`.

1. Push this project to a GitHub repository.
2. In **Settings → Pages**, set **Source: GitHub Actions**.
3. Push to `main` (or run the workflow manually). The site goes live at
   `https://<user>.github.io/<repo>/`.

The Vite `base` is set to `./` (relative), so the same build works at a
user/org root (`/`) or a project subpath (`/<repo>/`) without configuration.

## License

MIT.

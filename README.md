# Mathematics Graph

An open, pure-frontend tool for visualising mathematics as a directed dependency
graph. Each concept is a labelled node; an arrow runs from every prerequisite to
the concept it enables. Click a node to read a concise, MathJax-rendered
definition.

Open a PR if you spot any mistakes.

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
npm run check    # validate the graph: unique ids, deps resolve, acyclic
npm run preview  # serve the production build locally
```

## How it is organised

```
src/
  data/
    types.ts    MathNode — the one data type
    nodes/      one file per area (logic, set-theory, algebra, …) + index.ts
    graph.ts    derived lookups: by-id, reverse-deps, search, tags
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

Append one object to the relevant area file under
[`src/data/nodes/`](src/data/nodes/) (e.g. `analysis.ts`); `index.ts`
concatenates them:

```ts
{
  id: 'union',                       // stable, unique, URL-safe
  label: 'Union',                    // short — drawn on the node
  title: 'Axiom of Union',           // full — panel header
  kind: 'axiom',                     // 'primitive' | 'axiom' | 'definition' | 'theorem'
  tags: ['Set Theory'],              // area(s); the first tag picks the file
  dependencies: ['membership'],      // ids this concept is built from
  definition: String.raw`...`,       // Markdown + LaTeX ($…$, $$…$$)
}
```

Use `String.raw` so LaTeX backslashes (`\forall`, `\varnothing`, …) survive the
template literal verbatim. Edges, the reverse "Leads to" links, search, tags, and
the layout all update automatically. Run `npm run check` to validate ids,
dependencies, and acyclicity.

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

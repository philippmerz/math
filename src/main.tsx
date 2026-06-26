import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ConceptIndex } from './ui/ConceptIndex.tsx'
import { AreaLinksPage } from './ui/AreaLinksPage.tsx'
import { useHashRoute } from './hooks/useHashRoute.ts'

/** Minimal routing: `#/index` and `#/links` are standalone pages, else the graph. */
function Root() {
  const hash = useHashRoute()
  if (hash.startsWith('#/index')) return <ConceptIndex />
  if (hash.startsWith('#/links')) return <AreaLinksPage />
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ConceptIndex } from './ui/ConceptIndex.tsx'
import { useHashRoute } from './hooks/useHashRoute.ts'

/** Minimal routing: `#/index` shows the concept index, everything else the graph. */
function Root() {
  const hash = useHashRoute()
  return hash.startsWith('#/index') ? <ConceptIndex /> : <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)

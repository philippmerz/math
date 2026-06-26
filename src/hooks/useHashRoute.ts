import { useEffect, useState } from 'react'

/**
 * The current `location.hash`, kept in sync as it changes. Powers the app's
 * minimal hash-based routing — no router dependency, and it works unchanged
 * under any GitHub Pages base path.
 */
export function useHashRoute(): string {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

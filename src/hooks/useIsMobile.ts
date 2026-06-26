import { useSyncExternalStore } from 'react'

// Phone-sized: small screen or a coarse pointer. The single switch the app
// branches on to render the mobile shell instead of the desktop graph.
const QUERY = '(max-width: 760px)'

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

export function useIsMobile(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
}

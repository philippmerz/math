import { useEffect, useRef, useState } from 'react'

/**
 * Fades/floats the non-graph chrome away after the mouse sits still for a beat,
 * and brings it straight back on the next movement — an unobtrusive, immersive
 * view of the graph. Desktop only (it keys off mouse movement); on touch the
 * chrome always stays. Returns whether the chrome should currently be hidden.
 *
 * `suppressed` keeps the chrome up regardless of idle — e.g. while an overlay
 * menu (settings, filter) is open, so it doesn't vanish out from under it.
 */
export function useChromeAutoHide(delay = 3000, suppressed = false): boolean {
  const [hidden, setHidden] = useState(false)
  const hiddenRef = useRef(false)
  hiddenRef.current = hidden

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (suppressed) {
      setHidden(false)
      return
    }

    let timer = 0
    const arm = () => {
      clearTimeout(timer)
      timer = window.setTimeout(() => setHidden(true), delay)
    }
    const wake = () => {
      if (hiddenRef.current) setHidden(false)
      arm()
    }

    window.addEventListener('pointermove', wake)
    window.addEventListener('pointerdown', wake)
    window.addEventListener('wheel', wake, { passive: true })
    window.addEventListener('keydown', wake)
    arm()

    return () => {
      clearTimeout(timer)
      window.removeEventListener('pointermove', wake)
      window.removeEventListener('pointerdown', wake)
      window.removeEventListener('wheel', wake)
      window.removeEventListener('keydown', wake)
    }
  }, [delay, suppressed])

  return suppressed ? false : hidden
}

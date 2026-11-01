import { useEffect, useRef } from 'react'
import { handleBack } from './backStack'
import { getRemoteKey, isDirection, type Direction } from './keys'
import { findNext, focusElement, getActiveLayer, getDefaultFocus, getFocusables } from './spatial'

const opposites: Record<Direction, Direction> = { up: 'down', down: 'up', left: 'right', right: 'left' }

/**
 * Installs remote-control handling for the whole app:
 * - arrows move focus spatially within the active layer (see spatial.ts);
 * - Back closes the topmost layer, or calls `onExit` on the home screen;
 * - after `idleMs` without input on the home screen, focus is released so the page
 *   returns to its ambient, signage-like state and the event rail resumes rotating.
 *
 * Components can claim keys first by handling them in `onKeyDown` and calling
 * `stopPropagation()`, e.g. the event rail owns Left/Right while it has focus.
 */
export function useRemoteNavigation({ onExit, idleMs }: { onExit: () => void; idleMs: number }) {
  const onExitRef = useRef(onExit)
  onExitRef.current = onExit

  useEffect(() => {
    const root = document.documentElement
    let idleTimer = 0
    // Remembered so that pressing the opposite direction retraces the last step, even
    // where the geometry alone would pick a different neighbour.
    let lastMove: { from: HTMLElement; to: HTMLElement; direction: Direction } | null = null

    const releaseFocusWhenIdle = () => {
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        const active = document.activeElement
        if (getActiveLayer() === document.body && active instanceof HTMLElement) active.blur()
      }, idleMs)
    }

    // Capture phase, so it sees every key even when a component stops propagation.
    const noteInput = (event: KeyboardEvent) => {
      // Only write on change: focus styles hang off this attribute, so touching it
      // restyles the whole page.
      if (root.dataset.input !== 'keys') root.dataset.input = 'keys'
      releaseFocusWhenIdle()

      // Holding OK must not activate whatever receives focus next, e.g. the close button
      // of a modal that the first press just opened.
      if (event.repeat && getRemoteKey(event) === 'enter') event.preventDefault()
    }

    const notePointer = () => {
      if (root.dataset.input !== 'pointer') root.dataset.input = 'pointer'
      releaseFocusWhenIdle()
    }

    const navigate = (event: KeyboardEvent) => {
      const key = getRemoteKey(event)

      if (key === 'back') {
        event.preventDefault()
        if (!handleBack()) onExitRef.current()
        return
      }

      if (!isDirection(key)) return
      event.preventDefault()

      const layer = getActiveLayer()
      const current = document.activeElement
      if (!(current instanceof HTMLElement) || current === document.body || !layer.contains(current)) {
        // The first press after idling only reveals focus; it doesn't also move it.
        const initial = getDefaultFocus(layer)
        if (initial) focusElement(initial)
        lastMove = null
        return
      }

      const retrace =
        lastMove &&
        lastMove.to === current &&
        lastMove.direction === opposites[key] &&
        lastMove.from.isConnected &&
        layer.contains(lastMove.from) &&
        getFocusables(layer).includes(lastMove.from)
          ? lastMove.from
          : null
      const next = retrace ?? findNext(current, key, getFocusables(layer))

      if (next) {
        focusElement(next)
        lastMove = { from: current, to: next, direction: key }
      }
    }

    window.addEventListener('keydown', noteInput, true)
    window.addEventListener('keydown', navigate)
    window.addEventListener('pointerdown', notePointer, true)
    window.addEventListener('mousemove', notePointer, true)
    releaseFocusWhenIdle()

    return () => {
      window.clearTimeout(idleTimer)
      window.removeEventListener('keydown', noteInput, true)
      window.removeEventListener('keydown', navigate)
      window.removeEventListener('pointerdown', notePointer, true)
      window.removeEventListener('mousemove', notePointer, true)
    }
  }, [idleMs])
}

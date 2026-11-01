/**
 * The platform's on-screen keyboard. Tizen shrinks the app window while it is open, so
 * "a text field is being edited and the window got shorter" means the keyboard is up.
 */

export function isEditingText() {
  const active = document.activeElement
  return active instanceof HTMLInputElement && !active.readOnly && !active.disabled
}

/** Height of the part of the window the keyboard isn't covering, in screen pixels. */
export function visibleHeight() {
  return Math.min(window.innerHeight, window.visualViewport?.height ?? Infinity)
}

/** Calls `listener` whenever the visible area may have changed size. */
export function onVisibleResize(listener: () => void) {
  window.addEventListener('resize', listener)
  window.visualViewport?.addEventListener('resize', listener)
  return () => {
    window.removeEventListener('resize', listener)
    window.visualViewport?.removeEventListener('resize', listener)
  }
}

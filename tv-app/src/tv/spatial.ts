import type { Direction } from './keys'

/**
 * Geometric focus movement for a D-pad. Anything natively focusable is a target, so
 * components only have to render real buttons (or `tabIndex={0}`); `tabIndex={-1}`
 * opts an element out, which is how roving lists like the event rail expose one item.
 */
const focusableSelector = 'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** The topmost open layer (a modal), or the whole document. Focus never leaves it. */
export function getActiveLayer(): HTMLElement {
  const layers = document.querySelectorAll<HTMLElement>('[data-nav-layer]')
  return layers[layers.length - 1] ?? document.body
}

export function getFocusables(layer: HTMLElement) {
  return Array.from(layer.querySelectorAll<HTMLElement>(focusableSelector)).filter(isNavigable)
}

/** The element a layer focuses first: an explicit `data-nav-default`, else its first target. */
export function getDefaultFocus(layer: HTMLElement): HTMLElement | null {
  const preferred = layer.querySelector<HTMLElement>('[data-nav-default]')
  if (preferred && preferred.matches(focusableSelector) && isNavigable(preferred)) return preferred
  return getFocusables(layer)[0] ?? null
}

export function focusElement(element: HTMLElement) {
  // Never let the browser scroll for us: the event rail is an overflow-hidden track
  // positioned by transform, and a native scroll would knock it out of alignment.
  element.focus({ preventScroll: true })
  revealInScrollParent(element)
}

export function findNext(from: HTMLElement, direction: Direction, candidates: HTMLElement[]) {
  const origin = from.getBoundingClientRect()
  let best: HTMLElement | null = null
  let bestScore = Infinity

  for (const candidate of candidates) {
    if (candidate === from) continue
    const score = scoreCandidate(origin, candidate.getBoundingClientRect(), direction)
    if (score < bestScore) {
      best = candidate
      bestScore = score
    }
  }

  return best
}

function isNavigable(element: HTMLElement) {
  if (element.closest('[aria-hidden="true"]')) return false
  const rect = element.getBoundingClientRect()
  return rect.width > 0 && rect.height > 0
}

// Lets neighbours overlap slightly, e.g. an event card scaled up while it is active.
const edgeTolerance = 4

function scoreCandidate(from: DOMRect, to: DOMRect, direction: Direction) {
  const gaps: Record<Direction, number> = {
    right: to.left - from.right,
    left: from.left - to.right,
    down: to.top - from.bottom,
    up: from.top - to.bottom,
  }
  const gap = gaps[direction]
  if (gap < -edgeTolerance) return Infinity

  const horizontal = direction === 'left' || direction === 'right'
  const [fromStart, fromEnd, toStart, toEnd] = horizontal
    ? [from.top, from.bottom, to.top, to.bottom]
    : [from.left, from.right, to.left, to.right]

  // Distance across the direction of travel: zero when the two line up at all.
  const offAxis = Math.max(0, toStart - fromEnd, fromStart - toEnd)
  // Left/Right stay within a row. Up/Down may reach diagonally, since that's how the
  // top-right controls are reached from the app row below them.
  if (horizontal && offAxis > 0) return Infinity
  // Among candidates that line up, prefer the one whose leading edge matches, so moving
  // from a full-width field into a row lands on its first item rather than its middle.
  const alignment = Math.abs(toStart - fromStart)

  return Math.max(gap, 0) + offAxis * 2 + alignment * 0.1
}

function revealInScrollParent(element: HTMLElement) {
  const container = findScrollParent(element)
  if (!container) return

  const box = container.getBoundingClientRect()
  const rect = element.getBoundingClientRect()
  // Rects are in screen pixels, scroll offsets in the stage's own (unscaled) pixels.
  const scale = box.height / container.offsetHeight || 1
  const margin = 24 * scale

  if (rect.top < box.top + margin) {
    container.scrollTop -= (box.top + margin - rect.top) / scale
  } else if (rect.bottom > box.bottom - margin) {
    container.scrollTop += (rect.bottom - box.bottom + margin) / scale
  }

  if (rect.left < box.left) {
    container.scrollLeft -= (box.left - rect.left) / scale
  } else if (rect.right > box.right) {
    container.scrollLeft += (rect.right - box.right) / scale
  }
}

function findScrollParent(element: HTMLElement) {
  for (let node = element.parentElement; node; node = node.parentElement) {
    const { overflowX, overflowY } = getComputedStyle(node)
    if (/auto|scroll/.test(overflowX + overflowY)) return node
  }
  return null
}

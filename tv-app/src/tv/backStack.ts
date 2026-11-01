/**
 * Whatever is open on top registers how to dismiss itself, and the remote's Back key
 * closes the most recent one. An empty stack means Back reached the home screen.
 */
const handlers: Array<() => void> = []

export function pushBackHandler(handler: () => void) {
  handlers.push(handler)
  return () => {
    const index = handlers.lastIndexOf(handler)
    if (index >= 0) handlers.splice(index, 1)
  }
}

export function handleBack() {
  const handler = handlers[handlers.length - 1]
  if (!handler) return false
  handler()
  return true
}

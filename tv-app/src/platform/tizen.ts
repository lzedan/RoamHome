import type { Platform } from './index'

// The slice of the Tizen Web Device API this app uses. The global only exists inside
// an installed widget, never in a desktop browser.
type TizenGlobal = {
  application: {
    getCurrentApplication(): {
      exit(): void
      hide(): void
    }
  }
}

declare global {
  interface Window {
    tizen?: TizenGlobal
  }
}

export function createTizenPlatform(): Platform | null {
  const tizen = window.tizen
  if (!tizen) return null

  return {
    name: 'tizen',
    effects: 'lite',
    exit() {
      // Samsung's guidelines expect Return on an app's first screen to exit it.
      tizen.application.getCurrentApplication().exit()
    },
  }
}

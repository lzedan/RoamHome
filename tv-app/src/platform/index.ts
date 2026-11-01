import { createTizenPlatform } from './tizen'

/**
 * Everything device-specific goes through here, so the UI stays platform-neutral.
 * A webOS port would add a sibling adapter; the browser fallback keeps `npm run dev`
 * usable on a desktop.
 */
export type Platform = {
  name: 'tizen' | 'browser'
  /**
   * 'lite' replaces live `backdrop-filter` blurs with precomputed ones (see the end of
   * index.css). TV GPUs can't redraw those blurs at frame rate.
   */
  effects: 'full' | 'lite'
  /** Back was pressed on the home screen with nothing left to close. */
  exit(): void
}

const browserPlatform: Platform = {
  name: 'browser',
  // `?effects=lite` previews the TV rendering on a desktop.
  effects: new URLSearchParams(window.location.search).get('effects') === 'lite' ? 'lite' : 'full',
  exit() {},
}

export const platform: Platform = createTizenPlatform() ?? browserPlatform

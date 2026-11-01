export type Direction = 'up' | 'down' | 'left' | 'right'
export type RemoteKey = Direction | 'enter' | 'back'

// Samsung remotes send `XF86Back` (keyCode 10009) for Return. Escape stands in for it
// in a desktop browser, and 461 is LG webOS's Back, kept here for a future port.
const keysByName: Record<string, RemoteKey> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  Enter: 'enter',
  Escape: 'back',
  XF86Back: 'back',
  GoBack: 'back',
}

const keysByCode: Record<number, RemoteKey> = {
  38: 'up',
  40: 'down',
  37: 'left',
  39: 'right',
  13: 'enter',
  27: 'back',
  10009: 'back',
  461: 'back',
}

/** Keys the Tizen on-screen keyboard sends when it closes. */
export const imeKeyCodes = {
  done: 65376,
  cancel: 65385,
}

export function getRemoteKey(event: { key: string; keyCode: number }): RemoteKey | null {
  return keysByName[event.key] ?? keysByCode[event.keyCode] ?? null
}

export function isDirection(key: RemoteKey | null): key is Direction {
  return key === 'up' || key === 'down' || key === 'left' || key === 'right'
}

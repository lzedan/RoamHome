import { useEffect, useState, type ReactNode } from 'react'
import { isEditingText, onVisibleResize } from './keyboard'

/** The design canvas. Everything is laid out at exactly this size, then scaled as one. */
export const stageWidth = 1920
export const stageHeight = 1080

type Frame = { scale: number; x: number; y: number }

function fitFrame(width: number, height: number): Frame {
  const scale = Math.min(width / stageWidth, height / stageHeight)
  return { scale, x: (width - stageWidth * scale) / 2, y: (height - stageHeight * scale) / 2 }
}

/**
 * Renders children on a fixed 1920×1080 canvas and scales it uniformly to fit the
 * window, letterboxing any leftover space. Tizen TV web apps normally get a 1920×1080
 * viewport, so on the TV this is a no-op; elsewhere it keeps proportions identical
 * to the 1080p reference instead of reflowing.
 */
export function Stage({ children }: { children: ReactNode }) {
  const [frame, setFrame] = useState(() => fitFrame(window.innerWidth, window.innerHeight))

  useEffect(() => {
    // The window size the canvas is fitted to. When the on-screen keyboard shrinks the
    // window, keep this size so the canvas stays put and the keyboard simply covers its
    // lower part; Modal lifts the field being edited above it.
    let fitted = { width: window.innerWidth, height: window.innerHeight }

    return onVisibleResize(() => {
      const width = window.innerWidth
      const height = window.innerHeight
      const keyboardOpen = isEditingText() && width === fitted.width && height < fitted.height
      if (keyboardOpen) return

      fitted = { width, height }
      setFrame(fitFrame(width, height))
    })
  }, [])

  const isIdentity = frame.scale === 1 && frame.x === 0 && frame.y === 0

  return (
    <div
      className="stage-viewport"
      // The browser may try to scroll a focused text field into view when the keyboard
      // opens; the canvas never scrolls, Modal handles visibility itself.
      onScroll={(event) => {
        event.currentTarget.scrollTop = 0
        event.currentTarget.scrollLeft = 0
      }}
    >
      <div
        className="stage"
        style={{ transform: isIdentity ? undefined : `translate(${frame.x}px, ${frame.y}px) scale(${frame.scale})` }}
      >
        {children}
      </div>
    </div>
  )
}

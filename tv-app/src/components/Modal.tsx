import { useEffect, useRef, useState, type ReactNode } from 'react'
import { pushBackHandler } from '../tv/backStack'
import { isEditingText, onVisibleResize, visibleHeight } from '../tv/keyboard'
import { focusElement, getDefaultFocus } from '../tv/spatial'

// Space kept between the field being edited and the top of the on-screen keyboard.
const keyboardClearance = 40

/**
 * A focus layer: while open, remote navigation stays inside it, Back closes it, and
 * focus returns to whatever opened it. The element marked `data-nav-default` inside
 * `children` receives focus first.
 */
export function Modal({
  children,
  className = '',
  labelledBy,
  onClose,
}: {
  children: ReactNode
  className?: string
  labelledBy: string
  onClose: () => void
}) {
  const layerRef = useRef<HTMLDivElement>(null)
  const surfaceRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  // Captured on first render, before focus moves inside, so re-running the effect
  // (as StrictMode does) can't mistake an element in this modal for the opener.
  const [opener] = useState(() => (document.activeElement instanceof HTMLElement ? document.activeElement : null))

  useEffect(() => pushBackHandler(() => onCloseRef.current()), [])

  useEffect(() => {
    const initial = layerRef.current && getDefaultFocus(layerRef.current)
    if (initial) focusElement(initial)

    return () => {
      if (opener && opener !== document.body && opener.isConnected) opener.focus({ preventScroll: true })
    }
  }, [opener])

  // While the on-screen keyboard covers the bottom of the screen, lift the dialog just
  // enough to keep the field being edited above it, then settle back when it closes.
  const [keyboardShift, setKeyboardShift] = useState(0)

  useEffect(
    () =>
      onVisibleResize(() => {
        const overlay = layerRef.current
        const surface = surfaceRef.current
        const field = document.activeElement
        if (!overlay || !surface || !field || !surface.contains(field) || !isEditingText()) {
          setKeyboardShift(0)
          return
        }

        // Work in canvas pixels, from layout positions, so the dialog's current lift
        // (or a lift still animating) doesn't skew the measurement.
        const overlayBox = overlay.getBoundingClientRect()
        const scale = overlayBox.height / overlay.offsetHeight || 1
        const fieldInSurface = (field.getBoundingClientRect().bottom - surface.getBoundingClientRect().top) / scale
        const fieldBottom = surface.offsetTop - overlay.scrollTop + fieldInSurface
        const visibleBottom = (visibleHeight() - overlayBox.top) / scale

        setKeyboardShift(Math.max(0, fieldBottom + keyboardClearance - visibleBottom))
      }),
    [],
  )

  return (
    <div
      className="modal-overlay"
      data-nav-layer=""
      ref={layerRef}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className={`modal-surface ${className}`}
        ref={surfaceRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        style={keyboardShift ? ({ '--keyboard-shift': `${keyboardShift}px` } as React.CSSProperties) : undefined}
      >
        {children}
      </div>
    </div>
  )
}

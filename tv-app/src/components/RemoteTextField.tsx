import { useRef, useState } from 'react'
import { getRemoteKey, imeKeyCodes } from '../tv/keys'

/**
 * A text input that a D-pad can pass through. Tizen opens its on-screen keyboard as
 * soon as an editable input gains focus, so the field stays read-only while focus
 * merely lands on it; OK (or a click) starts editing, and the keyboard's Done/Cancel,
 * Back, or moving up/down ends it.
 */
export function RemoteTextField({
  id,
  value,
  maxLength,
  autoComplete,
  onChange,
}: {
  id: string
  value: string
  maxLength?: number
  autoComplete?: string
  onChange: (value: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const startEditing = () => {
    const input = inputRef.current
    if (!input || editing) return
    // Re-focus once writable so the platform keyboard opens for it.
    input.readOnly = false
    input.blur()
    input.focus({ preventScroll: true })
    setEditing(true)
  }

  return (
    <input
      id={id}
      ref={inputRef}
      type="text"
      value={value}
      maxLength={maxLength}
      autoComplete={autoComplete}
      readOnly={!editing}
      data-editing={editing || undefined}
      onChange={(event) => onChange(event.target.value)}
      onClick={startEditing}
      onBlur={() => setEditing(false)}
      onKeyDown={(event) => {
        const key = getRemoteKey(event)

        if (!editing) {
          if (key === 'enter') {
            event.preventDefault()
            startEditing()
          }
          return
        }

        if (key === 'enter' || key === 'back' || event.keyCode === imeKeyCodes.done || event.keyCode === imeKeyCodes.cancel) {
          event.preventDefault()
          event.stopPropagation()
          setEditing(false)
        } else if (key === 'left' || key === 'right') {
          // Moves the caret instead of focus.
          event.stopPropagation()
        } else if (key === 'up' || key === 'down') {
          setEditing(false)
        }
      }}
    />
  )
}

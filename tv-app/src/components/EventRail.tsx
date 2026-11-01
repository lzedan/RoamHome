import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import type { Event } from '../data'
import { getRemoteKey } from '../tv/keys'

/**
 * The auto-rotating "Happening Near You" rail. The list is rendered twice so the track
 * can keep sliding left and then jump back invisibly. With the remote, Left/Right step
 * the same track by hand: the focused card is always the current (leftmost) one, and
 * rotation pauses while focus is inside.
 */
export function EventRail({
  events,
  blocked,
  isNavDefault,
  onOpenEvent,
}: {
  events: Event[]
  /** Something is open on top; rotation pauses. */
  blocked: boolean
  /** The current card is where focus lands first on the home screen. */
  isNavDefault: boolean
  onOpenEvent: (event: Event) => void
}) {
  const [trackPosition, setTrackPosition] = useState(0)
  const [isTrackResetting, setIsTrackResetting] = useState(false)
  const [eventsPaused, setEventsPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const railRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const activeEvent = trackPosition % events.length

  // Keep focus on the current card as the track moves underneath it.
  useEffect(() => {
    const rail = railRef.current
    if (!rail || !rail.contains(document.activeElement)) return
    const card = rail.querySelectorAll<HTMLElement>('.event-card')[trackPosition]
    if (card && card !== document.activeElement) card.focus({ preventScroll: true })
  }, [trackPosition])

  // Both halves of the track show the same events, so jumping between them without a
  // transition is invisible and leaves room to keep moving in either direction.
  const jumpTo = (position: number) => {
    flushSync(() => {
      setIsTrackResetting(true)
      setTrackPosition(position)
    })
    // Apply the jump before the transition comes back on.
    trackRef.current?.getBoundingClientRect()
    setIsTrackResetting(false)
  }

  const step = (delta: 1 | -1) => {
    let from = trackPosition
    if (delta > 0 && from >= events.length) from -= events.length
    if (delta < 0 && from <= 0) from += events.length
    if (from !== trackPosition) jumpTo(from)
    setTrackPosition(from + delta)
  }

  const advanceEvent = () => {
    if (!eventsPaused && !reduceMotion) setTrackPosition((current) => current + 1)
  }

  return (
    <div
      className={`event-rail${eventsPaused || blocked ? ' is-paused' : ''}`}
      ref={railRef}
      role="region"
      aria-label="Local events, rotating every fifteen seconds"
      onMouseEnter={() => setEventsPaused(true)}
      onMouseLeave={() => setEventsPaused(false)}
      onFocus={() => setEventsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setEventsPaused(false)
      }}
      onKeyDown={(keyboardEvent) => {
        const key = getRemoteKey(keyboardEvent)
        if (key !== 'left' && key !== 'right') return
        keyboardEvent.preventDefault()
        keyboardEvent.stopPropagation()
        step(key === 'right' ? 1 : -1)
      }}
    >
      <div
        className={`event-track${isTrackResetting ? ' is-resetting' : ''}`}
        ref={trackRef}
        style={{ '--track-position': trackPosition } as React.CSSProperties}
        onTransitionEnd={(event) => {
          if (
            event.target === event.currentTarget &&
            event.propertyName === 'transform' &&
            trackPosition === events.length
          ) {
            jumpTo(0)
          }
        }}
      >
        {[...events, ...events].map((event, index) => {
          const eventIndex = index % events.length

          return (
            <EventCard
              event={event}
              isActive={eventIndex === activeEvent}
              isCurrent={index === trackPosition}
              isNavDefault={isNavDefault && index === trackPosition}
              key={`${event.title}-${index}`}
              onProgressComplete={advanceEvent}
              onOpen={() => onOpenEvent(event)}
            />
          )
        })}
      </div>
    </div>
  )
}

function EventCard({
  event,
  isActive,
  isCurrent,
  isNavDefault,
  onProgressComplete,
  onOpen,
}: {
  event: Event
  isActive: boolean
  isCurrent: boolean
  isNavDefault: boolean
  onProgressComplete: () => void
  onOpen: () => void
}) {
  return (
    <article
      className={`event-card${isActive ? ' is-active' : ''}`}
      role="button"
      // Roving focus: only the current card is a stop for the remote.
      tabIndex={isCurrent ? 0 : -1}
      data-nav-default={isNavDefault ? '' : undefined}
      aria-current={isCurrent ? 'true' : undefined}
      aria-label={`View details for ${event.title}`}
      onClick={onOpen}
      onKeyDown={(keyboardEvent) => {
        if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
          keyboardEvent.preventDefault()
          onOpen()
        }
      }}
    >
      {event.image ? (
        <div className="event-media">
          <img className="event-image" src={event.image.src} alt={event.image.alt} loading="lazy" />
          <span className="event-image-date" aria-label={`${event.month} ${event.date}`}>
            <strong>{event.date}</strong>
            <span>{event.month}</span>
          </span>
        </div>
      ) : (
        <div className="event-date" aria-label={`${event.month} ${event.date}`}>
          <strong>{event.date}</strong>
          <span>{event.month}</span>
        </div>
      )}
      <div className="event-copy">
        <span className="event-label">{event.label}</span>
        <h3>{event.title}</h3>
        <div className="event-meta">
          <span>{event.place}</span>
          <i aria-hidden="true" />
          <span>{event.time}</span>
        </div>
      </div>
      <span className="event-progress" aria-hidden="true">
        <span onAnimationEnd={isCurrent ? onProgressComplete : undefined} />
      </span>
    </article>
  )
}

function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches)

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)
    return () => mediaQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  return reduceMotion
}

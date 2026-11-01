import { useRef, useState } from 'react'
import { eventMonths, type Event } from '../data'
import { focusElement } from '../tv/spatial'
import { ArrowIcon } from './icons'
import { Modal } from './Modal'

export function AllEventsModal({
  onClose,
  onSelectEvent,
}: {
  onClose: () => void
  onSelectEvent: (event: Event) => void
}) {
  const [monthPosition, setMonthPosition] = useState(1)
  const previousMonthRef = useRef<HTMLButtonElement>(null)
  const nextMonthRef = useRef<HTMLButtonElement>(null)
  const month = eventMonths[monthPosition]
  const [featuredEvent, ...agendaEvents] = month.events
  const monthTitle = `${month.name} ${month.year}`
  const lastPosition = eventMonths.length - 1

  const changeMonth = (delta: number) => {
    const position = Math.min(lastPosition, Math.max(0, monthPosition + delta))
    setMonthPosition(position)

    // The button that was pressed is about to be disabled and would drop focus.
    if (position === 0 && nextMonthRef.current) focusElement(nextMonthRef.current)
    if (position === lastPosition && previousMonthRef.current) focusElement(previousMonthRef.current)
  }

  const formatAgendaDate = (event: Event) =>
    new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(new Date(month.year, month.monthIndex, Number(event.date)))

  return (
    <Modal className="monthly-events-modal" labelledBy="monthly-events-title" onClose={onClose}>
      <div className="monthly-events-header">
        <div>
          <span className="eyebrow">EVENTS NEAR YOU</span>
          <h2 id="monthly-events-title" aria-live="polite">{monthTitle}</h2>
        </div>
        <div className="month-controls" aria-label="Choose a month">
          <button
            className="month-button previous-month"
            type="button"
            ref={previousMonthRef}
            disabled={monthPosition === 0}
            aria-label="Previous month"
            onClick={() => changeMonth(-1)}
          >
            <ArrowIcon size={20} />
          </button>
          <button
            className="month-button"
            type="button"
            ref={nextMonthRef}
            disabled={monthPosition === lastPosition}
            aria-label="Next month"
            onClick={() => changeMonth(1)}
          >
            <ArrowIcon size={20} />
          </button>
          <button className="close-button" type="button" onClick={onClose} aria-label="Close all events">
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>

      <div className="monthly-events-body">
        <p className="agenda-section-label">Up Next</p>
        <article
          className="featured-month-event"
          role="button"
          tabIndex={0}
          data-nav-default=""
          aria-label={`View details for ${featuredEvent.title}`}
          onClick={() => onSelectEvent(featuredEvent)}
          onKeyDown={(keyboardEvent) => {
            if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
              keyboardEvent.preventDefault()
              onSelectEvent(featuredEvent)
            }
          }}
        >
          {featuredEvent.image && <img src={featuredEvent.image.src} alt={featuredEvent.image.alt} />}
          <div className="featured-month-shade" />
          <span className="featured-month-date">
            <strong>{featuredEvent.date}</strong>
            <span>{featuredEvent.month}</span>
          </span>
          <div className="featured-month-copy">
            <span className="event-label">{featuredEvent.label}</span>
            <h3>{featuredEvent.title}</h3>
            <p>{featuredEvent.place} · {featuredEvent.time}</p>
          </div>
        </article>

        <p className="agenda-section-label later-events-label">Later This Month</p>
        <div className="monthly-agenda">
          {agendaEvents.map((event) => (
            <article
              className="agenda-event"
              role="button"
              tabIndex={0}
              aria-label={`View details for ${event.title}`}
              key={event.title}
              onClick={() => onSelectEvent(event)}
              onKeyDown={(keyboardEvent) => {
                if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
                  keyboardEvent.preventDefault()
                  onSelectEvent(event)
                }
              }}
            >
              {event.image && <img src={event.image.src} alt="" />}
              <div className="agenda-event-copy">
                <time dateTime={`${month.year}-${String(month.monthIndex + 1).padStart(2, '0')}-${event.date}`}>
                  {formatAgendaDate(event)}
                </time>
                <span className="event-label">{event.label}</span>
                <h3>{event.title}</h3>
                <p>{event.place} · {event.time}</p>
              </div>
            </article>
          ))}
        </div>
        <button className="add-event-button" type="button">+ Add Event</button>
      </div>
    </Modal>
  )
}

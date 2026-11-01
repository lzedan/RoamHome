import { monthNames, type Event } from '../data'
import { ArrowIcon } from './icons'
import { Modal } from './Modal'

export function EventModal({ event, onClose }: { event: Event; onClose: () => void }) {
  const titleId = `event-${event.title.toLowerCase().replace(/ /g, '-')}`

  return (
    <Modal className="event-modal" labelledBy={titleId} onClose={onClose}>
      <div className="event-modal-media">
        {event.image && <img src={event.image.src} alt={event.image.alt} />}
        <div className="event-modal-shade" />
        <span className="event-modal-date" aria-label={`${event.month} ${event.date}`}>
          <strong>{event.date}</strong>
          <span>{event.month}</span>
        </span>
        <button className="close-button event-modal-close" type="button" onClick={onClose} aria-label="Close event details">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="event-modal-content">
        <span className="event-label">{event.label}</span>
        <h2 id={titleId}>{event.title}</h2>
        <p className="event-modal-description">{event.description}</p>
        <dl className="event-detail-grid">
          <div>
            <dt>Where</dt>
            <dd>{event.place}</dd>
          </div>
          <div>
            <dt>When</dt>
            <dd>{monthNames[event.month] ?? event.month} {event.date} · {event.time}</dd>
          </div>
        </dl>
        <div className="event-modal-actions">
          <button className="event-primary-action" type="button" data-nav-default="">More Info</button>
          <button className="event-secondary-action" type="button">
            Get directions <ArrowIcon size={19} />
          </button>
        </div>
      </div>
    </Modal>
  )
}

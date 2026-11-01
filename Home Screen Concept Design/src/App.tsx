import { useEffect, useState, type ReactNode } from 'react'
import heroImage from './assets/point-reyes.jpg'

type IconProps = { size?: number; className?: string }

function Icon({
  children,
  size = 24,
  className = '',
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {children}
    </svg>
  )
}

function GridIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
    </Icon>
  )
}

function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path d="m16 16 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </Icon>
  )
}

function LocationIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </Icon>
  )
}

function CloudSunIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15.5 5V3M20.4 7.1l1.4-1.4M10.6 7.1 9.2 5.7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path
        d="M8 18.5h10.5a3.5 3.5 0 0 0 .2-7 5.7 5.7 0 0 0-10.8 1.1A3 3 0 0 0 8 18.5Z"
        fill="currentColor"
        fillOpacity=".22"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path d="M10.5 9.2a5.2 5.2 0 0 1 8.1 2.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </Icon>
  )
}

function ArrowIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </Icon>
  )
}

function PinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="m9 4 6 1-1.2 4.2 3 3-4.2 1.2L9 17l-2-2 3.6-3.6 1.2-4.2L9 4Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
      <path d="m8 16-4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </Icon>
  )
}

type AppLogoName = 'youtube' | 'disney' | 'netflix' | 'spotify' | 'hdmi'

function AppLogo({ name }: { name: AppLogoName }) {
  if (name === 'youtube') {
    return (
      <svg className="brand-app-logo" viewBox="0 0 48 48" aria-hidden="true">
        <rect x="3" y="10" width="42" height="28" rx="9" fill="#ff0033" />
        <path d="m20 17 12 7-12 7V17Z" fill="white" />
      </svg>
    )
  }

  if (name === 'disney') {
    return (
      <svg className="brand-app-logo brand-app-logo-disney" viewBox="0 0 64 48" aria-hidden="true">
        <path d="M8 17C20 5 42 4 56 15" fill="none" stroke="#8ed7ff" strokeLinecap="round" strokeWidth="2.4" />
        <text x="7" y="32" fill="white" fontFamily="Georgia, serif" fontSize="17" fontStyle="italic" fontWeight="700">Disney</text>
        <path d="M53 21v10M48 26h10" stroke="white" strokeLinecap="round" strokeWidth="2" />
      </svg>
    )
  }

  if (name === 'netflix') {
    return (
      <svg className="brand-app-logo" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M13 7h8v34h-8zM27 7h8v34h-8z" fill="#b20710" />
        <path d="m21 7 14 34h-8L13 7h8Z" fill="#f6121d" />
      </svg>
    )
  }

  if (name === 'spotify') {
    return (
      <svg className="brand-app-logo" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="21" fill="#1ed760" />
        <path d="M13 19c8-2.4 18.2-1.6 25 2" fill="none" stroke="#10241b" strokeLinecap="round" strokeWidth="3.2" />
        <path d="M15 25c7-1.8 15.7-1.1 21.5 1.8" fill="none" stroke="#10241b" strokeLinecap="round" strokeWidth="2.8" />
        <path d="M17 31c5.2-1.2 11.7-.7 16 1.5" fill="none" stroke="#10241b" strokeLinecap="round" strokeWidth="2.5" />
      </svg>
    )
  }

  return (
    <svg className="brand-app-logo" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 13h32v22H8z" fill="none" stroke="white" strokeLinejoin="round" strokeWidth="2.5" />
      <path d="M16 35v4M32 35v4M13 39h22" stroke="white" strokeLinecap="round" strokeWidth="2.5" />
      <text x="24" y="29" fill="white" fontFamily="Manrope, sans-serif" fontSize="15" fontWeight="700" textAnchor="middle">3</text>
    </svg>
  )
}

type Event = {
  date: string
  month: string
  label: string
  title: string
  place: string
  time: string
  description: string
  image?: {
    src: string
    alt: string
  }
}

const events: Event[] = [
  {
    date: '18',
    month: 'JUL',
    label: 'LIVE MUSIC',
    title: 'Sunset at Stern Grove',
    place: 'Sigmund Stern Recreation Grove',
    time: '18:30',
    description: 'An open-air evening of live music beneath the eucalyptus, with Bay Area artists, picnic blankets, and golden light filtering through the trees.',
    image: {
      src: 'https://images.unsplash.com/photo-1630890045414-d8bc8a922771?auto=format&fit=crop&w=900&q=85',
      alt: 'People relaxing together beneath tall California trees',
    },
  },
  {
    date: '19',
    month: 'JUL',
    label: 'OUTDOORS',
    title: 'Baylands Sunrise Walk',
    place: 'Palo Alto Baylands',
    time: '06:30',
    description: 'Start the morning with a naturalist-led walk through the marsh as shorebirds wake and the first light reaches across the South Bay.',
    image: {
      src: 'https://images.unsplash.com/photo-1562640843-214e78d87d83?auto=format&fit=crop&w=900&q=85',
      alt: 'A green California landscape in soft morning light',
    },
  },
  {
    date: '20',
    month: 'JUL',
    label: 'LOCAL FOOD',
    title: 'Ferry Building Market',
    place: 'San Francisco Ferry Building',
    time: '09:00',
    description: 'Taste the Bay Area at its source with peak-season produce, artisan bread, local cheese, flowers, and waterfront coffee.',
    image: {
      src: 'https://images.unsplash.com/photo-1610494475096-ad11c3a21638?auto=format&fit=crop&w=900&q=85',
      alt: 'San Francisco buildings beneath a clear blue sky',
    },
  },
  {
    date: '21',
    month: 'JUL',
    label: 'ART & CULTURE',
    title: 'After Hours at SFMOMA',
    place: 'SFMOMA',
    time: '17:00',
    description: 'A relaxed evening of contemporary art, rooftop views, music, and artist-led conversations in the heart of the city.',
    image: {
      src: 'https://images.unsplash.com/photo-1576912656434-b1a36d08fb3e?auto=format&fit=crop&w=900&q=85',
      alt: 'A San Francisco streetcar moving through the city',
    },
  },
  {
    date: '22',
    month: 'JUL',
    label: 'ADVENTURE',
    title: 'Point Reyes Coastal Hike',
    place: 'Chimney Rock Trail',
    time: '16:00',
    description: 'Follow a local guide along the headlands for sweeping ocean views, coastal wildlife, and sunset over the Pacific.',
    image: {
      src: heroImage,
      alt: 'Point Reyes headlands extending into the Pacific at sunset',
    },
  },
]

const juneEvents: Event[] = [
  {
    date: '12',
    month: 'JUN',
    label: 'LOCAL FOOD',
    title: 'Garden Table at Filoli',
    place: 'Filoli Historic House & Garden',
    time: '18:30',
    description: 'A long-table dinner celebrating Peninsula farms, California wines, and the first flavors of summer in the garden.',
    image: {
      src: 'https://images.unsplash.com/photo-1562640843-214e78d87d83?auto=format&fit=crop&w=900&q=85',
      alt: 'A lush green California landscape',
    },
  },
  {
    date: '21',
    month: 'JUN',
    label: 'OUTDOORS',
    title: 'Redwood Forest Bathing',
    place: 'Purisima Creek Preserve',
    time: '09:30',
    description: 'A slow, restorative walk beneath the redwoods with guided moments for quiet observation, breathing, and tea.',
    image: {
      src: 'https://images.unsplash.com/photo-1643385924072-d9a1b39ca82c?auto=format&fit=crop&w=900&q=85',
      alt: 'Tall redwood trees in a California forest',
    },
  },
  {
    date: '27',
    month: 'JUN',
    label: 'ART & CULTURE',
    title: 'Cinema in the Park',
    place: 'Dolores Park',
    time: '21:00',
    description: 'A favorite California film on the lawn with skyline views, neighborhood food stalls, blankets, and warm drinks.',
    image: {
      src: 'https://images.unsplash.com/photo-1581847797580-a3ac8010d37c?auto=format&fit=crop&w=900&q=85',
      alt: 'San Francisco skyline silhouetted at sunset',
    },
  },
]

const augustEvents: Event[] = [
  {
    date: '03',
    month: 'AUG',
    label: 'LOCAL CULTURE',
    title: 'Night at the Exploratorium',
    place: 'Pier 15, San Francisco',
    time: '20:00',
    description: 'An adults-only evening of curious experiments, waterfront views, cocktails, and live conversations with local makers.',
    image: {
      src: 'https://images.unsplash.com/photo-1669206333066-1c858fbc7903?auto=format&fit=crop&w=900&q=85',
      alt: 'San Francisco skyline across the water',
    },
  },
  {
    date: '14',
    month: 'AUG',
    label: 'ADVENTURE',
    title: 'Golden Gate Sunrise Ride',
    place: 'Crissy Field',
    time: '07:00',
    description: 'A social bicycle ride across the bridge and into the Marin Headlands, followed by coffee and pastries in Sausalito.',
    image: {
      src: 'https://images.unsplash.com/photo-1541464522988-31b420f688b9?auto=format&fit=crop&w=900&q=85',
      alt: 'The Golden Gate Bridge on a clear California day',
    },
  },
  {
    date: '23',
    month: 'AUG',
    label: 'LOCAL FOOD',
    title: 'Tomales Bay Picnic',
    place: 'Point Reyes Station',
    time: '10:00',
    description: 'A leisurely day of local oysters, artisan bread, coastal cheese, and a picnic assembled from West Marin producers.',
    image: {
      src: heroImage,
      alt: 'Point Reyes headlands extending into the Pacific at sunset',
    },
  },
]

const eventMonths = [
  { name: 'June', year: 2025, monthIndex: 5, events: juneEvents },
  { name: 'July', year: 2025, monthIndex: 6, events },
  { name: 'August', year: 2025, monthIndex: 7, events: augustEvents },
]

const pinnedApps = [
  { name: 'YouTube', color: 'app-youtube', icon: 'youtube' },
  { name: 'Disney+', color: 'app-disney', icon: 'disney' },
  { name: 'Netflix', color: 'app-netflix', icon: 'netflix' },
  { name: 'Spotify', color: 'app-spotify', icon: 'spotify' },
  { name: 'HDMI 3', color: 'app-hdmi', icon: 'hdmi' },
] as const

const additionalApps = [
  { name: 'News', color: 'app-coral', glyph: 'N' },
  { name: 'Maps', color: 'app-blue', glyph: '⌖' },
  { name: 'Transport', color: 'app-slate', glyph: '→' },
  { name: 'Concierge', color: 'app-gold', glyph: 'C' },
  { name: 'TV', color: 'app-sky', glyph: '▭' },
]

const accentOptions = [
  { id: 'honey', name: 'Honey', color: '#f4c96b', rgb: '244 201 107' },
  { id: 'terracotta', name: 'Terracotta', color: '#df9675', rgb: '223 150 117' },
  { id: 'clay-rose', name: 'Clay rose', color: '#d8948f', rgb: '216 148 143' },
  { id: 'sage', name: 'Sage', color: '#afbf91', rgb: '175 191 145' },
  { id: 'dusty-blue', name: 'Dusty blue', color: '#91afbd', rgb: '145 175 189' },
  { id: 'mauve', name: 'Mauve', color: '#b99caf', rgb: '185 156 175' },
] as const

type AccentId = (typeof accentOptions)[number]['id']

const monthNames: Record<string, string> = {
  JAN: 'January',
  FEB: 'February',
  MAR: 'March',
  APR: 'April',
  MAY: 'May',
  JUN: 'June',
  JUL: 'July',
  AUG: 'August',
  SEP: 'September',
  OCT: 'October',
  NOV: 'November',
  DEC: 'December',
}

function formatTime(date: Date, use24Hour: boolean) {
  return new Intl.DateTimeFormat(use24Hour ? 'en-GB' : 'en-US', {
    hour: use24Hour ? '2-digit' : 'numeric',
    minute: '2-digit',
    hour12: !use24Hour,
  }).format(date).toUpperCase()
}

function getGreeting(date: Date) {
  const hour = date.getHours()

  if (hour < 12) return 'GOOD MORNING'
  if (hour < 18) return 'GOOD AFTERNOON'
  return 'GOOD EVENING'
}

function Modal({
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
  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className={`modal-surface ${className}`} role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
        {children}
      </div>
    </div>
  )
}

function AppLauncher({ onClose }: { onClose: () => void }) {
  return (
    <Modal className="launcher" labelledBy="launcher-title" onClose={onClose}>
        <div className="modal-heading">
          <div>
            <span className="eyebrow">YOUR DEVICE</span>
            <h2 id="launcher-title">Apps</h2>
          </div>
          <button className="close-button" type="button" onClick={onClose} aria-label="Close apps">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="app-grid pinned-app-grid">
          {pinnedApps.map((app) => (
            <button className="app-tile is-pinned" key={app.name} type="button">
              <span className="pin-indicator" title="Pinned">
                <PinIcon size={14} />
              </span>
              <span className={`app-icon ${app.color}`} aria-hidden="true"><AppLogo name={app.icon} /></span>
              <span>{app.name}</span>
            </button>
          ))}
        </div>
        <div className="app-divider"><span>All apps</span></div>
        <div className="app-grid">
          {additionalApps.map((app) => (
            <button className="app-tile" key={app.name} type="button">
              <span className={`app-icon ${app.color}`} aria-hidden="true">{app.glyph}</span>
              <span>{app.name}</span>
            </button>
          ))}
        </div>
    </Modal>
  )
}

function SettingsModal({
  onClose,
  showPinnedApps,
  onShowPinnedAppsChange,
  userName,
  onUserNameChange,
  accentId,
  onAccentChange,
  use24Hour,
  onUse24HourChange,
}: {
  onClose: () => void
  showPinnedApps: boolean
  onShowPinnedAppsChange: (show: boolean) => void
  userName: string
  onUserNameChange: (name: string) => void
  accentId: AccentId
  onAccentChange: (accent: AccentId) => void
  use24Hour: boolean
  onUse24HourChange: (use24Hour: boolean) => void
}) {
  return (
    <Modal className="settings-modal" labelledBy="settings-title" onClose={onClose}>
      <div className="modal-heading">
        <div>
          <span className="eyebrow">DISPLAY MODE</span>
          <h2 id="settings-title">Display Settings</h2>
        </div>
        <button className="close-button" type="button" onClick={onClose} aria-label="Close settings">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="setting-row">
        <div>
          <strong>Show app shortcuts</strong>
          <p>Turn this off for a cleaner hospitality display.</p>
        </div>
        <button
          className="toggle"
          type="button"
          role="switch"
          aria-checked={showPinnedApps}
          aria-label="Show app shortcuts"
          onClick={() => onShowPinnedAppsChange(!showPinnedApps)}
        >
          <span />
        </button>
      </div>
      <div className="setting-row">
        <div>
          <strong>Use 24-hour clock</strong>
          <p>Turn this off to display the time with AM or PM.</p>
        </div>
        <button
          className="toggle"
          type="button"
          role="switch"
          aria-checked={use24Hour}
          aria-label="Use 24-hour clock"
          onClick={() => onUse24HourChange(!use24Hour)}
        >
          <span />
        </button>
      </div>
      <label className="setting-field" htmlFor="display-name">
        <span>Display name</span>
        <small>Used in the greeting on your home screen.</small>
        <input
          id="display-name"
          type="text"
          value={userName}
          maxLength={30}
          autoComplete="name"
          onChange={(event) => onUserNameChange(event.target.value.toUpperCase())}
        />
      </label>
      <div className="setting-field">
        <span>Accent color</span>
        <small>Choose a warm, muted highlight for the display.</small>
        <div className="accent-options" role="radiogroup" aria-label="Accent color">
          {accentOptions.map((option) => (
            <button
              className="accent-option"
              type="button"
              role="radio"
              aria-checked={accentId === option.id}
              aria-label={option.name}
              key={option.id}
              onClick={() => onAccentChange(option.id)}
            >
              <span className="accent-swatch" style={{ background: option.color }} />
              <span>{option.name}</span>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  )
}

function PinnedApps({
  disabled,
  onMoreApps,
}: {
  disabled: boolean
  onMoreApps: () => void
}) {
  return (
    <nav
      className={`pinned-apps${disabled ? ' is-disabled' : ''}`}
      aria-label="Pinned apps"
      aria-hidden={disabled || undefined}
    >
      <div className="pinned-app-track">
        {pinnedApps.map((app) => (
          <button className="app-shortcut" disabled={disabled} key={app.name} type="button">
            <span className={`app-icon ${app.color}`} aria-hidden="true"><AppLogo name={app.icon} /></span>
            <span>{app.name}</span>
          </button>
        ))}
        <button className="app-shortcut" disabled={disabled} type="button" onClick={onMoreApps}>
          <span className="app-icon app-more" aria-hidden="true"><GridIcon size={22} /></span>
          <span>More apps</span>
        </button>
      </div>
    </nav>
  )
}

function HeroDetails({ className = '' }: { className?: string }) {
  return (
    <div className={`hero-details ${className}`}>
      <h1 id="hero-title" style={{ fontSize: '101px' }}>Make room<br />for wonder.</h1>
      <span className="hero-location" style={{ fontSize: '23px' }}>
        <LocationIcon size={22} /> Palo Alto, California
      </span>
      <p className="hero-description">
        The best moments are closer than you think.<br className="desktop-break" />
        See what’s happening around you.
      </p>
      <span className="hero-accent" aria-hidden="true" />
    </div>
  )
}

function EventModal({ event, onClose }: { event: Event; onClose: () => void }) {
  const titleId = `event-${event.title.toLowerCase().replaceAll(' ', '-')}`

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
          <button className="event-primary-action" type="button">More Info</button>
          <button className="event-secondary-action" type="button">
            Get directions <ArrowIcon size={19} />
          </button>
        </div>
      </div>
    </Modal>
  )
}

function AllEventsModal({
  onClose,
  onSelectEvent,
}: {
  onClose: () => void
  onSelectEvent: (event: Event) => void
}) {
  const [monthPosition, setMonthPosition] = useState(1)
  const month = eventMonths[monthPosition]
  const [featuredEvent, ...agendaEvents] = month.events
  const monthTitle = `${month.name} ${month.year}`

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
            disabled={monthPosition === 0}
            aria-label="Previous month"
            onClick={() => setMonthPosition((position) => Math.max(0, position - 1))}
          >
            <ArrowIcon size={20} />
          </button>
          <button
            className="month-button"
            type="button"
            disabled={monthPosition === eventMonths.length - 1}
            aria-label="Next month"
            onClick={() => setMonthPosition((position) => Math.min(eventMonths.length - 1, position + 1))}
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

function EventCard({
  event,
  isActive,
  isCurrent,
  onProgressComplete,
  onOpen,
}: {
  event: Event
  isActive: boolean
  isCurrent: boolean
  onProgressComplete: () => void
  onOpen: () => void
}) {
  return (
    <article
      className={`event-card${isActive ? ' is-active' : ''}`}
      role="button"
      tabIndex={0}
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

export default function App() {
  const [now, setNow] = useState(() => new Date())
  const [openModal, setOpenModal] = useState<'apps' | 'settings' | 'all-events' | null>(null)
  const [showPinnedApps, setShowPinnedApps] = useState(true)
  const [userName, setUserName] = useState('ALEX')
  const [accentId, setAccentId] = useState<AccentId>('honey')
  const [use24Hour, setUse24Hour] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [activeEvent, setActiveEvent] = useState(0)
  const [trackPosition, setTrackPosition] = useState(0)
  const [isTrackResetting, setIsTrackResetting] = useState(false)
  const [eventsPaused, setEventsPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenModal(null)
        setSelectedEvent(null)
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches)

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)
    return () => mediaQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  const advanceEvent = () => {
    if (!eventsPaused && !reduceMotion) {
      setActiveEvent((current) => (current + 1) % events.length)
      setTrackPosition((current) => current + 1)
    }
  }

  const accent = accentOptions.find((option) => option.id === accentId) ?? accentOptions[0]

  return (
    <main
      className="home"
      style={{
        '--hero-image': `url(${heroImage})`,
        '--accent': accent.color,
        '--accent-rgb': accent.rgb,
      } as React.CSSProperties}
    >
      <div className="background-credit">
        Point Reyes photo by <a href="https://unsplash.com/@danieljschwarz" target="_blank" rel="noreferrer">Daniel J. Schwarz</a>
      </div>

      <header className="topbar">
        <div className="brand-group">
          <a className="brand" href="#home" aria-label="Roam home">roam</a>
          <button
            className="brand-mark"
            type="button"
            aria-label="Open settings"
            aria-expanded={openModal === 'settings'}
            onClick={() => setOpenModal('settings')}
            style={{ width: '3.4rem', height: '3.4rem', minWidth: '3.4rem', minHeight: '3.4rem', padding: 0 }}
          >
            <svg viewBox="0 0 40 40">
              <path d="M7 30 19 8l14 22-8-5-6 7-5-8-7 6Z" fill="currentColor" />
            </svg>
          </button>
        </div>
        <nav className="top-actions" aria-label="Device controls">
          <button
            className="icon-button"
            type="button"
            aria-label="Search"
            style={{ width: '3.4rem', height: '3.4rem', minWidth: '3.4rem', minHeight: '3.4rem', padding: 0, transform: 'translateY(0.25rem)' }}
          >
            <SearchIcon size={25} />
          </button>
        </nav>
      </header>

      <section
        className="hero-content"
        id="home"
        aria-labelledby={showPinnedApps ? 'hero-title' : undefined}
        aria-label={showPinnedApps ? undefined : 'Personalized greeting'}
      >
        <p className="eyebrow hero-kicker" style={{ fontSize: '15px' }}>
          {getGreeting(now)}{userName.trim() ? `, ${userName.trim()}` : ''}
        </p>
        {showPinnedApps && <HeroDetails />}
      </section>

      <section className="events-section" id="events" aria-labelledby="events-title">
        <div className="apps-time-row">
          {showPinnedApps ? (
            <PinnedApps
              disabled={Boolean(openModal || selectedEvent)}
              onMoreApps={() => setOpenModal('apps')}
            />
          ) : (
            <HeroDetails className="relocated-hero" />
          )}
          <aside className="time-panel" aria-label="Current time, date, location, and weather">
            <time className="clock" dateTime={now.toISOString()}>{formatTime(now, use24Hour)}</time>
            <span className="time-date" style={{ fontSize: '25px', height: '40px' }}>{new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(now)}</span>
            <div className="time-context">
              <span style={{ fontSize: '29px' }}><CloudSunIcon size={20} /> 18° &nbsp; Mostly sunny</span>
            </div>
          </aside>
        </div>
        <div className="section-heading">
          <div>
            <h2 id="events-title">Happening Near You</h2>
          </div>
          <button className="text-button" type="button" onClick={() => setOpenModal('all-events')}>
            View All <ArrowIcon size={19} />
          </button>
        </div>
        <div
          className={`event-rail${eventsPaused || selectedEvent || openModal ? ' is-paused' : ''}`}
          tabIndex={0}
          aria-label="Local events, rotating every fifteen seconds"
          onMouseEnter={() => setEventsPaused(true)}
          onMouseLeave={() => setEventsPaused(false)}
          onFocus={() => setEventsPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setEventsPaused(false)
          }}
        >
          <div
            className={`event-track${isTrackResetting ? ' is-resetting' : ''}`}
            style={{ '--track-position': trackPosition } as React.CSSProperties}
            onTransitionEnd={(event) => {
              if (
                event.target === event.currentTarget &&
                event.propertyName === 'transform' &&
                trackPosition === events.length
              ) {
                setIsTrackResetting(true)
                setTrackPosition(0)
                window.requestAnimationFrame(() => {
                  window.requestAnimationFrame(() => setIsTrackResetting(false))
                })
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
                  key={`${event.title}-${index}`}
                  onProgressComplete={advanceEvent}
                  onOpen={() => setSelectedEvent(event)}
                />
              )
            })}
          </div>
        </div>
      </section>

      {openModal === 'apps' && <AppLauncher onClose={() => setOpenModal(null)} />}
      {openModal === 'all-events' && (
        <AllEventsModal
          onClose={() => setOpenModal(null)}
          onSelectEvent={(event) => {
            setOpenModal(null)
            setSelectedEvent(event)
          }}
        />
      )}
      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      {openModal === 'settings' && (
        <SettingsModal
          onClose={() => setOpenModal(null)}
          showPinnedApps={showPinnedApps}
          onShowPinnedAppsChange={setShowPinnedApps}
          userName={userName}
          onUserNameChange={setUserName}
          accentId={accentId}
          onAccentChange={setAccentId}
          use24Hour={use24Hour}
          onUse24HourChange={setUse24Hour}
        />
      )}
    </main>
  )
}

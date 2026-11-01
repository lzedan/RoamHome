import { pinnedApps } from '../data'
import { AppLogo, CloudSunIcon, GridIcon, LocationIcon } from './icons'

export function PinnedApps({
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
        {pinnedApps.map((app, index) => (
          <button className="app-shortcut" data-nav-default={index === 0 ? '' : undefined} disabled={disabled} key={app.name} type="button">
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

export function HeroDetails({ className = '' }: { className?: string }) {
  return (
    <div className={`hero-details ${className}`}>
      <h1 id="hero-title">Make room<br />for wonder.</h1>
      <span className="hero-location">
        <LocationIcon size={22} /> Palo Alto, California
      </span>
      <p className="hero-description">
        The best moments are closer than you think.<br />
        See what’s happening around you.
      </p>
      <span className="hero-accent" aria-hidden="true" />
    </div>
  )
}

export function TimePanel({ now, use24Hour }: { now: Date; use24Hour: boolean }) {
  return (
    <aside className="time-panel" aria-label="Current time, date, location, and weather">
      <time className="clock" dateTime={now.toISOString()}>{formatTime(now, use24Hour)}</time>
      <span className="time-date">{new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(now)}</span>
      <div className="time-context">
        <span><CloudSunIcon size={20} /> 18° &nbsp; Mostly sunny</span>
      </div>
    </aside>
  )
}

function formatTime(date: Date, use24Hour: boolean) {
  return new Intl.DateTimeFormat(use24Hour ? 'en-GB' : 'en-US', {
    hour: use24Hour ? '2-digit' : 'numeric',
    minute: '2-digit',
    hour12: !use24Hour,
  }).format(date).toUpperCase()
}

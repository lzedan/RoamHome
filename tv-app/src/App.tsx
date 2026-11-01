import { useEffect, useState } from 'react'
import { AllEventsModal } from './components/AllEventsModal'
import { AppLauncher } from './components/AppLauncher'
import { EventModal } from './components/EventModal'
import { EventRail } from './components/EventRail'
import { HeroDetails, PinnedApps, TimePanel } from './components/HomeSections'
import { ArrowIcon, SearchIcon } from './components/icons'
import { ModalBackdrop } from './components/ModalBackdrop'
import { SettingsModal } from './components/SettingsModal'
import { accentOptions, events, heroImage, type AccentId, type Event } from './data'
import { platform } from './platform'
import { useRemoteNavigation } from './tv/useRemoteNavigation'

// How long the remote can sit untouched before the home screen lets go of focus.
const idleMs = 30_000

function getGreeting(date: Date) {
  const hour = date.getHours()

  if (hour < 12) return 'GOOD MORNING'
  if (hour < 18) return 'GOOD AFTERNOON'
  return 'GOOD EVENING'
}

/** The current time, updated on each minute boundary (the clock never shows seconds). */
function useCurrentMinute() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let timer = 0
    const tick = () => {
      const current = new Date()
      setNow(current)
      timer = window.setTimeout(tick, 60_000 - current.getSeconds() * 1000 - current.getMilliseconds())
    }
    tick()
    return () => window.clearTimeout(timer)
  }, [])

  return now
}

export default function App() {
  const now = useCurrentMinute()
  const [openModal, setOpenModal] = useState<'apps' | 'settings' | 'all-events' | null>(null)
  const [showPinnedApps, setShowPinnedApps] = useState(true)
  const [userName, setUserName] = useState('ALEX')
  const [accentId, setAccentId] = useState<AccentId>('honey')
  const [use24Hour, setUse24Hour] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  useRemoteNavigation({ onExit: platform.exit, idleMs })

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
      <div className="background-credit">Point Reyes photo by Daniel J. Schwarz</div>

      <header className="topbar">
        <div className="brand-group">
          <span className="brand">roam</span>
          <button
            className="brand-mark"
            type="button"
            aria-label="Open settings"
            aria-expanded={openModal === 'settings'}
            onClick={() => setOpenModal('settings')}
          >
            <svg viewBox="0 0 40 40">
              <path d="M7 30 19 8l14 22-8-5-6 7-5-8-7 6Z" fill="currentColor" />
            </svg>
          </button>
        </div>
        <nav className="top-actions" aria-label="Device controls">
          <button className="icon-button" type="button" aria-label="Search">
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
        <p className="eyebrow hero-kicker">
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
          <TimePanel now={now} use24Hour={use24Hour} />
        </div>
        <div className="section-heading">
          <div>
            <h2 id="events-title">Happening Near You</h2>
          </div>
          <button className="text-button" type="button" onClick={() => setOpenModal('all-events')}>
            View All <ArrowIcon size={19} />
          </button>
        </div>
        <EventRail
          events={events}
          blocked={Boolean(selectedEvent || openModal)}
          isNavDefault={!showPinnedApps}
          onOpenEvent={setSelectedEvent}
        />
      </section>

      {platform.effects === 'lite' && <ModalBackdrop src={heroImage} visible={Boolean(openModal || selectedEvent)} />}
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

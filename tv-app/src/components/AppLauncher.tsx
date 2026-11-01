import { additionalApps, pinnedApps } from '../data'
import { AppLogo, PinIcon } from './icons'
import { Modal } from './Modal'

export function AppLauncher({ onClose }: { onClose: () => void }) {
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
          {pinnedApps.map((app, index) => (
            <button className="app-tile is-pinned" data-nav-default={index === 0 ? '' : undefined} key={app.name} type="button">
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

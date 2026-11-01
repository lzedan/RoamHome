import { accentOptions, type AccentId } from '../data'
import { Modal } from './Modal'
import { RemoteTextField } from './RemoteTextField'

export function SettingsModal({
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
          data-nav-default=""
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
        <RemoteTextField
          id="display-name"
          value={userName}
          maxLength={30}
          autoComplete="name"
          onChange={(name) => onUserNameChange(name.toUpperCase())}
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

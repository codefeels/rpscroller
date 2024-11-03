import BaseDialog from './BaseDialog'
import Checkbox from './Checkbox'
import { settingsMap, useAppStore } from './store'
import { useSmallScreen } from './useSmallScreen'

export default function SettingsDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const store = useAppStore()
  const small = useSmallScreen()
  return (
    <BaseDialog open={open} onClose={onClose}>
      <h4>Settings</h4>
      {Object.entries(settingsMap)
        .filter(([, val]) => (!small && val.smallScreensOnly ? false : true))
        .map(([key, { title, callback }]) => (
          <Checkbox
            id={key}
            key={key}
            checked={store[key as keyof typeof store] as boolean}
            label={title}
            onChange={event => {
              callback(event.target.checked, store)
            }}
          />
        ))}
    </BaseDialog>
  )
}

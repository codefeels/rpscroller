import BaseDialog from './BaseDialog'
import Checkbox from './Checkbox'
import { settingsMap, useAppStore } from './store'

export default function SettingsDialog({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (arg: boolean) => void
}) {
  const store = useAppStore()
  return (
    <BaseDialog open={open} setOpen={setOpen}>
      <h4>Settings</h4>
      {Object.entries(settingsMap).map(([key, [title, callback]]) => {
        return (
          <Checkbox
            id={key}
            key={key}
            checked={store[key as keyof typeof store] as boolean}
            label={title}
            onChange={event => {
              callback(event.target.checked, store)
            }}
          />
        )
      })}
    </BaseDialog>
  )
}

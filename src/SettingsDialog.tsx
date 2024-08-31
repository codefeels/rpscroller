import BaseDialog from './BaseDialog'
import { settingsMap, useAppStore } from './store'

export default function Settings({
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
          <div key={key}>
            <input
              id={key}
              type="checkbox"
              checked={store[key as keyof typeof store] as boolean}
              onChange={event => {
                callback(event.target.checked, store)
              }}
            />
            <label htmlFor={key}>{title}</label>
          </div>
        )
      })}
    </BaseDialog>
  )
}

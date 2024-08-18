import { settingsMap, useAppStore } from './store'

export default function Settings() {
  const store = useAppStore()
  return (
    <div className="lg:m-10">
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
    </div>
  )
}

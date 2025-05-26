import { useAppStore } from './store'
import { modeMap } from './util'

export default function Sorts() {
  const store = useAppStore()
  const { mode } = store

  return (
    <div className="relative">
      <select
        value={mode}
        className="select"
        onChange={event => {
          store.setMode(event.target.value)
        }}
      >
        {[...modeMap.entries()].map(([key, val]) => (
          <option
            key={key}
            value={key}
            onClick={() => {
              store.setMode(key)
            }}
          >
            {val.title}
          </option>
        ))}
      </select>
    </div>
  )
}

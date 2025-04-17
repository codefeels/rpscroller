
import { GoChevronDown } from 'react-icons/go'

// components
import MenuItem from './MenuItem'
import { useAppStore } from './store'
import { modeMap } from './util'

export default function Sorts() {
  const store = useAppStore()
  const { mode } = store

  return (
    <div className="relative">
      <details className="dropdown dropdown-bottom dropdown-end">
        <summary className="btn m-1">
          {modeMap.get(mode)?.title}
          <GoChevronDown className="inline" />
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          {[...modeMap.entries()].map(([key, val]) => (
            <MenuItem
              key={key}
              onClick={() => {
                store.setMode(key)
              }}
            >
              <label htmlFor={key}>{val.title}</label>
              <input
                id={key}
                value={key}
                type="radio"
                checked={mode === key}
                onChange={event => {
                  store.setMode(event.target.value)
                }}
              />
            </MenuItem>
          ))}
        </ul>
      </details>
    </div>
  )
}

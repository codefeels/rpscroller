import { useNavigate } from 'react-router-dom'

import { useAppStore } from './store'
import { modeMap } from './util'

export default function Sorts() {
  const store = useAppStore()
  const { mode, val } = store
  const navigate = useNavigate()

  const handleModeChange = (newMode: string) => {
    store.setMode(newMode)

    // Update URL with new mode
    if (val) {
      const searchParams = new URLSearchParams()
      if (newMode !== 'hot') {
        searchParams.set('mode', newMode)
      }

      const search = searchParams.toString()
        ? `?${searchParams.toString()}`
        : ''
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      navigate(`/${val}${search}`, { replace: true })
    }
  }

  return (
    <div className="relative">
      <select
        value={mode}
        className="select"
        onChange={event => {
          handleModeChange(event.target.value)
        }}
      >
        {[...modeMap.entries()].map(([key, val]) => (
          <option
            key={key}
            value={key}
            onClick={() => {
              handleModeChange(key)
            }}
          >
            {val.title}
          </option>
        ))}
      </select>
    </div>
  )
}

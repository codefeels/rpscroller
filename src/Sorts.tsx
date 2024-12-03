import { FaChevronDown } from 'react-icons/fa'

import { useAppStore } from './store'
import { modeMap } from './util'

export default function Sorts() {
  const store = useAppStore()
  const { mode } = store

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        {mode} <FaChevronDown />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {[...modeMap.entries()].map(([key, val]) => {
          return (
            <li
              key={key}
              onClick={() => {
                store.setMode(key)
              }}
            >
              <a>{val.title}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

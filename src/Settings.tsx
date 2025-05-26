import { IoIosSettings } from 'react-icons/io'

import Button from './Button'
import Checkbox from './Checkbox'
import { settingsMap, useAppStore } from './store'
import { useSmallScreen } from './useSmallScreen'

export default function Settings() {
  const store = useAppStore()
  const small = useSmallScreen()

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <Button className="ml-2">
        <IoIosSettings />
      </Button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {Object.entries(settingsMap)
          .filter(([, val]) => (!small && val.smallScreensOnly ? false : true))
          .map(([key, { title, callback }]) => (
            <li key={key}>
              <Checkbox
                id={key}
                checked={store[key as keyof typeof store] as boolean}
                label={title}
                onChange={event => {
                  callback(event.target.checked, store)
                }}
              />{' '}
            </li>
          ))}
      </ul>
    </div>
  )
}

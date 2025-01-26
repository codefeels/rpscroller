import { useEffect, useRef, useState } from 'react'

// icons
import { GoChevronDown } from 'react-icons/go'

// components
import Button from './Button'
import MenuItem from './MenuItem'
import { useAppStore } from './store'
import { modeMap } from './util'

export default function Sorts() {
  const store = useAppStore()
  const { mode } = store
  const [showMenu, setShowMenu] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={ref} className="relative">
      <Button
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        onClick={() => {
          setShowMenu(showMenu => !showMenu)
        }}
      >
        {modeMap.get(mode)?.title}
        <GoChevronDown className="inline" />
      </Button>
      {showMenu ? (
        <div
          className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden bg-white dark:bg-black"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
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
        </div>
      ) : null}
    </div>
  )
}

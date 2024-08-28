import { useEffect, useRef, useState } from 'react'
import { useAppStore } from './store'
import Button from './Button'
import { GoChevronDown } from 'react-icons/go'
import MenuItem from './MenuItem'

const map = {
  hot: 'Hot',
  new: 'New',
  topday: 'Top (day)',
  topmonth: 'Top (month)',
  topyear: 'Top (year)',
  topall: 'Top (all time)',
}

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
    <span ref={ref} className="relative">
      <Button
        onClick={() => {
          setShowMenu(showMenu => !showMenu)
        }}
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        {map[mode as keyof typeof map]}
        <GoChevronDown className="inline" />
      </Button>
      {showMenu ? (
        <div
          className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white dark:bg-black"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {Object.entries(map).map(([key, val]) => {
            return (
              <MenuItem
                key={key}
                onClick={() => {
                  store.setMode(key)
                }}
              >
                <label htmlFor={key}>{val}</label>
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
            )
          })}
        </div>
      ) : null}
    </span>
  )
}

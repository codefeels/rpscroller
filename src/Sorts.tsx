import { useEffect, useRef, useState } from 'react'
import { useAppStore } from './store'

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
      <button
        type="button"
        onClick={() => {
          setShowMenu(showMenu => !showMenu)
        }}
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        {map[mode as keyof typeof map]}
        <svg
          className="-mr-1 h-3 w-3 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
        </svg>
      </button>
      {showMenu ? (
        <div
          className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white dark:bg-black"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {Object.entries(map).map(([key, val]) => {
            return (
              <div key={key}>
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
              </div>
            )
          })}
        </div>
      ) : null}
    </span>
  )
}

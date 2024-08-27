import { useEffect, useRef, useState } from 'react'

import Settings from './Settings'
import Favorites from './Favorites'
import SearchBox from './SearchBox'
import MakeMultiReddit from './MakeMultiReddit'

import flame from './favicon.svg'

// icons
import { FaShoppingCart } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { IoIosSettings } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'
import Link from './Link'

export default function Header() {
  const [currentlyOpen, setCurrentlyOpen] = useState<
    'settings' | 'favorites' | 'multi'
  >()

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <div className="mb-10 sticky top-0">
      <h1>
        <span ref={ref} className="relative">
          <GiHamburgerMenu
            className="h-6 w-6 inline hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={() => {
              setOpen(!open)
            }}
          />
          {open ? (
            <div
              className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg focus:outline-none bg-white dark:bg-black"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="hover:bg-gray-300 dark:hover:bg-gray-600">
                <button
                  onClick={() => {
                    setCurrentlyOpen(
                      currentlyOpen === 'settings' ? undefined : 'settings',
                    )
                  }}
                >
                  <IoIosSettings className="inline" /> Settings
                </button>
              </div>
              <div className="hover:bg-gray-300 dark:hover:bg-gray-600">
                <button
                  onClick={() => {
                    setCurrentlyOpen(
                      currentlyOpen === 'favorites' ? undefined : 'favorites',
                    )
                  }}
                >
                  <MdFavorite className="inline" /> Favorites
                </button>
              </div>
              <div className="hover:bg-gray-300 dark:hover:bg-gray-600">
                <button
                  onClick={() => {
                    setCurrentlyOpen(
                      currentlyOpen === 'multi' ? undefined : 'multi',
                    )
                  }}
                >
                  <FaShoppingCart className="inline" /> Multi-reddit maker
                </button>
              </div>
              <div>
                <Link
                  href="https://github.com/codefeels/rpscroller/"
                  target="_blank"
                  rel="noreferrer"
                >
                  About
                </Link>
              </div>
            </div>
          ) : null}
        </span>{' '}
        rpscroller{' '}
        <img className="h-8 inline" src={flame} alt="app icon of flames" />
        <SearchBox />
      </h1>

      {currentlyOpen === 'settings' ? <Settings /> : null}
      {currentlyOpen === 'favorites' ? <Favorites /> : null}
      {currentlyOpen === 'multi' ? <MakeMultiReddit /> : null}
    </div>
  )
}

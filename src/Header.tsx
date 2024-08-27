import { useEffect, useRef, useState } from 'react'

import SettingsDialog from './SettingsDialog'
import FavoritesDialog from './FavoritesDialog'
import MakeMultiRedditDialog from './MakeMultiRedditDialog'
import SearchBox from './SearchBox'

import flame from './favicon.svg'

// icons
import { FaShoppingCart } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { IoIosSettings } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'
import Link from './Link'
import Sorts from './Sorts'

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
    <div className="mb-10 sticky top-0 bg-inherit header">
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
              className="absolute left-0 z-10 mt-2 origin-top-right rounded-md shadow-lg focus:outline-none bg-white dark:bg-black"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <SearchBox />
              <div
                className="hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => {
                  setCurrentlyOpen(
                    currentlyOpen === 'settings' ? undefined : 'settings',
                  )
                  setOpen(false)
                }}
              >
                <IoIosSettings className="inline" /> Settings
              </div>
              <div
                className="hover:bg-gray-300 dark:hover:bg-gray-600  cursor-pointer"
                onClick={() => {
                  setCurrentlyOpen(
                    currentlyOpen === 'favorites' ? undefined : 'favorites',
                  )
                  setOpen(false)
                }}
              >
                <MdFavorite className="inline" /> Favorites
              </div>
              <div
                className="hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => {
                  setCurrentlyOpen(
                    currentlyOpen === 'multi' ? undefined : 'multi',
                  )
                  setOpen(false)
                }}
              >
                <FaShoppingCart className="inline" /> Multi-reddit maker
              </div>
              <Sorts />
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
      </h1>

      {currentlyOpen === 'settings' ? (
        <SettingsDialog
          open
          setOpen={() => {
            setCurrentlyOpen(undefined)
          }}
        />
      ) : null}
      {currentlyOpen === 'favorites' ? (
        <FavoritesDialog
          open
          setOpen={() => {
            setCurrentlyOpen(undefined)
          }}
        />
      ) : null}
      {currentlyOpen === 'multi' ? (
        <MakeMultiRedditDialog
          open
          setOpen={() => {
            setCurrentlyOpen(undefined)
          }}
        />
      ) : null}
    </div>
  )
}

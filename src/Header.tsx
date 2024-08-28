import { useEffect, useRef, useState } from 'react'

import SettingsDialog from './SettingsDialog'
import FavoritesDialog from './FavoritesDialog'
import MakeMultiRedditDialog from './MakeMultiRedditDialog'

import flame from './favicon.svg'

// icons
import { GiHamburgerMenu } from 'react-icons/gi'
import HeaderMenu from './HeaderMenu'
import { useAppStore } from './store'

export default function Header() {
  const { keepMenuOpen } = useAppStore()
  const [currentlyOpen, setCurrentlyOpen] = useState<
    'settings' | 'favorites' | 'multi' | undefined
  >()

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !keepMenuOpen
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [keepMenuOpen])
  return (
    <div className="mb-10 sticky top-0 bg-inherit header">
      <h1>
        <span ref={ref} className="relative">
          <GiHamburgerMenu
            className="h-8 w-8 inline hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={() => {
              setOpen(!open)
            }}
          />
          {open ? (
            <HeaderMenu
              setCurrentlyOpen={arg => {
                setCurrentlyOpen(arg)
                setOpen(false)
              }}
            />
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

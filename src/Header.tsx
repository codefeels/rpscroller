import { useState } from 'react'

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

export default function Header() {
  const [currentlyOpen, setCurrentlyOpen] = useState<
    'settings' | 'favorites' | 'multi'
  >()

  const [open, setOpen] = useState(false)
  return (
    <div className="mb-10 sticky top-0">
      <h1>
        <span className="relative">
          <GiHamburgerMenu
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
              <button
                onClick={() => {
                  setCurrentlyOpen(
                    currentlyOpen === 'settings' ? undefined : 'settings',
                  )
                }}
              >
                {currentlyOpen === 'settings'
                  ? 'Hide settings'
                  : 'Show settings'}{' '}
                <IoIosSettings />
              </button>
              <button
                onClick={() => {
                  setCurrentlyOpen(
                    currentlyOpen === 'favorites' ? undefined : 'favorites',
                  )
                }}
              >
                {currentlyOpen === 'favorites'
                  ? 'Hide favorites'
                  : 'Show favorites'}{' '}
                <MdFavorite />
              </button>
              <button
                onClick={() => {
                  setCurrentlyOpen(
                    currentlyOpen === 'multi' ? undefined : 'multi',
                  )
                }}
              >
                {currentlyOpen === 'multi'
                  ? 'Hide multi-reddit maker'
                  : 'Show multi-reddit maker'}{' '}
                <FaShoppingCart />
              </button>
            </div>
          ) : null}
        </span>{' '}
        rpscroller <img className="h-8" src={flame} alt="app icon of flames" />
        <SearchBox />
      </h1>

      {currentlyOpen === 'settings' ? <Settings /> : null}
      {currentlyOpen === 'favorites' ? <Favorites /> : null}
      {currentlyOpen === 'multi' ? <MakeMultiReddit /> : null}
    </div>
  )
}

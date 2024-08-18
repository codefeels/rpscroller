import { useState } from 'react'

import Settings from './Settings'
import Favorites from './Favorites'
import SearchBox from './SearchBox'
import Sorts from './Sorts'

import flame from './favicon.svg'

// icons
import { FaShoppingCart } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { IoIosSettings } from 'react-icons/io'
import MakeMultiReddit from './MakeMultiReddit'

export default function Header() {
  const [currentlyOpen, setCurrentlyOpen] = useState<
    'settings' | 'favs' | 'multi'
  >()

  return (
    <div className="mb-10">
      <h1>
        rpscroller <img className="h-8" src={flame} alt="app icon of flames" />
      </h1>
      <SearchBox />

      <div>
        <button
          onClick={() => {
            setCurrentlyOpen(
              currentlyOpen === 'settings' ? undefined : 'settings',
            )
          }}
        >
          {currentlyOpen === 'settings' ? 'Hide settings' : 'Show settings'}{' '}
          <IoIosSettings />
        </button>
        <button
          onClick={() => {
            setCurrentlyOpen(currentlyOpen === 'favs' ? undefined : 'favs')
          }}
        >
          {currentlyOpen === 'favs' ? 'Hide favs' : 'Show favs'} <MdFavorite />
        </button>
        <button
          onClick={() => {
            setCurrentlyOpen(currentlyOpen === 'multi' ? undefined : 'multi')
          }}
        >
          {currentlyOpen === 'multi'
            ? 'Hide multi-reddit maker'
            : 'Show multi-reddit maker'}{' '}
          <FaShoppingCart />
        </button>
        <Sorts />
      </div>
      {currentlyOpen === 'settings' ? <Settings /> : null}
      {currentlyOpen === 'favs' ? <Favorites /> : null}
      {currentlyOpen === 'multi' ? <MakeMultiReddit /> : null}
    </div>
  )
}

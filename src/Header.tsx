import { useState } from 'react'

import Settings from './Settings'
import Favorites from './Favorites'
import SearchBox from './SearchBox'

import flame from './favicon.svg'
import Sorts from './Sorts'

export default function Header() {
  const [showSettings, setShowSettings] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)

  return (
    <div className="mb-10">
      <h1>
        rpscroller <img className="h-8" src={flame} alt="app icon of flames" />
      </h1>
      <SearchBox />

      <div>
        <button onClick={() => setShowSettings(!showSettings)}>
          {showSettings ? 'Hide settings' : 'Show settings'}
        </button>
        <button onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? 'Hide favs' : 'Show favs'}
        </button>
      </div>
      {showSettings ? <Settings /> : null}
      {showFavorites ? <Favorites /> : null}
      <Sorts />
    </div>
  )
}

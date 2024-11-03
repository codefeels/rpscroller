// data
import { useAppStore } from './store'

// icon
import flame from './favicon.svg'

// components
import SearchBox from './SearchBox'
import Sorts from './Sorts'

// icons
import { GiHamburgerMenu } from 'react-icons/gi'

// utils
import { useSmallScreen } from './useSmallScreen'

export default function HeaderBar() {
  const store = useAppStore()
  const { headerOnBottomOfScreen } = store
  const small = useSmallScreen()
  return headerOnBottomOfScreen ? (
    <div className="lg:p-2 flex myheader z-10 w-full border-t-2 border-slate-500 fixed bottom-0 right-0">
      <Sorts />
      <div className="grow" />
      <GiHamburgerMenu
        id="menubutton"
        className="h-8 w-8 inline hover:bg-gray-300 dark:hover:bg-gray-600 mr-1"
        onClick={() => {
          store.toggleSidebarOpen()
        }}
      />
      rpscroller
      <img className="h-8 inline" src={flame} alt="app icon" />
    </div>
  ) : (
    <div className="lg:p-2 myheader z-10 w-full border-b-2 border-slate-500 flex sticky top-0">
      <GiHamburgerMenu
        id="menubutton"
        className="h-8 w-8 inline hover:bg-gray-300 dark:hover:bg-gray-600 mr-1"
        onClick={() => {
          store.toggleSidebarOpen()
        }}
      />
      rpscroller
      <img className="h-8 inline" src={flame} alt="app icon" />
      <div className="grow" />
      {small ? null : <SearchBox />}
      <div className="grow" />
      <Sorts />
    </div>
  )
}

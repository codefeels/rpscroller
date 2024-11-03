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

function Logo() {
  return (
    <>
      <a href="/">rpscroller</a>
      <img className="h-8 inline" src={flame} alt="app icon" />
    </>
  )
}

function Spacer() {
  return <div className="grow" />
}

function HamburgerMenu() {
  const store = useAppStore()
  return (
    <GiHamburgerMenu
      id="menubutton"
      className="h-8 w-8 inline hover:bg-gray-300 dark:hover:bg-gray-600 mr-1"
      onClick={() => {
        store.toggleSidebarOpen()
      }}
    />
  )
}

export default function HeaderBar() {
  const store = useAppStore()
  const { headerOnBottomOfScreen } = store
  const small = useSmallScreen()
  return small && headerOnBottomOfScreen ? (
    <div className="lg:p-2 myheader z-10 w-full border-t-2 border-slate-500 fixed flex bottom-0 right-0">
      <Sorts />
      <Spacer />
      <HamburgerMenu />
      <Logo />
    </div>
  ) : (
    <div className="lg:p-2 myheader z-10 w-full border-b-2 border-slate-500 flex sticky top-0">
      <HamburgerMenu />
      <Logo />
      <Spacer />
      {small ? null : <SearchBox />}
      <Spacer />
      <Sorts />
    </div>
  )
}

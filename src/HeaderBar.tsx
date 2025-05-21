import { GiHamburgerMenu } from 'react-icons/gi'

import SearchBox from './SearchBox'
import Sorts from './Sorts'
import flame from './favicon.svg'
import { useAppStore } from './store'
import { useSmallScreen } from './useSmallScreen'
import Settings from './Settings'

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

function SmallScreenHeaderOnBottom() {
  return (
    <div className="lg:p-2 myheader z-10 w-full border-t-2 border-slate-500 fixed flex bottom-0 right-0">
      <Sorts />
      <Settings />
      <Spacer />
      <HamburgerMenu />
      <Logo />
    </div>
  )
}

function NormalHeader() {
  const small = useSmallScreen()
  return (
    <div className="lg:p-2 myheader z-10 w-full border-b-2 border-slate-500 flex sticky top-0">
      <HamburgerMenu />
      <Logo />
      <Spacer />
      {small ? null : <SearchBox />}
      <Spacer />
      <Sorts />
      <Settings />
    </div>
  )
}

export default function HeaderBar() {
  const { headerOnBottomOfScreen } = useAppStore()
  const small = useSmallScreen()
  return small && headerOnBottomOfScreen ? (
    <SmallScreenHeaderOnBottom />
  ) : (
    <NormalHeader />
  )
}

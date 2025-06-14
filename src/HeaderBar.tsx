import HamburgerMenu from './HamburgerMenu'
import Logo from './Logo'
import SearchBox from './SearchBox'
import Settings from './Settings'
import Sorts from './Sorts'
import { useAppStore } from './store'
import { useIsSmallScreen } from './useIsSmallScreen'

function Spacer() {
  return <div className="grow" />
}

function SmallScreenHeaderOnBottom() {
  return (
    <div className="lg:p-2 z-10 w-full border-t-2 border-slate-500 bg-inherit fixed flex bottom-0 right-0">
      <Sorts />
      <Settings />
      <Spacer />
      <HamburgerMenu />
      <Logo />
    </div>
  )
}

function NormalHeader() {
  const small = useIsSmallScreen()
  return (
    <div className="lg:p-2 z-10 w-full border-b-2 border-slate-500 bg-inherit flex sticky top-0">
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
  const small = useIsSmallScreen()
  return small && headerOnBottomOfScreen ? (
    <SmallScreenHeaderOnBottom />
  ) : (
    <NormalHeader />
  )
}

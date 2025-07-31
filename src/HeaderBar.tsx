import { useCallback, useEffect, useRef, useState } from 'react'

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

type R = ReturnType<typeof setTimeout>
function AutoScrollButton() {
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollIntervalRef = useRef<R | null>(null)

  const toggleAutoScroll = useCallback(() => {
    setIsScrolling(prev => {
      if (prev) {
        // Stop scrolling
        if (scrollIntervalRef.current) {
          clearInterval(scrollIntervalRef.current)
          scrollIntervalRef.current = null
        }
        return false
      } else {
        // Start scrolling
        scrollIntervalRef.current = setInterval(() => {
          window.scrollBy({
            top: 20,
            behavior: 'smooth',
          })
        }, 20)
        return true
      }
    })
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && event.target === document.body) {
        event.preventDefault()
        toggleAutoScroll()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current)
      }
    }
  }, [toggleAutoScroll])

  return (
    <button onClick={toggleAutoScroll} className={`btn btn-soft`}>
      Autoscroll {isScrolling ? '⏸' : '▶'}
    </button>
  )
}

function SmallScreenHeaderOnBottom() {
  return (
    <div className="lg:p-2 z-10 w-full border-t-2 border-slate-500 bg-inherit fixed flex bottom-0 right-0">
      <Sorts />
      <Settings />
      <AutoScrollButton />
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
      <AutoScrollButton />
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

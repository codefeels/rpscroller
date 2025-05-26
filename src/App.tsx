import { Suspense, lazy, useEffect } from 'react'

import DialogHelper from './DialogHelper'
import HeaderBar from './HeaderBar'
import { useAppStore } from './store'
import { useSmallScreen } from './useSmallScreen'

// lazies
const MobileApp = lazy(() => import('./MobileApp'))
const DesktopApp = lazy(() => import('./DesktopApp'))

export default function App() {
  const store = useAppStore()
  const { val } = store
  const small = useSmallScreen()

  // Handle forward/back buttons
  useEffect(() => {
    function onPopState(event: PopStateEvent) {
      if (event.state) {
        store.setVal((event.state as { val: string }).val)
      }
    }
    window.addEventListener('popstate', onPopState)
    return () => {
      window.removeEventListener('popstate', onPopState)
    }
  }, [store])

  useEffect(() => {
    if (store.smallScreen !== small) {
      store.setSmallScreen(small)
    }
  }, [small, store])

  useEffect(() => {
    document.title = val.slice(0, 20)
  }, [val, store])

  useEffect(() => {
    function listener() {
      if (document.fullscreenElement) {
        store.setIsFullscreen(true)
      } else {
        store.setIsFullscreen(false)
      }
    }
    document.addEventListener('fullscreenchange', listener)
    return () => {
      document.removeEventListener('fullscreenchange', listener)
    }
  }, [store])

  // update URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    params.set('val', val)
    window.history.pushState({ val }, '', `?${params.toString()}`)
  }, [val])

  return (
    <>
      <HeaderBar />
      <Suspense fallback={null}>
        {small ? <MobileApp /> : <DesktopApp />}
      </Suspense>
      <DialogHelper />
    </>
  )
}

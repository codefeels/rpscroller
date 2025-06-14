import { Suspense, lazy, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import DialogHelper from './DialogHelper'
import HeaderBar from './HeaderBar'
import { useAppStore } from './store'
import { useIsSmallScreen } from './useIsSmallScreen'

// lazies
const MobileApp = lazy(() => import('./MobileApp'))
const DesktopApp = lazy(() => import('./DesktopApp'))

export default function App() {
  const store = useAppStore()
  const { val } = store
  const small = useIsSmallScreen()
  const location = useLocation()

  // Parse hash location and update store
  useEffect(() => {
    // Extract val from hash path or search params
    const hashPath = location.pathname.slice(1) // Remove leading slash
    const searchParams = new URLSearchParams(location.search)
    const modeParam = searchParams.get('mode') ?? 'hot'

    // If we have a path, use it as val
    if (hashPath && hashPath !== val) {
      store.setVal(hashPath)
    }
    // If we have a mode param, update it
    if (modeParam !== store.mode) {
      store.setMode(modeParam)
    }
  }, [location, store, val])

  useEffect(() => {
    if (store.smallScreen !== small) {
      store.setSmallScreen(small)
    }
  }, [small, store])

  useEffect(() => {
    document.title = val ? val.slice(0, 20) : 'rpscroller'
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

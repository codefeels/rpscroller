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
  const setVal = useAppStore(state => state.setVal)

  useEffect(() => {
    const hashPath = location.pathname.slice(1)
    if (hashPath) {
      setVal(hashPath)
    }
  }, [location, setVal])

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

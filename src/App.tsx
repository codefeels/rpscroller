import { Suspense, lazy, useEffect, useRef } from 'react'

import DialogHelper from './DialogHelper'
import HeaderBar from './HeaderBar'
import { useAppStore } from './store'
import { useCurrentPage } from './useCurrentPage'
import { useIsSmallScreen } from './useIsSmallScreen'

// lazies
const MobileApp = lazy(() => import('./MobileApp'))
const DesktopApp = lazy(() => import('./DesktopApp'))

export default function App() {
  const small = useIsSmallScreen()
  const { defaultPage, addToRecentlyVisited } = useAppStore()
  const val = useCurrentPage(defaultPage)
  const lastVisited = useRef<string | undefined>(undefined)

  useEffect(() => {
    document.title = val ? val.slice(0, 20) : 'rpscroller'
    if (val && val !== lastVisited.current) {
      addToRecentlyVisited(val)
      lastVisited.current = val
    }
  }, [val, addToRecentlyVisited])

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

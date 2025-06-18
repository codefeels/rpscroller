import { Suspense, lazy, useEffect } from 'react'

import DialogHelper from './DialogHelper'
import HeaderBar from './HeaderBar'
import { useIsSmallScreen } from './useIsSmallScreen'
import { useCurrentPage } from './useCurrentPage'
import { useAppStore } from './store'

// lazies
const MobileApp = lazy(() => import('./MobileApp'))
const DesktopApp = lazy(() => import('./DesktopApp'))

export default function App() {
  const small = useIsSmallScreen()
  const { defaultPage } = useAppStore()
  const val = useCurrentPage(defaultPage)

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

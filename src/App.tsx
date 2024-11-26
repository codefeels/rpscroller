import { Suspense, lazy, useEffect } from 'react'

import DialogHelper from './DialogHelper'
import HeaderBar from './HeaderBar'
import Sidebar from './Sidebar'
import { useAppStore } from './store'
import { useSmallScreen } from './useSmallScreen'

// lazies
const RedditPostFeed = lazy(() => import('./RedditPostFeed'))
const SavedPostFeed = lazy(() => import('./SavedPostFeed'))

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
    <div>
      <HeaderBar />
      {small ? <MobileApp /> : <DesktopApp />}
      <DialogHelper />
    </div>
  )
}

function MobileApp() {
  const store = useAppStore()
  const { sidebarOpen } = store

  return (
    <div>
      {sidebarOpen ? <Sidebar /> : null}
      <Feed />
    </div>
  )
}

function DesktopApp() {
  const store = useAppStore()
  const { sidebarOpen } = store

  return (
    <div className="relative">
      {sidebarOpen ? (
        <div className="grid grid-cols-12">
          <div className="col-span-2 border-r-2 border-slate-500">
            <div className="sticky overflow-auto max-h-screen top-12">
              <Sidebar />
            </div>
          </div>
          <div className="col-span-10">
            <Feed />
          </div>
        </div>
      ) : (
        <Feed />
      )}
    </div>
  )
}

function Feed() {
  const store = useAppStore()
  const { val } = store
  return (
    <Suspense fallback={null}>
      {val === 'savedposts' ? <SavedPostFeed /> : <RedditPostFeed />}
    </Suspense>
  )
}

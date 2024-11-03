import { lazy, Suspense, useEffect } from 'react'

// data
import { useAppStore } from './store'

// components
import Sidebar from './Sidebar'
import DialogHelper from './DialogHelper'
import HeaderBar from './HeaderBar'

// icons
import { useSmallScreen } from './useSmallScreen'

// lazies
const RedditPostFeed = lazy(() => import('./RedditPostFeed'))
const SavedPostFeed = lazy(() => import('./SavedPostFeed'))

export default function App() {
  const store = useAppStore()
  const { val, sidebarOpen } = store

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
  const small = useSmallScreen()
  return (
    <div>
      <HeaderBar />
      {small ? (
        <div>
          {sidebarOpen ? <Sidebar /> : null}
          <Suspense fallback={null}>
            {val === 'savedposts' ? <SavedPostFeed /> : <RedditPostFeed />}
          </Suspense>
        </div>
      ) : (
        <div className="relative">
          <div className="grid grid-cols-12">
            <div className="col-span-2 sticky top-20 overflow-auto max-h-screen">
              {sidebarOpen ? <Sidebar /> : null}
            </div>
            <div className="col-span-10">
              <Suspense fallback={null}>
                {val === 'savedposts' ? <SavedPostFeed /> : <RedditPostFeed />}
              </Suspense>
            </div>
          </div>
        </div>
      )}
      <DialogHelper />
    </div>
  )
}

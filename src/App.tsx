import { lazy, Suspense, useEffect } from 'react'

// components
import Header from './Header'

// data
import { useAppStore } from './store'

// lazies
const RedditPostFeed = lazy(() => import('./RedditPostFeed'))
const SavedPostFeed = lazy(() => import('./SavedPostFeed'))

export default function App() {
  const store = useAppStore()
  const { val } = store

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

  return (
    <div className="lg:m-5 relative">
      <Header />
      <Suspense fallback={null}>
        {val === 'savedposts' ? <SavedPostFeed /> : <RedditPostFeed />}
      </Suspense>
    </div>
  )
}

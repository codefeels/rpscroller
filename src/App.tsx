import { useEffect } from 'react'
import queryString from 'query-string'

// components
import Header from './Header'
import SavedPostFeed from './SavedPostFeed'
import RedditPostFeed from './RedditPostFeed'
// data
import { useAppStore } from './store'

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

  // update URL
  useEffect(() => {
    window.history.pushState({ val }, '', `?${queryString.stringify({ val })}`)
  }, [val])

  return (
    <div className="lg:m-5 relative">
      <Header />
      {val === 'savedposts' ? <SavedPostFeed /> : <RedditPostFeed />}
    </div>
  )
}

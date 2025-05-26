import { Suspense, lazy } from 'react'

import { useAppStore } from './store'

const SavedPostFeed = lazy(() => import('./SavedPostFeed'))
const RedditPostFeed = lazy(() => import('./RedditPostFeed'))

export default function Feed() {
  const store = useAppStore()
  const { val } = store
  return (
    <Suspense fallback={null}>
      {val === 'savedposts' ? <SavedPostFeed /> : <RedditPostFeed />}
    </Suspense>
  )
}

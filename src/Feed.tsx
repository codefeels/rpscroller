import { Suspense, lazy } from 'react'

import { useAppStore } from './store'
import { useCurrentPage } from './useCurrentPage'

const SavedPostFeed = lazy(() => import('./SavedPostFeed'))
const RedditPostFeed = lazy(() => import('./RedditPostFeed'))

export default function Feed() {
  const { defaultPage } = useAppStore()
  const val = useCurrentPage(defaultPage)
  return (
    <Suspense fallback={null}>
      {val === 'savedposts' ? <SavedPostFeed /> : <RedditPostFeed />}
    </Suspense>
  )
}

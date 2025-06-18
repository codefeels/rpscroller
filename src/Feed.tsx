import { Suspense, lazy } from 'react'

import { useCurrentPage } from './useCurrentPage'
import { useAppStore } from './store'

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

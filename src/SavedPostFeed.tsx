import { useEffect, useState } from 'react'

import CardList from './CardList'
import ErrorMessage from './ErrorMessage'
import LoadingSpinner from './LoadingSpinner'
import { dbPromise } from './savedPostsDb'
import { useAppStore } from './store'

import type { Post } from './util'

export default function SavedPostFeed() {
  const store = useAppStore()
  const [data, setData] = useState<Post[]>()
  const [error, setError] = useState<unknown>()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      try {
        const db = await dbPromise
        const data = await db.getAll('savedPosts')
        setData(data)
      } catch (error) {
        console.error(error)
        setError(error)
      }
    })()
  }, [store.rerenderCount])

  return (
    <div>
      {data === undefined ? (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <ErrorMessage error={error as unknown} />
      ) : (
        <CardList posts={data} />
      )}
    </div>
  )
}

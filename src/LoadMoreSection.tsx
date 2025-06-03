import { useEffect, useRef } from 'react'

import { useIntersectionObserver } from 'usehooks-ts'

import Button from './Button'
import CardList from './CardList'
import LoadingSpinner from './LoadingSpinner'
import { filterPosts } from './postFilters'
import { useAppStore } from './store'

export default function LoadMoreSection({
  data: data2,
  setSize,
  size,
  isValidating,
  isLoading,
}: {
  isLoading: boolean
  isValidating: boolean
  data: any[]
  setSize: (
    size: number | ((_size: number) => number),
  ) => Promise<any[] | undefined>
  size: number
}) {
  const { noGifs, blocked, skipPinned, dedupe, noRedGifs, redGifsOnly } =
    useAppStore()
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.9,
  })
  const isRecharging = useRef(false)

  const data = data2?.flatMap(d => d.children).map(d => d.data)
  // these flags from https://swr.vercel.app/examples/infinite-loading
  const isLoadingMore =
    isLoading || (size > 0 && data2?.[size - 1] === undefined)
  const isEmpty = (data2?.[0]?.children.length ?? 0) === 0
  const isReachingEnd = isEmpty || (data2?.at(-1)?.children.length ?? 0) < 25
  const isRefreshing = isValidating && data2 && data2.length === size
  useEffect(() => {
    if (
      isIntersecting &&
      !isRecharging.current &&
      !isLoading &&
      !isRefreshing &&
      !isReachingEnd
    ) {
      isRecharging.current = true
      setTimeout(() => {
        setSize(size + 1)
          .then(() => {
            isRecharging.current = false
          })
          .catch((error: unknown) => {
            console.error(error)
          })
      }, 400)
    }
  }, [isIntersecting, setSize, size, isReachingEnd, isRefreshing, isLoading])

  const { filteredPosts: result, stats } = filterPosts(data, {
    noGifs,
    blocked,
    skipPinned,
    dedupe,
    noRedGifs,
    redGifsOnly,
  })
  return (
    <div>
      <CardList posts={result} stats={stats} />
      <div
        ref={ref}
        style={{ height: 400 }}
        className="flex justify-center mt-10"
      >
        {isLoadingMore ? (
          <LoadingSpinner />
        ) : isReachingEnd ? (
          'End of feed!'
        ) : (
          <div>
            (Loaded {data.length} posts {stats.commentTypeFiltered} of those
            were comments) ... Scroll all the way down or{' '}
            <Button
              onClick={() => {
                 
                if (
                  !isRecharging.current &&
                  !isLoading &&
                  !isRefreshing &&
                  !isReachingEnd
                ) {
                  isRecharging.current = true
                  setTimeout(() => {
                    setSize(size + 1)
                      .then(() => {
                        isRecharging.current = false
                      })
                      .catch((error: unknown) => {
                        console.error(error)
                      })
                  }, 400)
                }
              }}
            >
              Click here
            </Button>{' '}
            to load more
          </div>
        )}
      </div>
    </div>
  )
}

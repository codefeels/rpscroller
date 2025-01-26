import { useEffect, useRef } from 'react'

import useSWRInfinite from 'swr/infinite'
import { useIntersectionObserver } from 'usehooks-ts'

import Button from './Button'
import CardList from './CardList'
import ErrorMessage from './ErrorMessage'
import LoadingSpinner from './LoadingSpinner'
import { useAppStore } from './store'
import { modeMap } from './util'

import type { RedditResponse } from './util'

const getKey = (url: string) => {
  return (
    pageIndex: number,
    previousPageData?: {
      after?: string
    },
  ) => {
    // reached the end
    if (previousPageData && !previousPageData.after) {
      return null
    }

    // first page, we don't have `previousPageData`
    if (pageIndex === 0) {
      return `${url}${url.includes('?') ? '&' : '?'}limit=25`
    }

    // add the cursor to the API endpoint
    return `${url}${url.includes('?') ? '&' : '?'}after=${previousPageData?.after}&limit=25`
  }
}

export default function RedditPostFeed() {
  const store = useAppStore()
  const { mode, val } = store
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.9,
  })

  useEffect(() => {
    function onPopState(event: PopStateEvent) {
      if (event.state) {
        store.setVal((event.state as { val: string }).val)
      }
    }
    // Handle forward/back buttons
    window.addEventListener('popstate', onPopState)
    return () => {
      window.removeEventListener('popstate', onPopState)
    }
  }, [store])

  const isRecharging = useRef(false)

  const endpoint = modeMap.get(mode)?.url
  const url = `https://www.reddit.com/${val.startsWith('/') ? val.slice(1) : val}${endpoint ?? ''}`

  const {
    data: data2,
    size,
    setSize,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    error,
    isValidating,
    isLoading,
  } = useSWRInfinite(getKey(url), async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} fetching ${url} ${await res.text()}`)
    }
    const ret = (await res.json()) as RedditResponse
    return ret.data
  })

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

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <ErrorMessage error={error as unknown} />
      ) : data ? (
        <>
          <CardList posts={data} />
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
                Scroll all the way down or{' '}
                <Button
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    setSize(size + 1).then(() => {
                      isRecharging.current = false
                    })
                  }}
                >
                  Click here
                </Button>{' '}
                to load more
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  )
}

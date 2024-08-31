import { useEffect, useRef } from 'react'
import queryString from 'query-string'
import { useIntersectionObserver } from 'usehooks-ts'

// components
import LoadingSpinner from './LoadingSpinner'
import Header from './Header'
import ErrorMessage from './ErrorMessage'
import CardList from './CardList'

// data
import type { RedditResponse } from './util'
import { useAppStore } from './store'
import useSWRInfinite from 'swr/infinite'

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

export default function App() {
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

  const modeString = {
    topall: '/top.json?t=all',
    topmonth: '/top.json?t=month',
    topday: '/top.json?t=day',
    topyear: '/top.json?t=year',
    hot: '.json',
    new: '/new.json',
  } as Record<string, string>
  const isRecharging = useRef(false)

  const url = `https://www.reddit.com/${val}${modeString[mode] ?? ''}`

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
    window.history.pushState({ val }, '', `?${queryString.stringify({ val })}`)
  }, [val])

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
    <div className="lg:m-5 relative">
      <Header />

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
                'Scroll all the way down to load more...'
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

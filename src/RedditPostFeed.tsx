import { useEffect, useState } from 'react'

import useSWRInfinite from 'swr/infinite'

import ErrorMessage from './ErrorMessage'
import LoadMoreSection from './LoadMoreSection'
import LoadingSpinner from './LoadingSpinner'
import { cleanupOldFeeds, getCachedFeed, setCachedFeed } from './feedCacheDb'
import { myfetchjson } from './fetchUtils'
import { getFeedKey } from './getFeedKey'
import { useAppStore } from './store'
import { useCurrentPage } from './useCurrentPage'
import { modeMap } from './util'

import type { Data, RedditResponse } from './util'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noopSetSize = async () => {}

export default function RedditPostFeed() {
  const store = useAppStore()
  const { defaultPage, mode } = store
  const val = useCurrentPage(defaultPage)

  const endpoint = modeMap.get(mode)?.url
  const url = `https://www.reddit.com/${val.startsWith('/') ? val.slice(1) : val}${endpoint ?? ''}`

  const [cachedData, setCachedData] = useState<Data[] | undefined>()
  const [isShowingCached, setIsShowingCached] = useState(false)
  const [prevUrl, setPrevUrl] = useState(url)
  if (prevUrl !== url) {
    setPrevUrl(url)
    setCachedData(undefined)
    setIsShowingCached(false)
  }

  const {
    data,
    size,
    setSize,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    error,
    isValidating,
    isLoading,
  } = useSWRInfinite(
    getFeedKey(url),
    async (url: string) => {
      const ret = await myfetchjson<RedditResponse>(url)
      return ret.data
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      dedupingInterval: 60_000,
      focusThrottleInterval: 5000,
    },
  )

  // Cleanup old cache entries on mount
  useEffect(() => {
    cleanupOldFeeds().catch((error_: unknown) => {
      console.error(error_)
    })
  }, [])

  // On success, save to cache
  useEffect(() => {
    if (data && !error) {
      setCachedFeed(url, data).catch((error_: unknown) => {
        console.error(error_)
      })
    }
  }, [data, error, url])

  // On error, try to load from cache
  useEffect(() => {
    let stale = false
    if (error && !data) {
      getCachedFeed(url)
        .then(cached => {
          if (!stale && cached) {
            setCachedData(cached.data)
            setIsShowingCached(true)
          }
        })
        .catch((error_: unknown) => {
          console.error(error_)
        })
    }
    return () => {
      stale = true
    }
  }, [error, data, url])

  return (
    <div>
      {isShowingCached && cachedData ? (
        <>
          <div className="bg-amber-100 border border-amber-400 text-amber-800 px-4 py-2 text-center text-sm">
            Showing old content (Reddit API error)
          </div>
          <LoadMoreSection
            data={cachedData}
            setSize={noopSetSize}
            size={cachedData.length}
            isValidating={false}
            isLoading={false}
          />
        </>
      ) : isLoading ? (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <ErrorMessage error={error as unknown} />
      ) : data ? (
        <LoadMoreSection
          data={data}
          setSize={setSize}
          size={size}
          isValidating={isValidating}
          isLoading={isLoading}
        />
      ) : null}
    </div>
  )
}

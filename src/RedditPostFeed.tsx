import useSWRInfinite from 'swr/infinite'

import ErrorMessage from './ErrorMessage'
import LoadMoreSection from './LoadMoreSection'
import LoadingSpinner from './LoadingSpinner'
import { myfetchjson } from './fetchUtils'
import { getFeedKey } from './getFeedKey'
import { useAppStore } from './store'
import { modeMap } from './util'

import type { RedditResponse } from './util'

export default function RedditPostFeed() {
  const store = useAppStore()
  const { mode, val } = store

  const endpoint = modeMap.get(mode)?.url
  const url = `https://www.reddit.com/${val.startsWith('/') ? val.slice(1) : val}${endpoint ?? ''}`

  const {
    data,
    size,
    setSize,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    error,
    isValidating,
    isLoading,
  } = useSWRInfinite(getFeedKey(url), async (url: string) => {
    const ret = await myfetchjson<RedditResponse>(url)
    return ret.data
  })

  return (
    <div>
      {isLoading ? (
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

import { useEffect, useState } from 'react'
import queryString from 'query-string'
import useSWR from 'swr'
import { useIntersectionObserver } from 'usehooks-ts'

// components
import LoadingSpinner from './LoadingSpinner'
import Header from './Header'
import ErrorMessage from './ErrorMessage'
import PrevNextButtons from './PrevNextButtons'
import CardList from './CardList'

// data
import type { Data } from './util'
import { setBool, setString, setStringArray, useAppStore } from './store'

// refresh page after back button
window.addEventListener('popstate', () => window.location.reload())

export default function App() {
  const store = useAppStore()
  const {
    page,
    mode,
    fullscreen,
    infiniteScroll,
    confirmed,
    favs,
    noGifs,
    defaultPage,
    redGifsOnly,
    val,
  } = store
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.9,
  })

  const modeString = {
    topall: '/top.json?t=all',
    topmonth: '/top.json?t=month',
    topday: '/top.json?t=day',
    topyear: '/top.json?t=year',
    hot: '.json',
    new: '/new.json',
  } as Record<string, string>
  const [recharge, setRecharge] = useState(false)

  const url = `https://www.reddit.com/${val}${modeString[mode] || ''}${page ? `?after=${page}` : ''}`

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error, isLoading } = useSWR(url, async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} fetching ${url} ${await res.text()}`)
    }
    const ret = (await res.json()) as {
      data: Data
    }
    return ret.data
  })

  useEffect(() => {
    setBool('noGifs', noGifs)
    setString('defaultPage', defaultPage)
    setBool('fullscreen', fullscreen)
    setBool('redGifsOnly', redGifsOnly)
    setBool('confirmed', confirmed)
    setStringArray('favorites', favs)
  }, [noGifs, favs, fullscreen, confirmed, defaultPage, redGifsOnly])

  useEffect(() => {
    window.history.pushState(null, '', `?${queryString.stringify({ val })}`)
  }, [val])

  useEffect(() => {
    if (isIntersecting && data?.after && !recharge && !isLoading) {
      store.setPage(data?.after)
      setRecharge(true)
      setTimeout(() => {
        setRecharge(false)
      })
    }
  }, [recharge, isIntersecting, data?.after, store, isLoading])

  return (
    <div className="lg:m-5">
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
            <CardList data={data} />
            {infiniteScroll ? (
              <div ref={ref} style={{ height: 400 }}>
                {data?.after
                  ? 'Scroll all the way down to load more...'
                  : 'No more posts'}
              </div>
            ) : (
              <PrevNextButtons data={data} />
            )}
          </>
        ) : null}
      </div>
      <footer>
        <a
          href="https://github.com/codefeels/rpscroller/"
          target="_blank"
          rel="noreferrer"
        >
          Source code/report issues
        </a>
      </footer>
    </div>
  )
}

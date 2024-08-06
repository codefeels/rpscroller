import { useEffect, useState } from 'react'
import queryString from 'query-string'
import useSWR from 'swr'

// components
import LoadingSpinner from './LoadingSpinner'

// data
import type { Data, Post } from './util'
import { deduplicate, decode, redGifUrlToId } from './util'
import { setBool, setStringArray, useAppStore } from './store'

import flame from './favicon.svg'
import { useIntersectionObserver, useDebounceValue } from 'usehooks-ts'
import { formatDistance } from 'date-fns'

// refresh page after back button
window.addEventListener('popstate', () => window.location.reload())

function Buttons({ post }: { post: Post }) {
  const store = useAppStore()
  const { author, subreddit_name_prefixed: subreddit } = post
  return (
    <div>
      <div>
        <button onClick={() => store.setVal(`/user/${author}`)}>
          Browse {`/u/${author}`}
        </button>
        <button
          disabled={store.favs.includes(`/user/${author}`)}
          onClick={() => store.addFavorite(`/user/${author}`)}
        >
          Add {`/u/${author}`} to favs
        </button>
      </div>
      <div>
        <button onClick={() => store.setVal(subreddit)}>
          Browse {subreddit}
        </button>
        <button
          disabled={store.favs.includes(subreddit)}
          onClick={() => store.addFavorite(subreddit)}
        >
          Add {subreddit} to favs
        </button>
      </div>
    </div>
  )
}

function Gallery({ post }: { post: Post }) {
  const { gallery_data, crosspost_parent_list } = post
  const [frame, setFrame] = useState(0)
  const items =
    gallery_data?.items || crosspost_parent_list[0]?.gallery_data.items
  const media_metadata =
    post.media_metadata || crosspost_parent_list[0]?.media_metadata
  const { media_id, caption } = items[frame]
  return (
    <div>
      <div className="text-center">
        {caption} {frame + 1}/{items.length}
      </div>
      <img
        alt={caption}
        loading="lazy"
        className="w-full max-h-screen object-contain"
        src={decode(media_metadata[media_id].s.u)}
      />

      <div className={'flex justify-center'}>
        <button
          className="text-4xl m-2"
          disabled={frame <= 0}
          onClick={() => setFrame(frame - 1)}
        >
          &lt;
        </button>
        <button
          className="text-4xl m-2"
          disabled={frame >= items.length - 1}
          onClick={() => setFrame(frame + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

function Card({ post }: { post: Post }) {
  const { hideButtons } = useAppStore()
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.4,
  })
  const [debouncedIsIntersecting] = useDebounceValue(isIntersecting, 1000)
  const {
    author,
    subreddit_name_prefixed: subreddit,
    title,
    permalink,
    url,
  } = post
  return (
    <div ref={ref}>
      <h4 className="inline">
        {decode(title)} (
        {formatDistance(new Date(post.created * 1000), new Date(), {
          addSuffix: true,
        })}
        ) [{post.score}]
      </h4>{' '}
      (
      <a
        href={`https://reddit.com/u/${author}`}
        target="_blank"
        rel="noreferrer"
      >
        user
      </a>
      ) (
      <a href={url} target="_blank" rel="noreferrer">
        url
      </a>
      ) (
      <a
        href={`https://reddit.com/${subreddit}`}
        target="_blank"
        rel="noreferrer"
      >
        subreddit
      </a>
      ) (
      <a
        href={`https://reddit.com${permalink}`}
        target="_blank"
        rel="noreferrer"
      >
        comments
      </a>
      ){hideButtons ? null : <Buttons post={post} />}
      {url.startsWith('https://www.reddit.com/gallery') ? (
        <Gallery post={post} />
      ) : !url.includes('redgifs') &&
        (url.endsWith('.jpg') ||
          url.endsWith('.jpeg') ||
          url.endsWith('.webp') ||
          url.endsWith('.png') ||
          url.endsWith('.gif') ||
          url.endsWith('.webp')) ? (
        <img
          alt={title}
          loading="lazy"
          className="w-full max-h-screen object-contain"
          src={url}
        />
      ) : url.includes('redgifs') ? (
        debouncedIsIntersecting ? (
          <iframe
            title={title}
            src={`https://www.redgifs.com/ifr/${redGifUrlToId(url)}`}
            className="h-screen w-full"
            loading="lazy"
            allowFullScreen
            scrolling="no"
            frameBorder="0"
          />
        ) : (
          <div
            style={{ width: '100%', height: '100vh' }}
            className="flex flex-col animate-pulse space-y-4 m-20"
          >
            <div className="rounded-full bg-slate-700 h-10 w-10" />
            <div className="rounded-full bg-slate-700 h-10 w-10" />
            <div className="rounded-full bg-slate-700 h-10 w-10" />
            <div className="rounded-full bg-slate-700 h-10 w-10" />
          </div>
        )
      ) : null}
    </div>
  )
}

function Cards({ data }: { data: Data }) {
  const { noGifs, skipPinned, dedupe, fullscreen, redGifsOnly } = useAppStore()
  let result = data.children
    .filter(({ data }) => !('comment_type' in data))
    .filter(
      ({ data: { url } }) =>
        url.includes('redgifs') ||
        url.endsWith('.jpg') ||
        url.endsWith('.webp') ||
        url.endsWith('.jpeg') ||
        url.endsWith('.png') ||
        url.endsWith('.gif') ||
        url.endsWith('.webp') ||
        url.startsWith('https://www.reddit.com/gallery'),
    )
    .filter(({ data }) => (noGifs ? !data.url.endsWith('.gif') : true))
    .filter(({ data }) => (redGifsOnly ? data.url.includes('redgifs') : true))
    .filter(({ data }) => (skipPinned ? !data.pinned : true))

  if (dedupe) {
    result = deduplicate(result, r => r.data.url)
  }
  return (
    <div className="flex justify-center overflow-hidden">
      <div className={fullscreen ? 'lg:w-11/12' : 'lg:w-1/2'}>
        <div className="flex flex-col space-y-20">
          {result.length > 0 ? (
            result.map(({ data }) => <Card key={data.id} post={data} />)
          ) : (
            <h1>
              No results on this page, check your filters in the settings or
              this may just have been a page of comments if you are browsing a
              user page
            </h1>
          )}
        </div>
      </div>
    </div>
  )
}

function Favorites() {
  const store = useAppStore()
  const { favs } = store
  const [multi, setMulti] = useState<string[]>([])
  const [makeMultiReddit, setMakeMultiReddit] = useState(false)
  const [showUsers, setShowUsers] = useState(true)
  const [showSubreddits, setShowSubreddits] = useState(true)
  const multiVal = `/r/${multi.join('+')}`
  return (
    <div className="lg:m-10">
      <h4>
        Favorites{' '}
        <span>
          <button onClick={() => setMakeMultiReddit(!makeMultiReddit)}>
            {makeMultiReddit ? 'Hide multi-reddit maker' : 'Make multi-reddit?'}
          </button>
          {makeMultiReddit ? (
            <div>
              <label htmlFor="multireddit">Multi-reddit</label>
              <input id="multireddit" readOnly type="text" value={multiVal} />
              <button onClick={() => store.setVal(multiVal)}>Submit</button>
              <button onClick={() => setMulti([])}>Clear</button>
            </div>
          ) : null}
          <label htmlFor="reddits">Show subreddits</label>
          <input
            id="reddits"
            type="checkbox"
            checked={showSubreddits}
            onChange={event => setShowSubreddits(event.target.checked)}
          />
          <label htmlFor="users">Show users</label>
          <input
            id="users"
            type="checkbox"
            checked={showUsers}
            onChange={event => setShowUsers(event.target.checked)}
          />
        </span>
      </h4>
      <table>
        <tbody>
          {showSubreddits
            ? favs
                .map(f => f.replace(/^\//, ''))
                .filter(
                  f =>
                    !(
                      f.startsWith('u/') ||
                      f.startsWith('user/') ||
                      f.startsWith('u_')
                    ),
                )
                .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
                .map(f => (
                  <tr key={f}>
                    <td>
                      <button onClick={() => store.setVal(f)}>{f}</button>
                    </td>
                    <td>
                      <button onClick={() => store.removeFavorite(f)}>
                        Remove
                      </button>
                    </td>
                    {makeMultiReddit ? (
                      <td>
                        <button
                          onClick={() =>
                            setMulti([
                              ...multi,
                              f.replace('user/', 'u_').replace('r/', ''),
                            ])
                          }
                        >
                          Add to multi
                        </button>
                      </td>
                    ) : null}
                  </tr>
                ))
            : null}
          {showUsers
            ? favs
                .map(f => f.replace(/^\//, ''))
                .filter(
                  f =>
                    f.startsWith('u/') ||
                    f.startsWith('user/') ||
                    f.startsWith('u_'),
                )
                .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
                .map(f => (
                  <tr key={f}>
                    <td>
                      <button onClick={() => store.setVal(f)}>{f}</button>
                    </td>
                    <td>
                      <button onClick={() => store.removeFavorite(f)}>
                        Remove
                      </button>
                    </td>
                    {makeMultiReddit ? (
                      <td>
                        <button
                          onClick={() =>
                            setMulti([
                              ...multi,
                              f.replace('user/', 'u_').replace('r/', ''),
                            ])
                          }
                        >
                          Add to multi
                        </button>
                      </td>
                    ) : null}
                  </tr>
                ))
            : null}
        </tbody>
      </table>
    </div>
  )
}

function Sorts() {
  const store = useAppStore()
  const { mode } = store

  return (
    <div>
      <div>
        <label htmlFor="topall">Top (all time)</label>
        <input
          id="topall"
          value="topall"
          type="radio"
          checked={mode === 'topall'}
          onChange={event => store.setMode(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="topyear">Top (year)</label>
        <input
          id="topyear"
          value="topyear"
          type="radio"
          checked={mode === 'topyear'}
          onChange={event => store.setMode(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="topday">Top (day)</label>
        <input
          id="topday"
          value="topday"
          type="radio"
          checked={mode === 'topday'}
          onChange={event => store.setMode(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="topmonth">Top (month)</label>
        <input
          id="topmonth"
          value="topmonth"
          type="radio"
          checked={mode === 'topmonth'}
          onChange={event => store.setMode(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="hot">Hot</label>
        <input
          id="hot"
          value="hot"
          type="radio"
          checked={mode === 'hot'}
          onChange={event => store.setMode(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="new">New</label>
        <input
          id="new"
          value="new"
          type="radio"
          checked={mode === 'new'}
          onChange={event => store.setMode(event.target.value)}
        />
      </div>
    </div>
  )
}

function Settings() {
  const store = useAppStore()
  return (
    <div className="lg:m-10">
      <h4>Settings</h4>
      <div>
        <input
          id="nogifs"
          type="checkbox"
          checked={store.noGifs}
          onChange={event => store.setNoGifs(event.target.checked)}
        />
        <label htmlFor="nogifs">
          No gifs? The actual, slow bloated filetype
        </label>
      </div>
      <div>
        <input
          id="infiniteScroll"
          type="checkbox"
          checked={store.infiniteScroll}
          onChange={event => store.setInfiniteScroll(event.target.checked)}
        />
        <label htmlFor="infiniteScroll">Infinite scroll</label>
      </div>
      <div>
        <input
          id="skipPinned"
          type="checkbox"
          checked={store.skipPinned}
          onChange={event => store.setSkipPinned(event.target.checked)}
        />
        <label htmlFor="skipPinned">Skip pinned posts</label>
      </div>
      <div>
        <input
          id="dedupe"
          type="checkbox"
          checked={store.dedupe}
          onChange={event => store.setDedupe(event.target.checked)}
        />
        <label htmlFor="nogifs">De-duplicate repeat URLs on each page</label>
      </div>

      <div>
        <input
          id="redgifs"
          type="checkbox"
          checked={store.redGifsOnly}
          onChange={event => store.setRedGifsOnly(event.target.checked)}
        />
        <label htmlFor="redgifs">RedGifs only (the image host)</label>
      </div>

      <div>
        <input
          id="fullscreen"
          type="checkbox"
          checked={store.fullscreen}
          onChange={event => store.setFullscreen(event.target.checked)}
        />
        <label htmlFor="fullscreen">Fullscreen</label>
      </div>
      <div>
        <input
          id="hidebuttons"
          type="checkbox"
          checked={store.hideButtons}
          onChange={event => store.setHideButtons(event.target.checked)}
        />
        <label htmlFor="hidebuttons">Hide buttons to add to favs/browse</label>
      </div>
    </div>
  )
}

function FormBox() {
  const store = useAppStore()
  const { val } = store
  const [text, setText] = useState(val)
  useEffect(() => {
    setText(val)
  }, [val])
  return (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault()
          store.setVal(text)
        }}
      >
        <label htmlFor="box">Reddit:</label>
        <input
          id="box"
          type="text"
          value={text}
          onChange={event => setText(event.target.value)}
        />
        <button type="submit">Submit</button>
        <button
          onClick={event => {
            event.preventDefault() // not sure why but otherwise does onSubmit
            store.addFavorite(text)
          }}
        >
          Add to favs
        </button>
      </form>
    </div>
  )
}

function ErrorMessage({ error }: { error: unknown }) {
  return (
    <div className="text-red-600 m-20">
      <div>{`${error}`}</div>
      <div>
        {`${error}` ===
        'TypeError: NetworkError when attempting to fetch resource.'
          ? "If you are on firefox then you can disable 'Enhanced Tracking Protection' (at your own risk) to fix this error"
          : ''}{' '}
      </div>
    </div>
  )
}

function Header() {
  const [showSettings, setShowSettings] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)

  return (
    <div className="mb-10">
      <h1>
        rpscroller <img className="h-8" src={flame} alt="app icon of flames" />
      </h1>
      <FormBox />

      <div>
        <button onClick={() => setShowSettings(!showSettings)}>
          {showSettings ? 'Hide settings' : 'Show settings'}
        </button>
        <button onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? 'Hide favs' : 'Show favs'}
        </button>
      </div>
      {showSettings ? <Settings /> : null}
      {showFavorites ? <Favorites /> : null}
      <Sorts />
    </div>
  )
}

function PrevNextButtons({ data }: { data: Data }) {
  const store = useAppStore()
  const { prev } = store
  return (
    <div className="flex justify-center m-10">
      <button
        className="text-4xl m-2"
        disabled={!prev}
        onClick={() => {
          store.setPage(prev ?? '')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        Prev
      </button>
      <button
        className="text-4xl m-2"
        disabled={!data?.after}
        onClick={() => {
          store.setPage(data?.after ?? '')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        Next
      </button>
    </div>
  )
}
export default function App() {
  const store = useAppStore()
  const {
    page,
    mode,
    infiniteScroll,
    confirmed,
    favs,
    noGifs,
    redGifsOnly,
    val,
  } = store
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 1,
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
    setBool('redGifsOnly', redGifsOnly)
    setBool('confirmed', confirmed)
    setStringArray('favorites', favs)
  }, [noGifs, favs, confirmed, redGifsOnly])

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
            <Cards data={data} />
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

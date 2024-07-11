import { useEffect, useState } from 'react'
import queryString from 'query-string'
import useSWR from 'swr'

// components
import Loading from './LoadingSpinner'

// data
import { de, decode, redGifUrlToId } from './util'
import { setBool, setString, useAppStore } from './store'

import flame from './favicon.svg'

interface Post {
  id: string
  subreddit_name_prefixed: string
  title: string
  url: string
  permalink: string
  author: string
}
interface Data {
  before?: string
  after?: string
  children: {
    data: Post
  }[]
}
const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url} ${await res.text()}`)
  }
  const ret = (await res.json()) as {
    data: Data
  }
  return ret.data
}

function Buttons({ post }: { post: Post }) {
  const store = useAppStore()
  const { author, subreddit_name_prefixed: subreddit } = post
  return (
    <div>
      <div>
        <button onClick={() => store.setVal(`/user/${author}`)}>
          Browse {`/u/${author}`}
        </button>
        <button onClick={() => store.addFavorite(`/user/${author}`)}>
          Add {`/u/${author}`} to favorites
        </button>
      </div>
      <div>
        <button onClick={() => store.setVal(subreddit)}>
          Browse {subreddit}
        </button>
        <button onClick={() => store.addFavorite(subreddit)}>
          Add {subreddit} to favorites
        </button>
      </div>
    </div>
  )
}
function Post({ post }: { post: Post }) {
  const { hideButtons } = useAppStore()
  const {
    author,
    subreddit_name_prefixed: subreddit,
    title,
    permalink,
    url,
  } = post
  return (
    <div className="lg:m-10 lg:p-10 border border-solid border-gray-950">
      <h4 className="inline">{decode(title)}</h4> (
      <a href={`https://reddit.com/u/${author}`} target="_blank">
        user
      </a>
      ) (
      <a href={`https://reddit.com/${subreddit}`} target="_blank">
        subreddit
      </a>
      ) (
      <a href={`https://reddit.com${permalink}`} target="_blank">
        comments
      </a>
      ){hideButtons ? null : <Buttons post={post} />}
      {!url.includes('redgifs') &&
      (url.endsWith('.jpg') ||
        url.endsWith('.jpeg') ||
        url.endsWith('.png') ||
        url.endsWith('.gif') ||
        url.endsWith('.webp')) ? (
        <img
          loading="lazy"
          className="w-full max-h-screen object-contain"
          src={url}
        />
      ) : url.includes('redgifs') ? (
        <iframe
          src={`https://www.redgifs.com/ifr/${redGifUrlToId(url)}`}
          className="h-screen w-full"
          loading="lazy"
          allowFullScreen
          scrolling="no"
          frameBorder="0"
        />
      ) : null}
    </div>
  )
}

function Posts({ data }: { data: Data }) {
  const { noGifs, dedupe, fullscreen, redGifsOnly } = useAppStore()
  let result = data.children
    .filter(({ data }) => !('comment_type' in data))
    .filter(
      ({ data: { url } }) =>
        url.includes('redgifs') ||
        url.endsWith('.jpg') ||
        url.endsWith('.jpeg') ||
        url.endsWith('.png') ||
        url.endsWith('.gif') ||
        url.endsWith('.webp'),
    )
    .filter(({ data }) => (noGifs ? !data.url.endsWith('.gif') : true))
    .filter(({ data }) => (redGifsOnly ? data.url.includes('redgifs') : true))

  if (dedupe) {
    result = de(result, r => r.data.url)
  }
  return (
    <div className={!fullscreen ? 'flex justify-center' : undefined}>
      <div className={!fullscreen ? 'w-1/2' : undefined}>
        {result.length > 0 ? (
          result.map(({ data }) => <Post key={data.id} post={data} />)
        ) : (
          <h1>No results on this page, check your filters in the settings</h1>
        )}
      </div>
    </div>
  )
}

function Favorites() {
  const store = useAppStore()
  const { favorites } = store

  return (
    <div>
      <table>
        <tbody>
          {favorites
            .map(f => f.replace(/^\//, ''))
            .sort()
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
              </tr>
            ))}
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
    <div>
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
          Add to favorites
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
  const [showSorts, setShowSorts] = useState(false)

  return (
    <div className="mb-10">
      <h1>
        rpscroller <img className="h-8" src={flame} />
      </h1>
      <FormBox />

      <div>
        <button onClick={() => setShowSettings(!showSettings)}>
          {showSettings ? 'Hide settings' : 'Show settings'}
        </button>
        <button onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? 'Hide favorites' : 'Show favorites'}
        </button>
        <button onClick={() => setShowSorts(!showSorts)}>
          {showSorts ? 'Hide sorts' : 'Show sorts'}
        </button>
      </div>
      {showSettings ? <Settings /> : null}
      {showFavorites ? <Favorites /> : null}
      {showSorts ? <Sorts /> : null}
    </div>
  )
}

function PrevNext({ data }: { data: Data }) {
  const store = useAppStore()
  const { prev } = store
  return (
    <div>
      <div className="flex justify-center">
        <button
          className="text-4xl m-2"
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
    </div>
  )
}
export default function App() {
  const store = useAppStore()
  const { page, mode, confirmed, favorites, noGifs, redGifsOnly, val } = store

  const modeString = {
    topall: '/top.json?t=all',
    topmonth: '/top.json?t=month',
    topday: '/top.json?t=day',
    topyear: '/top.json?t=year',
    hot: '.json',
    new: '/new.json',
  } as Record<string, string>
  const url =
    `https://www.reddit.com/${val}${modeString[mode] || ''}` +
    (page ? `?after=${page}` : '')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error, isLoading } = useSWR(url, fetcher)

  useEffect(() => {
    setBool('noGifs', noGifs)
    setBool('redGifsOnly', redGifsOnly)
    setBool('confirmed', confirmed)
    setString('favorites', JSON.stringify(favorites))
    window.history.pushState(null, '', `?${queryString.stringify({ val })}`)
  }, [val, noGifs, favorites, confirmed, redGifsOnly])

  return (
    <div className="lg:m-5">
      <Header />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage error={error as unknown} />
      ) : data ? (
        <>
          <Posts data={data} />
          <PrevNext data={data} />
        </>
      ) : null}
      <footer>
        <a href="https://github.com/codefeels/rpscroller/" target="_blank">
          Source code/report issues
        </a>
      </footer>
    </div>
  )
}

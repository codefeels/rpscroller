import { useEffect, useState } from 'react'
import queryString from 'query-string'
import useSWR from 'swr'

// components
import Loading from './LoadingSpinner'

// data
import { redGifUrlToId } from './util'
import { setBool, setString, useAppStore } from './store'

// @ts-expect-error can't figure out svg import
import flame from './favicon.svg'

function decode(html: string) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}
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

function Post({ post }: { post: Post }) {
  const store = useAppStore()
  const { hideButtons } = useAppStore()
  const {
    author,
    subreddit_name_prefixed: subreddit,
    title,
    permalink,
    url,
  } = post
  return (
    <div className="item">
      <h4 style={{ margin: 0, display: 'inline' }}>{decode(title)}</h4> (
      <a href={url} target="_blank">
        link
      </a>
      ) (
      <a href={`https://reddit.com${permalink}`} target="_blank">
        comments
      </a>
      )
      {hideButtons ? null : (
        <>
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
        </>
      )}
      {!url.includes('redgifs') &&
      (url.endsWith('.jpg') ||
        url.endsWith('.jpeg') ||
        url.endsWith('.png') ||
        url.endsWith('.gif') ||
        url.endsWith('.webp')) ? (
        <div>
          <img loading="lazy" style={{ width: '100%' }} src={url} />
        </div>
      ) : url.includes('redgifs') ? (
        <iframe
          src={`https://www.redgifs.com/ifr/${redGifUrlToId(url)}`}
          style={{ width: '100%', height: '100vh' }}
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
  const { noGifs, redGifsOnly, fullscreen } = useAppStore()
  const result = data.children
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
  return (
    <div className="center">
      <div className={!fullscreen ? 'stage' : 'fullscreen'}>
        <div style={{ position: 'sticky' }}></div>
        {result.length > 0 ? (
          result.map(({ data }) => <Post key={data.id} post={data} />)
        ) : (
          <h1>No results on this page, check your filters in the settings</h1>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [showSettings, setShowSettings] = useState(false)
  const store = useAppStore()
  const {
    page,
    prev,
    confirmed,
    favorites,
    fullscreen,
    noGifs,
    redGifsOnly,
    val,
  } = store
  const [showFavorites, setShowFavorites] = useState(false)
  const url =
    `https://www.reddit.com/${val}.json` + (page ? `?after=${page}` : '')
  const [text, setText] = useState(val)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error, isLoading } = useSWR(url, fetcher)

  useEffect(() => {
    setBool('noGifs', noGifs)
    setBool('fullscreen', fullscreen)
    setBool('redGifsOnly', redGifsOnly)
    setBool('confirmed', confirmed)
    setString('favorites', JSON.stringify(favorites))
    window.history.replaceState(null, '', `?${queryString.stringify({ val })}`)
  }, [val, fullscreen, noGifs, favorites, confirmed, redGifsOnly])
  useEffect(() => {
    setText(val)
  }, [val])

  return (
    <div className="app">
      <div className="header">
        <h1 style={{ margin: 0 }}>
          rpscroller <img style={{ height: '1em' }} src={flame} />
        </h1>
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

        <button onClick={() => setShowSettings(!showSettings)}>
          {showSettings ? 'Hide settings' : 'Show settings'}
        </button>
        {showSettings ? (
          <div>
            <div>
              <input
                id="fullscreen"
                type="checkbox"
                checked={fullscreen}
                onChange={event => store.setFullscreen(event.target.checked)}
              />
              <label htmlFor="fullscreen">Fullscreen</label>
            </div>

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
                id="redgifs"
                type="checkbox"
                checked={store.redGifsOnly}
                onChange={event => store.setRedGifsOnly(event.target.checked)}
              />
              <label htmlFor="redgifs">RedGifs only (the image host)</label>
            </div>

            <div>
              <input
                id="hidebuttons"
                type="checkbox"
                checked={store.hideButtons}
                onChange={event => store.setHideButtons(event.target.checked)}
              />
              <label htmlFor="hidebuttons">
                Hide buttons to add to favs/browse
              </label>
            </div>
          </div>
        ) : null}

        <button onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? 'Hide favorites' : 'Show favorites'}
        </button>
        {showFavorites ? (
          <div>
            <table>
              <tbody>
                {favorites.map(f => (
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
        ) : null}
      </div>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="error">
          <div>{`${error}`}</div>
          <div>
            {`${error}` ===
            'TypeError: NetworkError when attempting to fetch resource.'
              ? "If you are on firefox then you can disable 'Enhanced Tracking Protection' (at your own risk) to fix this error"
              : ''}{' '}
          </div>
        </div>
      ) : data ? (
        <Posts data={data} />
      ) : null}
      <div className="center">
        <button className="large" onClick={() => store.setPage(prev ?? '')}>
          Prev
        </button>
        <button
          className="large"
          disabled={!data?.after}
          onClick={() => store.setPage(data?.after ?? '')}
        >
          Next
        </button>
      </div>
      <footer>
        <a href="https://github.com/codefeels/rpscroller/" target="_blank">
          Source code/report issues
        </a>
      </footer>
    </div>
  )
}

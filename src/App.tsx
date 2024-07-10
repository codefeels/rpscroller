import { useEffect, useState } from 'react'
import queryString from 'querystring'
import useSWR from 'swr'
import he from 'he'

// components
import SettingsDialog from './SettingsDialog'
import Loading from './LoadingSpinner'

// data
import { redGifUrlToId } from './util'
import { setBool, setString, useAppStore } from './store'

// @ts-expect-error
import flame from './flame.png'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url} ${await res.text()}`)
  }
  const ret = (await res.json()) as {
    data: {
      before?: string
      after?: string
      children: {
        data: {
          id: string
          subreddit_name_prefixed: string
          title: string
          url: string
          permalink: string
          author: string
        }
      }[]
    }
  }
  return ret.data
}

function App() {
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const store = useAppStore()
  const {
    page,
    confirmed,
    favorites,
    darkmode,
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
  const [prev, setPrev] = useState<string>()

  useEffect(() => {
    setBool('noGifs', noGifs)
    setBool('fullscreen', fullscreen)
    setBool('darkmode', darkmode)
    setBool('redGifsOnly', redGifsOnly)
    setBool('confirmed', confirmed)
    setString('favorites', JSON.stringify(favorites))
    window.history.replaceState(null, '', `?${queryString.stringify({ val })}`)
  }, [val, fullscreen, darkmode, noGifs, favorites, redGifsOnly])

  function setV(str: string) {
    const s = str.replace('u/', 'user/')
    setText(s)
    store.setVal(s)
  }

  function addToFavorites(str: string) {
    const s = str.replace('u/', 'user/')
    store.addFavorite(s)
  }

  return (
    <div>
      <div style={{ marginLeft: 10 }}>
        <h1>
          rpscroller <img style={{ height: '1em' }} src={flame} />
        </h1>

        <SettingsDialog
          open={showSettingsDialog}
          onClose={() => setShowSettingsDialog(false)}
        />

        <div>
          <label htmlFor="box">Reddit:</label>
          <input
            id="box"
            type="text"
            value={text}
            onChange={event => setText(event.target.value)}
          />
          <button onClick={() => store.setVal(text)}>Submit</button>
          <button onClick={() => addToFavorites(text)}>Add to favorites</button>
        </div>
        <div>
          <label htmlFor="fullscreen">Fullscreen</label>
          <input
            id="fullscreen"
            type="checkbox"
            checked={fullscreen}
            onChange={event => store.setFullscreen(event.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="darkmode">Dark mode</label>
          <input
            id="darkmode"
            type="checkbox"
            checked={darkmode}
            onChange={event => store.setDarkmode(event.target.checked)}
          />
        </div>

        <button onClick={() => setShowSettingsDialog(true)}>Settings</button>
        <button onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? 'Hide favorites' : 'Show favorites'}
        </button>
        {showFavorites ? (
          <div>
            {favorites.map(f => (
              <div key={f}>
                <button onClick={() => setV(f)}>{f}</button>
                <button onClick={() => store.removeFavorite(f)}>Remove</button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="error">{`${error}`}</div>
      ) : data ? (
        <div className="center">
          <div className={!fullscreen ? 'stage' : 'fullscreen'}>
            <div style={{ position: 'sticky' }}></div>
            {data.children
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
              .filter(({ data }) =>
                noGifs ? !data.url.endsWith('.gif') : true,
              )
              .filter(({ data }) =>
                redGifsOnly ? data.url.includes('redgifs') : true,
              )
              .map(({ data }) => {
                const {
                  id,
                  author,
                  subreddit_name_prefixed: subreddit,
                  title,
                  permalink,
                  url,
                } = data

                return (
                  <div key={id} className="item">
                    <h4 style={{ margin: 0, display: 'inline' }}>
                      {he.decode(title)}
                    </h4>{' '}
                    (
                    <a href={url} target="_blank">
                      link
                    </a>
                    ) (<a href={`https://reddit.com${permalink}`}>comments</a>)
                    <div>
                      <button onClick={() => setV(`/user/${author}`)}>
                        Browse {`/u/${author}`}
                      </button>
                      <button onClick={() => addToFavorites(`/user/${author}`)}>
                        Add {`/u/${author}`} to favorites
                      </button>
                    </div>
                    <div>
                      <button onClick={() => setV(subreddit)}>
                        Browse {subreddit}
                      </button>
                      <button onClick={() => addToFavorites(subreddit)}>
                        Add {subreddit} to favorites
                      </button>
                    </div>
                    {!url.includes('redgifs') &&
                    (url.endsWith('.jpg') ||
                      url.endsWith('.jpeg') ||
                      url.endsWith('.png') ||
                      url.endsWith('.gif') ||
                      url.endsWith('.webp')) ? (
                      <div>
                        <img
                          loading="lazy"
                          style={{ width: '100%' }}
                          src={url}
                        />
                      </div>
                    ) : url.includes('redgifs') ? (
                      <iframe
                        src={`https://www.redgifs.com/ifr/${redGifUrlToId(url)}`}
                        style={{ width: '100%', height: 800 }}
                        loading="lazy"
                        allowFullScreen
                        scrolling="no"
                        frameBorder="0"
                      />
                    ) : null}
                  </div>
                )
              })}
          </div>
        </div>
      ) : null}
      <div className="center">
        <button className="large" onClick={() => store.setPage(prev ?? '')}>
          Prev
        </button>
        <button
          className="large"
          disabled={!data?.after}
          onClick={() => {
            setPrev(page)
            store.setPage(data?.after ?? '')
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export { App }

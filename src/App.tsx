import { useEffect, useState } from 'react'
import queryString from 'query-string'
import useSWR from 'swr'

// components
import Loading from './LoadingSpinner'

// data
import { redGifUrlToId } from './util'
import { setBool, setString, useAppStore } from './store'

// @ts-expect-error
import flame from './favicon.svg'

function decode(html: string) {
  var txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

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
  const [showSettings, setShowSettings] = useState(false)
  const store = useAppStore()
  const {
    page,
    confirmed,
    favorites,
    darkmode,
    fullscreen,
    noGifs,
    hideButtons,
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
  useEffect(() => {
    if (darkmode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkmode])
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
    <div className="app">
      <div style={{ marginLeft: 10 }}>
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
            <button onClick={() => addToFavorites(text)}>
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
                id="darkmode"
                type="checkbox"
                checked={darkmode}
                onChange={event => store.setDarkmode(event.target.checked)}
              />
              <label htmlFor="darkmode">Dark mode</label>
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
              {favorites.map(f => (
                <tr key={f}>
                  <td>
                    <button onClick={() => setV(f)}>{f}</button>
                  </td>
                  <td>
                    <button onClick={() => store.removeFavorite(f)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </table>
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
                      {decode(title)}
                    </h4>{' '}
                    (
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
                          <button onClick={() => setV(`/user/${author}`)}>
                            Browse {`/u/${author}`}
                          </button>
                          <button
                            onClick={() => addToFavorites(`/user/${author}`)}
                          >
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
                      </>
                    )}
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
      <footer>
        <a href="https://github.com/codefeels/rpscroller/" target="_blank">
          Source code/report issues
        </a>
      </footer>
    </div>
  )
}

export { App }

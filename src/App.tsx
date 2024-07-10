import { useEffect, useState } from 'react'
import queryString from 'querystring'
import useSWR from 'swr'
import he from 'he'

// components
import ChoiceDialog from './ChoiceDialog'
import SettingsDialog from './SettingsDialog'

// data
import { redGifUrlToId } from './util'
import { useAppStore } from './store'
import Loading from './LoadingSpinner'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url} ${await res.text()}`)
  }
  const ret = await res.json()
  return ret.data as {
    before?: string
    after?: string
    children: {
      data: {
        id: string
        subreddit_name_prefixed: string
        title: string
        url: string
        author: string
      }
    }[]
  }
}

const favs = ['/user/lovingeli1', 'user/jennassecret', 'r/nsfw_html5+anal']
const params = new URLSearchParams(window.location.search)
const v = params.get('p') || '/r/nsfw'

function App() {
  const [text, setText] = useState(v)
  const [showChoiceDialog, setShowChoiceDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const store = useAppStore()
  const { page, fullscreen, noGifs, redGifsOnly, val } = store
  const url =
    `https://www.reddit.com/${val}.json` + (page ? `?after=${page}` : '')
  const { data, error, isLoading } = useSWR(url, fetcher)
  const [prev, setPrev] = useState<string>()

  useEffect(() => {
    window.history.replaceState(
      null,
      '',
      `?${queryString.stringify({ val, fullscreen, noGifs, redGifsOnly })}`,
    )
  }, [val, fullscreen, noGifs, redGifsOnly])

  function setV(str: string) {
    const s = str.replace('u/', 'user/')
    setText(s)
    store.setVal(s)
  }
  console.log({ data })

  return (
    <div>
      <h1>rpscroller</h1>

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

      <button onClick={() => setShowSettingsDialog(true)}>Settings</button>
      <div>
        {favs.map(f => (
          <button key={f} onClick={() => setV(f)}>
            {f}
          </button>
        ))}
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
                  url,
                } = data

                return (
                  <div key={id} className="item">
                    <button onClick={() => setV(`/user/${author}`)}>
                      {author}
                    </button>
                    <button onClick={() => setV(subreddit)}>{subreddit}</button>
                    <a href={url} target="_blank">
                      {he.decode(title)}
                    </a>
                    {!url.includes('redgifs') &&
                    (url.endsWith('.jpg') ||
                      url.endsWith('.jpeg') ||
                      url.endsWith('.png') ||
                      url.endsWith('.gif') ||
                      url.endsWith('.webp')) ? (
                      <div>
                        <img style={{ width: '100%' }} src={url} />
                      </div>
                    ) : url.includes('redgifs') ? (
                      <iframe
                        src={`https://www.redgifs.com/ifr/${redGifUrlToId(url)}`}
                        style={{ width: '100%', height: 800 }}
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
        <button className="large" onClick={() => store.setPage(prev || '')}>
          Prev
        </button>
        <button
          className="large"
          disabled={!data?.after}
          onClick={() => {
            setPrev(page)
            store.setPage(data?.after || '')
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export { App }

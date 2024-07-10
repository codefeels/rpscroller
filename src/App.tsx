import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import './stage.css'
import { redGifUrlToId } from './util'
import ChoiceDialog from './ChoiceDialog'
import SettingsDialog from './SettingsDialog'
import { useAppStore } from './store'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url} ${await res.text()}`)
  }
  const ret = await res.json()
  return ret.data
}

const favs = ['/user/lovingeli1', 'user/jennassecret', 'r/nsfw_html5+anal']
const params = new URLSearchParams(window.location.search)
const v = params.get('p') || '/r/nsfw'

function App() {
  const [val, setVal] = useState(v)
  const [page, setPage] = useState('')
  const [submittedVal, setSubmittedVal] = useState(v)
  const [showChoiceDialog, setShowChoiceDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const url =
    `https://www.reddit.com/${submittedVal}.json` +
    (page ? `?after=${page}` : '')
  const { data, error, isLoading } = useSWR(url, fetcher)
  const store = useAppStore()
  const { noGifs, redGifsOnly } = store

  useEffect(() => {
    window.history.replaceState(null, '', `?v=${submittedVal}`)
  }, [submittedVal])

  function setV(str: string) {
    const s = str.replace('u/', 'user/')
    setVal(s)
    setSubmittedVal(s)
  }

  return (
    <div>
      <h1>rpscroller</h1>
      <ChoiceDialog
        open={showChoiceDialog}
        onClose={() => setShowChoiceDialog(false)}
      />
      <SettingsDialog
        open={showSettingsDialog}
        onClose={() => setShowSettingsDialog(false)}
      />
      <div>
        <button onClick={() => setShowChoiceDialog(true)}>
          Select reddits...
        </button>
        <button onClick={() => setShowSettingsDialog(true)}>Settings</button>
        <label htmlFor="box">Reddit:</label>
        <input
          id="box"
          type="text"
          value={val}
          onChange={event => setVal(event.target.value)}
        />
        <button onClick={() => setSubmittedVal(val)}>Submit</button>
      </div>
      <div>
        {favs.map(f => (
          <button key={f} onClick={() => setV(f)}>
            {f}
          </button>
        ))}
      </div>
      {isLoading ? (
        <div>Loading</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{`${error}`}</div>
      ) : (
        <div className="stage">
          <div style={{ position: 'sticky' }}></div>
          {data.children
            .filter(({ data }) => !('comment_type' in data))
            .filter(({ data }) => (noGifs ? !data.url.endsWith('.gif') : true))
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
                    {title}
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
      )}
      <button disabled={!data?.before} onClick={() => setPage(data.before)}>
        Prev
      </button>
      <button disabled={!data?.after} onClick={() => setPage(data.after)}>
        Next
      </button>
    </div>
  )
}

export { App }

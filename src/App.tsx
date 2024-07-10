import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import './stage.css'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url} ${await res.text()}`)
  }
  return res.json()
}
const favs = ['/user/lovingeli1', 'user/jennassecret', 'r/nsfw_html5+anal']

const params = new URLSearchParams(window.location.search)
const v = params.get('p') || '/r/nsfw'

function App() {
  const [val, setVal] = useState(v)
  const [page, setPage] = useState('')
  const [submittedVal, setSubmittedVal] = useState(v)
  const url =
    `https://www.reddit.com/${submittedVal}.json` +
    (page ? `?after=${page}` : '')
  const { data, error, isLoading } = useSWR(url, fetcher)

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
      <div>
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
          {data.data.children
            .filter(({ data }) => !('comment_type' in data))
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
                  ) : url.includes('redgif') ? (
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
      <button
        disabled={!data?.data.before}
        onClick={() => setPage(data.data.before)}
      >
        Prev
      </button>
      <button
        disabled={!data?.data.after}
        onClick={() => setPage(data.data.after)}
      >
        Next
      </button>
    </div>
  )
}

function redGifUrlToId(url: string) {
  // watch to ifr
  let matches = url.match(/redgifs.com\/watch\/([\w-]+)\/?/i)
  if (matches?.length > 1) {
    return matches[1]
  }

  // already iframe
  let matches2 = url.match(/redgifs.com\/ifr\/([\w-]+)\/?/i)
  if (matches2?.length > 1) {
    return matches2[1]
  }

  // image
  let matches3 = url.match(/redgifs.com\/i\/([\w-]+)\/?/i)
  console.log({ url, matches }, '3')
  if (matches3?.length > 1) {
    return matches3[1]
  }

  return false
}

export { App }

//<video src="blob:https://www.redgifs.com/d5590584-2898-4b76-a35e-c922a8475131" autoplay="" loop="" playsinline="" poster="https://thumbs44.redgifs.com/MoccasinDeepAlleycat-mobile.jpg?expires=1720387200&amp;signature=v2:7b77b924dafca9ed3f3392733ca0d479a47980776715fe15139acb319002e9d6&amp;for=73.89.175&amp;hash=7011125643" disablepictureinpicture=""></video>

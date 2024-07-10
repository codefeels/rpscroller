import React, { useState } from 'react'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url} ${await res.text()}`)
  }
  return res.json()
}

function App() {
  const [val, setVal] = useState('/user/lovingeli1')
  const [submittedVal, setSubmittedVal] = useState(val)
  const { data, error, isLoading } = useSWR(
    `https://www.reddit.com/${submittedVal}.json`,
    fetcher,
  )

  return (
    <div>
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
      {isLoading ? (
        <div>Loading</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{`${error}`}</div>
      ) : (
        <div style={{ width: '50%' }}>
          <div style={{ position: 'sticky' }}></div>
          {data.data.children
            .filter(({ data }) => !('comment_type' in data))
            .map(({ data }) => {
              const { id, title, url: url2 = '', link_url } = data
              const url = url2 || link_url

              return (
                <div
                  key={id}
                  style={{ border: '1px solid black', padding: 40, margin: 40 }}
                >
                  <a href={url} target="_blank">
                    {title}
                  </a>
                  {url.endsWith('.jpg') ||
                  url.endsWith('.jpeg') ||
                  url.endsWith('.png') ||
                  url.endsWith('.gif') ||
                  url.endsWith('.webp') ? (
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
    </div>
  )
}

function redGifUrlToId(url: string) {
  //https://redgifs.com/ifr/unhappyfluidgrassspider'
  var matches = url.match(/redgifs.com\/watch\/([\w-]+)\/?/i)
  if (matches && matches.length > 1) {
    return matches[1]
  }

  matches = url.match(/redgifs.com\/ifr\/([\w-]+)\/?/i)
  if (matches && matches.length > 1) {
    return matches[1]
  }

  return false
}

export { App }

//<video src="blob:https://www.redgifs.com/d5590584-2898-4b76-a35e-c922a8475131" autoplay="" loop="" playsinline="" poster="https://thumbs44.redgifs.com/MoccasinDeepAlleycat-mobile.jpg?expires=1720387200&amp;signature=v2:7b77b924dafca9ed3f3392733ca0d479a47980776715fe15139acb319002e9d6&amp;for=73.89.175&amp;hash=7011125643" disablepictureinpicture=""></video>

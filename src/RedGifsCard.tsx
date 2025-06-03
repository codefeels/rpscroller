import { useState } from 'react'

import { useDebounceValue, useIntersectionObserver } from 'usehooks-ts'

import Button from './Button'
import { useAppStore } from './store'
import { useSmallScreen } from './useSmallScreen'
import { redGifUrlToId } from './util'

import type { Post } from './util'

function RedGifsCardLoaded({ post, val }: { post: Post; val: number }) {
  const { title, url } = post
  return (
    <>
      <iframe
        title={title}
        src={`https://www.redgifs.com/ifr/${redGifUrlToId(url)}`}
        className="w-full overflow-hidden"
        style={{ height: `${val}vh` }}
        loading="lazy"
        allowFullScreen
      />
    </>
  )
}

function RedGifsLoading({ val }: { val: number }) {
  return (
    <div
      className={`animate-pulse space-y-4 w-full`}
      style={{ height: `${val}vh` }}
    >
      <div className="rounded-full bg-slate-700 h-10 w-10" />
      <div className="rounded-full bg-slate-700 h-10 w-10" />
      <div className="rounded-full bg-slate-700 h-10 w-10" />
      <div className="rounded-full bg-slate-700 h-10 w-10" />
    </div>
  )
}

export default function RedGifsCard({ post }: { post: Post }) {
  const { isFullscreen } = useAppStore()

  const [val, setVal] = useState(80)
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: isFullscreen ? 1 : val > 100 ? 0.2 : 0.4,
  })
  const [debouncedIsIntersecting] = useDebounceValue(isIntersecting, 1000)
  const small = useSmallScreen()

  return (
    <div ref={ref}>
      {small ? null : (
        <div>
          <input
            type="range"
            min={50}
            max={300}
            className="range [--range-fill:0]"
            value={val}
            onChange={event => {
              setVal(+event.target.value)
            }}
          />
          <Button
            onClick={() => {
              setVal(200)
            }}
          >
            Maximize
          </Button>
          <Button
            onClick={() => {
              setVal(80)
            }}
          >
            Minimize
          </Button>
        </div>
      )}
      {debouncedIsIntersecting ? (
        <RedGifsCardLoaded val={val} post={post} />
      ) : (
        <RedGifsLoading val={val} />
      )}
    </div>
  )
}

import { useState } from 'react'
import { useDebounceValue, useIntersectionObserver } from 'usehooks-ts'
// locals
import { redGifUrlToId, type Post } from './util'
import { useAppStore } from './store'
import Button from './Button'

function RedGifsCardLoaded({ post }: { post: Post }) {
  const { title, url } = post
  const [superTall, setSuperTall] = useState(false)
  return (
    <>
      <Button
        onClick={() => {
          setSuperTall(!superTall)
        }}
      >
        {superTall ? 'Normal' : 'Supertall'}
      </Button>
      <iframe
        title={title}
        src={`https://www.redgifs.com/ifr/${redGifUrlToId(url)}`}
        className={superTall ? 'h-[200vh] w-full' : 'h-[80vh] w-full'}
        loading="lazy"
        allowFullScreen
        scrolling="no"
        frameBorder="0"
      />
    </>
  )
}

function RedGifsLoading() {
  return (
    <div className="animate-pulse space-y-4 w-full h-[80vh]">
      <div className="rounded-full bg-slate-700 h-10 w-10" />
      <div className="rounded-full bg-slate-700 h-10 w-10" />
      <div className="rounded-full bg-slate-700 h-10 w-10" />
      <div className="rounded-full bg-slate-700 h-10 w-10" />
    </div>
  )
}

export default function RedGifsCard({ post }: { post: Post }) {
  const { isFullscreen } = useAppStore()
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: isFullscreen ? 1 : 0.4,
  })
  const [debouncedIsIntersecting] = useDebounceValue(isIntersecting, 1000)

  return (
    <div ref={ref}>
      {debouncedIsIntersecting ? (
        <RedGifsCardLoaded post={post} />
      ) : (
        <RedGifsLoading />
      )}
    </div>
  )
}

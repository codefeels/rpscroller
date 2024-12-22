import { useState } from 'react'

import { useDebounceValue, useIntersectionObserver } from 'usehooks-ts'

// locals
import Button from './Button'
import { useAppStore } from './store'
import { useSmallScreen } from './useSmallScreen'
import { type Post, redGifUrlToId } from './util'

function RedGifsCardLoaded({
  post,
  superTall,
}: {
  superTall: boolean
  post: Post
}) {
  const { title, url } = post
  const h = superTall ? 'h-[200vh] w-full' : 'h-[80vh] w-full'
  return (
    <>
      <iframe
        title={title}
        src={`https://www.redgifs.com/ifr/${redGifUrlToId(url)}`}
        className={`${h} overflow-hidden`}
        loading="lazy"
        allowFullScreen
      />
    </>
  )
}

function RedGifsLoading({ superTall }: { superTall: boolean }) {
  return (
    <div
      className={`animate-pulse space-y-4 w-full ${superTall ? 'h-[200vh] w-full' : 'h-[80vh] w-full'}`}
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

  const [superTall, setSuperTall] = useState(false)
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: isFullscreen ? 1 : superTall ? 0.2 : 0.4,
  })
  const [debouncedIsIntersecting] = useDebounceValue(isIntersecting, 1000)
  const small = useSmallScreen()

  return (
    <div ref={ref}>
      {small ? null : (
        <Button
          onClick={() => {
            setSuperTall(!superTall)
          }}
        >
          {superTall ? 'Normal' : 'Supertall'}
        </Button>
      )}
      {debouncedIsIntersecting ? (
        <RedGifsCardLoaded superTall={superTall} post={post} />
      ) : (
        <RedGifsLoading superTall={superTall} />
      )}
    </div>
  )
}

import { useDebounceValue, useIntersectionObserver } from 'usehooks-ts'
import { redGifUrlToId, type Post } from './util'

function RedGifsCardLoaded({ post }: { post: Post }) {
  const { title, url } = post
  return (
    <>
      <iframe
        title={title}
        src={`https://www.redgifs.com/ifr/${redGifUrlToId(url)}`}
        className="h-[80vh] w-full"
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
    <div
      style={{ width: '100%', height: '90vh' }}
      className="flex flex-col animate-pulse space-y-4 m-20"
    >
      <div className="rounded-full bg-slate-700 h-10 w-10" />
      <div className="rounded-full bg-slate-700 h-10 w-10" />
      <div className="rounded-full bg-slate-700 h-10 w-10" />
      <div className="rounded-full bg-slate-700 h-10 w-10" />
    </div>
  )
}

export default function RedGifsCard({ post }: { post: Post }) {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.4,
  })
  const [debouncedIsIntersecting] = useDebounceValue(isIntersecting, 2000)

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

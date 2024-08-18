import { useDebounceValue, useIntersectionObserver } from 'usehooks-ts'
import { formatDistance } from 'date-fns'
// components
import GalleryCard from './GalleryCard'
import CardButtons from './CardButtons'
// utils
import { useAppStore } from './store'
import { decode, redGifUrlToId, type Post } from './util'

import { BiSolidUpvote } from 'react-icons/bi'

function CardHeader({ post }: { post: Post }) {
  const { hideButtons } = useAppStore()
  const {
    author,
    subreddit_name_prefixed: subreddit,
    title,
    permalink,
    url,
  } = post
  return (
    <div>
      <h4 className="inline">
        {decode(title)} (
        {formatDistance(new Date(post.created * 1000), new Date(), {
          addSuffix: true,
        })}
        ) [{post.score} <BiSolidUpvote />]
      </h4>{' '}
      (
      <a
        href={`https://reddit.com/u/${author}`}
        target="_blank"
        rel="noreferrer"
      >
        user
      </a>
      ) (
      <a href={url} target="_blank" rel="noreferrer">
        url
      </a>
      ) (
      <a
        href={`https://reddit.com/${subreddit}`}
        target="_blank"
        rel="noreferrer"
      >
        subreddit
      </a>
      ) (
      <a
        href={`https://reddit.com${permalink}`}
        target="_blank"
        rel="noreferrer"
      >
        comments
      </a>
      ){hideButtons ? null : <CardButtons post={post} />}
    </div>
  )
}

function RedGifsCard({ post }: { post: Post }) {
  const { title, url } = post
  return (
    <iframe
      title={title}
      src={`https://www.redgifs.com/ifr/${redGifUrlToId(url)}`}
      className="h-screen w-full"
      loading="lazy"
      allowFullScreen
      scrolling="no"
      frameBorder="0"
    />
  )
}

function RedGifsLoading() {
  return (
    <div
      style={{ width: '100%', height: '100vh' }}
      className="flex flex-col animate-pulse space-y-4 m-20"
    >
      <div className="rounded-full bg-slate-700 h-10 w-10" />
      <div className="rounded-full bg-slate-700 h-10 w-10" />
      <div className="rounded-full bg-slate-700 h-10 w-10" />
      <div className="rounded-full bg-slate-700 h-10 w-10" />
    </div>
  )
}

function isPic(url: string) {
  return (
    !url.includes('redgifs') &&
    (url.endsWith('.jpg') ||
      url.endsWith('.jpeg') ||
      url.endsWith('.webp') ||
      url.endsWith('.png') ||
      url.endsWith('.gif') ||
      url.endsWith('.webp'))
  )
}

export default function Card({ post }: { post: Post }) {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.4,
  })
  const [debouncedIsIntersecting] = useDebounceValue(isIntersecting, 1000)
  const { title, url } = post
  return (
    <div>
      <CardHeader post={post} />

      {url.startsWith('https://www.reddit.com/gallery') ? (
        <GalleryCard post={post} />
      ) : url.includes('redgifs') ? (
        <div ref={ref}>
          {debouncedIsIntersecting ? (
            <RedGifsCard post={post} />
          ) : (
            <RedGifsLoading />
          )}
        </div>
      ) : isPic(url) ? (
        <img
          alt={title}
          loading="lazy"
          className="w-full max-h-screen object-contain"
          src={url}
        />
      ) : null}
    </div>
  )
}

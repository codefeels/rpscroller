import { lazy } from 'react'

// components
import CardHeader from './CardHeader'
import ImageCard from './ImageCard'

// type
import type { Post } from './util'
// lazies
const RedGifsCard = lazy(() => import('./RedGifsCard'))
const GalleryCard = lazy(() => import('./GalleryCard'))

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
  const { title, url } = post
  return (
    <div>
      <CardHeader post={post} />
      {url.startsWith('https://www.reddit.com/gallery') ? (
        <GalleryCard post={post} />
      ) : url.includes('redgifs') ? (
        <RedGifsCard post={post} />
      ) : isPic(url) ? (
        <ImageCard title={title} url={url} />
      ) : (
        <div>
          We do not know how to embed this post type yet!{' '}
          <a href={url}>
            {url} {title}
          </a>
        </div>
      )}
    </div>
  )
}

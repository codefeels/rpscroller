import Card from './Card'
import NoResultsMessage from './NoResultsMessage'
import { useAppStore } from './store'
import { type Post, deduplicate } from './util'

export default function CardList({ posts }: { posts: Post[] }) {
  const {
    noGifs,
    blocked,
    skipPinned,
    dedupe,
    fullscreen,
    noRedGifs,
    redGifsOnly,
  } = useAppStore()
  let result = posts
    .filter(post => !('comment_type' in post))
    .filter(
      ({ url }) =>
        url.includes('redgifs') ||
        url.endsWith('.jpg') ||
        url.endsWith('.webp') ||
        url.endsWith('.jpeg') ||
        url.endsWith('.png') ||
        url.endsWith('.gif') ||
        url.endsWith('.webp') ||
        url.startsWith('https://www.reddit.com/gallery'),
    )
    .filter(post => (noGifs ? !post.url.endsWith('.gif') : true))
    .filter(post => (redGifsOnly ? post.url.includes('redgifs') : true))
    .filter(post => (noRedGifs ? !post.url.includes('redgifs') : true))
    .filter(post => (skipPinned ? !post.pinned : true))
    .filter(post => !blocked.includes(post.author))

  if (dedupe) {
    result = deduplicate(result, post => post.url)
  }
  return (
    <div className="flex justify-center overflow-hidden">
      <div className={fullscreen ? 'lg:w-11/12' : 'lg:w-1/2'}>
        <div className="flex flex-col space-y-20">
          {result.length > 0 ? (
            result.map(post => <Card key={post.id} post={post} />)
          ) : (
            <NoResultsMessage />
          )}
        </div>
      </div>
    </div>
  )
}

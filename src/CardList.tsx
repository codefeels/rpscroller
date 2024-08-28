import Card from './Card'
import { useAppStore } from './store'
import { deduplicate, type Post } from './util'

export default function CardList({ posts }: { posts: Post[] }) {
  const { noGifs, skipPinned, dedupe, fullscreen, redGifsOnly } = useAppStore()
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
    .filter(post => (skipPinned ? !post.pinned : true))

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
            <h1>
              No results on this page, check your filters in the settings or
              this may just have been a page of comments if you are browsing a
              user page
            </h1>
          )}
        </div>
      </div>
    </div>
  )
}

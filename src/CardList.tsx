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
  const totalPosts = posts.length

  // Filter out comments
  const afterCommentFilter = result.filter(post => !('comment_type' in post))
  const commentTypeFiltered = result.length - afterCommentFilter.length
  result = afterCommentFilter
  console.log({ posts })

  // Filter by URL type
  const afterUrlFilter = result.filter(
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
  const urlTypeFiltered = result.length - afterUrlFilter.length
  result = afterUrlFilter

  // Filter GIFs if needed
  const afterGifFilter = result.filter(post =>
    noGifs ? !post.url.endsWith('.gif') : true,
  )
  const gifFiltered = result.length - afterGifFilter.length
  result = afterGifFilter

  // Filter for RedGifs only if needed
  const afterRedGifsOnlyFilter = result.filter(post =>
    redGifsOnly ? post.url.includes('redgifs') : true,
  )
  const redGifsOnlyFiltered = result.length - afterRedGifsOnlyFilter.length
  result = afterRedGifsOnlyFilter

  // Filter out RedGifs if needed
  const afterNoRedGifsFilter = result.filter(post =>
    noRedGifs ? !post.url.includes('redgifs') : true,
  )
  const noRedGifsFiltered = result.length - afterNoRedGifsFilter.length
  result = afterNoRedGifsFilter

  // Filter pinned posts if needed
  const afterPinnedFilter = result.filter(post =>
    skipPinned ? !post.pinned : true,
  )
  const pinnedFiltered = result.length - afterPinnedFilter.length
  result = afterPinnedFilter

  // Filter blocked authors
  const afterBlockedFilter = result.filter(
    post => !blocked.includes(post.author),
  )
  const blockedFiltered = result.length - afterBlockedFilter.length
  result = afterBlockedFilter

  if (dedupe) {
    result = deduplicate(result, post => post.url)
  }
  console.log({ result })
  return (
    <div className="flex justify-center overflow-hidden">
      <div className={fullscreen ? 'lg:w-11/12' : 'lg:w-1/2'}>
        <div className="flex flex-col space-y-20">
          {result.length > 0 ? (
            result.map(post => <Card key={post.id} post={post} />)
          ) : (
            <NoResultsMessage
              totalPosts={totalPosts}
              commentTypeFiltered={commentTypeFiltered}
              urlTypeFiltered={urlTypeFiltered}
              gifFiltered={gifFiltered}
              redGifsOnlyFiltered={redGifsOnlyFiltered}
              noRedGifsFiltered={noRedGifsFiltered}
              pinnedFiltered={pinnedFiltered}
              blockedFiltered={blockedFiltered}
              remainingPosts={result.length}
              totalFiltered={totalPosts - result.length}
            />
          )}
        </div>
      </div>
    </div>
  )
}

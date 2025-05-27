import Card from './Card'
import NoResultsMessage from './NoResultsMessage'
import { filterPosts } from './postFilters'
import { useAppStore } from './store'
import { type Post } from './util'

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
  
  const { filteredPosts: result, stats } = filterPosts(posts, {
    noGifs,
    blocked,
    skipPinned,
    dedupe,
    noRedGifs,
    redGifsOnly,
  })
  return (
    <div className="flex justify-center overflow-hidden">
      <div className={fullscreen ? 'lg:w-11/12' : 'lg:w-1/2'}>
        <div className="flex flex-col space-y-20">
          {result.length > 0 ? (
            result.map(post => <Card key={post.id} post={post} />)
          ) : (
            <NoResultsMessage
              totalPosts={stats.totalPosts}
              commentTypeFiltered={stats.commentTypeFiltered}
              urlTypeFiltered={stats.urlTypeFiltered}
              gifFiltered={stats.gifFiltered}
              redGifsOnlyFiltered={stats.redGifsOnlyFiltered}
              noRedGifsFiltered={stats.noRedGifsFiltered}
              pinnedFiltered={stats.pinnedFiltered}
              blockedFiltered={stats.blockedFiltered}
              remainingPosts={stats.remainingPosts}
              totalFiltered={stats.totalPosts - stats.remainingPosts}
            />
          )}
        </div>
      </div>
    </div>
  )
}

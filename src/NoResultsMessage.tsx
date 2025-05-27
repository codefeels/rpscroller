import Button from './Button'
import { useAppStore } from './store'

export default function NoResultsMessage({
  totalFiltered,
}: {
  totalPosts: number
  commentTypeFiltered: number
  urlTypeFiltered: number
  gifFiltered: number
  redGifsOnlyFiltered: number
  noRedGifsFiltered: number
  pinnedFiltered: number
  blockedFiltered: number
  remainingPosts: number
  totalFiltered: number
}) {
  const store = useAppStore()
  const { redGifsOnly } = store
  return (
    <>
      <h1>
        Check your filters in the settings or this may just have been a page of
        comments if you are browsing a user page
      </h1>
      {redGifsOnly ? (
        <div>
          Note: RedGifs only is on.
          <Button
            onClick={() => {
              store.setRedGifsOnly(!redGifsOnly)
            }}
          >
            Turn off RedGifs only
          </Button>
        </div>
      ) : null}
      <div>
        {totalFiltered ? (
          <div>
            Total posts filtered out (non-image posts, not matching filters,
            etc): {totalFiltered}
          </div>
        ) : null}
      </div>
      <div>
        Note that we are not able to embed v.redd.it videos from e.g. popular
        SFW reddits
      </div>
    </>
  )
}

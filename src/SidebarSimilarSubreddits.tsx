import { FaMinus, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import { useLocalStorage } from 'usehooks-ts'

import Button from './Button'
import MenuItem from './MenuItem'
import SidebarSectionWrapper from './SidebarSectionWrapper'
import { fetchGraphData } from './fetchGraph'
import { useAppStore } from './store'
import { useCurrentPage } from './useCurrentPage'
import { isUserSubreddit, normalizeForDisplay } from './util'

export default function SidebarSimilarSubreddits() {
  const store = useAppStore()
  const { defaultPage, recentlyVisited } = store
  const val = useCurrentPage(defaultPage)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading, error } = useSWR('graph', () => fetchGraphData(), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  const [showSimilarSubreddits, setShowSimilarSubreddits] = useLocalStorage(
    'showSimilar',
    true,
  )
  const [showMoreSimilar, setShowMoreSimilar] = useLocalStorage(
    'showMoreSimilar',
    true,
  )

  const ret = Object.fromEntries(recentlyVisited.map(r => [r.name, r]))
  return isUserSubreddit(val) ? null : (
    <SidebarSectionWrapper>
      <div>
        Similar subreddits:
        <Button
          onClick={() => {
            setShowSimilarSubreddits(!showSimilarSubreddits)
          }}
        >
          {showSimilarSubreddits ? (
            <FaMinus className="inline" />
          ) : (
            <FaPlus className="inline" />
          )}
        </Button>
        <Button
          className="ml-1"
          onClick={() => {
            setShowMoreSimilar(!showMoreSimilar)
          }}
        >
          {showMoreSimilar ? 'Show less' : 'Show more'}
        </Button>
      </div>
      {showSimilarSubreddits ? (
        <div>
          {isLoading ? <div>Loading</div> : null}
          {error ? <div className="text-error">{`${error}`}</div> : null}
          {data ? (
            <div>
              {[
                ...new Set(
                  data[normalizeForDisplay(val).replace('r/', '')] ?? [],
                ),
              ]
                .map(r => `/r/${r}`)
                .sort(
                  (a, b) =>
                    ((ret[normalizeForDisplay(a)]?.visitedCount ?? 0) -
                      (ret[normalizeForDisplay(b)]?.visitedCount ?? 0)) *
                    -1,
                )
                .slice(0, showMoreSimilar ? 1000 : 7)
                .map(r => (
                  <Link key={r} to={r}>
                    <MenuItem>
                      - {normalizeForDisplay(r)} (
                      {ret[normalizeForDisplay(r)]?.visitedCount ?? 0})
                    </MenuItem>
                  </Link>
                ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </SidebarSectionWrapper>
  )
}

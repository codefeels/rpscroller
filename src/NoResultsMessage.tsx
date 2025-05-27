import Button from './Button'
import { useAppStore } from './store'

export default function NoResultsMessage({
  totalPosts,
  commentTypeFiltered,
  urlTypeFiltered,
  gifFiltered,
  redGifsOnlyFiltered,
  noRedGifsFiltered,
  pinnedFiltered,
  blockedFiltered,
  remainingPosts,
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
        No results on this page, check your filters in the settings or this may
        just have been a page of comments if you are browsing a user page
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
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th
                style={{
                  border: '1px solid',
                  padding: '8px',
                  textAlign: 'left',
                }}
              >
                Statistic
              </th>
              <th
                style={{
                  border: '1px solid',
                  padding: '8px',
                  textAlign: 'left',
                }}
              >
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid', padding: '8px' }}>
                Total Posts
              </td>
              <td style={{ border: '1px solid', padding: '8px' }}>
                {totalPosts}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid', padding: '8px' }}>
                Comments Filtered
              </td>
              <td style={{ border: '1px solid', padding: '8px' }}>
                {commentTypeFiltered}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid', padding: '8px' }}>
                URL Type Filtered
              </td>
              <td style={{ border: '1px solid', padding: '8px' }}>
                {urlTypeFiltered}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid', padding: '8px' }}>
                GIFs Filtered
              </td>
              <td style={{ border: '1px solid', padding: '8px' }}>
                {gifFiltered}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid', padding: '8px' }}>
                RedGifs Only Filtered
              </td>
              <td style={{ border: '1px solid', padding: '8px' }}>
                {redGifsOnlyFiltered}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid', padding: '8px' }}>
                Non-RedGifs Filtered
              </td>
              <td style={{ border: '1px solid', padding: '8px' }}>
                {noRedGifsFiltered}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid', padding: '8px' }}>
                Pinned Filtered
              </td>
              <td style={{ border: '1px solid', padding: '8px' }}>
                {pinnedFiltered}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid', padding: '8px' }}>
                Blocked Filtered
              </td>
              <td style={{ border: '1px solid', padding: '8px' }}>
                {blockedFiltered}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid', padding: '8px' }}>
                Remaining Posts
              </td>
              <td style={{ border: '1px solid', padding: '8px' }}>
                {remainingPosts}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid', padding: '8px' }}>
                Total Filtered
              </td>
              <td style={{ border: '1px solid', padding: '8px' }}>
                {totalFiltered}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

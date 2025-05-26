import Button from './Button'
import { useAppStore } from './store'

export default function NoResultsMessage() {
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
          <Button onClick={() => { store.setRedGifsOnly(!redGifsOnly); }}>
            Turn off RedGifs only
          </Button>
        </div>
      ) : null}
    </>
  )
}

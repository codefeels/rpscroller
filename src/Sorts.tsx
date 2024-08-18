import { useAppStore } from './store'

export default function Sorts() {
  const store = useAppStore()
  const { mode } = store

  return (
    <div>
      <div>
        <label htmlFor="topall">Top (all time)</label>
        <input
          id="topall"
          value="topall"
          type="radio"
          checked={mode === 'topall'}
          onChange={event => {
            store.setMode(event.target.value)
          }}
        />
      </div>
      <div>
        <label htmlFor="topyear">Top (year)</label>
        <input
          id="topyear"
          value="topyear"
          type="radio"
          checked={mode === 'topyear'}
          onChange={event => {
            store.setMode(event.target.value)
          }}
        />
      </div>
      <div>
        <label htmlFor="topday">Top (day)</label>
        <input
          id="topday"
          value="topday"
          type="radio"
          checked={mode === 'topday'}
          onChange={event => {
            store.setMode(event.target.value)
          }}
        />
      </div>
      <div>
        <label htmlFor="topmonth">Top (month)</label>
        <input
          id="topmonth"
          value="topmonth"
          type="radio"
          checked={mode === 'topmonth'}
          onChange={event => {
            store.setMode(event.target.value)
          }}
        />
      </div>
      <div>
        <label htmlFor="hot">Hot</label>
        <input
          id="hot"
          value="hot"
          type="radio"
          checked={mode === 'hot'}
          onChange={event => {
            store.setMode(event.target.value)
          }}
        />
      </div>
      <div>
        <label htmlFor="new">New</label>
        <input
          id="new"
          value="new"
          type="radio"
          checked={mode === 'new'}
          onChange={event => {
            store.setMode(event.target.value)
          }}
        />
      </div>
    </div>
  )
}

import { useAppStore } from './store'

export default function Settings() {
  const store = useAppStore()
  return (
    <div className="lg:m-10">
      <h4>Settings</h4>
      <div>
        <input
          id="nogifs"
          type="checkbox"
          checked={store.noGifs}
          onChange={event => store.setNoGifs(event.target.checked)}
        />
        <label htmlFor="nogifs">
          No gifs? The actual, slow bloated filetype
        </label>
      </div>
      <div>
        <input
          id="infiniteScroll"
          type="checkbox"
          checked={store.infiniteScroll}
          onChange={event => store.setInfiniteScroll(event.target.checked)}
        />
        <label htmlFor="infiniteScroll">Infinite scroll</label>
      </div>
      <div>
        <input
          id="skipPinned"
          type="checkbox"
          checked={store.skipPinned}
          onChange={event => store.setSkipPinned(event.target.checked)}
        />
        <label htmlFor="skipPinned">Skip pinned posts</label>
      </div>
      <div>
        <input
          id="dedupe"
          type="checkbox"
          checked={store.dedupe}
          onChange={event => store.setDedupe(event.target.checked)}
        />
        <label htmlFor="nogifs">De-duplicate repeat URLs on each page</label>
      </div>

      <div>
        <input
          id="redgifs"
          type="checkbox"
          checked={store.redGifsOnly}
          onChange={event => store.setRedGifsOnly(event.target.checked)}
        />
        <label htmlFor="redgifs">RedGifs only (the image host)</label>
      </div>

      <div>
        <input
          id="fullscreen"
          type="checkbox"
          checked={store.fullscreen}
          onChange={event => store.setFullscreen(event.target.checked)}
        />
        <label htmlFor="fullscreen">Fullscreen</label>
      </div>
      <div>
        <input
          id="hidebuttons"
          type="checkbox"
          checked={store.hideButtons}
          onChange={event => store.setHideButtons(event.target.checked)}
        />
        <label htmlFor="hidebuttons">Hide buttons to add to favs/browse</label>
      </div>
    </div>
  )
}

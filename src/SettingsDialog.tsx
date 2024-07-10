import { useDialogShown } from './util'
import { useAppStore } from './store'

export default function SettingsDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const ref = useDialogShown(open)
  const store = useAppStore()

  return (
    <dialog ref={ref} style={{ maxWidth: 800 }}>
      <div className="setting">
        <label htmlFor="nogifs">
          No gifs? The actual, slow bloated filetype
        </label>
        <input
          id="nogifs"
          type="checkbox"
          checked={store.noGifs}
          onChange={event => store.setNoGifs(event.target.checked)}
        />
      </div>

      <div className="setting">
        <label htmlFor="redgifs">RedGifs only (the image host)</label>
        <input
          id="redgifs"
          type="checkbox"
          checked={store.redGifsOnly}
          onChange={event => store.setRedGifsOnly(event.target.checked)}
        />
      </div>

      <div className="setting">
        <label htmlFor="hidebuttons">Hide buttons to add to favs/browse</label>
        <input
          id="hidebuttons"
          type="checkbox"
          checked={store.hideButtons}
          onChange={event => store.setHideButtons(event.target.checked)}
        />
      </div>
      <button onClick={() => onClose()}>submit</button>
    </dialog>
  )
}

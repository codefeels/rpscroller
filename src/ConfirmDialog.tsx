import { useDialogShown } from './util'

export default function ConfirmDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const ref = useDialogShown(open)
  return (
    <dialog ref={ref} style={{ maxWidth: 500 }}>
      <h1>
        This app displays adult content. Please confirm that you are over the
        age of 18+ to use this app.
      </h1>
      <button
        onClick={() => {
          onClose()
        }}
      >
        confirm
      </button>
      <button
        onClick={() => {
          window.location.href = 'https://google.com'
        }}
      >
        get me out of here
      </button>
    </dialog>
  )
}

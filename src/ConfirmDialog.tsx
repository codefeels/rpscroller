import Button from './Button'
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
    <dialog ref={ref} className="max-w-xl">
      <h1>
        This app displays adult content. Please confirm that you are over the
        age of 18+ to use this app.
      </h1>
      <Button
        onClick={() => {
          onClose()
        }}
      >
        confirm
      </Button>
      <Button
        onClick={() => {
          window.location.href = 'https://google.com'
        }}
      >
        get me out of here
      </Button>
    </dialog>
  )
}

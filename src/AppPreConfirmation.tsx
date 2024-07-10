import { App } from './App'
import { useAppStore } from './store'
import ConfirmDialog from './ConfirmDialog'

export default function AppPreConfirmation() {
  const store = useAppStore()
  const { confirmed } = store
  return confirmed ? (
    <App />
  ) : (
    <ConfirmDialog open onClose={() => store.setConfirmed(true)} />
  )
}

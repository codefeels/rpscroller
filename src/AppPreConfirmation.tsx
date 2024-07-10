import App from './App'
import ConfirmDialog from './ConfirmDialog'

import { useAppStore } from './store'

export default function AppPreConfirmation() {
  const store = useAppStore()
  const { confirmed } = store
  return confirmed ? (
    <App />
  ) : (
    <ConfirmDialog open onClose={() => store.setConfirmed(true)} />
  )
}

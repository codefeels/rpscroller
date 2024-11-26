import { MdDelete } from 'react-icons/md'

// locals
import BaseDialog from './BaseDialog'
import Button from './Button'
import { useAppStore } from './store'
import { normalizeForDisplay } from './util'
// components

export default function BlockedUsersDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const store = useAppStore()
  const { blocked } = store
  return (
    <BaseDialog open={open} onClose={onClose}>
      <h4>Blocked users</h4>
      {blocked.length === 0 ? (
        <div>No blocked users</div>
      ) : (
        <div className="overflow-auto">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th className="whitespace-nowrap">Delete</th>
              </tr>
            </thead>
            <tbody>
              {blocked.map(f => (
                <tr key={f}>
                  <td className="whitespace-nowrap">
                    <Button
                      onClick={() => {
                        store.setVal(f)
                      }}
                    >
                      {normalizeForDisplay(f)}
                    </Button>
                  </td>

                  <td>
                    <Button
                      onClick={() => {
                        store.removeBlocked(f)
                      }}
                    >
                      <MdDelete className="inline" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </BaseDialog>
  )
}

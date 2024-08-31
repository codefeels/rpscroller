import { MdDelete } from 'react-icons/md'
import { normalizeForDisplay, useAppStore } from './store'
import Button from './Button'
import BaseDialog from './BaseDialog'

export default function BlockedUsersDialog({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (arg: boolean) => void
}) {
  const store = useAppStore()
  const { blocked } = store
  return (
    <BaseDialog open={open} setOpen={setOpen}>
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

import { isUserSubreddit, useAppStore } from './store'

import { IoMdHome } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import { useDialogShown } from './util'
import { useEffect, useRef } from 'react'
import Button from './Button'

export default function Favorites({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (arg: boolean) => void
}) {
  const store = useAppStore()
  const { favorites } = store
  const ref = useDialogShown(open)
  const ref2 = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref2.current && !ref2.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setOpen])
  return (
    <dialog ref={ref} className="max-w-xl">
      <div ref={ref2} className="lg:m-10">
        <h4>Favorites</h4>

        <div className="max-h-[80vh] overflow-auto">
          <table>
            <tbody>
              {[
                ...favorites
                  .filter(f => !isUserSubreddit(f))
                  .sort((a, b) =>
                    a.toLowerCase().localeCompare(b.toLowerCase()),
                  ),
                ...favorites
                  .filter(f => isUserSubreddit(f))
                  .sort((a, b) =>
                    a.toLowerCase().localeCompare(b.toLowerCase()),
                  ),
              ].map(f => (
                <tr key={f}>
                  <td>
                    <Button
                      onClick={() => {
                        store.setVal(f)
                      }}
                    >
                      {f}
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        store.removeFavorite(f)
                      }}
                    >
                      <MdDelete className="inline" />
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        store.setDefaultPage(f)
                      }}
                    >
                      <IoMdHome className="inline" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <p>Legend:</p>
          <div>
            <IoMdHome className="inline" /> = Set as default page
          </div>
          <div>
            <MdDelete className="inline" /> = Delete from favorites
          </div>
        </div>
      </div>
    </dialog>
  )
}

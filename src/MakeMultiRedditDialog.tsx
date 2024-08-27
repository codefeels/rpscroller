import { useEffect, useRef, useState } from 'react'
import { isUserSubreddit, normalizeSubreddit, useAppStore } from './store'

import { FaCartShopping } from 'react-icons/fa6'
import Button from './Button'
import { useDialogShown } from './util'

export default function MakeMultiReddit({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (arg: boolean) => void
}) {
  const store = useAppStore()
  const { favorites } = store
  const [multi, setMulti] = useState<string[]>([])
  const multiVal = `/r/${multi.map(s => s.replace('r/', '')).join('+')}`
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
        <h4>
          Make multi-reddit
          <div>
            <div>
              <input id="multireddit" readOnly type="text" value={multiVal} />
              <Button
                onClick={() => {
                  store.setVal(multiVal)
                }}
              >
                Submit
              </Button>
              <Button
                onClick={() => {
                  setMulti([])
                }}
              >
                Clear
              </Button>
            </div>
          </div>
        </h4>
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
                  <td>{f}</td>
                  <td>
                    <Button
                      disabled={multi.includes(f)}
                      onClick={() => {
                        setMulti([...multi, normalizeSubreddit(f)])
                      }}
                    >
                      <FaCartShopping className="inline" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </dialog>
  )
}

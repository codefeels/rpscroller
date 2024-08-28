import { useEffect, useRef, useState } from 'react'
import {
  isUserSubreddit,
  normalizeForDisplay,
  normalizeSubreddit,
  useAppStore,
} from './store'

import { FaCartShopping, FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import Button from './Button'
import { useDialogShown } from './util'
import { formatDistance } from 'date-fns'

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
  const multiVal = `/r/${multi.map(s => s.replace('user/', 'u_').replace('r/', '')).join('+')}`
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
  const [sortVisits, setSortVisits] = useState(-1)
  const [sortDateAdded, setSortDateAdded] = useState(0)
  const now = Date.now()
  const favs = [
    ...favorites
      .filter(f => !isUserSubreddit(f.name))
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())),
    ...favorites
      .filter(f => isUserSubreddit(f.name))
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())),
  ]
    .map(f => ({ ...f, dateAdded: new Date(f.dateAdded) }))
    .sort((a, b) => (a.visitedCount - b.visitedCount) * sortVisits)
    .sort((a, b) => (+a.dateAdded - +b.dateAdded) * sortDateAdded)
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
            <thead>
              <tr>
                <th>Name</th>
                <th className="whitespace-nowrap">
                  <Button
                    onClick={() => {
                      setSortDateAdded(0)
                      if (sortVisits === 0) {
                        setSortVisits(-1)
                      } else if (sortVisits === -1) {
                        setSortVisits(1)
                      } else {
                        setSortVisits(0)
                      }
                    }}
                  >
                    # Visits{' '}
                    {sortVisits === 1 ? (
                      <FaChevronUp className="inline" />
                    ) : sortVisits === -1 ? (
                      <FaChevronDown className="inline" />
                    ) : null}
                  </Button>
                </th>
                <th className="whitespace-nowrap">
                  <Button
                    onClick={() => {
                      setSortVisits(0)
                      if (sortDateAdded === 0) {
                        setSortDateAdded(-1)
                      } else if (sortDateAdded === -1) {
                        setSortDateAdded(1)
                      } else {
                        setSortDateAdded(0)
                      }
                    }}
                  >
                    Date added{' '}
                    {sortDateAdded === 1 ? (
                      <FaChevronUp className="inline" />
                    ) : sortDateAdded === -1 ? (
                      <FaChevronDown className="inline" />
                    ) : null}
                  </Button>
                </th>
                <th className="whitespace-nowrap">Add to multi</th>
              </tr>
            </thead>
            <tbody>
              {favs.map(f => (
                <tr key={f.name}>
                  <td className="whitespace-nowrap">
                    <Button
                      onClick={() => {
                        store.setVal(f.name)
                      }}
                    >
                      {normalizeForDisplay(f.name)}
                    </Button>
                  </td>
                  <td>{f.visitedCount}</td>
                  <td>
                    {formatDistance(f.dateAdded, now, { addSuffix: true })}
                  </td>
                  <td>
                    {multi.includes(normalizeSubreddit(f.name)) ? null : (
                      <Button
                        disabled={multi.includes(normalizeSubreddit(f.name))}
                        onClick={() => {
                          setMulti([...multi, normalizeSubreddit(f.name)])
                        }}
                      >
                        <FaCartShopping className="inline" />
                      </Button>
                    )}
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

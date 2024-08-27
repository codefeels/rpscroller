import { isUserSubreddit, normalizeForDisplay, useAppStore } from './store'

import { formatDistance } from 'date-fns'
import { IoMdHome } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import { useDialogShown } from './util'
import { useEffect, useRef, useState } from 'react'
import { FaChevronUp } from 'react-icons/fa6'
import { FaChevronDown } from 'react-icons/fa6'
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
  const [sortVisits, setSortVisits] = useState(0)
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
    <dialog ref={ref}>
      <div ref={ref2} className="lg:m-10">
        <h4>Favorites</h4>
        {favorites.length === 0 ? (
          <div>No favorites</div>
        ) : (
          <div className="overflow-auto">
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
                  <th className="whitespace-nowrap">Delete</th>
                  <th className="whitespace-nowrap">Home</th>
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
                      <Button
                        onClick={() => {
                          store.removeFavorite(f.name)
                        }}
                      >
                        <MdDelete className="inline" />
                      </Button>
                    </td>

                    <td>
                      <Button
                        onClick={() => {
                          store.setDefaultPage(f.name)
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
        )}
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

import { useState } from 'react'
import { formatDistance } from 'date-fns'
import { IoMdHome } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import { FaChevronUp } from 'react-icons/fa6'
import { FaChevronDown } from 'react-icons/fa6'
import { type Favorite, normalizeForDisplay, useAppStore } from './store'
import Button from './Button'
import BaseDialog from './BaseDialog'

export default function Favorites({
  open,
  setOpen,
  favorites,
}: {
  open: boolean
  setOpen: (arg: boolean) => void
  favorites: Favorite[]
}) {
  const store = useAppStore()
  const [sortVisits, setSortVisits] = useState(-1)
  const [sortDateAdded, setSortDateAdded] = useState(0)
  const now = Date.now()
  const favs = [...favorites]
    .map(f => ({ ...f, dateAdded: new Date(f.dateAdded) }))
    .sort((a, b) => (a.visitedCount - b.visitedCount) * sortVisits)
    .sort((a, b) => (+a.dateAdded - +b.dateAdded) * sortDateAdded)
  return (
    <BaseDialog open={open} setOpen={setOpen}>
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
    </BaseDialog>
  )
}

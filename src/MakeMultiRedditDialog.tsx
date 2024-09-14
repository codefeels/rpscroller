import { useState } from 'react'
import {
  isUserSubreddit,
  normalizeForDisplay,
  normalizeSubreddit,
  useAppStore,
} from './store'

import { formatDistanceToNowStrict } from 'date-fns'
// icons
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
// components
import Button from './Button'
import BaseDialog from './BaseDialog'

export default function MakeMultiRedditDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const store = useAppStore()
  const { favorites } = store
  const [multi, setMulti] = useState<string[]>([])
  const [sortVisits, setSortVisits] = useState(-1)
  const [sortDateAdded, setSortDateAdded] = useState(0)
  const [listName, setListName] = useState('')
  const [creatingList, setCreatingList] = useState(true)
  const multiVal = `/r/${multi.map(s => s.replace('user/', 'u_').replace('r/', '')).join('+')}`
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
    <BaseDialog open={open} onClose={onClose}>
      {creatingList ? (
        <div>
          <h4>
            Make multi-reddit
            <div>
              <div>
                <input id="multireddit" readOnly type="text" value={multiVal} />
                <Button
                  onClick={() => {
                    setCreatingList(false)
                  }}
                >
                  Create list
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
                </tr>
              </thead>
              <tbody>
                {favs.map(f => (
                  <tr key={f.name}>
                    <td className="whitespace-nowrap">
                      <Button
                        onClick={() => {
                          if (!multi.includes(normalizeSubreddit(f.name))) {
                            setMulti([...multi, normalizeSubreddit(f.name)])
                          }
                        }}
                      >
                        {normalizeForDisplay(f.name)}
                      </Button>
                    </td>
                    <td>{f.visitedCount}</td>
                    <td>
                      {formatDistanceToNowStrict(f.dateAdded, {
                        addSuffix: true,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="m-8">
          <form
            onSubmit={event => {
              event.preventDefault()
              if (listName) {
                store.addList(multiVal, listName)
                onClose()
              }
            }}
          >
            <div>
              <label htmlFor="listname">List name:</label>
              <input
                autoFocus
                id="listname"
                type="text"
                value={listName}
                onChange={event => {
                  setListName(event.target.value)
                }}
              />
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      )}
    </BaseDialog>
  )
}

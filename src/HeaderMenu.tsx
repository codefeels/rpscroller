// icons
import { FaShoppingCart } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { IoIosSettings } from 'react-icons/io'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'
import { MdBlock } from 'react-icons/md'
import { FaSave } from 'react-icons/fa'

import Link from './Link'
import MenuItem from './MenuItem'
import SearchBox from './SearchBox'
import { isUserSubreddit, normalizeForDisplay, useAppStore } from './store'
import Button from './Button'
import type { DialogTypes } from './Header'

export default function HeaderMenu({
  setCurrentlyOpen,
}: {
  setCurrentlyOpen: (arg: DialogTypes) => void
}) {
  const store = useAppStore()
  const {
    showMostVisitedSubreddits,
    showMostVisitedUsers,
    showRecentlyVisited,
    showLists,
    lists,
    favorites,
    recentlyVisited,
  } = store

  return (
    <div
      className="absolute left-0 z-10 m-1 p-1 origin-top-right rounded-md shadow-lg focus:outline-none bg-white dark:bg-black max-h-screen overflow-auto"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      <div className="max-w-3xl ">
        <div>
          <SearchBox />
        </div>
        <MenuItem
          onClick={() => {
            setCurrentlyOpen('settings')
          }}
        >
          <IoIosSettings className="inline" /> Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            setCurrentlyOpen('favoriteSubreddits')
          }}
        >
          <MdFavorite className="inline" /> Fav subreddits
        </MenuItem>
        <MenuItem
          onClick={() => {
            setCurrentlyOpen('favoriteUsers')
          }}
        >
          <MdFavorite className="inline" /> Fav users
        </MenuItem>
        <MenuItem
          onClick={() => {
            store.setVal('savedposts')
          }}
        >
          <FaSave className="inline" /> Saved posts
        </MenuItem>
        <MenuItem
          onClick={() => {
            setCurrentlyOpen('multi')
          }}
        >
          <FaShoppingCart className="inline" /> Make list
        </MenuItem>
        <MenuItem
          onClick={() => {
            setCurrentlyOpen('blocked')
          }}
        >
          <MdBlock className="inline" /> Blocked users
        </MenuItem>
        <hr />
        {lists.length > 0 ? (
          <div>
            <div>
              Lists:{' '}
              <Button
                onClick={() => {
                  store.setShowLists(!showLists)
                }}
              >
                {showLists ? (
                  <FaMinus className="inline" />
                ) : (
                  <FaPlus className="inline" />
                )}
              </Button>
            </div>
            {showLists
              ? lists.map(l => (
                  <MenuItem
                    key={l.name}
                    onClick={() => {
                      store.setVal(l.val)
                    }}
                  >
                    - {l.name}{' '}
                    <Button
                      onClick={() => {
                        store.removeList(l.name)
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </MenuItem>
                ))
              : null}
          </div>
        ) : null}
        <hr />
        <div>
          Most visited subreddits:{' '}
          <Button
            onClick={() => {
              store.setShowMostVisitedSubreddits(!showMostVisitedSubreddits)
            }}
          >
            {showMostVisitedSubreddits ? (
              <FaMinus className="inline" />
            ) : (
              <FaPlus className="inline" />
            )}
          </Button>
        </div>
        {showMostVisitedSubreddits
          ? favorites
              .filter(f => !isUserSubreddit(f.name))
              .sort((a, b) => b.visitedCount - a.visitedCount)
              .slice(0, 5)
              .map(l => (
                <MenuItem
                  key={l.name}
                  onClick={() => {
                    store.setVal(l.name)
                  }}
                >
                  - {normalizeForDisplay(l.name)} ({l.visitedCount})
                </MenuItem>
              ))
          : null}
        <hr />
        <div>
          Most visited users:{' '}
          <Button
            onClick={() => {
              store.setShowMostVisitedUsers(!showMostVisitedUsers)
            }}
          >
            {showMostVisitedUsers ? (
              <FaMinus className="inline" />
            ) : (
              <FaPlus className="inline" />
            )}
          </Button>
        </div>
        {showMostVisitedUsers
          ? favorites
              .filter(f => isUserSubreddit(f.name))
              .sort((a, b) => b.visitedCount - a.visitedCount)
              .slice(0, 5)
              .map(l => (
                <MenuItem
                  key={l.name}
                  onClick={() => {
                    store.setVal(l.name)
                  }}
                >
                  - {normalizeForDisplay(l.name)} ({l.visitedCount})
                </MenuItem>
              ))
          : null}
        <hr />
        <div>
          Recently visited:
          <Button
            onClick={() => {
              store.setShowRecentlyVisited(!showRecentlyVisited)
            }}
          >
            {showRecentlyVisited ? (
              <FaMinus className="inline" />
            ) : (
              <FaPlus className="inline" />
            )}
          </Button>
        </div>
        {showRecentlyVisited ? (
          <div>
            {recentlyVisited
              .filter(f => f !== 'savedposts')
              .map(l => (
                <MenuItem
                  key={l}
                  onClick={() => {
                    store.setVal(l)
                  }}
                >
                  - {normalizeForDisplay(l)}
                </MenuItem>
              ))}
            <Button
              onClick={() => {
                store.clearRecentlyVisited()
              }}
            >
              Clear
            </Button>
          </div>
        ) : null}

        <hr />

        <div>
          <Link
            href="https://github.com/codefeels/rpscroller/"
            target="_blank"
            rel="noreferrer"
          >
            Source code/about
          </Link>
        </div>
      </div>
    </div>
  )
}

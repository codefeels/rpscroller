// icons
import { IoIosSettings } from 'react-icons/io'
import { MdBlock, MdFavorite } from 'react-icons/md'
import {
  FaSave,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaTrash,
} from 'react-icons/fa'

// store
import { isUserSubreddit, normalizeForDisplay, useAppStore } from './store'

// components
import MenuItem from './MenuItem'
import SearchBox from './SearchBox'
import Button from './Button'
import Sorts from './Sorts'

// utils
import type { DialogTypes } from './HeaderHamburger'
import HeaderMenuWrapper from './HeaderMenuWrapper'

export default function HeaderMenu({
  setOpen,
}: {
  setOpen: (arg: DialogTypes) => void
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
    <HeaderMenuWrapper
      open
      onClose={() => {
        setOpen(undefined)
      }}
    >
      <div className="max-w-3xl ">
        <SearchBox />
        <Sorts />
        <MenuItem
          onClick={() => {
            setOpen('settings')
          }}
        >
          <IoIosSettings className="inline" /> Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpen('favoriteSubreddits')
          }}
        >
          <MdFavorite className="inline" /> Fav subs
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpen('favoriteUsers')
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
            setOpen('multi')
          }}
        >
          <FaShoppingCart className="inline" /> Make list
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpen('blocked')
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
          Most visited (fav&apos;d) subreddits:{' '}
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
          Most visited (fav&apos;d) users:{' '}
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

        <MenuItem
          onClick={() => {
            setOpen('about')
          }}
        >
          About
        </MenuItem>
      </div>
    </HeaderMenuWrapper>
  )
}

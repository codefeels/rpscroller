import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { cmp, updateRecentlyVisitedList } from './storeUtils'
import {
  hasFavorite,
  maybeNormalizeSubreddit,
  normalizeSubreddit,
} from './util'

import type { AppState } from './storeInterface'
import type { Feed } from './util'

// Parse initial values from hash URL if available
const getInitialValues = () => {
  // Get the hash path without the leading # and /
  const hashPath = window.location.hash.slice(2) || ''
  const searchParams = new URLSearchParams(window.location.search)

  // Extract path and search params
  const pathParts = hashPath.split('?')
  const path = pathParts[0]

  // If we have search params in the hash, parse them
  if (pathParts.length > 1) {
    const hashParams = new URLSearchParams(pathParts[1])
    // Merge hash params into search params (hash params take precedence)
    for (const [key, value] of hashParams.entries()) {
      searchParams.set(key, value)
    }
  }

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const mode = searchParams.get('mode') || 'hot'
  const val = path || searchParams.get('val')

  return { mode, val }
}

const { mode, val } = getInitialValues()
const filterSet = new Set(['val'])

export const settingsMap = {
  noGifs: {
    smallScreensOnly: false,
    title: 'No gifs (the slow, old file format)',
    callback: (f: boolean, store: AppState) => {
      store.setNoGifs(f)
    },
  },
  redGifsOnly: {
    smallScreensOnly: false,
    title: 'RedGifs only',
    callback: (f: boolean, store: AppState) => {
      store.setRedGifsOnly(f)
    },
  },
  noRedGifs: {
    smallScreensOnly: false,
    title: 'No RedGifs',
    callback: (f: boolean, store: AppState) => {
      store.setNoRedGifs(f)
    },
  },
  hideButtons: {
    smallScreensOnly: false,
    title: 'Hide card Buttons',
    callback: (f: boolean, store: AppState) => {
      store.setHideButtons(f)
    },
  },
  dedupe: {
    smallScreensOnly: false,
    title: 'De-duplicate posts',
    callback: (f: boolean, store: AppState) => {
      store.setDedupe(f)
    },
  },
  skipPinned: {
    smallScreensOnly: false,
    title: 'Skip pinned posts',
    callback: (f: boolean, store: AppState) => {
      store.setSkipPinned(f)
    },
  },
  fullscreen: {
    smallScreensOnly: false,
    title: 'Fullscreen',
    callback: (f: boolean, store: AppState) => {
      store.setFullscreen(f)
    },
  },
  headerOnBottomOfScreen: {
    smallScreensOnly: true,
    title: 'Put header on bottom of screen (mobile only)',
    callback: (f: boolean, store: AppState) => {
      store.setHeaderOnBottomOfScreen(f)
    },
  },
} as const

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      smallScreen: false,
      blocked: [],
      currentlyOpenDialog: undefined,
      sidebarOpen: true,
      isFullscreen: true,
      defaultPage: 'r/funny',
      noGifs: true,
      feeds: [],
      headerOnBottomOfScreen: false,
      recentlyVisited: [],
      fullscreen: true,
      rerenderCount: 0,
      redGifsOnly: false,
      noRedGifs: false,
      hideButtons: false,
      skipPinned: false,
      dedupe: false,
      confirmed: false,
      mode,
      val: `${val}`,
      favorites: [],
      setSmallScreen: arg => {
        set(() => ({ smallScreen: arg }))
      },
      setCurrentlyOpenDialog: arg => {
        set(() => ({ currentlyOpenDialog: arg }))
      },
      setSidebarOpen: arg => {
        set(() => ({ sidebarOpen: arg }))
      },
      toggleSidebarOpen: () => {
        set(state => ({ sidebarOpen: !state.sidebarOpen }))
      },
      setIsFullscreen: arg => {
        set(() => ({ isFullscreen: arg }))
      },
      setHeaderOnBottomOfScreen: arg => {
        set(() => ({ headerOnBottomOfScreen: arg }))
      },
      forceRerender: () => {
        set(state => ({ rerenderCount: state.rerenderCount + 1 }))
      },
      createFeed: ({
        subreddits,
        feedName,
      }: {
        subreddits: string[]
        feedName: string
      }) => {
        set(state => ({
          feeds: [
            ...state.feeds,
            {
              name: feedName,
              subreddits,
            },
          ],
        }))
      },

      updateFeed: ({
        feedName,
        newFeed,
      }: {
        feedName: string
        newFeed: Feed
      }) => {
        set(state => ({
          feeds: state.feeds.map(feed =>
            feed.name === feedName ? newFeed : feed,
          ),
        }))
      },

      addToFeed: ({
        subreddit,
        feedName,
      }: {
        subreddit: string
        feedName: string
      }) => {
        set(state => ({
          feeds: state.feeds.map(feed =>
            feed.name === feedName
              ? { ...feed, subreddits: [...feed.subreddits, subreddit] }
              : feed,
          ),
        }))
      },
      removeFromRecentlyVisited: (name: string) => {
        set(state => ({
          recentlyVisited: state.recentlyVisited.filter(
            item => !cmp(item.name, name),
          ),
        }))
      },
      removeFeed: (name: string) => {
        set(state => ({
          feeds: state.feeds.filter(feed => feed.name !== name),
        }))
      },
      clearRecentlyVisited: () => {
        set(() => ({
          recentlyVisited: [],
        }))
      },
      setBlocked: user => {
        set(state => ({
          blocked: [...new Set([...state.blocked, user])],
        }))
      },
      removeBlocked: user => {
        set(state => ({
          blocked: state.blocked.filter(f => f !== user),
        }))
      },
      setConfirmed: flag => {
        set(() => ({
          confirmed: flag,
        }))
      },
      setNoGifs: flag => {
        set(() => ({
          noGifs: flag,
        }))
      },
      setDedupe: flag => {
        set(() => ({
          dedupe: flag,
        }))
      },
      setFullscreen: flag => {
        set(() => ({
          fullscreen: flag,
        }))
      },
      setSkipPinned: flag => {
        set(() => ({
          skipPinned: flag,
        }))
      },
      setHideButtons: flag => {
        set(() => ({
          hideButtons: flag,
        }))
      },
      setRedGifsOnly: flag => {
        set(() => ({
          redGifsOnly: flag,
        }))
      },
      setNoRedGifs: flag => {
        set(() => ({
          noRedGifs: flag,
        }))
      },
      setMode: mode => {
        set(() => ({
          mode,
        }))
      },
      setDefaultPage: defaultPage => {
        set(() => ({
          defaultPage,
        }))
      },
      setVal: newVal => {
        const newValNormalized = maybeNormalizeSubreddit(newVal)
        set(state => {
          const { val, feeds, recentlyVisited } = state
          const feedPaths = new Set(
            feeds.map(f => `r/${f.subreddits.join('+')}`),
          )

          if (!newValNormalized) {
            return {
              val: undefined,
              sidebarOpen: state.smallScreen ? false : state.sidebarOpen,
            }
          }

          const isChanging = !cmp(newValNormalized, val)

          // Update state with new value
          return {
            val: newValNormalized,
            mode: 'hot',
            sidebarOpen: state.smallScreen ? false : state.sidebarOpen,

            // Update recently visited list
            recentlyVisited:
              isChanging && !feedPaths.has(newValNormalized)
                ? updateRecentlyVisitedList(recentlyVisited, newValNormalized)
                : recentlyVisited,
          }
        })
      },
      addFavorite: newFav => {
        const newFavNormalized = normalizeSubreddit(newFav)
        set(state => {
          // Skip if already in favorites
          return hasFavorite(newFavNormalized, state.favorites)
            ? {
                favorites: state.favorites,
              }
            : {
                favorites: [
                  ...state.favorites,
                  {
                    name: newFavNormalized,
                  },
                ],
              }
        })
      },
      removeFavorite: val => {
        set(state => ({
          favorites: state.favorites.filter(
            favorite => !cmp(favorite.name, val),
          ),
        }))
      },
    }),
    {
      name: 'settings',
      partialize: state =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !filterSet.has(key)),
        ),
      onRehydrateStorage: () => {
        return state => {
          if (state) {
            // Use URL param value, fallback to default page, or empty string
            state.val = val ?? state.defaultPage

            // Handle migration from old format (string array) to new format
            // (RecentlyVisited[])

            state.recentlyVisited =
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              state.recentlyVisited?.map(item => ({
                ...item,
                lastVisited: new Date(item.lastVisited),
                dateAdded: new Date(item.dateAdded),
              })) || []

            state.favorites =
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              state.favorites?.map(item => ({
                ...item,
              })) || []
          }
        }
      },
    },
  ),
)

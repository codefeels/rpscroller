import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import {
  type Favorite,
  type Feed,
  type RecentlyVisited,
  hasFavorite,
  maybeNormalizeSubreddit,
  normalizeForComparison,
  normalizeSubreddit,
} from './util'

function cmp(r1: string, r2: string) {
  return normalizeForComparison(r1) === normalizeForComparison(r2)
}

const MAX_RECENTLY_VISITED = 20

interface AppState {
  rerenderCount: number
  smallScreen: boolean
  noGifs: boolean
  redGifsOnly: boolean
  sidebarOpen: boolean
  blocked: string[]
  fullscreen: boolean
  showMoreRecentlyVisited: boolean
  showMoreMostVisitedUsers: boolean
  showMoreMostVisitedSubreddits: boolean
  defaultPage: string
  feeds: Feed[]
  showFeeds: boolean
  isFullscreen: boolean
  showMostVisitedUsers: boolean
  showMostVisitedSubreddits: boolean
  showRecentlyVisited: boolean
  headerOnBottomOfScreen: boolean
  recentlyVisited: RecentlyVisited[]
  mode: string
  favorites: Favorite[]
  val: string
  skipPinned: boolean
  dedupe: boolean
  hideButtons: boolean
  confirmed: boolean
  currentlyOpenDialog: string | undefined

  setSmallScreen: (arg: boolean) => void
  setShowMoreRecentlyVisited: (arg: boolean) => void
  setShowMoreMostVisitedSubreddits: (arg: boolean) => void
  setShowMoreMostVisitedUsers: (arg: boolean) => void
  setCurrentlyOpenDialog: (arg: string | undefined) => void
  setSidebarOpen: (arg: boolean) => void
  toggleSidebarOpen: () => void

  // detect if something has put the app into fullscreen e.g. redgifs
  setIsFullscreen: (arg: boolean) => void

  // feeds
  createFeed: (arg: { subreddits: string[]; feedName: string }) => void
  updateFeed: (arg: { newFeed: Feed; feedName: string }) => void
  addToFeed: (arg: { subreddit: string; feedName: string }) => void
  removeFeed: (name: string) => void

  // blocks
  setBlocked: (arg: string) => void
  removeBlocked: (arg: string) => void

  // recently visited
  clearRecentlyVisited: () => void
  removeFromRecentlyVisited: (arg: string) => void

  forceRerender: () => void
  setHeaderOnBottomOfScreen: (arg: boolean) => void
  setDefaultPage: (arg: string) => void
  setHideButtons: (arg: boolean) => void
  setConfirmed: (arg: boolean) => void
  setDedupe: (arg: boolean) => void
  setShowMostVisitedUsers: (arg: boolean) => void
  setShowMostVisitedSubreddits: (arg: boolean) => void
  setShowRecentlyVisited: (arg: boolean) => void
  setShowFeeds: (arg: boolean) => void
  setNoGifs: (arg: boolean) => void
  setSkipPinned: (arg: boolean) => void
  setFullscreen: (arg: boolean) => void
  setRedGifsOnly: (arg: boolean) => void
  setMode: (arg?: string) => void
  setVal: (arg?: string) => void

  // favorites
  addFavorite: (arg: string) => void
  removeFavorite: (arg: string) => void
}

const params = new URLSearchParams(window.location.search)

// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
const mode = params.get('mode') || 'hot'
const val = params.get('val')
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
      showMoreRecentlyVisited: false,
      showMoreMostVisitedSubreddits: false,
      showMoreMostVisitedUsers: false,
      sidebarOpen: false,
      isFullscreen: false,
      defaultPage: '/r/funny',
      noGifs: true,
      feeds: [],
      headerOnBottomOfScreen: false,
      recentlyVisited: [],
      bottomOfScreen: false,
      fullscreen: false,
      rerenderCount: 0,
      showFeeds: true,
      showMostVisitedUsers: false,
      showMostVisitedSubreddits: false,
      showRecentlyVisited: false,
      redGifsOnly: false,
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
      setShowMostVisitedUsers: arg => {
        set(() => ({ showMostVisitedUsers: arg }))
      },
      setShowMostVisitedSubreddits: arg => {
        set(() => ({ showMostVisitedSubreddits: arg }))
      },
      setShowFeeds: arg => {
        set(() => ({ showFeeds: arg }))
      },
      setShowRecentlyVisited: arg => {
        set(() => ({ showRecentlyVisited: arg }))
      },
      setShowMoreRecentlyVisited: arg => {
        set(() => ({ showMoreRecentlyVisited: arg }))
      },
      setShowMoreMostVisitedUsers: arg => {
        set(() => ({ showMoreMostVisitedUsers: arg }))
      },
      setShowMoreMostVisitedSubreddits: arg => {
        set(() => ({ showMoreMostVisitedSubreddits: arg }))
      },
      createFeed: ({
        subreddits,
        feedName,
      }: {
        subreddits: string[]
        feedName: string
      }) => {
        set(state => ({
          feeds: [...state.feeds, { name: feedName, subreddits }],
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
          recentlyVisited: state.recentlyVisited.filter(f => f.name !== name),
        }))
      },
      removeFeed: (name: string) => {
        set(state => ({
          feeds: state.feeds.filter(f => f.name !== name),
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
          const { val, feeds, favorites, recentlyVisited } = state
          const set = new Set(feeds.map(f => `r/${f.subreddits.join('+')}`))

          if (newValNormalized) {
            const isChanging = !cmp(newValNormalized, val)
            const old = recentlyVisited.find(f => cmp(f.name, newValNormalized))
            return {
              val: newValNormalized,
              mode: 'hot',
              sidebarOpen: state.smallScreen ? false : state.sidebarOpen,
              favorites: favorites.map(favorite => ({
                ...favorite,
                visitedCount:
                  cmp(newValNormalized, favorite.name) && isChanging
                    ? favorite.visitedCount + 1
                    : favorite.visitedCount,
                lastVisited: new Date(),
              })),
              recentlyVisited:
                set.has(newValNormalized) || !isChanging
                  ? recentlyVisited
                  : [
                      {
                        ...old,
                        name: newValNormalized,
                        lastVisited: new Date(),
                        dateAdded: old?.dateAdded ?? new Date(),
                        visitedCount: (old?.visitedCount ?? 0) + 1,
                      },
                      ...recentlyVisited
                        .slice(
                          recentlyVisited.length > MAX_RECENTLY_VISITED ? 1 : 0,
                        )
                        .filter(f => f.name !== newValNormalized),
                    ],
            }
          } else {
            return {
              val: undefined,
              sidebarOpen: state.smallScreen ? false : state.sidebarOpen,
            }
          }
        })
      },
      addFavorite: newFav => {
        const newFavNormalized = normalizeSubreddit(newFav)
        set(state => ({
          favorites: hasFavorite(newFavNormalized, state.favorites)
            ? state.favorites
            : [
                ...state.favorites,
                {
                  name: newFavNormalized,
                  visitedCount: 0,
                  dateAdded: new Date(),
                  lastVisited: new Date(),
                },
              ],
        }))
      },
      removeFavorite: val => {
        set(state => ({
          favorites: state.favorites.filter(f => f.name !== val),
        }))
      },
    }),
    {
      name: 'settings',
      partialize: state => {
        return Object.fromEntries(
          Object.entries(state).filter(([key]) => !filterSet.has(key)),
        )
      },
      onRehydrateStorage: () => {
        return state => {
          if (state) {
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            state.val = val || state.defaultPage || ''
            // @ts-expect-error old mapover
            state.recentlyVisited =
              typeof state.recentlyVisited[0] === 'string'
                ? state.recentlyVisited.map(s => ({
                    name: s,
                    visitedCount: 1,
                    lastVisited: new Date(),
                    dateAdded: new Date(),
                  }))
                : state.recentlyVisited
          }
        }
      },
    },
  ),
)

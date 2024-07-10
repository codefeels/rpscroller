import { create } from 'zustand'
import queryString from 'query-string'

interface AppState {
  noGifs: boolean
  fullscreen: boolean
  redGifsOnly: boolean
  page?: string
  favorites: string[]
  val: string
  hideButtons: boolean
  confirmed: boolean
  setHideButtons: (arg: boolean) => void
  setFullscreen: (arg: boolean) => void
  setConfirmed: (arg: boolean) => void
  setNoGifs: (arg: boolean) => void
  setRedGifsOnly: (arg: boolean) => void
  setPage: (arg?: string) => void
  setVal: (arg?: string) => void
  addFavorite: (arg: string) => void
  removeFavorite: (arg: string) => void
}

const { val = '/r/gonemild' } = queryString.parse(window.location.search)

export function getBool(key: string, def = false) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(def))
  } catch (e) {
    console.error(e)
    return def
  }
}

export function setBool(key: string, val: boolean) {
  localStorage.setItem(key, JSON.stringify(val))
}

export function getStringArray(key: string, def = [] as string[]) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(def))
  } catch (e) {
    console.error(e)
    return def
  }
}

export function setString(key: string, val: string) {
  return localStorage.setItem(key, val)
}

export const useAppStore = create<AppState>()(set => ({
  noGifs: getBool('noGifs'),
  redGifsOnly: getBool('redGifsOnly'),
  fullscreen: getBool('fullscreen'),
  hideButtons: getBool('hideButtons'),
  confirmed: getBool('confirmed'),
  page: undefined as string | undefined,
  val: val as string,
  favorites: getStringArray('favorites', [
    'r/funny',
    'r/midriff+gonemild',
    'r/gonewild',
  ]),
  setFullscreen: flag => set(() => ({ fullscreen: flag })),
  setConfirmed: flag => set(() => ({ confirmed: flag })),
  setNoGifs: flag => set(() => ({ noGifs: flag })),
  setHideButtons: flag => set(() => ({ hideButtons: flag })),
  setRedGifsOnly: flag => set(() => ({ redGifsOnly: flag })),
  setPage: page => set(() => ({ page })),
  setVal: val => {
    const s = val?.replace('u/', 'user/')
    return set(() => ({ val: s }))
  },
  addFavorite: val => {
    const s = val.replace('u/', 'user/')
    return set(state => ({
      favorites: state.favorites.includes(s)
        ? state.favorites
        : [...state.favorites, s],
    }))
  },
  removeFavorite: val =>
    set(state => ({ favorites: state.favorites.filter(f => f !== val) })),
}))

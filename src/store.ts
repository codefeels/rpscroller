import { create } from 'zustand'
import queryString from 'query-string'

interface AppState {
  noGifs: boolean
  fullscreen: boolean
  redGifsOnly: boolean
  page?: string
  favorites: string[]
  darkmode: boolean
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
  setDarkmode: (arg: boolean) => void
  addFavorite: (arg: string) => void
  removeFavorite: (arg: string) => void
}

const { val = '/r/gonemild' } = queryString.parse(window.location.search)

export function getBool(key: string, def = false) {
  return JSON.parse(localStorage.getItem(key) || JSON.stringify(def))
}

export function setBool(key: string, val: boolean) {
  localStorage.setItem(key, JSON.stringify(val))
}

export function getString(key: string, def = '') {
  return localStorage.getItem(key) || def
}

export function setString(key: string, val: string) {
  return localStorage.setItem(key, val)
}

export const useAppStore = create<AppState>()(set => ({
  noGifs: getBool('noGifs'),
  redGifsOnly: getBool('redGifsOnly'),
  darkmode: getBool('darkmode'),
  fullscreen: getBool('fullscreen'),
  hideButtons: getBool('hideButtons'),
  confirmed: getBool('confirmed'),
  page: undefined as string | undefined,
  val: val as string,
  favorites: JSON.parse(
    getString('favorites', '["r/funny","r/midriff+gonemild","r/gonewild"]'),
  ),
  setFullscreen: flag => set(() => ({ fullscreen: flag })),
  setConfirmed: flag => set(() => ({ confirmed: flag })),
  setDarkmode: flag => set(() => ({ darkmode: flag })),
  setNoGifs: flag => set(() => ({ noGifs: flag })),
  setHideButtons: flag => set(() => ({ hideButtons: flag })),
  setRedGifsOnly: flag => set(() => ({ redGifsOnly: flag })),
  setPage: page => set(() => ({ page })),
  setVal: val => set(() => ({ val })),
  addFavorite: val =>
    set(state => ({
      favorites: state.favorites.includes(val)
        ? state.favorites
        : [...state.favorites, val],
    })),
  removeFavorite: val =>
    set(state => ({ favorites: state.favorites.filter(f => f !== val) })),
}))

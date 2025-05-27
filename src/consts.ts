export const sortModes = {
  recentlyVisited: 'Sort by recently visited',
  visitedCount: 'Sort by most visited',
}
export const filterModes = {
  all: 'All',
  noNsfw: 'No NSFW',
  nsfw: 'NSFW',
}

export type SortTypes = 'recentlyVisited' | 'visitedCount'
export type FilterTypes = 'all' | 'nsfw' | 'noNsfw'

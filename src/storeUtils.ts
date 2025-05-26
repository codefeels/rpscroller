import { normalizeForComparison } from './util'

import type { RecentlyVisited } from './util'

/**
 * Compare two subreddit strings for equality after normalization
 */
export function cmp(r1: string, r2: string) {
  return normalizeForComparison(r1) === normalizeForComparison(r2)
}

/**
 * Update a recently visited item or create a new one
 */
export function updateRecentlyVisitedItem(
  existingItem: RecentlyVisited | undefined,
  name: string,
): RecentlyVisited {
  return {
    name,
    lastVisited: new Date(),
    dateAdded: existingItem?.dateAdded ?? new Date(),
    visitedCount: (existingItem?.visitedCount ?? 0) + 1,
  }
}

/**
 * Update the recently visited list with a new visit
 */
export function updateRecentlyVisitedList(
  currentList: RecentlyVisited[],
  newVal: string,
): RecentlyVisited[] {
  const existingItem = currentList.find(item => cmp(item.name, newVal))

  const updatedItem = updateRecentlyVisitedItem(existingItem, newVal)

  // Filter out the existing item (if any) and ensure we don't exceed the max size
  const filteredList = currentList.filter(item => !cmp(item.name, newVal))

  // Add the updated item at the beginning
  return [updatedItem, ...filteredList]
}

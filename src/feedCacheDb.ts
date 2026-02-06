import { openDB } from 'idb'

import type { Data } from './util'

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000

const dbPromise = openDB('feedCache', 1, {
  upgrade(db) {
    db.createObjectStore('feeds')
  },
})

export async function getCachedFeed(key: string) {
  const db = await dbPromise
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const entry = await db.get('feeds', key)
  if (entry) {
    return entry as { data: Data[]; timestamp: number }
  }
  return
}

export async function setCachedFeed(key: string, data: Data[]) {
  const db = await dbPromise
  await db.put('feeds', { data, timestamp: Date.now() }, key)
}

export async function cleanupOldFeeds() {
  const db = await dbPromise
  const tx = db.transaction('feeds', 'readwrite')
  const store = tx.objectStore('feeds')
  let cursor = await store.openCursor()
  while (cursor) {
    const entry = cursor.value as { timestamp: number }
    if (Date.now() - entry.timestamp > THIRTY_DAYS_MS) {
      await cursor.delete()
    }
    cursor = await cursor.continue()
  }
  await tx.done
}

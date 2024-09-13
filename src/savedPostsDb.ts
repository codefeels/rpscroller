import { openDB } from 'idb'

const db = await openDB('test', 2, {
  upgrade(db) {
    db.createObjectStore('savedPosts')
  },
})

export { db }

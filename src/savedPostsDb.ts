import { openDB } from 'idb'

const dbPromise = openDB('test', 2, {
  upgrade(db) {
    db.createObjectStore('savedPosts')
  },
})

export { dbPromise }

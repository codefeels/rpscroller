// icons
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'

// store
import { useAppStore } from './store'

// components
import MenuItem from './MenuItem'
import Button from './Button'

export default function Lists() {
  const store = useAppStore()
  const { showLists, lists } = store
  return (
    <>
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
                    store.setVal(`/r/${l.subreddits.join('+')}`)
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
    </>
  )
}

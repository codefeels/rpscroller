import { isUserSubreddit, useAppStore } from './store'

import { IoMdHome } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'

export default function Favorites() {
  const store = useAppStore()
  const { favorites } = store
  return (
    <div className="lg:m-10">
      <h4>Favorites</h4>

      <table>
        <tbody>
          {[
            ...favorites
              .filter(f => !isUserSubreddit(f))
              .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
            ...favorites
              .filter(f => isUserSubreddit(f))
              .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
          ].map(f => (
            <tr key={f}>
              <td>
                <button
                  onClick={() => {
                    store.setVal(f)
                  }}
                >
                  {f}
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    store.removeFavorite(f)
                  }}
                >
                  <MdDelete />
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    store.setDefaultPage(f)
                  }}
                >
                  <IoMdHome />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>Legend:</p>
        <div>
          <IoMdHome /> = Set as default page
        </div>
        <div>
          <MdDelete /> = Delete from favorites
        </div>
      </div>
    </div>
  )
}

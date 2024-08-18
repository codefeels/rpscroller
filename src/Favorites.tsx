import { useAppStore } from './store'

import { IoMdHome } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'

export default function Favorites() {
  const store = useAppStore()
  const { favs } = store
  return (
    <div className="lg:m-10">
      <h4>Favorites</h4>

      <table>
        <tbody>
          {favs
            .filter(
              f =>
                !(
                  f.startsWith('/u/') ||
                  f.startsWith('u/') ||
                  f.startsWith('user/') ||
                  f.startsWith('/user/') ||
                  f.startsWith('u_')
                ),
            )
            .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
            .map(f => (
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

          {favs
            .filter(
              f =>
                f.startsWith('/u/') ||
                f.startsWith('u/') ||
                f.startsWith('/user/') ||
                f.startsWith('user/') ||
                f.startsWith('u_'),
            )
            .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
            .map(f => (
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
          <MdDelete /> = Delete from favs
        </div>
      </div>
    </div>
  )
}

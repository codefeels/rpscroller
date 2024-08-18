import { useState } from 'react'
import { useAppStore } from './store'

import { FaCartShopping } from 'react-icons/fa6'

export default function MakeMultiReddit() {
  const store = useAppStore()
  const { favs } = store
  const [multi, setMulti] = useState<string[]>([])
  const multiVal = `/r/${multi.join('+')}`
  return (
    <div className="lg:m-10">
      <h4>
        Make multi-reddit
        <div>
          <div>
            <input id="multireddit" readOnly type="text" value={multiVal} />
            <button
              onClick={() => {
                store.setVal(multiVal)
              }}
            >
              Submit
            </button>
            <button
              onClick={() => {
                setMulti([])
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </h4>
      <>
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
                  <td>{f}</td>
                  <td>
                    <button
                      onClick={() => {
                        setMulti([
                          ...multi,
                          f
                            .replace(/^\//, '')
                            .replace('user/', 'u_')
                            .replace('r/', ''),
                        ])
                      }}
                    >
                      <FaCartShopping />
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
                        setMulti([
                          ...multi,
                          f
                            .replace(/^\//, '')
                            .replace('user/', 'u_')
                            .replace('r/', ''),
                        ])
                      }}
                    >
                      <FaCartShopping />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    </div>
  )
}

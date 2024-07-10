import React, { useState } from 'react'
import { useDialogShown } from './util'
import { data } from './data'

export default function ChoiceDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const ref = useDialogShown(open)
  const rows = useState(
    data.map((row, idx) => ({
      id: idx,
      category: row[0],
      subreddit: row[1],
      subscribers: +row[2],
      description: row[5],
    })),
  ) as any
  return (
    <dialog ref={ref} style={{ maxWidth: 800 }}>
      <table>
        <thead>
          <tr>
            <th>category</th>
            <th>subreddit</th>
            <th>subscribers</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.subreddit}>
              <td>{r.category}</td>
              <td>{r.subreddit}</td>
              <td>{r.subscribers}</td>
              <td>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => onClose()}>submit</button>
    </dialog>
  )
}

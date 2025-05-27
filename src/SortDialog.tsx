import BaseDialog from './BaseDialog'
import RadioCheckbox from './RadioCheckbox'
import { sortModes } from './consts'

import type { SortTypes } from './consts';


export function SortDialog({
  sortMode,
  setSortMode,
  onClose,
}: {
  sortMode: SortTypes
  setSortMode: (arg: SortTypes) => void
  onClose: () => void
}) {
  return (
    <BaseDialog open onClose={() => { onClose(); }}>
      <ul>
        {Object.entries(sortModes).map(([key, val]) => (
          <li key={key}>
            <RadioCheckbox
              id={key}
              checked={key === sortMode}
              label={val}
              onChange={event => {
                if (event.target.checked) {
                  setSortMode(key as SortTypes)
                }
              }}
            />
          </li>
        ))}
      </ul>
    </BaseDialog>
  )
}

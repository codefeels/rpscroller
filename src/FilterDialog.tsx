import BaseDialog from './BaseDialog'
import RadioCheckbox from './RadioCheckbox'
import { filterModes } from './consts'

import type { FilterTypes } from './consts'

export function FilterDialog({
  filterMode,
  setFilterMode,
  onClose,
}: {
  filterMode: FilterTypes
  setFilterMode: (arg: FilterTypes) => void
  onClose: () => void
}) {
  return (
    <BaseDialog
      open
      onClose={() => {
        onClose()
      }}
    >
      <ul>
        {Object.entries(filterModes).map(([key, val]) => (
          <li key={key}>
            <RadioCheckbox
              id={key}
              checked={key === filterMode}
              label={val}
              onChange={event => {
                if (event.target.checked) {
                  setFilterMode(key as FilterTypes)
                }
              }}
            />
          </li>
        ))}
      </ul>
    </BaseDialog>
  )
}

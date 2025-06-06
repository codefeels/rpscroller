import type { ChangeEvent } from 'react'

export default function RadioCheckbox({
  id,
  checked,
  onChange,
  label,
}: {
  id: string
  checked: boolean
  label: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <input
        id={id}
        type="radio"
        checked={checked}
        onChange={onChange}
        className="radio radio-sm mr-2"
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

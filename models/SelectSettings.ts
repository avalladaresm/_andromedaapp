export interface SelectSettings {
  items?: Item[]
  value?: string
  defaultValue?: string
  disabled?: boolean
  label?: string
  isRequired?: boolean
  onChange?: () => void
  onTouch?: () => void
}

interface Item {
  value: string | number
  displayValue: string | number
}
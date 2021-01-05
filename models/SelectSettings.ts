export interface SelectSettings {
  items?: Item[]
  value?: string
  defaultValue?: string
  disabled?: boolean
  label?: string
  onChange?: () => void
}

interface Item {
  value: string | number
  displayValue: string | number
}
import { CancelButton } from './CancelButton'

export interface ModalSettings {
  isShowing?: boolean
  title?: string
  onOk?: () => void
  onCancel?: (onCancel: boolean) => void
  onConfirmCancel?: (onConfirmCancel: boolean) => void
  confirmCancel?: boolean
  isFormDirty?: (value: boolean) => void
  className?: string
}
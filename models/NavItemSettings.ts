import { ReactElement } from 'react';

export interface NavItemSettings {
  title: string
  route?: string
  activePage?: string
  actions?: NavItemSettings[]
  onClick?: () => void
  icon?: ReactElement
  collapsed?: boolean
}

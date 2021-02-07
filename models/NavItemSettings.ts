export interface NavItemSettings {
  title: string
  route?: string
  activePage?: string
  actions?: NavItemSettings[]
  onClick?: () => void
}

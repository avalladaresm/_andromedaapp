import { Color } from "./Color";
import { TextColor } from "./TextColor";

export interface NavItemSettings {
  title: string
  link?: string
  styles?: StyleProps
  activePage?: string
  className?: string
  onClick?: () => void
}

interface StyleProps {
  textColor?: TextColor
  selectedBgColor?: Color
  hoverBgColor?: `hover:${Color}`
  active?: Color
}
import { FC } from 'react'
import { NavItemSettings } from '../../models/NavItemSettings'
import { convertToClassNameAttributes } from '../../utils/utils'

export const NavigationItem: FC<NavItemSettings> = (props) => {

  return (
    <a
      className={`${convertToClassNameAttributes(props.styles)} px-3 py-2 rounded-sm text-sm font-medium cursor-pointer`}
      onClick={props.onClick}
      href={props.link}
    >
      {props.title}
    </a>
  )
}

import { FC } from 'react'
import { NavItemSettings } from '../../models/NavItemSettings'
import { convertToClassNameAttributes } from '../../utils/utils'

export const NavigationItem: FC<NavItemSettings> = (props) => {

  return (
    <a
      className={`
        px-3 py-2 rounded-sm text-sm font-medium cursor-pointer
        ${convertToClassNameAttributes(props.styles)} 
        ${props.activePage?.toLowerCase().includes(props.title?.toLowerCase()) && 'bg-lightBlue-900 shadow-inner'}`
      }
      onClick={props.onClick}
      href={props.link}
    >
      {props.title}
    </a>
  )
}

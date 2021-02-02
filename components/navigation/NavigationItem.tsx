import { FC } from 'react'
import { NavItemSettings } from '../../models/NavItemSettings'

export const NavigationItem: FC<NavItemSettings> = (props) => {

  return (
    <a
      className={`
        px-3 py-2 rounded-sm text-sm font-medium cursor-pointer hover:bg-lightBlue-700 text-gray-50
        ${props.activePage?.toLowerCase().includes(props.title?.toLowerCase()) && 'bg-lightBlue-900 shadow-inner'}`
      }
      onClick={props.onClick}
      href={props.link}
    >
      {props.title}
    </a>
  )
}

import React, { FC } from 'react'
import { NavItemSettings } from '../../models/NavItemSettings'
import { NavigationItemActions } from './NavigationItemActions'

export const NavigationItem: FC<NavItemSettings> = (props) => {

  return (
    <div>
      <li className="items-center">
        <div
          className={`px-3 py-2 rounded-sm text-sm font-medium hover:bg-cyan-800 cursor-pointer text-white 
        ${props.activePage && 'bg-blueGray-700 shadow-inner'}`}
          onClick={props.onClick}
        >
          {props.title}
        </div>
      </li>
      {props.actions?.length > 0 && props.activePage &&
        <NavigationItemActions {...props} />
      }
    </div>
  )
}

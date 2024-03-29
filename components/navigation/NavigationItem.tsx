import React, { FC } from 'react'
import { NavItemSettings } from '../../models/NavItemSettings'
import { NavigationItemActions } from './NavigationItemActions'
import ReactTooltip from 'react-tooltip';

export const NavigationItem: FC<NavItemSettings> = (props) => {

  return (
    <div>
      <li className="items-center">
        <div
          data-tip data-for={props.title}
          className={
            `px-2 sm:px-3 py-2 rounded-sm text-sm font-medium hover:bg-cyan-800 cursor-pointer text-white ${props.activePage && 'bg-blueGray-700 shadow-inner'}`
          }
          onClick={props.onClick}
        >
          <div className={`flex space-x-2 ${props.collapsed && 'justify-center'}`}>
            <div className='self-center'>
              {props.icon}
            </div>
            {!props.collapsed &&
              <div>
                {props.title}
              </div>
            }
          </div>
        </div>
        {
          props.collapsed &&
          <ReactTooltip id={props.title}>
            <span>{props.title}</span>
          </ReactTooltip>
        }
      </li>
      {props.actions?.length > 0 && props.activePage && !props.collapsed &&
        <NavigationItemActions {...props} />
      }
    </div>
  )
}

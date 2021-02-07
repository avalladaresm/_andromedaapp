import { FC } from 'react'
import { NavItemSettings } from '../../models/NavItemSettings'

export const NavigationItemActions: FC<NavItemSettings> = (props) => {

  return (
    <div>
      <ul className="flex flex-col bg-orange-500">
        {props.actions?.map((a, i) => (
          <li key={i} className="items-center">
            <div
              className='pl-8 px-3 py-2 rounded-sm text-sm font-medium hover:bg-cyan-800 cursor-pointer text-white'
              onClick={a.onClick}
            >
              {a.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

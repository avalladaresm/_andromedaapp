import React from 'react'
import { HiMenu } from 'react-icons/hi'
import { useQueryClient } from 'react-query'
import { CurrentUserAuthData } from '../../models/CurrentUserAuthData'
import { useAuth } from '../../services/auth'
import ProfileMenu from '../ProfileMenu'

const Header = (props) => {
  const queryClient = useQueryClient()

  const auth: CurrentUserAuthData = useAuth(queryClient)

  return (
    <div className='fixed bg-blueGray-400 h-12 w-full z-100'>
      <div className='flex align-middle justify-between h-full space-x-3'>
        <div className='flex flex-row space-x-3'>
          {props.isMobile &&
            <div className='flex flex-row space-x-3 p-1'>
              <div className='flex rounded-sm border border-black' onClick={props.onClick}>
                <HiMenu size='2.5em' />
              </div>
              <div className='text-center text-white text-md font-bold p-2 rounded-sm bg-lightBlue-300'>
                app
              </div>
            </div>
          }
        </div>
        <div className='flex flex-row space-x-3 pr-4 py-1 sm:pr-14'>
          <div className='flex text-white text-base items-center justify-center'>
            {`Hello ${auth?.u}`}
          </div>
          <ProfileMenu />
        </div>
      </div>
    </div>
  )
}

export default Header
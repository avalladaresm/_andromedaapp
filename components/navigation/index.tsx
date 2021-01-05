import React, { FC, useState } from 'react'
import NavigationBar from './NavigationBar'
import { NavigationItem } from './NavigationItem'
import { TempLogo } from '../TempLogo'
import { useRouter } from 'next/router'
import ProfileMenu from '../ProfileMenu'
import ActionBar from '../../components/navigation/ActionBar'
import { NavigationSettings } from '../../models/NavigationSettings'

const Navigation: FC<NavigationSettings> = (props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const router = useRouter()

  return (
    <>
      <div className='fixed flex flex-col w-full z-10'>
        <NavigationBar className='grid grid-cols-12 gap-4' backgroundColor='bg-lightBlue-900' height='h-14' spaceXItems='space-x-4' justifyContent='justify-center'>
          <div className='col-start-3 col-span-6 inline-flex space-x-4'>
            <TempLogo onClick={() => router.push('/')} />
            <NavigationItem onClick={() => router.push('/')} title='Dashboard' styles={{ textColor: 'text-gray-50', hoverBgColor: 'hover:bg-lightBlue-700' }} />
            <NavigationItem onClick={() => router.push('/users')} title='Users' styles={{ textColor: 'text-gray-50', hoverBgColor: 'hover:bg-lightBlue-700' }} />
            <NavigationItem onClick={() => router.push('/logs')} title='Logs' styles={{ textColor: 'text-gray-50', hoverBgColor: 'hover:bg-lightBlue-700' }} />
            <NavigationItem title='Inventory' link='#' styles={{ textColor: 'text-gray-50', hoverBgColor: 'hover:bg-lightBlue-700' }} />
            <NavigationItem title='Projects' link='#' styles={{ textColor: 'text-gray-50', hoverBgColor: 'hover:bg-lightBlue-700' }} />
            <NavigationItem onClick={() => setShowNotification(!showNotification)} title='Notification' styles={{ textColor: 'text-gray-50', hoverBgColor: 'hover:bg-lightBlue-700' }} />
            <NavigationItem onClick={() => setLoading(!loading)} title='Trigger load' link='#' styles={{ textColor: 'text-gray-50', hoverBgColor: 'hover:bg-lightBlue-700' }} />
          </div>
          <div className='invisible md:visible col-start-10 col-span-6 inline-flex space-x-4'>
            <ProfileMenu />
          </div>
        </NavigationBar>
        <ActionBar {...props.actionBar} />
      </div>
      <div className='relative top-28 mx-6 border-solid border-coolGray-900 border-2'>
        {props.children}
      </div>
    </>
  )
}

export default Navigation
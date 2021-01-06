import React, { FC, useEffect, useState } from 'react'
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
  const [activePage, setActivePage] = useState<string>('')

  const router = useRouter()

  useEffect(() => {
    setActivePage(router.pathname === '/' ? 'Dashboard' : router.pathname.slice(1,router.pathname.length))
  }, [])

  return (
    <>
      <div className='fixed flex flex-col w-full z-10'>
        <NavigationBar className='grid grid-cols-12 gap-4' backgroundColor='bg-lightBlue-800' height='h-14' spaceXItems='space-x-4' justifyContent='justify-center'>
          <div className='col-start-3 col-span-6 inline-flex space-x-4'>
            <TempLogo onClick={() => router.push('/')} />
            <NavigationItem title='Dashboard' activePage={activePage} onClick={() => router.push('/')} styles={{ textColor: 'text-gray-50', hoverBgColor: 'hover:bg-lightBlue-700' }} />
            <NavigationItem title='Users' activePage={activePage} onClick={() => router.push('/users')} styles={{ textColor: 'text-gray-50', hoverBgColor: 'hover:bg-lightBlue-700' }} />
            <NavigationItem title='Logs' activePage={activePage} onClick={() => router.push('/logs')} styles={{ textColor: 'text-gray-50', hoverBgColor: 'hover:bg-lightBlue-700' }} />
            <NavigationItem title='Inventory' activePage={activePage} link='#' styles={{ textColor: 'text-gray-50', hoverBgColor: 'hover:bg-lightBlue-700' }} />
            <NavigationItem title='Projects' activePage={activePage} link='#' styles={{ textColor: 'text-gray-50', hoverBgColor: 'hover:bg-lightBlue-700' }} />
            <NavigationItem title='Notification' activePage={activePage} onClick={() => setShowNotification(!showNotification)} styles={{ textColor: 'text-gray-50', hoverBgColor: 'hover:bg-lightBlue-700' }} />
            <NavigationItem title='Triggerload' activePage={activePage} onClick={() => setLoading(!loading)} link='#' styles={{ textColor: 'text-gray-50', hoverBgColor: 'hover:bg-lightBlue-700' }} />
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
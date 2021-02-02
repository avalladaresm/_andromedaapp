import React, { FC, useEffect, useState } from 'react'
import NavigationBar from './NavigationBar'
import { NavigationItem } from './NavigationItem'
import { TempLogo } from '../TempLogo'
import { useRouter } from 'next/router'
import ProfileMenu from '../ProfileMenu'
import ActionBar from '../../components/navigation/ActionBar'
import { NavigationSettings } from '../../models/NavigationSettings'
import { CurrentUserAuthData } from '../../models/CurrentUserAuthData'
import { useAuth } from '../../services/auth'
import { useQueryClient } from 'react-query'

const Navigation: FC<NavigationSettings> = (props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [activePage, setActivePage] = useState<string>('')

  const queryClient = useQueryClient()
  const auth: CurrentUserAuthData = useAuth(queryClient)
  const router = useRouter()

  useEffect(() => {
    setActivePage(router.pathname === '/' ? 'Dashboard' : router.pathname.slice(1, router.pathname.length))
  }, [])

  return (
    <>
      <div className='fixed flex flex-col w-full z-10'>
        <NavigationBar className='grid grid-cols-12 gap-4'>
          <div className='col-start-3 col-span-7 inline-flex space-x-4'>
            <TempLogo onClick={() => router.push('/')} />
            <NavigationItem title='Dashboard' activePage={activePage} onClick={() => router.push('/')} />
            <NavigationItem title='Employees' activePage={activePage} onClick={() => router.push('/employees')} />
            {auth?.r === 'SUPREME_LEADER' && <NavigationItem title='Accounts' activePage={activePage} onClick={() => router.push('/accounts')} />}
            {auth?.r === 'SUPREME_LEADER' && <NavigationItem title='Logs' activePage={activePage} onClick={() => router.push('/logs')} />}
            {auth?.r === 'SUPREME_LEADER' && <NavigationItem title='Products' activePage={activePage} onClick={() => router.push('/products')} />}
            {auth?.r === 'SUPREME_LEADER' && <NavigationItem title='Inventory' activePage={activePage} link='#' />}
            {auth?.r === 'SUPREME_LEADER' && <NavigationItem title='Projects' activePage={activePage} link='#' />}
            {auth?.r === 'SUPREME_LEADER' && <NavigationItem title='Notification' activePage={activePage} onClick={() => setShowNotification(!showNotification)} />}
            {auth?.r === 'SUPREME_LEADER' && <NavigationItem title='Triggerload' activePage={activePage} onClick={() => setLoading(!loading)} link='#' />}
          </div>
          <div className='invisible md:visible col-start-10 col-span-6 inline-flex space-x-4'>
            <ProfileMenu />
          </div>
        </NavigationBar>
        <ActionBar {...props.actionBar} />
      </div>
      <div className='p-5 relative top-28 mx-6 border-solid border-coolGray-900 border-2'>
        {props.children}
      </div>
    </>
  )
}

export default Navigation
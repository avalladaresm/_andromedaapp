import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { CurrentUserAuthData } from '../../models/CurrentUserAuthData'
import { useAuth } from '../../services/auth'
import { isUserAuthorizedToViewThisPage } from '../../utils/utils'
import { NavigationItem } from './NavigationItem'
import { MdAccountBox, MdComment, MdDashboard, MdHistory, MdNotificationsActive, MdViewList } from 'react-icons/md'
import { FaBoxes, FaUserPlus, FaUsers, FaWarehouse } from 'react-icons/fa'
import { AiOutlineFundProjectionScreen } from 'react-icons/ai'
import {HiOutlineRefresh} from 'react-icons/hi'

export const NavigationItems = (props) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const auth: CurrentUserAuthData = useAuth(queryClient)

  const options = [
    {
      title: 'Dashboard',
      route: '/dashboard',
      activePage: false,
      authorization: ['SUPREME_LEADER', 'PERSON_ADMIN'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER', 'PERSON_ADMIN']),
      icon: <MdDashboard size='1.5em' />
    },
    {
      title: 'Employees',
      route: '/employees',
      activePage: false,
      actions: [{
        title: 'Refresh',
        icon: <HiOutlineRefresh />
      }, {
        title: 'New employee',
        onClick: () => router.push('/employees/new'),
        icon: <FaUserPlus />
      }],
      authorization: ['SUPREME_LEADER', 'PERSON_ADMIN'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER', 'PERSON_ADMIN']),
      icon: <FaUsers size='1.5em' />
    },
    {
      title: 'Accounts',
      route: '/accounts',
      activePage: false,
      actions: [{
        title: 'Refresh',
        onClick: () => { queryClient.refetchQueries(['PersonAccounts']), queryClient.refetchQueries(['BusinessAccounts']) },
        icon: <HiOutlineRefresh />
      }, {
        title: 'New account',
        onClick: () => router.push('/accounts/new'),
        icon: <FaUserPlus />
      }],
      authorization: ['SUPREME_LEADER'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER']),
      icon: <MdAccountBox size='1.5em' />
    },
    {
      title: 'Login history',
      route: '/loginhistory',
      activePage: false,
      authorization: ['SUPREME_LEADER'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER']),
      icon: <MdHistory size='1.5em' />
    },
    {
      title: 'Activity logs',
      route: '/activitylogs',
      activePage: false,
      authorization: ['SUPREME_LEADER'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER']),
      icon: <MdViewList size='1.5em' />
    },
    {
      title: 'Products',
      route: '/products',
      activePage: false,
      authorization: ['SUPREME_LEADER'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER']),
      icon: <FaBoxes size='1.5em' />
    },
    {
      title: 'Inventory',
      route: '/inventory',
      activePage: false,
      authorization: ['SUPREME_LEADER'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER']),
      icon: <FaWarehouse size='1.5em' />
    },
    {
      title: 'Projects',
      route: '/projects',
      activePage: false,
      authorization: ['SUPREME_LEADER'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER']),
      icon: <AiOutlineFundProjectionScreen size='1.5em' />
    },
    {
      title: 'Notification',
      activePage: false,
      authorization: ['SUPREME_LEADER'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER']),
      icon: <MdNotificationsActive size='1.5em' />
    },
    {
      title: 'Triggerload',
      activePage: false,
      authorization: ['SUPREME_LEADER'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER']),
      icon: <MdComment size='1.5em' />
    },
  ]

  const [menuOptions, updateMenuOptions] = useState(options)

  useEffect(() => {

    menuOptions.forEach((o, i) => {
      if (router.pathname.startsWith(o.route)) {
        menuOptions[i].activePage = true
      }
    });
    updateMenuOptions(menuOptions)
  }, [])

  return (
    <ul className="flex flex-col list-none space-y-2">
      {menuOptions.map((o, i) => (
        <div key={i}>
          {o.canViewThis && <NavigationItem
            {...props}
            key={i}
            title={o.title}
            onClick={() => o.route && router.push(o.route)}
            activePage={o.activePage}
            route={o.route}
            actions={o.actions}
            icon={o.icon}
          />}
        </div>
      ))}
    </ul>
  )
}

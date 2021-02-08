import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { CurrentUserAuthData } from '../../models/CurrentUserAuthData'
import { useAuth } from '../../services/auth'
import { isUserAuthorizedToViewThisPage } from '../../utils/utils'
import { NavigationItem } from './NavigationItem'

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
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER', 'PERSON_ADMIN'])
    },
    {
      title: 'Employees',
      route: '/employees',
      activePage: false,
      actions: [{
        title: 'Refresh'
      }, {
        title: 'New employee',
        onClick: () => router.push('/employees/new')
      }],
      authorization: ['SUPREME_LEADER', 'PERSON_ADMIN'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER', 'PERSON_ADMIN'])
    },
    {
      title: 'Accounts',
      route: '/accounts',
      activePage: false,
      actions: [{
        title: 'Refresh',
        onClick: () => { queryClient.refetchQueries(['PersonAccounts']), queryClient.refetchQueries(['BusinessAccounts']) }
      }, {
        title: 'New account'
      }],
      authorization: ['SUPREME_LEADER'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER'])
    },
    {
      title: 'Logs',
      route: '/logs',
      activePage: false,
      authorization: ['SUPREME_LEADER'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER'])
    },
    {
      title: 'Products',
      route: '/products',
      activePage: false,
      authorization: ['SUPREME_LEADER'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER'])
    },
    {
      title: 'Inventory',
      route: '/inventory',
      activePage: false,
      authorization: ['SUPREME_LEADER'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER'])
    },
    {
      title: 'Projects',
      route: '/projects',
      activePage: false,
      authorization: ['SUPREME_LEADER'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER'])
    },
    {
      title: 'Notification',
      activePage: false,
      authorization: ['SUPREME_LEADER'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER'])
    },
    {
      title: 'Triggerload',
      activePage: false,
      authorization: ['SUPREME_LEADER'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['SUPREME_LEADER'])
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
          />}
        </div>
      ))}
    </ul>
  )
}

import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { NavigationItem } from './NavigationItem'

export const NavigationItems = (props) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const options = [
    {
      title: 'Dashboard',
      route: '/dashboard',
      activePage: false
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
      }]
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
      }]
    },
    {
      title: 'Logs',
      route: '/logs',
      activePage: false
    },
    {
      title: 'Products',
      route: '/products',
      activePage: false
    },
    {
      title: 'Inventory',
      route: '/inventory',
      activePage: false
    },
    {
      title: 'Projects',
      route: '/projects',
      activePage: false
    },
    {
      title: 'Notification',
      activePage: false
    },
    {
      title: 'Triggerload',
      activePage: false
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
        <NavigationItem
          {...props}
          key={i}
          title={o.title}
          onClick={() => o.route && router.push(o.route)}
          activePage={o.activePage}
          route={o.route}
          actions={o.actions}
        />
      ))}
    </ul>
  )
}

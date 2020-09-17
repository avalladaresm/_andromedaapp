import React from 'react';
import { Route } from '@ant-design/pro-layout/lib/typings'
import { UserOutlined, DashboardOutlined } from '@ant-design/icons';       

export const routes: Route = {
  route: {
    path: '/',
    routes: [
      {
        path: '/auth/login',
      },
      {
        path: '/dashboard',
        key: 'dashboard',
        name: 'Dashboard',
        icon: <DashboardOutlined />,
        authority: ['ROLE_ADMIN', 'ROLE_CUSTOMER']
      },
      {
        path: '/users',
        key: 'users',
        name: 'Users',
        icon: <UserOutlined />,
        authority: ['ROLE_ADMIN', 'ROLE_CUSTOMER']
      },
      {
        path: '/logs',
        key: 'logs',
        name: 'Logs',
        icon: <UserOutlined />,
        authority: ['ROLE_ADMIN'],
        hideInMenu: true
      },
    ],
  }
};
import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { MenuDataItem } from '@ant-design/pro-layout/lib/typings'
import { SiderMenuProps } from '@ant-design/pro-layout/lib/SiderMenu/SiderMenu'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { Dropdown, Menu, Avatar, Space } from 'antd'
import { SettingFilled, UnorderedListOutlined, UserOutlined, DashboardOutlined } from '@ant-design/icons'
import { DoSignOut } from '../services/auth'
import { useIntl } from 'react-intl'
import LangMenu from '../components/LangMenu'
import { Logout } from '../components/Icons'

const ProLayout = dynamic(() => import('@ant-design/pro-layout/'), {
  ssr: false,
  loading: () => <Loading />
})

const menuHeaderRender = (
  logoDom: ReactNode,
  titleDom: ReactNode,
  props: SiderMenuProps
) => (
  <Link href='/'>
    <a>
      {logoDom}
      {!props?.collapsed && titleDom}
    </a>
  </Link>
)

const MainLayout: React.FC<ReactNode> = ({ children }) => {
  const dispatch = useDispatch()
  const intl = useIntl()
  const isPageLoading = useSelector(state => state.global.isPageLoading)
  const loggedInUser = useSelector(state => state.auth.loggedInUser.userName)
  const loggedInUserAuthority = useSelector(state => state.auth.loggedInUser.roles && state.auth.loggedInUser.roles)

  const menuItemRender: React.ElementType = (options: MenuDataItem, element: ReactNode) => (
    <Link href={options.path}>
      <a>{element}</a>
    </Link>
  )

  const routes = {
    route: {
      path: '/',
      routes: [
        {
          path: '/auth/login'
        },
        {
          path: '/dashboard',
          key: 'dashboard',
          name: `${intl.formatMessage({ id: 'dashboard' })}`,
          icon: <DashboardOutlined />,
          locale: 'dashboard',
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
          icon: <UnorderedListOutlined />,
          authority: ['ROLE_ADMIN'],
          hideInMenu: loggedInUserAuthority && !loggedInUserAuthority.includes('ROLE_ADMIN')
        }
      ]
    }
  }

  const LoginOptions: React.ElementType = () => {
    return (
      <>
        <Space>
          <p style={{ textAlign: 'left' }}>Hello {loggedInUser}</p>
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu>
                <Menu.Item key='0' onClick={() => dispatch(DoSignOut(loggedInUser))}>
                  <Logout /> {intl.formatMessage({ id: 'logout' })}
                </Menu.Item>
              </Menu>
            }
          >
            <Avatar icon={<SettingFilled />}>Options</Avatar>
          </Dropdown>
          <LangMenu />
        </Space>
      </>
    )
  }

  return (
    <>
      <ProLayout
        style={{ minHeight: '100vh' }}
        {...routes}
        menuItemRender={menuItemRender}
        menuHeaderRender={menuHeaderRender}
        fixedHeader
        rightContentRender={() => (<LoginOptions />)}
        loading={isPageLoading}
        navTheme='dark'
      >
        {children}
      </ProLayout>
    </>
  )
}

export default MainLayout

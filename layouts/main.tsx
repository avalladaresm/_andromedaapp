import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { MenuDataItem } from '@ant-design/pro-layout/lib/typings'
import { SiderMenuProps } from '@ant-design/pro-layout/lib/SiderMenu/SiderMenu'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { Dropdown, Menu, Avatar, Space, Spin } from 'antd'
import { SettingFilled, UnorderedListOutlined, UserOutlined, DashboardOutlined } from '@ant-design/icons'
import { DoSignOut } from '../services/auth'
import { useIntl } from 'react-intl'
import LangMenu from '../components/LangMenu'
import { Logout } from '../components/Icons'
import { useIsFetching } from 'react-query'
import { useAuth } from '../services/auth'
import { usePageLoading } from '../services/global'

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
	const isFetching = useIsFetching()
  const auth = useAuth()
	const pageLoading = usePageLoading()
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
          hideInMenu: !auth.data?.currentUser?.roles.includes('ROLE_ADMIN')
        }
      ]
    }
  }

  const LoginOptions: React.ElementType = () => {
    return (
      <>
        <Space>
					{isFetching ? <Spin /> : ''}
          <p style={{ textAlign: 'left' }}>Hello {auth.data?.currentUser?.userName}</p>
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu>
                <Menu.Item key='0' onClick={() => dispatch(DoSignOut(auth.data.currentUser.userName))}>
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
        loading={pageLoading.data?.isPageLoading}
        navTheme='dark'
      >
        {children}
      </ProLayout>
    </>
  )
}

export default MainLayout

import React, { useEffect, useState } from 'react'
import MainLayout from '../../layouts/main'
import { Button, PageHeader, Result, Table } from 'antd'
import moment from 'moment'
import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { LogTypes } from '../../models/LogTypes'
import orderBy from 'lodash/orderBy'
import { useLogs } from '../../services/logs'
import { useAuth } from '../../services/auth'
import { useCreateLog } from '../../services/logs'

const Logs: React.FC<React.ReactNode> = () => {
  const [isAuthorized, setIsAuthorized] = useState(true)
  const intl = useIntl()
	const router = useRouter()
	const logs = useLogs()
	const auth = useAuth()
  const [createLog] = useCreateLog()

  useEffect(() => {
    if (auth.data && auth.data.currentUser && auth.data.currentUser.roles.includes('ROLE_ADMIN')) {
      setIsAuthorized(true)
    }
    else {
			createLog({
				userName: auth.data && auth.data.currentUser && auth.data.currentUser.userName,
				date: moment(),
				type: LogTypes.UNAUTHORIZED_ACCESS,
				description: `User ${auth.data && auth.data.currentUser && auth.data.currentUser.userName} attempting to access ${router.pathname}`,
				data: JSON.stringify({path: router.pathname})
			})
      setIsAuthorized(false)
    }
  }, [auth.data])

  const Unauthorized = () => {
    return (
      <Result
        status='403'
        title='403'
        subTitle='Sorry, you are not authorized to access this page.'
        extra={<Button type='primary' onClick={() => router.push('/dashboard')}>Back Home</Button>}
      />
    )
  }

  const columns = [
    {
      title: `${intl.formatMessage({id:'username', defaultMessage: 'userName tr?'})}`,
      dataIndex: 'userName',
      key: 'userName',
      responsive: ['sm'],
      isShowing: true
    },
    {
      title: `${intl.formatMessage({id:'type', defaultMessage: 'type tr?'})}`,
      dataIndex: 'type',
      key: 'type',
      responsive: ['xxl'],
      isShowing: true
    },
    {
      title: `${intl.formatMessage({id:'date', defaultMessage:'date tr?'})}`,
      dataIndex: 'date',
      key: 'date',
      valueType: 'dateTime',
      responsive: ['xxl'],
      /* render: date => (
        console.log(date),
        <Tooltip placement='topLeft' title={''
          // moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
          }>
          {date}
        </Tooltip>
      ), */
      isShowing: true
    },
    {
      title: `${intl.formatMessage({id:'description', defaultMessage:'description tr?'})}`,
      dataIndex: 'description',
      key: 'description',
      responsive: ['md'],
      isShowing: true
    },
    {
      title: `${intl.formatMessage({id:'data', defaultMessage:'data tr?'})}`,
      dataIndex: 'data',
      key: 'data',
      responsive: ['lg'],
      isShowing: true
    }
	]
	
  return (
    <MainLayout>
      {isAuthorized ?
        <>
          <PageHeader
            title={intl.formatMessage({id:'logs', defaultMessage:'logs tr?'})}
            style={{backgroundColor:'white'}}
          >
          </PageHeader>
          <Table
            size='small'
            style={{overflowX:'auto'}}
            columns={columns}
						dataSource={logs.data && logs.data.data.length > 0 ? orderBy(logs.data.data, 'date', 'desc') : []}
            pagination={{
              pageSize: 100,
              position:[ 'topRight', 'bottomRight']
            }}
            loading={logs.isLoading}
          />
        </> :
        <Unauthorized />
      }
    </MainLayout>
  )
}

export default Logs

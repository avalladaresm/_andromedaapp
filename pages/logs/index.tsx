import React, { useEffect, useState } from 'react'
import MainLayout from '../../layouts/main'
import { Button, message, PageHeader, Result, Table } from 'antd'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import { CreateUnauthorizedAccessLog, GetLogs } from '../../services/logs'
import { useRouter } from 'next/router'
import { LogTypes } from '../../models/LogTypes'
import { useQuery } from 'react-query'
import orderBy from 'lodash/orderBy'

const Logs: React.FC<React.ReactNode> = () => {
  const [isAuthorized, setIsAuthorized] = useState(true)
  const dispatch = useDispatch()
  const intl = useIntl()
  const loggedInUser = useSelector(state => state.auth.loggedInUser)
  const router = useRouter()
	const { isLoading, isError, data } = useQuery('Logs', GetLogs)

  useEffect(() => {
    if (loggedInUser.roles && loggedInUser.roles.includes('ROLE_ADMIN')) {
      console.log('is authorized')
      setIsAuthorized(true)
    }
    else {
      if (loggedInUser.userName) {
        dispatch(CreateUnauthorizedAccessLog({
          userName: loggedInUser.userName,
          date: moment(),
          type:`${LogTypes.UNAUTHORIZED_ACCESS}`,
          description: `User ${loggedInUser.userName} attempting to access ${router.pathname}`,
          data: JSON.stringify({path: router.pathname})
        }))
      }
      setIsAuthorized(false)
    }
  }, [isAuthorized])

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
	
	if (isError) message.error('Something bad happened: ')

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
						dataSource={data && data.data.length > 0 ? orderBy(data.data, 'date', 'desc') : []}

            pagination={{
              pageSize: 100,
              position:[ 'topRight', 'bottomRight']
            }}
            loading={isLoading}
          />
        </> :
        <Unauthorized />
      }
    </MainLayout>
  )
}

export default Logs

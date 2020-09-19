import { Card, Table, Tooltip } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { GetLatestUsers, GetAllUserss } from '../../services/dashboard'
import { GetAllUsers } from '../../services/users'
import { useEffect } from 'react'
import moment from 'moment'
import { useIntl } from 'react-intl'

import { useQuery } from 'react-query'

const LatestUsers = () => {
  const allUsers = useSelector(state => state.users.users)
  const latestUsers = useSelector(state => state.dashboard.latestUsers)
  const isFetchingLatestUsers = useSelector(state => state.dashboard.isFetchingLatestUsers)
  // const dispatch = useDispatch()
  const intl = useIntl()
  // const { isLoading, isError, data, error } = useQuery('users', GetLatestUsers(allUsers))
  const { isLoading, isError, data, error } = useQuery('Users', GetAllUsers)

  useEffect(() => {
    // dispatch(GetLatestUsers(allUsers))
    console.log('isLoading', isLoading)
    console.log('dataa', data)
    console.log('error', error)
  }, [])

  const columns = [
    {
      title: `${intl.formatMessage({id:'username'})}`,
      dataIndex: 'userName',
      key: 'userName',
      responsive: ['sm'],
      isShowing: true
    },
    {
      title: `${intl.formatMessage({id:'firstName'})}`,
      dataIndex: 'firstName',
      key: 'firstName',
      isShowing: true
    },
    {
      title: `${intl.formatMessage({id:'lastName'})}`,
      dataIndex: 'lastName',
      key: 'lastName',
      isShowing: true
    },
    {
      title: `${intl.formatMessage({id:'createdAt'})}`,
      dataIndex: 'createdAt',
      key: 'createdAt',
      valueType: 'dateTime',
      responsive: ['xxl'],
      render: createdAt => (
        <Tooltip placement='topLeft' title={moment(createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}>
          {createdAt}
        </Tooltip>
      ),
      isShowing: true
    }
  ]


  return (
    <Card title={intl.formatMessage({id:'latestUsers'})}>
      <Table
        dataSource={data && data.data.slice(data.data.length-5, data.data.length)}
        columns={columns}
        pagination={false}
        size='small'
        bordered
        loading={isLoading}
      />
    </Card>
  )
}

export default LatestUsers

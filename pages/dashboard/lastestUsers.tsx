import { Card, Table, Tooltip } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { GetLatestUsers } from '../../services/dashboard'
import { useEffect } from 'react'
import moment from 'moment'
import { useIntl } from 'react-intl';

const LatestUsers = () => {
  const allUsers = useSelector(state => state.users.users)
  const latestUsers = useSelector(state => state.dashboard.latestUsers)
  const isFetchingLatestUsers = useSelector(state => state.dashboard.isFetchingLatestUsers)
  const dispatch = useDispatch()
  const intl = useIntl()

  useEffect(() => {
    dispatch(GetLatestUsers(allUsers))
  }, [allUsers])

  const columns: Array<any> = [
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
  ];

  return (
    <Card title={intl.formatMessage({id:'latestUsers'})}>
      <Table
        dataSource={latestUsers && latestUsers}
        columns={columns}
        pagination={false}
        size='small'
        bordered
        loading={isFetchingLatestUsers}
      />
    </Card>
  )
}

export default LatestUsers
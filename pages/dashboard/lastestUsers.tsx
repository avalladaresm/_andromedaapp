import { Card, message, Table, Tooltip } from 'antd'
import moment from 'moment'
import { useIntl } from 'react-intl'
import { useUsers } from '../../services/users'

const LatestUsers = () => {
  const intl = useIntl()
  const users = useUsers()

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

	if (users.isError) message.error('Something happened!')

  return (
		<Card title={intl.formatMessage({id:'latestUsers'})}>
			<Table
				dataSource={users.data && users.data.data.slice(users.data.data.length-5, users.data.data.length)}
				columns={columns}
				pagination={false}
				size='small'
				bordered
				loading={users.isLoading}
			/>
		</Card>
  )
}

export default LatestUsers

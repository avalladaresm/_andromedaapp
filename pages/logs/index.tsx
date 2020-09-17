import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/main'
import { Button, message, notification, PageHeader, Result, Table } from 'antd';
import { FcOk, FcHighPriority, FcPrevious } from 'react-icons/fc';
import moment from 'moment'
import { SearchInTable } from '../../components/SearchInTable'
import { useDispatch, useSelector } from 'react-redux';
import { GetAllUsers } from '../../services/users';
import _ from 'lodash'
import CreateForm from './components/CreateForm';
import { GetSearchedUsers, CreateNewUser } from '../../services/users';
import { useIntl } from 'react-intl';
import { CreateUnauthorizedAccessLog, GetLogs } from '../../services/logs';
import { useRouter } from 'next/router'
import { LogTypes } from '../../models/LogTypes'

const Users: React.FC<{}> = ({props}) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isAuthorized, setIsAuthorized] = useState(true)
  const dispatch = useDispatch();
  const d = useSelector(state => state.users.users)
  const searchedUsers = useSelector(state => state.users.searchedUsers)
  const intl = useIntl()
  const logs = useSelector(state => state.logs.logs)
  const loggedInUser = useSelector(state => state.auth.loggedInUser)
  const router = useRouter()

  const userNotFound = () => {
    message.error('User was not found!');
  };

  const handleAddErrorNotification = (type: string, title: string, description: string) => {
    notification[type]({
      message: title,
      description: description,
    });
  };

  useEffect(() => {
    dispatch(GetLogs())
  }, [])

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
    return () => {}
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

  const columns: Array<any> = [
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
    },
  ];

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
            dataSource={logs && logs.length > 0 ? logs : []}
            pagination={{
              pageSize: 100, 
              position:[ 'topRight', 'bottomRight']
            }}
            //loading={loading}
          /> 
        </> :
        <Unauthorized />
      }
    </MainLayout>
  );
};

export default Users;

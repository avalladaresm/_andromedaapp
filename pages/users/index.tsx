import { Divider, notification, Table, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useQueryClient, useIsFetching } from "react-query";
import Navigation from "../../components/navigation";
import { FetchUsers, useUsers } from "../../services/user";
import { FcOk, FcHighPriority } from 'react-icons/fc'
import { EditTwoTone, DeleteTwoTone, PlusOutlined, CloseOutlined } from '@ant-design/icons'
import { IconType } from "antd/lib/notification";
import CreateUser from "./CreateUser";
import { object, string } from 'yup'

export default function Users() {
  const [allUsers, setAllUsers] = useState({ data: [] })
  const [showCreateUser, setShowCreateUser] = useState(false)

  const queryClient = useQueryClient()
  const users = useUsers(queryClient)
  const isFetching = useIsFetching()

  useEffect(() => {
    const f = async () => {
      setAllUsers(users ?? await FetchUsers(queryClient))
    }
    f()
  }, [])

  useEffect(() => {
    if ((users?.data && users.data.length !== 0 || allUsers.data.length !== 0) && isFetching === 0) {
      const newRows = users?.data.length - allUsers.data.length
      openNotificationWithIcon('info', newRows)
      newRows > 0 && setAllUsers(users)
    }
  }, [isFetching])

  const openNotificationWithIcon = (type: IconType, rowsFetched: number) => {
    notification[type]({
      message: 'Refetching complete',
      description: `Refetching data complete, ${rowsFetched} new rows fetched.`,
      duration: 10
    });
  };

  // The native sort modifies the array in place. `_.orderBy` and `_.sortBy` do not, so we use `.concat()` to
  // copy the array, then sort.

  const columns: any = [
    {
      title: 'username',
      dataIndex: 'userName',
      key: 'userName',
      responsive: ['sm'],
      isShowing: true
    },
    {
      title: 'firstName',
      dataIndex: 'firstName',
      key: 'firstName',
      isShowing: true
    },
    {
      title: 'middleName',
      dataIndex: 'middleName',
      key: 'middleName',
      responsive: ['lg'],
      isShowing: true
    },
    {
      title: 'lastName',
      dataIndex: 'lastName',
      key: 'lastName',
      isShowing: true
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      key: 'gender',
      responsive: ['xxl'],
      isShowing: true
    },
    {
      title: 'dob',
      dataIndex: 'dob',
      key: 'dob',
      valueType: 'date',
      responsive: ['xxl'],
      isShowing: true
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['md'],
      isShowing: true
    },
    {
      title: 'verified',
      dataIndex: 'verified',
      key: 'verified',
      responsive: ['xxl'],
      render: (verified) => (
        <span>
          { (verified && verified) ?
            <FcOk /> : <FcHighPriority />}
        </span>
      ),
      isShowing: true
    },
    {
      title: 'cellphone',
      dataIndex: 'cellphone',
      key: 'cellphone',
      responsive: ['xxl'],
      isShowing: true
    },
    {
      title: 'address',
      dataIndex: 'address',
      key: 'address',
      responsive: ['xl'],
      isShowing: true
    },
    {
      title: 'city',
      dataIndex: 'city',
      key: 'city',
      responsive: ['xxl'],
      isShowing: true
    },
    {
      title: 'state',
      dataIndex: 'state',
      key: 'state',
      responsive: ['xxl'],
      isShowing: true
    },
    {
      title: 'country',
      dataIndex: 'country',
      key: 'country',
      responsive: ['xxl'],
      isShowing: true
    },
    {
      title: 'createdAt',
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
    },
    {
      title: 'lastLogin',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      valueType: 'dateTime',
      responsive: ['(min-width: 1800px)'],
      isShowing: true
    },
    {
      title: 'actions',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={async () => {
              // handleUpdateModalVisible(true)
              // setUpdateFormValues(record)
            }} >
            <Tooltip title='Edit user'>
              <EditTwoTone />
            </Tooltip>
          </a>
          <Divider type='vertical' />
          <a
            onClick={() => {
              // handleDeleteUser(record.id)
            }} >
            <Tooltip title='Delete user'>
              <DeleteTwoTone />
            </Tooltip>
          </a>
        </>
      ),
      isShowing: true
    }
  ]

  const SignupSchema = object().shape({
    firstName: string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: string().email('Invalid email').required('Required'),
  });

  return (
    <Navigation
      actionBar={{
        pageTitle: 'Users',
        navItems: [{
          title: 'Refresh', onClick: () => { queryClient.refetchQueries(['Users']) }
        }, {
          title: 'New User', onClick: () => { setShowCreateUser(true) }
        }],
        isLoading: isFetching === 1
      }}
    >
      <Table
        rowKey='id'
        style={{ overflowX: 'auto' }}
        columns={columns}
        dataSource={allUsers?.data?.length > 0 ? allUsers?.data : []}
        loading={isFetching === 1}
        pagination={{
          pageSize: 20,
          position: ['topRight', 'bottomRight']
        }}
      />
      <CreateUser
        isShowing={showCreateUser}
        title='Create user'
        onCancel={() => setShowCreateUser(false)}
      />
    </Navigation>
  )
}
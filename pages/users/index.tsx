import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/main'
import { Button, Checkbox, Divider, Drawer, Dropdown, Input, message, notification, PageHeader, Space, Table, Tooltip } from 'antd';
import { FcOk, FcHighPriority, FcPrevious } from 'react-icons/fc';
import { EditTwoTone, DeleteTwoTone, DownOutlined, PlusOutlined, InfoCircleOutlined, CloseOutlined, SettingFilled } from '@ant-design/icons';
import moment from 'moment'
import { SearchInTable } from '../../components/SearchInTable'
import { useDispatch, useSelector } from 'react-redux';
import { GetAllUsers } from '../../services/users';
import size from 'lodash/size'
import CreateForm from './components/CreateForm';
import { GetSearchedUsers, CreateNewUser } from '../../services/users';
import { useIntl } from 'react-intl';

const Users: React.FC<{}> = ({props}) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  const [createUserLoading, setCreateUserLoading] = useState(false)
  const [settingsDrawerVisible, setSettingsDrawerVisible] = useState<boolean>(false)
  const [addNewModalLoading, setAddNewModalLoading] = useState<boolean>(false);
  const [cols, setCols] = useState([])
  const dispatch = useDispatch();
  const d = useSelector(state => state.users.users)
  const searchedUsers = useSelector(state => state.users.searchedUsers)
  const justCreated = useSelector(state => state.users.justCreated)
  const intl = useIntl()

  const userNotFound = () => {
    message.error('User was not found!');
  };

  const handleAddErrorNotification = (type: string, title: string, description: string) => {
    notification[type]({
      message: title,
      description: description,
    });
  };

  const handleAdd = (fields) => {
    try {
      dispatch(CreateNewUser(fields))
      message.success('Added successfully');
      return true;
    } catch (error) {
      handleAddErrorNotification('error', 'Possible error', error.messagee)
      message.error('Add failed, please try again!');
      return false;
    }
  };

  useEffect(() => {
    console.log('INITIAL', props)
    if (size(users) === 0){
      setLoading(true)
      dispatch(GetAllUsers())
      setUsers(d)
    }
    else if (justCreated) {
      setLoading(true)
      setUsers(d)
    }

    return () => {
      setLoading(false)
    }

  }, [d, justCreated])
  
  useEffect(() => {
    if (searchedUsers && searchedUsers.data.length > 0){
      setUsers(searchedUsers.data)
      console.log(searchedUsers.length)
    } else if (searchedUsers.status === 'NotFound') {
      userNotFound()
    }
  }, [searchedUsers])

  const AddNew = () => {
    return (
      <Button
        type='primary'
        icon={<PlusOutlined />}
        onClick={() => setAddNewModalLoading(true)}
      >
        Add New
      </Button>
    )
  }

  const TableHeader = () => {
    return (
      <Space>
        <AddNew />
        <SearchInTable />
      </Space>
    )
  }
    
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
      title: `${intl.formatMessage({id:'middleName'})}`,
      dataIndex: 'middleName',
      key: 'middleName',
      responsive: ['lg'],
      isShowing: true
    },
    {
      title: `${intl.formatMessage({id:'lastName'})}`,
      dataIndex: 'lastName',
      key: 'lastName',
      isShowing: true
    },
    {
      title: `${intl.formatMessage({id:'gender'})}`,
      dataIndex: 'gender',
      key: 'gender',
      responsive: ['xxl'],
      isShowing: true
    },
    {
      title: `${intl.formatMessage({id:'dob'})}`,
      dataIndex: 'dob',
      key: 'dob',
      valueType: 'date',
      responsive: ['xxl'],
      isShowing: true
    },
    {
      title: `${intl.formatMessage({id:'email'})}`,
      dataIndex: 'email',
      key: 'email',
      responsive: ['md'],
      isShowing: true
    },
    {
      title: `${intl.formatMessage({id:'verified'})}`,
      dataIndex: 'verified',
      key: 'verified',
      responsive: ['xxl'],
      render: (verified) => (
        <span>
          { (verified && verified) ? 
            <FcOk /> : <FcHighPriority /> }
        </span>
      ),
      isShowing: true
    },
    {
      title: `${intl.formatMessage({id:'cellphone'})}`,
      dataIndex: 'cellphone',
      key: 'cellphone',
      responsive: ['xxl'],
      isShowing: true
    },
    {
      title: `${intl.formatMessage({id:'address'})}`,
      dataIndex: 'address',
      key: 'address',
      responsive: ['xl'],
      isShowing: true
    },
    {
      title: `${intl.formatMessage({id:'city'})}`,
      dataIndex: 'city',
      key: 'city',
      responsive: ['xxl'],
      isShowing: true
    },
    {
      title: `${intl.formatMessage({id:'state'})}`,
      dataIndex: 'state',
      key: 'state',
      responsive: ['xxl'],
      isShowing: true
    },
    {
      title: `${intl.formatMessage({id:'country'})}`,
      dataIndex: 'country',
      key: 'country',
      responsive: ['xxl'],
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
    },
    {
      title: `${intl.formatMessage({id:'lastLogin'})}`,
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      valueType: 'dateTime',
      responsive: ['(min-width: 1800px)'],
      isShowing: true
    },
    {
      title: `${intl.formatMessage({id:'actions'})}`,
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={async () => {
              //handleUpdateModalVisible(true);
              //setUpdateFormValues(record);
            }} >
            <Tooltip title='Edit user'>
              <EditTwoTone />
            </Tooltip>
          </a>
          <Divider type='vertical' />
          <a
            onClick={() => {
              //handleDeleteUser(record.id);
            }} >
            <Tooltip title='Delete user'>
              <DeleteTwoTone />
            </Tooltip>
          </a>
        </>
      ),
      isShowing: true
    },
  ];

  return (
    <MainLayout >
      <PageHeader
        title={intl.formatMessage({id:'users'})}
        extra={
          <Space>
            <TableHeader />
            {searchedUsers && searchedUsers.status === 'Found' ? 
              <Button type='link' icon={<CloseOutlined />} onClick={() => {dispatch(GetSearchedUsers({data: [], status: 'NotSearchedYet'})); setUsers(d); }}>{intl.formatMessage({id:'clearSearch'})}</Button> : 
              ''}
          </Space>
        }
        style={{backgroundColor:'white'}}
      >
      </PageHeader>
      <Table
        style={{overflowX:'auto'}}
        columns={columns} 
        dataSource={users && users.length > 0 ? users : []}
        loading={loading}
        pagination={{
          pageSize: 20, 
          position:[ 'topRight', 'bottomRight']
        }}
      />
      <CreateForm 
        onCreate={async (value) => {
          setCreateUserLoading(true);
          const success = await handleAdd(value);
          if (success) {
            setCreateUserLoading(false);
            setAddNewModalLoading(false);
          }
          setCreateUserLoading(false);
        }}
        visible={addNewModalLoading}
        onCancel={() => {
          setAddNewModalLoading(false);
        }}
        loading={createUserLoading}
      />
    </MainLayout>
  );
};

export default Users;

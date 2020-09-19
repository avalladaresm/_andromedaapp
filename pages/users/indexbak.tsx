// import { EditTwoTone, DeleteTwoTone, DownOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
// //import { Input, Button, Divider, Dropdown, Menu, message, Tooltip, notification} from 'antd';
// import React, { useState, useEffect, useRef} from 'react';
// import { PageContainer } from '@ant-design/pro-layout';
// import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
// import { FcOk, FcHighPriority } from 'react-icons/fc';
// import moment from 'moment'

// import CreateForm from './components/CreateForm';
// import UpdateForm from './components/UpdateForm';
// import { UsersListItem, UsersListItemForUpdate } from './data';
// import { GetAllUsers, deleteUser, updateRule, addRule, removeRule, querySearchUsers } from '../../services/users';
// const { Search } = Input;

// const handleAddErrorNotification = (type: string, title: string, description: string) => {
//   notification[type]({
//     message: title,
//     description: description,
//   });
// };

// /**
//  * Add Node
//  * @param fields
//  */
// const handleAdd = async (fields: UsersListItem) => {
//   try {
//     await addRule({ ...fields });
//     message.success('Added successfully');
//     return true;
//   } catch (error) {
//     handleAddErrorNotification('error', 'Possible error', error.messagee)
//     message.error('Add failed, please try again!');
//     return false;
//   }
// };

// const cleanFields = (fields: UsersListItemForUpdate) => {
//   for(var p in fields) {
//     if(fields[p] === null || fields[p] === undefined)
//       delete fields[p]
//   }
//   return fields
// }
// /**
//  * Update node
//  * @param fields
//  */
// const handleUpdate = async (id: number, fields: UsersListItemForUpdate) => {
//   try {
//     const cleanedFields = cleanFields(fields)
//     await updateRule(id, { ...cleanedFields });
//     message.success('User updated successfully');
//     return true;
//   } catch (error) {
//     message.error('Please try again if the update fails!');
//     return false;
//   }
// };

// /**
//  *  Delete a node
//  * @param selectedRows
//  */
// const handleRemove = async (selectedRows: UsersListItem[]) => {
//   const hide = message.loading('deleting');
//   if (!selectedRows) return true;
//   try {
//     await removeRule({
//       key: selectedRows.map((row) => row.key),
//     });
//     hide();
//     message.success('Successfully deleted, will be refreshed soon');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Failed to delete, please try again');
//     return false;
//   }
// };

// /**
//  *  Delete a user
//  * @param id
//  */
// const handleDeleteUser = async (id: number) => {
//   const hide = message.loading('deleting');
//   try {
//     await deleteUser(id);
//     hide();
//     message.success('Successfully deleted, will be refreshed soon');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Failed to delete, please try again');
//     return false;
//   }
// };

// enum LoadDataSource {
//   Initial,
//   EmptySearch,
//   NonEmptySearch,
//   AfterUpdate
// }

// const TableList: React.FC<{}> = () => {
//   const [createModalVisible, handleModalVisible] = useState<boolean>(false);
//   const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
//   const [updateFormValues, setUpdateFormValues] = useState({});
//   const [initialDataSource, handleInitialDataSource] = useState([]);
//   const [searchedDataSource, handleSearchedDataSource] = useState([]);
//   const [emptySearch, handleEmptySearch] = useState<LoadDataSource>(LoadDataSource.Initial);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [tableLoading, setTableLoading] = useState<boolean>(false);

//   useEffect(() => {
//     async function getUsers () {
//       setTableLoading(true)
//       const d = await queryGetUsers()
//       handleInitialDataSource(d.data)
//       setTableLoading(false)
//     }
//     getUsers()
//   }, [])

//   const handleQueryy = async (value: string) => {
//     if(value.length === 0){
//       setTableLoading(true)
//       handleEmptySearch(LoadDataSource.EmptySearch)
//       setTableLoading(false)
//     }else{
//       setTableLoading(true)
//       handleEmptySearch(LoadDataSource.NonEmptySearch)
//       const s = await querySearchUsers(value);
//       handleSearchedDataSource(s.data)
//       setTableLoading(false)
//     }
//   }

//   const actionRef = useRef<ActionType>();

//   return (
//     <PageContainer>
//       <ProTable<UsersListItem>
//         pagination={{ position: ['topRight', 'bottomRight'] }}
//         loading={tableLoading}
//         search={false}
//         headerTitle="Your users"
//         actionRef={actionRef}
//         rowKey="id"
//         dataSource={emptySearch === LoadDataSource.Initial ||
//           emptySearch === LoadDataSource.EmptySearch
//           ? initialDataSource : searchedDataSource
//         }
//         columns={columns}
//         rowSelection={{}}
//         toolBarRender={(action, { selectedRows }) => [
//           <Search placeholder='search table' onSearch={value => handleQueryy(value)} enterButton suffix={
//             <Tooltip title="Extra information">
//               <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
//             </Tooltip>
//           }/>,
//           <Button type="primary" onClick={() => handleModalVisible(true)}>
//             <PlusOutlined /> New
//           </Button>,
//           selectedRows && selectedRows.length > 0 && (
//             <Dropdown
//               overlay={
//                 <Menu
//                   onClick={async (e) => {
//                     if (e.key === 'remove') {
//                       await handleRemove(selectedRows);
//                       action.reload();
//                     }
//                   }}
//                   selectedKeys={[]}
//                 >
//                   <Menu.Item key="remove">Batch deletion</Menu.Item>
//                   <Menu.Item key="approval">Batch approval</Menu.Item>
//                 </Menu>
//               }
//             >
//               <Button>
//               Bulk operations <DownOutlined />
//               </Button>
//             </Dropdown>
//           ),
//         ]}
//       />

//       <CreateForm
//         visible={createModalVisible}
//         onCreate={async (value: UsersListItem) => {
//           setLoading(true);
//           const success = await handleAdd(value);
//           if (success) {
//             setLoading(false);
//             handleModalVisible(false);
//             if (actionRef.current) {
//               actionRef.current.reload();
//             }
//           }
//           setLoading(false);
//         }}
//         onCancel={() => {
//           handleModalVisible(false);
//         }}
//         loading={loading}
//       />
//       {updateFormValues && Object.keys(updateFormValues).length ? (
//         <UpdateForm
//         onUpdate={async (value: UsersListItemForUpdate) => {
//             setLoading(true);
//             const success = await handleUpdate(updateFormValues.id, value);
//             if (success) {
//               setLoading(false);
//               handleUpdateModalVisible(false);
//               setUpdateFormValues({});
//               if (actionRef.current) {
//                 actionRef.current.reload();
//               }
//             }
//             setLoading(false);
//           }}
//           onCancel={() => {
//             handleUpdateModalVisible(false);
//             setUpdateFormValues({});
//           }}
//           visible={updateModalVisible}
//           loading={loading}
//           values={updateFormValues}
//         />
//       ) : null}
//     </PageContainer>
//   );
// };

// export default TableList;

import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { useQueryClient, useIsFetching } from "react-query";
import Navigation from "../../components/navigation";
import { useAccounts } from "../../services/account";
import { FcOk, FcHighPriority } from 'react-icons/fc'
import { IconType } from "antd/lib/notification";
import CreateAccount from "./CreateAccount";
import { useTable } from 'react-table'
import { FetchAccounts } from "../../services/account";

export default function Accounts() {
  const [allAccounts, setAllAccounts] = useState([])
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const queryClient = useQueryClient()
  const accounts = useAccounts(queryClient)
  const isFetching = useIsFetching()

  useEffect(() => {
    const f = async () => {
      setIsLoading(true)
      setAllAccounts(accounts ?? await FetchAccounts(queryClient))
      setIsLoading(false)
    }
    f()
  }, [isLoading])

  useEffect(() => {
    if ((accounts && accounts.length !== 0 || allAccounts.length !== 0) && isFetching === 0) {
      const newRows = accounts?.length - allAccounts.length
      openNotificationWithIcon('info', newRows)
      newRows > 0 && setAllAccounts(accounts)
    }
  }, [isFetching])

  const openNotificationWithIcon = (type: IconType, rowsFetched: number) => {
    notification[type]({
      message: 'Refetching complete',
      description: `Refetching data complete, ${rowsFetched} new rows fetched.`,
      duration: 10
    });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'id'
      },
      {
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Surname',
        accessor: 'surname',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'Dob',
        accessor: 'dob',
      },
      {
        Header: 'Is verified',
        accessor: 'isVerified',
      },
      {
        Header: 'Is active',
        accessor: 'isActive',
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: allAccounts })

  return (
    <Navigation
      actionBar={{
        pageTitle: 'Accounts',
        navItems: [{
          title: 'Refresh', onClick: () => { queryClient.refetchQueries(['Accounts']) }
        }, {
          title: 'New Account', onClick: () => { setShowCreateAccount(true) }
        }],
        isLoading: isFetching === 1
      }}
    >
      {allAccounts.length > 0 && 
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} >
                  {column.render('Header')}
                </th>
              ))} 
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return ( 
                    <td {...cell.getCellProps()} >
                      {cell.value === false ? <FcHighPriority /> :
                        cell.value === true ? <FcOk /> : cell.value}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>}
{/*       <CreateAccount
        isShowing={showCreateAccount}
        title='Create user'
        onCancel={() => setShowCreateAccount(false)}
      /> */}
    </Navigation>
  )
}
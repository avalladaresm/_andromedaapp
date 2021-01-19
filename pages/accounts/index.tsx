import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { useQueryClient, useIsFetching } from "react-query";
import Navigation from "../../components/navigation";
import { FetchBusinessAccounts, useBusinessAccounts, usePersonAccounts } from "../../services/account";
import { IconType } from "antd/lib/notification";
import CreateAccount from "./CreateAccount";
import Table from '../../components/Table'
import { FetchPersonAccounts } from "../../services/account";

export default function Accounts() {
  const [allPersonAccounts, setAllPersonAccounts] = useState([])
  const [allBusinessAccounts, setAllBusinessAccounts] = useState([])
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const queryClient = useQueryClient()
  const personAccounts = usePersonAccounts(queryClient)
  const businessAccounts = useBusinessAccounts(queryClient)
  const isFetching = useIsFetching()

  useEffect(() => {
    const f = async () => {
      setIsLoading(true)
      setAllPersonAccounts(personAccounts ?? await FetchPersonAccounts(queryClient))
      setAllBusinessAccounts(businessAccounts ?? await FetchBusinessAccounts(queryClient))
      setIsLoading(false)
    }
    f()
  }, [isLoading])

  useEffect(() => {
    if ((personAccounts && personAccounts.length !== 0 || allPersonAccounts.length !== 0) && isFetching === 0) {
      const newRows = personAccounts?.length - allPersonAccounts.length
      openNotificationWithIcon('info', newRows)
      newRows > 0 && setAllPersonAccounts(personAccounts)
    }
  }, [isFetching])

  useEffect(() => {
    if ((businessAccounts && businessAccounts.length !== 0 || allBusinessAccounts.length !== 0) && isFetching === 0) {
      const newRows = businessAccounts?.length - allBusinessAccounts.length
      openNotificationWithIcon('info', newRows)
      newRows > 0 && setAllBusinessAccounts(businessAccounts)
    }
  }, [isFetching])

  const openNotificationWithIcon = (type: IconType, rowsFetched: number) => {
    notification[type]({
      message: 'Refetching complete',
      description: `Refetching data complete, ${rowsFetched} new rows fetched.`,
      duration: 10
    });
  };

  const personColumns = React.useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'id'
      },
      {
        Header: 'Username',
        accessor: 'username'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Surname',
        accessor: 'surname'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Gender',
        accessor: 'gender'
      },
      {
        Header: 'Dob',
        accessor: 'dob'
      },
      {
        Header: 'Is verified',
        accessor: 'isVerified'
      },
      {
        Header: 'Is active',
        accessor: 'isActive'
      },
    ],
    []
  )

  const businessColumns = React.useMemo(
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
        Header: 'Email',
        accessor: 'email',
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

  return (
    <Navigation
      actionBar={{
        pageTitle: 'Accounts',
        navItems: [{
          title: 'Refresh', onClick: () => { queryClient.refetchQueries(['PersonAccounts', 'BusinessAccounts']) }
        }, {
          title: 'New Account', onClick: () => { setShowCreateAccount(true) }
        }],
        isLoading: isFetching === 1
      }}
    >
      {allPersonAccounts.length > 0 &&
        <Table columns={personColumns} data={allPersonAccounts} />
      }
      {allBusinessAccounts.length > 0 &&
        <Table columns={businessColumns} data={allBusinessAccounts} />
      }
      {/*       <CreateAccount
        isShowing={showCreateAccount}
        title='Create user'
        onCancel={() => setShowCreateAccount(false)}
      /> */}
    </Navigation>
  )
}
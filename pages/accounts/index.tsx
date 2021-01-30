import { notification } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useQueryClient, useIsFetching } from "react-query";
import Navigation from "../../components/navigation";
import { FetchBusinessAccounts, useBusinessAccounts } from "../../services/account";
import { IconType } from "antd/lib/notification";
import CreateAccount from "./CreateAccount";
import Table from '../../components/Table'
import { BusinessColumns } from "./BusinessColumns";
import PersonTable from "./PersonTable";
import Mayre from "mayre";
import { AuthCookie } from "../../models/AuthCookie";
import { useAuth } from "../../services/auth";

export default function Accounts() {
  const [allBusinessAccounts, setAllBusinessAccounts] = useState([])
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const queryClient = useQueryClient()
  const businessAccounts = useBusinessAccounts(queryClient)
  const isFetching = useIsFetching()
  const auth: AuthCookie = useAuth(queryClient)

  useEffect(() => {
    const f = async () => {
      setIsLoading(true)
      setAllBusinessAccounts(businessAccounts ?? await FetchBusinessAccounts(queryClient))
      setIsLoading(false)
    }
    f()
  }, [isLoading])

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

  const businessColumns = useMemo(() => BusinessColumns, [])

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
      <Mayre
        of={<div>Verifying your credentials...</div>}
        or={<PersonTable />}
        when={!auth?.a_token}
      />
      {allBusinessAccounts.length > 0 &&
        <Table columns={businessColumns} data={allBusinessAccounts} />
      }
      <CreateAccount
        isShowing={showCreateAccount}
        title='Create account'
        onCancel={() => setShowCreateAccount(false)}
      />
    </Navigation>
  )
}
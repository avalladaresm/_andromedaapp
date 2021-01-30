import { notification } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useQueryClient, useIsFetching, QueryObserverResult } from 'react-query';
import { useFetchPersonAccounts, usePersonAccounts } from '../../services/account';
import { IconType } from 'antd/lib/notification';
import Table from '../../components/Table'
import { PersonColumns } from './PersonColumns'
import { AuthCookie } from '../../models/AuthCookie';
import { useAuth } from '../../services/auth';
import Mayre from 'mayre';
import { AxiosError } from 'axios';

export default function Accounts() {
  const [allPersonAccounts, setAllPersonAccounts] = useState([])

  const queryClient = useQueryClient()
  const personAccounts = usePersonAccounts(queryClient)
  const isFetching = useIsFetching()
  const auth: AuthCookie = useAuth(queryClient)
  const { isLoading, error }: QueryObserverResult<any, AxiosError> = useFetchPersonAccounts(auth.a_token)

  useEffect(() => {
    if ((personAccounts && personAccounts.length !== 0 || allPersonAccounts.length !== 0) && isFetching === 0) {
      const newRows = personAccounts?.length - allPersonAccounts.length
      openNotificationWithIcon('info', newRows)
      newRows > 0 && setAllPersonAccounts(personAccounts)
    }
  }, [isFetching])

  const openNotificationWithIcon = (type: IconType, rowsFetched: number) => {
    notification[type]({
      message: 'Refetching complete',
      description: `Refetching data complete, ${rowsFetched} new rows fetched.`,
      duration: 10
    });
  };

  const personColumns = useMemo(() => PersonColumns, [])

  return (
    <Mayre
      of={<Table columns={personColumns} data={allPersonAccounts} />}
      or={
        <Mayre
          of={<div>Loading table data...</div>}
          or={<div>Error mate: {error?.response?.data?.message}</div>}
          when={!!isLoading}
        />
      }
      when={allPersonAccounts.length > 0}
    />
  )
}
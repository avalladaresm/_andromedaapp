import { notification } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useQueryClient, useIsFetching, QueryObserverResult } from 'react-query';
import { useFetchPersonAccounts, usePersonAccounts } from '../../services/account';
import { IconType } from 'antd/lib/notification';
import Table from '../../components/Table'
import { PersonColumns } from './PersonColumns'
import { AuthCookie } from '../../models/AuthCookie';
import { useAuth } from '../../services/auth';
import Mayre from 'mayre';
import { AxiosError } from 'axios';
import { PersonAccountResult } from '../../models/Account';

export default function Accounts() {

  const queryClient = useQueryClient()
  const personAccounts = usePersonAccounts(queryClient)
  const isFetching = useIsFetching()
  const auth: AuthCookie = useAuth(queryClient)
  const { data, isLoading, error }: QueryObserverResult<PersonAccountResult[], AxiosError> = useFetchPersonAccounts(auth.a_token)

  useEffect(() => {
    if ((personAccounts && personAccounts.length !== 0 || data?.length !== 0) && isFetching === 0) {
      const newRows = personAccounts?.length - data?.length
      openNotificationWithIcon('info', newRows)
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
      of={<Table columns={personColumns} data={data} />}
      or={
        <Mayre
          of={<div>Loading table data...</div>}
          or={<div>Error mate: {error?.response?.data?.message}</div>}
          when={!!isLoading}
        />
      }
      when={data?.length > 0}
    />
  )
}
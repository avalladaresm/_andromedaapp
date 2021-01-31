import React, { useEffect } from 'react';
import { useQueryClient, QueryObserverResult } from 'react-query';
import { useFetchBusinessAccounts } from '../../services/account';
import Table from '../../components/Table'
import { BusinessColumns } from './BusinessColumns'
import { AuthCookie } from '../../models/AuthCookie';
import { useAuth } from '../../services/auth';
import Mayre from 'mayre';
import { AxiosError } from 'axios';
import { BusinessAccountResult } from '../../models/Account';
import { store } from 'react-notifications-component';
import { NotificationType } from '../../models/NotificationType';

export default function Accounts() {

  const queryClient = useQueryClient()
  const auth: AuthCookie = useAuth(queryClient)
  const { data, isLoading, error, isFetchedAfterMount }: QueryObserverResult<BusinessAccountResult[], AxiosError> = useFetchBusinessAccounts(auth.a_token)

  useEffect(() => {
    if (data && data.length !== 0) {
      if (isFetchedAfterMount) openNotificationWithIcon('info', data.length)
    }
  }, [data?.length])

  const openNotificationWithIcon = (type: NotificationType, rowsFetched: number) => {
    store.addNotification({
      title: 'Fetching complete',
      message: `Business accounts, ${rowsFetched} rows fetched.`,
      type: type,
      insert: 'bottom',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 10000,
        onScreen: true
      }
    });
  };

  return (
    <Mayre
      of={<Table columns={BusinessColumns} data={data} isLoading={isLoading} />}
      or={
        <Mayre
          of={<Table columns={BusinessColumns} data={data} isLoading={isLoading} />}
          or={<div>Error mate: {error?.response?.data?.message}</div>}
          when={!!isLoading}
        />
      }
      when={data?.length > 0}
    />
  )
}
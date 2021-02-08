import React, { useEffect } from 'react';
import { useQueryClient, QueryObserverResult } from 'react-query';
import Table from '../../components/Table'
import { EmployeeColumns } from './EmployeeColumns'
import { CurrentUserAuthData } from '../../models/CurrentUserAuthData';
import { useAuth } from '../../services/auth';
import Mayre from 'mayre';
import { AxiosError } from 'axios';
import { EmployeeAccountResult } from '../../models/Employee';
import { store } from 'react-notifications-component';
import { NotificationType } from '../../models/NotificationType';
import { useFetchEmployerEmployees } from '../../services/employee';

export default function Accounts() {

  const queryClient = useQueryClient()
  const auth: CurrentUserAuthData = useAuth(queryClient)
  const { data, isLoading, error, isFetchedAfterMount }: QueryObserverResult<EmployeeAccountResult[], AxiosError> = useFetchEmployerEmployees(auth.a_t, auth?.aid)

  useEffect(() => {
    if (data && data.length !== 0) {
      if (isFetchedAfterMount) openNotificationWithIcon('info', data.length)
    }
  }, [data?.length])

  const openNotificationWithIcon = (type: NotificationType, rowsFetched: number) => {
    store.addNotification({
      title: 'Fetching complete',
      message: `Employee accounts, ${rowsFetched} rows fetched.`,
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
      of={<Table columns={EmployeeColumns} data={data} isLoading={isLoading} />}
      or={
        <Mayre
          of={<Table columns={EmployeeColumns} data={data} isLoading={isLoading} />}
          or={<div>Error mate: {error?.response?.data?.message}</div>}
          when={!!isLoading}
        />
      }
      when={data?.length > 0}
    />
  )
}
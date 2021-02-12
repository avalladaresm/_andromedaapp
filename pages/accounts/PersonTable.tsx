import React, { useEffect } from 'react';
import { QueryObserverResult } from 'react-query';
import { useFetchPersonAccounts } from '../../services/account';
import Table from '../../components/Table'
import PersonColumns from '../../columns/PersonColumns'
import Mayre from 'mayre';
import { AxiosError } from 'axios';
import { PersonAccountResult } from '../../models/Account';
import { store } from 'react-notifications-component';
import { NotificationType } from '../../models/NotificationType';

const PersonTable = (props) => {
  const { data, isLoading, error, isFetchedAfterMount }: QueryObserverResult<PersonAccountResult[], AxiosError> = useFetchPersonAccounts(props?.cookies?.a_t)

  useEffect(() => {
    if (data && data.length !== 0) {
      if (isFetchedAfterMount) openNotificationWithIcon('info', data.length)
    }
  }, [data?.length])

  const openNotificationWithIcon = (type: NotificationType, rowsFetched: number) => {
    store.addNotification({
      title: 'Fetching complete',
      message: `Person accounts, ${rowsFetched} rows fetched.`,
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
      of={<Table columns={PersonColumns} data={data} isLoading={isLoading} />}
      or={
        <Mayre
          of={<Table columns={PersonColumns} data={data} isLoading={isLoading} />}
          or={<div>Error mate: {error?.response?.data?.message}</div>}
          when={!!isLoading}
        />
      }
      when={data?.length > 0}
    />
  )
}

export default PersonTable
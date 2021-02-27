import React, { useEffect } from 'react';
import { QueryObserverResult } from 'react-query';
import Table from '../../components/Table'
import EmployeeColumns from '../../columns/EmployeeColumns'
import Mayre from 'mayre';
import { AxiosError } from 'axios';
import { EmployeeAccountResult } from '../../models/Employee';
import { store } from 'react-notifications-component';
import { NotificationType } from '../../models/NotificationType';
import { useFetchEmployerEmployees } from '../../services/employee';
import { Empty } from '../../components/Empty';

const EmployeeTable = (props) => {

  const { data, isLoading, error, isFetchedAfterMount, dataUpdatedAt }: QueryObserverResult<EmployeeAccountResult[], AxiosError> = useFetchEmployerEmployees(props?.cookies?.a_t, props?.cookies?.aid)

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
      of={
        <Table
          columns={EmployeeColumns}
          data={data}
          isLoading={isLoading}
          dataUpdatedAt={dataUpdatedAt}
        />
      }
      or={
        <Mayre
          of={<Table columns={EmployeeColumns} data={data} isLoading={isLoading} />}
          or={<Empty />}
          when={!!isLoading}
        />
      }
      when={data?.length > 0}
    />
  )
}

export default EmployeeTable
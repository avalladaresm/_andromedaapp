import React, { useContext, useEffect } from 'react';
import { QueryObserverResult } from 'react-query';
import Table from '../../components/Table'
import Mayre from 'mayre';
import { AxiosError } from 'axios';
import { store } from 'react-notifications-component';
import { NotificationType } from '../../models/NotificationType';
import { useFetchActivityLogs } from '../../services/activitylog';
import { ActivityLogResult } from '../../models/ActivityLog';
import { sortBy } from '../../utils/utils';
import { TableSettingsContext } from '../../context/TableSettingsContext'

const ActivityLogTable = (props) => {
  const { data, isLoading, error, isFetchedAfterMount, dataUpdatedAt }: QueryObserverResult<ActivityLogResult[], AxiosError> = useFetchActivityLogs(props?.cookies?.a_t)
  const tableSettings = useContext(TableSettingsContext)

  useEffect(() => {
    if (data && data.length !== 0) {
      if (isFetchedAfterMount) openNotificationWithIcon('info', data.length)
    }
  }, [data?.length])

  const openNotificationWithIcon = (type: NotificationType, rowsFetched: number) => {
    store.addNotification({
      title: 'Fetching complete',
      message: `Activity logs, ${rowsFetched} rows fetched.`,
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
          columns={tableSettings.activityLogColumns}
          data={data?.concat().sort(sortBy('createdAt', 'desc'))}
          isLoading={isLoading}
          dataUpdatedAt={dataUpdatedAt}
        />
      }
      or={
        <Mayre
          of={<Table columns={tableSettings.activityLogColumns} data={data} isLoading={isLoading} />}
          or={<div>Error mate: {error?.response?.data?.message}</div>}
          when={!!isLoading}
        />
      }
      when={data?.length > 0}
    />
  )
}


export default ActivityLogTable
import React, { useContext } from 'react';
import { QueryObserverResult } from 'react-query';
import Table from '../../components/Table'
import Mayre from 'mayre';
import { AxiosError } from 'axios';
import { useFetchAuthLogs } from '../../services/authlog';
import { AuthLogResult } from '../../models/AuthLog';
import { sortBy } from '../../utils/utils';
import { TableSettingsContext } from '../../context/TableSettingsContext';

const RecentAuthLogRecords = (props) => {

  const { data, isLoading, error }: QueryObserverResult<AuthLogResult[], AxiosError> = useFetchAuthLogs(props?.cookies?.a_t)
  const tableSettings = useContext(TableSettingsContext)

  return (
    <Mayre
      of={
        <Table
          columns={tableSettings.recentAuthLogRecordsColumns}
          data={data?.slice(data.length - 10, data.length).concat().sort(sortBy('createdAt', 'desc'))}
          isLoading={isLoading} showPagination={false}
        />
      }
      or={
        <Mayre
          of={<Table columns={tableSettings.recentAuthLogRecordsColumns} data={data?.slice(data.length - 10, data.length).concat().sort(sortBy('createdAt', 'desc'))} isLoading={isLoading} showPagination={false} />}
          or={<div>Error mate: {error?.response?.data?.message}</div>}
          when={!!isLoading}
        />
      }
      when={data?.length > 0}
    />
  )
}

export default RecentAuthLogRecords
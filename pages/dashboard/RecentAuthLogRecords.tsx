import React from 'react';
import { QueryObserverResult } from 'react-query';
import Table from '../../components/Table'
import RecentAuthLogRecordsColumns from '../../columns/RecentAuthLogRecordsColumns'
import Mayre from 'mayre';
import { AxiosError } from 'axios';
import { useFetchAuthLogs } from '../../services/authlog';
import { AuthLogResult } from '../../models/AuthLog';
import { sortBy } from '../../utils/utils';

const RecentAuthLogRecords = (props) => {

  const { data, isLoading, error }: QueryObserverResult<AuthLogResult[], AxiosError> = useFetchAuthLogs(props?.cookies?.a_t)

  return (
    <Mayre
      of={
        <Table
          columns={RecentAuthLogRecordsColumns}
          data={data?.slice(data.length - 10, data.length).concat().sort(sortBy('createdAt', 'desc'))}
          isLoading={isLoading} showPagination={false}
        />
      }
      or={
        <Mayre
          of={<Table columns={RecentAuthLogRecordsColumns} data={data} isLoading={isLoading} showPagination={false} />}
          or={<div>Error mate: {error?.response?.data?.message}</div>}
          when={!!isLoading}
        />
      }
      when={data?.length > 0}
    />
  )
}

export default RecentAuthLogRecords
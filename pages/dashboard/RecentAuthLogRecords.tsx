import React from 'react';
import { useQueryClient, QueryObserverResult } from 'react-query';
import Table from '../../components/Table'
import { RecentAuthLogRecordsColumns } from './RecentAuthLogRecordsColumns'
import { CurrentUserAuthData } from '../../models/CurrentUserAuthData';
import { useAuth } from '../../services/auth';
import Mayre from 'mayre';
import { AxiosError } from 'axios';
import { useFetchAuthLogs } from '../../services/authlog';
import { AuthLogResult } from '../../models/AuthLog';
import { sortBy } from '../../utils/utils';

export default function RecentAuthLogRecords() {

  const queryClient = useQueryClient()
  const auth: CurrentUserAuthData = useAuth(queryClient)
  const { data, isLoading, error }: QueryObserverResult<AuthLogResult[], AxiosError> = useFetchAuthLogs(auth.a_t)

  return (
    <Mayre
      of={<Table columns={RecentAuthLogRecordsColumns} data={data?.slice(data.length-10, data.length).concat().sort(sortBy('createdAt', 'desc'))} isLoading={isLoading} />}
      or={
        <Mayre
          of={<Table columns={RecentAuthLogRecordsColumns} data={data} isLoading={isLoading} />}
          or={<div>Error mate: {error?.response?.data?.message}</div>}
          when={!!isLoading}
        />
      }
      when={data?.length > 0}
    />
  )
}
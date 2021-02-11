import axios, { AxiosError } from "axios"
import { QueryObserverResult, useQuery } from "react-query"
import { ActivityLogResult } from "../models/ActivityLog"

const FetchActivityLogs = async (accessToken: string): Promise<ActivityLogResult[]> => {
  const activityLogs = await axios.get(`${process.env.API_BASE_URL}/activitylog/getActivityLogs`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  return activityLogs.data
}

export const useFetchActivityLogs = (accessToken: string): QueryObserverResult<ActivityLogResult[], AxiosError> => {
  return useQuery('ActivityLogs', async () => await FetchActivityLogs(accessToken), { refetchOnMount: false })
}
import axios, { AxiosError } from "axios"
import { QueryObserverResult, useQuery } from "react-query"
import { ActivityLogResult } from "../models/ActivityLog"
import { ActivityLogType } from "../models/ActivityLogType"
import { AuthLog } from "../models/AuthLog"

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

export const createActivityLog = async (accessToken: string, username: string, typeId: ActivityLogType, data: string, platform: AuthLog) => {
  try {
    const res = await axios.post(`${process.env.API_BASE_URL}/activitylog/createActivityLog`, {
      data: {
        username: username, typeId: typeId, description: '', data: data, ...platform
      }
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    return res
  } catch (e) {
    throw e
  }
}
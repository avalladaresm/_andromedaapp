import axios, { AxiosError } from "axios"
import { QueryObserverResult, useQuery } from "react-query"
import { AuthLogResult } from "../models/AuthLog"

const FetchAuthLogs = async (accessToken: string): Promise<AuthLogResult[]> => {
  const authLogs = await axios.get(`${process.env.API_BASE_URL}/authlog/getAllAuthLogs`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  return authLogs.data
}

export const useFetchAuthLogs = (accessToken: string): QueryObserverResult<AuthLogResult[], AxiosError> => {
  return useQuery('AuthLogs', async () => await FetchAuthLogs(accessToken), { refetchOnMount: false })
}
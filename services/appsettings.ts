import { QueryClient } from "react-query"
import { AuthLog } from "../models/AuthLog"

export const setPlatformSettings = (queryClient: QueryClient, platform: AuthLog) => {
  queryClient.setQueryData('Platform', platform)
}

export const usePlatformSettings = (queryClient: QueryClient) => {
  const res: AuthLog = queryClient.getQueryData('Platform')
  return res
}

export const setQueryTableSettings = (queryClient: QueryClient, tableSettings: any) => {
  queryClient.setQueryData('TableSettings', tableSettings)
}

export const useQueryTableSettings = (queryClient: QueryClient) => {
  const res = queryClient.getQueryData('TableSettings')
  return res
}
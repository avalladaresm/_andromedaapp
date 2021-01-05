import axios from "axios"
import { QueryClient } from "react-query"

export const FetchLogs = (queryClient: QueryClient) => {
  const logs = queryClient.fetchQuery('Logs', async () => {
    return await axios.get('http://localhost:3000/logs')
  })
  return logs
}

export const useLogs = (queryClient: QueryClient) => {
  return queryClient.getQueryData('Logs')
}
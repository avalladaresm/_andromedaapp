import axios from 'axios'
import { QueryClient } from 'react-query'

export const FetchUsers = (queryClient: QueryClient) => {
  const users = queryClient.fetchQuery('Users', async () => {
    return await axios.get(`${process.env.API_BASE_URL}/users`)
  })
  return users
}

export const useUsers = (queryClient: QueryClient) => {
  return queryClient.getQueryData('Users')
}
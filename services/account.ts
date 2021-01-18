import axios from 'axios'
import { QueryClient } from 'react-query'

export const FetchAccounts = async (queryClient: QueryClient) => {
  const accounts = await queryClient.fetchQuery('Accounts', async () => {
    const r = await axios.get('http://localhost:3000/account/getAllAccounts')
    return r.data
  })
  return accounts
}

export const useAccounts = (queryClient: QueryClient) => {
  return queryClient.getQueryData('Accounts')
}

export const FetchPersonAccounts = async (queryClient: QueryClient) => {
  const accounts = await queryClient.fetchQuery('PersonAccounts', async () => {
    const r = await axios.get('http://localhost:3000/account/getAllPersonAccounts')
    return r.data
  })
  return accounts
}

export const usePersonAccounts = (queryClient: QueryClient) => {
  return queryClient.getQueryData('PersonAccounts')
}

export const FetchBusinessAccounts = async (queryClient: QueryClient) => {
  const accounts = await queryClient.fetchQuery('BusinessAccounts', async () => {
    const r = await axios.get('http://localhost:3000/account/getAllBusinessAccounts')
    return r.data
  })
  return accounts
}

export const useBusinessAccounts = (queryClient: QueryClient) => {
  return queryClient.getQueryData('BusinessAccounts')
}
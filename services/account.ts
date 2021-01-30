import axios, { AxiosError } from 'axios'
import { QueryClient, QueryObserverResult, useQuery } from 'react-query'
import { CreateBusinessAccount, CreatePersonAccount } from '../models/Account'

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

const FetchPersonAccounts = async (accessToken: string) => {
  return await axios.get('http://localhost:3000/account/getAllPersonAccounts', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
}

export const useFetchPersonAccounts = (accessToken: string): QueryObserverResult<any[], AxiosError> => {
  return useQuery('PersonAccounts', async () => await FetchPersonAccounts(accessToken))
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

export const createBusinessAccount = async (values: CreateBusinessAccount) => {
  try {
    const res = await axios.post('http://localhost:3000/account/createBusinessAccount', {
      data: {
        name: values.name, username: values.username, password: 'defaultp',
        email: values.email, phoneNumber: values.phoneNumber,
        streetAddress1: values.streetAddress1, streetAddress2: values.streetAddress2,
        cityId: values.cityId, stateId: values.stateId, countryId: values.countryId,
        zip: values.zip, coordinates: values.coordinates, accountTypeId: values.accountTypeId,
      }
    })

    return res
  } catch (e) {
    throw e
  }
}

export const createPersonAccount = async (values: CreatePersonAccount) => {
  try {
    const res = await axios.post('http://localhost:3000/account/createPersonAccount', {
      data: {
        name: values.name, surname: values.surname, username: values.username, password: 'defaultp',
        email: values.email, phoneNumber: values.phoneNumber,
        streetAddress1: values.streetAddress1, streetAddress2: values.streetAddress2,
        cityId: values.cityId, stateId: values.stateId, countryId: values.countryId,
        zip: values.zip, coordinates: values.coordinates, accountTypeId: values.accountTypeId,
      }
    })

    return res
  } catch (e) {
    throw e
  }
}
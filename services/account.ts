import axios, { AxiosError } from 'axios'
import { QueryClient, QueryObserverResult, useQuery } from 'react-query'
import { BusinessAccountResult, CreateBusinessAccount, CreatePersonAccount, PersonAccountResult } from '../models/Account'
import { CurrentUserAuthData } from '../models/CurrentUserAuthData'

export const FetchAccountRole = async (queryClient: QueryClient, cookieData: CurrentUserAuthData): Promise<CurrentUserAuthData> => {
  try {
    const completeAuthData = await queryClient.fetchQuery('Auth', async () => {
      const accountRole = await axios.get(`${process.env.API_BASE_URL}/account/${cookieData.u}/account-roles`, {
        headers: {
          'Authorization': `Bearer ${cookieData.a_t}`
        }
      })
      return { ...cookieData, r: accountRole.data.roles, aid: accountRole.data.accountId }
    })
    return completeAuthData
  }
  catch (e) {
    const res: CurrentUserAuthData = { ...cookieData, error: e }
    return res
  }
}

export const FetchAccounts = async (queryClient: QueryClient) => {
  const accounts = await queryClient.fetchQuery('Accounts', async () => {
    const r = await axios.get(`${process.env.API_BASE_URL}/account/getAllAccounts`)
    return r.data
  })
  return accounts
}

export const useAccounts = (queryClient: QueryClient) => {
  return queryClient.getQueryData('Accounts')
}

const FetchPersonAccounts = async (accessToken: string): Promise<PersonAccountResult[]> => {
  const personAccounts = await axios.get(`${process.env.API_BASE_URL}/account/getAllPersonAccounts`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  return personAccounts.data
}

export const useFetchPersonAccounts = (accessToken: string): QueryObserverResult<PersonAccountResult[], AxiosError> => {
  return useQuery('PersonAccounts', async () => await FetchPersonAccounts(accessToken), { refetchOnMount: false })
}

export const usePersonAccounts = (queryClient: QueryClient) => {
  return queryClient.getQueryData<PersonAccountResult[]>('PersonAccounts')
}

const FetchBusinessAccounts = async (accessToken: string): Promise<BusinessAccountResult[]> => {
  const businessAccounts = await axios.get(`${process.env.API_BASE_URL}/account/getAllBusinessAccounts`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  return businessAccounts.data
}

export const useFetchBusinessAccounts = (accessToken: string): QueryObserverResult<BusinessAccountResult[], AxiosError> => {
  return useQuery('BusinessAccounts', async () => await FetchBusinessAccounts(accessToken), { refetchOnMount: false })
}

export const useBusinessAccounts = (queryClient: QueryClient) => {
  return queryClient.getQueryData('BusinessAccounts')
}

export const createBusinessAccount = async (values: CreateBusinessAccount) => {
  try {
    const res = await axios.post(`${process.env.API_BASE_URL}/account/createBusinessAccount`, {
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
    const res = await axios.post(`${process.env.API_BASE_URL}/account/createPersonAccount`, {
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
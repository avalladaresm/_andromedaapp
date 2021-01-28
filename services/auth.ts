import axios from "axios"
import { QueryClient, useMutation } from "react-query"
import { AccountLogIn, AccountSignUp } from "../models/Auth"
import { AuthCookie } from "../models/AuthCookie"
import { cookieNames, deleteCookie } from "../utils/utils"

export const useDoLogin = () => {
  return useMutation((values: AccountLogIn) => {
    return axios.post('http://localhost:3000/auth/login', {
      data: {
        username: values.username, password: values.password
      }
    })
  })
}

export const signup = async (values: AccountSignUp) => {
  try {
    const signup = await axios.post('http://localhost:3000/auth/signup', {
      data: {
        name: values.name, surname: values.username,
        username: values.username, password: values.password,
        email: values.email, accountTypeId: values.accountTypeId
      }
    })

    return signup
  } catch (e) {
    throw e
  }
}

export const useDoLogout = (queryClient: QueryClient, router, cookie: string) => {
  queryClient.clear()
  router.push('/auth/login')
  cookieNames(cookie).map(c => {
    document.cookie = deleteCookie(c)
  })
}

export const getAccountRole = async (queryClient: QueryClient, cookieData: AuthCookie) => {
  try {
    const completeAuthData = await queryClient.fetchQuery('Auth', async () => {
      const accountRole = await axios.get(`http://localhost:3000/auth/${cookieData.uid}/account-role`)
      return {...cookieData, role: accountRole.data.role, accountId: accountRole.data.accountId}
    })
    return completeAuthData
  }
  catch (e) {
    throw e
  }
}

export const setAuth = (queryClient: QueryClient, authData: AuthCookie) => {
  queryClient.setQueryData('Auth', authData)
}

export const useAuth = (queryClient: QueryClient) => {
  const res: AuthCookie = queryClient.getQueryData('Auth')
  return res
}
import { message } from "antd"
import axios, { AxiosError } from "axios"
import { QueryClient, useMutation } from "react-query"
import { AccountLogIn, AccountSignUp } from "../models/Auth"
import { AuthCookie } from "../models/AuthCookie"
import { cookieNames, deleteCookie } from "../utils/utils"

export const useDoLogin = (queryClient: QueryClient, router) => {
  return useMutation((values: AccountLogIn) => {
    return axios.post(`${process.env.API_BASE_URL}/auth/login`, {
      data: {
        username: values.username, password: values.password
      }
    })
  }, {
    onSuccess: (data, variables) => {
      const loginRes = data.data.split('|')
      const authData = { uid: loginRes[0], a_token: loginRes[1], role: loginRes[2], accountId: loginRes[3] }
      setAuth(queryClient, authData)
      document.cookie = 'uid=' + authData.uid
      document.cookie = 'a_token=' + authData.a_token
      message.success(`Login success, whoo! Welcome ${variables.username}`)
      router.push('/')
    }, onError: (error: AxiosError) => {
      message.error(`Login failed! ${error.response.data.message}`)
      console.log('erorrr', error)
    }
  })
}

export const signup = async (values: AccountSignUp) => {
  try {
    const signup = await axios.post(`${process.env.API_BASE_URL}/auth/signup`, {
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

export const setAuth = (queryClient: QueryClient, authData: AuthCookie) => {
  queryClient.setQueryData('Auth', authData)
}

export const useAuth = (queryClient: QueryClient) => {
  const res: AuthCookie = queryClient.getQueryData('Auth')
  return res
}
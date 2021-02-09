import { message } from "antd"
import axios, { AxiosError } from "axios"
import { QueryClient, useMutation } from "react-query"
import { AccountLogIn, AccountSignUp } from "../models/Auth"
import { AuthLog } from "../models/AuthLog"
import { CurrentUserAuthData } from "../models/CurrentUserAuthData"
import { cookieNames, deleteCookie } from "../utils/utils"

export const useDoLogin = (queryClient: QueryClient, router) => {
  return useMutation((values: AccountLogIn) => {
    return axios.post(`${process.env.API_BASE_URL}/auth/login`, {
      data: {
        username: values.username, password: values.password, platform: values.platform
      }
    })
  }, {
    onSuccess: (data, variables) => {
      const loginRes: CurrentUserAuthData = data.data
      const authData = { u: loginRes.u, a_t: loginRes.a_t, r: loginRes.r, aid: loginRes.aid }
      setAuth(queryClient, authData)
      document.cookie = 'u=' + authData.u
      document.cookie = 'a_t=' + authData.a_t
      message.success(`Login success, whoo! Welcome ${variables.username}`)
      router.push('/')
    }, onError: (error: AxiosError) => {
      message.error(`Login failed! ${error.response.data === 'InternalServerError' ? 'Please, try again in a few minutes.' : error.response.data.message}`)
      console.log('erorrr', error.response.data)
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

export const useDoLogout = (queryClient: QueryClient, router, cookie: string, username: string, platform: AuthLog) => {
  queryClient.clear()
  router.push('/auth/login')
  cookieNames(cookie).map(c => {
    document.cookie = deleteCookie(c)
  })

  return axios.post(`${process.env.API_BASE_URL}/auth/logout`, {
    data: {
      username: username, authlog: platform
    }
  })
}

export const setAuth = (queryClient: QueryClient, authData: CurrentUserAuthData) => {
  queryClient.setQueryData('Auth', authData)
}

export const useAuth = (queryClient: QueryClient) => {
  const res: CurrentUserAuthData = queryClient.getQueryData('Auth')
  return res
}
import axios from "axios"
import { QueryClient, useMutation } from "react-query"
import { cookieNames, deleteCookie, documentCookieJsonify } from "../utils/utils"

interface ILogin {
  username: string
  password: string
}

export const useDoLogin = () => {
  return useMutation((values: ILogin) => {
    return axios.post('http://localhost:3000/auth/login', {
      username: values.username, password: values.password
    })
  })
}

export const useDoLogout = (queryClient: QueryClient, router, cookie: string) => {
  queryClient.clear()
  router.push('/auth/login')
  cookieNames(cookie).map(c => {
    document.cookie = deleteCookie(c)
  })
}

export const setAuth = (queryClient: QueryClient, authData) => {
  queryClient.setQueryData('Auth', authData)
}

export const useAuth = (queryClient: QueryClient) => {
  return queryClient.getQueryData('Auth')
}
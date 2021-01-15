import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import '../styles/globals.css'
import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { ReactQueryDevtools } from 'react-query/devtools'
import { getAccountRole, setAuth, useAuth } from '../services/auth';
import UserContext from '../context/UserContext';
import { cookieNames, cookieValues, documentCookieJsonify } from '../utils/utils';
import { AuthCookie } from '../models/AuthCookie';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: Infinity
    },
  },
})

function MyApp({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState<string>('undefined')
  const [currentUserRole, setCurrentUserRole] = useState<string>('undefined')
  const router = useRouter()
  const auth: AuthCookie = useAuth(queryClient)

  useEffect(() => {
    const f = async () => {
      try {
        const accountRole = currentUser ?? await getAccountRole(currentUser)
        setCurrentUserRole(accountRole?.role)
        const additionalAuthData = { ...auth, role: accountRole }
        setAuth(queryClient, additionalAuthData)
      }
      catch (e) {
        throw e
      }
    }
    f()
  }, [currentUser])

  useEffect(() => {
    const parsedCookie: AuthCookie = documentCookieJsonify(document.cookie)

    const isParsedCookieUnd = Object.values(parsedCookie).includes(undefined)

    const authData = auth ?? { data: parsedCookie }

    auth ?? isParsedCookieUnd ? undefined : (
      setAuth(queryClient, parsedCookie),
      setCurrentUser(parsedCookie.uid)
    )

    const listenCookieChange = (callback, interval) => {
      let cookieInQuery = authData?.data?.uid

      if (cookieInQuery) {
        let timer = setInterval(() => {
          let cookieExists = document.cookie.includes(cookieInQuery)
          if (!cookieExists) {
            try {
              callback();
              clearInterval(timer)
              queryClient.clear()
            } finally {
              cookieInQuery = authData?.data?.uid
            }
          }
        }, interval);
      }
      else {
        message.warning('DEBUG: no existing session.')
      }
    }

    listenCookieChange(() => {
      message.error('You are not logged in!')
      router.push('/auth/login')
    }, 3000);

  }, [])

  useEffect(() => {
    const parsedCookie: AuthCookie = documentCookieJsonify(document.cookie)

    if ((!parsedCookie.uid || !parsedCookie.a_token) && router.pathname !== '/auth/signup') router.push('/auth/login')
  }, [])

  useEffect(() => {
    if (currentUser === undefined && router.pathname !== '/auth/signup') router.push('/auth/login')
  }, [router.pathname])

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ currentUser: currentUser, currentUserRole: currentUserRole }}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </UserContext.Provider>
    </QueryClientProvider>
  )
}

export default MyApp

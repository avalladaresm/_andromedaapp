import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import '../styles/globals.css'
import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { ReactQueryDevtools } from 'react-query/devtools'
import { setAuth, useAuth } from '../services/auth';
import UserContext from '../context/UserContext';

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

  const router = useRouter()
  const auth = useAuth(queryClient)

  useEffect(() => {
    const parsedCookie = {
      uid: document.cookie.split(';')[1]?.split('=')[1],
      a_token: document.cookie.split(';')[0]?.split('=')[1]
    }

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
      message.error('Session not found.')
      router.push('/auth/login')
    }, 3000);

  }, [])

  useEffect(() => {
    const parsedCookie = {
      uid: document.cookie.split(';')[0]?.split('=')[1],
      a_token: document.cookie.split(';')[1]?.split('=')[1]
    }

    if (!parsedCookie.uid || !parsedCookie.a_token) router.push('/auth/login')
  }, [])

  useEffect(() => {
    if (currentUser === undefined) router.push('/auth/login')
  }, [router.pathname])

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ currentUser: currentUser }}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </UserContext.Provider>
    </QueryClientProvider>
  )
}

export default MyApp

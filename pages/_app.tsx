import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import '../styles/globals.css'
import 'nprogress/nprogress.css'
import 'react-notifications-component/dist/theme.css'

import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { ReactQueryDevtools } from 'react-query/devtools'
import { useAuth } from '../services/auth';
import { getAccountRole } from '../services/account';
import { documentCookieJsonify } from '../utils/utils';
import { AuthCookie } from '../models/AuthCookie';
import NProgress from 'nprogress'
import ReactNotification from 'react-notifications-component'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: Infinity
    },
  },
})

function MyApp({ Component, pageProps }) {
  const [currentAuth, setCurrentAuth] = useState<AuthCookie>(undefined)
  const [resolved, setResolved] = useState<boolean>(false)

  const router = useRouter()
  const auth: AuthCookie = useAuth(queryClient)

  useEffect(() => {
    const f = async () => {
      try {
        await getAccountRole(queryClient, currentAuth)
        setResolved(true)
      }
      catch (e) {
        throw e
      }
    }
    currentAuth && f()
  }, [currentAuth])

  useEffect(() => {
    const parsedCookie: AuthCookie = documentCookieJsonify(document.cookie)

    const isParsedCookieUnd = Object.values(parsedCookie).includes(undefined)

    const authData = auth ?? parsedCookie

    auth ?? isParsedCookieUnd ? undefined : setCurrentAuth(parsedCookie)

    const listenCookieChange = (callback, interval) => {
      let cookieInQuery = authData?.uid

      if (cookieInQuery) {
        let timer = setInterval(() => {
          let cookieExists = document.cookie.includes(cookieInQuery)
          if (!cookieExists) {
            try {
              callback();
              clearInterval(timer)
              queryClient.clear()
            } finally {
              cookieInQuery = authData?.uid
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

  useEffect(() => { }, [resolved])

  useEffect(() => {
    NProgress.configure({showSpinner: true})
    let routeChangeStart = () => NProgress.start();
    let routeChangeComplete = () => NProgress.done();

    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeComplete);
    router.events.on('routeChangeError', routeChangeComplete);
    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeComplete', routeChangeComplete);
      router.events.off('routeChangeError', routeChangeComplete);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactNotification />
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp

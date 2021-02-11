import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import '../styles/globals.css'
import 'nprogress/nprogress.css'
import 'react-notifications-component/dist/theme.css'

import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';
import { ReactQueryDevtools } from 'react-query/devtools'
import { useAuth } from '../services/auth';
import { FetchAccountRole } from '../services/account';
import { deleteSpecificCookies, documentCookieJsonify, getPlatformData } from '../utils/utils';
import { CurrentUserAuthData } from '../models/CurrentUserAuthData';
import NProgress from 'nprogress'
import ReactNotification, { store } from 'react-notifications-component'
import IPData from 'ipdata';
import { setPlatformSettings } from '../services/appsettings';
const ipdata = new IPData(`${process.env.IPDATA_APIKEY}`);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: Infinity
    },
  },
})

function MyApp({ Component, pageProps }) {
  const [currentAuth, setCurrentAuth] = useState<CurrentUserAuthData>(undefined)
  const [resolved, setResolved] = useState<boolean>(false)

  const router = useRouter()
  const auth: CurrentUserAuthData = useAuth(queryClient)

  useEffect(() => {
    currentAuth && (async () => {
      try {
        const res: CurrentUserAuthData = await FetchAccountRole(queryClient, currentAuth)
        if (res?.error) {
          router.push('/auth/login')
          deleteSpecificCookies(['u', 'a_t'])
        }
        setResolved(true)
      }
      catch (e) {
        throw e
      }
    })()
  }, [currentAuth])

  useEffect(() => {
    const parsedCookie: CurrentUserAuthData = documentCookieJsonify(document.cookie)
    const isParsedCookieUnd = parsedCookie.u === '' || parsedCookie.a_t === '' ? false : true
    const authData = auth ?? parsedCookie

    auth ?? !isParsedCookieUnd ? undefined : setCurrentAuth({ u: parsedCookie.u, a_t: parsedCookie.a_t })

    const listenCookieChange = (callback, interval) => {
      let cookieInQuery = authData?.u

      if (cookieInQuery) {
        let timer = setInterval(() => {
          let cookieExists = document.cookie.includes(cookieInQuery)
          if (!cookieExists) {
            try {
              callback();
              clearInterval(timer)
              queryClient.clear()
            } finally {
              cookieInQuery = authData?.u
            }
          }
        }, interval);
      }
      else {
        store.addNotification({
          message: 'DEBUG: no existing session.',
          type: 'warning',
          insert: 'bottom',
          container: 'top-center',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      }
    }

    listenCookieChange(() => {
      store.addNotification({
        message: 'You are not logged in!',
        type: 'danger',
        insert: 'bottom',
        container: 'top-center',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
      router.push('/auth/login')
    }, 3000);

  }, [])

  useEffect(() => {
    const parsedCookie: CurrentUserAuthData = documentCookieJsonify(document.cookie)

    if ((!parsedCookie.u || !parsedCookie.a_t) && router.pathname !== '/auth/signup') router.push('/auth/login')
  }, [])

  useEffect(() => { }, [resolved])

  useEffect(() => {
    NProgress.configure({ showSpinner: true })
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

  useEffect(() => {
    if (!!auth?.u && router.pathname === '/') router.push('/dashboard')
  }, [auth?.u])

  useEffect(() => {
    (async () => {
      const ip = await ipdata.lookup()
      let platform = getPlatformData()
      platform = { ...platform, ip: ip.ip }
      setPlatformSettings(queryClient, platform)
    })()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ReactNotification />
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp

import '../less/antd-custom.less' // includes antd style and our customization
import { useEffect, useState } from 'react'
import { createWrapper } from 'next-redux-wrapper'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { GetSignedInUserFromCookie, GetWantedPath } from '../services/auth'
import Cookies from 'js-cookie'
import store from '../store'
import { SignInStatus } from '../models/SignInStatus'
import { GetAllUsers } from '../services/users'
import { LangProvider } from '../utils/LangContext'
import { CreateRouteChangeLog } from '../services/logs'
import moment from 'moment'
import { IsPageLoading } from '../services/global'

const Start = ({ Component, pageProps }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [currentPath, setCurrentPath] = useState(router.pathname)
  const [newPath, setNewPath] = useState(router.pathname)
  const signInStatus = useSelector(state => state.auth.signInStatus)
  const wantedPath = useSelector(state => state.auth.wantedPath)
  const loggedInUser = useSelector(state => state.auth.loggedInUser.userName && state.auth.loggedInUser.userName)
  const isPageLoading = useSelector(state => state.global.isPageLoading)

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      console.log('saving current path', router.pathname)
      setCurrentPath(router.pathname)
      dispatch(IsPageLoading(true))
    })

    router.events.on('routeChangeComplete', () => {
      console.log('saving new path', router.pathname)
      setNewPath(router.pathname)
      dispatch(IsPageLoading(false))
    })

    const paths = {
      fromPath: currentPath,
      newPath: newPath
    }

    if (!loggedInUser) {
      try {
        const userDataInCookie = JSON.parse(Cookies.get('currentUser'))
        console.log(userDataInCookie)
        dispatch(CreateRouteChangeLog({
          userName: userDataInCookie.userName,
          date: moment(),
          type: 'logged in from cookie',
          description: 'changing route',
          data: JSON.stringify(paths)
        }))
      } catch (e) {
        console.log(e.message)
      }
    } else {
      dispatch(CreateRouteChangeLog({
        userName: loggedInUser,
        date: moment(),
        type: 'logged in from redux',
        description: 'changing route',
        data: JSON.stringify(paths)
      }))
    }
  }, [loggedInUser, isPageLoading])

  useEffect(() => {
    const userDataInCookie = Cookies.get('currentUser')
    if (userDataInCookie === 'undefined') {
      console.log('whay')
    } else {
      if (userDataInCookie && signInStatus !== SignInStatus.SIGN_IN_SUCCESS) {
        dispatch(GetSignedInUserFromCookie(userDataInCookie))
        if (router.pathname === '/auth/login') {
          dispatch(GetAllUsers())
          router.push('/dashboard')
        } else {
          dispatch(GetAllUsers())
          if (router.pathname === '/') {
            router.push('/dashboard')
          }
        }
      } else if (signInStatus === SignInStatus.SIGN_IN_SUCCESS) {
        dispatch(GetAllUsers())
        if (wantedPath) {
          router.push(wantedPath)
        } else {
          router.push('/dashboard')
        }
      } else {
        dispatch(GetWantedPath(router.pathname))
        router.push('/auth/login')
      }
    }
  }, [signInStatus])

  return (
    <LangProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </LangProvider>
  )
}

const makestore = () => store
const wrapper = createWrapper(makestore)
export default wrapper.withRedux(Start)

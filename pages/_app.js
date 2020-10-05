// includes antd style and our customization
import '../less/antd-custom.less'
import { useEffect } from 'react'
import { createWrapper } from 'next-redux-wrapper'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router'
import store from '../store'
import moment from 'moment'
import { ReactQueryDevtools } from 'react-query-devtools'
import { useCreateLog } from '../services/logs'
import { GetCookieAuth } from '../services/auth'
import { queryCache } from 'react-query'
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';
import { useIsPageLoading } from '../services/global'
import { LogTypes } from '../models/LogTypes'
import { UserSettingsProvider } from '../utils/UserSettingsContext'

const Start = ({ Component, pageProps }) => {
	const router = useRouter()
	const [createLog] = useCreateLog()
	const [cookies] = useCookies(['currentUser']);
	const [isPageLoading] = useIsPageLoading()

	useEffect(() => {
		GetCookieAuth(cookies)
		const cookieSize = Object.keys(cookies).length
		if (!cookieSize) {
			router.push('/auth/login')
		} else {
			if (router.pathname === '/auth/login') {
				router.push('/dashboard')
			} else {
				if (router.pathname === '/') {
					router.push('/dashboard')
				}
			}
			createLog({
				userName: cookies.currentUser && cookies.currentUser.userName,
				date: moment(),
				type: LogTypes.COOKIE_SIGNIN,
				description: 'Signed in from cookie.',
				data: JSON.stringify({})
			})
		}	
	}, [cookies])

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
			console.log('yo wtf1')
			isPageLoading(true,{
				onSuccess: (data) => {
					queryCache.setQueryData('GlobalSettings', {isPageLoading: data})
				}
			})
			createLog({
				userName: cookies.currentUser && cookies.currentUser.userName,
				date: moment(),
				type: LogTypes.ROUTE_CHANGE,
				description: `Page changing from ${router.pathname}`,
				data: JSON.stringify({})
			})
    })

    router.events.on('routeChangeComplete', () => {
			console.log('yo wtf2', router)
			isPageLoading(false,{
				onSuccess: (data) => {
					queryCache.setQueryData('GlobalSettings', {isPageLoading: data})
				}
			})
			createLog({
				userName: cookies.currentUser && cookies.currentUser.userName,
				date: moment(),
				type: LogTypes.ROUTE_CHANGE,
				description: `Page changed to ${router.pathname}`,
				data: JSON.stringify({})
			})
		})
  }, [router.pathname])

  return (
		<CookiesProvider>
			<UserSettingsProvider currentUser={cookies.currentUser?.userName}>
				<Provider store={store}>
					<Component {...pageProps} />
					<ReactQueryDevtools initialIsOpen />
				</Provider>
			</UserSettingsProvider>
		</CookiesProvider>
  )
}

const makestore = () => store
const wrapper = createWrapper(makestore)
export default wrapper.withRedux(Start)

import { createContext, useContext, useState, useEffect } from 'react'
import { GetUserSettings } from '../services/userSettings'
import { LangProvider } from './LangContext'
import Loading from '../components/Loading'

const UserSettingsContext = createContext()

export function useUserSettingsContext () {
  return useContext(UserSettingsContext)
}

export function UserSettingsProvider (props) {
	const [data, setData] = useState({})
	const dataSize = Object.keys(data).length

	useEffect(() => {
		const g = async () => {
			const res = await GetUserSettings(props?.currentUser)
			setData(res.data)
		}
		g()
	}, [props?.currentUser])

  return (
		<UserSettingsContext.Provider value={data}>
			{dataSize < 1 ? 
				<div style={{ textAlign: 'center' }}>
					<Loading loadingUserPreferences='Loading your user preferences...' />
				</div> :
				<LangProvider data={data}>
					{props.children}
				</LangProvider>
			} 
		</UserSettingsContext.Provider>
  )
}

import Icon from '@ant-design/icons'
import { Dropdown, Menu, message } from 'antd'
import { EnFlag, EsFlag, Translate } from './Icons'
import { useLangUpdate, useLang } from '../utils/LangContext'
import { useCreateLog } from '../services/logs'
import moment from 'moment'
import { LogTypes } from '../models/LogTypes'
import { useRouter } from 'next/router'
import { useUpdateLanguageSetting, useUserSettings } from '../services/userSettings'
import { queryCache } from 'react-query'
import { ReactNode } from 'react'
import { useIsPageLoading } from '../services/global'

const LangMenu: React.FC<ReactNode> = (props) => {
  const lang = useLang()
  const toggleLang = useLangUpdate()
  const router = useRouter()
	const [updateLanguageSetting] = useUpdateLanguageSetting()
  const [createLog] = useCreateLog()
	const userSettings = useUserSettings()
	const [isPageLoading] = useIsPageLoading()

  const changeLanguage = () => {
		toggleLang()
		const userId = userSettings.data?.userId
		const language = userSettings.data?.language

		isPageLoading(true, {
			onSuccess: (data) => {
				queryCache.setQueryData('GlobalSettings', {isPageLoading: data})
			}
		})
		
		updateLanguageSetting({userId: userId, language: language === 'es' ? 'en' : 'es'}, {	
			onSuccess: (data) => {
				queryCache.invalidateQueries('UserSettings', { language: language === 'es' ? 'en' : 'es', refetchActive: false })
				createLog({
					userName: props.currentUser,
					date: moment(),
					type: LogTypes.LANGUAGE_CHANGE,
					description: `Language changed from ${lang} to ${lang === 'es' ? 'en' : 'es'}`,
					data: JSON.stringify({result: data.res})
				}, {
					onSuccess: () => {
						router.reload()
					}
				})
			},
			onError: () => {
				message.error('Error changing the language')
			}
		})
  }

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item
            key='0'
            onClick={() => { changeLanguage() }}
            disabled={lang && lang === 'en'}
            style={{ backgroundColor: lang === 'en' ? 'lightgreen' : '' }}
          >
            <a target='_blank' rel='noopener noreferrer'>
              <Icon component={EnFlag} /> English
            </a>
          </Menu.Item>
          <Menu.Item
            key='1'
            onClick={() => { changeLanguage() }}
            disabled={lang && lang === 'es'}
            style={{ backgroundColor: lang === 'es' ? 'lightgreen' : '' }}
          >
            <a target='_blank' rel='noopener noreferrer'>
              <Icon component={EsFlag} /> Español
            </a>
          </Menu.Item>
        </Menu>
      }
    >
      <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
        <Translate />
      </a>
    </Dropdown>
  )
}

export default LangMenu

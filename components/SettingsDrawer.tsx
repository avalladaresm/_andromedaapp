import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { TableSettingsContext } from '../context/TableSettingsContext'
import { setQueryTableSettings } from '../services/appsettings'

export const SettingsDrawer = (props) => {
  const [settings, setSettings] = useState([])

  const router = useRouter()
  const queryClient = useQueryClient()
  const tableSettings = useContext(TableSettingsContext)

  useEffect(() => {
    switch (router.pathname) {
      case '/accounts/persons':
        setSettings(tableSettings.personColumns)
        break
      case '/accounts/businesses':
        setSettings(tableSettings.businessColumns)
        break
      case '/employees':
        setSettings(tableSettings.employeeColumns)
        break
      case '/activitylogs':
        setSettings(tableSettings.activityLogColumns)
        break
      case '/loginhistory':
        setSettings(tableSettings.authLogColumns)
        break
      default:
        setSettings([])
    }
  }, [settings, tableSettings])

  const updateVisibleColumnIsChecked = (event) => {
    const updatedSettings = settings.map(al => {
      if (al.Header === event.target.value) {
        al.checked = event.target.checked
      }
      return { ...al }
    })

    switch (router.pathname) {
      case '/accounts/persons':
        setQueryTableSettings(queryClient, { ...tableSettings, personColumns: updatedSettings })
        break
      case '/accounts/businesses':
        setQueryTableSettings(queryClient, { ...tableSettings, businessColumns: updatedSettings })
        break
      case '/employees':
        setQueryTableSettings(queryClient, { ...tableSettings, employeeColumns: updatedSettings })
        break
      case '/activitylogs':
        setQueryTableSettings(queryClient, { ...tableSettings, activityLogColumns: updatedSettings })
        break
      case '/loginhistory':
        setQueryTableSettings(queryClient, { ...tableSettings, authLogColumns: updatedSettings })
        break
      default:
        setSettings([])
    }
    setSettings(updatedSettings)
  }

  return (
    <div>
      {props.isOpen &&
        <div className={`flex flex-col fixed top-12 bottom-0 right-0 overflow-y-auto flex-no-wrap overflow-hidden bg-blueGray-300 z-10 pt-4 pb-2 w-20 px-2 sm:w-60 sm:px-4`}>
          <div className='space-y-3'>
            <div>
              Visible columns
            </div>
            <div className='flex flex-col space-y-1'>
              {settings?.map((s, i) => (
                <div key={i} className='space-x-1'>
                  <input key={'i' + i} type='checkbox' value={s.Header} defaultChecked={s.checked} className='space-y-3' onChange={(e) => updateVisibleColumnIsChecked(e)} />
                  <label key={'l' + i}>
                    {s.Header}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </div>
  )
}
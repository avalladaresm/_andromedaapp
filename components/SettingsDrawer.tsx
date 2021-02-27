import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { TableSettingsContext, TableSettingsUpdateContext } from '../context/TableSettingsContext'
import { setQueryTableSettings } from '../services/appsettings'

export const SettingsDrawer = (props) => {
  const [settings, setSettings] = useState([])

  const router = useRouter()
  const queryClient = useQueryClient()
  const tableSettings = useContext(TableSettingsContext)
  const tableSettingsUpdate = useContext(TableSettingsUpdateContext)

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
        tableSettingsUpdate({ ...tableSettings, personColumns: updatedSettings })
        setQueryTableSettings(queryClient, { ...tableSettings, personColumns: updatedSettings })
        break
      case '/accounts/businesses':
        tableSettingsUpdate({ ...tableSettings, businessColumns: updatedSettings })
        setQueryTableSettings(queryClient, { ...tableSettings, businessColumns: updatedSettings })
        break
      case '/employees':
        tableSettingsUpdate({ ...tableSettings, employeeColumns: updatedSettings })
        setQueryTableSettings(queryClient, { ...tableSettings, employeeColumns: updatedSettings })
        break
      case '/activitylogs':
        tableSettingsUpdate({ ...tableSettings, activityLogColumns: updatedSettings })
        setQueryTableSettings(queryClient, { ...tableSettings, activityLogColumns: updatedSettings })
        break
      case '/loginhistory':
        tableSettingsUpdate({ ...tableSettings, authLogColumns: updatedSettings })
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
        <div className={`flex flex-col fixed top-12 bottom-0 right-0 overflow-y-auto flex-no-wrap overflow-hidden bg-blueGray-300 z-10 pt-4 pb-2 w-52 px-2 sm:w-60`}>
          <div className='border border-blueGray-900 rounded-md p-1 sm:p-2 space-y-3'>
            <div className='text-center font-semibold'>
              Visible columns
            </div>
            <div className='space-y-3 sm:space-y-1'>
              {settings?.map((s, i) => (
                <div key={i} className='space-x-1'>
                  <input key={'i' + i} id={'i' + i} type='checkbox' value={s.Header} defaultChecked={s.checked} className='space-y-3' onChange={(e) => updateVisibleColumnIsChecked(e)} />
                  <label key={'l' + i} htmlFor={'i' + i}>
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
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { ActivityLogsSettingsContext, ActivityLogsSettingsUpdateContext } from '../context/ActivityLogsSettingsContext'

export const SettingsDrawer = (props) => {
  const [settings, setSettings] = useState([])

  const router = useRouter()
  const activityLogsSettings = useContext(ActivityLogsSettingsContext)
  const activityLogsSettingsUpdate = useContext(ActivityLogsSettingsUpdateContext)

  useEffect(() => {
    switch (router.pathname) {
      case '/activitylogs':
        setSettings(activityLogsSettings)
        break
      default:
        setSettings([])
    }
  }, [])

  const updateVisibleColumnIsChecked = (event) => {
    const updatedSettings = settings.map(al => {
      if (al.Header === event.target.value) {
        al.checked = event.target.checked
      }
      return {...al}
    })

    setSettings(updatedSettings)
    activityLogsSettingsUpdate(updatedSettings)
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
import Icon from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React, { useState } from 'react';
import { EnFlag, EsFlag, Translate } from './Icons';
import { useLangUpdate, useLang } from '../utils/LangContext'
import { useDispatch, useSelector } from 'react-redux'
import { CreateLanguageChangeLog } from '../services/logs';
import moment from 'moment'
import { LogTypes } from '../models/LogTypes'
import { SetCurrentLang } from '../services/global';
import { useRouter } from 'next/router'

const LangMenu = () => {
  const lang = useLang()
  const toggleLang = useLangUpdate()
  const loggedInUser = useSelector(state => state.auth.loggedInUser.userName)
  const dispatch = useDispatch()
  const [currentLang, setCurrentLang] = useState('')
  const router = useRouter()
  
  const createLog = () => {
    router.reload()
    toggleLang();
    dispatch(SetCurrentLang(lang === 'es' ? 'en' : 'es'))
    dispatch(CreateLanguageChangeLog({
      userName: loggedInUser, 
      date: moment(), 
      type:`${LogTypes.LANGUAGE_CHANGE}`, 
      description:`Language changed from ${lang} to ${lang === 'es' ? 'en' : 'es'}`, 
      data: JSON.stringify({})
    }))
  }

  return (
    <Dropdown overlay={ 
      <Menu>
        <Menu.Item 
          key='0' 
          onClick={() => {createLog()}} 
          disabled={lang === 'en' ? true : false} 
          style={{backgroundColor:lang === 'en' ? 'lightgreen' : ''}}
        >
          <a target='_blank' rel='noopener noreferrer'>
            <Icon component={EnFlag} /> English
          </a>
        </Menu.Item>
        <Menu.Item 
          key='1' 
          onClick={() => {createLog()}}
          disabled={lang === 'es' ? true : false} 
          style={{backgroundColor:lang === 'es' ? 'lightgreen' : ''}}
        >
          <a target='_blank' rel='noopener noreferrer'>
            <Icon component={EsFlag} /> Español
          </a>
        </Menu.Item>
      </Menu>
     }>
      <a className='ant-dropdown-link' onClick={ e => e.preventDefault() }>
        <Translate />
      </a>
    </Dropdown>
  )
}

export default LangMenu
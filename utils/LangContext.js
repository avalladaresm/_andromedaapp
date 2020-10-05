import { createContext, useContext, useState, useEffect } from 'react'
import { IntlProvider } from 'react-intl'
import { en } from '../locales/en'
import { es } from '../locales/es'

const LangContext = createContext()
const LangUpdateContext = createContext()

export function useLang () {
  return useContext(LangContext)
}

export function useLangUpdate () {
  return useContext(LangUpdateContext)
}

const esconfig = {
  locale: 'es',
  messages: es
}

const enconfig = {
  locale: 'en',
  messages: en
}

export function LangProvider (props) {
	const [lang, setLang] = useState(props.data.language)
	const [localeConfig, setLocaleConfig] = useState(props.data.language === 'es' ? esconfig : enconfig)

  function toggleLang () {
    setLang(props.data.language === 'es' ? 'en' : 'es')
		setLocaleConfig(props.data.language === 'es' ? enconfig : esconfig)
	}

  return (
    <IntlProvider locale={localeConfig.locale} defaultLocale={localeConfig.locale} messages={localeConfig.messages}>
      <LangContext.Provider value={lang}>
        <LangUpdateContext.Provider value={toggleLang}>
          {props.children}
        </LangUpdateContext.Provider>
      </LangContext.Provider>
    </IntlProvider>
  )
}

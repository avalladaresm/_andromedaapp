import { createContext, useContext, useState } from 'react'
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

export function LangProvider ({ children }) {
  const [lang, setLang] = useState('en')
  const [localeConfig, setLocaleConfig] = useState(enconfig)

  function toggleLang () {
    setLang(lang === 'es' ? 'en' : 'es')
    setLocaleConfig(lang === 'es' ? enconfig : esconfig)
  }

  return (
    <IntlProvider locale={localeConfig.locale} defaultLocale={localeConfig.locale} messages={localeConfig.messages}>
      <LangContext.Provider value={lang}>
        <LangUpdateContext.Provider value={toggleLang}>
          {children}
        </LangUpdateContext.Provider>
      </LangContext.Provider>
    </IntlProvider>
  )
}

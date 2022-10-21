import { LocalKey } from 'constants/key'
import i18n from 'i18next'
import { getLocalData } from 'localstorage/localstorage'
import { initReactI18next } from 'react-i18next'
import { zhTransaction, enTransaction } from './locale'

const resources = {
  en: {
    translation: enTransaction,
  },
  zh: {
    translation: zhTransaction,
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import authEn from '@/locales/en/auth.json'
import commonEn from '@/locales/en/common.json'
import usersEn from '@/locales/en/users.json'
import authVi from '@/locales/vi/auth.json'
import commonVi from '@/locales/vi/common.json'
import usersVi from '@/locales/vi/users.json'

export const SUPPORTED_LANGUAGES = ['en', 'vi'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: commonEn, auth: authEn, users: usersEn },
      vi: { common: commonVi, auth: authVi, users: usersVi },
    },
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES,
    ns: ['common', 'auth', 'users'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n

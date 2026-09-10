import { App as AntdApp, ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import viVN from 'antd/locale/vi_VN'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useThemeStore } from '@/app/stores/themeStore'
import { darkTheme, lightTheme } from '@/shared/lib/theme'

type Props = { children: ReactNode }

const antdLocaleMap = { en: enUS, vi: viVN } as const

export function ThemeProvider({ children }: Props) {
  const mode = useThemeStore((s) => s.mode)
  const { i18n } = useTranslation()

  useEffect(() => {
    const root = document.documentElement
    if (mode === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [mode])

  const lang = (i18n.resolvedLanguage ?? 'en') as keyof typeof antdLocaleMap
  const antdLocale = antdLocaleMap[lang] ?? enUS

  return (
    <ConfigProvider theme={mode === 'dark' ? darkTheme : lightTheme} locale={antdLocale}>
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  )
}

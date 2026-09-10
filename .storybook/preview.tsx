import { QueryClientProvider } from '@tanstack/react-query'
import type { Decorator, Preview } from '@storybook/react-vite'
import { withThemeByClassName } from '@storybook/addon-themes'
import { App as AntdApp, ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import viVN from 'antd/locale/vi_VN'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import '../src/index.css'
import '../src/shared/lib/i18n'
import { queryClient } from '../src/shared/lib/queryClient'
import { darkTheme, lightTheme } from '../src/shared/lib/theme'

const withI18n: Decorator = (Story, context) => {
  const { i18n } = useTranslation()
  const locale = context.globals.locale as string

  useEffect(() => {
    if (locale && i18n.language !== locale) void i18n.changeLanguage(locale)
  }, [i18n, locale])

  return <Story />
}

const withAntd: Decorator = (Story, context) => {
  const isDark = context.globals.theme === 'dark'
  const antdLocale = context.globals.locale === 'vi' ? viVN : enUS

  return (
    <ConfigProvider theme={isDark ? darkTheme : lightTheme} locale={antdLocale}>
      <AntdApp>
        <QueryClientProvider client={queryClient}>
          <div className="p-6">
            <Story />
          </div>
        </QueryClientProvider>
      </AntdApp>
    </ConfigProvider>
  )
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
  },
  globalTypes: {
    locale: {
      description: 'Language',
      defaultValue: 'en',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English', right: 'EN' },
          { value: 'vi', title: 'Tiếng Việt', right: 'VI' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
      parentSelector: 'html',
    }),
    withAntd,
    withI18n,
  ],
}

export default preview

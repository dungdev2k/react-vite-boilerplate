import type { ReactNode } from 'react'

import { I18nProvider } from './I18nProvider'
import { QueryProvider } from './QueryProvider'
import { ThemeProvider } from './ThemeProvider'

type Props = { children: ReactNode }

export function AppProviders({ children }: Props) {
  return (
    <I18nProvider>
      <ThemeProvider>
        <QueryProvider>{children}</QueryProvider>
      </ThemeProvider>
    </I18nProvider>
  )
}

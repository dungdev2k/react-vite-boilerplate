import { theme as antdTheme } from 'antd'
import type { ThemeConfig } from 'antd'

const sharedTokens = {
  colorPrimary: '#6d28d9',
  borderRadius: 8,
  fontFamily: `system-ui, 'Segoe UI', Roboto, sans-serif`,
}

export const lightTheme: ThemeConfig = {
  algorithm: antdTheme.defaultAlgorithm,
  token: sharedTokens,
}

export const darkTheme: ThemeConfig = {
  algorithm: antdTheme.darkAlgorithm,
  token: sharedTokens,
}

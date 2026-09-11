/**
 * Single source of truth for design tokens.
 *
 * Both Tailwind (`tailwind.config.ts`) and Ant Design (`shared/lib/theme.ts`)
 * consume these tokens so the UI stays visually consistent across libraries.
 *
 * When you need a new token, add it here first, then reference it from either config.
 */

export const colors = {
  primary: '#6d28d9',
  primaryHover: '#7c3aed',
  primaryActive: '#5b21b6',

  success: '#16a34a',
  warning: '#f59e0b',
  error: '#dc2626',
  info: '#2563eb',

  // Neutral scale (used for backgrounds, borders, text)
  neutral: {
    0: '#ffffff',
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
} as const

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const

export const fontFamily = {
  sans: `system-ui, 'Segoe UI', Roboto, sans-serif`,
  mono: `ui-monospace, Consolas, monospace`,
} as const

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const

export const controlHeight = {
  sm: 28,
  md: 36,
  lg: 44,
} as const

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const tokens = {
  colors,
  radius,
  fontFamily,
  fontSize,
  spacing,
  controlHeight,
  breakpoints,
}

export type DesignTokens = typeof tokens

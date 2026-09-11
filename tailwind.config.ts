import {
  breakpoints,
  colors,
  fontFamily,
  fontSize,
  radius,
  spacing,
} from './src/shared/lib/designTokens'

const toPx = <T extends Record<string, number>>(rec: T) =>
  Object.fromEntries(Object.entries(rec).map(([k, v]) => [k, `${v}px`])) as Record<keyof T, string>

/**
 * Tailwind v4 config, loaded via `@config` directive from `src/index.css`.
 *
 * Extends the default theme with the shared design tokens so utilities like
 * `bg-primary`, `text-neutral-500`, `rounded-md`, `text-xl`, `p-lg` mirror
 * Ant Design's ConfigProvider tokens.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.primary,
          hover: colors.primaryHover,
          active: colors.primaryActive,
        },
        neutral: colors.neutral,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
      },
      fontFamily: {
        sans: [fontFamily.sans],
        mono: [fontFamily.mono],
      },
      fontSize: toPx(fontSize),
      spacing: toPx(spacing),
      borderRadius: {
        none: '0',
        sm: `${radius.sm}px`,
        DEFAULT: `${radius.md}px`,
        md: `${radius.md}px`,
        lg: `${radius.lg}px`,
        xl: `${radius.xl}px`,
        full: `${radius.full}px`,
      },
      screens: toPx(breakpoints),
    },
  },
}

import { colors, fontFamily, radius } from './src/shared/lib/designTokens'

/**
 * Tailwind v4 config, loaded via `@config` directive from `src/index.css`.
 *
 * IMPORTANT: DO NOT extend Tailwind's `spacing`, `width`, `height`, `maxWidth`,
 * `screens`, or `fontSize` scales with semantic keys like `sm/md/lg`. In v4
 * those scales are derived from `spacing`, so overriding `spacing.sm = '8px'`
 * silently rewrites `max-w-sm` from 24rem to 8px and breaks every layout that
 * relies on the default scale.
 *
 * Semantic spacing / sizing tokens (`designTokens.spacing`) are kept as AntD
 * ConfigProvider inputs only. In JSX, use Tailwind's default numeric scale
 * (`p-4`, `max-w-sm`, `w-96`, ...) — do not invent `p-lg` utilities.
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
      borderRadius: {
        DEFAULT: `${radius.md}px`,
        md: `${radius.md}px`,
        lg: `${radius.lg}px`,
        xl: `${radius.xl}px`,
      },
    },
  },
}

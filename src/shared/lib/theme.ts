import { theme as antdTheme } from 'antd'
import type { ThemeConfig } from 'antd'

import {
  colors,
  controlHeight,
  fontFamily,
  fontSize,
  radius,
} from '@/shared/lib/designTokens'

/**
 * Tokens shared across all themes. Colors that need to invert (background, text)
 * are set per-mode below.
 */
const sharedToken: ThemeConfig['token'] = {
  colorPrimary: colors.primary,
  colorSuccess: colors.success,
  colorWarning: colors.warning,
  colorError: colors.error,
  colorInfo: colors.info,

  borderRadius: radius.md,
  borderRadiusLG: radius.lg,
  borderRadiusSM: radius.sm,
  borderRadiusXS: radius.sm,

  fontFamily: fontFamily.sans,
  fontFamilyCode: fontFamily.mono,
  fontSize: fontSize.sm,

  controlHeight: controlHeight.md,
  controlHeightSM: controlHeight.sm,
  controlHeightLG: controlHeight.lg,

  wireframe: false,
  motion: true,
}

/**
 * Component-level overrides — applied to both light and dark themes.
 * Prefer overriding via `components` here rather than global CSS.
 */
const sharedComponents: ThemeConfig['components'] = {
  Button: {
    borderRadius: radius.md,
    controlHeight: controlHeight.md,
    fontWeight: 500,
  },
  Input: {
    borderRadius: radius.md,
    controlHeight: controlHeight.md,
  },
  Select: {
    borderRadius: radius.md,
    controlHeight: controlHeight.md,
  },
  Card: {
    borderRadiusLG: radius.lg,
    paddingLG: 24,
  },
  Modal: {
    borderRadiusLG: radius.lg,
  },
  Menu: {
    itemBorderRadius: radius.md,
    itemHeight: 40,
    itemMarginInline: 8,
  },
  Table: {
    borderRadius: radius.md,
    headerBg: 'transparent',
    rowHoverBg: 'rgba(109, 40, 217, 0.04)',
  },
  Layout: {
    headerHeight: 64,
    headerPadding: '0 16px',
  },
  Form: {
    itemMarginBottom: 20,
    verticalLabelPadding: '0 0 4px',
  },
  Typography: {
    titleMarginBottom: 0,
    titleMarginTop: 0,
  },
}

export const lightTheme: ThemeConfig = {
  algorithm: antdTheme.defaultAlgorithm,
  token: {
    ...sharedToken,
    colorBgLayout: colors.neutral[50],
    colorBgContainer: colors.neutral[0],
    colorBorder: colors.neutral[200],
    colorText: colors.neutral[800],
    colorTextSecondary: colors.neutral[600],
  },
  components: {
    ...sharedComponents,
    Layout: {
      ...sharedComponents.Layout,
      bodyBg: colors.neutral[50],
      siderBg: colors.neutral[0],
      headerBg: colors.neutral[0],
    },
  },
}

export const darkTheme: ThemeConfig = {
  algorithm: antdTheme.darkAlgorithm,
  token: {
    ...sharedToken,
    colorBgLayout: colors.neutral[950],
    colorBgContainer: colors.neutral[900],
    colorBorder: colors.neutral[700],
    colorText: colors.neutral[100],
    colorTextSecondary: colors.neutral[400],
  },
  components: {
    ...sharedComponents,
    Layout: {
      ...sharedComponents.Layout,
      bodyBg: colors.neutral[950],
      siderBg: colors.neutral[900],
      headerBg: colors.neutral[900],
    },
    Table: {
      ...sharedComponents.Table,
      rowHoverBg: 'rgba(124, 58, 237, 0.12)',
    },
  },
}

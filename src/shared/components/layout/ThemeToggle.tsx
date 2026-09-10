import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'

import { useThemeStore } from '@/app/stores/themeStore'

export function ThemeToggle() {
  const { t } = useTranslation()
  const mode = useThemeStore((s) => s.mode)
  const toggle = useThemeStore((s) => s.toggle)

  const isDark = mode === 'dark'
  return (
    <Tooltip title={t(isDark ? 'theme.light' : 'theme.dark')}>
      <Button
        type="text"
        shape="circle"
        icon={isDark ? <SunOutlined /> : <MoonOutlined />}
        onClick={toggle}
        aria-label="Toggle theme"
      />
    </Tooltip>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { Card, Space, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import { LanguageToggle } from '@/shared/components/layout/LanguageToggle'
import { ThemeToggle } from '@/shared/components/layout/ThemeToggle'

export const Route = createFileRoute('/_app/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  const { t } = useTranslation()
  return (
    <Card title={t('nav.settings')} className="max-w-lg">
      <Space size="middle" align="center">
        <Typography.Text>{t('theme.dark')} / {t('theme.light')}</Typography.Text>
        <ThemeToggle />
      </Space>
      <div className="h-4" />
      <Space size="middle" align="center">
        <Typography.Text>{t('language.en')} / {t('language.vi')}</Typography.Text>
        <LanguageToggle />
      </Space>
    </Card>
  )
}

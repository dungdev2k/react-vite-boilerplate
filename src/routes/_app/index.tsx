import { createFileRoute } from '@tanstack/react-router'
import { Card, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import { useAuth } from '@/features/auth/hooks/useAuth'

export const Route = createFileRoute('/_app/')({
  component: DashboardPage,
})

function DashboardPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card title={t('nav.dashboard')}>
        <Typography.Paragraph>
          Welcome, <strong>{user?.name}</strong>.
        </Typography.Paragraph>
      </Card>
    </div>
  )
}

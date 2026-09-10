import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Button, Card, Descriptions, Skeleton, Space } from 'antd'
import { useTranslation } from 'react-i18next'

import { useUserQuery } from '@/features/users/api/useUserQuery'

export const Route = createFileRoute('/_app/users/$userId')({
  component: UserDetailPage,
})

function UserDetailPage() {
  const { t } = useTranslation(['users', 'common'])
  const { userId } = Route.useParams()
  const user = useUserQuery(userId)

  return (
    <Card
      title={
        <Space>
          <Link to="/users">
            <Button icon={<ArrowLeftOutlined />} size="small">
              {t('common:actions.back')}
            </Button>
          </Link>
          <span>{user.data?.name ?? '...'}</span>
        </Space>
      }
    >
      {user.isLoading ? (
        <Skeleton active />
      ) : user.data ? (
        <Descriptions column={1} bordered>
          <Descriptions.Item label={t('users:columns.id')}>{user.data.id}</Descriptions.Item>
          <Descriptions.Item label={t('users:columns.name')}>{user.data.name}</Descriptions.Item>
          <Descriptions.Item label={t('users:columns.email')}>{user.data.email}</Descriptions.Item>
          <Descriptions.Item label={t('users:columns.phone')}>{user.data.phone}</Descriptions.Item>
          <Descriptions.Item label={t('users:columns.company')}>{user.data.company?.name}</Descriptions.Item>
        </Descriptions>
      ) : null}
    </Card>
  )
}

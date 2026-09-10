import { PlusOutlined } from '@ant-design/icons'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button, Card, Modal, Table, Typography, message } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useCreateUserMutation } from '@/features/users/api/useCreateUserMutation'
import { useUsersQuery } from '@/features/users/api/useUsersQuery'
import { UserForm } from '@/features/users/components/UserForm'
import type { User } from '@/features/users/types'

export const Route = createFileRoute('/_app/users/')({
  component: UsersListPage,
})

function UsersListPage() {
  const { t } = useTranslation(['users', 'common'])
  const [open, setOpen] = useState(false)
  const users = useUsersQuery()
  const createUser = useCreateUserMutation()

  const columns = [
    { title: t('users:columns.id'), dataIndex: 'id', width: 80 },
    {
      title: t('users:columns.name'),
      dataIndex: 'name',
      render: (name: string, row: User) => <Link to="/users/$userId" params={{ userId: String(row.id) }}>{name}</Link>,
    },
    { title: t('users:columns.email'), dataIndex: 'email' },
    { title: t('users:columns.phone'), dataIndex: 'phone' },
    {
      title: t('users:columns.company'),
      dataIndex: ['company', 'name'],
    },
  ]

  return (
    <Card
      title={<Typography.Title level={4} className="!mb-0">{t('users:title')}</Typography.Title>}
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          {t('common:actions.create')}
        </Button>
      }
    >
      <Table
        rowKey="id"
        loading={users.isLoading}
        dataSource={users.data ?? []}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={t('users:createTitle')}
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
        destroyOnHidden
      >
        <UserForm
          loading={createUser.isPending}
          onCancel={() => setOpen(false)}
          onSubmit={(values) => {
            createUser.mutate(values, {
              onSuccess: () => {
                void message.success('Created')
                setOpen(false)
              },
              onError: () => void message.error('Failed'),
            })
          }}
        />
      </Modal>
    </Card>
  )
}

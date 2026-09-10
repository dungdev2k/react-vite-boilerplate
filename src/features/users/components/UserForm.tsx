import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, Input, Space } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { userSchema, type UserInput } from '@/features/users/schemas'

type Props = {
  defaultValues?: Partial<UserInput>
  loading?: boolean
  onSubmit: (values: UserInput) => void
  onCancel?: () => void
}

export function UserForm({ defaultValues, loading, onSubmit, onCancel }: Props) {
  const { t } = useTranslation(['users', 'common'])
  const { control, handleSubmit } = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: '', email: '', phone: '', company: '', ...defaultValues },
  })

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <Form.Item
            label={t('users:form.name')}
            required
            validateStatus={fieldState.error ? 'error' : ''}
            help={fieldState.error?.message}
          >
            <Input {...field} />
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <Form.Item
            label={t('users:form.email')}
            required
            validateStatus={fieldState.error ? 'error' : ''}
            help={fieldState.error?.message}
          >
            <Input {...field} type="email" />
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="phone"
        render={({ field, fieldState }) => (
          <Form.Item
            label={t('users:form.phone')}
            validateStatus={fieldState.error ? 'error' : ''}
            help={fieldState.error?.message}
          >
            <Input {...field} />
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="company"
        render={({ field, fieldState }) => (
          <Form.Item
            label={t('users:form.company')}
            validateStatus={fieldState.error ? 'error' : ''}
            help={fieldState.error?.message}
          >
            <Input {...field} />
          </Form.Item>
        )}
      />
      <Space>
        <Button type="primary" htmlType="submit" loading={loading}>
          {t('common:actions.save')}
        </Button>
        {onCancel && <Button onClick={onCancel}>{t('common:actions.cancel')}</Button>}
      </Space>
    </Form>
  )
}

import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Form, Input, Typography } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useLoginMutation } from '@/features/auth/api/useLoginMutation'
import { loginSchema, type LoginInput } from '@/features/auth/schemas'

type Props = {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: Props) {
  const { t } = useTranslation(['auth', 'common'])
  const login = useLoginMutation()

  const { control, handleSubmit, formState } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = handleSubmit((values) => {
    login.mutate(values, { onSuccess: () => onSuccess?.() })
  })

  return (
    <Form layout="vertical" onFinish={onSubmit} className="w-full">
      <Typography.Title level={3} className="!mb-1">
        {t('auth:login.title')}
      </Typography.Title>
      <Typography.Paragraph type="secondary" className="!mb-6">
        {t('auth:login.subtitle')}
      </Typography.Paragraph>

      {login.isError && (
        <Alert type="error" showIcon message={t('auth:errors.loginFailed')} className="!mb-4" />
      )}

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <Form.Item
            label={t('auth:login.email')}
            validateStatus={fieldState.error ? 'error' : ''}
            help={fieldState.error ? t(fieldState.error.message ?? '') : undefined}
          >
            <Input {...field} type="email" autoComplete="email" placeholder="you@example.com" />
          </Form.Item>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <Form.Item
            label={t('auth:login.password')}
            validateStatus={fieldState.error ? 'error' : ''}
            help={fieldState.error ? t(fieldState.error.message ?? '') : undefined}
          >
            <Input.Password {...field} autoComplete="current-password" placeholder="••••••" />
          </Form.Item>
        )}
      />

      <Button
        type="primary"
        htmlType="submit"
        block
        loading={login.isPending || formState.isSubmitting}
      >
        {t('auth:login.submit')}
      </Button>

      <Typography.Paragraph type="secondary" className="!mt-4 !mb-0 text-center text-xs">
        {t('auth:login.hint')}
      </Typography.Paragraph>
    </Form>
  )
}

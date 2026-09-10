import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Layout, Space } from 'antd'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { useAuth } from '@/features/auth/hooks/useAuth'
import { LanguageToggle } from '@/shared/components/layout/LanguageToggle'
import { ThemeToggle } from '@/shared/components/layout/ThemeToggle'

const { Header } = Layout

export function AppHeader() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    void navigate({ to: '/login' })
  }

  return (
    <Header className="!flex items-center justify-end gap-2 !bg-transparent !px-4">
      <Space size="small">
        <LanguageToggle />
        <ThemeToggle />
        <Dropdown
          menu={{
            items: [
              {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: t('nav.logout'),
                onClick: handleLogout,
              },
            ],
          }}
        >
          <Button type="text" className="!flex items-center gap-2">
            <Avatar size="small" icon={<UserOutlined />} />
            <span className="hidden sm:inline">{user?.name ?? 'Guest'}</span>
          </Button>
        </Dropdown>
      </Space>
    </Header>
  )
}

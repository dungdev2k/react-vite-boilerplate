import { DashboardOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { Link, useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

const { Sider } = Layout

export function AppSidebar() {
  const { t } = useTranslation()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const items = [
    { key: '/', icon: <DashboardOutlined />, label: <Link to="/">{t('nav.dashboard')}</Link> },
    { key: '/users', icon: <TeamOutlined />, label: <Link to="/users">{t('nav.users')}</Link> },
    { key: '/settings', icon: <SettingOutlined />, label: <Link to="/settings">{t('nav.settings')}</Link> },
  ]

  const selectedKey = items.find((i) => i.key === pathname || pathname.startsWith(i.key + '/'))?.key ?? '/'

  return (
    <Sider breakpoint="lg" collapsible width={220} className="!bg-transparent">
      <div className="flex h-16 items-center justify-center px-4">
        <span className="text-lg font-semibold">{t('appName')}</span>
      </div>
      <Menu mode="inline" selectedKeys={[selectedKey]} items={items} />
    </Sider>
  )
}

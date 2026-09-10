import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { Layout } from 'antd'

import { useAuthStore } from '@/features/auth/stores/authStore'
import { AppHeader } from '@/shared/components/layout/AppHeader'
import { AppSidebar } from '@/shared/components/layout/AppSidebar'

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ location }) => {
    if (!useAuthStore.getState().isAuthenticated()) {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }
  },
  component: AppLayout,
})

function AppLayout() {
  return (
    <Layout className="min-h-screen">
      <AppSidebar />
      <Layout>
        <AppHeader />
        <Layout.Content className="p-6">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { Layout } from 'antd'

import { useAuthStore } from '@/features/auth/stores/authStore'
import { LanguageToggle } from '@/shared/components/layout/LanguageToggle'
import { ThemeToggle } from '@/shared/components/layout/ThemeToggle'

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    if (useAuthStore.getState().isAuthenticated()) {
      throw redirect({ to: '/' })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <Layout className="min-h-screen">
      <div className="absolute right-4 top-4 flex gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-lg border border-black/5 p-8 shadow-sm dark:border-white/10">
          <Outlet />
        </div>
      </div>
    </Layout>
  )
}

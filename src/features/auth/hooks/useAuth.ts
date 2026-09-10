import { useAuthStore } from '@/features/auth/stores/authStore'
import { clearAuthToken } from '@/shared/lib/axios'

export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const reset = useAuthStore((s) => s.reset)

  const logout = () => {
    clearAuthToken()
    reset()
  }

  return {
    user,
    isAuthenticated: user !== null,
    logout,
  }
}

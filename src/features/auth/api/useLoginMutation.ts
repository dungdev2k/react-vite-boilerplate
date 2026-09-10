import { useMutation } from '@tanstack/react-query'

import { useAuthStore } from '@/features/auth/stores/authStore'
import type { AuthUser } from '@/features/auth/types'
import type { LoginInput } from '@/features/auth/schemas'
import { setAuthToken } from '@/shared/lib/axios'

async function loginRequest(input: LoginInput): Promise<{ user: AuthUser; token: string }> {
  await new Promise((r) => setTimeout(r, 400))
  return {
    token: `fake-jwt-${btoa(input.email)}`,
    user: { id: 1, email: input.email, name: input.email.split('@')[0] },
  }
}

export function useLoginMutation() {
  const setUser = useAuthStore((s) => s.setUser)
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: ({ user, token }) => {
      setAuthToken(token)
      setUser(user)
    },
  })
}

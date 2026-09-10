import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { AuthUser } from '@/features/auth/types'

type AuthState = {
  user: AuthUser | null
  setUser: (user: AuthUser | null) => void
  isAuthenticated: () => boolean
  reset: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      isAuthenticated: () => get().user !== null,
      reset: () => set({ user: null }),
    }),
    { name: 'auth-user' },
  ),
)

import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { UserInput } from '@/features/users/schemas'
import type { User } from '@/features/users/types'
import { http } from '@/shared/lib/axios'
import { queryKeys } from '@/shared/constants/queryKeys'

async function createUser(input: UserInput): Promise<User> {
  const { data } = await http.post<User>('/users', {
    name: input.name,
    email: input.email,
    phone: input.phone,
    company: input.company ? { name: input.company } : undefined,
  })
  return data
}

export function useCreateUserMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.users.all })
    },
  })
}

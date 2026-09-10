import { useQuery } from '@tanstack/react-query'

import type { User } from '@/features/users/types'
import { http } from '@/shared/lib/axios'
import { queryKeys } from '@/shared/constants/queryKeys'

async function fetchUsers(): Promise<User[]> {
  const { data } = await http.get<User[]>('/users')
  return data
}

export function useUsersQuery() {
  return useQuery({
    queryKey: queryKeys.users.list(),
    queryFn: fetchUsers,
  })
}

import { useQuery } from '@tanstack/react-query'

import type { User } from '@/features/users/types'
import { http } from '@/shared/lib/axios'
import { queryKeys } from '@/shared/constants/queryKeys'

async function fetchUser(id: number | string): Promise<User> {
  const { data } = await http.get<User>(`/users/${id}`)
  return data
}

export function useUserQuery(id: number | string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => fetchUser(id),
    enabled: id !== undefined && id !== null,
  })
}

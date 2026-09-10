export type ApiError = {
  message: string
  code?: string
  fieldErrors?: Record<string, string>
}

export type Pagination = {
  page: number
  pageSize: number
  total: number
}

export type Paginated<T> = {
  items: T[]
  pagination: Pagination
}

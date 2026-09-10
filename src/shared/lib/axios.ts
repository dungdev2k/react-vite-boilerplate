import axios from 'axios'

const AUTH_TOKEN_KEY = 'auth_token'

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY)
export const setAuthToken = (token: string) => localStorage.setItem(AUTH_TOKEN_KEY, token)
export const clearAuthToken = () => localStorage.removeItem(AUTH_TOKEN_KEY)

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthToken()
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)

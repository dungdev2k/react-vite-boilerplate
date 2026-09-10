import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'auth:errors.emailRequired' })
    .email({ message: 'auth:errors.emailInvalid' }),
  password: z
    .string()
    .min(1, { message: 'auth:errors.passwordRequired' })
    .min(6, { message: 'auth:errors.passwordShort' }),
})

export type LoginInput = z.infer<typeof loginSchema>

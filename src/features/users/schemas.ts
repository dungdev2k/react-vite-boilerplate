import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
  email: z.string().min(1, { message: 'This field is required' }).email(),
  phone: z.string().optional(),
  company: z.string().optional(),
})

export type UserInput = z.infer<typeof userSchema>

import { z } from "zod"

export const dataUpdateUser = z.object({
  name: z.string().min(1).optional(),
  email: z.email().min(1).optional(),
  phone: z.string().min(1).optional()
}).strict()

export type TUpdateUserUser = z.infer<typeof dataUpdateUser>

export const dataCreateUser = dataUpdateUser.required()
export type ICreateUser = z.infer<typeof dataCreateUser>
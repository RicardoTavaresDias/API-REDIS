import { z } from "zod"

export const userByIdSchema = z.object({
  id: z.uuid()
})

export type userIdType = z.infer<typeof userByIdSchema>
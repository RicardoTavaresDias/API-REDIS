import { z } from "zod"

export const IdParams = z.object({
  id: z.uuid()
})

export type IdParamsType = z.infer<typeof IdParams>

export const PaginationSchema = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number()
})

export type PaginationType = z.infer<typeof PaginationSchema>
import { z } from "zod"

export const IdParams = z.object({
  id: z.uuid()
})

export type IdParamsType = z.infer<typeof IdParams>
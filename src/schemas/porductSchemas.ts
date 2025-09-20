import { z } from "zod"

export const dataUpdateProduct = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.string().min(1).optional()
}).strict()

export type TUpdateProduct = z.infer<typeof dataUpdateProduct>

export const dataCreateProduct = dataUpdateProduct.required()
export type ICreateProduct = z.infer<typeof dataCreateProduct>
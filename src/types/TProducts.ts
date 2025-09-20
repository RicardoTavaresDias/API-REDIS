import { Product, User } from "@prisma/client"

export type ProductType = Omit<Product, "id" | "createdAt" | "updatedAt" | "fkUser">

export type ListProductUserType = {
  user: User
  products: Product[]
}
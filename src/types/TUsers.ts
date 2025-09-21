import { User } from "@prisma/client"

export type Tsearch = {
  id: string
}[] & UserType[] | []

export type UserType = Omit<User, "id" | "createdAt" | "updatedAt">

export type SearchType = {
  name?: string, 
  email?: string, 
  phone?: string
}
import { User } from "@prisma/client";

export type UserType = Omit<User, "id" | "createdAt" | "updatedAt">

export type SearchType = {
  name?: string, 
  email?: string, 
  phone?: string,
  createdAt?: Date
  updatedAt?: Date
}

export type Users = User
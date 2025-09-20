import { Prisma } from "@prisma/client";

export interface IRepository<T, D> {
  findMany (pagination?: { page: number; limit: number }): Promise<T[]>
  findFirst (id: string): Promise<T | null>
  create(data: D): Promise<T>
  update(data: Partial<D>, id: string): Promise<T>
  delete(id: string): Promise<void>
}

export interface PaginationType {
  page: number, 
  limit: number
}

export type Delegate = Prisma.UserDelegate | Prisma.ProductDelegate
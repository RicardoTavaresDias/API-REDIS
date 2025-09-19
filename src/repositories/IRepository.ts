// IRepository.ts
export interface IRepository<T, D> {
  findMany (pagination?: { page: number; limit: number }): Promise<T[]>
  findFirst (id: string): Promise<T | null>
  create(data: D): Promise<T>
  update(data: Partial<D>, id: string): Promise<T>
  delete(id: string): Promise<T>
}

export interface PaginationType {
  page: number, 
  limit: number
}
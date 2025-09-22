import { AppError } from "@/utils/AppError"
import { Delegate, IRepository } from "./interface/IRepository"
import { PaginationType } from "./interface/IRepository"
import { redisGet, redisSet } from "@/cache"

abstract class Repository<Imodel extends Delegate, T, D> implements IRepository<T, D> {
  protected readonly _model: Imodel
  constructor (prisma: Imodel) {
    this._model = prisma
  }

  async findMany (host: string, pagination?: PaginationType): Promise<T[]>{
    const paginationMany: { skip: number, take: number } | undefined = 
    pagination ? 
    { 
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit
    } : undefined

    const result = await redisGet<T[]>(`${host}:${pagination?.page}`)

    if (!result) {
      //@ts-ignore
      const resultDB = await this._model.findMany(paginationMany)
      await redisSet<T[]>(`${host}:${pagination?.page}`, resultDB)
      return resultDB
    }
    
    return result
  }

  async findFirst (id: string): Promise<T | null> {
    //@ts-ignore
    return this._model.findFirst({
      where: {
        id
      }
    })
  }

  create (data: D): Promise<T> {
    //@ts-ignore
    return this._model.create({
      data: {
        ...data
      }
    })
  }

  update (
    data: Partial<D>, 
    id: string
  ): Promise<T> {
    //@ts-ignore
    return this._model.update({
      where: {
        id
      },
      data: {
        ...data
      }
    })
  }

  async delete (id: string): Promise<void> {
    const userExist = await this.findFirst(id)
    if(!userExist) {
      throw new AppError("Não encontrado.", 404);
    }

    //@ts-ignore
    return this._model.delete({
      where: {
        id
      }
    })
  }
}

export { Repository }
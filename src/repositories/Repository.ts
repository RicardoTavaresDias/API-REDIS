import { IRepository } from "./IRepository"
import { PaginationType } from "./IRepository"

abstract class Repository<Imodel, T, D> implements IRepository<T, D> {
  protected _model: Imodel

  constructor (prisma: Imodel) {
    this._model = prisma
  }

  findMany (pagination?: PaginationType): Promise<T[]>{
    const paginationMany: { skip: number, take: number } | undefined = 
    pagination ? 
    { 
      skip: (pagination.page - 1) * pagination.limit, 
      take: pagination.limit
    } : undefined

    //@ts-ignore
    return this._model.findMany(paginationMany)
  }

  findFirst (id: string): Promise<T> {
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

  delete (id: string): Promise<void> {
    //@ts-ignore
    return this._model.delete({
      where: {
        id
      }
    })
  }
}

export { Repository }
import { Prisma, PrismaClient } from "@prisma/client";

abstract class Repository {
  protected _prisma: any //PrismaClient

  constructor (prisma: any) {
    this._prisma = prisma
  }

  protected async _findMany (pagination?: { page: number, limit: number }) {
    const paginationMany: { skip: number, take: number } | undefined = 
    pagination ? 
    { 
      skip: (pagination.page - 1) * pagination.limit, 
      take: pagination.limit
    } : undefined

    return await this._prisma.findMany(paginationMany)
  }

  protected async _findFirst (id: string) {
    return await this._prisma.findFirst({
      where: {
        id
      }
    })
  }

  protected async _create (data: any) {
    return await this._prisma.create({
      data: {
        ...data
      }
    })
  }

  protected async _update (
    data: any, 
    id: string
  ): Promise<any> {
    return await this._prisma.update({
      where: {
        id
      },
      data: {
        ...data
      }
    })
  }

  protected async _delete (id: string): Promise<void> {
    await this._prisma.delete({
      where: {
        id
      }
    })
  }
}

export { Repository }
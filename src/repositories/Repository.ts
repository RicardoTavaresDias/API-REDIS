import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

abstract class Repository {
  private _prisma: PrismaClient
  private _model: Lowercase<Prisma.ModelName>

  constructor (model: Lowercase<Prisma.ModelName>) {
    this._model = model
    this._prisma = prisma
  }

  protected getPrisma () {
    return this._prisma
  }

  protected async getFindMany (pagination?: { page: number, limit: number }) {
    const paginationMany: { skip: number, take: number } | undefined = 
    pagination ? 
    { 
      skip: (pagination.page - 1) * pagination.limit, 
      take: pagination.limit
    } : undefined

    return await this._prisma[this._model].findMany(paginationMany)
  }

  protected async getfindFirst (id: string) {
    return await this._prisma[this._model].findFirst({
      where: {
        id
      }
    })
  }

  protected async getCreate (data: any) {
    return await this._prisma[this._model].create({
      data: {
        ...data
      }
    })
  }

  protected async getUpdate (
    data: any, 
    id: string
  ): Promise<any> {
    return await this._prisma[this._model].update({
      where: {
        id
      },
      data: {
        ...data
      }
    })
  }

  protected async getDelete (id: string): Promise<void> {
    await this._prisma[this._model].delete({
      where: {
        id
      }
    })
  }
}

export { Repository }
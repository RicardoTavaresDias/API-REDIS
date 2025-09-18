import { Prisma, PrismaClient, User } from "@prisma/client";
import prisma from "@/lib/prisma";
import type { UserType } from "./types/Users";

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

  protected async disconnect() {
    await this._prisma.$disconnect()
  }

  protected async getFindMany (pagination?: { page: number, limit: number }): Promise<User[]> {
    const paginationMany: { skip: number, take: number } | undefined = 
    pagination ? 
    { 
      skip: (pagination.page - 1) * pagination.limit, 
      take: pagination.limit
    } : undefined

    return await this._prisma[this._model].findMany(paginationMany)
  }

  protected async getfindFirst (id: string): Promise<User | null> {
    return await this._prisma[this._model].findFirst({
      where: {
        id
      }
    })
  }

  protected async getCreate (data: UserType) {
    return await this._prisma[this._model].create({
      data: {
        ...data
      }
    })
  }

  protected async getUpdate (
    data: UserType, 
    id: string
  ): Promise<User> {
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
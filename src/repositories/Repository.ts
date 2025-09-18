import { Prisma, PrismaClient } from "@prisma/client";

abstract class Repository {
  private prisma: PrismaClient

  constructor () {
    this.prisma = new PrismaClient()
  }

  protected async findMany (model: Lowercase<Prisma.ModelName>): Promise<any[]> {
    return await this.prisma[model].findMany()
  }

  protected async findFirst (model: Lowercase<Prisma.ModelName>, id: string): Promise<any> {
    return await this.prisma[model].findFirst({
      where: {
        id
      }
    })
  }

  protected async disconnect() {
    await this.prisma.$disconnect()
  }
}

export { Repository }
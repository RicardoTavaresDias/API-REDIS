import { PrismaClient, User } from "@prisma/client";
import { Repository } from "./Repository"
import type { SearchType, UserType } from "./types/Users";
import prisma from "@/lib/prisma";

class UserRepository extends Repository {
  constructor () {
    super(prisma.user)
  }
  
  public async getAll (): Promise<User[]> {
    // Teste de paginação no findMany
    const pagination = { page: 2, limit: 5 }
    return await this._findMany()
  }

  public async getById (id: string): Promise<User | null> {
    return await this._findFirst(id)
  }

  public async create (data: UserType): Promise<User> {
    return await this._create(data)
  }

  public async update (data: UserType, id: string): Promise<UserType> {
    return await this._update(data, id)
  }

  public async remove (id: string): Promise<void> {
    await this._delete(id)
  }

  // Exemplo funções adicionais especifico cada class
  public async search (search: SearchType | SearchType[]): Promise<UserType & { id: string } | null> {
    const filters = Array.isArray(search) ? search : [search]

    return await this._prisma.user.findFirst({
      where: {
        OR: filters
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      }
    })
  }
}

export { UserRepository }
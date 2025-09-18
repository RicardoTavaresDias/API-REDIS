import { PrismaClient, User } from "@prisma/client";
import { Repository } from "./Repository"
import type { SearchType, UserType } from "./types/Users";

class UserRepository extends Repository {
  private _prismaCustom: PrismaClient

  constructor () {
    super("user")
    this._prismaCustom = this.getPrisma()
  }
  
  public async getAll (): Promise<User[]> {
    // Teste de paginação no findMany
    const pagination = { page: 2, limit: 5 }
    return await this.getFindMany()
  }

  public async getById (id: string): Promise<User | null> {
    return await this.getfindFirst(id)
  }

  public async create (data: UserType): Promise<User> {
    return await this.getCreate(data)
  }

  public async update (data: UserType, id: string): Promise<UserType> {
    return await this.getUpdate(data, id)
  }

  public async remove (id: string): Promise<void> {
    await this.getDelete(id)
  }

  // Exemplo de chamada customizada
  public async search (search: SearchType): Promise<UserType & { id: string } | null> {
    return await this._prismaCustom.user.findUnique({
      where: {
        name: search.name,
        email: search.email,
        phone: search.phone,
        createdAt: search.createdAt,
        updatedAt: search.updatedAt
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
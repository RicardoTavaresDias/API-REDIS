import { User } from "@prisma/client";
import { Repository } from "./Repository"
import prisma from "@/lib/prisma";

type UserType = Omit<User, "id" | "createdAt" | "updatedAt">

type SearchType = {
  name?: string, 
  email?: string, 
  phone?: string,
  createdAt?: Date
  updatedAt?: Date
}

class UserRepository extends Repository<typeof prisma.user, User, UserType> {
  constructor () {
    super(prisma.user)
  }
  
  public search (search: SearchType | SearchType[]): Promise<UserType & { id: string } | null> {
    const filters = Array.isArray(search) ? search : [search]
    return this._model.findFirst({
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
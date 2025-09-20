import { User } from "@prisma/client";
import { Repository } from "./Repository"
import prisma from "@/lib/prisma";
import { SearchType, Tsearch, UserType } from "@/types/TUsers";

class UserRepository extends Repository<typeof prisma.user, User, UserType> {
  constructor () {
    super(prisma.user)
  }
  
  public search (search: SearchType | SearchType[]): Promise<Tsearch> {
    const filters = Array.isArray(search) ? search : [search]
    return this._model.findMany({
      where: {
        OR: [
         filters[0].email ? {
            email: {
              contains: filters[0].email
            }
          } : {},
          filters[0].name ? {
            name: {
              contains: filters[0].name
            }
          } : {},
          filters[0].phone ? {
            phone: {
              contains: filters[0].phone
            }
          } : {},
          filters[0].createdAt ? {
            createdAt: {
              equals: filters[0].createdAt
            }
          } : {},
          filters[0].updatedAt ? {
            updatedAt: {
              equals: filters[0].updatedAt
            }
          } : {}
        ]
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
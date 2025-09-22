import { Prisma, Product, User } from "@prisma/client";
import { Repository } from "./Repository";
import prisma from "@/lib/prisma";
import { ListProductUserType, ProductType } from "@/types/TProducts";
import { AppError } from "@/utils/AppError";
import { redisGet, redisSet } from "@/cache";

class ProductRepository extends Repository<Prisma.ProductDelegate, Product, ProductType> {
  constructor () {
    super(prisma.product)
  }

  public async listProductsUser (nameUSer: string): Promise<ListProductUserType> {
    const resultRedis = await redisGet<ListProductUserType>(`listProductsUser${nameUSer}`)

    if (resultRedis) {
      return resultRedis
    }

    const result = await this._model.findMany({
      where: { 
        user: { 
          name: { 
            contains: nameUSer 
          } 
        } 
      },
      include: { 
        user: true 
      }
    })
   
    if (result.length === 0) {
      throw new AppError("Usuario não encontrado para lista produtos", 404)
    }

    const user = result[0].user as User
    const products = result.map(product => {
      const { user, ...productsData } = product
      return productsData
    })
   
    const data =  { user, products }

    await redisSet<ListProductUserType>(`listProductsUser${nameUSer}`, data)
    return data
  }
}

export { ProductRepository }
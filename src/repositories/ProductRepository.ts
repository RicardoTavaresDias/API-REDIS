import { Prisma, Product, User } from "@prisma/client";
import { Repository } from "./Repository";
import prisma from "@/lib/prisma";
import { ListProductUserType, ProductType } from "@/types/TProducts";

class ProductRepository extends Repository<Prisma.ProductDelegate, Product, ProductType> {
  constructor () {
    super(prisma.product)
  }

  public async listProductsUser (id: string): Promise<ListProductUserType> {
    const result = await this._model.findMany({
      where: {
        fkUser: id
      },
      include: {
        user: true
      }
    })

    const user = result[0].user as User
    const products = result.map(product => {
      const { user, ...productsData } = product
      return productsData
    })

    return { user, products }
  }
}

export { ProductRepository }
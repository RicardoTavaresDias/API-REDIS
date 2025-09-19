import { Product, User } from "@prisma/client";
import { Repository } from "./Repository";
import prisma from "@/lib/prisma";

type ProductType = Omit<Product, "id" | "createdAt" | "updatedAt">

type ListProductUserType = {
  user: User
  products: Product[]
}

class ProductRepository extends Repository<typeof prisma.product, Product, ProductType> {
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

    const user = result[0].user
    const products = result.map(product => {
      const { user, ...productsData } = product
      return productsData
    })

    return { user, products }
  }
}

export { ProductRepository }
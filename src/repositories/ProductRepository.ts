import { Product } from "@prisma/client";
import { Repository } from "./Repository";
import prisma from "@/lib/prisma";

class ProductRepository extends Repository {
  constructor () {
    super("product", prisma)
  }

  public async getAll(): Promise<Product[]> {
    return await this._findMany()
  }
}

export { ProductRepository }
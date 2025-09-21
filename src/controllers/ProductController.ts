import { Request, Response } from "express"
import { ProductRepository } from "@/repositories/ProductRepository"
import { Controller } from "./Controller";
import { Product } from "@prisma/client";
import { dataUpdateProduct, type TUpdateProduct, dataCreateProduct, type ICreateProduct, nameUSerSchema, type NameUserType } from "@/schemas/porductSchemas";
import { ProductType } from "@/types/TProducts";

class ProductController extends Controller<Product, ProductType, TUpdateProduct, ICreateProduct> {
  private repositoryProduct: ProductRepository

  constructor() {
    super(ProductRepository, dataUpdateProduct, dataCreateProduct)
    this.repositoryProduct = new ProductRepository()
  }

  public listProduct = async (request: Request, response: Response) => {
    try {
      const nameSchema = nameUSerSchema.safeParse(request.query)
      if (!nameSchema.success) {
        return response.status(400).json({ message: nameSchema.error.flatten().fieldErrors })
      }

      const { name } = nameSchema.data as NameUserType

      const result = await this.repositoryProduct.listProductsUser(name)
      response.status(200).json(result)
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message })
      }
      
      response.status(500).json({ message: error })
    }
  }
}

export { ProductController }
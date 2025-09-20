import { Request, Response } from "express"
import { ProductRepository } from "@/repositories/ProductRepository"
import { Controller } from "./Controller";
import { Product } from "@prisma/client";
import { dataUpdateProduct, type TUpdateProduct, dataCreateProduct, type ICreateProduct } from "@/schemas/porductSchemas";
import { ProductType } from "@/types/TProducts";

class ProductController extends Controller<Product, ProductType, TUpdateProduct, ICreateProduct> {
  private repositoryProduct: ProductRepository

  constructor() {
    super(ProductRepository, dataUpdateProduct, dataCreateProduct)
    this.repositoryProduct = new ProductRepository()
  }

  listProduct = async (request: Request, response: Response) => {
    try {
      const result = await this.repositoryProduct.listProductsUser('000b5c0f-1baa-4fe4-abcf-2dde8453f252')
      response.status(200).json(result)
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: error })
    }
  }
}

export { ProductController }
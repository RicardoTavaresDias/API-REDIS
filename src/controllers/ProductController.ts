import { Request, Response } from "express";
import { ProductRepository } from "@/repositories/ProductRepository"

class ProductController {
  private productRepository: ProductRepository

  constructor() {
    this.productRepository = new ProductRepository()
  }

  getProductAll = async (request: Request, response: Response) => {
    try {
      const pagination = { page: 2, limit: 5 }
      const result = await this.productRepository.findMany(pagination)

      response.status(200).json(result)
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: error })
    }
  }

  getByProduct = async (request: Request, response: Response) => {
    try {
      const result = await this.productRepository.listProductsUser('00084cea-f962-4f16-8b74-566052917c22')

      response.status(200).json(result)
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: error })
    }
   }
}

export { ProductController }
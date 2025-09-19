import { ProductRepository } from "@/repositories/ProductRepository"
import { Controller } from "./Controller";

class ProductController extends Controller {
  constructor() {
    super(ProductRepository)
  }
}

export { ProductController }
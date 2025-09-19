import { Router } from "express";
import { ProductController } from "@/controllers/ProductController";

const productRouter = Router()
const productController = new ProductController()

productRouter.get("/", productController.getProductAll)
productRouter.get("/id", productController.getByProduct)

export { productRouter }
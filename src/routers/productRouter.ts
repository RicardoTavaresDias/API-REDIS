import { Router } from "express";
import { ProductController } from "@/controllers/ProductController";

const productRouter = Router()
const productController = new ProductController()

productRouter.get("/", productController.get)
productRouter.get("/:id", productController.getById)
productRouter.post("/", productController.create)
productRouter.patch("/:id", productController.update)
productRouter.delete("/:id", productController.remove)

export { productRouter }
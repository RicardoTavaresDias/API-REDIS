import { Router } from "express";
import { ProductController } from "@/controllers/ProductController";
import { ErrorHandling } from "@/middlewares/ErrorHandling";

const productRouter = Router()
const productController = new ProductController()

productRouter.use(ErrorHandling)
productRouter.get("/", productController.get)
productRouter.get("/User-products", productController.listProduct)
productRouter.get("/:id", productController.getById)
productRouter.post("/", productController.create)
productRouter.patch("/:id", productController.update)
productRouter.delete("/:id", productController.remove)

export { productRouter }
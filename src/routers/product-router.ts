import { Router } from "express";
import { ProductController } from "@/controllers/Product-controller";
import { RequestBalance } from "@/middlewares/Request-Balance";

const productRouter = Router()
const productController = new ProductController()

productRouter.get("/", productController.get)
productRouter.get("/User-products", RequestBalance("user", 5), productController.listProduct)
productRouter.get("/:id", RequestBalance("user", 5), productController.getById)
productRouter.post("/", RequestBalance("user", 5), productController.create)
productRouter.patch("/:id", RequestBalance("user", 5), productController.update)
productRouter.delete("/:id", RequestBalance("user", 5), productController.remove)

export { productRouter }
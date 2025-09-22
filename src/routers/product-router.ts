import { Router } from "express";
import { ProductController } from "@/controllers/Product-controller";
import { RequestBalance } from "@/middlewares/Request-Balance";

const productRouter = Router()
const productController = new ProductController()

productRouter.get("/", productController.get)
productRouter.get("/user-products", RequestBalance("product", 5), productController.listProduct)
productRouter.get("/:id", RequestBalance("product", 5), productController.getById)
productRouter.post("/", RequestBalance("product", 5), productController.create)
productRouter.patch("/:id", RequestBalance("product", 5), productController.update)
productRouter.delete("/:id", RequestBalance("product", 5), productController.remove)

export { productRouter }
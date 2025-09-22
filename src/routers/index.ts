import { Router } from "express";
import { userRouter } from "./user-router";
import { productRouter } from "./product-router";

const router = Router()

router.use("/users", userRouter)
router.use("/products", productRouter)

export { router }
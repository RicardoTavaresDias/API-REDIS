import { Router } from "express";
import { userRouter } from "./userRouter";
import { productRouter } from "./productRouter";

const router = Router()

router.use("/users", userRouter)
router.use("/products", productRouter)

export { router }
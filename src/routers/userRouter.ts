import { Router } from "express";
import { UserController } from "@/controllers/UsersController";

const userRouter = Router()
const userController = new UserController()

userRouter.get("/", userController.get)
userRouter.get("/:id", userController.getById)
userRouter.post("/", userController.create)
userRouter.patch("/:id", userController.update)
userRouter.delete("/:id", userController.remove)

export { userRouter }
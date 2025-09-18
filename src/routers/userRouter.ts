import { Router } from "express";
import { UserController } from "@/controllers/UsersController";

const userRouter = Router()
const userController = new UserController()

userRouter.get("/", userController.getUserAll)
userRouter.get("/:id", userController.getByUser)

export { userRouter }
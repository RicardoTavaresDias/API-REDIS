import { Router } from "express";
import { UserController } from "@/controllers/UsersController";
import { ErrorHandling } from "@/middlewares/ErrorHandling";

const userRouter = Router()
const userController = new UserController()

userRouter.use(ErrorHandling)
userRouter.get("/", userController.get)
userRouter.get("/search", userController.searchUser)
userRouter.get("/:id", userController.getById)
userRouter.post("/", userController.create)
userRouter.patch("/:id", userController.update)
userRouter.delete("/:id", userController.remove)

export { userRouter }
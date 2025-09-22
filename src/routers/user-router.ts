import { Router } from "express";
import { UserController } from "@/controllers/Users-controller";
import { RequestBalance } from "@/middlewares/Request-Balance";

const userRouter = Router()
const userController = new UserController()

userRouter.get("/", userController.get)
userRouter.get("/search", RequestBalance("user", 5), userController.searchUser)
userRouter.get("/:id", RequestBalance("user", 5), userController.getById)
userRouter.post("/", RequestBalance("user", 5), userController.create)
userRouter.patch("/:id", RequestBalance("user", 5), userController.update)
userRouter.delete("/:id", RequestBalance("user", 5), userController.remove)

export { userRouter }
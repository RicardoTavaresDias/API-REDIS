import { Request, Response } from "express"
import { UserType } from "@/types/TUsers"
import { Controller } from "./Controller"
import { User } from "@prisma/client"
import { dataUpdateUser, type TUpdateUserUser, dataCreateUser, type ICreateUser, searchUserSchema } from "@/schemas/user-schemas"
import { UserRepository } from "@/repositories/User-repository"

class UserController extends Controller<User, UserType, TUpdateUserUser, ICreateUser> {
  private repositoryUser: UserRepository

  constructor () {
    super(UserRepository, dataUpdateUser, dataCreateUser)
    this.repositoryUser = new UserRepository()
  }

  public searchUser = async (request: Request, response: Response) => {
    const searchSchema = searchUserSchema.safeParse(request.query)
    if (!searchSchema.success) {
      return response.status(400).json({ message: searchSchema.error.flatten().fieldErrors })
    }

    const result = await this.repositoryUser.search(searchSchema.data)
    if(!result?.length) {
      return response.status(400).json({ message: "Usuario não encontrado." })
    }

    response.status(200).json(result)
  }
}

export { UserController }
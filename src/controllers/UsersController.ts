import { Request, Response } from "express"
import { UserType } from "@/types/TUsers"
import { Controller } from "./Controller"
import { User } from "@prisma/client"
import { dataUpdateUser, type TUpdateUserUser, dataCreateUser, type ICreateUser } from "@/schemas/userSchemas"
import { UserRepository } from "@/repositories/UserRepository"

class UserController extends Controller<User, UserType, TUpdateUserUser,ICreateUser> {
  private repositoryUser: UserRepository

  constructor () {
    super(UserRepository, dataUpdateUser, dataCreateUser)
    this.repositoryUser = new UserRepository()
  }

  public searchUser = async (request: Request, response: Response) => {
    try {
      const result = await this.repositoryUser.search({ name: "sfgsghfdg" })
      if(!result?.length) {
        return response.status(400).json({ message: "Usuario não encontrado." })
      }

      response.status(200).json(result)
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: error })
    }
  }
}

export { UserController }
import { Request, Response } from "express"
import { UserRepository } from "@/repositories/UserRepository"
import { userByIdSchema } from "@/schemas/userSchemas"

class UserController {
  private userRepository: UserRepository

  constructor () {
    this.userRepository = new UserRepository()
  }

  getUserAll = async  (request: Request, response: Response) => {
    try {
      const result = await this.userRepository.getAll()

      response.status(200).json(result)
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: error })
    }
  }

  getByUser = async (request : Request, response: Response) => {
    try {
      const idUser = userByIdSchema.safeParse(request.params)
      if (!idUser.success) {
        response.status(400).json({ message: idUser.error.flatten().fieldErrors })
      }

      const result = await this.userRepository.getById(request.params.id)

      response.status(200).json(result)
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: error })
    }
  }
}

export { UserController }
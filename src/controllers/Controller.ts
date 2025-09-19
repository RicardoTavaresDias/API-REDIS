import { userByIdSchema } from "@/schemas/userSchemas";
import { Request, Response } from "express";

abstract class Controller {
  protected readonly repository: any

  constructor(repository: any) {
    this.repository = new repository()
  }

  get = async (request: Request, response: Response) => {
    try {
      const pagination = { page: 2, limit: 5 }
      const result = await this.repository.findMany(pagination)

      response.status(200).json(result)
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: error })
    }
  }

  getById = async (request: Request, response: Response) => {
    try {
      const idUser = userByIdSchema.safeParse(request.params)
      if (!idUser.success) {
        response.status(400).json({ message: idUser.error.flatten().fieldErrors })
      }

      const result = await this.repository.findFirst(request.params.id)
      if(!result) {
        response.status(400).json({ message: "Não encontrado." })
      }

      response.status(200).json(result)
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: error })
    }
  }

  create = async (request : Request, response: Response) => {
    try {
      
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: error })
    }
  }

  update = async (request : Request, response: Response) => {
    try {
      
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: error })
    }
  }

  remove = async (request : Request, response: Response) => {
    try {
      const idUser = userByIdSchema.safeParse(request.params)
      if (!idUser.success) {
        response.status(400).json({ message: idUser.error.flatten().fieldErrors })
      }

      await this.repository.delete(request.params.id)
      response.status(200).json()
    } catch (error) {
      if (error instanceof Error) {
        response.status(400).json({ message: error.message })
      }

      response.status(500).json({ message: error })
    }
  }
}

export { Controller }
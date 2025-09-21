import { IRepository } from "@/repositories/interface/IRepository";
import { IdParams } from "@/schemas";
import { Request, Response } from "express";
import { ZodSchema } from "zod";

type RepositoryClass<T, D> = new () => IRepository<T, D>

abstract class Controller<T, D, IUpdate, ICreate>{
  private readonly repository: IRepository<T, D>
  private readonly updateSchema: ZodSchema<IUpdate>
  private readonly createSchema: ZodSchema<ICreate>

  constructor(repository: RepositoryClass<T, D>, updateSchema: ZodSchema<IUpdate>, createSchema: ZodSchema<ICreate>) {
    this.repository = new repository()
    this.updateSchema = updateSchema
    this.createSchema = createSchema
  }

  public get = async (request: Request, response: Response) => {
    try {
      const pagination = { page: 2, limit: 5 }
      const result = await this.repository.findMany(pagination)

      response.status(200).json(result)
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: error })
    }
  }

  public getById = async (request: Request, response: Response) => {
    try {
      const id = IdParams.safeParse(request.params)
      if (!id.success) {
        response.status(400).json({ message: id.error.flatten().fieldErrors })
      }

      const result = await this.repository.findFirst(id.data!.id)
      if(!result) {
        response.status(400).json({ message: "Não encontrado." })
      }

      response.status(200).json(result)
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: error })
    }
  }

  public create = async (request : Request, response: Response) => {
    try {
      const create = this.createSchema.safeParse(request.body)
      if (!create.success) {
        response.status(400).json({ message: create.error.flatten()!.fieldErrors })
      }
   
      const result = await this.repository.create(create.data as D)
      response.status(201).json(result)
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: error })
    }
  }

  public update = async (request : Request, response: Response) => {
    try {
      const id = IdParams.safeParse(request.params)
      if (!id.success) {
        response.status(400).json({ message: id.error.flatten().fieldErrors })
      }

      const update = this.updateSchema.safeParse(request.body)
      if (!update.success) {
        response.status(400).json({ message: update.error.flatten()!.fieldErrors })
      }

      const result = await this.repository.update(update.data as D, id.data!.id)
      response.status(200).json(result)      
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: error })
    }
  }

  public remove = async (request : Request, response: Response) => {
    try {
       const id = IdParams.safeParse(request.params)
      if (!id.success) {
        response.status(400).json({ message: id.error.flatten().fieldErrors })
      }

      await this.repository.delete(id.data!.id)
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
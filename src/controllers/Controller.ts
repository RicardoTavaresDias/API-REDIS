import { IRepository } from "@/repositories/interface/IRepository";
import { IdParams, PaginationSchema } from "@/schemas";
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
    const host: string = request.originalUrl.split("?")[0].replace("/", "")
    const pagination = PaginationSchema.safeParse(request.query)

    if (!pagination.success) {
      return response.status(400).json({ message: pagination.error.flatten().fieldErrors })
    }
    const result = await this.repository.findMany(host, pagination.data)

    response.status(200).json(result)
  }

  public getById = async (request: Request, response: Response) => {
    const id = IdParams.safeParse(request.params)
    if (!id.success) {
      return response.status(400).json({ message: id.error.flatten().fieldErrors })
    }

    const result = await this.repository.findFirst(id.data!.id)
    if(!result) {
      return response.status(400).json({ message: "Não encontrado." })
    }

    response.status(200).json(result)
  }

  public create = async (request : Request, response: Response) => {
    const create = this.createSchema.safeParse(request.body)
    if (!create.success) {
      return response.status(400).json({ message: create.error.flatten().fieldErrors })
    }
  
    const result = await this.repository.create(create.data! as D)
    response.status(201).json(result)
  }

  public update = async (request : Request, response: Response) => {
    const id = IdParams.safeParse(request.params)
    if (!id.success) {
      return response.status(400).json({ message: id.error.flatten().fieldErrors })
    }

    const update = this.updateSchema.safeParse(request.body)
    if (!update.success) {
      return response.status(400).json({ message: update.error.flatten().fieldErrors })
    }

    const result = await this.repository.update(update.data!, id.data.id)
    response.status(200).json(result)      
  }

  public remove = async (request : Request, response: Response) => {
    const id = IdParams.safeParse(request.params)
    if (!id.success) {
      return response.status(400).json({ message: id.error.flatten().fieldErrors })
    }

    await this.repository.delete(id.data.id)
    response.status(200).json()
  }
}

export { Controller }
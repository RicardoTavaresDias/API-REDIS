import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { ZodError } from "zod";

function ErrorHandling (error: any, request: Request, response: Response) {

  if (error instanceof ZodError) {
    return response.status(400).json({ message: "validation error",  issues: error.format() })
  }

  if(error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message })
  }


  return response.status(500).json({ message: error.message, error: error.meta })
}

export { ErrorHandling }
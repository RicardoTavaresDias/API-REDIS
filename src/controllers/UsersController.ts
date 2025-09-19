import { UserRepository } from "@/repositories/UserRepository"
import { Controller } from "./Controller"

class UserController extends Controller {
  constructor () {
    super(UserRepository)
  }
}

export { UserController }
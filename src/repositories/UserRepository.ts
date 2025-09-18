import { User } from "@prisma/client";
import { Repository } from "./Repository";

class UserRepository extends Repository {
  constructor () {
    super()
  }
  
  public async getUsers (): Promise<User[]> {
    return await this.findMany("user")
  }

  public async getByUser (id: string): Promise<User> {
    return await this.findFirst('user', id)
  }
}

export { UserRepository }
import { Prisma, User } from '@prisma/client'
import { IUserRepository } from '../IUsersRepository'

export class InMemoryUsersRepository implements IUserRepository {
  public items: User[] = []

  public async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  public async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      nome: data.nome,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}

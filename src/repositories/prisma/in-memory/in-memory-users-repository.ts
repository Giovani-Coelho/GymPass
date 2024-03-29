import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { IUserRepository } from '../../interface/IUsersRepository'

export class InMemoryUsersRepository implements IUserRepository {
  public items: User[] = []

  public async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  public async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  public async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      nome: data.nome,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}

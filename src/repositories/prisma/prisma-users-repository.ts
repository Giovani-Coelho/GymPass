import { prisma } from '../../lib/prisma'
import { Prisma, User } from '@prisma/client'
import { IUserRepository } from '../interface/IUsersRepository'

export class PrismaUsersRepository implements IUserRepository {
  public async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  public async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}

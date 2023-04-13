import { Prisma, CheckIn } from '@prisma/client'
import { ICheckInsRepository } from '../interface/ICheck-ins-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements ICheckInsRepository {
  public async create(
    data: Prisma.CheckInUncheckedCreateInput,
  ): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  public async findbyUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('day')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          // a data tem que ser
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkIn
  }

  public async findManyByUserId(
    userId: string,
    page: number,
  ): Promise<CheckIn[]> {
    // take: para pegar 20 informacoes por pagina, skipe: fala quantos itens quer pular
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkIns
  }

  public async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })

    return checkIn
  }

  public async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  public async save(data: CheckIn): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkIn
  }
}

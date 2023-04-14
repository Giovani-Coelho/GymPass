import { Gym, Prisma } from '@prisma/client'
import {
  IFindManyNearbyParams,
  IGymsRepository,
} from '../interface/IGymsRepository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements IGymsRepository {
  public async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  public async findManyNearBy({
    latitude,
    longitude,
  }: IFindManyNearbyParams): Promise<Gym[]> {
    const gym = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms 
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gym
  }

  public async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          // para verificar se na busca contem o item da requisicao
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  public async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}

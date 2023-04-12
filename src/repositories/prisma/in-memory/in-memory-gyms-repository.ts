import { Gym, Prisma } from '@prisma/client'
import {
  IFindManyNearbyParams,
  IGymsRepository,
} from '../../interface/IGymsRepository'
import { randomUUID } from 'crypto'
import { getDistanceBetweenCoordinates } from '@/utils/getDistanceBetweenCoordinates'

export class InMemoryGymsRepository implements IGymsRepository {
  public items: Gym[] = []

  public async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  public async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(), // caso tenha sido passado um id use ele, caso contrario cria um
      title: data.title,
      description: data.description ?? null, // se nao existir retorna null
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }

  public async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  public async findManyNearBy(params: IFindManyNearbyParams): Promise<Gym[]> {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }
}

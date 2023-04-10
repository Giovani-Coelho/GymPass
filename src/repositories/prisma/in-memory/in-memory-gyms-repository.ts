import { Gym, Prisma } from '@prisma/client'
import { IGymsRepository } from '../../interface/IGymsRepository'
import { randomUUID } from 'crypto'

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
}

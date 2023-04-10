import { Gym } from '@prisma/client'
import { IGymsRepository } from '@/repositories/interface/IGymsRepository'

interface ICreateGymRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface ICreateGymResponse {
  gym: Gym
}

export class CreateGymUeCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private gymRepository: IGymsRepository) { }

  public async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: ICreateGymRequest): Promise<ICreateGymResponse> {
    // 6 round de codificacao da senha
    // eslint-disable-next-line no-undef

    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}

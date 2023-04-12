import { Gym } from '@prisma/client'
import { IGymsRepository } from '@/repositories/interface/IGymsRepository'

interface IFetchNearbyGymUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface IFetchNearbyGymUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private gymRepository: IGymsRepository) { }

  public async execute({
    userLatitude,
    userLongitude,
  }: IFetchNearbyGymUseCaseRequest): Promise<IFetchNearbyGymUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}

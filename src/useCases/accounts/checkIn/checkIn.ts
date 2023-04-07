import { ICheckInsRepository } from '@/repositories/interface/ICheck-ins-repository'
import { IGymsRepository } from '@/repositories/interface/IGymsRepository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFound } from '../errors/resourceNotFound'
import { getDistanceBetweenCoordinates } from '@/utils/getDistanceBetweenCoordinates'

interface ICheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface ICheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository, // eslint-disable-next-line prettier/prettier
  ) { }

  public async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFound()
    }

    // calcular a distancia entre o usuario e a academia
    // se a distancia for maior que 100m return err
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    // 100m
    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error()
    }

    const checkInOnsameDay = await this.checkInRepository.findbyUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnsameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}

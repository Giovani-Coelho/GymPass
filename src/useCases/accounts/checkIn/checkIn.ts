import { ICheckInsRepository } from '@/repositories/interface/ICheck-ins-repository'
import { CheckIn } from '@prisma/client'

interface ICheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface ICheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private checkInRepository: ICheckInsRepository) { }

  public async execute({
    userId,
    gymId,
  }: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}

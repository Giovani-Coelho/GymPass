import { ICheckInsRepository } from '@/repositories/interface/ICheck-ins-repository'

interface IGetUserMetricsUseCaseRequest {
  userId: string
}

interface IGetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private checkInsRepository: ICheckInsRepository) { }

  public async execute({
    userId,
  }: IGetUserMetricsUseCaseRequest): Promise<IGetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}

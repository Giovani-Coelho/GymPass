import { ICheckInsRepository } from '@/repositories/interface/ICheck-ins-repository'
import { CheckIn } from '@prisma/client'

interface IFetchCheckInHistoryRequest {
  userId: string
  page: number
}

interface IFetchCheckInHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchCheckInHistoryUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private checkInRepository: ICheckInsRepository) { }

  public async execute({
    userId,
    page,
  }: IFetchCheckInHistoryRequest): Promise<IFetchCheckInHistoryResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return {
      checkIns,
    }
  }
}

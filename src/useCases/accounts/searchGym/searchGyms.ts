import { Gym } from '@prisma/client'
import { IGymsRepository } from '@/repositories/interface/IGymsRepository'

interface ISearchGymsUseCaseRequest {
  query: string
  page: number
}

interface ISearchGymsUseCaseResponse {
  gym: Gym[]
}

export class SearchGymsUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private gymRepository: IGymsRepository) { }

  public async execute({
    query,
    page,
  }: ISearchGymsUseCaseRequest): Promise<ISearchGymsUseCaseResponse> {
    const gym = await this.gymRepository.searchMany(query, page)

    return { gym }
  }
}

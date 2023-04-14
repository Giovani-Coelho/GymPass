import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkIn-repository'
import { FetchCheckInHistoryUseCase } from '../accounts/fetchCheckInHistory/fetchCheckInHistory'

export function makeFetchCheckInHistoryUseCase() {
  const userRepository = new PrismaCheckInsRepository()
  const useCase = new FetchCheckInHistoryUseCase(userRepository)

  return useCase
}

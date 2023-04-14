import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkIn-repository'
import { GetUserMetricsUseCase } from '../accounts/userMetrics/getUserMetrics'

export function makeUserMetricsUseCase() {
  const userRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(userRepository)

  return useCase
}

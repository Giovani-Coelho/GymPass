import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkIn-repository'
import { CheckInUseCase } from '../accounts/checkIn/checkIn'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCheckInUseCase() {
  const userRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(userRepository, gymsRepository)

  return useCase
}

import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkIn-repository'
import { ValidateCheckInUseCase } from '../accounts/validateCheckIn/validateCheckIn'

export function makeValidateCheckInUseCase() {
  const userRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(userRepository)

  return useCase
}

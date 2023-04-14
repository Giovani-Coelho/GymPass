import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUeCase } from '../accounts/createGym/createGym'

export function makeCreateGymUseCase() {
  const userRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUeCase(userRepository)

  return useCase
}

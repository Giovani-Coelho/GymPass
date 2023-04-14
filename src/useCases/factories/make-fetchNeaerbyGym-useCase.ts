import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymUseCase } from '../accounts/FetchNearbyGym/fetchNearbyGym'

export function makeFetchNearbyUseCase() {
  const userRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymUseCase(userRepository)

  return useCase
}

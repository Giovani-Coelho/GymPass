import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsUseCaseUeCase } from '../accounts/searchGym/searchGyms'

export function makeSearchGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCaseUeCase(gymsRepository)

  return useCase
}

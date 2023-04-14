import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../accounts/UserProfile/getUserProfile'

export function makeUserProfileUseCase() {
  const userRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(userRepository)

  return useCase
}

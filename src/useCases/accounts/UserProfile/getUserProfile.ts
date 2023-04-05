import { User } from '@prisma/client'
import { IUserRepository } from '@/repositories/interface/IUsersRepository'
import { ResourceNotFound } from '../errors/resourceNotFound'

interface IGetUserProfileRequest {
  userId: string
}

interface IGetUserProfileResponse {
  user: User
}

export class GetUserProfileUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private usersRepository: IUserRepository) { }

  public async execute({
    userId,
  }: IGetUserProfileRequest): Promise<IGetUserProfileResponse> {
    // 6 round de codificacao da senha
    // eslint-disable-next-line no-undef

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFound()
    }

    return { user }
  }
}

import { UserAlreadyExistsError } from '../useCases/errors/userAlreadyExistsError'
import { hash } from 'bcryptjs'
import { IUserRepository } from '../repositories/IUsersRepository'

interface IRegisterUseCase {
  nome: string
  email: string
  password: string
}

export class RegisterUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private usersRepository: IUserRepository) { }

  public async execute({ nome, email, password }: IRegisterUseCase) {
    // 6 round de codificacao da senha
    // eslint-disable-next-line no-undef
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      nome,
      email,
      password_hash: passwordHash,
    })
  }
}

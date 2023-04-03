import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { describe, it, expect } from 'vitest'
import { UserAlreadyExistsError } from '../errors/userAlreadyExistsError'
import { RegisterUseCase } from './register'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      nome: 'Giovani Coelho',
      email: 'giovanicoelho2004@hotmail.com',
      password: '12345',
    })

    // espero que o id do usuario seja do tipo de qualquer string.
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upan registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      nome: 'Giovani Coelho',
      email: 'giovanicoelho20034@hotmail.com',
      password: '12345',
    })

    const isPasswordCorrectlyHashed = await compare('12345', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to regster with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'giovanicoelhoEx@hotmail.com'

    await registerUseCase.execute({
      nome: 'Giovani Coelho',
      email,
      password: '12345',
    })

    // espero que quando terminar a execucao ela retorne um erro do tipo UserAlreadyExistsError
    await expect(() =>
      registerUseCase.execute({
        nome: 'Giovani Coelho',
        email,
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

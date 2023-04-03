import { InMemoryUsersRepository } from '@/repositories/prisma/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'
import { UserAlreadyExistsError } from '../errors/userAlreadyExistsError'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      nome: 'Giovani Coelho',
      email: 'giovanicoelho2004@hotmail.com',
      password: '12345',
    })

    // espero que o id do usuario seja do tipo de qualquer string.
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upan registration', async () => {
    const { user } = await sut.execute({
      nome: 'Giovani Coelho',
      email: 'giovanicoelho20034@hotmail.com',
      password: '12345',
    })

    const isPasswordCorrectlyHashed = await compare('12345', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to regster with same email twice', async () => {
    const email = 'giovanicoelhoEx@hotmail.com'

    await sut.execute({
      nome: 'Giovani Coelho',
      email,
      password: '12345',
    })

    // espero que quando terminar a execucao ela retorne um erro do tipo UserAlreadyExistsError
    await expect(() =>
      sut.execute({
        nome: 'Giovani Coelho',
        email,
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

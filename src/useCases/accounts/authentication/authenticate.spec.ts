import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { describe, it, expect } from 'vitest'
import { InvalidCredentialError } from '../errors/invalid-creadentials-error'
import { AuthenticateUseCase } from './authenticate'

describe('Authenticate Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      nome: 'Giovani',
      email: 'giovanicoelho2004@hotmail.com',
      password_hash: await hash('12345', 6),
    })

    const { user } = await sut.execute({
      email: 'giovanicoelho2004@hotmail.com',
      password: '12345',
    })

    // espero que o id do usuario seja do tipo de qualquer string.
    expect(user.id).toEqual(expect.any(String))
  })

  it('sould not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    // espero que ao authenticar o usuario o email seja incorreto
    expect(() =>
      sut.execute({
        email: 'giovanicoelho2004@hotmail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('sould not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      nome: 'Giovani',
      email: 'giovanicoelho2004@hotmail.com',
      password_hash: await hash('12345', 6),
    })

    // espero que ao authenticar o usuario o email seja incorreto
    expect(() =>
      sut.execute({
        email: 'giovanicoelho2004@hotmail.com',
        password: '123465',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})

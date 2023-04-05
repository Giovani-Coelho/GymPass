import { InMemoryUsersRepository } from '@/repositories/prisma/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'
import { ResourceNotFound } from '../errors/resourceNotFound'
import { GetUserProfileUseCase } from './getUserProfile'

// const usersRepository = new InMemoryUsersRepository()
// const sut = new AuthenticateUseCase(usersRepository)

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      nome: 'Giovani',
      email: 'giovanicoelho2004@hotmail.com',
      password_hash: await hash('12345', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    // espero que o id do usuario seja do tipo de qualquer string.
    expect(user.id).toEqual(expect.any(String))
    expect(user.nome).toEqual('Giovani')
  })

  it('sould not be able to get user profile with wrong id', async () => {
    // espero que ao authenticar o usuario o email seja incorreto
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})

import { InMemoryCheckInsRepository } from '@/repositories/prisma/in-memory/in-memory-checkIn-repository'
import { afterEach, describe, it, expect, beforeEach, vi } from 'vitest'
import { CheckInUseCase } from './checkIn'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)

    // para usar datas ficticias
    vi.useFakeTimers()
  })

  // depois de executar os testes volte para as datas reais
  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    // espero que o id do usuario seja do tipo de qualquer string.
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in in twice in the same day', async () => {
    // para verificar se esta sendo criado na mesma data
    vi.setSystemTime(new Date(2023, 3, 20, 0, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    // espero que o id do usuario seja do tipo de qualquer string.
    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in in twice but in different days', async () => {
    // para verificar se esta sendo criado na mesma data
    vi.setSystemTime(new Date(2023, 3, 20, 0, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    // definindo outro dia
    vi.setSystemTime(new Date(2023, 3, 21, 0, 0, 0))

    // espero que o id do usuario seja do tipo de qualquer string.

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})

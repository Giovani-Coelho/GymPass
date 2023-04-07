import { InMemoryCheckInsRepository } from '@/repositories/prisma/in-memory/in-memory-checkIn-repository'
import { afterEach, describe, it, expect, beforeEach, vi } from 'vitest'
import { CheckInUseCase } from './checkIn'
import { InMemoryGymsRepository } from '@/repositories/prisma/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'academia',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

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
      userLatitude: 0,
      userLongitude: 0,
    })

    // espero que o id do usuario seja do tipo de qualquer string.
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in in twice in the same day', async () => {
    // para verificar se esta sendo criado na mesma data
    vi.setSystemTime(new Date(2023, 3, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in in twice but in different days', async () => {
    // para verificar se esta sendo criado na mesma data
    vi.setSystemTime(new Date(2023, 3, 20, 0, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    // definindo outro dia
    vi.setSystemTime(new Date(2023, 3, 21, 0, 0, 0))

    // espero que o id do usuario seja do tipo de qualquer string.

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym ', async () => {
    // localizacao da academia
    gymsRepository.items.push({
      id: 'gym-01',
      title: 'academia',
      description: '',
      phone: '',
      latitude: new Decimal(-27.5253294),
      longitude: new Decimal(153.0138339),
    })

    // localizacao do usaurio maior que 100m de distancia da academia
    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -27.5283838,
        userLongitude: 153.0298674,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})

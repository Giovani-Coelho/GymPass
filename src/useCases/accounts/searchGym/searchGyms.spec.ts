import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/prisma/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './searchGyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'SmartFit',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'Panobianco',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    const { gym } = await sut.execute({
      query: 'Panobianco',
      page: 1,
    })

    // espero que tenha o tamanho de 1, e que o retorno tenha...
    expect(gym).toHaveLength(1)
    expect(gym).toEqual([expect.objectContaining({ title: 'Panobianco' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `smartFit Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
    }

    const { gym } = await sut.execute({
      query: 'smartFit',
      page: 2,
    })

    expect(gym).toHaveLength(2)
    expect(gym).toEqual([
      expect.objectContaining({ title: 'smartFit Gym 21' }),
      expect.objectContaining({ title: 'smartFit Gym 22' }),
    ])
  })
})

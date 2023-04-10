import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/prisma/in-memory/in-memory-gyms-repository'
import { CreateGymUeCase } from './createGym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUeCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUeCase(gymsRepository)
  })

  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'academia',
      description: null,
      phone: null,
      latitude: -27.5253294,
      longitude: 153.0138339,
    })

    // espero que o id do usuario seja do tipo de qualquer string.
    expect(gym.id).toEqual(expect.any(String))
  })
})

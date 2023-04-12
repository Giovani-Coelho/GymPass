import { InMemoryCheckInsRepository } from '@/repositories/prisma/in-memory/in-memory-checkIn-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { GetUserMetricsUseCase } from './getUserMetrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Fetch Check-in History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics ', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    // espero que o id do usuario seja do tipo de qualquer string.
    expect(checkInsCount).toEqual(2)
  })
})

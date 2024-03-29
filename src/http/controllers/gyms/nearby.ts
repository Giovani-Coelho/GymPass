import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyUseCase } from '@/useCases/factories/make-fetchNeaerbyGym-useCase'

export async function nearby(req: FastifyRequest, res: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(req.query)

  const nearbyGymsUseCase = makeFetchNearbyUseCase()

  const { gyms } = await nearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return res.status(200).send({ gyms })
}

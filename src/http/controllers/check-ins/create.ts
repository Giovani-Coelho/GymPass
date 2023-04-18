import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/useCases/factories/make-checkIn-useCase'
import { MaxNumberOfCheckInError } from '@/useCases/accounts/errors/maxNumberOfCheckInError'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const { gymId } = createCheckInParamsSchema.parse(req.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(req.body)

  const createGymUseCase = makeCheckInUseCase()
  try {
    await createGymUseCase.execute({
      gymId,
      userId: req.user.sub,
      userLatitude: latitude,
      userLongitude: longitude,
    })
  } catch (err) {
    if (err instanceof MaxNumberOfCheckInError) {
      return res.status(400).send({ message: err.message })
    }
  }

  return res.status(201).send()
}

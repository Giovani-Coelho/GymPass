import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchCheckInHistoryUseCase } from '@/useCases/factories/make-fetchCheckInHistory-useCase'

export async function history(req: FastifyRequest, res: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(req.query)

  const checkInHistoryUseCase = makeFetchCheckInHistoryUseCase()

  const { checkIns } = await checkInHistoryUseCase.execute({
    userId: req.user.sub,
    page,
  })

  return res.status(200).send({ checkIns })
}

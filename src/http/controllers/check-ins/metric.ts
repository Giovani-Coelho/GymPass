import { FastifyRequest, FastifyReply } from 'fastify'
import { makeUserMetricsUseCase } from '@/useCases/factories/make-userMetrics-useCase'

export async function metrics(req: FastifyRequest, res: FastifyReply) {
  const checkInMetricUseCase = makeUserMetricsUseCase()

  const { checkInsCount } = await checkInMetricUseCase.execute({
    userId: req.user.sub,
  })

  return res.status(200).send({ checkInsCount })
}

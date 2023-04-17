import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchGymUseCase } from '@/useCases/factories/make-searchGym-useCase'

export async function search(req: FastifyRequest, res: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymsQuerySchema.parse(req.body)

  const searchGymsUseCase = makeSearchGymUseCase()

  const { gym } = await searchGymsUseCase.execute({
    query,
    page,
  })

  return res.status(200).send({ gym })
}

import { makeUserProfileUseCase } from '@/useCases/factories/make-userProfile-useCase'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(req: FastifyRequest, res: FastifyReply) {
  const getUserProfile = makeUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: req.user.sub,
  })

  return res.status(201).send({
    user: {
      ...user,
      // para nao retornar a senha do usuario
      password_hash: undefined,
    },
  })
}

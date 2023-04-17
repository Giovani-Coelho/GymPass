import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/varify-jwt'

export async function gymsRoutes(app: FastifyInstance) {
  // todas as rotas a partir desta linha vao ser verificada a authentication
  app.addHook('onRequest', verifyJWT)
}

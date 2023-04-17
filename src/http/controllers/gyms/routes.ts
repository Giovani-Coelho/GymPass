import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/varify-jwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'

export async function gymsRoutes(app: FastifyInstance) {
  // todas as rotas a partir desta linha vao ser verificada a authentication
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', create)
}

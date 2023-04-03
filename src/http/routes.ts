import { register } from './controllers/accounts/register'
import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/accounts/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}

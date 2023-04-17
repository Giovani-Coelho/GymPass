import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/varify-jwt'
import { register } from './register'

export async function accountRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}

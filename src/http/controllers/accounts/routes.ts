import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/varify-jwt'
import { register } from './register'
import { refresh } from './refresh'

export async function accountRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}

import fastify from 'fastify'
import { env } from './env'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { accountRoutes } from './http/controllers/accounts/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(accountRoutes)
app.register(gymsRoutes)

// o _ para falar que nao vou usar esse parametro
app.setErrorHandler((err, _, res) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .send({ message: 'validation error.', issues: err.format })
  }

  if (env.NODE_ENV !== 'production') console.error(err)

  return res.status(500).send({ message: 'Internal server error.' })
})

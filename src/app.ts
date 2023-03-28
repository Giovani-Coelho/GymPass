import fastify from 'fastify'
import { env } from 'process'
import { ZodError } from 'zod'
import { appRoutes } from '../src/http/routes'

export const app = fastify()

app.register(appRoutes)

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

import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(req: FastifyRequest, res: FastifyReply) {
  try {
    // verificar se o token enviado foi gerado por esse back-eng
    // essa funcao faz com que seja obrigatorio o uso de token
    await req.jwtVerify()
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
}

import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(req: FastifyRequest, res: FastifyReply) {
  // verificar se o token enviado foi gerado por esse backeng
  // essa funcao faz com que seja obrigatorio o uso de token
  await req.jwtVerify()

  console.log(req.user.sub)

  return res.status(201).send()
}

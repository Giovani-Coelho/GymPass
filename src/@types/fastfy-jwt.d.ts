import '@fastify/jwt'

// falar para o Fastfy de onde vem essa tag sub. Ela esta no corpo do JWT
declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      role: 'ADMIN' | 'MEMBER'
    }
  }
}

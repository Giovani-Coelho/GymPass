import { env } from '../env'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  // para habilitar o log apenas em ambiente de desenvolvimento
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})

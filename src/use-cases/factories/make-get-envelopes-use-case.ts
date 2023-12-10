import { PrismaEnvelopesRepository } from '../../repositories/prisma/prisma-envelopes-repositories'
import { GetEnvelopesUseCase } from '../envelopes-use-case/get-envelopes'

export function makeGetEnvelopesUseCase() {
  const envelopesRepository = new PrismaEnvelopesRepository()
  const getEnvelopesUseCase = new GetEnvelopesUseCase(envelopesRepository)

  return getEnvelopesUseCase
}

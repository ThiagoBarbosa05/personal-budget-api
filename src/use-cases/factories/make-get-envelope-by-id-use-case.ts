import { PrismaEnvelopesRepository } from '../../repositories/prisma/prisma-envelopes-repositories'
import { GetEnvelopeByIdUseCase } from '../envelopes-use-case/get-envelope-by-id'

export function makeGetEnvelopeByIdUseCase() {
  const envelopesRepository = new PrismaEnvelopesRepository()
  const getEnvelopeByIdUseCase = new GetEnvelopeByIdUseCase(envelopesRepository)

  return getEnvelopeByIdUseCase
}

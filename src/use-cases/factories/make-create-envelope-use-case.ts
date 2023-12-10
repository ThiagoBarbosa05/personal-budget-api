import { PrismaEnvelopesRepository } from '../../repositories/prisma/prisma-envelopes-repositories'
import { CreateEnvelopeUseCase } from '../envelopes-use-case/create-envelope'

export function makeCreateEnvelopeUseCase() {
  const envelopesRepository = new PrismaEnvelopesRepository()
  const createEnvelopeUseCase = new CreateEnvelopeUseCase(envelopesRepository)

  return createEnvelopeUseCase
}

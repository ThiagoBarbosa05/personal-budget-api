import { PrismaEnvelopesRepository } from '../../repositories/prisma/prisma-envelopes-repositories'
import { UpdateEnvelopeUseCase } from '../envelopes-use-case/update-envelope'

export function makeUpdateEnvelopeUseCase() {
  const envelopesRepository = new PrismaEnvelopesRepository()
  const updateEnvelopeUseCase = new UpdateEnvelopeUseCase(envelopesRepository)

  return updateEnvelopeUseCase
}

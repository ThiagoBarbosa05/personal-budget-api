import { PrismaEnvelopesRepository } from '../../repositories/prisma/prisma-envelopes-repositories'
import { DeleteEnvelopeByIdUseCase } from '../envelopes-use-case/delete-envelope'

export function makeDeleteEnvelopeUseCase() {
  const envelopesRepository = new PrismaEnvelopesRepository()
  const deleteEnvelopeUseCase = new DeleteEnvelopeByIdUseCase(
    envelopesRepository,
  )

  return deleteEnvelopeUseCase
}

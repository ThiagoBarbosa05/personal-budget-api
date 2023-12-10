import { prisma } from '../../lib/prisma'
import { Envelope } from '../../types'
import {
  DeleteEnvelopeByIdParams,
  EnvelopesRepository,
  GetEnvelopeByIdParams,
  TransferValueParams,
  UpdateEnvelopeByIdParams,
} from '../contracts/envelopes-repository'

export class PrismaEnvelopesRepository implements EnvelopesRepository {
  async create(data: Envelope) {
    const envelope = await prisma.envelope.create({
      data,
    })

    return envelope
  }

  async getAllEnvelopes(userId: string) {
    const envelopes = await prisma.envelope.findMany({
      where: {
        user_id: userId,
      },
    })

    return envelopes
  }

  async getEnvelopeById({ id, userId }: GetEnvelopeByIdParams) {
    const envelope = await prisma.envelope.findFirst({
      where: {
        id,
        user_id: userId,
      },
    })

    return envelope
  }

  updateEnvelopeById(data: UpdateEnvelopeByIdParams): Promise<Envelope | null> {
    throw new Error('Method not implemented.')
  }

  deleteEnvelopeById({ id, userId }: DeleteEnvelopeByIdParams): Promise<void> {
    throw new Error('Method not implemented.')
  }

  transferValue({
    amountToUpdate,
    destinationId,
    originId,
    userId,
  }: TransferValueParams): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

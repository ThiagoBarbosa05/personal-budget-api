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
    const envelopesResponse = await prisma.envelope.findMany({
      where: {
        user_id: userId,
      },
      include: {
        Transaction: true,
      },
    })

    const envelopes = envelopesResponse.map((env) => ({
      ...env,
      totalAmountTransactions: env.Transaction.reduce(
        (sum, transaction) => sum + transaction.payment_amount,
        0,
      ),
    }))

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

  async updateEnvelopeById({
    id,
    updatedAt,
    userId,
    amount,
    description,
  }: UpdateEnvelopeByIdParams) {
    const envelope = await prisma.envelope.update({
      data: {
        description,
        amount,
        updated_at: updatedAt,
      },
      where: {
        id,
        user_id: userId,
      },
    })

    return envelope
  }

  async deleteEnvelopeById({ id, userId }: DeleteEnvelopeByIdParams) {
    await prisma.envelope.delete({
      where: {
        id,
        user_id: userId,
      },
    })
  }

  async transferValue({
    amountToUpdate,
    destinationId,
    originId,
    userId,
  }: TransferValueParams) {
    await prisma.$transaction([
      prisma.envelope.update({
        where: { id: originId, user_id: userId },
        data: { amount: { decrement: amountToUpdate } },
      }),

      prisma.envelope.update({
        where: { id: destinationId, user_id: userId },
        data: { amount: { increment: amountToUpdate } },
      }),
    ])
  }
}

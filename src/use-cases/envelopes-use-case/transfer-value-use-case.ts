import { EnvelopesRepository } from '../../repositories/contracts/envelopes-repository'
import { InsufficientFundsToTransfer } from '../errors/insufficient-funds-to-transfer'
import { ResourceNotFoundError } from '../errors/resource-not-found'

export interface TransferValueUseCaseData {
  amountToUpdate: number
  destinationId: string
  originId: string
  userId: string
}

export class TransferValueUseCase {
  constructor(private envelopeRepository: EnvelopesRepository) {}

  async execute({
    amountToUpdate,
    originId,
    destinationId,
    userId,
  }: TransferValueUseCaseData) {
    const amountToUpdateInCents = amountToUpdate * 100

    // const envelopes = await prisma.envelope.findMany({
    //   where: {
    //     id: { in: [amountFrom, amountTo] },
    //     user_id: userId,
    //   },
    // })

    const envelopes = await this.envelopeRepository.getAllEnvelopes(userId)

    if (!envelopes) {
      throw new ResourceNotFoundError()
    }

    const originEnvelope = envelopes.find(
      (envelope) => envelope.id === originId,
    )
    const destinationEnvelope = envelopes.find(
      (envelope) => envelope.id === destinationId,
    )

    if (!originEnvelope || !destinationEnvelope) {
      throw new ResourceNotFoundError()
    }

    if (originEnvelope.amount < amountToUpdateInCents) {
      throw new InsufficientFundsToTransfer()
    }

    await this.envelopeRepository.transferValue({
      userId,
      amountToUpdate: amountToUpdateInCents,
      originId,
      destinationId,
    })

    // await prisma.$transaction([
    //   prisma.envelope.update({
    //     where: { id: amountFrom, user_id: userId },
    //     data: { amount: { decrement: amountToUpdateInCents } },
    //   }),

    //   prisma.envelope.update({
    //     where: { id: amountTo, user_id: userId },
    //     data: { amount: { increment: amountToUpdateInCents } },
    //   }),
    // ])
  }
}

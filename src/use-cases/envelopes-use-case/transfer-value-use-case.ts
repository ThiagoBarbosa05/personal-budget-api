import { EnvelopesRepository } from '../../repositories/contracts/envelopes-repository'
import { InsufficientFundsToTransfer } from '../errors/insufficient-funds-to-transfer'
import { ResourceNotFoundError } from '../errors/resource-not-found'

export interface TransferValueUseCaseRequest {
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
  }: TransferValueUseCaseRequest) {
    const envelopes = await this.envelopeRepository.getAllEnvelopes(userId)

    if (!envelopes) {
      throw new ResourceNotFoundError()
    }

    const originEnvelope = envelopes.find((env) => env.id === originId)
    const destinationEnvelope = envelopes.find(
      (env) => env.id === destinationId,
    )

    const amountToTransferInCents = amountToUpdate * 100

    if (!originEnvelope || !destinationEnvelope) {
      throw new ResourceNotFoundError()
    }

    if (
      originEnvelope.amount < amountToTransferInCents ||
      amountToTransferInCents >
        originEnvelope.amount - originEnvelope.totalAmountTransactions!
    ) {
      throw new InsufficientFundsToTransfer()
    }

    await this.envelopeRepository.transferValue({
      userId,
      amountToUpdate: amountToTransferInCents,
      originId,
      destinationId,
    })
  }
}

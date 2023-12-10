import { EnvelopesRepository } from '../../repositories/contracts/envelopes-repository'
import { TransactionsRepository } from '../../repositories/contracts/transactions-repository'
import { Transaction } from '../../types'
import { InsufficientFundsToTransfer } from '../errors/insufficient-funds-to-transfer'
import { ResourceNotFoundError } from '../errors/resource-not-found'

interface CreateTransactionUseCaseRequest {
  payment_amount: number
  payment_recipient: string
  envelope_id: string
  user_id: string
}

interface CreateTransactionUseCaseResponse {
  transaction: Transaction
}

export class CreateTransactionUseCase {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private envelopesRepository: EnvelopesRepository,
  ) {}

  async execute({
    envelope_id,
    payment_amount,
    payment_recipient,
    user_id,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const paymentAmountInCents = payment_amount * 100

    const envelopeAmountToUpdate =
      await this.envelopesRepository.getEnvelopeById({
        id: envelope_id,
        userId: user_id,
      })

    if (!envelopeAmountToUpdate) {
      throw new ResourceNotFoundError()
    }

    if (paymentAmountInCents > envelopeAmountToUpdate?.amount) {
      throw new InsufficientFundsToTransfer()
    }

    const transaction = await this.transactionsRepository.create({
      envelope_id,
      payment_amount: paymentAmountInCents,
      payment_recipient,
    })

    const amountToUpdate = envelopeAmountToUpdate.amount - paymentAmountInCents

    await this.envelopesRepository.updateEnvelopeById({
      id: envelope_id,
      updatedAt: new Date(),
      amount: amountToUpdate,
      userId: user_id,
    })

    return { transaction }
  }
}

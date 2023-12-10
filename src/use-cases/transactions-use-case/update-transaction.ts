import { EnvelopesRepository } from '../../repositories/contracts/envelopes-repository'
import { TransactionsRepository } from '../../repositories/contracts/transactions-repository'
import { Transaction } from '../../types'
import { InsufficientFundsToTransfer } from '../errors/insufficient-funds-to-transfer'
import { ResourceNotFoundError } from '../errors/resource-not-found'

interface UpdateTransactionUseCaseRequest {
  transaction_id: string
  payment_amount?: number
  payment_recipient?: string
  envelope_id: string
  user_id: string
}

interface UpdateTransactionUseCaseResponse {
  transactionUpdated: Transaction
}

export class UpdateTransactionUseCase {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private envelopesRepository: EnvelopesRepository,
  ) {}

  async execute({
    payment_recipient,
    transaction_id,
    payment_amount,
    envelope_id,
    user_id,
  }: UpdateTransactionUseCaseRequest): Promise<UpdateTransactionUseCaseResponse> {
    const paymentAmountInCents = payment_amount && payment_amount * 100

    const envelopeAmountToUpdate =
      await this.envelopesRepository.getEnvelopeById({
        id: envelope_id,
        userId: user_id,
      })

    if (!envelopeAmountToUpdate) {
      throw new ResourceNotFoundError()
    }

    if (
      paymentAmountInCents &&
      paymentAmountInCents > envelopeAmountToUpdate.amount
    ) {
      throw new InsufficientFundsToTransfer()
    }

    const transactionUpdated =
      await this.transactionsRepository.updateTransaction({
        transaction_id,
        payment_amount: paymentAmountInCents,
        payment_recipient,
        updated_at: new Date(),
      })

    const amountToUpdate = paymentAmountInCents
      ? envelopeAmountToUpdate.amount - paymentAmountInCents
      : envelopeAmountToUpdate.amount

    const envelopeAmountUpdatedByTransaction =
      await this.envelopesRepository.updateEnvelopeById({
        id: envelope_id,
        updatedAt: new Date(),
        amount: amountToUpdate,
        userId: user_id,
      })

    console.log({
      envelopeAmountToUpdate,
      transactionUpdated,
      envelopeAmountUpdatedByTransaction,
    })
    return { transactionUpdated }
  }
}

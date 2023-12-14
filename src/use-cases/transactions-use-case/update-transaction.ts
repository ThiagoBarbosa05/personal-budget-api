import { prisma } from '../../lib/prisma'
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

    const envelopeToUpdate = await this.envelopesRepository.getEnvelopeById({
      id: envelope_id,
      userId: user_id,
    })

    const transactionBeforeUpdate =
      await this.transactionsRepository.getTransactions(
        envelope_id,
        transaction_id,
      )

    if (!paymentAmountInCents) {
      throw new Error('Please provide a payment amount to update.')
    }

    if (!envelopeToUpdate || !transactionBeforeUpdate) {
      throw new ResourceNotFoundError()
    }

    if (paymentAmountInCents > envelopeToUpdate.amount) {
      throw new InsufficientFundsToTransfer()
    }

    const transactionUpdated =
      await this.transactionsRepository.updateTransaction({
        payment_recipient,
        transaction_id,
        payment_amount: paymentAmountInCents,
        updated_at: new Date(),
      })

    await this.envelopesRepository.updateEnvelopeById({
      id: envelope_id,
      userId: user_id,
      updatedAt: new Date(),
      amount:
        envelopeToUpdate?.amount +
        transactionBeforeUpdate[0].payment_amount -
        paymentAmountInCents,
    })

    return { transactionUpdated }
  }
}

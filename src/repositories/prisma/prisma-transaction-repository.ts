import { prisma } from '../../lib/prisma'
import { Transaction } from '../../types'
import {
  TransactionsRepository,
  UpdateTransactionParams,
} from '../contracts/transactions-repository'

export class PrismaTransactionRepository implements TransactionsRepository {
  async create(data: Transaction) {
    const transaction = await prisma.transaction.create({
      data,
    })

    return transaction
  }

  async updateTransaction(data: UpdateTransactionParams) {
    const transactionUpdated = await prisma.transaction.update({
      data: {
        payment_amount: data.payment_amount,
        payment_recipient: data.payment_recipient,
        updated_at: data.updated_at,
      },
      where: {
        id: data.transaction_id,
      },
    })

    return transactionUpdated
  }

  async getTransactions(envelope_id: string, transaction_id?: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        envelope_id,
        id: transaction_id,
      },
    })

    return transactions
  }

  async deleteTransactionById(transaction_id: string) {
    await prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.findUniqueOrThrow({
        where: { id: transaction_id },
      })

      const envelope = await tx.envelope.findUniqueOrThrow({
        where: {
          id: transaction.envelope_id,
        },
      })

      await tx.envelope.update({
        where: { id: transaction.envelope_id },
        data: { amount: envelope.amount + transaction.payment_amount },
      })

      await tx.transaction.delete({
        where: {
          id: transaction_id,
        },
      })
    })
  }
}

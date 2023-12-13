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

  updateTransaction(data: UpdateTransactionParams) {
    throw new Error('Method not implemented.')
  }

  getTransactions(envelope_id: string) {
    throw new Error('Method not implemented.')
  }

  deleteTransactionById(transaction_id: string) {
    throw new Error('Method not implemented.')
  }
}

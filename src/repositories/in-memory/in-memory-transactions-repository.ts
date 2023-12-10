import { randomUUID } from 'node:crypto'
import { Transaction } from '../../types'
import {
  TransactionsRepository,
  UpdateTransactionParams,
} from '../contracts/transactions-repository'
import { ResourceNotFoundError } from '../../use-cases/errors/resource-not-found'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = []

  async create(data: Transaction) {
    const transaction: Transaction = {
      id: data.id ?? randomUUID(),
      created_at: new Date(),
      envelope_id: data.envelope_id,
      payment_amount: data.payment_amount,
      payment_recipient: data.payment_recipient,
      updated_at: new Date(),
    }

    this.items.push(transaction)

    return transaction
  }

  async updateTransaction(data: UpdateTransactionParams) {
    const foundTransaction = this.items.find(
      (item) => item.id === data.transaction_id,
    )

    if (!foundTransaction) {
      throw new ResourceNotFoundError()
    }

    const transactionUpdated = {
      ...foundTransaction,
      payment_amount: data.payment_amount ?? foundTransaction.payment_amount,
      payment_recipient:
        data.payment_recipient ?? foundTransaction.payment_recipient,
      updated_at: new Date(),
    }

    return transactionUpdated
  }

  async getTransactions(envelope_id: string) {
    const transactions = this.items.filter(
      (item) => item.envelope_id === envelope_id,
    )

    return transactions
  }

  async deleteTransactionById(transaction_id: string) {
    const transactionIndex = this.items.findIndex(
      (item) => item.id === transaction_id,
    )

    this.items.splice(transactionIndex)
  }
}

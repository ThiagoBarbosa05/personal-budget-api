import { randomUUID } from 'node:crypto'
import { Transaction } from '../../types'
import { TransactionsRepository } from '../contracts/transactions-repository'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = []

  async create(data: Transaction): Promise<Transaction> {
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
}

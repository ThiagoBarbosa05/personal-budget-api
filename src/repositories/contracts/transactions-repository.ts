import { Transaction } from '../../types'

export interface TransactionsRepository {
  create(data: Transaction): Promise<Transaction>
}

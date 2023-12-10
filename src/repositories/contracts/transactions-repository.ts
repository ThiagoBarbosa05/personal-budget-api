import { Transaction } from '../../types'

export interface UpdateTransactionParams {
  transaction_id: string
  payment_amount?: number
  payment_recipient?: string
  updated_at: Date
}

export interface TransactionsRepository {
  create(data: Transaction): Promise<Transaction>
  updateTransaction(data: UpdateTransactionParams): Promise<Transaction>
  getTransactions(envelope_id: string): Promise<Transaction[] | null>
  deleteTransactionById(transaction_id: string): Promise<void>
}

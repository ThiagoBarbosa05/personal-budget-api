import { TransactionsRepository } from '../../repositories/contracts/transactions-repository'
import { Transaction } from '../../types'
import { ResourceNotFoundError } from '../errors/resource-not-found'

interface GetTransactionsUseCaseRequest {
  envelope_id: string
}

interface GetTransactionsUseCaseResponse {
  transactions: Transaction[]
}

export class GetTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(envelope_id: string) {
    const transactions =
      await this.transactionsRepository.getTransactions(envelope_id)

    if (!transactions) {
      throw new ResourceNotFoundError()
    }

    return { transactions }
  }
}

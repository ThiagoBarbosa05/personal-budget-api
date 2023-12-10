import { TransactionsRepository } from '../../repositories/contracts/transactions-repository'

export class DeleteTransactionByIdUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(transaction_id: string) {
    await this.transactionsRepository.deleteTransactionById(transaction_id)
  }
}

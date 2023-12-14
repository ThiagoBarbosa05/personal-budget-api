import { PrismaTransactionRepository } from '../../repositories/prisma/prisma-transaction-repository'
import { GetTransactionsUseCase } from '../transactions-use-case/get-transactions'

export function makeGetTransactionsUseCase() {
  const transactionsRepository = new PrismaTransactionRepository()
  const getTransactionUseCase = new GetTransactionsUseCase(
    transactionsRepository,
  )

  return getTransactionUseCase
}

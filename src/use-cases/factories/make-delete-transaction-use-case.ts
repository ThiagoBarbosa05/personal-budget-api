import { PrismaTransactionRepository } from '../../repositories/prisma/prisma-transaction-repository'
import { DeleteTransactionByIdUseCase } from '../transactions-use-case/delete-transaction-by-id'

export function makeDeleteTransactionUseCase() {
  const transactionRepository = new PrismaTransactionRepository()
  const deleteTransactionUseCase = new DeleteTransactionByIdUseCase(
    transactionRepository,
  )

  return deleteTransactionUseCase
}

import { PrismaEnvelopesRepository } from '../../repositories/prisma/prisma-envelopes-repositories'
import { PrismaTransactionRepository } from '../../repositories/prisma/prisma-transaction-repository'
import { CreateTransactionUseCase } from '../transactions-use-case/create-transaction'

export function MakeCreateTransactionUseCase() {
  const transactionsRepository = new PrismaTransactionRepository()
  const envelopesRepository = new PrismaEnvelopesRepository()
  const createTransactionUseCase = new CreateTransactionUseCase(
    transactionsRepository,
    envelopesRepository,
  )

  return createTransactionUseCase
}

import { PrismaEnvelopesRepository } from '../../repositories/prisma/prisma-envelopes-repositories'
import { PrismaTransactionRepository } from '../../repositories/prisma/prisma-transaction-repository'
import { UpdateTransactionUseCase } from '../transactions-use-case/update-transaction'

export function makeUpdateTransactionUseCase() {
  const transactionsRepository = new PrismaTransactionRepository()
  const envelopesRepository = new PrismaEnvelopesRepository()

  const updateTransactionUseCase = new UpdateTransactionUseCase(
    transactionsRepository,
    envelopesRepository,
  )

  return updateTransactionUseCase
}

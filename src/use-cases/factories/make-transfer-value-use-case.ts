import { PrismaEnvelopesRepository } from '../../repositories/prisma/prisma-envelopes-repositories'
import { TransferValueUseCase } from '../envelopes-use-case/transfer-value-use-case'

export function makeTransferValueUseCase() {
  const EnvelopesRepository = new PrismaEnvelopesRepository()
  const transferValueUseCase = new TransferValueUseCase(EnvelopesRepository)

  return transferValueUseCase
}

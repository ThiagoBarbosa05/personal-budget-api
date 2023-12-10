import { TransferValueUseCase } from '../envelopes-use-case/transfer-value-use-case'

export function makeTransferValueUseCase() {
  const transferValueUseCase = new TransferValueUseCase()

  return transferValueUseCase
}

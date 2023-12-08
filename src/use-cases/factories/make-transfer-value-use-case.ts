import { TransferValueUseCase } from '../envelopes-use-case/transfer-value-use-case'

export function makeTransfeValueUseCase() {
  const transferValueUseCase = new TransferValueUseCase()

  return transferValueUseCase
}

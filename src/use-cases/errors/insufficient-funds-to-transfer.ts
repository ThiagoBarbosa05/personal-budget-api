export class InsufficientFundsToTransfer extends Error {
  constructor() {
    super('Insufficient funds')
  }
}

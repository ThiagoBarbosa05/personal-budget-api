import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTransactionsRepository } from '../src/repositories/in-memory/in-memory-transactions-repository'
import { CreateTransactionUseCase } from '../src/use-cases/transactions-use-case/create-transaction'
import { InMemoryEnvelopesRepository } from '../src/repositories/in-memory/in-memory-envelopes-repository'
import { InsufficientFundsToTransfer } from '../src/use-cases/errors/insufficient-funds-to-transfer'

let transactionsRepository: InMemoryTransactionsRepository
let envelopesRepository: InMemoryEnvelopesRepository
let sut: CreateTransactionUseCase

describe('Create a transaction', () => {
  beforeEach(async () => {
    transactionsRepository = new InMemoryTransactionsRepository()
    envelopesRepository = new InMemoryEnvelopesRepository()
    sut = new CreateTransactionUseCase(
      transactionsRepository,
      envelopesRepository,
    )

    envelopesRepository.items = []
  })

  it('should be able  to create a transaction by envelope id', async () => {
    await envelopesRepository.create({
      amount: 1200.5 * 100,
      id: 'envelope-1',
      description: 'example',
      user_id: 'user-1',
    })

    const { transaction } = await sut.execute({
      envelope_id: 'envelope-1',
      payment_amount: 150.5,
      payment_recipient: 'internet',
      user_id: 'user-1',
    })

    expect(transaction.envelope_id).toEqual('envelope-1')
  })
  it('should not be possible to create a transaction if the payment amount is greater than the amount of the envelope', async () => {
    await envelopesRepository.create({
      amount: 1200.5 * 100,
      id: 'envelope-1',
      description: 'example',
      user_id: 'user-1',
    })

    await expect(() =>
      sut.execute({
        envelope_id: 'envelope-1',
        payment_amount: 1500.5,
        payment_recipient: 'internet',
        user_id: 'user-1',
      }),
    ).rejects.toBeInstanceOf(InsufficientFundsToTransfer)
  })
})

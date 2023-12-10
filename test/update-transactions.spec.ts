import { InMemoryEnvelopesRepository } from '../src/repositories/in-memory/in-memory-envelopes-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../src/use-cases/errors/resource-not-found'
import { InMemoryTransactionsRepository } from '../src/repositories/in-memory/in-memory-transactions-repository'
import { UpdateTransactionUseCase } from '../src/use-cases/transactions-use-case/update-transaction'
import { InsufficientFundsToTransfer } from '../src/use-cases/errors/insufficient-funds-to-transfer'

let envelopesRepository: InMemoryEnvelopesRepository
let transactionsRepository: InMemoryTransactionsRepository
let sut: UpdateTransactionUseCase

describe('Update transaction use case', () => {
  beforeEach(() => {
    envelopesRepository = new InMemoryEnvelopesRepository()
    transactionsRepository = new InMemoryTransactionsRepository()

    sut = new UpdateTransactionUseCase(
      transactionsRepository,
      envelopesRepository,
    )
  })

  it("should be possible to update all possible fields of a transaction using the transaction's id", async () => {
    await envelopesRepository.create({
      id: 'envelope-1',
      description: 'example',
      amount: 1200.5 * 100,
      user_id: 'user-1',
    })

    const transactionCreated = await transactionsRepository.create({
      id: 'transaction-1',
      envelope_id: 'envelope-1',
      payment_amount: 150.5 * 100,
      payment_recipient: 'example-2',
    })

    const { transactionUpdated } = await sut.execute({
      envelope_id: 'envelope-1',
      transaction_id: 'transaction-1',
      payment_amount: 170.5,
      payment_recipient: 'example-2',
      user_id: 'user-1',
    })

    expect(
      transactionCreated.payment_amount !== transactionUpdated.payment_amount &&
        transactionCreated.payment_recipient !==
          transactionUpdated.payment_recipient,
    )
  })

  it('should be possible to update some specific field of a transaction using the id of the transaction', async () => {
    await envelopesRepository.create({
      id: 'envelope-1',
      description: 'example',
      amount: 1200.5 * 100,
      user_id: 'user-1',
    })

    const transactionCreated = await transactionsRepository.create({
      id: 'transaction-1',
      envelope_id: 'envelope-1',
      payment_amount: 150.5 * 100,
      payment_recipient: 'example-2',
    })

    const { transactionUpdated } = await sut.execute({
      envelope_id: 'envelope-1',
      transaction_id: 'transaction-1',
      payment_amount: 170.5,
      user_id: 'user-1',
    })

    expect(
      transactionCreated.payment_amount !== transactionUpdated.payment_amount &&
        transactionCreated.payment_recipient ===
          transactionUpdated.payment_recipient,
    )
  })

  it("shouldn't be possible to update a transaction with an incorrect ID", async () => {
    await envelopesRepository.create({
      id: 'envelope-1',
      description: 'example',
      amount: 1200.5 * 100,
      user_id: 'user-1',
    })

    await transactionsRepository.create({
      id: 'transaction-1',
      envelope_id: 'envelope-1',
      payment_amount: 150.5 * 100,
      payment_recipient: 'example-2',
    })

    await expect(() =>
      sut.execute({
        envelope_id: 'envelope-1',
        transaction_id: 'transaction-2',
        payment_amount: 170.5,
        user_id: 'user-1',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to update a transaction if the payment amount is greater than the envelope amount', async () => {
    await envelopesRepository.create({
      id: 'envelope-1',
      description: 'example',
      amount: 1200.5 * 100,
      user_id: 'user-1',
    })

    await transactionsRepository.create({
      id: 'transaction-1',
      envelope_id: 'envelope-1',
      payment_amount: 150.5 * 100,
      payment_recipient: 'example-2',
    })

    await expect(() =>
      sut.execute({
        envelope_id: 'envelope-1',
        transaction_id: 'transaction-1',
        payment_amount: 1700.5,
        user_id: 'user-1',
      }),
    ).rejects.toBeInstanceOf(InsufficientFundsToTransfer)
  })
})

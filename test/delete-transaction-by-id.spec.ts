import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTransactionsRepository } from '../src/repositories/in-memory/in-memory-transactions-repository'
import { DeleteTransactionByIdUseCase } from '../src/use-cases/transactions-use-case/delete-transaction-by-id'

let transactionsRepository: InMemoryTransactionsRepository
let sut: DeleteTransactionByIdUseCase

describe('Delete transaction use case', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new DeleteTransactionByIdUseCase(transactionsRepository)
  })

  it('should be able to delete a transaction by id', async () => {
    await transactionsRepository.create({
      envelope_id: 'envelope-1',
      payment_amount: 123.45,
      payment_recipient: 'example',
      id: 'transaction-2',
    })

    await transactionsRepository.create({
      envelope_id: 'envelope-1',
      payment_amount: 123.45,
      payment_recipient: 'example',
      id: 'transaction-1',
    })

    await sut.execute('transaction-1')

    expect(transactionsRepository.items.length).toEqual(1)
  })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTransactionsRepository } from '../src/repositories/in-memory/in-memory-transactions-repository'
import { GetTransactionsUseCase } from '../src/use-cases/transactions-use-case/get-transactions'

let transactionsRepository: InMemoryTransactionsRepository
let sut: GetTransactionsUseCase

describe('Get All Transactions case', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new GetTransactionsUseCase(transactionsRepository)
  })

  it('should be able retrieve transactions by envelope id', async () => {
    await transactionsRepository.create({
      envelope_id: 'envelope-1',
      payment_amount: 123.45,
      payment_recipient: 'example',
    })

    await transactionsRepository.create({
      envelope_id: 'envelope-2',
      payment_amount: 123.45,
      payment_recipient: 'example',
    })

    const { transactions } = await sut.execute('envelope-1')

    expect(transactions.length).toEqual(1)
  })
})

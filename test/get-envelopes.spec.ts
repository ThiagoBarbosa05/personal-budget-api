import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryEnvelopesRepository } from '../src/repositories/in-memory/in-memory-envelopes-repository'
import { GetEnvelopesUseCase } from '../src/use-cases/envelopes-use-case/get-envelopes'

let envelopeRepository: InMemoryEnvelopesRepository
let sut: GetEnvelopesUseCase

describe('Create user use case', () => {
  beforeEach(() => {
    envelopeRepository = new InMemoryEnvelopesRepository()
    sut = new GetEnvelopesUseCase(envelopeRepository)
  })

  it('should be able  to retrieve all user envelopes', async () => {
    await envelopeRepository.create({
      description: 'hmaburguer',
      amount: 134.34,
      user_id: 'user-01',
    })

    await envelopeRepository.create({
      description: 'hmaburguer',
      amount: 134.34,
      user_id: 'user-01',
    })

    await envelopeRepository.create({
      description: 'hmaburguer',
      amount: 134.34,
      user_id: 'user-02',
    })

    const { envelopes } = await sut.execute('user-01')

    expect(envelopes.length).toEqual(2)
  })
})

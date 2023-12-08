import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryEnvelopesRepository } from '../src/repositories/in-memory/in-memory-envelopes-repository'
import { CreateEnvelopeUseCase } from '../src/use-cases/envelopes-use-case/create-envelope'

let envelopeRepository: InMemoryEnvelopesRepository
let sut: CreateEnvelopeUseCase

describe('Create user use case', () => {
  beforeEach(() => {
    envelopeRepository = new InMemoryEnvelopesRepository()
    sut = new CreateEnvelopeUseCase(envelopeRepository)
  })

  it('should be able  to create an envelope', async () => {
    const { envelope } = await sut.execute({
      description: 'dev App',
      amount: 135.34,
      user_id: 'user-1',
    })

    expect(envelope.id).toEqual(expect.any(String))
  })
})

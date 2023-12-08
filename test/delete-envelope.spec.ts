import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryEnvelopesRepository } from '../src/repositories/in-memory/in-memory-envelopes-repository'
import { DeleteEnvelopeByIdUseCase } from '../src/use-cases/envelopes-use-case/delete-envelope'

let envelopeRepository: InMemoryEnvelopesRepository
let sut: DeleteEnvelopeByIdUseCase

describe('Create user use case', () => {
  beforeEach(() => {
    envelopeRepository = new InMemoryEnvelopesRepository()
    sut = new DeleteEnvelopeByIdUseCase(envelopeRepository)
  })

  it('should be possible to delete an envelope by user id and envelope id', async () => {
    await envelopeRepository.create({
      id: 'envelope-1',
      description: 'example',
      amount: 123.45,
      user_id: 'user-01',
    })

    await sut.execute({ id: 'envelope-1', userId: 'user-01' })
    const envelopes = await envelopeRepository.getAllEnvelopes('user-01')

    expect(envelopes?.length).toBe(0)
  })
})

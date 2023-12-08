import { InMemoryEnvelopesRepository } from '../src/repositories/in-memory/in-memory-envelopes-repository'
import { UpdateEnvelopeUseCase } from '../src/use-cases/envelopes-use-case/update-envelope'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../src/use-cases/errors/resource-not-found'

let envelopesRepository: InMemoryEnvelopesRepository
let sut: UpdateEnvelopeUseCase

describe('Create user use case', () => {
  beforeEach(() => {
    envelopesRepository = new InMemoryEnvelopesRepository()
    sut = new UpdateEnvelopeUseCase(envelopesRepository)
  })

  it("should be possible to update all possible fields of an envelope using the envelope's id and the user's id", async () => {
    const createdEnvelope = await envelopesRepository.create({
      id: 'envelope-1',
      description: 'example',
      amount: 123.45,
      user_id: 'user-01',
    })

    const updatedEnvelope = await sut.execute({
      id: 'envelope-1',
      description: 'example updated',
      amount: 112.45,
      userId: 'user-01',
    })

    expect(
      createdEnvelope.amount !== updatedEnvelope.envelope.amount &&
        createdEnvelope.description !== updatedEnvelope.envelope.description,
    )
  })

  it('should be possible to update some specific field of an envelope using the id of the envelope and the user id', async () => {
    const createdEnvelope = await envelopesRepository.create({
      id: 'envelope-1',
      description: 'example',
      amount: 123.45,
      user_id: 'user-01',
    })

    const updatedEnvelope = await sut.execute({
      id: 'envelope-1',
      description: 'example',
      amount: 112.45,
      userId: 'user-01',
    })

    expect(createdEnvelope.amount !== updatedEnvelope.envelope.amount)
  })

  it("shouldn't be possible to update an envelope with an incorrect ID", async () => {
    await envelopesRepository.create({
      id: 'envelope-1',
      description: 'example',
      amount: 123.45,
      user_id: 'user-01',
    })

    await expect(() =>
      sut.execute({
        id: 'incorrect-id',
        description: 'example',
        amount: 112.45,
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

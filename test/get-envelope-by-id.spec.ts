import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryEnvelopesRepository } from '../src/repositories/in-memory/in-memory-envelopes-repository'
import { GetEnvelopeByIdUseCase } from '../src/use-cases/envelopes-use-case/get-envelope-by-id'
import { ResourceNotFoundError } from '../src/use-cases/errors/resource-not-found'

let envelopeRepository: InMemoryEnvelopesRepository
let sut: GetEnvelopeByIdUseCase

describe('Create user use case', () => {
  beforeEach(() => {
    envelopeRepository = new InMemoryEnvelopesRepository()
    sut = new GetEnvelopeByIdUseCase(envelopeRepository)
  })

  it('should be possible to retrieve an envelope by its id and user id', async () => {
    await envelopeRepository.create({
      id: 'envelope-1',
      description: 'example',
      amount: 123.43,
      user_id: 'user-01',
    })

    await envelopeRepository.create({
      id: 'envelope-2',
      description: 'example',
      amount: 123.43,
      user_id: 'user-02',
    })

    const { envelope } = await sut.execute({
      id: 'envelope-1',
      userId: 'user-01',
    })

    expect(envelope.id).toEqual('envelope-1')
  })

  it('should be not possible to retrieve an envelope without user id', async () => {
    await envelopeRepository.create({
      id: 'envelope-1',
      description: 'example',
      amount: 123.43,
      user_id: 'user-01',
    })

    await envelopeRepository.create({
      id: 'envelope-2',
      description: 'example',
      amount: 123.43,
      user_id: 'user-02',
    })

    await expect(() =>
      sut.execute({
        id: 'envelope-1',
        userId: '',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be not possible to retrieve an envelope with wrong id', async () => {
    await envelopeRepository.create({
      id: 'envelope-1',
      description: 'example',
      amount: 123.43,
      user_id: 'user-01',
    })
    await expect(() =>
      sut.execute({
        id: 'non-existing-id',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

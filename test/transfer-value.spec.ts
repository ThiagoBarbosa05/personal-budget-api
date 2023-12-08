import { InMemoryEnvelopesRepository } from '../src/repositories/in-memory/in-memory-envelopes-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { TransferValueUseCase } from '../src/use-cases/envelopes-use-case/transfer-value-use-case'
import { InsufficientFundsToTransfer } from '../src/use-cases/errors/insufficient-funds-to-transfer'
import { ResourceNotFoundError } from '../src/use-cases/errors/resource-not-found'

let envelopesRepository: InMemoryEnvelopesRepository
let sut: TransferValueUseCase

describe('Create user use case', () => {
  beforeEach(() => {
    envelopesRepository = new InMemoryEnvelopesRepository()
    sut = new TransferValueUseCase(envelopesRepository)
  })

  it("should be possible to update all possible fields of an envelope using the envelope's id and the user's id", async () => {
    await envelopesRepository.create({
      id: 'envelope-1',
      description: 'example1',
      amount: 249.9 * 100, // turning into cents
      user_id: 'user-01',
    })
    await envelopesRepository.create({
      id: 'envelope-2',
      description: 'example2',
      amount: 249.9 * 100, // turning into cents
      user_id: 'user-01',
    })

    await sut.execute({
      amountToUpdate: 149.9,
      originId: 'envelope-1',
      destinationId: 'envelope-2',
      userId: 'user-01',
    })

    const donorEnvelope = await envelopesRepository.getEnvelopeById({
      id: 'envelope-1',
      userId: 'user-01',
    })

    const receivingEnvelope = await envelopesRepository.getEnvelopeById({
      id: 'envelope-2',
      userId: 'user-01',
    })

    expect(donorEnvelope?.amount).toEqual(10000)
    expect(receivingEnvelope?.amount).toEqual(39980)
  })

  it('should not be possible to transfer amounts if the originating envelope does not have sufficient balance', async () => {
    await envelopesRepository.create({
      id: 'envelope-1',
      description: 'example1',
      amount: 249.9 * 100, // turning into cents
      user_id: 'user-01',
    })
    await envelopesRepository.create({
      id: 'envelope-2',
      description: 'example2',
      amount: 249.9 * 100, // turning into cents
      user_id: 'user-01',
    })

    await expect(() =>
      sut.execute({
        amountToUpdate: 349.9,
        originId: 'envelope-1',
        destinationId: 'envelope-2',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(InsufficientFundsToTransfer)
  })

  it('should not be possible to transfer values ​​if the envelope or user ID is incorrect', async () => {
    await envelopesRepository.create({
      id: 'envelope-1',
      description: 'example1',
      amount: 249.9 * 100, // turning into cents
      user_id: 'user-01',
    })
    await envelopesRepository.create({
      id: 'envelope-2',
      description: 'example2',
      amount: 249.9 * 100, // turning into cents
      user_id: 'user-01',
    })

    await expect(() =>
      sut.execute({
        amountToUpdate: 349.9,
        originId: 'incorrect-envelope-id',
        destinationId: 'envelope-2',
        userId: 'incorrect-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

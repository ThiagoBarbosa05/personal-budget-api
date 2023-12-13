import { EnvelopesRepository } from '../../repositories/contracts/envelopes-repository'
import { Envelope } from '../../types'
import { ResourceNotFoundError } from '../errors/resource-not-found'

interface EnvelopeUseCaseRequest {
  id: string
  userId: string
  description?: string
  amount?: number
}

interface EnvelopeUseCaseResponse {
  envelope: Envelope
}

export class UpdateEnvelopeUseCase {
  constructor(private envelopesRepository: EnvelopesRepository) {}

  async execute({
    id,
    userId,
    amount,
    description,
  }: EnvelopeUseCaseRequest): Promise<EnvelopeUseCaseResponse> {
    const amountInCents = amount && amount * 100

    const envelope = await this.envelopesRepository.updateEnvelopeById({
      id,
      userId,
      amount: amountInCents,
      description,
      updatedAt: new Date(),
    })

    if (!envelope) {
      throw new ResourceNotFoundError()
    }

    return { envelope }
  }
}

import { EnvelopesRepository } from '../../repositories/contracts/envelopes-repository'
import { Envelope } from '../../types'
import { ResourceNotFoundError } from '../errors/resource-not-found'

interface GetEnvelopeByIdUseCaseRequest {
  id: string
  userId: string
}

interface GetEnvelopeByIdUseCaseResponse {
  envelope: Envelope
}

export class GetEnvelopeByIdUseCase {
  constructor(private envelopesRepository: EnvelopesRepository) {}

  async execute({
    id,
    userId,
  }: GetEnvelopeByIdUseCaseRequest): Promise<GetEnvelopeByIdUseCaseResponse> {
    const envelope = await this.envelopesRepository.getEnvelopeById({
      id,
      userId,
    })

    if (!envelope) {
      throw new ResourceNotFoundError()
    }

    return {
      envelope: {
        ...envelope,
        amount: envelope.amount / 100,
      },
    }
  }
}

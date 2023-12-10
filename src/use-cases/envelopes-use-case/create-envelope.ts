import { EnvelopesRepository } from '../../repositories/contracts/envelopes-repository'
import { Envelope } from '../../types'

interface CreateEnvelopeUseCaseRequest {
  description: string
  amount: number
  user_id: string
}

interface CreateEnvelopeUseCaseResponse {
  envelope: Envelope
}

export class CreateEnvelopeUseCase {
  constructor(private envelopeRepository: EnvelopesRepository) {}

  async execute({
    description,
    amount,
    user_id,
  }: CreateEnvelopeUseCaseRequest): Promise<CreateEnvelopeUseCaseResponse> {
    const amountInCents = amount * 100

    const envelope = await this.envelopeRepository.create({
      description,
      amount: amountInCents,
      user_id,
    })

    return { envelope }
  }
}

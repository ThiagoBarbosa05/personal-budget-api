import { EnvelopesRepository } from '../../repositories/contracts/envelopes-repository'

interface DeleteEnvelopeByIdUseCaseRequest {
  id: string
  userId: string
}

export class DeleteEnvelopeByIdUseCase {
  constructor(private envelopeRepository: EnvelopesRepository) {}

  async execute({
    id,
    userId,
  }: DeleteEnvelopeByIdUseCaseRequest): Promise<void> {
    await this.envelopeRepository.deleteEnvelopeById({
      id,
      userId,
    })
  }
}

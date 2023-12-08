import { EnvelopesRepository } from '../../repositories/contracts/envelopes-repository'
import { Envelope } from '../../types'
import { ResourceNotFoundError } from '../errors/resource-not-found'

interface GetEnvelopesUseCaseCaseResponse {
  envelopes: Envelope[]
}

export class GetEnvelopesUseCase {
  constructor(private envelopesRepository: EnvelopesRepository) {}

  async execute(userId: string): Promise<GetEnvelopesUseCaseCaseResponse> {
    // const envelopes = await prisma.envelope.findMany({
    //   where: {
    //     user_id: userId,
    //   },
    // })

    const envelopes = await this.envelopesRepository.getAllEnvelopes(userId)

    if (!envelopes) {
      throw new ResourceNotFoundError()
    }

    return { envelopes }
  }
}

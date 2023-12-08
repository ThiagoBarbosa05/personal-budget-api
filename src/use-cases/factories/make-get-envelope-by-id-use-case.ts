import { GetEnvelopeByIdUseCase } from '../envelopes-use-case/get-envelope-by-id'

export function makeGetEnvelopeByIdUseCase() {
  const getEnvelopeByIdUseCase = new GetEnvelopeByIdUseCase()

  return getEnvelopeByIdUseCase
}

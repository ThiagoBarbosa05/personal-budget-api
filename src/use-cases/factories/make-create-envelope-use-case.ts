import { CreateEnvelopeUseCase } from '../envelopes-use-case/create-envelope'

export function makeCreateEnvelopeUseCase() {
  const createEnvelopeUseCase = new CreateEnvelopeUseCase()

  return createEnvelopeUseCase
}

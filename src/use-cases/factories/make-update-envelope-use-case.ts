import { UpdateEnvelopeUseCase } from '../envelopes-use-case/update-envelope'

export function makeUpdateEnvelopeUseCase() {
  const updateEnvelopeUseCase = new UpdateEnvelopeUseCase()

  return updateEnvelopeUseCase
}

import { DeleteEnvelopeUseCase } from '../envelopes-use-case/delete-envelope'

export function makeDeleteEnvelopeUseCase() {
  const deleteEnvelopeUseCase = new DeleteEnvelopeUseCase()

  return deleteEnvelopeUseCase
}

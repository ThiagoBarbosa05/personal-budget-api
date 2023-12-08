import { GetEnvelopesUseCase } from '../envelopes-use-case/get-envelopes'

export function makeGetEnvelopesUseCase() {
  const getEnvelopesUseCase = new GetEnvelopesUseCase()

  return getEnvelopesUseCase
}

import { GetUserUseCase } from '../users-use-case/get-user'

export function makeGetUserUseCase() {
  const getUserUseCase = new GetUserUseCase()

  return getUserUseCase
}

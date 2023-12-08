import { CreateUserUseCase } from '../users-use-case/create-user'

export function MakeCreateUserUseCase() {
  const createUserUseCase = new CreateUserUseCase()

  return createUserUseCase
}

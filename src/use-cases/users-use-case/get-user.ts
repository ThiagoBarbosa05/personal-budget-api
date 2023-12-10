import { UsersRepository } from '../../repositories/contracts/users-repository'
import { User } from '../../types'
import { ResourceNotFoundError } from '../errors/resource-not-found'

interface GetUserByIdUseCaseResponse {
  user: User
}

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(userId: string): Promise<GetUserByIdUseCaseResponse> {
    const user = await this.usersRepository.getUserById(userId)
    if (!user) {
      throw new ResourceNotFoundError()
    }
    return {
      user,
    }
  }
}

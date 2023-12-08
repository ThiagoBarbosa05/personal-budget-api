import { prisma } from '../../lib/prisma'
import { UsersRepository } from '../../repositories/contracts/users-repository'
import { User } from '../../types'
import { ResourceNotFoundError } from '../errors/resource-not-found'

interface GetUserByIdUseCaseRequest {
  userId: string
}

interface GetUserByIdUseCaseResponse {
  user: User
}

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
    // const user = await prisma.user.findUnique({
    //   where: {
    //     id,
    //   },
    // })

    // return { user }
    const user = await this.usersRepository.getUserById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}

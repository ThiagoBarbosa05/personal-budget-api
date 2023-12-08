import { UsersRepository } from '../../repositories/contracts/users-repository'
import { User } from '../../types'

interface CreateUserUseCaseRequest {
  username: string
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const user = await this.usersRepository.create({ username })

    // const user = await prisma.user.create({
    //   data: {
    //     username,
    //   },
    // })

    // return { user }
    return { user }
  }
}

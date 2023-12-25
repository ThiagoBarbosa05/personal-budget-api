import { UsersRepository } from '../../repositories/contracts/users-repository'
import { User } from '../../types'
import { InvalidCredentialsError } from '../errors/invalid-credentials'
import bcryptjs from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const matchedPassword = await bcryptjs.compare(password, user.password)

    if (!matchedPassword) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}

import { UsersRepository } from '../../repositories/contracts/users-repository'
import { User } from '../../types'
import { UserAlreadyExistsError } from '../errors/user-already-exists'
import bcryptjs from 'bcryptjs'

interface CreateUserUseCaseRequest {
  username: string
  email: string
  password: string
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const isUserAlreadyExists = await this.usersRepository.findByEmail(email)

    if (isUserAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await bcryptjs.hash(password, 6)

    const user = await this.usersRepository.create({
      username,
      email,
      password: password_hash,
    })

    return { user }
  }
}

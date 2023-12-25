import { User } from '../../types'

export interface UsersRepository {
  getUserById(userId: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: User): Promise<User>
}

import { randomUUID } from 'crypto'
import { User } from '../../types'
import { UsersRepository } from '../contracts/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: User) {
    const user = {
      id: randomUUID(),
      username: data.username,
      email: data.email,
      password: data.password,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async getUserById(userId: string) {
    const user = this.items.find((user) => user.id === userId)

    if (!user) return null

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)

    if (!user) return null

    return user
  }
}

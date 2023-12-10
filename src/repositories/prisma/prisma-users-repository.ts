import { prisma } from '../../lib/prisma'
import { User } from '../../types'
import { UsersRepository } from '../contracts/users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } })

    return user
  }

  async create(data: User) {
    const user = await prisma.user.create({ data })

    return user
  }
}

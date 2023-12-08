import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../src/repositories/in-memory/in-memory-users-repository'
import { GetUserUseCase } from '../src/use-cases/users-use-case/get-user'
import { ResourceNotFoundError } from '../src/use-cases/errors/resource-not-found'

let usersRepository: InMemoryUsersRepository
let sut: GetUserUseCase

describe('Get user by id', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserUseCase(usersRepository)
  })

  it('should be able to retrieve a user by id', async () => {
    const createdUser = await usersRepository.create({ username: 'John Doe' })

    const userId = createdUser.id

    const { user } = await sut.execute({ userId })

    expect(user?.username).toEqual('John Doe')
  })
  it('should not be possible to retrieve a user using the incorrect id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

import { InMemoryUsersRepository } from '../src/repositories/in-memory/in-memory-users-repository'
import { CreateUserUseCase } from '../src/use-cases/users-use-case/create-user'
import { beforeEach, describe, expect, it } from 'vitest'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should be able  to create an user', async () => {
    const { user } = await sut.execute({ username: 'Thiago' })

    expect(user.id).toEqual(expect.any(String))
  })
})

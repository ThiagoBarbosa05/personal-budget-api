import { InMemoryUsersRepository } from '../src/repositories/in-memory/in-memory-users-repository'
import { CreateUserUseCase } from '../src/use-cases/users-use-case/create-user'
import { beforeEach, describe, expect, it } from 'vitest'
import bcryptjs from 'bcryptjs'
import { UserAlreadyExistsError } from '../src/use-cases/errors/user-already-exists'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should be able to create an user', async () => {
    const { user } = await sut.execute({
      username: 'Thiago',
      email: 'thiago@email.com',
      password: '1233456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      username: 'Thiago',
      email: 'thiago@email.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await bcryptjs.compare(
      '123456',
      user.password,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email', async () => {
    const email = 'johndoe@email.com'

    await sut.execute({ username: 'John doe', email, password: '123456' })

    await expect(() =>
      sut.execute({ username: 'John doe', email, password: '123456' }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../src/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '../src/use-cases/users-use-case/authenticate'
import bcryptjs from 'bcryptjs'
import { InvalidCredentialsError } from '../src/use-cases/errors/invalid-credentials'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate a user', async () => {
    const password_hash = await bcryptjs.hash('123456', 8)

    await usersRepository.create({
      username: 'foo',
      password: password_hash,
      email: 'foo@email.com',
    })

    const { user } = await sut.execute({
      email: 'foo@email.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with invalid credentials', async () => {
    const password_hash = await bcryptjs.hash('123456', 8)

    await usersRepository.create({
      username: 'foo',
      password: password_hash,
      email: 'foo@email.com',
    })

    await expect(() =>
      sut.execute({
        email: 'invalid@email.com',
        password: 'invalid_password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

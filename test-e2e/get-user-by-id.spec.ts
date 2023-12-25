import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { createUserForTest } from '../src/utils/test/create-user-for-test'

describe('Get user by id (E2E)', () => {
  it('should be able to retrieve user by the id that is stored in the cookie', async () => {
    const { token } = await createUserForTest(app)

    const usersResponse = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(usersResponse.body.user.username).toEqual('thomas')
  })
})

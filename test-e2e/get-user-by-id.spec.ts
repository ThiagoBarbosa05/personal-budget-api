import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Get user by id (E2E)', () => {
  it('should be able to retrieve user by the id that is stored in the cookie', async () => {
    const response = await request(app)
      .post('/users')
      .send({ username: 'thomas' })

    const cookie = response.headers['set-cookie'][0]

    const splitCookie = cookie.split(';')[0].split('=')[1]

    const usersResponse = await request(app)
      .get('/users/me')
      .set('Cookie', `userId=${splitCookie}`)
      .expect(200)

    expect(usersResponse.body.user.username).toEqual('thomas')
  })
})

import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '../src/app'

describe('Create a user (E2E)', () => {
  it('should be able to create a user and store the user id in the cookie', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'Thiago',
        password: '1223444',
        email: 'thiago@gmail.com',
      })
      .expect(201)

    expect(response.body.token).toEqual(expect.any(String))
  })
})

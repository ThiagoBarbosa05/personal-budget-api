import { describe, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Create an envelope (E2E)', () => {
  it('should be able to create an envelope', async () => {
    const response = await request(app)
      .post('/users')
      .send({ username: 'Thiago' })

    const cookie = response.headers['set-cookie'][0]

    const splitCookie = cookie.split(';')[0].split('=')[1]

    await request(app)
      .post('/envelopes')
      .send({ description: 'envelope-1', amount: 123.4 })
      .set('Cookie', `userId=${splitCookie}`)
      .expect(201)
  })
})

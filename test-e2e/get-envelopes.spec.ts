import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Get All Envelopes (E2E)', () => {
  it('should be able to retrieve all envelopes of the user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ username: 'thomas' })

    const cookie = response.headers['set-cookie'][0]

    const splitCookie = cookie.split(';')[0].split('=')[1]

    await request(app)
      .post('/envelopes')
      .send({ description: 'envelope-1', amount: 123.4 })
      .set('Cookie', `userId=${splitCookie}`)
      .expect(201)

    const envelopesResponse = await request(app)
      .get('/envelopes')
      .set('Cookie', `userId=${splitCookie}`)
      .expect(200)

    expect(envelopesResponse.body.envelopes[0]).toEqual(
      expect.objectContaining({
        description: 'envelope-1',
      }),
    )
  })
})

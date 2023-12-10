import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Get envelope by id', () => {
  it('should be able to retrieve a envelope by id', async () => {
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

    const envelopeCreated = await request(app)
      .get('/envelopes')
      .set('Cookie', `userId=${splitCookie}`)
      .expect(200)

    const envelopeId = envelopeCreated.body.envelopes[0].id

    const envelopeResponse = await request(app)
      .get(`/envelopes/${envelopeId}`)
      .set('Cookie', `userId=${splitCookie}`)
      .expect(200)

    expect(envelopeResponse.body.envelope).toEqual(
      expect.objectContaining({
        id: envelopeId,
      }),
    )
  })
})

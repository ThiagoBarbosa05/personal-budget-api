import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { createUserForTest } from '../src/utils/test/create-user-for-test'

describe('Get envelope by id', () => {
  it('should be able to retrieve a envelope by id', async () => {
    const { token } = await createUserForTest(app)

    await request(app)
      .post('/envelopes')
      .send({ description: 'envelope-1', amount: 123.4 })
      .set('Authorization', `Bearer ${token}`)
      .expect(201)

    const envelopeCreated = await request(app)
      .get('/envelopes')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const envelopeId = envelopeCreated.body.envelopes[0].id

    const envelopeResponse = await request(app)
      .get(`/envelopes/${envelopeId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(envelopeResponse.body.envelope).toEqual(
      expect.objectContaining({
        id: envelopeId,
      }),
    )
  })
})

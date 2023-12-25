import request from 'supertest'
import { describe, it } from 'vitest'
import { app } from '../src/app'
import { createUserForTest } from '../src/utils/test/create-user-for-test'

describe('Delete an envelope (E2E)', () => {
  it('should be able to delete an envelope by id', async () => {
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

    await request(app)
      .delete(`/envelopes/${envelopeId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  })
})

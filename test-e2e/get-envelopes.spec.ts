import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { createUserForTest } from '../src/utils/test/create-user-for-test'

describe('Get All Envelopes (E2E)', () => {
  it('should be able to retrieve all envelopes of the user', async () => {
    const { token } = await createUserForTest(app)

    await request(app)
      .post('/envelopes')
      .send({ description: 'envelope-1', amount: 123.4 })
      .set('Authorization', `Bearer ${token}`)
      .expect(201)

    const envelopesResponse = await request(app)
      .get('/envelopes')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(envelopesResponse.body.envelopes[0]).toEqual(
      expect.objectContaining({
        description: 'envelope-1',
      }),
    )
  })
})

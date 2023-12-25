import { describe, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { createUserForTest } from '../src/utils/test/create-user-for-test'

describe('Create an envelope (E2E)', () => {
  it('should be able to create an envelope', async () => {
    const { token } = await createUserForTest(app)

    await request(app)
      .post('/envelopes')
      .send({ description: 'envelope-1', amount: 123.4 })
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
  })
})

import request from 'supertest'
import { describe, it } from 'vitest'
import { app } from '../src/app'
import { createUserForTest } from '../src/utils/test/create-user-for-test'

describe('Transfer Values (E2E)', () => {
  it('should be able to transfer from envelope to another envelope', async () => {
    const { token } = await createUserForTest(app)

    await request(app)
      .post('/envelopes')
      .send({ description: 'envelope-1', amount: 1220.4 })
      .set('Authorization', `Bearer ${token}`)
      .expect(201)

    await request(app)
      .post('/envelopes')
      .send({ description: 'envelope-1', amount: 123.4 })
      .set('Authorization', `Bearer ${token}`)
      .expect(201)

    await request(app)
      .post('/envelopes')
      .send({ description: 'envelope-1', amount: 1234.4 })
      .set('Authorization', `Bearer ${token}`)
      .expect(201)

    const envelopesCreated = await request(app)
      .get('/envelopes')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    await request(app)
      .post(
        `/envelopes/transfer/${envelopesCreated.body.envelopes[0].id}/${envelopesCreated.body.envelopes[1].id}`,
      )
      .set('Authorization', `Bearer ${token}`)
      .send({ amountToUpdate: 120.4 })
      .expect(200)
  })
})

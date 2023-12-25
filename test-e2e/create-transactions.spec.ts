import request from 'supertest'
import { describe, it } from 'vitest'
import { createUserForTest } from '../src/utils/test/create-user-for-test'
import { app } from '../src/app'
import { prisma } from '../src/lib/prisma'

describe('Create Transaction (E2E)', () => {
  it('should be able to create a transaction', async () => {
    const { id, token } = await createUserForTest(app)

    const envelope = await prisma.envelope.create({
      data: {
        amount: 120050,
        description: 'transaction-1',
        user_id: id,
      },
    })

    await request(app)
      .post('/transactions')
      .send({
        payment_recipient: 'recipient',
        payment_amount: 100.5,
        envelope_id: envelope.id,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
  })
})

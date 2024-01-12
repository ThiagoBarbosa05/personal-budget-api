import request from 'supertest'
import { describe, it } from 'vitest'
import { app } from '../src/app'
import { prisma } from '../src/lib/prisma'
import { createUserForTest } from '../src/utils/test/create-user-for-test'

describe('Update transaction (E2E)', () => {
  it('should be able to update a transaction', async () => {
    const { token, id } = await createUserForTest(app)

    const createEnvelope = await prisma.envelope.create({
      data: {
        amount: 120050,
        description: 'envelope-1',
        user_id: id,
      },
    })

    const createTransaction = await prisma.transaction.create({
      data: {
        payment_amount: 12343,
        payment_recipient: 'transaction-1',
        envelope_id: createEnvelope.id,
      },
    })

    await request(app)
      .put(`/transactions/${createEnvelope.id}/${createTransaction.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ payment_amount: 124.54 })
      .expect(200)
  })
})

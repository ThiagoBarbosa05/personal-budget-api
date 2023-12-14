import request from 'supertest'
import { describe, it } from 'vitest'
import { createUserToReturnCookie } from '../src/utils/test/create-user-returning-cookie'
import { app } from '../src/app'
import { prisma } from '../src/lib/prisma'

describe('Update transaction (E2E)', () => {
  it('should be able to update a transaction', async () => {
    const { cookie } = await createUserToReturnCookie(app)

    const createEnvelope = await prisma.envelope.create({
      data: {
        amount: 120050,
        description: 'envelope-1',
        user_id: cookie,
      },
    })

    const createTransaction = await prisma.transaction.create({
      data: {
        payment_amount: 0,
        payment_recipient: 'transaction-1',
        envelope_id: createEnvelope.id,
      },
    })

    await request(app)
      .put(`/transactions/${createEnvelope.id}/${createTransaction.id}`)
      .set('Cookie', `userId=${cookie}`)
      .expect(200)
  })
})

import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '../src/app'
import { prisma } from '../src/lib/prisma'
import { createUserForTest } from '../src/utils/test/create-user-for-test'

describe('Get transactions (E2E)', () => {
  it('should be able to retrieve all transactions by envelope id', async () => {
    const { token, id } = await createUserForTest(app)

    const envelope = await prisma.envelope.create({
      data: {
        amount: 124550,
        description: 'envelope-1',
        user_id: id,
      },
    })

    await prisma.transaction.create({
      data: {
        payment_amount: 124550,
        payment_recipient: 'transaction-1',
        envelope_id: envelope.id,
      },
    })

    const transactionsResponse = await request(app)
      .get(`/transactions/${envelope.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(transactionsResponse.body.transactions.length > 0)
  })
})

import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { createUserToReturnCookie } from '../src/utils/test/create-user-returning-cookie'
import { app } from '../src/app'
import { prisma } from '../src/lib/prisma'

describe('Delete transaction (E2E)', () => {
  it('should be able to delete a transaction by id', async () => {
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

    const createTransactionToDelete = await prisma.transaction.create({
      data: {
        payment_amount: 0,
        payment_recipient: 'transaction-1',
        envelope_id: createEnvelope.id,
      },
    })

    const transactions = await prisma.transaction.findMany({
      where: {
        id: createTransaction.id,
      },
    })

    await request(app)
      .delete(`/transactions/${createTransactionToDelete.id}`)
      .expect(200)

    expect(transactions.length).toEqual(1)
  })
})

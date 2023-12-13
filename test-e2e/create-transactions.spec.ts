import request from 'supertest'
import { describe, it } from 'vitest'
import { createUserToReturnCookie } from '../src/utils/test/create-user-returning-cookie'
import { app } from '../src/app'
import { prisma } from '../src/lib/prisma'

describe('Create Transaction (E2E)', () => {
  it('should be able to create a transaction', async () => {
    const { cookie } = await createUserToReturnCookie(app)

    const envelope = await prisma.envelope.create({
      data: {
        amount: 120050,
        description: 'transaction-1',
        user_id: cookie,
      },
    })

    await request(app)
      .post('/transactions')
      .send({
        payment_recipient: 'recipient',
        payment_amount: 100.5,
        envelope_id: envelope.id,
      })
      .set('Cookie', `userId=${cookie}`)
      .expect(201)
  })
})

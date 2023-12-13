import request from 'supertest'
import { describe, it } from 'vitest'
import { app } from '../src/app'

describe('Transfer Values (E2E)', () => {
  it('should be able to transfer from envelope to another envelope', async () => {
    const response = await request(app)
      .post('/users')
      .send({ username: 'thomas' })

    const cookie = response.headers['set-cookie'][0]

    const splitCookie = cookie.split(';')[0].split('=')[1]

    await request(app)
      .post('/envelopes')
      .send({ description: 'envelope-1', amount: 1220.4 })
      .set('Cookie', `userId=${splitCookie}`)
      .expect(201)

    await request(app)
      .post('/envelopes')
      .send({ description: 'envelope-1', amount: 123.4 })
      .set('Cookie', `userId=${splitCookie}`)
      .expect(201)

    await request(app)
      .post('/envelopes')
      .send({ description: 'envelope-1', amount: 1234.4 })
      .set('Cookie', `userId=${splitCookie}`)
      .expect(201)

    const envelopesCreated = await request(app)
      .get('/envelopes')
      .set('Cookie', `userId=${splitCookie}`)
      .expect(200)

    await request(app)
      .post(
        `/envelopes/transfer/${envelopesCreated.body.envelopes[0].id}/${envelopesCreated.body.envelopes[1].id}`,
      )
      .set('Cookie', `userId=${splitCookie}`)
      .send({ amountToUpdate: 120.4 })
      .expect(200)
  })
})

import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Authenticate (E2E)', () => {
  it('should be able to authenticate', async () => {
    await request(app).post('/register').send({
      username: 'thomas',
      email: 'thomas@gmail.com',
      password: '123456',
    })

    const response = await request(app)
      .post('/login')
      .send({ email: 'thomas@gmail.com', password: '123456' })

    expect(response.body.token).toEqual(expect.any(String))
  })
})

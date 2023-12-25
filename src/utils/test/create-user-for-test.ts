import { Application } from 'express'
import request from 'supertest'

export async function createUserForTest(
  app: Application,
): Promise<{ id: string; token: string }> {
  const response = await request(app).post('/register').send({
    username: 'thomas',
    email: 'thomas@email.com',
    password: '234453535',
  })

  const { token } = response.body

  const userResponse = await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${token}`)

  const { id } = userResponse.body.user

  return {
    id,
    token,
  }
}

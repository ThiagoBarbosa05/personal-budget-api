import { Application } from 'express'
import request from 'supertest'

export async function createUserToReturnCookie(app: Application) {
  const response = await request(app)
    .post('/users')
    .send({ username: 'thomas' })

  const cookie = response.headers['set-cookie'][0]

  const splitCookie = cookie.split(';')[0].split('=')[1]

  return {
    cookie: splitCookie,
  }
}

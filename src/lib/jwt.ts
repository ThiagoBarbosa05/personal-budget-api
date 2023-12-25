import { sign } from 'jsonwebtoken'

import { env } from '../env'

export function generateAccessToken(userId?: string) {
  return sign({ userId }, env.SECRET_KEY_JWT, { expiresIn: '10m' })
}

export function generateRefreshToken(userId?: string) {
  return sign({ userId }, env.SECRET_KEY_JWT)
}

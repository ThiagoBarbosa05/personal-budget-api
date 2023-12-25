import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { env } from '../env'

interface JwtPayload {
  userId: string
}

export function verifyJwt(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.headers.authorization?.split(' ')[1]

  if (!accessToken)
    return res.status(401).send({ message: 'Access token not provided.' })

  const verifiedToken = verify(accessToken, env.SECRET_KEY_JWT) as JwtPayload

  const { userId } = verifiedToken

  req.userId = userId

  next()
}

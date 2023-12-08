import { NextFunction, Request, Response } from 'express'

export function userIdCookieExists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { userId } = req.cookies

  if (!userId) return res.status(401).send('Unauthorized')

  next()
}

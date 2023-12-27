import { Request, Response } from 'express'
import { ZodError, z } from 'zod'

import { makeCreateUserUseCase } from '../use-cases/factories/make-create-user-use-case'
import { makeGetUserUseCase } from '../use-cases/factories/make-get-user-use-case'
import { makeAuthenticateUseCase } from '../use-cases/factories/make-authenticate-use-case'
import { ResourceNotFoundError } from '../use-cases/errors/resource-not-found'
import { generateAccessToken, generateRefreshToken } from '../lib/jwt'
import { InvalidCredentialsError } from '../use-cases/errors/invalid-credentials'
import { verify } from 'jsonwebtoken'
import { env } from '../env'
import { UserAlreadyExistsError } from '../use-cases/errors/user-already-exists'

interface JwtPayload {
  userId: string
}

export const usersController = {
  async createUser(req: Request, res: Response) {
    try {
      const userBodySchema = z.object({
        username: z
          .string()
          .min(1, { message: 'Please enter a valid username' }),
        email: z.string().email(),
        password: z
          .string()
          .min(6, { message: 'password need to be at least 6 characters' }),
      })

      const { username, email, password } = userBodySchema.parse(req.body)

      const createUser = makeCreateUserUseCase()

      const { user } = await createUser.execute({ username, email, password })

      const token = generateAccessToken(user.id)
      const refreshToken = generateRefreshToken(user.id)

      console.log(user)

      res.cookie('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
      })

      res.status(201).send({ token, refreshToken })
    } catch (err) {
      if (err instanceof ZodError || err instanceof UserAlreadyExistsError) {
        return res.status(400).send({ message: err.message })
      }
    }
  },

  async authenticate(req: Request, res: Response) {
    try {
      const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string(),
      })

      const { email, password } = authenticateBodySchema.parse(req.body)

      const authenticateUseCase = makeAuthenticateUseCase()

      const { user } = await authenticateUseCase.execute({ email, password })

      const token = generateAccessToken(user.id)
      const refreshToken = generateRefreshToken(user.id)

      res.cookie('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
      })

      res.status(201).send({ token, refreshToken })
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        return res.status(401).send({ message: err.message })
      }
    }
  },

  async refreshToken(req: Request, res: Response) {
    try {
      const refreshTokenBodySchema = z.object({
        refreshToken: z.string(),
      })

      const { refreshToken } = refreshTokenBodySchema.parse(req.body)

      const verifiedToken = verify(
        refreshToken,
        env.SECRET_KEY_JWT,
      ) as JwtPayload

      const { userId } = verifiedToken

      const accessToken = generateAccessToken(userId)

      res.json({ accessToken })
    } catch (err) {}
  },

  async getUser(req: Request, res: Response) {
    try {
      const getUserUseCase = makeGetUserUseCase()

      const { user } = await getUserUseCase.execute(req.userId)

      res.json({ user })
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return res.status(400).send({ message: err.message })
      }
    }
  },
}

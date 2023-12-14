import { Request, Response } from 'express'
import { ZodError, z } from 'zod'

import { MakeCreateUserUseCase } from '../use-cases/factories/make-create-user-use-case'
import { makeGetUserUseCase } from '../use-cases/factories/make-get-user-use-case'
import { ResourceNotFoundError } from '../use-cases/errors/resource-not-found'

export const usersController = {
  async createUser(req: Request, res: Response) {
    try {
      const userBodySchema = z.object({
        username: z.string(),
      })

      const { username } = userBodySchema.parse(req.body)

      const createUser = MakeCreateUserUseCase()

      const { user } = await createUser.execute({ username })

      let userId = req.cookies.userId

      if (!userId) {
        userId = user.id

        res.cookie('userId', userId, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
        })
      }

      res.status(201).send()
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).send({ message: err.message })
      }
    }
  },

  async getUser(req: Request, res: Response) {
    try {
      const { userId } = req.cookies

      const getUserById = makeGetUserUseCase()
      const { user } = await getUserById.execute(userId)

      res.status(200).send({ user })
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return res.status(400).send({ message: err.message })
      }
    }
  },
}

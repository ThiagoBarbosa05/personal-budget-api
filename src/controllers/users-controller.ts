import { Request, Response } from 'express'
import { z } from 'zod'

import { MakeCreateUserUseCase } from '../use-cases/factories/make-create-user-use-case'
import { makeGetUserUseCase } from '../use-cases/factories/make-get-user-use-case'

export const usersController = {
  async createUser(req: Request, res: Response) {
    const userBodyschema = z.object({
      username: z.string(),
    })

    const { username } = userBodyschema.parse(req.body)

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
  },

  async getUser(req: Request, res: Response) {
    const { id } = req.params

    const getUser = makeGetUserUseCase()

    const { user } = await getUser.execute(id)

    if (!user) return res.status(404).send()

    res.send({ user })
  },
}

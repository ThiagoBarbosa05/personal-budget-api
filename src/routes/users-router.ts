import { Router } from 'express'
import { usersController } from '../controllers/users-controller'

export const usersRouter: Router = Router()

usersRouter.post('/users', usersController.createUser)

usersRouter.get('/users/me', usersController.getUser)

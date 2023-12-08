import { Router } from 'express'
import { usersController } from '../controllers/users-controller'

export const usersRouter: Router = Router()

usersRouter.post('/', usersController.createUser)

usersRouter.get('/:id', usersController.getUser)

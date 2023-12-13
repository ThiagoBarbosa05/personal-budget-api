import { Router } from 'express'
import { usersController } from '../controllers/users-controller'
import { userIdCookieExists } from '../middlewares/user-id-cookie-exists'

export const usersRouter: Router = Router()

usersRouter.post('/users', usersController.createUser)

usersRouter.get('/users/me', userIdCookieExists, usersController.getUser)

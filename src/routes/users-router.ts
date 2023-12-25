import { Router } from 'express'
import { usersController } from '../controllers/users-controller'
import { userIdCookieExists } from '../middlewares/user-id-cookie-exists'

export const usersRouter: Router = Router()

usersRouter.post('/register', usersController.createUser)

usersRouter.post('/login', usersController.authenticate)

usersRouter.post('/refresh-token', usersController.refreshToken)

usersRouter.get('/users/me', userIdCookieExists, usersController.getUser)

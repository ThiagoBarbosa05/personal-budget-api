import { Router } from 'express'
import { usersController } from '../controllers/users-controller'
import { verifyJwt } from '../middlewares/verify-jwt'

export const usersRouter: Router = Router()

usersRouter.post('/register', usersController.createUser)

usersRouter.post('/login', usersController.authenticate)

usersRouter.post('/refresh-token', usersController.refreshToken)

usersRouter.get('/users/me', verifyJwt, usersController.getUser)

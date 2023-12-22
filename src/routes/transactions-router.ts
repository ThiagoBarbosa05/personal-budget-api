import { Router } from 'express'

import { userIdCookieExists } from '../middlewares/user-id-cookie-exists'
import { transactionsController } from '../controllers/transactions-controller'

export const transactionsRouter: Router = Router()

transactionsRouter.post(
  '/transactions',
  userIdCookieExists,
  transactionsController.create,
)

transactionsRouter.get(
  '/transactions/:envelopeId',
  userIdCookieExists,
  transactionsController.getTransactions,
)

transactionsRouter.put(
  '/transactions/:envelopeId/:transactionId',
  transactionsController.update,
)

transactionsRouter.delete(
  '/transactions/:transactionId',
  transactionsController.delete,
)
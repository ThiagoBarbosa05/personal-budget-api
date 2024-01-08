import { Router } from 'express'

import { transactionsController } from '../controllers/transactions-controller'
import { verifyJwt } from '../middlewares/verify-jwt'

export const transactionsRouter: Router = Router()

transactionsRouter.post(
  '/transactions',
  verifyJwt,
  transactionsController.create,
)

transactionsRouter.get(
  '/transactions/:envelopeId',
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

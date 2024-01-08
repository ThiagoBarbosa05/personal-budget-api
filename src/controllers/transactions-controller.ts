import { Request, Response } from 'express'
import { ZodError, z } from 'zod'
import { MakeCreateTransactionUseCase } from '../use-cases/factories/make-create-transaction-use-case'
import { makeUpdateTransactionUseCase } from '../use-cases/factories/make-update-transaction-use-case'
import { makeGetTransactionsUseCase } from '../use-cases/factories/make-get-transactions-use-case'
import { InsufficientFundsToTransfer } from '../use-cases/errors/insufficient-funds-to-transfer'
import { ResourceNotFoundError } from '../use-cases/errors/resource-not-found'
import { makeDeleteTransactionUseCase } from '../use-cases/factories/make-delete-transaction-use-case'

export const transactionsController = {
  async create(req: Request, res: Response) {
    try {
      const transactionBodySchema = z.object({
        payment_recipient: z.string().refine((data) => data.trim() !== '', {
          message: 'Payment recipient is missing',
        }),
        payment_amount: z.coerce
          .number()
          .min(1, { message: 'amount has to be greater than one.' }),
        envelope_id: z.string().uuid(),
      })

      const { userId } = req

      const { envelope_id, payment_amount, payment_recipient } =
        transactionBodySchema.parse(req.body)

      const createTransactionUseCase = MakeCreateTransactionUseCase()

      await createTransactionUseCase.execute({
        envelope_id,
        payment_amount,
        payment_recipient,
        user_id: userId,
      })

      res.status(201).send()
    } catch (err) {
      if (
        err instanceof InsufficientFundsToTransfer ||
        err instanceof ResourceNotFoundError ||
        err instanceof ZodError
      ) {
        return res.status(400).send({ message: err.message })
      }
    }
  },

  async getTransactions(req: Request, res: Response) {
    try {
      const { envelopeId } = req.params

      const getTransactionUseCase = makeGetTransactionsUseCase()

      const { transactions } = await getTransactionUseCase.execute(envelopeId)

      res.status(200).send({ transactions })
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return res.status(400).send({ message: err.message })
      }
    }
  },

  async update(req: Request, res: Response) {
    try {
      const updateTransactionBodySchema = z.object({
        payment_recipient: z.string().optional(),
        payment_amount: z.number().optional(),
      })

      const { payment_amount, payment_recipient } =
        updateTransactionBodySchema.parse(req.body)

      const { envelopeId, transactionId } = req.params

      const { userId } = req

      const updateTransactionUseCase = makeUpdateTransactionUseCase()

      res.status(200).send({ message: 'success' })

      await updateTransactionUseCase.execute({
        envelope_id: envelopeId,
        transaction_id: transactionId,
        user_id: userId,
        payment_amount,
        payment_recipient,
      })
    } catch (err) {
      if (
        err instanceof InsufficientFundsToTransfer ||
        err instanceof ResourceNotFoundError ||
        err instanceof ZodError
      ) {
        res.status(400).send(err.message)
      }
    }
  },

  async delete(req: Request, res: Response) {
    const { transactionId } = req.params

    const deleteTransactionUseCase = makeDeleteTransactionUseCase()

    await deleteTransactionUseCase.execute(transactionId)

    res.status(200).send()
  },
}

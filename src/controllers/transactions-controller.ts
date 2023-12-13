import { Request, Response } from 'express'
import { z } from 'zod'
import { MakeCreateTransactionUseCase } from '../use-cases/factories/make-create-transaction-use-case'

export const transactionsController = {
  async create(req: Request, res: Response) {
    const transactionBodySchema = z.object({
      payment_recipient: z.string(),
      payment_amount: z.coerce.number(),
      envelope_id: z.string().uuid(),
    })

    const { userId } = req.cookies

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
  },
}

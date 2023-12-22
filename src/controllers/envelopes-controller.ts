import { Request, Response } from 'express'
import { ZodError, z } from 'zod'
import { makeCreateEnvelopeUseCase } from '../use-cases/factories/make-create-envelope-use-case'
import { makeGetEnvelopesUseCase } from '../use-cases/factories/make-get-envelopes-use-case'
import { makeGetEnvelopeByIdUseCase } from '../use-cases/factories/make-get-envelope-by-id-use-case'
import { makeUpdateEnvelopeUseCase } from '../use-cases/factories/make-update-envelope-use-case'
import { makeDeleteEnvelopeUseCase } from '../use-cases/factories/make-delete-envelope-use-case'
import { makeTransferValueUseCase } from '../use-cases/factories/make-transfer-value-use-case'
import { ResourceNotFoundError } from '../use-cases/errors/resource-not-found'
import { InsufficientFundsToTransfer } from '../use-cases/errors/insufficient-funds-to-transfer'

export const envelopesController = {
  async createEnvelope(req: Request, res: Response) {
    try {
      const envelopeBodySchema = z.object({
        description: z.string().refine((data) => data.trim() !== '', {
          message: 'description is required',
        }),
        amount: z
          .number()
          .min(1, { message: 'amount has to be greater than one' }),
      })

      const { description, amount } = envelopeBodySchema.parse(req.body)

      const user_id = req.cookies.userId

      const createEnvelope = makeCreateEnvelopeUseCase()

      if (!createEnvelope) return res.status(400).send()

      await createEnvelope.execute({ description, amount, user_id })

      res.status(201).send()
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).send({ message: err.message })
      }
    }
  },

  async getEnvelopes(req: Request, res: Response) {
    try {
      const { userId } = req.cookies

      const getEnvelopes = makeGetEnvelopesUseCase()

      const { envelopes } = await getEnvelopes.execute(userId)

      res.send({ envelopes })
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return res.status(400).send({ message: err.message })
      }
    }
  },

  async getEnvelopeById(req: Request, res: Response) {
    try {
      const { userId } = req.cookies
      const { id } = req.params

      const getEnvelopeById = makeGetEnvelopeByIdUseCase()

      const { envelope } = await getEnvelopeById.execute({ id, userId })

      res.status(200).send({ envelope })
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return res.status(400).send({ message: err.message })
      }
    }
  },

  async updateEnvelopeById(req: Request, res: Response) {
    try {
      const envelopeBodySchema = z.object({
        description: z.string().optional(),
        amount: z.number().optional(),
      })

      const { amount, description } = envelopeBodySchema.parse(req.body)

      const { envelopeId } = req.params
      const { userId } = req.cookies

      const updateEnvelopeById = makeUpdateEnvelopeUseCase()

      await updateEnvelopeById.execute({
        amount,
        description,
        userId,
        id: envelopeId,
      })

      res.status(200).send()
    } catch (err) {
      if (err instanceof ResourceNotFoundError || err instanceof ZodError) {
        return res.status(400).send({ message: err.message })
      }
    }
  },

  async deleteEnvelopeById(req: Request, res: Response) {
    const { userId } = req.cookies
    const { id } = req.params

    const deleteEnvelopeById = makeDeleteEnvelopeUseCase()

    await deleteEnvelopeById.execute({ id, userId })

    res.status(200).send()
  },

  async transferValue(req: Request, res: Response) {
    try {
      const amountToTransferSchema = z.object({
        amountToUpdate: z.number().min(1, {
          message: 'the value of the transfer must be greater than one',
        }),
      })

      const { amountToUpdate } = amountToTransferSchema.parse(req.body)

      const { amountFrom, amountTo } = req.params
      const { userId } = req.cookies

      const transferValueUseCase = makeTransferValueUseCase()

      await transferValueUseCase.execute({
        destinationId: amountTo,
        amountToUpdate,
        originId: amountFrom,
        userId,
      })

      res.status(200).send()
    } catch (err) {
      if (
        err instanceof ResourceNotFoundError ||
        err instanceof InsufficientFundsToTransfer ||
        err instanceof ZodError
      ) {
        return res.status(400).send({ message: err.message })
      }
    }
  },
}

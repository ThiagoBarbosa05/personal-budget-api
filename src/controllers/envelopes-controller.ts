import { Request, Response } from 'express'
import { z } from 'zod'
import { makeCreateEnvelopeUseCase } from '../use-cases/factories/make-create-envelope-use-case'
import { makeGetEnvelopesUseCase } from '../use-cases/factories/make-get-envelopes-use-case'
import { makeGetEnvelopeByIdUseCase } from '../use-cases/factories/make-get-envelope-by-id-use-case'
import { makeUpdateEnvelopeUseCase } from '../use-cases/factories/make-update-envelope-use-case'
import { makeDeleteEnvelopeUseCase } from '../use-cases/factories/make-delete-envelope-use-case'
import { makeTransferValueUseCase } from '../use-cases/factories/make-transfer-value-use-case'
import { prisma } from '../lib/prisma'
import { ResourceNotFoundError } from '../use-cases/errors/resource-not-found'
import { InsufficientFundsToTransfer } from '../use-cases/errors/insufficient-funds-to-transfer'

export const envelopesController = {
  async createEnvelope(req: Request, res: Response) {
    const envelopeBodySchema = z.object({
      description: z.string(),
      amount: z.number(),
    })

    const { description, amount } = envelopeBodySchema.parse(req.body)

    const user_id = req.cookies.userId

    const createEnvelope = makeCreateEnvelopeUseCase()

    if (!createEnvelope) return res.status(400).send()

    await createEnvelope.execute({ description, amount, user_id })

    res.status(201).send()
  },

  async getEnvelopes(req: Request, res: Response) {
    const { userId } = req.cookies

    const getEnvelopes = makeGetEnvelopesUseCase()

    const { envelopes } = await getEnvelopes.execute(userId)

    if (!envelopes) return res.status(404).send()

    res.send({ envelopes })
  },

  async getEnvelopeById(req: Request, res: Response) {
    const { userId } = req.cookies
    const { id } = req.params

    const getEnvelopeById = makeGetEnvelopeByIdUseCase()

    const { envelope } = await getEnvelopeById.execute({ id, userId })

    if (!envelope) return res.status(400).send()

    res.status(200).send({ envelope })
  },

  async updateEnvelopeById(req: Request, res: Response) {
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
  },

  async deleteEnvelopeById(req: Request, res: Response) {
    const { userId } = req.cookies
    const { id } = req.params

    const deleteEnvelopeById = makeDeleteEnvelopeUseCase()

    await deleteEnvelopeById.execute({ id, userId })

    res.status(200).send()
  },

  async transferValue(req: Request, res: Response) {
    const amountToTransferSchema = z.object({ amountToUpdate: z.number() })

    const { amountToUpdate } = amountToTransferSchema.parse(req.body)

    const { amountFrom, amountTo } = req.params
    const { userId } = req.cookies

    const envelopesResponse = await prisma.envelope.findMany({
      where: {
        user_id: userId,
      },
      include: {
        Transaction: true,
      },
    })

    const envelopes = envelopesResponse.map((env) => ({
      ...env,
      totalAmountTransactions: env.Transaction.reduce(
        (sum, transaction) => sum + transaction.payment_amount,
        0,
      ),
    }))

    const transferValueUseCase = makeTransferValueUseCase()

    await transferValueUseCase.execute({
      destinationId: amountTo,
      amountToUpdate,
      originId: amountFrom,
      userId,
    })

    res.status(200).send(envelopes)
  },
}

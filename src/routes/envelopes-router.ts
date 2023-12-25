import { Router } from 'express'
import { envelopesController } from '../controllers/envelopes-controller'
import { verifyJwt } from '../middlewares/verify-jwt'

export const envelopesRouter: Router = Router()

envelopesRouter.post(
  '/envelopes',
  verifyJwt,
  envelopesController.createEnvelope,
)

envelopesRouter.get('/envelopes', verifyJwt, envelopesController.getEnvelopes)

envelopesRouter.get(
  '/envelopes/:id',
  verifyJwt,
  envelopesController.getEnvelopeById,
)

envelopesRouter.put(
  '/envelopes/:envelopeId',
  verifyJwt,
  envelopesController.updateEnvelopeById,
)

envelopesRouter.delete(
  '/envelopes/:id',
  verifyJwt,
  envelopesController.deleteEnvelopeById,
)

envelopesRouter.post(
  '/envelopes/transfer/:amountFrom/:amountTo',
  verifyJwt,
  envelopesController.transferValue,
)

import { Router } from 'express'
import { envelopesController } from '../controllers/envelopes-controller'
import { userIdCookieExists } from '../middlewares/user-id-cookie-exists'

export const envelopesRouter: Router = Router()

envelopesRouter.post(
  '/envelopes',
  userIdCookieExists,
  envelopesController.createEnvelope,
)

envelopesRouter.get(
  '/envelopes',
  userIdCookieExists,
  envelopesController.getEnvelopes,
)

envelopesRouter.get('/envelopes/:id', envelopesController.getEnvelopeById)

envelopesRouter.put(
  '/envelopes/:envelopeId',
  userIdCookieExists,
  envelopesController.updateEnvelopeById,
)

envelopesRouter.delete(
  '/envelopes/:id',
  userIdCookieExists,
  envelopesController.deleteEnvelopeById,
)

envelopesRouter.post(
  '/envelopes/transfer/:amountFrom/:amountTo',
  userIdCookieExists,
  envelopesController.transferValue,
)

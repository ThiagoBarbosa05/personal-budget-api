import { Router } from 'express'
import { envelopesController } from '../controllers/envelopes-controller'

export const envelopesRouter: Router = Router()

envelopesRouter.post('/envelopes', envelopesController.createEnvelope)

envelopesRouter.get('/envelopes', envelopesController.getEnvelopes)

envelopesRouter.get('/envelopes/:id', envelopesController.getEnvelopeById)

envelopesRouter.put('/:envelopeId', envelopesController.updateEnvelopeById)

envelopesRouter.delete('/:id', envelopesController.deleteEnvelopeById)

envelopesRouter.post(
  '/transfer/:amountFrom/:amountTo',
  envelopesController.transferValue,
)

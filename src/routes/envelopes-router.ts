import { Router } from 'express'
import { envelopesController } from '../controllers/envelopes-controller'

export const envelopesRouter: Router = Router()

envelopesRouter.post('/', envelopesController.createEnvelope)

envelopesRouter.get('/', envelopesController.getEnvelopes)

envelopesRouter.get('/:id', envelopesController.getEnvelopeById)

envelopesRouter.put('/:envelopeId', envelopesController.updateEnvelopeById)

envelopesRouter.delete('/:id', envelopesController.deleteEnvelopeById)

envelopesRouter.post(
  '/transfer/:amountFrom/:amountTo',
  envelopesController.transferValue,
)

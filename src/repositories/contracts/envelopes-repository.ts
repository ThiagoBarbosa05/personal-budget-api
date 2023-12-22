import { Envelope } from '../../types'

export interface GetEnvelopeByIdParams {
  id: string
  userId: string
}

export interface DeleteEnvelopeByIdParams {
  id: string
  userId: string
}

export interface UpdateEnvelopeByIdParams {
  id: string
  userId: string
  amount?: number
  description?: string
  updatedAt: Date
}

export interface TransferValueParams {
  amountToUpdate: number
  destinationId: string
  originId: string
  userId: string
}

export interface EnvelopesResponse extends Envelope {
  totalAmountTransactions?: number
}

export interface EnvelopesRepository {
  create(data: Envelope): Promise<Envelope>
  getAllEnvelopes(userId: string): Promise<EnvelopesResponse[] | null>
  getEnvelopeById({
    id,
    userId,
  }: GetEnvelopeByIdParams): Promise<Envelope | null>
  updateEnvelopeById(data: UpdateEnvelopeByIdParams): Promise<Envelope | null>
  deleteEnvelopeById({ id, userId }: DeleteEnvelopeByIdParams): Promise<void>
  transferValue({
    amountToUpdate,
    destinationId,
    originId,
    userId,
  }: TransferValueParams): Promise<void>
}

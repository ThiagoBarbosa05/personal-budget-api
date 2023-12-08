import { randomUUID } from 'node:crypto'
import { Envelope } from '../../types'
import {
  DeleteEnvelopeByIdParams,
  EnvelopesRepository,
  GetEnvelopeByIdParams,
  TransferValueParams,
  UpdateEnvelopeByIdParams,
} from '../contracts/envelopes-repository'

export class InMemoryEnvelopesRepository implements EnvelopesRepository {
  public items: Envelope[] = []

  async getAllEnvelopes(userId: string): Promise<Envelope[] | null> {
    const envelopes = this.items.filter((item) => item.user_id === userId)

    if (!envelopes) return null

    return envelopes
  }

  async getEnvelopeById({
    id,
    userId,
  }: GetEnvelopeByIdParams): Promise<Envelope | null> {
    const envelope = this.items.find(
      (item) => item.id === id && item.user_id === userId,
    )

    if (!envelope) return null

    return envelope
  }

  async create(data: Envelope) {
    const envelope = {
      id: data.id ?? randomUUID(),
      description: data.description,
      amount: data.amount,
      created_at: new Date(),
      updated_at: new Date(),
      user_id: data.user_id,
    }

    this.items.push(envelope)

    return envelope
  }

  async updateEnvelopeById(data: UpdateEnvelopeByIdParams) {
    const foundEnvelope = this.items.find(
      (item) => item.id === data.id && item.user_id === data.userId,
    )

    if (!foundEnvelope) return null

    const updatedEnvelope = {
      ...foundEnvelope,
      amount: data.amount ?? foundEnvelope.amount,
      description: data.description ?? foundEnvelope.description,
      updated_at: data.updatedAt ?? foundEnvelope.updated_at,
    }

    return updatedEnvelope
  }

  async deleteEnvelopeById({ id, userId }: DeleteEnvelopeByIdParams) {
    const envelopeIndex = this.items.findIndex(
      (item) => item.id === id && item.user_id === userId,
    )

    this.items.splice(envelopeIndex)
  }

  async transferValue(data: TransferValueParams): Promise<void> {
    const originEnvelope = this.items.findIndex(
      (item) => item.id === data.originId && item.user_id === data.userId,
    )
    const destinationEnvelope = this.items.findIndex(
      (item) => item.id === data.destinationId && item.user_id === data.userId,
    )

    this.items[originEnvelope].amount -= data.amountToUpdate
    this.items[destinationEnvelope].amount += data.amountToUpdate
  }
}
